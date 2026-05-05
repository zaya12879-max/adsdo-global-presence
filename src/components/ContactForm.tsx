import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { sendToWebhook } from "@/lib/webhook";
import { ArrowLeft, Send, Mail, User, Briefcase, MessageSquare } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  service: z.string().min(1),
  message: z.string().trim().min(1).max(1000),
});

const ContactForm = () => {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
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
    } catch {
      toast({ title: t.contact.error, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-[hsl(0_0%_4%)] text-white overflow-hidden"
    >
      {/* Luxury ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-20 w-[32rem] h-[32rem] rounded-full bg-gold/5 blur-[140px]" />
      </div>

      <div className="container relative max-w-3xl">
        {/* Back button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="group mb-10 inline-flex items-center gap-2 text-sm tracking-wide text-white/70 hover:text-gold transition-colors"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 group-hover:border-gold group-hover:bg-gold/10 transition-all">
            <ArrowLeft className="h-4 w-4" />
          </span>
          <span className="uppercase tracking-[0.2em] text-xs font-medium">{t.contact.back}</span>
        </button>

        <div className="text-center mb-14">
          <span className="inline-block text-[0.7rem] uppercase tracking-[0.4em] text-gold font-semibold">
            — Contact —
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-5 leading-[1.1] text-white">
            {t.contact.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="text-white/60 mt-6 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="relative bg-[hsl(0_0%_7%)]/90 backdrop-blur-xl rounded-3xl border border-white/10 p-7 md:p-12 space-y-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
        >
          {/* Gold corner accents */}
          <span className="absolute top-0 left-0 h-12 w-12 border-t-2 border-l-2 border-gold/60 rounded-tl-3xl" />
          <span className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-gold/60 rounded-br-3xl" />

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80 text-xs uppercase tracking-[0.18em] flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-gold" /> {t.contact.name}
              </Label>
              <Input
                id="name"
                placeholder={t.contact.placeholders.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                required
                className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold focus-visible:border-gold/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80 text-xs uppercase tracking-[0.18em] flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gold" /> {t.contact.email}
              </Label>
              <Input
                id="email"
                type="email"
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
            <Label htmlFor="service" className="text-white/80 text-xs uppercase tracking-[0.18em] flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5 text-gold" /> {t.contact.service}
            </Label>
            <select
              id="service"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              required
              className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:border-gold/50 transition-all"
            >
              <option value="" className="bg-[hsl(0_0%_7%)] text-white/60">{t.contact.selectService}</option>
              {t.services.items.map((s) => (
                <option key={s.title} value={s.title} className="bg-[hsl(0_0%_7%)] text-white">
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white/80 text-xs uppercase tracking-[0.18em] flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-gold" /> {t.contact.message}
            </Label>
            <Textarea
              id="message"
              rows={6}
              placeholder={t.contact.placeholders.message}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              required
              className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold focus-visible:border-gold/50 transition-all resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="group relative w-full h-14 rounded-xl bg-gradient-gold text-gold-foreground hover:opacity-95 shadow-gold font-semibold tracking-wider uppercase text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_50px_-10px_hsl(41_70%_52%/0.6)]"
          >
            <span className="flex items-center justify-center gap-3">
              {loading ? t.contact.sending : t.contact.submit}
              {!loading && <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </span>
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;