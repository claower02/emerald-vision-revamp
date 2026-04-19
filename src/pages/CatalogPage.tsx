import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { resolveCategoryImage } from "@/lib/assets";
import { PageShell } from "@/components/site/PageShell";
import { ArrowUpRight } from "lucide-react";

type Cat = { id: string; slug: string; title: string; description: string | null; image_url: string | null; sort_order: number };
type Product = { id: string; title: string; description: string | null; price_text: string | null; image_url: string | null; category_id: string | null };

export default function CatalogPage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    document.title = "Каталог — Деметра 2005";
    Promise.all([
      supabase.from("categories").select("*").order("sort_order", { ascending: true }),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
    ]).then(([c, p]) => {
      setCats((c.data as Cat[]) || []);
      setProducts((p.data as Product[]) || []);
    });
  }, []);

  return (
    <PageShell
      eyebrow="// Catalog"
      title={<>Каталог <span className="neon-text">оборудования</span></>}
      description="Полный ассортимент конвейерного оборудования, расходных материалов и сервисных решений для промышленности."
      breadcrumb="Каталог"
    >
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-8">// Категории</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-20">
            {cats.map((c, i) => (
              <article key={c.id} className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={resolveCategoryImage(c.slug, c.image_url)}
                    alt={c.title}
                    loading="lazy"
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
              </article>
            ))}
          </div>

          {products.length > 0 && (
            <>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-8">// Популярные позиции</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
                {products.map((p) => {
                  const cat = cats.find((c) => c.id === p.category_id);
                  return (
                    <article key={p.id} className="group bg-background hover:bg-card transition-colors p-6">
                      <div className="aspect-square mb-4 overflow-hidden bg-muted">
                        <img
                          src={p.image_url || resolveCategoryImage(cat?.slug, cat?.image_url ?? null)}
                          alt={p.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                      <p className="font-mono text-xs text-primary">{p.price_text || "По запросу"}</p>
                    </article>
                  );
                })}
              </div>
            </>
          )}

          <div className="mt-20 corner-frame p-8 md:p-12 bg-card/40 backdrop-blur text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Не нашли нужную позицию?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Мы поставляем оборудование под заказ. Опишите задачу — наш инженер подберёт решение.
            </p>
            <Link to="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm hover:shadow-neon-strong transition-all">
              Оставить заявку <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
