import { motion } from 'framer-motion';
import { TextGenerateEffect } from './ui/TextGenerateEffect';

const Hero = ({ language }) => {
  const content = {
    pt: {
      status: "Disponível para novos projetos",
      greeting: "Olá, eu sou",
      role: "Engenheiro de Software & Full Stack",
      description: "Construindo soluções robustas de ponta a ponta, desde APIs escaláveis até interfaces dinâmicas e centradas no usuário.",
      btnProjects: "Explorar Projetos",
      btnContact: "Iniciar Conversa"
    },
    en: {
      status: "Available for new projects",
      greeting: "Hello, I am",
      role: "Software Engineer & Full Stack",
      description: "Building robust end-to-end solutions, from scalable APIs to dynamic, user-centric interfaces.",
      btnProjects: "Explore Projects",
      btnContact: "Start a Conversation"
    }
  };

  const text = content[language];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          {/* Status Badge com Animação de Pulso */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-cyan/5 border border-neon-cyan/20 mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neon-cyan">
              {text.status}
            </span>
          </div>

          <p className="text-slate-400 font-mono text-sm mb-2 tracking-[0.2em]">{text.greeting}</p>
          
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">
            <span className="text-gradient">Luiz Fernando</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-slate-300 font-light mb-8 border-l-2 border-neon-cyan/30 pl-4">
            {text.role}
          </h2>
          
          <div className="min-h-[60px] mb-10">
            <TextGenerateEffect 
              words={text.description} 
              className="text-slate-400 text-lg max-w-lg mx-auto md:mx-0 leading-relaxed font-light"
            />
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="#projetos" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-neon-cyan transition-all duration-300 shadow-xl flex items-center gap-2 group">
              {text.btnProjects}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a href="#contato" className="border border-white/10 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all text-center">
              {text.btnContact}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;