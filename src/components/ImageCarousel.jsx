import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function ImageCarousel({ images, alt }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [broken, setBroken] = useState({});
  const reduce = useReducedMotion();
  const total = images?.length ?? 0;

  useEffect(() => {
    if (total <= 1 || paused || reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 4000);
    return () => clearInterval(id);
  }, [total, paused, reduce]);

  if (!total) return null;

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden border border-line bg-line/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        {!broken[index] && (
          <motion.img
            key={index}
            src={images[index]}
            alt={`${alt} (${index + 1}/${total})`}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onError={() => setBroken((b) => ({ ...b, [index]: true }))}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </AnimatePresence>

      {total > 1 && (
        <div className="absolute inset-x-0 bottom-0 flex gap-1.5 bg-gradient-to-t from-ink/50 to-transparent p-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${t.nav.image} ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1 flex-1 transition-colors ${i === index ? "bg-paper" : "bg-paper/40 hover:bg-paper/70"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
