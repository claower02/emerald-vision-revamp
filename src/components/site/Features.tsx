import { Shield, Coins, Award, Layers } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const items = [
  { icon: Shield, n: "01", title: "15+ лет опыта", desc: "Безаварийная работа на крупнейших ГОКах Казахстана" },
  { icon: Coins, n: "02", title: "Доступные цены", desc: "Прямые поставки от производителей, гибкие условия" },
  { icon: Award, n: "03", title: "Качественная продукция", desc: "Сертифицированные материалы, гарантия на работы" },
  { icon: Layers, n: "04", title: "Широкий ассортимент", desc: "Полный цикл — от расходников до капитального ремонта" },
];

export function Features() {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">// 01 / Преимущества</div>
            <h2 className="text-4xl md:text-6xl font-bold max-w-2xl text-balance">
              Почему выбирают <span className="neon-text">Деметра</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Мы — инженерная команда полного цикла: диагностика, поставка, монтаж и постгарантийное обслуживание конвейерных систем.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {items.map((it) => (
            <div key={it.n} className="group relative bg-background hover:bg-card transition-colors p-8 md:p-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial-glow opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-start justify-between mb-8">
                  <div className="h-14 w-14 grid place-items-center border border-primary/40 group-hover:border-primary group-hover:shadow-neon transition-all">
                    <it.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{it.n}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
