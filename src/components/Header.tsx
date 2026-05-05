import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-xl font-bold tracking-tight">
          ADSDO<span className="text-gold">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#about" className="hover:text-gold transition-colors">{t.nav.about}</a>
          <a href="#services" className="hover:text-gold transition-colors">{t.nav.services}</a>
          <a href="#contact" className="hover:text-gold transition-colors">{t.nav.contact}</a>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-border overflow-hidden text-xs font-semibold">
            <button
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("fr")}
              aria-pressed={lang === "fr"}
              className={`px-3 py-1.5 transition-colors ${lang === "fr" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              FR
            </button>
          </div>
          <Button asChild variant="default" size="sm" className="hidden sm:inline-flex bg-gradient-gold text-gold-foreground hover:opacity-90 shadow-gold">
            <a href="#contact">{t.nav.contact}</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;