import { useEffect, useRef } from 'react';

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const Background = () => {
  const orbRef = useRef(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let rafId;
    let isMoving = false;
    let idleTimeout;

    const lerp = (a, b, t) => a + (b - a) * t;

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 60;
      targetY = (e.clientY / window.innerHeight - 0.5) * 60;
      if (!isMoving) {
        isMoving = true;
        orb.style.willChange = 'transform';
        tick();
      }
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        isMoving = false;
        cancelAnimationFrame(rafId);
        orb.style.willChange = 'auto';
      }, 150);
    };

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.06);
      currentY = lerp(currentY, targetY, 0.06);
      orb.style.transform =
        `translate3d(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px), 0)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">

      {/* ── Blob 1: Electric Violet — top-left (reduzido de 1000→700, blur 120→80) ── */}
      <div
        className="absolute rounded-full animate-aurora-1"
        style={{
          width: 700, height: 700,
          top: '-15%', left: '-10%',
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          opacity: 0.13,
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />

      {/* ── Blob 2: Neon Cyan — middle-right (800→600, blur 100→70) ── */}
      <div
        className="absolute rounded-full animate-aurora-2"
        style={{
          width: 600, height: 600,
          top: '30%', right: '-5%',
          background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
          opacity: 0.10,
          filter: 'blur(70px)',
          willChange: 'transform',
        }}
      />

      {/* ── Blob 3: Indigo — bottom-center (700→500, blur 120→80) ── */}
      <div
        className="absolute rounded-full animate-aurora-3"
        style={{
          width: 500, height: 500,
          bottom: '-5%', left: '28%',
          background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)',
          opacity: 0.11,
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />

      {/* ── Blob 4 removido — era o menor e menos visível ── */}

      {/* ── Mouse-reactive violet orb (600→400, blur 80→60) ── */}
      <div
        ref={orbRef}
        className="absolute rounded-full"
        style={{
          width: 400, height: 400,
          top: '50%', left: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate3d(-50%, -50%, 0)',
        }}
      />

      {/* ── Subtle grid ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Film grain overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: GRAIN_SVG,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          opacity: 0.038,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default Background;
