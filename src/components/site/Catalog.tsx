import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolveCategoryImage } from "@/lib/assets";
import { ArrowUpRight } from "lucide-react";

type Cat = { id: string; slug: string; title: string; description: string | null; image_url: string | null; sort_order: number };

export function Catalog() {
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    supabase.from("categories").select("*").order("sort_order", { ascending: true })
      .then(({ data }) => setCats((data as Cat[]) || []));
  }, []);

  return (
    <section id="catalog" className="relative py-24 md:py-32 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">// 02 / Каталог</div>
            <h2 className="text-4xl md:text-6xl font-bold max-w-2xl text-balance">
              Полный <span className="neon-text">арсенал</span> для конвейеров
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md font-mono text-sm">
            [{cats.length.toString().padStart(2, "0")}] категорий оборудования и расходных материалов
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cats.map((c, i) => (
            <article key={c.id} className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={resolveCategoryImage(c.slug, c.image_url)}
                  alt={c.title}
                  loading="lazy"
                  width={800} height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:saturate-150"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute top-4 left-4 font-mono text-xs text-primary bg-background/80 backdrop-blur px-2 py-1 border border-primary/40">
                  №{String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{c.title}</h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
