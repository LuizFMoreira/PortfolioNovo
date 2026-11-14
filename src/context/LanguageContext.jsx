import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { content } from "../data/content";

const LanguageContext = createContext(null);
const STORAGE_KEY = "portfolio-lang";

const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    /* storage indisponível */
  }
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "pt";
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  const toggleLanguage = useCallback(
    () => setLanguage((prev) => (prev === "pt" ? "en" : "pt")),
    []
  );

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = content[language].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content[language].meta.description);
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* storage indisponível */
    }
  }, [language]);

  const value = useMemo(
    () => ({ language, toggleLanguage, t: content[language] }),
    [language, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage deve ser usado dentro de LanguageProvider");
  return ctx;
}
