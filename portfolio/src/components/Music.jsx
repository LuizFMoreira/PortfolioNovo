import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';

const Music = ({ language }) => {
  const content = {
    pt: {
      title: "Minha Trilha Sonora.",
      subtitle: "As frequências que embalam minhas horas de código e foco profundo.",
    },
    en: {
      title: "My Soundtrack.",
      subtitle: "The frequencies that fuel my coding and deep focus hours.",
    }
  };

  const text = content[language];

  return (
    <section id="musica" className="py-32 px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Ícone flutuante com brilho */}
          <FaSpotify className="text-6xl text-[#1DB954] mx-auto mb-8 drop-shadow-[0_0_20px_rgba(29,185,84,0.4)] hover:scale-110 transition-transform duration-300 cursor-pointer" />
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {text.title}
          </h2>
          
          <p className="text-slate-400 text-lg md:text-xl mb-16 font-light">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Player Flutuante (Sem contêiner em volta) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-2xl mx-auto"
        >
          {/* Nuvem de luz verde suave atrás do player */}
          <div className="absolute inset-0 bg-[#1DB954]/10 blur-[60px] rounded-full -z-10"></div>
          
          <iframe 
            style={{ borderRadius: '16px' }} 
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5trt9i14X7j?utm_source=generator&theme=0" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="Spotify Player"
            className="shadow-2xl border border-white/5"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
};

export default Music;
