import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, Inbox, Layers, Activity } from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState({ cats: 0, products: 0, leads: 0, newLeads: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("categories").select("id", { count: "exact", head: true }),
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("leads").select("id", { count: "exact", head: true }),
      supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    ]).then(([c, p, l, nl]) => {
      setStats({ cats: c.count || 0, products: p.count || 0, leads: l.count || 0, newLeads: nl.count || 0 });
    });
  }, []);

  const cards = [
    { icon: Layers, label: "Категории", value: stats.cats },
    { icon: Package, label: "Товары", value: stats.products },
    { icon: Inbox, label: "Всего заявок", value: stats.leads },
    { icon: Activity, label: "Новые заявки", value: stats.newLeads, accent: true },
  ];

  return (
    <div className="p-8 md:p-12">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">// Overview</div>
      <h1 className="text-4xl font-bold mb-10">Панель управления</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-12">
        {cards.map((c) => (
          <div key={c.label} className="bg-background p-6">
            <div className="flex items-center justify-between mb-4">
              <c.icon className={c.accent ? "h-5 w-5 text-primary" : "h-5 w-5 text-muted-foreground"} />
              {c.accent && <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
            </div>
            <div className={`font-mono text-4xl font-bold ${c.accent ? "neon-text" : ""}`}>{c.value}</div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-2">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="corner-frame p-8 bg-card/60">
        <h2 className="text-xl font-bold mb-3">Добро пожаловать в админку</h2>
        <p className="text-muted-foreground">
          Управляйте каталогом, обрабатывайте заявки и редактируйте контент главной страницы.
          Все изменения публикуются мгновенно.
        </p>
      </div>
    </div>
  );
}
