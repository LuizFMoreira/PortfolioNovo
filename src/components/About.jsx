import { motion } from 'framer-motion';

const About = ({ language }) => {
  const content = {
    // ... (Mantenha seu dicionário de tradução igual)
    pt: {
      title: "Sobre Mim.",
      description: "Sou estudante do 4º período de Engenharia de Software na PUC Minas e Desenvolvedor Full Stack.",
      focus: "Minha trajetória é focada em projetar arquiteturas eficientes e construir soluções escaláveis de ponta a ponta. Tecnicamente, atuo com domínio do ecossistema Java e Spring Boot no back-end, integrando bancos de dados relacionais com interfaces modernas, tipadas e reativas construídas em React, TypeScript e Next.js.",
      goals: "Acredito que o rigor analítico e matemático — princípios que aplico diariamente em Cálculo e Algoritmos — é fundamental para a criação de sistemas limpos e manuteníveis."
    },
    en: {
      title: "About Me.",
      description: "I am a 4th-period Software Engineering student at PUC Minas and a Full Stack Developer.",
      focus: "My journey is focused on designing efficient architectures and building scalable end-to-end solutions. Technically, I work with the Java and Spring Boot ecosystem on the back-end, integrating relational databases with modern, strongly-typed, and reactive interfaces built in React, TypeScript, and Next.js.",
      goals: "I believe that analytical and mathematical rigor—principles I apply daily in Calculus and Algorithms courses—is fundamental for creating clean, maintainable systems."
    }
  };

  const text = content[language];

  return (
    <section id="sobre" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Container Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-black/30 backdrop-blur-md bg-black/60 border border-white/10 p-8 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          {/* Brilho decorativo de fundo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-20 relative z-10">
            
            {/* Esquerda: Título */}
            <div className="md:w-1/3">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                {text.title}
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-neon-cyan to-transparent rounded-full mb-8"></div>
            </div>

            {/* Direita: Texto */}
            <div className="md:w-2/3 space-y-6 text-slate-300 font-light leading-relaxed">
              <p className="text-xl md:text-2xl text-white font-medium leading-snug">
                {text.description}
              </p>
              <p className="text-base md:text-lg opacity-90">
                {text.focus}
              </p>
              
              {/* Citação orgânica */}
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl relative mt-8">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-purple rounded-l-2xl shadow-[0_0_10px_rgba(139,92,246,0.6)]"></div>
                <p className="italic text-slate-200">
                  "{text.goals}"
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;