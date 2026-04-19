import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/catalog", label: "Каталог" },
  { href: "/service", label: "Сервис" },
  { href: "/galery", label: "Галерея" },
  { href: "/content/partnerstvo", label: "Партнёры" },
  { href: "/content/otzyvy", label: "Отзывы" },
  { href: "/pay", label: "Оплата" },
  { href: "/faq", label: "FAQ" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative h-8 w-8 grid place-items-center border border-primary/60 bg-background">
            <Zap className="h-4 w-4 text-primary group-hover:animate-pulse" />
            <span className="absolute -inset-px border border-primary opacity-0 group-hover:opacity-100 transition" />
          </div>
          <div className="font-mono text-xs leading-tight">
            <div className="text-primary tracking-[0.25em]">DEMETRA</div>
            <div className="text-muted-foreground tracking-widest">// 2005</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={cn(
                "text-xs font-mono uppercase tracking-wider transition-colors",
                pathname === l.href ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/auth">Вход</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/#contact">Заявка</Link>
          </Button>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Меню">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-mono uppercase tracking-wider text-sm transition-colors",
                  pathname === l.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="ghost" size="sm" className="flex-1"><Link to="/auth" onClick={() => setOpen(false)}>Вход</Link></Button>
              <Button asChild variant="outline" size="sm" className="flex-1"><Link to="/#contact" onClick={() => setOpen(false)}>Заявка</Link></Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
