import { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";

const Navbar = ({ language, toggleLanguage }) => {
  const [scrolled, setScrolled] = useState(false);
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

  // Conteúdo de texto para os botões
  const content = {
    pt: { btnResume: "BAIXAR CURRÍCULO" },
    en: { btnResume: "DOWNLOAD RESUME" },
  };
  const text = content[language];

  // Lista de links atualizada com Música
  const links =
    language === "pt"
      ? [
          { name: "Sobre", href: "#sobre" },
          { name: "Projetos", href: "#projetos" },
          { name: "Experiência", href: "#experiencias" },
          { name: "Música", href: "#musica" },
          { name: "Contato", href: "#contato" },
          {},
        ]
      : [
          { name: "About", href: "#sobre" },
          { name: "Projects", href: "#projetos" },
          { name: "Experience", href: "#experiencias" },
          { name: "Music", href: "#musica" },
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
            pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-2xl border 
            transition-all duration-500
            ${
              scrolled
                ? "bg-black/60 backdrop-blur-md border-white/10 shadow-2xl translate-y-2"
                : "bg-transparent border-transparent translate-y-0"
            }
          `}
        >
          <a
            href="/home"
            onClick={(e) => { e.preventDefault(); navigate('/home'); }}
            className="text-xl font-black text-white tracking-tighter hover:opacity-80 transition-opacity"
          >
            LF<span className="text-electric-violet">.</span>
          </a>

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

          {/* Botão de UpLoad do Currículo */}
          <a
            href="/curriculo.pdf"
            download="LuizFernando_BatistaMoreira_Currículo.pdf"
            className="flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full hover:bg-electric-violet hover:border-electric-violet hover:text-white transition-all duration-300 group"
          >
            <FaFileDownload
              className="text-electric-violet group-hover:text-white transition-colors"
              size={14}
            />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 group-hover:text-black transition-colors">
              {text.btnResume}
            </span>
          </a>

          <button
            onClick={toggleLanguage}
            className="text-[10px] font-mono border border-white/20 px-4 py-1.5 rounded-full hover:bg-white/10 transition-all text-white bg-white/5"
          >
            {language === "pt" ? "EN" : "PT"}
          </button>
        </motion.nav>
      </header>
    </>
  );
};

export default Navbar;
