import { Link } from "react-router-dom";
import { Zap, Phone, Mail, MapPin } from "lucide-react";

const sections = [
  {
    title: "Компания",
    links: [
      { to: "/content/partnerstvo", label: "Партнёры" },
      { to: "/content/otzyvy", label: "Отзывы" },
      { to: "/faq", label: "Вопрос-ответ" },
    ],
  },
  {
    title: "Услуги",
    links: [
      { to: "/catalog", label: "Каталог" },
      { to: "/service", label: "Сервис" },
      { to: "/galery", label: "Фотогалерея" },
    ],
  },
  {
    title: "Клиентам",
    links: [
      { to: "/pay", label: "Оплата и доставка" },
      { to: "/#contact", label: "Контакты" },
      { to: "/auth", label: "Вход в кабинет" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border pt-16 mt-20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 grid place-items-center border border-primary/60">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="font-mono text-xs leading-tight">
                <div className="text-primary tracking-[0.25em] text-sm">DEMETRA</div>
                <div className="text-muted-foreground tracking-widest">// 2005</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Инженерный сервис конвейерных систем для промышленных предприятий Казахстана с 2005 года.
            </p>
            <div className="space-y-3 font-mono text-xs">
              <a href="tel:+77009207012" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-3 w-3" /> +7 700 920 70 12
              </a>
              <a href="mailto:info@demetra2005.kz" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-3 w-3" /> info@demetra2005.kz
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3 w-3" /> Караганда, ул. Сатпаева 3/2
              </div>
            </div>
          </div>

          {sections.map((sec) => (
            <div key={sec.title}>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">{sec.title}</div>
              <ul className="space-y-3">
                {sec.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-border font-mono text-xs text-muted-foreground uppercase tracking-wider">
          <div>© {year} ТОО «Деметра-2005» • Все права защищены</div>
          <div>Караганда • Казахстан</div>
        </div>
      </div>

      <div className="border-y border-border py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-primary/70">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="mx-8">⚡ DEMETRA SYSTEMS // 24/7 INDUSTRIAL SERVICE // KAZAKHSTAN //</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
