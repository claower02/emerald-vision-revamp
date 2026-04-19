import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/site/PageShell";
import { Wrench, Cog, Layers, Activity, Truck, ShieldCheck, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Activity,
    title: "Сервисное обслуживание ленточных конвейеров",
    desc: "Заводка, навеска и стыковка любых типов конвейерной ленты независимо от ширины и длины конвейера. Государственная лицензия, собственное оборудование и квалифицированный персонал.",
  },
  {
    icon: Layers,
    title: "Футеровка и гуммирование поверхностей",
    desc: "Защита барабанов, бункеров и течек от износа. Используем резину премиум-класса с гарантией адгезии и долговечности в условиях интенсивной нагрузки.",
  },
  {
    icon: Cog,
    title: "Горячая и холодная вулканизация",
    desc: "Стыковка лент любых типоразмеров. Применяем современные клеи и пресс-оборудование GermanBelt и REPA для безразрывного соединения.",
  },
  {
    icon: Wrench,
    title: "Монтаж и ремонт оборудования",
    desc: "Замена роликов, барабанов, подшипниковых узлов. Установка демпферных и натяжных станций, очистителей и направляющих систем.",
  },
  {
    icon: ShieldCheck,
    title: "Диагностика и аудит линий",
    desc: "Полная инспекция конвейерной системы с дефектовкой и рекомендациями по модернизации. Прогнозируем ресурс узлов и стоимость владения.",
  },
  {
    icon: Truck,
    title: "Шеф-монтаж на объектах Казахстана",
    desc: "Выезжаем на ГОКи, цементные и металлургические заводы по всей стране. Работаем 24/7 в режиме аварийных и плановых остановок.",
  },
];

export default function ServicePage() {
  useEffect(() => { document.title = "Сервис — Деметра 2005"; }, []);

  return (
    <PageShell
      eyebrow="// Service"
      title={<>Инженерный <span className="neon-text">сервис</span> полного цикла</>}
      description="ТОО «Деметра-2005» — сертифицированный подрядчик по обслуживанию конвейерных систем на промышленных объектах Республики Казахстан."
      breadcrumb="Сервис"
    >
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {services.map((s, i) => (
              <article key={s.title} className="group relative bg-background hover:bg-card transition-colors p-8 md:p-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-14 w-14 grid place-items-center border border-primary/40 group-hover:border-primary group-hover:shadow-neon transition-all">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 grid lg:grid-cols-3 gap-px bg-border">
            {[
              { n: "15+", l: "лет на рынке" },
              { n: "500+", l: "обслуженных объектов" },
              { n: "24/7", l: "аварийный выезд" },
            ].map((s) => (
              <div key={s.l} className="bg-background p-8 text-center">
                <div className="font-mono text-5xl md:text-6xl font-bold neon-text mb-2">{s.n}</div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm hover:shadow-neon-strong transition-all">
              Заказать сервис <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
