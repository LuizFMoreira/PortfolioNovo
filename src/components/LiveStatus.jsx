import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGraduationCap,
  FaBriefcase,
  FaBookOpen,
  FaCode,
  FaChevronUp,
  FaTimes,
} from 'react-icons/fa';

// ─── Última atualização (edite quando publicar) ───────────────────────────────
const LAST_UPDATE = new Date('2026-04-07');

// ─── Atividades ── edite aqui sempre que quiser atualizar o portfolio ─────────
const ACTIVITIES = {
  pt: [
    {
      icon: FaGraduationCap,
      label: 'Estudando',
      title: 'Grafos & Algoritmos II',
      sub: 'PUC Minas · 4º período',
      accent: '#A78BFA',
      glow: 'rgba(167,139,250,0.45)',
    },
    {
      icon: FaBriefcase,
      label: 'Trabalhando em',
      title: 'Backend Groohub',
      sub: 'NestJS · TypeScript · PostgreSQL',
      accent: '#22D3EE',
      glow: 'rgba(34,211,238,0.45)',
    },
    {
      icon: FaCode,
      label: 'Construindo',
      title: 'Sistema RLS & HTTPS',
      sub: 'Padrões de projeto · Métodos ágeis',
      accent: '#F59E0B',
      glow: 'rgba(245,158,11,0.45)',
    },
    {
      icon: FaBookOpen,
      label: 'Lendo',
      title: 'Clean Architecture',
      sub: 'Robert C. Martin',
      accent: '#10B981',
      glow: 'rgba(16,185,129,0.45)',
    },
  ],
  en: [
    {
      icon: FaGraduationCap,
      label: 'Studying',
      title: 'Graphs & Algorithms II',
      sub: 'PUC Minas · 4th semester',
      accent: '#A78BFA',
      glow: 'rgba(167,139,250,0.45)',
    },
    {
      icon: FaBriefcase,
      label: 'Working on',
      title: 'Groohub Backend',
      sub: 'NestJS · TypeScript · PostgreSQL',
      accent: '#22D3EE',
      glow: 'rgba(34,211,238,0.45)',
    },
    {
      icon: FaCode,
      label: 'Building',
      title: 'RLS & HTTPS System',
      sub: 'Design patterns · Agile methods',
      accent: '#F59E0B',
      glow: 'rgba(245,158,11,0.45)',
    },
    {
      icon: FaBookOpen,
      label: 'Reading',
      title: 'Clean Architecture',
      sub: 'Robert C. Martin',
      accent: '#10B981',
      glow: 'rgba(16,185,129,0.45)',
    },
  ],
};

// Calcula tempo desde última atualização
const getTimeAgo = (lang) => {
  const now = new Date();
  const diffMs = now - LAST_UPDATE;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (lang === 'pt') {
    if (diffDays === 0) return 'hoje';
    if (diffDays === 1) return 'ontem';
    if (diffDays < 7) return `há ${diffDays} dias`;
    if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} sem`;
    return `há ${Math.floor(diffDays / 30)} mês${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`;
  }
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
};

const LiveStatus = ({ language = 'pt' }) => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const activities = ACTIVITIES[language] || ACTIVITIES.pt;
  const current = activities[index];
  const Icon = current.icon;

  // Carrossel automático a cada 4.5s (pausa quando fechado)
  useEffect(() => {
    if (!open || dismissed) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % activities.length);
    }, 4500);
    return () => clearInterval(id);
  }, [open, dismissed, activities.length]);

  // Reset índice quando trocar idioma
  useEffect(() => {
    setIndex(0);
  }, [language]);

  if (dismissed) return null;

  const labels = {
    pt: { live: 'AO VIVO', updated: 'atualizado', show: 'Status ao vivo' },
    en: { live: 'LIVE', updated: 'updated', show: 'Live status' },
  };
  const t = labels[language] || labels.pt;
  const timeAgo = getTimeAgo(language);

  return (
    <>
      {/* ═══════════ CARD EXPANDIDO ═══════════ */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="live-status-card"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 left-5 z-[60] hidden md:block"
            style={{ width: '290px' }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(13,10,30,0.78)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow:
                  '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Glow dinâmico de fundo */}
              <motion.div
                key={`glow-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 20% 0%, ${current.glow} 0%, transparent 60%)`,
                }}
              />

              {/* ── HEADER ── */}
              <div
                className="relative flex items-center justify-between px-4 pt-3 pb-2"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative rounded-full h-2 w-2 bg-emerald-400 block" />
                  </span>
                  <span
                    className="text-[9px] font-mono font-bold tracking-[0.25em]"
                    style={{ color: '#10B981' }}
                  >
                    {t.live}
                  </span>
                  <span
                    className="text-[9px] font-mono tracking-[0.15em]"
                    style={{ color: 'var(--color-text-3)' }}
                  >
                    · {t.updated} {timeAgo}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-6 h-6 flex items-center justify-center rounded-md transition-colors"
                    style={{ color: 'var(--color-text-3)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--color-text-3)';
                    }}
                    aria-label="Minimizar"
                  >
                    <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                      <path d="M0 1h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDismissed(true)}
                    className="w-6 h-6 flex items-center justify-center rounded-md transition-colors"
                    style={{ color: 'var(--color-text-3)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239,68,68,0.12)';
                      e.currentTarget.style.color = '#F87171';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--color-text-3)';
                    }}
                    aria-label="Fechar"
                  >
                    <FaTimes size={9} />
                  </button>
                </div>
              </div>

              {/* ── CONTEÚDO ANIMADO ── */}
              <div className="relative px-4 py-4" style={{ minHeight: '92px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3"
                  >
                    {/* Ícone com glow */}
                    <div
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl"
                      style={{
                        background: `${current.accent}18`,
                        border: `1px solid ${current.accent}40`,
                        boxShadow: `0 0 20px ${current.glow}`,
                      }}
                    >
                      <Icon size={15} style={{ color: current.accent }} />
                    </div>

                    {/* Texto */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[9px] font-mono font-semibold tracking-[0.2em] uppercase mb-1"
                        style={{ color: current.accent }}
                      >
                        {current.label}
                      </p>
                      <p className="text-[13px] font-bold text-white leading-tight mb-1 truncate">
                        {current.title}
                      </p>
                      <p
                        className="text-[10px] font-light leading-snug truncate"
                        style={{ color: 'var(--color-text-2)' }}
                      >
                        {current.sub}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── FOOTER: progresso + dots ── */}
              <div
                className="relative px-4 pb-3 pt-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {activities.map((a, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className="h-1 rounded-full transition-all duration-500"
                        style={{
                          width: i === index ? '20px' : '6px',
                          background:
                            i === index
                              ? a.accent
                              : 'rgba(255,255,255,0.15)',
                          boxShadow:
                            i === index ? `0 0 8px ${a.glow}` : 'none',
                        }}
                        aria-label={`Ir para ${a.label}`}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[8px] font-mono tracking-[0.15em]"
                    style={{ color: 'var(--color-text-3)' }}
                  >
                    {String(index + 1).padStart(2, '0')}/
                    {String(activities.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ BOTÃO MINIMIZADO (desktop) ═══════════ */}
      <AnimatePresence>
        {!open && !dismissed && (
          <motion.button
            key="live-status-min"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 left-5 z-[60] hidden md:flex items-center gap-2 px-3 py-2.5 rounded-full group"
            style={{
              background: 'rgba(13,10,30,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(124,58,237,0.3)',
              boxShadow:
                '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(124,58,237,0.2)',
            }}
            aria-label={t.show}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-400 block" />
            </span>
            <span
              className="text-[10px] font-mono font-bold tracking-[0.2em] text-white uppercase"
            >
              {t.live}
            </span>
            <FaChevronUp
              size={9}
              style={{ color: 'var(--color-text-3)' }}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveStatus;
