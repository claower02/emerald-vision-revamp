import { useEffect } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Globe, Handshake, Award, ArrowUpRight } from "lucide-react";

const partners = [
  {
    name: "REPA Transportbanden",
    country: "Германия",
    desc: "Производитель промышленных конвейерных лент премиум-класса. Эксклюзивный поставщик для рынка Казахстана.",
    accent: "REPA",
  },
  {
    name: "GermanBelt Systems GmbH",
    country: "Германия",
    desc: "Полный спектр комплектующих для конвейерных систем: ленты, очистители, ролики, клеевые системы GermanBond.",
    accent: "GBS",
  },
  {
    name: "Rouleaux Pack",
    country: "Бельгия",
    desc: "Высокоточные конвейерные ролики HDPE и стальные. Решения для тяжёлой промышленности и горнодобывающего сектора.",
    accent: "RP",
  },
  {
    name: "Denair",
    country: "Китай / Германия",
    desc: "Винтовые компрессоры промышленного класса. Энергоэффективные решения для непрерывного производства.",
    accent: "DNR",
  },
];

export default function PartnersPage() {
  useEffect(() => { document.title = "Партнерство — Деметра 2005"; }, []);

  return (
    <PageShell
      eyebrow="// Partnership"
      title={<>Наши <span className="neon-text">партнёры</span></>}
      description="Прямые контракты с европейскими производителями. Гарантированное качество и оригинальные компоненты для промышленности Казахстана."
      breadcrumb="Партнерство"
    >
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {partners.map((p, i) => (
              <article key={p.name} className="group relative bg-background hover:bg-card transition-colors p-8 md:p-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div className="h-20 w-20 grid place-items-center border border-primary/40 group-hover:border-primary group-hover:shadow-neon transition-all bg-card">
                      <span className="font-mono font-bold text-primary text-lg">{p.accent}</span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1} / 04</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary mb-2">
                    <Globe className="h-3 w-3" /> {p.country}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 grid lg:grid-cols-3 gap-px bg-border">
            {[
              { icon: Handshake, n: "4+", l: "стратегических партнёра" },
              { icon: Award, n: "100%", l: "оригинальные комплектующие" },
              { icon: Globe, n: "EU", l: "прямые поставки из Европы" },
            ].map((s) => (
              <div key={s.l} className="bg-background p-8 text-center">
                <s.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="font-mono text-4xl md:text-5xl font-bold neon-text mb-2">{s.n}</div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-20 corner-frame p-8 md:p-12 bg-card/40 backdrop-blur">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">// Стать партнёром</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Производите оборудование для промышленности?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Мы открыты к сотрудничеству с производителями конвейерного и сопутствующего оборудования. Свяжитесь с нами для обсуждения дилерских условий.
            </p>
            <a href="mailto:info@demetra2005.kz" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm hover:shadow-neon-strong transition-all">
              Связаться <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
