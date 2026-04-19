import { assets } from "@/lib/assets";
import { Check } from "lucide-react";

const services = [
  "Диагностика и аудит конвейерных линий",
  "Горячая и холодная вулканизация лент",
  "Замена роликов, барабанов, подшипников",
  "Монтаж демпферных и натяжных станций",
  "Нанесение защитных покрытий",
  "Постгарантийное сервисное обслуживание 24/7",
];

export function Service() {
  return (
    <section id="service" className="relative py-24 md:py-32 border-t border-border overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative corner-frame">
            <img
              src={assets.serviceEngineer}
              alt="Инженер на объекте"
              loading="lazy"
              width={1024} height={1024}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 font-mono text-xs uppercase tracking-wider">
              ◉ ON-SITE 24/7
            </div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">// 03 / Сервис</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-balance">
              Полный цикл <span className="neon-text">обслуживания</span>
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              От аварийного ремонта до планового ТО. Наши бригады работают на промышленных объектах
              по всему Казахстану — мы знаем стоимость каждой минуты простоя.
            </p>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s} className="flex items-start gap-3 group">
                  <div className="mt-1 h-5 w-5 grid place-items-center border border-primary/60 group-hover:bg-primary group-hover:shadow-neon transition-all">
                    <Check className="h-3 w-3 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
