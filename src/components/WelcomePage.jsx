import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const APPLE = [0.16, 1, 0.3, 1];

const fadeUp = (delay, duration = 0.7) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: APPLE },
});

const lineReveal = (delay) => ({
  initial: { y: '115%' },
  animate: { y: '0%' },
  transition: { duration: 1.1, delay, ease: APPLE },
});

const WelcomePage = ({ language }) => {
  const navigate = useNavigate();
  const isPt = language === 'pt';

  return (
    <motion.div
      className="min-h-dvh flex flex-col items-center justify-center text-center px-6 relative overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: APPLE }}
    >
      {/* ── Ambient blobs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div style={{
          position: 'absolute', top: '15%', left: '50%',
          transform: 'translateX(-50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }} />
        <div style={{
          position: 'absolute', top: '55%', left: '10%',
          width: '400px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '8%',
          width: '350px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Badge */}
        <motion.div {...fadeUp(0.3)} className="mb-10">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(124,58,237,0.10)',
              border: '1px solid rgba(124,58,237,0.28)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-400 block" />
            </span>
            <span
              className="text-[11px] font-mono tracking-[0.28em] uppercase"
              style={{ color: '#A78BFA' }}
            >
              Portfolio · {new Date().getFullYear()}
            </span>
          </div>
        </motion.div>

        {/* Name */}
        <div className="mb-8">
          <div className="overflow-hidden" style={{ lineHeight: 0.84 }}>
            <motion.span
              {...lineReveal(0.5)}
              className="font-black text-white block"
              style={{ fontSize: 'clamp(2.5rem, 15vw, 14rem)', letterSpacing: '-0.05em' }}
            >
              LUIZ
            </motion.span>
          </div>
          <div className="overflow-hidden" style={{ lineHeight: 0.84 }}>
            <motion.span
              {...lineReveal(0.72)}
              className="font-black text-gradient block"
              style={{ fontSize: 'clamp(2.5rem, 15vw, 14rem)', letterSpacing: '-0.05em' }}
            >
              FERNANDO.
            </motion.span>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          {...fadeUp(0.95)}
          className="mb-8"
          style={{
            width: '64px', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.65), transparent)',
          }}
        />

        {/* Role */}
        <motion.p
          {...fadeUp(1.05)}
          className="text-base md:text-lg font-medium mb-3"
          style={{ color: 'var(--color-text-2)' }}
        >
          Software Engineer &amp; Full Stack Developer
        </motion.p>

        {/* Tech */}
        <motion.p
          {...fadeUp(1.18)}
          className="text-[11px] font-mono tracking-[0.1em] sm:tracking-[0.3em] uppercase mb-14"
          style={{ color: 'var(--color-text-3)' }}
        >
          Java · Spring Boot · React · TypeScript
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp(1.4)}>
          <button
            onClick={() => navigate('/home')}
            className="group relative flex items-center gap-3 px-10 py-4 rounded-full font-bold text-[13px] text-white overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 55%, #22D3EE 130%)',
              boxShadow:
                '0 0 40px rgba(124,58,237,0.4), 0 0 80px rgba(124,58,237,0.14), inset 0 1px 0 rgba(255,255,255,0.15)',
              transition: 'box-shadow 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0 0 65px rgba(124,58,237,0.6), 0 0 120px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                '0 0 40px rgba(124,58,237,0.4), 0 0 80px rgba(124,58,237,0.14), inset 0 1px 0 rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {/* Shimmer */}
            <span
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.12) 50%, transparent 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite linear',
              }}
              aria-hidden
            />
            <span className="relative">
              {isPt ? 'Explorar Portfolio' : 'Enter Portfolio'}
            </span>
            <FaArrowRight
              size={13}
              className="relative group-hover:translate-x-1.5 transition-transform duration-200"
            />
          </button>
        </motion.div>

        {/* Meta */}
        <motion.p
          {...fadeUp(1.65)}
          className="mt-8 text-[10px] font-mono tracking-[0.28em] uppercase"
          style={{ color: 'var(--color-text-3)' }}
        >
          4º período &nbsp;·&nbsp; PUC Minas &nbsp;·&nbsp; {new Date().getFullYear()}
        </motion.p>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--color-text-3)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3v10M3 9l5 4 5-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomePage;
