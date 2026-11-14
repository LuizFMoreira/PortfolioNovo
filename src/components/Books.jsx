import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { booksData } from "../data/books";
import BookRow from "./BookRow";
import SectionHeader from "./SectionHeader";

const COPY = {
  pt: { title: "Estante", intro: "Os livros que moldam como penso código, sistemas e carreira.", all: "Ver a estante completa" },
  en: { title: "Bookshelf", intro: "The books shaping how I think about code, systems and career.", all: "See the full bookshelf" },
};

export default function Books() {
  const { language } = useLanguage();
  const c = COPY[language];
  const books = (booksData[language] || booksData.pt).filter((b) => b.featured);

  return (
    <section id="livros" aria-labelledby="livros-titulo" className="container-page py-20 md:py-28">
      <SectionHeader id="livros-titulo" title={c.title} intro={c.intro} />
      <ul className="grid gap-x-12 md:grid-cols-2">
        {books.map((b) => (
          <BookRow key={b.id} book={b} language={language} />
        ))}
      </ul>
      <div className="mt-8 border-t border-line pt-6">
        <Link to="/livros" className="link-underline text-sm font-medium">
          {c.all} →
        </Link>
      </div>
    </section>
  );
}
