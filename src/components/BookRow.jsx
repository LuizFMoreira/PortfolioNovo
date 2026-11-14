import { useState } from "react";
import { getBookCover } from "../data/books";

export const STATUS = {
  pt: { reading: "Lendo", finished: "Lido", wishlist: "Quero ler" },
  en: { reading: "Reading", finished: "Read", wishlist: "Want to read" },
};

// Capa pequena (Open Library). Se não existir, a linha continua só com texto.
function Cover({ isbn }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div aria-hidden className="h-24 w-16 border border-line" />;
  return (
    <img
      src={getBookCover(isbn, "M")}
      alt=""
      loading="lazy"
      width="64"
      height="96"
      onError={() => setFailed(true)}
      onLoad={(e) => e.currentTarget.naturalWidth < 20 && setFailed(true)}
      className="h-24 w-16 border border-line object-cover"
    />
  );
}

export default function BookRow({ book, language }) {
  return (
    <li className="grid grid-cols-[4rem_1fr] gap-5 border-t border-line py-6 first:border-t-0">
      <Cover isbn={book.isbn} />
      <div>
        <p className="eyebrow flex flex-wrap gap-x-3">
          <span className={book.status === "reading" ? "text-accent" : ""}>{STATUS[language][book.status]}</span>
          {book.tag && <span>{book.tag}</span>}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight">{book.title}</h3>
        <p className="mt-1 text-sm text-mute">{book.author}</p>
        {book.note && <p className="mt-2 max-w-[56ch] text-sm leading-relaxed">{book.note}</p>}
      </div>
    </li>
  );
}
