import { Zap } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border py-12 mt-20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 grid place-items-center border border-primary/60">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div className="font-mono text-xs">
              <div className="text-primary tracking-[0.25em]">DEMETRA 2005</div>
              <div className="text-muted-foreground">Industrial Conveyor Systems</div>
            </div>
          </div>
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            © {year} • Все права защищены
          </div>
        </div>
      </div>
      {/* Marquee */}
      <div className="mt-8 border-y border-border py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-primary/70">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="mx-8">⚡ DEMETRA SYSTEMS // 24/7 INDUSTRIAL SERVICE // KAZAKHSTAN //</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
