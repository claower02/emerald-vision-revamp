import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "Компания" },
    { href: "#catalog", label: "Каталог" },
    { href: "#service", label: "Сервис" },
    { href: "#contact", label: "Контакты" },
  ];

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

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/auth">Вход</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="#contact">Заявка</a>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Меню">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-mono uppercase tracking-wider text-sm text-muted-foreground hover:text-primary">
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="ghost" size="sm" className="flex-1"><Link to="/auth">Вход</Link></Button>
              <Button asChild variant="outline" size="sm" className="flex-1"><a href="#contact">Заявка</a></Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
