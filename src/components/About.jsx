import { motion } from 'framer-motion';

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
