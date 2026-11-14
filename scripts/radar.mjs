// Radar: coleta fontes públicas, (opcionalmente) resume em pt-BR e grava src/data/radar.json.
// Uso: node scripts/radar.mjs   (GEMINI_API_KEY é opcional)
import { writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

// Chave local opcional: crie .env.local com GEMINI_API_KEY=... (o arquivo é ignorado pelo Git).
try {
  const text = await readFile(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of text.split("\n")) {
    const eq = line.indexOf("=");
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (/^[A-Z_]+$/.test(key) && value && !process.env[key]) process.env[key] = value;
  }
} catch {}

const OUT = new URL("../src/data/radar.json", import.meta.url);
const UA = "Mozilla/5.0 (compatible; PortfolioRadar/1.0)";
const PER_SOURCE = 4; // itens por fonte
const PER_COLUMN = 8; // itens por coluna
const MAX_AGE_DAYS = { ia: 14, seguranca: 10, papers: 10 };

const SOURCES = [
  // type: noticia | oficial | preprint
  { col: "ia", name: "MIT Technology Review", type: "noticia", kind: "rss", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed" },
  { col: "ia", name: "Ars Technica", type: "noticia", kind: "rss", url: "https://arstechnica.com/ai/feed/" },
  { col: "ia", name: "Hugging Face", type: "noticia", kind: "rss", url: "https://huggingface.co/blog/feed.xml" },
  { col: "seguranca", name: "CISA KEV", type: "oficial", kind: "kev", url: "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json" },
  { col: "seguranca", name: "BleepingComputer", type: "noticia", kind: "rss", url: "https://www.bleepingcomputer.com/feed/" },
  { col: "seguranca", name: "The Hacker News", type: "noticia", kind: "rss", url: "https://feeds.feedburner.com/TheHackersNews" },
  { col: "seguranca", name: "Krebs on Security", type: "noticia", kind: "rss", url: "https://krebsonsecurity.com/feed/" },
  { col: "papers", name: "Hugging Face Daily Papers", type: "preprint", kind: "hf", url: "https://huggingface.co/api/daily_papers" },
  { col: "papers", name: "arXiv cs.CR", type: "preprint", kind: "arxiv", url: "https://export.arxiv.org/api/query?search_query=cat:cs.CR&sortBy=submittedDate&sortOrder=descending&max_results=6" },
];

const decode = (s = "") =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tag = (block, name) => {
  const m = block.match(new RegExp("<" + name + "[^>]*>([\\s\\S]*?)</" + name + ">", "i"));
  return m ? m[1] : "";
};
const cut = (s, n) => (s.length > n ? s.slice(0, n - 1).replace(/\s\S*$/, "") + "…" : s);
const safeUrl = (u) => (/^https:\/\//i.test(u) ? u : /^http:\/\//i.test(u) ? u.replace(/^http:/i, "https:") : "");

async function get(url, json = false) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "*/*" }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return json ? res.json() : res.text();
}

function parseFeed(xml) {
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) || [];
  return blocks.map((b) => {
    const linkAttr = b.match(/<link[^>]*href="([^"]+)"/i);
    const link = decode(tag(b, "link")) || (linkAttr && linkAttr[1]) || decode(tag(b, "id"));
    return {
      title: decode(tag(b, "title")),
      url: safeUrl(link),
      date: new Date(decode(tag(b, "pubDate") || tag(b, "published") || tag(b, "updated") || tag(b, "dc:date"))),
      excerpt: decode(tag(b, "description") || tag(b, "summary") || tag(b, "content:encoded") || tag(b, "content")),
    };
  });
}

const collectors = {
  async rss(s) {
    return parseFeed(await get(s.url));
  },
  async arxiv(s) {
    return parseFeed(await get(s.url));
  },
  async hf(s) {
    const data = await get(s.url, true);
    return data
      .map((d) => ({
        title: d.title || d.paper?.title,
        url: d.paper?.id ? "https://huggingface.co/papers/" + d.paper.id : "",
        date: new Date(d.publishedAt || d.paper?.publishedAt),
        excerpt: decode(d.paper?.summary || d.summary || ""),
        score: d.paper?.upvotes ?? 0,
      }))
      .filter((i) => i.title && i.url)
      .sort((a, b) => b.score - a.score);
  },
  async kev(s) {
    const data = await get(s.url, true);
    return (data.vulnerabilities || [])
      .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
      .slice(0, 12)
      .map((v) => ({
        title: v.cveID + ": " + v.vendorProject + " " + v.product,
        url: "https://nvd.nist.gov/vuln/detail/" + v.cveID,
        date: new Date(v.dateAdded),
        excerpt: v.vulnerabilityName + ". " + v.shortDescription,
      }));
  },
};

async function summarize(items) {
  const key = process.env.GEMINI_API_KEY;
  if (!key || !items.length) return items;
  const payload = items.map((it, i) => ({ i, titulo: it.title, texto: cut(it.excerpt, 900) }));
  const prompt =
    "Para cada item, escreva em português do Brasil: (1) titulo_pt: título traduzido, fiel, sem sensacionalismo; " +
    "(2) resumo_pt: 1 a 2 frases usando APENAS o que está no texto fornecido. Não acrescente fatos, números, nomes ou causas que não estejam no texto. " +
    "Se o texto for insuficiente, resuma só o título. Responda somente com JSON: [{\"i\":0,\"titulo_pt\":\"...\",\"resumo_pt\":\"...\"}].\n\n" +
    JSON.stringify(payload);
  try {
    // Gemini pelo endpoint compatível com OpenAI (mesmo padrão do mirofish-teste).
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "content-type": "application/json" },
      body: JSON.stringify({
        model: process.env.RADAR_MODEL || "gemini-2.5-flash",
        temperature: 0.2,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(90000),
    });
    if (!res.ok) throw new Error("API " + res.status + " " + (await res.text()).slice(0, 300));
    const text = (await res.json()).choices?.[0]?.message?.content || "";
    const arr = JSON.parse(text.slice(text.indexOf("["), text.lastIndexOf("]") + 1));
    for (const r of arr) {
      const it = items[r.i];
      if (it && r.titulo_pt && r.resumo_pt) {
        it.titlePt = cut(String(r.titulo_pt), 160);
        it.summaryPt = cut(String(r.resumo_pt), 320);
        it.ai = true;
      }
    }
  } catch (e) {
    console.warn("Resumo por IA falhou, usando trechos originais:", e.message);
  }
  return items;
}

async function main() {
  let previous = { items: [] };
  try {
    previous = JSON.parse(await readFile(OUT, "utf8"));
  } catch {}
  const prevById = new Map(previous.items.map((i) => [i.id, i]));
  const now = Date.now();
  const all = [];

  for (const s of SOURCES) {
    try {
      const raw = await collectors[s.kind](s);
      const fresh = raw
        .filter((i) => i.title && i.url && !isNaN(i.date) && now - i.date <= MAX_AGE_DAYS[s.col] * 864e5 && i.date - now < 864e5)
        .slice(0, PER_SOURCE);
      for (const i of fresh) {
        const id = createHash("sha1").update(i.url).digest("hex").slice(0, 12);
        all.push({
          id,
          col: s.col,
          source: s.name,
          type: s.type,
          url: i.url,
          title: cut(i.title, 180),
          date: i.date.toISOString(),
          excerpt: cut(i.excerpt || "", 300),
          score: i.score ?? 0,
        });
      }
      console.log("ok   " + s.name + ": " + fresh.length);
    } catch (e) {
      console.warn("fail " + s.name + ": " + e.message);
    }
  }

  // Se tudo falhar, não sobrescreve o que já está publicado.
  if (!all.length) {
    console.error("Nenhuma fonte respondeu; mantendo o arquivo atual.");
    return;
  }

  // Reaproveita resumos já gerados; resume só o que é novo.
  const uniq = [...new Map(all.map((i) => [i.id, i])).values()];
  for (const it of uniq) {
    const p = prevById.get(it.id);
    if (p?.summaryPt) Object.assign(it, { titlePt: p.titlePt, summaryPt: p.summaryPt, ai: p.ai });
  }
  await summarize(uniq.filter((i) => !i.summaryPt));

  // Seleciona por coluna: mais recentes (papers: mais votados), sem concentrar numa só fonte.
  const items = [];
  for (const col of ["ia", "seguranca", "papers"]) {
    const list = uniq
      .filter((i) => i.col === col)
      .sort((a, b) => (col === "papers" ? b.score - a.score : 0) || new Date(b.date) - new Date(a.date));
    const perSrc = {};
    const picked = [];
    for (const i of list) {
      perSrc[i.source] = (perSrc[i.source] || 0) + 1;
      if (perSrc[i.source] <= 3) picked.push(i);
    }
    items.push(...picked.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, PER_COLUMN));
  }

  await writeFile(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), items }, null, 2) + "\n");
  console.log("Gravado: " + items.length + " itens");
}
main();
