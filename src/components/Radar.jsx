import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import data from "../data/radar.json";
import Reveal from "./Reveal";

const COPY = {
  pt: {
    back: "Voltar",
    title: "Radar",
    intro:
      "O que está acontecendo em IA, segurança e pesquisa, coletado automaticamente de fontes públicas todos os dias. Cada item leva ao texto original.",
    cols: { ia: "IA", seguranca: "Segurança", papers: "Papers" },
    types: { noticia: "Notícia", oficial: "Dado oficial", preprint: "Preprint" },
    updated: "Atualizado em",
    empty: "Ainda sem itens. A primeira coleta roda em breve.",
    note:
      "Coleta e resumo automáticos, sem revisão humana. Resumos em português são gerados por IA a partir do texto da fonte e podem conter erros: confira sempre o original. Preprints ainda não passaram por revisão de pares.",
    read: "Ler na fonte",
    locale: "pt-BR",
  },
  en: {
    back: "Back",
    title: "Radar",
    intro:
      "What is happening in AI, security and research, collected automatically from public sources every day. Every item links to the original.",
    cols: { ia: "AI", seguranca: "Security", papers: "Papers" },
    types: { noticia: "News", oficial: "Official data", preprint: "Preprint" },
    updated: "Updated",
    empty: "No items yet. The first run is coming soon.",
    note:
      "Collected and summarized automatically, with no human review. Portuguese summaries are AI-generated from the source text and may contain errors: always check the original. Preprints have not been peer reviewed.",
    read: "Read at source",
    locale: "en-US",
  },
};

const fmt = (iso, locale) =>
  new Date(iso).toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });

function Item({ it, c, pt }) {
  const title = pt && it.titlePt ? it.titlePt : it.title;
  const text = pt && it.summaryPt ? it.summaryPt : it.excerpt;
  return (
    <li className="border-t border-line py-5 first:border-t-0">
      <p className="eyebrow flex flex-wrap gap-x-3">
        <span>{c.types[it.type]}</span>
        <span>{it.source}</span>
        <time dateTime={it.date}>{fmt(it.date, c.locale)}</time>
      </p>
      <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight">
        <a href={it.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
          {title}
        </a>
      </h3>
      {text && <p className="mt-2 text-sm text-mute">{text}</p>}
      {pt && it.ai && <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-mute">Resumo gerado por IA</p>}
      {pt && !it.summaryPt && <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-mute">Original em inglês</p>}
    </li>
  );
}

export default function Radar() {
  const { language } = useLanguage();
  const pt = language === "pt";
  const c = COPY[pt ? "pt" : "en"];
  const items = data.items || [];

  return (
    <section className="container-page pb-24 pt-14">
      <Link to="/" className="link-underline text-sm">
        ← {c.back}
      </Link>

      <Reveal>
        <header className="mt-8 grid gap-4 md:grid-cols-[1fr_2fr] md:gap-10">
          <h1 className="font-display text-5xl leading-none tracking-tight sm:text-7xl">
            {c.title}
            <span className="text-accent">.</span>
          </h1>
          <div className="md:pt-3">
            <p className="max-w-[56ch] text-mute">{c.intro}</p>
            {data.updatedAt && (
              <p className="eyebrow mt-4">
                {c.updated} {fmt(data.updatedAt, c.locale)}
              </p>
            )}
          </div>
        </header>
      </Reveal>

      {items.length === 0 ? (
        <p className="mt-16 text-mute">{c.empty}</p>
      ) : (
        <div className="mt-14 grid gap-x-10 gap-y-14 lg:grid-cols-3">
          {["ia", "seguranca", "papers"].map((col) => {
            const list = items.filter((i) => i.col === col);
            return (
              <Reveal key={col}>
                <section aria-labelledby={"radar-" + col}>
                  <h2 id={"radar-" + col} className="border-t border-ink pt-4 font-display text-3xl tracking-tight">
                    {c.cols[col]}
                  </h2>
                  <ul>
                    {list.map((it) => (
                      <Item key={it.id} it={it} c={c} pt={pt} />
                    ))}
                  </ul>
                </section>
              </Reveal>
            );
          })}
        </div>
      )}

      <p className="mt-16 max-w-[70ch] border-t border-line pt-6 text-xs text-mute">{c.note}</p>
    </section>
  );
}
