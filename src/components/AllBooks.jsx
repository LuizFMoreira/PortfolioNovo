import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft,
  FaBookOpen,
  FaCheck,
  FaBookmark,
  FaSearch,
  FaExternalLinkAlt,
  FaTimes,
} from 'react-icons/fa';
import { booksData, getBookCover, BOOK_CATEGORIES } from '../data/books';

const APPLE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: APPLE } },
};

// ─── Status meta ──────────────────────────────────────────────────────────────
const STATUS_META = {
  pt: {
    all: { label: 'Todos', icon: FaBookOpen, color: '#94A3B8' },
    reading: { label: 'Lendo', icon: FaBookOpen, color: '#22D3EE' },
    finished: { label: 'Lidos', icon: FaCheck, color: '#10B981' },
    wishlist: { label: 'Quero ler', icon: FaBookmark, color: '#A78BFA' },
  },
  en: {
    all: { label: 'All', icon: FaBookOpen, color: '#94A3B8' },
    reading: { label: 'Reading', icon: FaBookOpen, color: '#22D3EE' },
    finished: { label: 'Read', icon: FaCheck, color: '#10B981' },
    wishlist: { label: 'Want to read', icon: FaBookmark, color: '#A78BFA' },
  },
};

// ─── Cover com fallback ───────────────────────────────────────────────────────
const BookCover = ({ book, className = '' }) => {
  const [imgError, setImgError] = useState(false);
  if (imgError) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-3 text-center ${className}`}
        style={{
          background: `linear-gradient(135deg, ${book.accent}30, rgba(13,10,30,0.95))`,
        }}
      >
        <FaBookOpen size={22} className="mb-2 opacity-30" style={{ color: book.accent }} />
        <p className="text-[10px] font-bold text-white leading-tight line-clamp-3">{book.title}</p>
      </div>
    );
  }
  return (
    <img
      src={getBookCover(book.isbn, 'L')}
      alt={book.title}
      loading="lazy"
      onError={() => setImgError(true)}
      onLoad={(e) => {
        if (e.target.naturalWidth < 10) setImgError(true);
      }}
      className={`object-cover ${className}`}
    />
  );
};

// ─── Card individual ──────────────────────────────────────────────────────────
const BookCard = ({ book, language, onClick }) => {
  const meta = STATUS_META[language][book.status];
  const StatusIcon = meta.icon;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: APPLE }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(book)}
      className="group relative text-left focus:outline-none"
    >
      <div
        className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3"
        style={{
          background: `linear-gradient(135deg, ${book.accent}22, rgba(13,10,30,0.9))`,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          transition: 'box-shadow 0.5s ease, transform 0.5s ease',
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${book.accent}40`;
          e.currentTarget.style.transform = 'rotateY(-6deg) rotateX(2deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.6)';
          e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }}
      >
        <BookCover book={book} className="absolute inset-0 w-full h-full" />

        {/* Lombada */}
        <div
          className="absolute inset-y-0 left-0 w-2 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)' }}
        />

        {/* Brilho hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
          }}
        />

        {/* Status badge */}
        <div
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full"
          style={{
            background: `${meta.color}20`,
            border: `1px solid ${meta.color}60`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          title={meta.label}
        >
          <StatusIcon size={9} style={{ color: meta.color }} />
        </div>

        {/* Tag */}
        <div
          className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase"
          style={{
            background: 'rgba(0,0,0,0.7)',
            color: book.accent,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          {book.tag}
        </div>
      </div>

      <div className="px-1">
        <p className="text-xs font-bold text-white leading-tight line-clamp-2 mb-1">{book.title}</p>
        <p className="text-[10px] font-light line-clamp-1" style={{ color: 'var(--color-text-3)' }}>
          {book.author}
        </p>
      </div>
    </motion.button>
  );
};

// ─── Modal de detalhes ────────────────────────────────────────────────────────
const BookModal = ({ book, language, onClose }) => {
  if (!book) return null;
  const meta = STATUS_META[language][book.status];
  const StatusIcon = meta.icon;
  const t =
    language === 'pt'
      ? { view: 'Ver no Open Library', author: 'Autor' }
      : { view: 'View on Open Library', author: 'Author' };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: APPLE }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(13,10,30,0.92)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: `0 30px 100px rgba(0,0,0,0.8), 0 0 80px ${book.accent}25`,
          }}
        >
          <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6 md:p-8">
            <div
              className="aspect-[2/3] rounded-xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${book.accent}30, rgba(13,10,30,0.9))`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${book.accent}30`,
              }}
            >
              <BookCover book={book} className="w-full h-full" />
            </div>

            <div className="flex flex-col">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full self-start mb-4"
                style={{
                  background: `${meta.color}15`,
                  border: `1px solid ${meta.color}40`,
                }}
              >
                <StatusIcon size={10} style={{ color: meta.color }} />
                <span
                  className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase"
                  style={{ color: meta.color }}
                >
                  {meta.label}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
                {book.title}
              </h3>
              <p className="text-sm font-light mb-5" style={{ color: 'var(--color-text-2)' }}>
                {t.author}: {book.author}
              </p>

              <div className="border-l-2 pl-4 mb-6" style={{ borderColor: book.accent }}>
                <p className="text-sm italic leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
                  "{book.note}"
                </p>
              </div>

              <a
                href={`https://openlibrary.org/isbn/${book.isbn}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-xs font-bold text-white transition-all"
                style={{
                  background: `${book.accent}20`,
                  border: `1px solid ${book.accent}60`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${book.accent}35`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${book.accent}20`;
                }}
              >
                {t.view}
                <FaExternalLinkAlt size={9} />
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-white"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            }}
            aria-label="Fechar"
          >
            <FaTimes size={12} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Currently reading hero ───────────────────────────────────────────────────
const CurrentlyReading = ({ books, language, onClick }) => {
  if (books.length === 0) return null;
  const t =
    language === 'pt'
      ? { tag: 'LENDO AGORA', cta: 'Ver detalhes' }
      : { tag: 'READING NOW', cta: 'View details' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: APPLE }}
      className="mb-16"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {books.map((book) => (
          <button
            key={book.id}
            onClick={() => onClick(book)}
            className="group relative text-left rounded-3xl overflow-hidden p-6 md:p-7"
            style={{
              background: 'rgba(13,10,30,0.78)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: `1px solid ${book.accent}40`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 60px ${book.accent}15`,
            }}
          >
            {/* Glow ambiente */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 20% 0%, ${book.accent}25 0%, transparent 60%)`,
              }}
            />

            <div className="relative flex gap-5 items-start">
              {/* Capa */}
              <div
                className="flex-shrink-0 w-24 md:w-28 aspect-[2/3] rounded-lg overflow-hidden"
                style={{
                  boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 30px ${book.accent}30`,
                }}
              >
                <BookCover book={book} className="w-full h-full" />
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inset-0 rounded-full opacity-75"
                      style={{ background: book.accent }}
                    />
                    <span
                      className="relative rounded-full h-2 w-2 block"
                      style={{ background: book.accent }}
                    />
                  </span>
                  <span
                    className="text-[9px] font-mono font-bold tracking-[0.25em]"
                    style={{ color: book.accent }}
                  >
                    {t.tag}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight mb-2">
                  {book.title}
                </h3>
                <p
                  className="text-xs font-light mb-3"
                  style={{ color: 'var(--color-text-2)' }}
                >
                  {book.author}
                </p>

                <p
                  className="text-[11px] italic leading-relaxed line-clamp-3"
                  style={{ color: 'var(--color-text-3)' }}
                >
                  "{book.note}"
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const AllBooks = ({ language = 'pt' }) => {
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');

  const allBooks = booksData[language] || booksData.pt;
  const categories = BOOK_CATEGORIES[language] || BOOK_CATEGORIES.pt;
  const statusList = ['all', 'reading', 'finished', 'wishlist'];

  const reading = useMemo(
    () => allBooks.filter((b) => b.status === 'reading'),
    [allBooks]
  );

  // Filtros
  const filtered = useMemo(() => {
    return allBooks.filter((b) => {
      if (category !== 'all' && b.category !== category) return false;
      if (status !== 'all' && b.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !b.title.toLowerCase().includes(q) &&
          !b.author.toLowerCase().includes(q) &&
          !b.tag.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [allBooks, category, status, search]);

  const text = {
    pt: {
      back: 'Voltar',
      tag: '// bookshelf',
      title: 'Estante Completa.',
      subtitle:
        'Cada livro aqui moldou minha forma de pensar — código, sistemas, história, filosofia e arte.',
      filters: 'Filtros',
      categories: 'Categorias',
      statusLabel: 'Status',
      search: 'Buscar por título, autor ou tag...',
      empty: 'Nenhum livro encontrado com esses filtros.',
      clear: 'Limpar filtros',
      total: 'livros',
    },
    en: {
      back: 'Back',
      tag: '// bookshelf',
      title: 'Full Bookshelf.',
      subtitle:
        'Each book here shaped how I think — code, systems, history, philosophy, and art.',
      filters: 'Filters',
      categories: 'Categories',
      statusLabel: 'Status',
      search: 'Search by title, author or tag...',
      empty: 'No books match these filters.',
      clear: 'Clear filters',
      total: 'books',
    },
  }[language];

  const hasActiveFilters = category !== 'all' || status !== 'all' || search;

  return (
    <section className="py-28 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* ── Back link ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: APPLE }}
          className="mb-8"
        >
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] hover:text-white transition-colors"
            style={{ color: 'var(--color-text-3)' }}
          >
            <FaArrowLeft size={10} />
            {text.back}
          </Link>
        </motion.div>

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-mono tracking-[0.35em] uppercase mb-3"
            style={{ color: 'var(--color-text-3)' }}
          >
            {text.tag}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 1 }}
          >
            {text.title}
          </motion.h1>
          <motion.span variants={fadeUp} className="accent-bar block" />
          <motion.p
            variants={fadeUp}
            className="text-base font-light mt-5 max-w-2xl"
            style={{ color: 'var(--color-text-2)' }}
          >
            {text.subtitle}
          </motion.p>
        </motion.div>

        {/* ── Currently reading hero ── */}
        <CurrentlyReading books={reading} language={language} onClick={setSelected} />

        {/* ── Filtros ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: APPLE, delay: 0.2 }}
          className="mb-10 space-y-5"
        >
          {/* Search */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <FaSearch
              size={13}
              className="absolute left-5 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--color-text-3)' }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={text.search}
              className="w-full bg-transparent text-white text-sm pl-12 pr-12 py-4 focus:outline-none placeholder-slate-600"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-3)' }}
                aria-label="Limpar busca"
              >
                <FaTimes size={9} />
              </button>
            )}
          </div>

          {/* Categoria + Status em linhas */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = category === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all"
                  style={{
                    background: active ? 'rgba(124,58,237,0.20)' : 'rgba(255,255,255,0.03)',
                    border: active
                      ? '1px solid rgba(124,58,237,0.6)'
                      : '1px solid rgba(255,255,255,0.08)',
                    color: active ? '#fff' : 'var(--color-text-3)',
                    boxShadow: active ? '0 0 20px rgba(124,58,237,0.25)' : 'none',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {statusList.map((s) => {
              const meta = STATUS_META[language][s];
              const Icon = meta.icon;
              const active = status === s;
              return (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all"
                  style={{
                    background: active ? `${meta.color}20` : 'rgba(255,255,255,0.03)',
                    border: active
                      ? `1px solid ${meta.color}80`
                      : '1px solid rgba(255,255,255,0.08)',
                    color: active ? meta.color : 'var(--color-text-3)',
                    boxShadow: active ? `0 0 20px ${meta.color}25` : 'none',
                  }}
                >
                  <Icon size={9} />
                  {meta.label}
                </button>
              );
            })}
          </div>

          {/* Counter + clear */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p
              className="text-[10px] font-mono tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-text-3)' }}
            >
              <span className="text-white font-bold text-sm">{filtered.length}</span> / {allBooks.length} {text.total}
            </p>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setCategory('all');
                  setStatus('all');
                  setSearch('');
                }}
                className="text-[10px] font-mono uppercase tracking-[0.2em] hover:text-white transition-colors"
                style={{ color: 'var(--color-text-3)' }}
              >
                × {text.clear}
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                language={language}
                onClick={setSelected}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FaBookOpen
              size={48}
              className="mx-auto mb-4 opacity-20"
              style={{ color: 'var(--color-text-3)' }}
            />
            <p style={{ color: 'var(--color-text-3)' }}>{text.empty}</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <BookModal
          book={selected}
          language={language}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default AllBooks;
