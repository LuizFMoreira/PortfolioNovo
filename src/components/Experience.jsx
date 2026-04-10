import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCodeBranch, FaTerminal, FaAngleRight, FaLayerGroup } from 'react-icons/fa';

const APPLE = [0.16, 1, 0.3, 1];

// ─── Data ─────────────────────────────────────────────────────────────────────
const EXPERIENCE_DATA = {
  pt: [
    {
      id: 1,
      role: "Estagiário de Desenvolvimento Backend",
      roleShort: "Backend Dev",
      company: "Groohub",
      period: "Mar. 2026 — Presente",
      description:
        "Responsável pelo desenvolvimento completo do backend de uma plataforma moderna — desde modelagem de banco de dados e schemas até autenticação, proteção de dados e segurança em nível de servidor.",
      techStack: ["NestJS", "TypeScript", "PostgreSQL", "RLS", "HTTPS"],
      achievements: [
        "Desenvolvimento do backend completo com NestJS e TypeScript, incluindo rotas HTTP e autenticação.",
        "Implementação de Row Level Security (RLS) e proteção de dados em nível de banco de dados.",
        "Aplicação de padrões de projeto, metodologias ágeis e boas práticas de arquitetura.",
      ],
      pos: { x: 50, y: 16 },
      accent: '#F59E0B',
      glow: '0 0 28px rgba(245,158,11,0.55)',
      dimGlow: '0 0 10px rgba(245,158,11,0.2)',
      textColor: 'text-neon-amber',
      bgCore: 'bg-amber-500',
      gradId: 'grad-amber',
      tag: 'Estágio · Atual',
    },
    {
      id: 2,
      role: "Desenvolvedor & Líder de Equipe",
      roleShort: "Dev & Tech Lead",
      company: "Laboratório LIM",
      period: "Out. 2025 — Presente",
      description:
        "Desenvolvimento de software para gestão de estágios universitários, com liderança técnica da equipe e aplicação de princípios sólidos de arquitetura e engenharia de requisitos.",
      techStack: ["Java", "Spring Boot", "TypeScript", "Next.js"],
      achievements: [
        "Liderança técnica e delegação de tarefas ágeis para a equipe de desenvolvimento.",
        "Aplicação prática de Engenharia de Requisitos para levantamento e modelagem do sistema.",
        "Integração de banco de dados relacional com interfaces modernas e tipadas.",
      ],
      pos: { x: 18, y: 76 },
      accent: '#22D3EE',
      glow: '0 0 28px rgba(34,211,238,0.55)',
      dimGlow: '0 0 10px rgba(34,211,238,0.2)',
      textColor: 'text-neon-cyan',
      bgCore: 'bg-cyan-500',
      gradId: 'grad-cyan',
      tag: 'Pesquisa · Atual',
    },
    {
      id: 3,
      role: "Gestor de Projetos",
      roleShort: "Project Manager",
      company: "PUC Minas (Hackathon)",
      period: "Jun. 2025",
      description:
        "Gerenciamento estratégico e coordenação de equipes durante maratona de desenvolvimento, com entrega do MVP dentro do prazo crítico estabelecido.",
      techStack: ["Metodologias Ágeis", "Gestão de Ciclo de Vida", "Figma", "MVP"],
      achievements: [
        "Coordenação do ciclo de vida da aplicação do zero à prova de conceito.",
        "Garantia da entrega do MVP dentro do prazo crítico estabelecido.",
        "Resolução de conflitos lógicos e priorização de features de alto impacto.",
      ],
      pos: { x: 82, y: 76 },
      accent: '#A855F7',
      glow: '0 0 28px rgba(168,85,247,0.55)',
      dimGlow: '0 0 10px rgba(168,85,247,0.2)',
      textColor: 'text-purple-400',
      bgCore: 'bg-purple-500',
      gradId: 'grad-purple',
      tag: 'Evento',
    },
  ],
  en: [
    {
      id: 1,
      role: "Backend Development Intern",
      roleShort: "Backend Dev",
      company: "Groohub",
      period: "Mar. 2026 — Present",
      description:
        "Responsible for the complete backend development of a modern platform — from database modeling and schemas to authentication, data protection, and server-level security.",
      techStack: ["NestJS", "TypeScript", "PostgreSQL", "RLS", "HTTPS"],
      achievements: [
        "Full backend development with NestJS and TypeScript, including HTTP routes and authentication.",
        "Implementation of Row Level Security (RLS) and database-level data protection.",
        "Application of design patterns, agile methodologies, and architecture best practices.",
      ],
      pos: { x: 50, y: 16 },
      accent: '#F59E0B',
      glow: '0 0 28px rgba(245,158,11,0.55)',
      dimGlow: '0 0 10px rgba(245,158,11,0.2)',
      textColor: 'text-neon-amber',
      bgCore: 'bg-amber-500',
      gradId: 'grad-amber',
      tag: 'Internship · Current',
    },
    {
      id: 2,
      role: "Developer & Team Lead",
      roleShort: "Dev & Tech Lead",
      company: "LIM Laboratory",
      period: "Oct. 2025 — Present",
      description:
        "Software development for university internship management, with technical team leadership and solid architecture principles and requirements engineering.",
      techStack: ["Java", "Spring Boot", "TypeScript", "Next.js"],
      achievements: [
        "Technical leadership and agile task delegation for the development team.",
        "Practical application of Requirements Engineering for system modeling.",
        "Relational database integration with modern, typed interfaces.",
      ],
      pos: { x: 18, y: 76 },
      accent: '#22D3EE',
      glow: '0 0 28px rgba(34,211,238,0.55)',
      dimGlow: '0 0 10px rgba(34,211,238,0.2)',
      textColor: 'text-neon-cyan',
      bgCore: 'bg-cyan-500',
      gradId: 'grad-cyan',
      tag: 'Research · Current',
    },
    {
      id: 3,
      role: "Project Manager",
      roleShort: "Project Manager",
      company: "PUC Minas (Hackathon)",
      period: "Jun. 2025",
      description:
        "Strategic project management and team coordination during a development marathon, delivering the MVP within the critical deadline.",
      techStack: ["Agile Methodologies", "Lifecycle Management", "Figma", "MVP"],
      achievements: [
        "Coordination of the application lifecycle from scratch to proof of concept.",
        "Ensured the delivery of the MVP within the established critical deadline.",
        "Resolution of logical conflicts and prioritization of high-impact features.",
      ],
      pos: { x: 82, y: 76 },
      accent: '#A855F7',
      glow: '0 0 28px rgba(168,85,247,0.55)',
      dimGlow: '0 0 10px rgba(168,85,247,0.2)',
      textColor: 'text-purple-400',
      bgCore: 'bg-purple-500',
      gradId: 'grad-purple',
      tag: 'Evento',
    },
  ],
};

const CENTER = { x: 50, y: 50 };

// ─── Particle along active edge ───────────────────────────────────────────────
const EdgeParticle = ({ exp, delay }) => (
  <motion.circle
    r="3"
    fill={exp.accent}
    style={{ filter: `drop-shadow(0 0 4px ${exp.accent})` }}
    animate={{
      cx: [`${CENTER.x}%`, `${exp.pos.x}%`],
      cy: [`${CENTER.y}%`, `${exp.pos.y}%`],
      opacity: [0, 1, 1, 0],
    }}
    transition={{ repeat: Infinity, duration: 1.8, delay, ease: 'linear' }}
  />
);

// ─── Node mini-card ───────────────────────────────────────────────────────────
const GraphNode = ({ exp, isActive, isDimmed, onClick }) => (
  <motion.div
    className="absolute cursor-pointer z-20"
    style={{ left: `${exp.pos.x}%`, top: `${exp.pos.y}%`, transform: 'translate(-50%, -50%)' }}
    animate={{
      scale: isDimmed ? 0.82 : 1,
      opacity: isDimmed ? 0.28 : 1,
      y: [0, -5, 0],
    }}
    transition={{
      scale: { type: 'spring', stiffness: 260, damping: 24 },
      opacity: { duration: 0.25 },
      y: { repeat: Infinity, duration: 3.2 + exp.id * 0.6, ease: 'easeInOut' },
    }}
    whileHover={{ scale: isDimmed ? 0.85 : 1.06 }}
    whileTap={{ scale: 0.94 }}
    onClick={onClick}
  >
    <div
      className="relative px-4 py-3 rounded-2xl transition-all duration-300 min-w-[130px]"
      style={{
        background: isActive ? `${exp.accent}18` : 'rgba(6,4,15,0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${isActive ? exp.accent + '70' : 'rgba(255,255,255,0.10)'}`,
        boxShadow: isActive ? exp.glow : exp.dimGlow,
      }}
    >
      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="node-indicator"
          className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
          style={{ background: exp.accent }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}

      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: exp.accent }}
        />
        <span
          className="text-[9px] font-mono uppercase tracking-widest truncate"
          style={{ color: exp.accent }}
        >
          {exp.company}
        </span>
      </div>
      <p className="text-[11px] font-semibold text-white leading-tight truncate max-w-[110px]">
        {exp.roleShort}
      </p>
    </div>
  </motion.div>
);

// ─── Experience ───────────────────────────────────────────────────────────────
const Experience = ({ language }) => {
  const experiences = EXPERIENCE_DATA[language];
  const [selectedNode, setSelectedNode] = useState(EXPERIENCE_DATA['pt'][0]);

  useEffect(() => {
    if (selectedNode) {
      const synced = EXPERIENCE_DATA[language].find(e => e.id === selectedNode.id);
      if (synced) setSelectedNode(synced);
    }
  }, [language]);

  const isPt = language === 'pt';

  return (
    <section id="experiencias" className="py-28 px-6 relative z-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start">

        {/* ══════════════════════════════════════
            LEFT — Graph panel
            ══════════════════════════════════════ */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: APPLE }}
          >
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--color-text-3)' }}>
              // experience
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              {isPt ? 'Topologia Profissional.' : 'Professional Topology.'}
            </h2>
            <span className="accent-bar" />
          </motion.div>

          {/* Graph container */}
          <div
            className="relative w-full rounded-3xl overflow-hidden"
            style={{
              height: 'clamp(420px, 55vh, 600px)',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.06) 0%, rgba(6,4,15,0.85) 70%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: 'inset 0 0 80px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Decorative grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Radar rings (estáticos — sem spin) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[160, 280, 400].map((size, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-white/[0.04]"
                  style={{
                    width: size,
                    height: size,
                    borderStyle: i === 1 ? 'dashed' : 'solid',
                  }}
                />
              ))}
            </div>

            {/* SVG — edges + particles */}
            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <defs>
                {/* Glow filter for active edges */}
                <filter id="edge-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Per-node gradients */}
                {experiences.map(exp => (
                  <linearGradient key={exp.gradId} id={exp.gradId} x1="50%" y1="50%" x2={`${exp.pos.x}%`} y2={`${exp.pos.y}%`} gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
                    <stop offset="100%" stopColor={exp.accent} stopOpacity="0.9" />
                  </linearGradient>
                ))}
              </defs>

              {/* Base shadow lines (always visible) */}
              {experiences.map(exp => (
                <line
                  key={`shadow-${exp.id}`}
                  x1={`${CENTER.x}%`} y1={`${CENTER.y}%`}
                  x2={`${exp.pos.x}%`} y2={`${exp.pos.y}%`}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              ))}

              {/* Active / dimmed edges */}
              {experiences.map(exp => {
                const isActive = selectedNode?.id === exp.id;
                const isDimmed = selectedNode && !isActive;
                return (
                  <motion.line
                    key={`edge-${exp.id}`}
                    x1={`${CENTER.x}%`} y1={`${CENTER.y}%`}
                    x2={`${exp.pos.x}%`} y2={`${exp.pos.y}%`}
                    stroke={isActive ? `url(#${exp.gradId})` : 'rgba(255,255,255,0.12)'}
                    strokeWidth={isActive ? 2.5 : 1}
                    strokeDasharray={isActive ? '10 5' : '3 8'}
                    filter={isActive ? 'url(#edge-glow)' : undefined}
                    animate={{
                      opacity: isDimmed ? 0.06 : 1,
                      strokeDashoffset: isActive ? [0, -120] : 0,
                    }}
                    transition={{
                      opacity: { duration: 0.3 },
                      strokeDashoffset: { repeat: Infinity, duration: 2.5, ease: 'linear' },
                    }}
                  />
                );
              })}

              {/* Particles na edge ativa */}
              {selectedNode && [0, 0.6, 1.2].map((delay, i) => (
                <EdgeParticle key={`p-${selectedNode.id}-${i}`} exp={selectedNode} delay={delay} />
              ))}
            </svg>

            {/* Central LF. node */}
            <motion.div
              className="absolute z-10"
              style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%`, transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(124,58,237,0.15)' }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              />
              <div
                className="relative w-20 h-20 rounded-full flex flex-col items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(6,4,15,0.9) 100%)',
                  border: '1.5px solid rgba(124,58,237,0.5)',
                  boxShadow: '0 0 40px rgba(124,58,237,0.3), inset 0 0 20px rgba(124,58,237,0.1)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <span className="text-lg font-black text-white tracking-wider leading-none">
                  LF<span style={{ color: '#22D3EE' }}>.</span>
                </span>
                <span className="text-[7px] text-slate-500 font-mono mt-0.5 tracking-[0.2em] uppercase">root</span>
              </div>
            </motion.div>

            {/* Graph nodes */}
            {experiences.map(exp => (
              <GraphNode
                key={exp.id}
                exp={exp}
                isActive={selectedNode?.id === exp.id}
                isDimmed={selectedNode && selectedNode.id !== exp.id}
                onClick={() => setSelectedNode(exp)}
              />
            ))}

            {/* Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-slate-600">
                {isPt ? 'clique em um nó para explorar' : 'click a node to explore'}
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT — Terminal / HUD panel
            ══════════════════════════════════════ */}
        <div className="w-full lg:w-1/2 flex flex-col">

          {/* Spacer aligns with header */}
          <div className="hidden lg:block" style={{ height: '144px' }} />

          <div
            className="relative w-full rounded-[2rem] overflow-hidden"
            style={{
              background: 'rgba(6,4,15,0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Terminal chrome */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <FaTerminal className="text-slate-600 text-xs ml-1" />
                <span className="text-[10px] text-slate-500 font-mono tracking-[0.25em] uppercase">exp_kernel_v3</span>
              </div>
              <div className="flex items-center gap-2">
                {selectedNode && (
                  <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                    NODE_0x0{selectedNode.id}
                  </span>
                )}
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: selectedNode?.accent ?? '#22D3EE' }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-7 md:p-10 min-h-[440px] flex flex-col">
              <AnimatePresence mode="wait">
                {selectedNode && (
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex flex-col h-full"
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `${selectedNode.accent}15`,
                          border: `1px solid ${selectedNode.accent}40`,
                          boxShadow: `0 0 20px ${selectedNode.accent}20`,
                        }}
                      >
                        <FaCodeBranch className={`text-xl ${selectedNode.textColor}`} />
                      </div>
                      <span
                        className="text-[9px] font-mono px-3 py-1.5 rounded-full"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'var(--color-text-3)',
                        }}
                      >
                        {selectedNode.period}
                      </span>
                    </div>

                    {/* Role + company */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-1">
                      {selectedNode.role}
                    </h3>
                    <p className={`text-sm font-bold uppercase tracking-[0.15em] mb-1 ${selectedNode.textColor}`}>
                      {selectedNode.company}
                    </p>
                    <span
                      className="inline-block text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full mb-6 w-fit"
                      style={{
                        background: `${selectedNode.accent}15`,
                        border: `1px solid ${selectedNode.accent}35`,
                        color: selectedNode.accent,
                      }}
                    >
                      {selectedNode.tag}
                    </span>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-7 border-l-2 pl-5 italic"
                      style={{
                        color: 'var(--color-text-2)',
                        borderColor: `${selectedNode.accent}35`,
                      }}
                    >
                      "{selectedNode.description}"
                    </p>

                    {/* Stack + Achievements */}
                    <div className="grid md:grid-cols-2 gap-6 flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FaLayerGroup className={`text-xs ${selectedNode.textColor}`} />
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                            Stack
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedNode.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-3 py-1.5 rounded-lg font-mono transition-colors"
                              style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: 'rgba(255,255,255,0.8)',
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.borderColor = `${selectedNode.accent}50`;
                                e.currentTarget.style.color = selectedNode.accent;
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${selectedNode.bgCore}`} />
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                            {isPt ? 'Atividades' : 'Highlights'}
                          </span>
                        </div>
                        <ul className="space-y-2.5">
                          {selectedNode.achievements.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-slate-400 group/item">
                              <FaAngleRight
                                className={`mt-0.5 flex-shrink-0 transition-transform group-hover/item:translate-x-1 ${selectedNode.textColor}`}
                                size={10}
                              />
                              <span className="leading-relaxed group-hover/item:text-white transition-colors">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
