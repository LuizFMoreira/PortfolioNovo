import { useLenis } from "@studio-freight/react-lenis";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { links } from "../data/content";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const lenis = useLenis();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Fora da home, voltamos para ela e só então rolamos até a âncora.
  const goTo = (e, href) => {
    e.preventDefault();
    if (href.startsWith("/")) {
      navigate(href); // rota própria (ex.: /radar)
      return;
    }
    if (pathname !== "/") {
      navigate("/");
      setTimeout(() => lenis?.scrollTo(href, { offset: -80 }), 120);
      return;
    }
    lenis?.scrollTo(href, { offset: -80, duration: 1.2 });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/90 backdrop-blur">
      <div className="container-page flex items-center justify-between gap-4 py-4">
        <Link to="/" className="font-display text-2xl leading-none tracking-tight" aria-label={t.nav.home}>
          Luiz Moreira<span className="text-accent">.</span>
        </Link>

        <nav aria-label={t.nav.aria} className="hidden items-center gap-7 text-sm md:flex">
          {t.nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => goTo(e, l.href)} className="text-mute transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <a href={links.resume} download={links.resumeFileName} className="link-underline hidden sm:inline">
            {t.nav.resume}
          </a>
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={language === "pt" ? "Switch to English" : "Mudar para português"}
            className="border border-ink px-3 py-1 font-mono text-xs transition-colors hover:bg-ink hover:text-paper"
          >
            {t.meta.switchTo}
          </button>
        </div>
      </div>

      {/* Links em linha rolável no celular */}
      <nav aria-label={t.nav.ariaMobile} className="container-page flex gap-6 overflow-x-auto pb-3 text-sm md:hidden">
        {t.nav.links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => goTo(e, l.href)} className="shrink-0 text-mute">
            {l.label}
          </a>
        ))}
        <a href={links.resume} download={links.resumeFileName} className="shrink-0 text-mute sm:hidden">
          {t.nav.resume}
        </a>
      </nav>
    </header>
  );
}
