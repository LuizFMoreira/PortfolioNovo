import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub, FaArrowLeft, FaArrowRight,
  FaChevronLeft, FaChevronRight, FaExternalLinkAlt,
} from 'react-icons/fa';
import { projectsData } from '../data/projects';

const APPLE = [0.16, 1, 0.3, 1];

// ─── Hero Carousel ────────────────────────────────────────────────────────────
const HeroCarousel = ({ images, alt }) => {
  const [idx, setIdx] = useState(0);

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [prev, next]);

  if (!images?.length) return null;

  return (
    <div
      className="relative overflow-hidden rounded-3xl w-full"
      style={{ height: 'clamp(260px, 58vh, 640px)' }}
    >
      {/* Images */}
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          alt={`${alt} — ${idx + 1}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: APPLE }}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />

      {/* Counter */}
      <span
        className="absolute top-4 right-4 text-[11px] font-mono px-3 py-1 rounded-full"
        style={{
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        {idx + 1} / {images.length}
      </span>

      {/* Keyboard hint */}
      {images.length > 1 && (
        <span
          className="absolute top-4 left-4 text-[9px] font-mono px-2.5 py-1 rounded-full hidden md:block"
          style={{
            background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(6px)',
          }}
        >
          ← →
        </span>
      )}

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            style={{
              background: 'rgba(0,0,0,0.50)',
              border: '1px solid rgba(255,255,255,0.13)',
              backdropFilter: 'blur(12px)',
            }}
            aria-label="Imagem anterior"
          >
            <FaChevronLeft size={13} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            style={{
              background: 'rgba(0,0,0,0.50)',
              border: '1px solid rgba(255,255,255,0.13)',
              backdropFilter: 'blur(12px)',
            }}
            aria-label="Próxima imagem"
          >
            <FaChevronRight size={13} />
          </button>
        </>
      )}

      {/* Dot strip */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{
                height: '5px',
                width: i === idx ? '22px' : '5px',
                background: i === idx ? 'var(--accent-violet)' : 'rgba(255,255,255,0.35)',
              }}
              aria-label={`Imagem ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Stat pill ────────────────────────────────────────────────────────────────
const Stat = ({ value, label }) => (
  <div
    className="flex flex-col items-center px-5 py-3 rounded-2xl flex-1"
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
    }}
  >
    <span className="text-2xl font-black text-white leading-none mb-1">{value}</span>
    <span
      className="text-[9px] uppercase tracking-widest font-mono text-center"
      style={{ color: 'var(--color-text-3)' }}
    >
      {label}
    </span>
  </div>
);

// ─── ProjectDetail ────────────────────────────────────────────────────────────
const ProjectDetail = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const allProjects = projectsData[language] || projectsData['pt'];
  const projectIndex = allProjects.findIndex((p) => String(p.id) === id);
  const project = allProjects[projectIndex];

  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : null;

  useEffect(() => {
    if (!project) navigate('/todos-projetos', { replace: true });
    window.scrollTo(0, 0);
  }, [project, navigate, id]);

  if (!project) return null;

  const isPt = language === 'pt';
  const t = {
    back:    isPt ? '← Galeria de Projetos'  : '← Project Gallery',
    about:   isPt ? '// sobre o projeto'     : '// about',
    stack:   isPt ? '// tecnologias'         : '// stack',
    links:   isPt ? '// links'               : '// links',
    stats:   isPt ? '// estatísticas'        : '// stats',
    imgs:    isPt ? 'screenshots'            : 'screenshots',
    techs:   isPt ? 'tecnologias'            : 'technologies',
    prev:    isPt ? 'Projeto Anterior'       : 'Previous Project',
    next:    isPt ? 'Próximo Projeto'        : 'Next Project',
    github:  'GitHub',
    demo:    isPt ? 'Ver Demo'               : 'Live Demo',
  };

  // Tag colours cycling
  const TAG_STYLES = [
    { bg: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.3)',  color: '#A78BFA' },
    { bg: 'rgba(34,211,238,0.10)', border: 'rgba(34,211,238,0.25)', color: '#67E8F9' },
    { bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.25)', color: '#FCD34D' },
  ];
  const tagStyle = TAG_STYLES[projectIndex % TAG_STYLES.length];

  return (
    <div
      className="min-h-screen relative pb-24 px-6"
      style={{ paddingTop: 'clamp(5rem, 10vw, 7rem)' }}
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Top bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: APPLE }}
          className="flex items-center justify-between mb-10"
        >
          <Link
            to="/todos-projetos"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors group"
            style={{ color: 'var(--color-text-3)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-1)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-3)')}
          >
            <FaArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            {t.back.replace('← ', '')}
          </Link>

          <span
            className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{
              background: tagStyle.bg,
              border: `1px solid ${tagStyle.border}`,
              color: tagStyle.color,
            }}
          >
            {project.tag}
          </span>
        </motion.div>

        {/* ── Hero carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: APPLE }}
          className="mb-12"
        >
          <HeroCarousel images={project.images} alt={project.alt || project.title} />
        </motion.div>

        {/* ── Content grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: APPLE }}
          className="grid lg:grid-cols-[1fr_340px] gap-10 xl:gap-16 mb-16"
        >
          {/* Left — title + description */}
          <div>
            <p
              className="text-[11px] font-mono tracking-[0.35em] uppercase mb-4"
              style={{ color: 'var(--color-text-3)' }}
            >
              {t.about}
            </p>
            <h1
              className="font-black text-white leading-[0.9] mb-5"
              style={{
                fontSize: 'clamp(2rem, 5.5vw, 4rem)',
                letterSpacing: '-0.03em',
              }}
            >
              {project.title}
            </h1>
            <span className="accent-bar block mb-7" />
            <p
              className="text-base leading-[1.9]"
              style={{ color: 'var(--color-text-2)', maxWidth: '58ch' }}
            >
              {project.description}
            </p>
          </div>

          {/* Right — stack + links + stats */}
          <div className="flex flex-col gap-8">

            {/* Tech stack */}
            <div>
              <p
                className="text-[11px] font-mono tracking-[0.35em] uppercase mb-3"
                style={{ color: 'var(--color-text-3)' }}
              >
                {t.stack}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((chip, i) => (
                  <span key={i} className="tech-chip">{chip}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <p
                className="text-[11px] font-mono tracking-[0.35em] uppercase mb-3"
                style={{ color: 'var(--color-text-3)' }}
              >
                {t.links}
              </p>
              <div className="flex flex-col gap-2.5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-white transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.10)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(124,58,237,0.12)';
                      e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                    }}
                  >
                    <FaGithub size={16} />
                    {t.github}
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-3 text-sm justify-center"
                  >
                    <FaExternalLinkAlt size={13} /> {t.demo}
                  </a>
                )}
              </div>
            </div>

            {/* Stats */}
            <div>
              <p
                className="text-[11px] font-mono tracking-[0.35em] uppercase mb-3"
                style={{ color: 'var(--color-text-3)' }}
              >
                {t.stats}
              </p>
              <div className="flex gap-3">
                <Stat value={project.images.length} label={t.imgs} />
                <Stat value={project.tech.length} label={t.techs} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Project navigation ── */}
        {(prevProject || nextProject) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: APPLE }}
            className="flex items-stretch justify-between gap-4 pt-8"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {prevProject ? (
              <Link
                to={`/projetos/${prevProject.id}`}
                className="flex items-center gap-3 group flex-1 py-4 px-5 rounded-2xl transition-all"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <FaArrowLeft
                  size={12}
                  style={{ color: 'var(--color-text-3)', flexShrink: 0 }}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <div>
                  <p
                    className="text-[9px] uppercase tracking-widest font-mono mb-0.5"
                    style={{ color: 'var(--color-text-3)' }}
                  >
                    {t.prev}
                  </p>
                  <p className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors leading-snug">
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                to={`/projetos/${nextProject.id}`}
                className="flex items-center gap-3 text-right group flex-1 justify-end py-4 px-5 rounded-2xl transition-all"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <div>
                  <p
                    className="text-[9px] uppercase tracking-widest font-mono mb-0.5"
                    style={{ color: 'var(--color-text-3)' }}
                  >
                    {t.next}
                  </p>
                  <p className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors leading-snug">
                    {nextProject.title}
                  </p>
                </div>
                <FaArrowRight
                  size={12}
                  style={{ color: 'var(--color-text-3)', flexShrink: 0 }}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
