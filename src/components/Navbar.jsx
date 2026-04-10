import { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";

const Navbar = ({ language, toggleLanguage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/home";

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHome && lenis) {
      lenis.scrollTo(href, {
        offset: -100,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      navigate(`/home${href}`);
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !scrolled) setScrolled(true);
    if (latest <= 50 && scrolled) setScrolled(false);
  });

  const content = {
    pt: { btnResume: "CURRÍCULO" },
    en: { btnResume: "RESUME" },
  };
  const text = content[language];

  const links =
    language === "pt"
      ? [
          { name: "Sobre", href: "#sobre" },
          { name: "Projetos", href: "#projetos" },
          { name: "Experiência", href: "#experiencias" },
          { name: "Música", href: "#musica" },
          { name: "Livros", href: "#livros" },
          { name: "Contato", href: "#contato" },
        ]
      : [
          { name: "About", href: "#sobre" },
          { name: "Projects", href: "#projetos" },
          { name: "Experience", href: "#experiencias" },
          { name: "Music", href: "#musica" },
          { name: "Books", href: "#livros" },
          { name: "Contact", href: "#contato" },
        ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[101] origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, #7C3AED, #22D3EE)' }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
        <motion.nav
          layout
          className={`
            pointer-events-auto flex items-center justify-between w-full max-w-5xl px-5 py-3 rounded-2xl border
            transition-all duration-500
            ${
              scrolled
                ? "bg-black/60 backdrop-blur-md border-white/10 shadow-2xl translate-y-2"
                : "bg-transparent border-transparent translate-y-0"
            }
          `}
        >
          {/* Logo */}
          <a
            href="/home"
            onClick={(e) => { e.preventDefault(); navigate('/home'); setMenuOpen(false); }}
            className="text-xl font-black text-white tracking-tighter hover:opacity-80 transition-opacity flex-shrink-0"
          >
            LF<span className="text-electric-violet">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Download CV */}
            <a
              href="/curriculo.pdf"
              download="LuizFernando_BatistaMoreira_Currículo.pdf"
              className="flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full hover:bg-electric-violet hover:border-electric-violet hover:text-white transition-all duration-300 group"
            >
              <FaFileDownload
                className="text-electric-violet group-hover:text-white transition-colors flex-shrink-0"
                size={14}
              />
              <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 group-hover:text-black transition-colors">
                {text.btnResume}
              </span>
            </a>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="text-[10px] font-mono border border-white/20 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all text-white bg-white/5"
            >
              {language === "pt" ? "EN" : "PT"}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-[5px]"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-5 h-[2px] bg-white rounded-full block origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="w-5 h-[2px] bg-white rounded-full block"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-5 h-[2px] bg-white rounded-full block origin-center"
              />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[72px] left-4 right-4 z-40 md:hidden rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(6,4,15,0.94)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <nav className="flex flex-col py-3">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
