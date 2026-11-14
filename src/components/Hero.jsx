import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const [a, accent, c] = t.hero.headline;

  const go = (e, href) => {
    e.preventDefault();
    lenis?.scrollTo(href, { offset: -80, duration: 1.2 });
  };

  const rise = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section id="inicio" className="container-page pb-20 pt-14 sm:pt-20 md:pb-28">
      <motion.p {...rise(0)} className="eyebrow mb-8 flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        {t.hero.status}
      </motion.p>

      <motion.h1
        {...rise(1)}
        className="max-w-[14ch] font-display text-[clamp(3.4rem,11vw,8.5rem)] leading-[0.92] tracking-[-0.025em]"
      >
        {a} <em className="text-accent">{accent}</em> {c}
      </motion.h1>

      <div className="mt-12 grid items-end gap-10 md:grid-cols-2">
        <motion.p {...rise(2)} className="max-w-[46ch] text-lg leading-relaxed">
          {t.hero.description}
        </motion.p>

        <motion.ul {...rise(3)} className="space-y-1 font-mono text-xs leading-relaxed text-mute md:text-right">
          {t.hero.meta.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </motion.ul>
      </div>

      <motion.div {...rise(4)} className="mt-12 flex flex-wrap gap-4">
        <a
          href="#projetos"
          onClick={(e) => go(e, "#projetos")}
          className="bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          {t.hero.ctaProjects} →
        </a>
        <a
          href="#contato"
          onClick={(e) => go(e, "#contato")}
          className="border border-ink px-6 py-3 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
        >
          {t.hero.ctaContact}
        </a>
      </motion.div>
    </section>
  );
}
