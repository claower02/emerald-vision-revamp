import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";

type Cat = { id: string; slug: string; title: string; description: string | null; image_url: string | null; sort_order: number };

export default function AdminCategories() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("categories").select("*").order("sort_order");
    setCats((data as Cat[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const update = (id: string, patch: Partial<Cat>) => {
    setCats((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const save = async (c: Cat) => {
    const { error } = await supabase.from("categories").update({
      slug: c.slug, title: c.title, description: c.description, image_url: c.image_url, sort_order: c.sort_order,
    }).eq("id", c.id);
    if (error) toast.error(error.message); else toast.success("Сохранено");
  };

  const remove = async (id: string) => {
    if (!confirm("Удалить категорию?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Удалено"); load(); }
  };

  const add = async () => {
    const slug = `cat-${Date.now()}`;
    const { error } = await supabase.from("categories").insert({ slug, title: "Новая категория", sort_order: cats.length + 1 });
    if (error) toast.error(error.message); else load();
  };

  return (
    <div className="p-8 md:p-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">// Catalog / Categories</div>
          <h1 className="text-4xl font-bold">Категории</h1>
        </div>
        <Button variant="toxic" onClick={add}><Plus /> Новая</Button>
      </div>

      {loading ? <div className="font-mono text-muted-foreground">Загрузка...</div> : (
        <div className="space-y-4">
          {cats.map((c) => (
            <div key={c.id} className="corner-frame p-6 bg-card/60 grid md:grid-cols-[1fr_auto] gap-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-xs uppercase text-muted-foreground">Slug</label>
                  <Input value={c.slug} onChange={(e) => update(c.id, { slug: e.target.value })} />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase text-muted-foreground">Порядок</label>
                  <Input type="number" value={c.sort_order} onChange={(e) => update(c.id, { sort_order: Number(e.target.value) })} />
                </div>
                <div className="md:col-span-2">
                  <label className="font-mono text-xs uppercase text-muted-foreground">Название</label>
                  <Input value={c.title} onChange={(e) => update(c.id, { title: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="font-mono text-xs uppercase text-muted-foreground">Описание</label>
                  <Textarea value={c.description || ""} onChange={(e) => update(c.id, { description: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="font-mono text-xs uppercase text-muted-foreground">URL картинки (https://...) — опционально</label>
                  <Input value={c.image_url || ""} onChange={(e) => update(c.id, { image_url: e.target.value })} placeholder="Если пусто — используется дефолтное изображение по slug" />
                </div>
              </div>
              <div className="flex md:flex-col gap-2 md:justify-start">
                <Button onClick={() => save(c)}><Save /> Сохранить</Button>
                <Button variant="destructive" size="icon" onClick={() => remove(c.id)}><Trash2 /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
