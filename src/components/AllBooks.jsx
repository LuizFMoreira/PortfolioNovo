import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { BOOK_CATEGORIES, booksData } from "../data/books";
import BookRow, { STATUS } from "./BookRow";

const COPY = {
  pt: { back: "Voltar", title: "Estante", category: "Categoria", status: "Status", all: "Todos", count: (n) => (n === 1 ? "1 livro" : `${n} livros`), empty: "Nenhum livro com esses filtros." },
  en: { back: "Back", title: "Bookshelf", category: "Category", status: "Status", all: "All", count: (n) => (n === 1 ? "1 book" : `${n} books`), empty: "No books match these filters." },
};

export default function AllBooks() {
  const { language } = useLanguage();
  const c = COPY[language];
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const all = booksData[language] || booksData.pt;
  const visible = useMemo(
    () => all.filter((b) => (category === "all" || b.category === category) && (status === "all" || b.status === status)),
    [all, category, status]
  );

  const chip = (active) =>
    `border px-3 py-1 font-mono text-xs transition-colors ${active ? "border-ink bg-ink text-paper" : "border-ink/30 hover:border-ink"}`;

  return (
    <section className="container-page pb-24 pt-14">
      <Link to="/" className="link-underline text-sm">
        ← {c.back}
      </Link>
      <h1 className="mt-8 font-display text-5xl leading-none tracking-tight sm:text-7xl">
        {c.title}
        <span className="text-accent">.</span>
      </h1>

      <div className="mt-10 space-y-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={c.category}>
          <span className="eyebrow mr-2">{c.category}</span>
          {BOOK_CATEGORIES[language].map((cat) => (
            <button key={cat.key} type="button" aria-pressed={category === cat.key} onClick={() => setCategory(cat.key)} className={chip(category === cat.key)}>
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={c.status}>
          <span className="eyebrow mr-2">{c.status}</span>
          <button type="button" aria-pressed={status === "all"} onClick={() => setStatus("all")} className={chip(status === "all")}>
            {c.all}
          </button>
          {Object.entries(STATUS[language]).map(([key, label]) => (
            <button key={key} type="button" aria-pressed={status === key} onClick={() => setStatus(key)} className={chip(status === key)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="eyebrow mt-8" aria-live="polite">
        {c.count(visible.length)}
      </p>

      {visible.length === 0 ? (
        <p className="mt-6 text-mute">{c.empty}</p>
      ) : (
        <ul className="mt-2 grid gap-x-12 border-t border-ink md:grid-cols-2">
          {visible.map((b) => (
            <BookRow key={b.id} book={b} language={language} />
          ))}
        </ul>
      )}
    </section>
  );
}
