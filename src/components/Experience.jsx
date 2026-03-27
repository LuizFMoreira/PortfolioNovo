import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCodeBranch, FaTerminal, FaAngleRight, FaLayerGroup } from 'react-icons/fa';

const Experience = ({ language }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  // Esquema de Dados Expandido
  const experienceData = {
    pt: [
      {
        id: 1,
        role: "Desenvolvedor & Líder de Equipe",
        company: "Laboratório LIM",
        period: "Out. 2025 - Presente",
        description: "Desenvolvimento de software para gestão de estágios universitários, aplicando princípios sólidos de arquitetura.",
        techStack: ["Java", "Spring Boot", "TypeScript", "Next.js"],
        achievements: [
          "Liderança técnica e delegação de tarefas ágeis para a equipe de desenvolvimento.",
          "Aplicação prática de Engenharia de Requisitos para levantamento e modelagem do sistema.",
          "Integração de banco de dados relacional com interfaces modernas e tipadas."
        ],
        pos: { x: 25, y: 30 }, 
        color: "text-neon-cyan",
        borderGlow: "border-neon-cyan/50",
        glow: "shadow-[0_0_20px_rgba(34,211,238,0.4)]",
        bgCore: "bg-cyan-500",
        delay: 0
      },
      {
        id: 2,
        role: "Gestor de Projetos",
        company: "PUC Minas (Hackathon)",
        period: "Junho 2025",
        description: "Gerenciamento estratégico e coordenação de equipes durante a maratona de desenvolvimento estruturada.",
        techStack: ["Metodologias Ágeis", "Gestão de Ciclo de Vida", "Figma", "MVP"],
        achievements: [
          "Coordenação do ciclo de vida da aplicação do zero à prova de conceito.",
          "Garantia da entrega do MVP (Minimum Viable Product) dentro do prazo crítico estabelecido.",
          "Resolução de conflitos lógicos e priorização de features de alto impacto."
        ],
        pos: { x: 75, y: 65 },
        color: "text-neon-purple",
        borderGlow: "border-neon-purple/50",
        glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
        bgCore: "bg-purple-500",
        delay: 0.2
      }
    ],
    en: [
      {
        id: 1,
        role: "Developer & Team Lead",
        company: "LIM Laboratory",
        period: "Oct. 2025 - Present",
        description: "Software development for university internship management, applying solid architecture principles.",
        techStack: ["Java", "Spring Boot", "TypeScript", "Next.js"],
        achievements: [
          "Technical leadership and agile task delegation for the development team.",
          "Practical application of Requirements Engineering for system modeling.",
          "Relational database integration with modern, typed interfaces."
        ],
        pos: { x: 25, y: 30 },
        color: "text-neon-cyan",
        borderGlow: "border-neon-cyan/50",
        glow: "shadow-[0_0_20px_rgba(34,211,238,0.4)]",
        bgCore: "bg-cyan-500",
        delay: 0
      },
      {
        id: 2,
        role: "Project Manager",
        company: "PUC Minas (Hackathon)",
        period: "June 2025",
        description: "Strategic project management and team coordination during the structured development marathon.",
        techStack: ["Agile Methodologies", "Lifecycle Management", "Figma", "MVP"],
        achievements: [
          "Coordination of the application lifecycle from scratch to proof of concept.",
          "Ensured the delivery of the MVP within the established critical deadline.",
          "Resolution of logical conflicts and prioritization of high-impact features."
        ],
        pos: { x: 75, y: 65 },
        color: "text-neon-purple",
        borderGlow: "border-neon-purple/50",
        glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
        bgCore: "bg-purple-500",
        delay: 0.2
      }
    ]
  };

  const experiences = experienceData[language];
  const title = language === 'pt' ? 'Topologia Profissional.' : 'Professional Topology.';
  const centerPos = { x: 50, y: 50 };

  useEffect(() => {
    if (selectedNode) {
      const translatedNode = experienceData[language].find(exp => exp.id === selectedNode.id);
      setSelectedNode(translatedNode);
    }
  }, [language]);

  return (
    <section id="experiencias" className="py-32 px-6 relative z-10 min-h-[900px] flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Painel Esquerdo: O Grafo Dinâmico (Glassmorphism) */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[650px] bg-black/30 border border-white/10 rounded-3xl backdrop-blur-md bg-black/50 overflow-hidden shadow-2xl group">
          
          {/* Radar Decorativo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[300px] h-[300px] rounded-full border border-slate-500"></div>
            <div className="absolute w-[500px] h-[500px] rounded-full border border-slate-600 border-dashed animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute w-[700px] h-[700px] rounded-full border border-slate-700"></div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {experiences.map((exp) => {
              const isActive = selectedNode?.id === exp.id;
              const isDimmed = selectedNode && !isActive;
              return (
                <motion.line 
                  key={`line-${exp.id}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: isDimmed ? 0.05 : 0.4,
                    strokeDashoffset: [0, -100]
                  }}
                  transition={{ 
                    pathLength: { duration: 1.5, ease: "easeInOut" },
                    strokeDashoffset: { repeat: Infinity, duration: 4, ease: "linear" },
                    opacity: { duration: 0.3 }
                  }}
                  x1={`${centerPos.x}%`} 
                  y1={`${centerPos.y}%`} 
                  x2={`${exp.pos.x}%`} 
                  y2={`${exp.pos.y}%`} 
                  stroke={isActive ? "url(#gradient-active)" : "rgba(255,255,255,0.3)"} 
                  strokeWidth={isActive ? "3" : "1.5"}
                  strokeDasharray="10 5"
                />
              );
            })}
            <defs>
              <linearGradient id="gradient-active" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Node (Root) */}
          <motion.div 
            className="absolute z-10 flex flex-col items-center justify-center"
            style={{ left: `${centerPos.x}%`, top: `${centerPos.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="absolute w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/60 border border-white/20 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md relative overflow-hidden">
               <span className="text-2xl font-black text-white tracking-widest relative z-10">LF<span className="text-neon-cyan">.</span></span>
               <span className="text-[9px] text-slate-400 font-mono mt-1 relative z-10 tracking-[0.2em] uppercase">System_Root</span>
            </div>
          </motion.div>

          {/* Experience Nodes */}
          {experiences.map((exp) => {
            const isActive = selectedNode?.id === exp.id;
            const isDimmed = selectedNode && !isActive;

            return (
              <motion.div
                key={exp.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isDimmed ? 0.8 : 1, 
                  opacity: isDimmed ? 0.3 : 1,
                  y: [0, -8, 0]
                }}
                transition={{ 
                  scale: { type: "spring", stiffness: 200, damping: 20 },
                  opacity: { duration: 0.3 },
                  y: { repeat: Infinity, duration: 3 + exp.id, ease: "easeInOut" }
                }}
                className="absolute z-20 cursor-pointer"
                style={{ left: `${exp.pos.x}%`, top: `${exp.pos.y}%`, transform: 'translate(-50%, -50%)' }}
                onClick={() => setSelectedNode(exp)}
              >
                <div className="relative flex flex-col items-center group">
                  <div className={`w-10 h-10 rounded-full bg-black/80 border-2 transition-all duration-500 flex items-center justify-center z-10 
                    ${isActive ? 'border-white scale-110 ' + exp.glow : 'border-white/20 group-hover:border-neon-cyan'}`}>
                    <div className={`w-3 h-3 rounded-full ${exp.bgCore} ${isActive ? 'animate-none' : 'animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]'}`}></div>
                  </div>
                  
                  <div className={`absolute top-14 flex flex-col items-center transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl whitespace-nowrap shadow-2xl">
                      <span className={`text-xs font-bold ${exp.color} tracking-widest uppercase`}>{exp.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Painel Direito: O HUD Expandido (Glass Terminal) */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              {title}
            </h2>
            <div className="w-24 h-2 bg-gradient-to-r from-electric-violet to-neon-cyan mt-6 rounded-full mx-auto lg:mx-0 shadow-[0_0_15px_rgba(124,58,237,0.5)]"></div>
          </motion.div>

          <div className="relative w-full bg-black/40 backdrop-blur-md bg-black/60 border border-white/10 rounded-[2rem] overflow-hidden min-h-[520px] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            {/* Terminal Header */}
            <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <FaTerminal className="text-slate-500 text-xs ml-2" />
                <span className="text-[10px] text-slate-500 font-mono tracking-[0.3em] uppercase">Exp_Kernel_v2.0</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
            </div>

            <div className="p-8 md:p-12 relative h-full flex flex-col">
              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative z-10 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border ${selectedNode.borderGlow} ${selectedNode.glow} backdrop-blur-md bg-black/50`}>
                        <FaCodeBranch className={`text-2xl ${selectedNode.color}`} />
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-slate-500 block mb-1">STAMP_ID</span>
                        <span className="text-xs font-mono text-white bg-white/10 px-3 py-1 rounded-full border border-white/10">
                          NODE_0x0{selectedNode.id}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{selectedNode.role}</h3>
                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-neon-cyan font-bold text-sm tracking-widest uppercase">{selectedNode.company}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                      <span className="text-slate-400 font-mono text-xs">{selectedNode.period}</span>
                    </div>

                    <p className="text-slate-300 leading-relaxed text-lg font-light mb-10 border-l-2 border-white/10 pl-6 italic">
                      "{selectedNode.description}"
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <FaLayerGroup className="text-neon-cyan text-xs" />
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Technology_Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedNode.techStack.map((tech, idx) => (
                            <span key={idx} className="bg-white/5 border border-white/10 text-white text-[10px] px-3 py-1.5 rounded-lg font-mono hover:border-neon-cyan/50 transition-colors">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className={`w-1.5 h-1.5 rounded-full ${selectedNode.bgCore}`}></div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Key_Achievements</span>
                        </div>
                        <ul className="space-y-3">
                          {selectedNode.achievements.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-xs text-slate-400 group/item">
                              <FaAngleRight className={`mt-0.5 flex-shrink-0 transition-transform group-hover/item:translate-x-1 ${selectedNode.color}`} />
                              <span className="leading-relaxed group-hover/item:text-white transition-colors">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 h-full p-12 text-center"
                  >
                    <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-8 relative">
                      <div className="w-3 h-3 rounded-full bg-neon-cyan/50 animate-ping absolute"></div>
                      <div className="w-3 h-3 rounded-full bg-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
                    </div>
                    <p className="text-sm font-mono tracking-[0.3em] uppercase text-slate-400 mb-2">
                      {language === 'pt' ? 'Sincronização Necessária' : 'Sync Required'}
                    </p>
                    <p className="text-xs text-slate-600 max-w-[200px] leading-relaxed">
                      {language === 'pt' ? 'Selecione um nó na topologia para extrair dados brutos.' : 'Select a node in the topology to extract raw data.'}
                    </p>
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