import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { sendToWebhook } from "@/lib/webhook";
import {
  ArrowLeft,
  Send,
  Mail,
  User,
  Briefcase,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  service: z.string().min(1),
  message: z.string().trim().min(1).max(1000),
});

const ContactForm = () => {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: t.contact.error, variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { name, email, service, message } = parsed.data;
      await sendToWebhook({ name, email, service, message, lang, submittedAt: new Date().toISOString() });
      toast({ title: t.contact.success });
      setForm({ name: "", email: "", service: "", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch {
      toast({ title: t.contact.error, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-[hsl(0_0%_3%)] text-white overflow-hidden"
    >
      {/* Ambient luxury glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 w-[34rem] h-[34rem] rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute -bottom-40 -right-20 w-[36rem] h-[36rem] rounded-full bg-gold/5 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(41 70% 52%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container relative max-w-6xl">
        {/* Back button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="group mb-10 inline-flex items-center gap-3 text-sm tracking-wide text-white/70 hover:text-gold transition-colors"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 group-hover:border-gold group-hover:bg-gold/10 transition-all">
            <ArrowLeft className="h-4 w-4" />
          </span>
          <span className="uppercase tracking-[0.25em] text-xs font-medium">{t.contact.back}</span>
        </button>

        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block text-[0.7rem] uppercase tracking-[0.45em] text-gold font-semibold">
            — {t.contact.badge} —
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-5 leading-[1.05] text-white">
            {t.contact.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="text-white/60 mt-6 text-base md:text-lg leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
          {/* Info panel */}
          <aside className="lg:col-span-2 relative rounded-3xl p-8 md:p-10 bg-gradient-to-br from-[hsl(0_0%_8%)] to-[hsl(0_0%_5%)] border border-white/10 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
            <span className="absolute top-0 left-0 h-14 w-14 border-t-2 border-l-2 border-gold/70 rounded-tl-3xl" />

            <div className="relative">
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-white">
                {t.contact.infoTitle}
              </h3>
              <p className="mt-4 text-white/60 leading-relaxed">{t.contact.infoSubtitle}</p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    icon: Mail,
                    label: t.contact.emailLabel,
                    value: "hello@adsdo.agency",
                    href: "mailto:hello@adsdo.agency",
                  },
                  {
                    icon: Phone,
                    label: t.contact.phoneLabel,
                    value: "+1 (000) 000-0000",
                    href: "tel:+10000000000",
                  },
                  {
                    icon: MapPin,
                    label: t.contact.locationLabel,
                    value: t.contact.locationValue,
                  },
                  {
                    icon: Clock,
                    label: t.contact.hoursLabel,
                    value: t.contact.hoursValue,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 border border-gold/30 text-gold shrink-0">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[0.65rem] uppercase tracking-[0.25em] text-white/40 font-medium">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          className="text-white hover:text-gold transition-colors break-all"
                        >
                          {value}
                        </a>
                      ) : (
                        <div className="text-white">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-white/40">
                <ShieldCheck className="h-4 w-4 text-gold/80" />
                {t.contact.privacy}
              </div>
            </div>

            <span className="absolute bottom-0 right-0 h-14 w-14 border-b-2 border-r-2 border-gold/70 rounded-br-3xl" />
          </aside>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 relative bg-[hsl(0_0%_7%)]/95 backdrop-blur-xl rounded-3xl border border-white/10 p-7 md:p-12 space-y-7 shadow-[0_30px_90px_-25px_rgba(0,0,0,0.9)]"
          >
            <span className="absolute top-0 left-0 h-14 w-14 border-t-2 border-l-2 border-gold/60 rounded-tl-3xl" />
            <span className="absolute bottom-0 right-0 h-14 w-14 border-b-2 border-r-2 border-gold/60 rounded-br-3xl" />

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-white/80 text-xs uppercase tracking-[0.18em] flex items-center gap-2"
                >
                  <User className="h-3.5 w-3.5 text-gold" /> {t.contact.name}
                </Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder={t.contact.placeholders.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                  required
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold focus-visible:border-gold/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-white/80 text-xs uppercase tracking-[0.18em] flex items-center gap-2"
                >
                  <Mail className="h-3.5 w-3.5 text-gold" /> {t.contact.email}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t.contact.placeholders.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  required
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold focus-visible:border-gold/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="service"
                className="text-white/80 text-xs uppercase tracking-[0.18em] flex items-center gap-2"
              >
                <Briefcase className="h-3.5 w-3.5 text-gold" /> {t.contact.service}
              </Label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                required
                className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:border-gold/50 transition-all"
              >
                <option value="" className="bg-[hsl(0_0%_7%)] text-white/60">
                  {t.contact.selectService}
                </option>
                {t.services.items.map((s) => (
                  <option key={s.title} value={s.title} className="bg-[hsl(0_0%_7%)] text-white">
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-white/80 text-xs uppercase tracking-[0.18em] flex items-center gap-2"
              >
                <MessageSquare className="h-3.5 w-3.5 text-gold" /> {t.contact.message}
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                placeholder={t.contact.placeholders.message}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                required
                className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold focus-visible:border-gold/50 transition-all resize-none"
              />
              <div className="text-right text-[0.65rem] text-white/30 tracking-wider">
                {form.message.length}/1000
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || sent}
              size="lg"
              className="group relative w-full h-14 rounded-xl bg-gradient-gold text-gold-foreground hover:opacity-95 shadow-gold font-semibold tracking-[0.18em] uppercase text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_55px_-10px_hsl(41_70%_52%/0.65)] disabled:opacity-80 disabled:translate-y-0"
            >
              <span className="flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.contact.sending}
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    {t.contact.success}
                  </>
                ) : (
                  <>
                    {t.contact.submit}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
