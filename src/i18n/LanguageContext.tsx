import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Lang, translations } from "./translations";

type Translation = (typeof translations)[Lang];
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translation;
};

const LanguageContext = createContext<Ctx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("adsdo-lang") as Lang | null;
    if (saved === "en" || saved === "fr") return saved;
    return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
  });

  useEffect(() => {
    localStorage.setItem("adsdo-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};