import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";

type Product = {
  id: string; category_id: string | null; title: string; description: string | null;
  price_text: string | null; image_url: string | null; is_featured: boolean;
};
type Cat = { id: string; title: string };

export default function AdminProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [{ data: p }, { data: c }] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("id,title").order("sort_order"),
    ]);
    setItems((p as Product[]) || []);
    setCats((c as Cat[]) || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const update = (id: string, patch: Partial<Product>) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const save = async (p: Product) => {
    const { error } = await supabase.from("products").update({
      category_id: p.category_id, title: p.title, description: p.description,
      price_text: p.price_text, image_url: p.image_url, is_featured: p.is_featured,
    }).eq("id", p.id);
    if (error) toast.error(error.message); else toast.success("Сохранено");
  };

  const remove = async (id: string) => {
    if (!confirm("Удалить товар?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Удалено"); load(); }
  };

  const add = async () => {
    const { error } = await supabase.from("products").insert({ title: "Новый товар" });
    if (error) toast.error(error.message); else load();
  };

  return (
    <div className="p-8 md:p-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">// Catalog / Products</div>
          <h1 className="text-4xl font-bold">Товары</h1>
        </div>
        <Button variant="toxic" onClick={add}><Plus /> Новый</Button>
      </div>

      {loading ? <div className="font-mono text-muted-foreground">Загрузка...</div> : items.length === 0 ? (
        <div className="corner-frame p-12 text-center bg-card/40">
          <p className="text-muted-foreground mb-4">Пока нет товаров. Добавьте первый.</p>
          <Button variant="toxic" onClick={add}><Plus /> Создать товар</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((p) => (
            <div key={p.id} className="corner-frame p-6 bg-card/60 grid md:grid-cols-[1fr_auto] gap-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-xs uppercase text-muted-foreground">Название</label>
                  <Input value={p.title} onChange={(e) => update(p.id, { title: e.target.value })} />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase text-muted-foreground">Категория</label>
                  <select
                    value={p.category_id || ""}
                    onChange={(e) => update(p.id, { category_id: e.target.value || null })}
                    className="flex h-10 w-full rounded-sm border border-input bg-background px-3 text-sm"
                  >
                    <option value="">— без категории —</option>
                    {cats.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-xs uppercase text-muted-foreground">Цена (текст)</label>
                  <Input value={p.price_text || ""} onChange={(e) => update(p.id, { price_text: e.target.value })} placeholder="по запросу" />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 font-mono text-xs uppercase text-muted-foreground">
                    <input type="checkbox" checked={p.is_featured} onChange={(e) => update(p.id, { is_featured: e.target.checked })} />
                    Рекомендуемый
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="font-mono text-xs uppercase text-muted-foreground">Описание</label>
                  <Textarea value={p.description || ""} onChange={(e) => update(p.id, { description: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="font-mono text-xs uppercase text-muted-foreground">URL изображения</label>
                  <Input value={p.image_url || ""} onChange={(e) => update(p.id, { image_url: e.target.value })} placeholder="https://..." />
                </div>
              </div>
              <div className="flex md:flex-col gap-2">
                <Button onClick={() => save(p)}><Save /> Сохранить</Button>
                <Button variant="destructive" size="icon" onClick={() => remove(p.id)}><Trash2 /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
