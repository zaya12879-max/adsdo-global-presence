import { useLanguage } from "@/i18n/LanguageContext";
import { Code2, BarChart3, Megaphone, PenLine, Search, Magnet } from "lucide-react";

const icons = [Code2, BarChart3, Megaphone, PenLine, Search, Magnet];

const Services = () => {
  const { t } = useLanguage();
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            Services
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 leading-tight">
            {t.services.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">{t.services.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <article
                key={s.title}
                className="group relative p-8 rounded-2xl border border-border bg-card hover:border-gold/50 transition-all hover:shadow-luxury hover:-translate-y-1 duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-5 shadow-gold">
                  <Icon className="w-6 h-6 text-gold-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;