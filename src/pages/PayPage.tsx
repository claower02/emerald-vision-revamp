import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/site/PageShell";
import { Banknote, FileText, Truck, Package, MapPin, Clock, ArrowUpRight } from "lucide-react";

const paymentMethods = [
  {
    icon: Banknote,
    title: "Безналичный расчёт",
    desc: "Оплата на расчётный счёт ТОО «Деметра-2005». Работаем с юридическими лицами по договору поставки или оказания услуг.",
  },
  {
    icon: FileText,
    title: "По договору с ИП и ТОО",
    desc: "Заключаем рамочные и разовые договоры. Предоставляем полный пакет закрывающих документов: счёт, накладная, акт, ЭСФ.",
  },
  {
    icon: Package,
    title: "Условия предоплаты",
    desc: "Стандартно — 50% предоплата, 50% по факту поставки или выполнения работ. Условия обсуждаются индивидуально.",
  },
];

const deliveryOptions = [
  {
    icon: Truck,
    title: "Доставка по Казахстану",
    desc: "Транспортные компании-партнёры (DPD, КИТ, Деловые Линии, ПЭК). Доставка в любой регион РК — Алматы, Астана, Шымкент, Актобе, Атырау, Усть-Каменогорск.",
  },
  {
    icon: MapPin,
    title: "Самовывоз со склада",
    desc: "Караганда, ул. Сатпаева, 3/2. Загрузка по предварительной заявке. Возможна отгрузка крупногабаритного оборудования.",
  },
  {
    icon: Clock,
    title: "Сроки поставки",
    desc: "Со склада в Караганде — от 1 рабочего дня. Под заказ из Европы — от 4 до 8 недель в зависимости от позиции и логистики.",
  },
];

export default function PayPage() {
  useEffect(() => { document.title = "Оплата и доставка — Деметра 2005"; }, []);

  return (
    <PageShell
      eyebrow="// Payment & Delivery"
      title={<>Оплата и <span className="neon-text">доставка</span></>}
      description="Прозрачные условия работы для промышленных предприятий. Безналичный расчёт, полный документооборот, поставка по всей Республике Казахстан."
      breadcrumb="Оплата и доставка"
    >
      <section className="py-16 md:py-24">
        <div className="container space-y-20">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-8">// 01 / Оплата</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {paymentMethods.map((m, i) => (
                <article key={m.title} className="group relative bg-background hover:bg-card transition-colors p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-radial-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="h-14 w-14 grid place-items-center border border-primary/40 group-hover:border-primary group-hover:shadow-neon transition-all">
                        <m.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-8">// 02 / Доставка</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {deliveryOptions.map((m, i) => (
                <article key={m.title} className="group relative bg-background hover:bg-card transition-colors p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-radial-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="h-14 w-14 grid place-items-center border border-primary/40 group-hover:border-primary group-hover:shadow-neon transition-all">
                        <m.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="corner-frame p-8 md:p-12 bg-card/40 backdrop-blur">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">// Реквизиты</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">ТОО «Деметра-2005»</h3>
            <div className="grid sm:grid-cols-2 gap-6 font-mono text-sm">
              <div>
                <div className="text-muted-foreground uppercase text-xs tracking-wider mb-1">Юридический адрес</div>
                <div>г. Караганда, ул. Сатпаева, 3/2</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase text-xs tracking-wider mb-1">Телефон</div>
                <div>+7 700 920 70 12</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase text-xs tracking-wider mb-1">Email</div>
                <div>info@demetra2005.kz</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase text-xs tracking-wider mb-1">Режим работы</div>
                <div>Пн-Пт 9:00-18:00</div>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm hover:shadow-neon-strong transition-all">
                Запросить счёт <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
