/**
 * ProjectModal — Apple-style bottom sheet that slides up when a project is selected.
 *
 * Features:
 *   - AnimatePresence + motion.div for enter/exit animation (y: 100% → 0)
 *   - Drag-to-dismiss: swipe down more than 80px closes the sheet
 *   - ESC key closes
 *   - Body scroll lock while open
 *   - Image carousel with manual prev/next + dot indicators
 *   - Backdrop blur overlay
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// ─── Mini Carousel (manual) ─────────────────────────────────────────────────
const ModalCarousel = ({ images, alt }) => {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  if (!images?.length) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-black/40" style={{ aspectRatio: '16/9' }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          alt={`${alt} — ${idx + 1}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.src = '/img/placeholder.png'; }}
        />
      </AnimatePresence>

      {/* Gradient overlay bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            aria-label="Previous image"
          >
            <FaChevronLeft size={12} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            aria-label="Next image"
          >
            <FaChevronRight size={12} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? 'w-5 bg-[#22D3EE]' : 'w-1.5 bg-white/40'
                }`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── ProjectModal ────────────────────────────────────────────────────────────
const ProjectModal = ({ project, isOpen, onClose, language = 'pt' }) => {
  const sheetRef = useRef(null);

  // ESC to close
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const labels = {
    pt: { github: 'GitHub', demo: 'Ver Demo', stack: 'Stack' },
    en: { github: 'GitHub', demo: 'Live Demo', stack: 'Stack' },
  };
  const t = labels[language] || labels.pt;

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col"
            style={{ maxHeight: '90dvh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80) onClose();
            }}
          >
            {/* Sheet surface */}
            <div
              className="relative flex flex-col rounded-t-[28px] overflow-hidden"
              style={{
                background: 'rgba(8, 8, 14, 0.95)',
                backdropFilter: 'blur(40px) saturate(1.8)',
                WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderBottom: 'none',
                boxShadow: '0 -8px 60px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.07)',
                maxHeight: '90dvh',
              }}
            >
              {/* Drag handle pill */}
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0 cursor-grab active:cursor-grabbing">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto overscroll-contain" style={{ touchAction: 'pan-y' }}>
                {/* Header */}
                <div className="flex items-start justify-between px-6 py-4">
                  <h2
                    className="text-xl font-bold text-white pr-4 leading-snug"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {project.title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-white/08 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)' }}
                    aria-label="Close"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px mx-6 bg-white/06" style={{ background: 'rgba(255,255,255,0.06)' }} />

                {/* Image carousel */}
                <div className="px-6 pt-5">
                  <ModalCarousel images={project.images} alt={project.alt || project.title} />
                </div>

                {/* Description */}
                <div className="px-6 pt-5">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
                    {project.description}
                  </p>
                </div>

                {/* Tech stack chips */}
                {project.tech?.length > 0 && (
                  <div className="px-6 pt-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--color-text-3)' }}>
                      {t.stack}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((chip, i) => (
                        <span key={i} className="tech-chip">{chip}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="px-6 pt-5 pb-8 flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost flex items-center gap-2 flex-1 justify-center"
                      style={{ padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      <FaGithub size={16} /> {t.github}
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2 flex-1 justify-center"
                      style={{ padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      <FaExternalLinkAlt size={13} /> {t.demo}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
