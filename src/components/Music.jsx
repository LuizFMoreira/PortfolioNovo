import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';

const Music = ({ language = 'pt' }) => {
  // Definindo as nossas variáveis de estado inicial (condições de contorno)
  const [song, setSong] = useState({ isPlaying: false });
  const [loading, setLoading] = useState(true);

  const content = {
    pt: {
      title: "Minha Trilha Sonora.",
      subtitle: "As frequências que embalam minhas horas de código e foco profundo.",
      notPlaying: "Nenhuma música tocando no momento.",
      listen: "Ouvir no Spotify",
      playingNow: "Tocando Agora"
    },
    en: {
      title: "My Soundtrack.",
      subtitle: "The frequencies that fuel my coding and deep focus hours.",
      notPlaying: "Not playing anything right now.",
      listen: "Listen on Spotify",
      playingNow: "Now Playing"
    }
  };

  const text = content[language];

  // A nossa função contínua que faz o fetch na Rota de API do Vercel
  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/spotify');
        const data = await res.json();
        setSong(data);
      } catch (error) {
        console.error("Erro de cálculo ao buscar os dados da API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    
    // Atualiza o componente a cada 30 segundos para manter a exatidão dos dados
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

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
          <a href="https://open.spotify.com/user/12155933145" target="_blank" rel="noopener noreferrer">
            <FaSpotify className="text-6xl text-[#1DB954] mx-auto mb-8 drop-shadow-[0_0_20px_rgba(29,185,84,0.4)] hover:scale-110 transition-transform duration-300 cursor-pointer" />
          </a>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {text.title}
          </h2>
          
          <p className="text-slate-400 text-lg md:text-xl mb-16 font-light">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Player Dinâmico */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-2xl mx-auto"
        >
          {/* Nuvem de luz verde suave atrás do player */}
          <div className="absolute inset-0 bg-[#1DB954]/10 blur-[60px] rounded-full -z-10"></div>
          
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row items-center gap-6 text-left transition-all hover:border-[#1DB954]/50">
            
            {loading ? (
              <div className="w-full text-center text-slate-400 py-8 animate-pulse">
                Calculando frequências...
              </div>
            ) : song?.isPlaying ? (
              <>
                {/* Capa do Álbum */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                  <img 
                    src={song.albumImageUrl} 
                    alt={song.album} 
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                {/* Informações da Música */}
                <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                  <p className="text-[#1DB954] text-xs font-bold uppercase tracking-widest mb-2 animate-pulse">
                    {text.playingNow}
                  </p>
                  <a 
                    href={song.songUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-2xl font-bold text-white hover:underline truncate block max-w-full"
                  >
                    {song.title}
                  </a>
                  <p className="text-slate-400 text-sm mt-1 mb-4 truncate">
                    {song.artist}
                  </p>
                  <a 
                    href={song.songUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-[#1DB954] text-black text-sm font-bold px-6 py-2 rounded-full hover:bg-[#1ed760] transition-colors self-center sm:self-start"
                  >
                    {text.listen}
                  </a>
                </div>
              </>
            ) : (
              // Estado quando o Spotify está fechado
              <div className="w-full text-center flex flex-col items-center justify-center py-8">
                <FaSpotify className="text-4xl text-slate-500 mb-4 opacity-50" />
                <p className="text-slate-400 font-medium">{text.notPlaying}</p>
              </div>
            )}
            
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Music;