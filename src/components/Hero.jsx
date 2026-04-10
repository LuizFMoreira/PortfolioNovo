import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Easing ──────────────────────────────────────────────────────────────────
const APPLE = [0.16, 1, 0.3, 1];

// ─── Variants ────────────────────────────────────────────────────────────────
const lineReveal = {
  hidden:  { y: '110%', opacity: 0 },
  visible: { y: '0%',   opacity: 1, transition: { duration: 1.1, ease: APPLE } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.8, ease: APPLE } },
};

const leftContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const photoEnter = {
  hidden:  { opacity: 0, scale: 0.94, x: 30 },
  visible: { opacity: 1, scale: 1,    x: 0,
    transition: { duration: 1.1, delay: 0.15, ease: APPLE },
  },
};

const CHIPS = ['Java', 'Spring Boot', 'React', 'TypeScript', 'Next.js'];

// ─── Component ───────────────────────────────────────────────────────────────
const Hero = ({ language }) => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.5], ['0%', '-8%']);
  const photoY         = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const isPt = language === 'pt';

  const t = {
    label:       isPt ? '4º período · PUC Minas'            : '4th semester · PUC Minas',
    role:        isPt ? 'Software Engineer & Full Stack Developer' : 'Software Engineer & Full Stack Developer',
    description: isPt
      ? 'Arquiteturas escaláveis de ponta a ponta — APIs robustas com Java & Spring Boot, interfaces reativas com React & TypeScript.'
      : 'Scalable end-to-end architectures — robust APIs with Java & Spring Boot, reactive UIs with React & TypeScript.',
    btn1:    isPt ? 'Explorar Projetos'  : 'Explore Projects',
    btn2:    isPt ? 'Falar Comigo'       : 'Get in Touch',
    status:  isPt ? 'Disponível para novos projetos' : 'Available for new projects',
    scroll:  isPt ? 'scroll para explorar' : 'scroll to explore',
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] flex items-center px-6 overflow-hidden"
      style={{ paddingTop: 'clamp(5rem, 10vw, 7rem)', paddingBottom: '4rem' }}
    >
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-[55%_45%] gap-10 xl:gap-16 items-center">

          {/* ════════════════════════════════════════
              LEFT — Editorial Typography
              ════════════════════════════════════════ */}
          <motion.div
            variants={leftContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col text-center lg:text-left"
          >
            {/* Label */}
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-mono tracking-[0.35em] uppercase mb-6"
              style={{ color: 'var(--color-text-3)' }}
            >
              {t.label}
            </motion.p>

            {/* MASSIVE NAME */}
            <div className="mb-4 leading-[0.88]">
              <div className="overflow-hidden">
                <motion.h1
                  variants={lineReveal}
                  className="font-black tracking-[-0.04em] text-white block"
                  style={{ fontSize: 'clamp(5rem, 13vw, 10rem)' }}
                >
                  LUIZ
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  variants={lineReveal}
                  className="font-black tracking-[-0.04em] text-gradient block"
                  style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
                >
                  FERNANDO.
                </motion.span>
              </div>
            </div>

            {/* Role */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-5 justify-center lg:justify-start"
            >
              <span
                className="h-px w-8 flex-shrink-0"
                style={{ background: 'var(--grad-bar)' }}
              />
              <span className="text-sm font-medium tracking-wide" style={{ color: 'var(--color-text-2)' }}>
                {t.role}
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-base font-light leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
              style={{ color: 'var(--color-text-2)' }}
            >
              {t.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
            >
              <a href="#projetos" className="btn-primary group">
                {t.btn1}
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#contato" className="btn-ghost">{t.btn2}</a>
            </motion.div>

            {/* Tech chips — horizontal scrollable row */}
            <motion.div variants={fadeUp} className="flex gap-2 flex-wrap justify-center lg:justify-start">
              {CHIPS.map((chip) => (
                <span key={chip} className="tech-chip">{chip}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════════
              RIGHT — Personal Photo + Floating Card
              ════════════════════════════════════════ */}
          <motion.div
            variants={photoEnter}
            initial="hidden"
            animate="visible"
            style={{ y: photoY }}
            className="hidden lg:block relative"
          >
            {/* Glow ring behind photo */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.18) 0%, rgba(34,211,238,0.08) 60%, transparent 100%)',
                transform: 'scale(1.08)',
              }}
            />

            {/* Photo container — explicit height so img renders correctly */}
            <div className="relative rounded-3xl overflow-hidden" style={{ height: 'clamp(480px, 70vh, 680px)' }}>

              {/* Personal photo — DOMINANT element */}
              <img
                src="/img/minhasfotos/luiz%20whats.jpeg"
                alt="Luiz Fernando Batista Moreira"
                loading="eager"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: 'center',
                  filter: 'brightness(0.88) contrast(1.06) saturate(1.1)',
                }}
              />

              {/* Gradient fade — bottom blends into page */}
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: '45%',
                  background: 'linear-gradient(to top, #06040F 0%, rgba(6,4,15,0.8) 40%, transparent 100%)',
                }}
              />

              {/* Gradient fade — top subtle vignette */}
              <div
                className="absolute inset-x-0 top-0 pointer-events-none"
                style={{
                  height: '25%',
                  background: 'linear-gradient(to bottom, rgba(6,4,15,0.5) 0%, transparent 100%)',
                }}
              />

              {/* ── Floating: Available badge — top-right ── */}
              <div
                className="absolute top-5 right-5 flex items-center gap-2 px-3 py-2 rounded-full"
                style={{
                  background: 'rgba(16,185,129,0.10)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-emerald-400 block" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#10B981' }}>
                  {t.status}
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: 'var(--color-text-3)' }}>
          {t.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--color-text-3)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3v12M4 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
