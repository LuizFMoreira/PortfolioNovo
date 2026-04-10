import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FaGraduationCap,
  FaBriefcase,
  FaBookOpen,
  FaCode,
} from 'react-icons/fa';

// ─── Última atualização ───────────────────────────────────────────────────────
const LAST_UPDATE = new Date('2026-04-07');

const ACTIVITIES = {
  pt: [
    { icon: FaGraduationCap, label: 'Estudando', title: 'Grafos & Algoritmos II', sub: 'PUC Minas · 4º período', accent: '#A78BFA', glow: 'rgba(167,139,250,0.35)' },
    { icon: FaBriefcase,     label: 'Trabalhando em', title: 'Backend Groohub',  sub: 'NestJS · TypeScript · PostgreSQL', accent: '#22D3EE', glow: 'rgba(34,211,238,0.35)' },
    { icon: FaCode,          label: 'Construindo',    title: 'Sistema RLS & HTTPS', sub: 'Padrões de projeto · Métodos ágeis', accent: '#F59E0B', glow: 'rgba(245,158,11,0.35)' },
    { icon: FaBookOpen,      label: 'Lendo',          title: 'Clean Architecture', sub: 'Robert C. Martin', accent: '#10B981', glow: 'rgba(16,185,129,0.35)' },
  ],
  en: [
    { icon: FaGraduationCap, label: 'Studying',    title: 'Graphs & Algorithms II', sub: 'PUC Minas · 4th semester', accent: '#A78BFA', glow: 'rgba(167,139,250,0.35)' },
    { icon: FaBriefcase,     label: 'Working on',  title: 'Groohub Backend', sub: 'NestJS · TypeScript · PostgreSQL', accent: '#22D3EE', glow: 'rgba(34,211,238,0.35)' },
    { icon: FaCode,          label: 'Building',    title: 'RLS & HTTPS System', sub: 'Design patterns · Agile methods', accent: '#F59E0B', glow: 'rgba(245,158,11,0.35)' },
    { icon: FaBookOpen,      label: 'Reading',     title: 'Clean Architecture', sub: 'Robert C. Martin', accent: '#10B981', glow: 'rgba(16,185,129,0.35)' },
  ],
};

const getTimeAgo = (lang) => {
  const diffDays = Math.floor((new Date() - LAST_UPDATE) / 86400000);
  if (lang === 'pt') {
    if (diffDays === 0) return 'hoje';
    if (diffDays === 1) return 'ontem';
    if (diffDays < 7)  return `há ${diffDays} dias`;
    if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} sem`;
    return `há ${Math.floor(diffDays / 30)} mês${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`;
  }
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7)  return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

const STATS_PT = [
  { n: '4º',  label: 'Período',    sub: 'Engenharia de Software' },
  { n: '3+',  label: 'Projetos',   sub: 'Construídos e entregues' },
  { n: 'PUC', label: 'Minas',      sub: 'Pontifícia Universidade' },
];
const STATS_EN = [
  { n: '4th', label: 'Semester',  sub: 'Software Engineering' },
  { n: '3+',  label: 'Projects',  sub: 'Built and shipped' },
  { n: 'PUC', label: 'Minas',     sub: 'Pontifical University' },
];

const CurrentlyBlock = ({ language }) => {
  const [index, setIndex] = useState(0);
  const activities = ACTIVITIES[language] || ACTIVITIES.pt;
  const current = activities[index];
  const Icon = current.icon;
  const timeAgo = getTimeAgo(language);
  const label = language === 'pt' ? 'Agora' : 'Now';
  const updated = language === 'pt' ? 'atualizado' : 'updated';

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % activities.length), 4500);
    return () => clearInterval(id);
  }, [activities.length]);

  useEffect(() => { setIndex(0); }, [language]);

  return (
    <motion.div
      variants={fadeUp}
      className="bento-card overflow-hidden relative"
      style={{ background: 'rgba(13,10,30,0.55)' }}
    >
      {/* Glow dinâmico */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 10% 50%, ${current.glow} 0%, transparent 60%)`,
          transition: 'background 0.8s ease',
        }}
      />

      <div className="relative p-6 flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-400 block" />
            </span>
            <span className="text-[9px] font-mono font-bold tracking-[0.28em] uppercase" style={{ color: '#10B981' }}>
              {label}
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-[0.12em]" style={{ color: 'var(--color-text-3)' }}>
            {updated} {timeAgo}
          </span>
        </div>

        {/* Atividade em destaque */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            {/* Ícone grande */}
            <div
              className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl"
              style={{
                background: `${current.accent}15`,
                border: `1px solid ${current.accent}35`,
                boxShadow: `0 0 24px ${current.glow}`,
              }}
            >
              <Icon size={22} style={{ color: current.accent }} />
            </div>

            {/* Texto */}
            <div className="min-w-0 flex-1">
              <p
                className="text-[9px] font-mono font-bold tracking-[0.22em] uppercase mb-1"
                style={{ color: current.accent }}
              >
                {current.label}
              </p>
              <p className="text-base font-bold text-white leading-tight mb-0.5 truncate">
                {current.title}
              </p>
              <p className="text-xs font-light truncate" style={{ color: 'var(--color-text-2)' }}>
                {current.sub}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicadores das outras atividades */}
        <div className="flex items-center gap-2">
          {activities.map((a, i) => {
            const AIcon = a.icon;
            const isActive = i === index;
            return (
              <button
                key={i}
                onClick={() => setIndex(i)}
                title={a.title}
                className="flex items-center justify-center rounded-lg transition-all duration-300"
                style={{
                  width: isActive ? '36px' : '28px',
                  height: '28px',
                  background: isActive ? `${a.accent}20` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? `${a.accent}50` : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isActive ? `0 0 12px ${a.glow}` : 'none',
                }}
              >
                <AIcon size={11} style={{ color: isActive ? a.accent : 'rgba(255,255,255,0.3)' }} />
              </button>
            );
          })}

          {/* Contador */}
          <span
            className="ml-auto text-[9px] font-mono tracking-[0.15em]"
            style={{ color: 'var(--color-text-3)' }}
          >
            {String(index + 1).padStart(2, '0')}/{String(activities.length).padStart(2, '0')}
          </span>
        </div>

      </div>
    </motion.div>
  );
};

const About = ({ language }) => {
  const content = {
    pt: {
      title: 'Sobre Mim.',
      description: 'Sou estudante do 4º período de Engenharia de Software na PUC Minas e Desenvolvedor Full Stack.',
      focus: 'Minha trajetória é focada em projetar arquiteturas eficientes e construir soluções escaláveis de ponta a ponta. Tecnicamente, atuo com domínio do ecossistema Java e Spring Boot no back-end, integrando bancos de dados relacionais com interfaces modernas, tipadas e reativas construídas em React, TypeScript e Next.js.',
      goals: 'Acredito que o rigor analítico e matemático — princípios que aplico diariamente em Cálculo e Algoritmos — é fundamental para a criação de sistemas limpos e manuteníveis.',
    },
    en: {
      title: 'About Me.',
      description: 'I am a 4th-period Software Engineering student at PUC Minas and a Full Stack Developer.',
      focus: 'My journey is focused on designing efficient architectures and building scalable end-to-end solutions. Technically, I work with the Java and Spring Boot ecosystem on the back-end, integrating relational databases with modern, strongly-typed, and reactive interfaces built in React, TypeScript, and Next.js.',
      goals: 'I believe that analytical and mathematical rigor—principles I apply daily in Calculus and Algorithms courses—is fundamental for creating clean, maintainable systems.',
    },
  };

  const text  = content[language];
  const stats = language === 'pt' ? STATS_PT : STATS_EN;

  return (
    <section id="sobre" className="py-28 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-mono tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--color-text-3)' }}>
            {language === 'pt' ? '// about_me' : '// about_me'}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            {text.title}
          </motion.h2>
          <motion.span variants={fadeUp} className="accent-bar" />
        </motion.div>

        {/* ── STAT CARDS ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bento-card p-6 flex flex-col gap-1 group"
            >
              {/* Big number */}
              <span
                className="font-black tracking-tight leading-none"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 4.5rem)',
                  background: i === 0
                    ? 'linear-gradient(135deg, #7C3AED, #22D3EE)'
                    : i === 1
                    ? 'linear-gradient(135deg, #22D3EE, #7C3AED)'
                    : 'linear-gradient(135deg, #9333EA, #4F46E5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.n}
              </span>
              <span className="text-lg font-bold text-white">{s.label}</span>
              <span className="text-xs" style={{ color: 'var(--color-text-3)' }}>{s.sub}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CURRENTLY ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="mb-8"
        >
          <CurrentlyBlock language={language} />
        </motion.div>

        {/* ── TEXT + QUOTE ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Left: main text */}
          <motion.div variants={fadeUp} className="space-y-5">
            <p className="text-lg md:text-xl font-medium text-white leading-snug">
              {text.description}
            </p>
            <p className="text-base font-light leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
              {text.focus}
            </p>
          </motion.div>

          {/* Right: quote card */}
          <motion.div
            variants={fadeUp}
            className="bento-card p-8 flex flex-col justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(34,211,238,0.04) 100%)',
            }}
          >
            {/* Quote mark */}
            <span
              className="font-black leading-none mb-4 select-none"
              style={{
                fontSize: '4rem',
                background: 'var(--grad-bar)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              "
            </span>
            <p className="italic text-base leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
              {text.goals}
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
