import { useEffect } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Quote, Building2, Star } from "lucide-react";

const reviews = [
  {
    company: "Bapy Mining",
    industry: "Горнодобыча",
    text: "Подтверждаем качественное и своевременное выполнение работ по стыковке и обслуживанию конвейерных лент. Рекомендуем ТОО «Деметра-2005» как надёжного партнёра.",
  },
  {
    company: "Nova Цинк / Металайн",
    industry: "Металлургия",
    text: "Бригада «Деметры» выполнила монтаж и стыковку лент в сжатые сроки во время плановой остановки. Качество работ — на высоком профессиональном уровне.",
  },
  {
    company: "ArcelorMittal — Аглопроизводство",
    industry: "Чёрная металлургия",
    text: "Сотрудничаем с компанией более 5 лет. Поставка материалов и сервисное обслуживание — без замечаний. Ценим оперативность и техническую грамотность инженеров.",
  },
  {
    company: "Карцемент",
    industry: "Производство цемента",
    text: "Поставка клея GermanBond и расходных материалов для вулканизации. Оригинальная продукция, честные сроки, развёрнутая техническая поддержка.",
  },
  {
    company: "Central Asia Cement",
    industry: "Производство цемента",
    text: "Многолетнее сотрудничество по поставкам клеевых систем. Подтверждаем стабильное качество поставляемой продукции и ответственный подход к работе.",
  },
  {
    company: "Корпорация Казахмыс",
    industry: "Цветная металлургия",
    text: "ТОО «Деметра-2005» зарекомендовало себя как компетентного подрядчика по обслуживанию конвейерных систем на наших производственных площадках.",
  },
];

export default function ReviewsPage() {
  useEffect(() => { document.title = "Отзывы — Деметра 2005"; }, []);

  return (
    <PageShell
      eyebrow="// Reviews"
      title={<>Отзывы <span className="neon-text">клиентов</span></>}
      description="Нам доверяют ведущие промышленные предприятия Казахстана — от горнодобывающих гигантов до цементных заводов."
      breadcrumb="Отзывы"
    >
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {reviews.map((r, i) => (
              <article key={i} className="group relative bg-background hover:bg-card transition-colors p-8 md:p-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10 group-hover:text-primary/30 transition-colors" />
                <div className="relative">
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/90 leading-relaxed mb-8 italic">«{r.text}»</p>
                  <div className="flex items-center gap-3 pt-6 border-t border-border">
                    <div className="h-12 w-12 grid place-items-center border border-primary/40 group-hover:border-primary group-hover:shadow-neon transition-all shrink-0">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold group-hover:text-primary transition-colors">{r.company}</div>
                      <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{r.industry}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 text-center max-w-2xl mx-auto">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">// Trust</div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="neon-text">500+</span> успешно реализованных проектов
            </h3>
            <p className="text-muted-foreground">
              За 15+ лет работы мы заслужили доверие крупнейших промышленных предприятий Республики Казахстан.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
