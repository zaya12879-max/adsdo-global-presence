import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { sendToWebhook } from "@/lib/webhook";

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
    <section id="contact" className="py-20 md:py-28 bg-secondary/40">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">Contact</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 leading-tight">{t.contact.title}</h2>
          <p className="text-muted-foreground mt-4 text-lg">{t.contact.subtitle}</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-card rounded-2xl shadow-luxury border border-border p-6 md:p-10 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">{t.contact.name}</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.contact.email}</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="service">{t.contact.service}</Label>
            <select
              id="service"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">{t.contact.selectService}</option>
              {t.services.items.map((s) => (
                <option key={s.title} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t.contact.message}</Label>
            <Textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full bg-gradient-gold text-gold-foreground hover:opacity-90 shadow-gold font-semibold"
          >
            {loading ? t.contact.sending : t.contact.submit}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;