import { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageShellProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  breadcrumb: string;
  children: ReactNode;
}

export function PageShell({ eyebrow, title, description, breadcrumb, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        {/* Header */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 border-b border-border overflow-hidden">
          <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
          <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan pointer-events-none" />
          <div className="container relative">
            <nav className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-primary">{breadcrumb}</span>
            </nav>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">{eyebrow}</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">{title}</h1>
            {description && (
              <p className="text-lg text-muted-foreground max-w-3xl text-balance">{description}</p>
            )}
          </div>
        </section>

        {children}
      </main>
      <Footer />
    </div>
  );
}
