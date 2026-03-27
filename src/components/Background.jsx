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

    const lerp = (a, b, t) => a + (b - a) * t;

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 80;
      targetY = (e.clientY / window.innerHeight - 0.5) * 80;
    };

    orb.style.willChange = 'transform';
    const tick = () => {
      currentX = lerp(currentX, targetX, 0.06);
      currentY = lerp(currentY, targetY, 0.06);
      orb.style.transform =
        `translate3d(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px), 0)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">

      {/* ── Blob 1: Electric Violet — top-left ── */}
      <div
        className="absolute rounded-full animate-aurora-1"
        style={{
          width: 1000, height: 1000,
          top: '-15%', left: '-10%',
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          opacity: 0.13,
          filter: 'blur(120px)',
        }}
      />

      {/* ── Blob 2: Neon Cyan — middle-right ── */}
      <div
        className="absolute rounded-full animate-aurora-2"
        style={{
          width: 800, height: 800,
          top: '30%', right: '-5%',
          background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
          opacity: 0.10,
          filter: 'blur(100px)',
        }}
      />

      {/* ── Blob 3: Indigo — bottom-center ── */}
      <div
        className="absolute rounded-full animate-aurora-3"
        style={{
          width: 700, height: 700,
          bottom: '-5%', left: '28%',
          background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)',
          opacity: 0.11,
          filter: 'blur(120px)',
        }}
      />

      {/* ── Blob 4: Violet-glow — top-right ── */}
      <div
        className="absolute rounded-full animate-aurora-4"
        style={{
          width: 500, height: 500,
          top: '5%', right: '20%',
          background: 'radial-gradient(circle, #9333EA 0%, transparent 70%)',
          opacity: 0.08,
          filter: 'blur(80px)',
        }}
      />

      {/* ── Mouse-reactive violet orb ── */}
      <div
        ref={orbRef}
        className="absolute rounded-full"
        style={{
          width: 600, height: 600,
          top: '50%', left: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
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
