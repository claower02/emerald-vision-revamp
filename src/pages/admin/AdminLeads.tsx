import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Mail, Phone, Clock } from "lucide-react";

type Lead = { id: string; name: string; phone: string; email: string | null; message: string | null; status: string; created_at: string };

export default function AdminLeads() {
  const [items, setItems] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setItems((data as Lead[]) || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) toast.error(error.message); else { setItems((p) => p.map(x => x.id === id ? { ...x, status } : x)); }
  };

  const remove = async (id: string) => {
    if (!confirm("Удалить заявку?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Удалено"); load(); }
  };

  return (
    <div className="p-8 md:p-12">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">// Inbox</div>
      <h1 className="text-4xl font-bold mb-8">Заявки <span className="font-mono text-xl text-muted-foreground">[{items.length}]</span></h1>

      {loading ? <div className="font-mono text-muted-foreground">Загрузка...</div> : items.length === 0 ? (
        <div className="corner-frame p-12 text-center bg-card/40 text-muted-foreground">Заявок пока нет.</div>
      ) : (
        <div className="space-y-3">
          {items.map((l) => (
            <div key={l.id} className={`corner-frame p-5 bg-card/60 ${l.status === "new" ? "border-primary/40" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold">{l.name}</h3>
                    {l.status === "new" && <span className="font-mono text-xs px-2 py-0.5 bg-primary text-primary-foreground">NEW</span>}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
                    <a href={`tel:${l.phone}`} className="flex items-center gap-1.5 hover:text-primary"><Phone className="h-3.5 w-3.5" /> {l.phone}</a>
                    {l.email && <a href={`mailto:${l.email}`} className="flex items-center gap-1.5 hover:text-primary"><Mail className="h-3.5 w-3.5" /> {l.email}</a>}
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {new Date(l.created_at).toLocaleString("ru-RU")}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <select value={l.status} onChange={(e) => setStatus(l.id, e.target.value)} className="h-9 rounded-sm border border-input bg-background px-2 text-xs font-mono uppercase">
                    <option value="new">NEW</option>
                    <option value="in_progress">В РАБОТЕ</option>
                    <option value="done">ЗАКРЫТА</option>
                  </select>
                  <Button variant="destructive" size="icon" onClick={() => remove(l.id)}><Trash2 /></Button>
                </div>
              </div>
              {l.message && <p className="text-sm bg-background/60 p-3 border-l-2 border-primary/40">{l.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
