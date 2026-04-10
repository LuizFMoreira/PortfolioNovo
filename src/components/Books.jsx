import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen, FaCheck, FaBookmark, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { booksData, getBookCover } from '../data/books';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

// ─── Status meta ──────────────────────────────────────────────────────────────
const STATUS_META = {
  pt: {
    reading: { label: 'Lendo agora', icon: FaBookOpen, color: '#22D3EE' },
    finished: { label: 'Concluído', icon: FaCheck, color: '#10B981' },
    wishlist: { label: 'Lista de desejos', icon: FaBookmark, color: '#A78BFA' },
  },
  en: {
    reading: { label: 'Reading now', icon: FaBookOpen, color: '#22D3EE' },
    finished: { label: 'Finished', icon: FaCheck, color: '#10B981' },
    wishlist: { label: 'Wishlist', icon: FaBookmark, color: '#A78BFA' },
  },
};

// ─── Card individual de livro ─────────────────────────────────────────────────
const BookCard = ({ book, language, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const meta = STATUS_META[language][book.status];
  const StatusIcon = meta.icon;

  return (
    <motion.button
      variants={fadeUp}
      onClick={() => onClick(book)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative text-left focus:outline-none"
      style={{ perspective: '1000px' }}
    >
      {/* Capa do livro */}
      <div
        className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3"
        style={{
          background: `linear-gradient(135deg, ${book.accent}22, rgba(13,10,30,0.9))`,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 0 0 ${book.accent}00`,
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.5s ease, transform 0.5s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${book.accent}40`;
          e.currentTarget.style.transform = 'rotateY(-6deg) rotateX(2deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.6), 0 0 0 0 ${book.accent}00`;
          e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }}
      >
        {/* Imagem da capa via Open Library */}
        {!imgError ? (
          <img
            src={getBookCover(book.isbn, 'L')}
            alt={book.title}
            loading="lazy"
            onError={() => setImgError(true)}
            onLoad={(e) => {
              // Open Library devolve 1x1 transparente quando não acha — detecta
              if (e.target.naturalWidth < 10) setImgError(true);
            }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // Fallback elegante: tipografia
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
            style={{
              background: `linear-gradient(135deg, ${book.accent}30, rgba(13,10,30,0.95))`,
            }}
          >
            <FaBookOpen size={28} className="mb-3 opacity-30" style={{ color: book.accent }} />
            <p className="text-[11px] font-bold text-white leading-tight line-clamp-3">
              {book.title}
            </p>
            <p
              className="text-[9px] mt-2 font-light"
              style={{ color: 'var(--color-text-3)' }}
            >
              {book.author}
            </p>
          </div>
        )}

        {/* Spine shadow lateral (efeito de lombada) */}
        <div
          className="absolute inset-y-0 left-0 w-2 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)',
          }}
        />

        {/* Brilho diagonal no hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
          }}
        />

        {/* Badge de status no canto */}
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

        {/* Tag inferior */}
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

      {/* Texto abaixo do livro */}
      <div className="px-1">
        <p className="text-xs font-bold text-white leading-tight line-clamp-2 group-hover:text-white transition-colors mb-1">
          {book.title}
        </p>
        <p
          className="text-[10px] font-light line-clamp-1"
          style={{ color: 'var(--color-text-3)' }}
        >
          {book.author}
        </p>
      </div>
    </motion.button>
  );
};

// ─── Modal de detalhes ────────────────────────────────────────────────────────
const BookModal = ({ book, language, onClose }) => {
  const [imgError, setImgError] = useState(false);
  if (!book) return null;
  const meta = STATUS_META[language][book.status];
  const StatusIcon = meta.icon;
  const t = language === 'pt'
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
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
            {/* Capa grande */}
            <div
              className="aspect-[2/3] rounded-xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${book.accent}30, rgba(13,10,30,0.9))`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${book.accent}30`,
              }}
            >
              {!imgError ? (
                <img
                  src={getBookCover(book.isbn, 'L')}
                  alt={book.title}
                  onError={() => setImgError(true)}
                  onLoad={(e) => {
                    if (e.target.naturalWidth < 10) setImgError(true);
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaBookOpen size={48} style={{ color: book.accent, opacity: 0.4 }} />
                </div>
              )}
            </div>

            {/* Conteúdo */}
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
              <p
                className="text-sm font-light mb-5"
                style={{ color: 'var(--color-text-2)' }}
              >
                {t.author}: {book.author}
              </p>

              <div
                className="border-l-2 pl-4 mb-6"
                style={{ borderColor: book.accent }}
              >
                <p
                  className="text-sm italic leading-relaxed"
                  style={{ color: 'var(--color-text-2)' }}
                >
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

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-white transition-all"
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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Componente principal ─────────────────────────────────────────────────────
const Books = ({ language = 'pt' }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const allBooks = booksData[language] || booksData.pt;
  // Home mostra apenas livros marcados como featured
  const books = allBooks.filter((b) => b.featured);

  const content = {
    pt: {
      tag: '// bookshelf',
      title: 'Estante.',
      subtitle:
        'Os livros que moldam minha forma de pensar código, sistemas e carreira.',
      stats: {
        reading: 'Lendo',
        finished: 'Lidos',
        wishlist: 'Próximos',
      },
    },
    en: {
      tag: '// bookshelf',
      title: 'Bookshelf.',
      subtitle:
        'The books that shape how I think about code, systems, and career.',
      stats: {
        reading: 'Reading',
        finished: 'Read',
        wishlist: 'Next',
      },
    },
  };
  const text = content[language];

  // Contadores baseados na ESTANTE COMPLETA (não só destaques)
  const counts = {
    reading: allBooks.filter((b) => b.status === 'reading').length,
    finished: allBooks.filter((b) => b.status === 'finished').length,
    wishlist: allBooks.filter((b) => b.status === 'wishlist').length,
  };

  const ctaLabel = language === 'pt' ? 'Ver estante completa' : 'View full bookshelf';

  return (
    <section id="livros" className="py-28 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-mono tracking-[0.35em] uppercase mb-3"
            style={{ color: 'var(--color-text-3)' }}
          >
            {text.tag}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            {text.title}
          </motion.h2>
          <motion.span variants={fadeUp} className="accent-bar mx-auto block" />
          <motion.p
            variants={fadeUp}
            className="text-base font-light mt-5 max-w-xl mx-auto"
            style={{ color: 'var(--color-text-2)' }}
          >
            {text.subtitle}
          </motion.p>

          {/* Stats inline */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-6 mt-8 flex-wrap"
          >
            {Object.entries(counts).map(([key, count]) => {
              const meta = STATUS_META[language][key];
              const Icon = meta.icon;
              return (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 flex items-center justify-center rounded-full"
                    style={{
                      background: `${meta.color}15`,
                      border: `1px solid ${meta.color}40`,
                    }}
                  >
                    <Icon size={10} style={{ color: meta.color }} />
                  </div>
                  <span className="text-xl font-bold text-white">{count}</span>
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider"
                    style={{ color: 'var(--color-text-3)' }}
                  >
                    {text.stats[key]}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── Grid de livros (destaques) ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-6"
        >
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              language={language}
              onClick={setSelected}
            />
          ))}
        </motion.div>

        {/* ── CTA: ver estante completa ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => navigate('/livros')}
            className="group relative flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-[12px] uppercase tracking-[0.2em] text-white overflow-hidden"
            style={{
              background: 'rgba(124,58,237,0.10)',
              border: '1px solid rgba(124,58,237,0.35)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.20)';
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.6)';
              e.currentTarget.style.boxShadow = '0 0 32px rgba(124,58,237,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.10)';
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>{ctaLabel}</span>
            <FaArrowRight
              size={11}
              className="group-hover:translate-x-1 transition-transform"
            />
            <span
              className="text-[10px] font-mono ml-1 px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(124,58,237,0.25)',
                color: '#A78BFA',
              }}
            >
              {allBooks.length}
            </span>
          </button>
        </motion.div>
      </div>

      {/* ── Modal ── */}
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

export default Books;
