import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";

const faqs = [
  {
    q: "Какие типы конвейерных лент вы обслуживаете?",
    a: "Мы работаем со всеми типами лент: резинотканевые, резинотросовые, шевронные, стальные. Стыкуем ленты любой ширины — от 500 мм до 2400 мм — методом горячей и холодной вулканизации.",
  },
  {
    q: "В какие сроки выполняете аварийный ремонт?",
    a: "Выезд аварийной бригады — в течение 24 часов на объекты Казахстана. Стандартное время на стыковку ленты — от 4 до 12 часов в зависимости от ширины и типа.",
  },
  {
    q: "Даёте ли вы гарантию на работы и материалы?",
    a: "Да. На монтажные работы — 12 месяцев. На стыковочные узлы — до 18 месяцев. На поставляемые материалы и оборудование действует гарантия производителя (REPA, GermanBelt, Denair).",
  },
  {
    q: "Можно ли заказать оборудование, которого нет в каталоге?",
    a: "Да. Мы поставляем оборудование под заказ от европейских и азиатских производителей. Опишите задачу — инженер подберёт оптимальное решение и подготовит коммерческое предложение.",
  },
  {
    q: "Какие способы оплаты вы принимаете?",
    a: "Работаем по безналичному расчёту с юридическими лицами. Принимаем оплату на расчётный счёт, возможна частичная предоплата. Подробности — на странице «Оплата и доставка».",
  },
  {
    q: "Вы работаете только в Караганде?",
    a: "Офис компании находится в Караганде, но мы выполняем работы по всему Казахстану — от Костаная до Усть-Каменогорска. Логистика и командировки бригад включены в стоимость.",
  },
];

const schema = z.object({
  name: z.string().trim().min(2, "Минимум 2 символа").max(120),
  phone: z.string().trim().min(5, "Укажите телефон").max(40),
  email: z.string().trim().email("Неверный email").max(255).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Опишите вопрос").max(2000),
});

export default function FaqPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => { document.title = "Вопрос-ответ — Деметра 2005"; }, []);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const { error } = await supabase.from("leads").insert({
      name: values.name,
      phone: values.phone,
      email: values.email || null,
      message: `[FAQ] ${values.message}`,
    });
    if (error) { toast.error("Ошибка отправки", { description: error.message }); return; }
    setSent(true);
    reset();
    toast.success("Вопрос отправлен!");
  };

  return (
    <PageShell
      eyebrow="// FAQ"
      title={<>Вопрос — <span className="neon-text">ответ</span></>}
      description="Ответы на частые вопросы о наших услугах, поставках и сервисном обслуживании. Не нашли свой вопрос — задайте его через форму ниже."
      breadcrumb="Вопрос-ответ"
    >
      <section className="py-16 md:py-24">
        <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">// Частые вопросы</div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border bg-card/40 px-5 data-[state=open]:border-primary data-[state=open]:shadow-neon transition-all">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="flex items-start gap-3">
                      <span className="font-mono text-xs text-primary shrink-0 mt-1">0{i + 1}</span>
                      <span className="text-base font-bold">{f.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-9">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">// Задать вопрос</div>
            <div className="corner-frame p-6 md:p-8 bg-card/60 backdrop-blur sticky top-24">
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-neon rounded-full" />
                  <h3 className="text-2xl font-bold mb-3">Вопрос принят</h3>
                  <p className="text-muted-foreground mb-6">Ответим в течение рабочего дня.</p>
                  <Button variant="outline" onClick={() => setSent(false)}>Задать ещё один</Button>
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
                    <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Ваш вопрос *</label>
                    <Textarea {...register("message")} placeholder="Опишите вопрос..." className="bg-background border-border focus:border-primary min-h-[140px]" />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" variant="toxic" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Отправить вопрос"} <Send />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
