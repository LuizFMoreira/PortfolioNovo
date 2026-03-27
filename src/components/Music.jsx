import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';
import { getSpotifyData } from '../lib/spotify';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
const Skeleton = ({ className }) => <div className={`skeleton rounded-lg ${className}`} aria-hidden="true" />;

// ─── Animated equalizer bars ─────────────────────────────────────────────────
const EqBars = () => (
  <span className="flex items-end gap-[2px] h-3.5 flex-shrink-0">
    {[0, 0.2, 0.1].map((delay, i) => (
      <span
        key={i}
        className="w-[3px] rounded-full animate-wave-bar"
        style={{
          background: '#1DB954',
          animationDelay: `${delay}s`,
          height: '100%',
          transformOrigin: 'bottom',
        }}
      />
    ))}
  </span>
);

// ─── Now Playing ─────────────────────────────────────────────────────────────
const NowPlayingCard = ({ track, loading, text }) => (
  <div
    className="relative w-full rounded-2xl overflow-hidden"
    style={{
      background: 'rgba(6,4,15,0.90)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      border: '1px solid rgba(29,185,84,0.18)',
      boxShadow: '0 0 60px rgba(29,185,84,0.10), var(--shadow-md)',
    }}
  >
    <div className="flex items-center gap-5 p-6">
      {loading ? (
        <>
          <Skeleton className="w-24 h-24 flex-shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-3 w-36" />
          </div>
        </>
      ) : track ? (
        <>
          <a href={track.songUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 group">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-xl"
              style={{ boxShadow: '0 0 30px rgba(29,185,84,0.25)' }}>
              <img
                src={track.albumImageUrl}
                alt={track.album}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </a>
          <div className="flex-1 min-w-0">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#1DB954' }}>
              <EqBars />
              {text.playingNow}
            </p>
            <a href={track.songUrl} target="_blank" rel="noopener noreferrer"
              className="block text-xl font-bold text-white truncate hover:text-[#1DB954] transition-colors">
              {track.title}
            </a>
            <p className="text-sm truncate mt-0.5" style={{ color: 'var(--color-text-3)' }}>{track.artist}</p>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center gap-4 py-4">
          <FaSpotify size={40} className="flex-shrink-0 opacity-20 text-white" />
          <p style={{ color: 'var(--color-text-3)' }}>{text.notPlaying}</p>
        </div>
      )}
    </div>
  </div>
);

// ─── Recent track row ─────────────────────────────────────────────────────────
const RecentTrack = ({ track, index }) => (
  <motion.a
    href={track.songUrl} target="_blank" rel="noopener noreferrer"
    variants={fadeUp}
    className="flex items-center gap-4 px-4 py-3 group rounded-xl transition-colors"
    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
  >
    <span className="text-xs font-mono w-5 text-center flex-shrink-0" style={{ color: 'var(--color-text-3)' }}>
      {index + 1}
    </span>
    <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
      <img src={track.albumImageUrl} alt={track.album}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-white truncate group-hover:text-[#1DB954] transition-colors">{track.title}</p>
      <p className="text-xs truncate" style={{ color: 'var(--color-text-3)' }}>{track.artist}</p>
    </div>
    <FaSpotify size={13} className="flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity" style={{ color: '#1DB954' }} />
  </motion.a>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const Music = ({ language = 'pt' }) => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [recent,     setRecent]     = useState([]);
  const [npLoading,  setNpLoading]  = useState(true);
  const [recLoading, setRecLoading] = useState(true);

  const content = {
    pt: { title: 'Minha Trilha Sonora.', subtitle: 'As frequências que embalam minhas horas de código e foco profundo.', notPlaying: 'Nenhuma música tocando no momento.', playingNow: 'Tocando Agora', recents: 'Tocadas Recentemente' },
    en: { title: 'My Soundtrack.', subtitle: 'The frequencies that fuel my coding and deep focus hours.', notPlaying: 'Not playing anything right now.', playingNow: 'Now Playing', recents: 'Recently Played' },
  };
  const text = content[language] || content.pt;

  const fetchData = useCallback(async () => {
    try {
      const data = await getSpotifyData();
      setNowPlaying(data.nowPlaying ?? null);
      setRecent(data.recent ?? []);
    } catch { setNowPlaying(null); }
    finally { setNpLoading(false); setRecLoading(false); }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 30_000);
    return () => clearInterval(id);
  }, [fetchData]);

  return (
    <section id="musica" className="py-28 px-6 relative z-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.1 }} className="text-center mb-14">
          <motion.div variants={fadeUp}>
            <a href="https://open.spotify.com/user/12155933145" target="_blank" rel="noopener noreferrer" className="inline-block mb-8">
              <FaSpotify size={54} className="mx-auto transition-transform duration-300 hover:scale-110"
                style={{ color: '#1DB954', filter: 'drop-shadow(0 0 24px rgba(29,185,84,0.5))' }} />
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="text-[11px] font-mono tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--color-text-3)' }}>
            // music
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {text.title}
          </motion.h2>
          <motion.span variants={fadeUp} className="accent-bar mx-auto block" />
          <motion.p variants={fadeUp} className="text-base font-light mt-5" style={{ color: 'var(--color-text-2)' }}>
            {text.subtitle}
          </motion.p>
        </motion.div>

        {/* Now Playing */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
          <NowPlayingCard track={nowPlaying} loading={npLoading} text={text} />
        </motion.div>

        {/* Recents */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: 'var(--color-text-3)' }}>
            {text.recents}
          </p>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            {recLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <Skeleton className="w-5 h-3" />
                  <Skeleton className="w-11 h-11 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-1.5"><Skeleton className="h-3.5 w-40" /><Skeleton className="h-3 w-28" /></div>
                </div>
              ))
            ) : (
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ staggerChildren: 0.06 }}>
                {recent.slice(0, 6).map((track, i) => (
                  <RecentTrack key={`${track.songUrl}-${i}`} track={track} index={i} />
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Music;
