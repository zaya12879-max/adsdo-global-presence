import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import founder from "@/assets/founder.png";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 text-primary-foreground">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/20 blur-3xl" />

      <div className="container relative grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            {t.hero.eyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            {t.hero.title}
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/85 max-w-xl leading-relaxed">
            {t.hero.body}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild size="lg" className="bg-gradient-gold text-gold-foreground hover:opacity-90 shadow-gold font-semibold">
              <a href="#contact">{t.hero.cta}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <a href="#services">{t.hero.ctaAlt}</a>
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-4 text-xs text-primary-foreground/70">
            <span>★ Meta Certified</span>
            <span>★ Google Certified</span>
            <span>★ 9+ Years</span>
          </div>
        </div>

        <div className="relative justify-self-center md:justify-self-end">
          <div className="absolute -inset-4 rounded-full bg-gradient-gold blur-2xl opacity-40" />
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gold/60 shadow-luxury bg-primary-glow">
            <img
              src={founder}
              alt="Founder of ADSDO Agency"
              width={768}
              height={1024}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;