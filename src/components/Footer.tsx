import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-primary text-primary-foreground py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-lg font-bold">
          ADSDO<span className="text-gold">.</span>
        </div>
        <p className="text-sm text-primary-foreground/70">{t.footer}</p>
      </div>
    </footer>
  );
};

export default Footer;