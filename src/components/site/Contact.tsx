import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const schema = z.object({
  name: z.string().trim().min(2, "Минимум 2 символа").max(120),
  phone: z.string().trim().min(5, "Укажите телефон").max(40),
  email: z.string().trim().email("Неверный email").max(255).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type Contacts = { phone: string; email: string; address: string; hours: string };
const fallbackContacts: Contacts = {
  phone: "+7 700 920 70 12",
  email: "info@demetra2005.kz",
  address: "г. Караганда, Республика Казахстан",
  hours: "Пн-Пт 9:00-18:00",
};

export function Contact() {
  const [contacts, setContacts] = useState<Contacts>(fallbackContacts);
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    supabase.from("site_content").select("value").eq("key", "contacts").maybeSingle()
      .then(({ data }) => { if (data?.value) setContacts({ ...fallbackContacts, ...(data.value as Partial<Contacts>) }); });
  }, []);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const { error } = await supabase.from("leads").insert({
      name: values.name,
      phone: values.phone,
      email: values.email || null,
      message: values.message || null,
    });
    if (error) {
      toast.error("Ошибка отправки", { description: error.message });
      return;
    }
    setSent(true);
    reset();
    toast.success("Заявка принята! Мы свяжемся в течение часа.");
  };

  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="contact" className="relative py-24 md:py-32 border-t border-border">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div data-reveal="left">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">// 04 / Контакт</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-balance">
              Запустим <span className="neon-text">диалог</span>
            </h2>
            <p className="text-muted-foreground mb-12 leading-relaxed">
              Опишите задачу — наш инженер перезвонит в течение часа в рабочее время и подготовит коммерческое предложение.
            </p>

            <div className="space-y-6">
              {[
                { Icon: Phone, label: "Телефон", value: contacts.phone, href: `tel:${contacts.phone.replace(/\s/g, "")}` },
                { Icon: Mail, label: "Email", value: contacts.email, href: `mailto:${contacts.email}` },
                { Icon: MapPin, label: "Адрес", value: contacts.address },
                { Icon: Clock, label: "Часы работы", value: contacts.hours },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 group">
                  <div className="h-11 w-11 grid place-items-center border border-primary/40 group-hover:border-primary group-hover:shadow-neon transition-all shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                    {href ? (
                      <a href={href} className="text-lg hover:text-primary transition-colors">{value}</a>
                    ) : (
                      <div className="text-lg">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative" data-reveal="right">
            <div className="corner-frame p-6 md:p-10 bg-card/60 backdrop-blur">
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-neon rounded-full" />
                  <h3 className="text-2xl font-bold mb-3">Заявка принята</h3>
                  <p className="text-muted-foreground mb-6">Мы свяжемся с вами в самое ближайшее время.</p>
                  <Button variant="outline" onClick={() => setSent(false)}>Отправить ещё одну</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Имя *</label>
                    <Input {...register("name")} placeholder="Иван Иванов" className="bg-background border-border focus:border-primary h-12" />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Телефон *</label>
                    <Input {...register("phone")} placeholder="+7 ___ ___ __ __" className="bg-background border-border focus:border-primary h-12" />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Email</label>
                    <Input {...register("email")} type="email" placeholder="you@company.kz" className="bg-background border-border focus:border-primary h-12" />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Сообщение</label>
                    <Textarea {...register("message")} placeholder="Опишите задачу..." className="bg-background border-border focus:border-primary min-h-[120px]" />
                  </div>
                  <Button type="submit" variant="toxic" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Отправить заявку"} <Send />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
