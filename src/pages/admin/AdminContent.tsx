import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save } from "lucide-react";

type AnyObj = Record<string, string>;

const HERO_FIELDS = [
  ["eyebrow", "Подзаголовок (eyebrow)"],
  ["title", "Главный заголовок"],
  ["subtitle", "Подзаголовок"],
  ["cta", "Текст кнопки"],
  ["stat1_n", "Статистика 1 — число"],
  ["stat1_l", "Статистика 1 — подпись"],
  ["stat2_n", "Статистика 2 — число"],
  ["stat2_l", "Статистика 2 — подпись"],
  ["stat3_n", "Статистика 3 — число"],
  ["stat3_l", "Статистика 3 — подпись"],
] as const;

const CONTACTS_FIELDS = [
  ["phone", "Телефон"],
  ["email", "Email"],
  ["address", "Адрес"],
  ["hours", "Часы работы"],
] as const;

export default function AdminContent() {
  const [hero, setHero] = useState<AnyObj>({});
  const [contacts, setContacts] = useState<AnyObj>({});

  useEffect(() => {
    Promise.all([
      supabase.from("site_content").select("value").eq("key", "hero").maybeSingle(),
      supabase.from("site_content").select("value").eq("key", "contacts").maybeSingle(),
    ]).then(([h, c]) => {
      setHero((h.data?.value as AnyObj) || {});
      setContacts((c.data?.value as AnyObj) || {});
    });
  }, []);

  const save = async (key: string, value: AnyObj) => {
    const { error } = await supabase.from("site_content").upsert({ key, value }, { onConflict: "key" });
    if (error) toast.error(error.message); else toast.success("Сохранено");
  };

  return (
    <div className="p-8 md:p-12 space-y-12">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">// Site / Content</div>
        <h1 className="text-4xl font-bold">Контент главной</h1>
      </div>

      <section className="corner-frame p-8 bg-card/60">
        <h2 className="text-2xl font-bold mb-6">Hero-секция</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {HERO_FIELDS.map(([k, label]) => (
            <div key={k} className={k === "title" || k === "subtitle" ? "md:col-span-2" : ""}>
              <label className="font-mono text-xs uppercase text-muted-foreground mb-1 block">{label}</label>
              {k === "subtitle" || k === "title" ? (
                <Textarea value={hero[k] || ""} onChange={(e) => setHero({ ...hero, [k]: e.target.value })} />
              ) : (
                <Input value={hero[k] || ""} onChange={(e) => setHero({ ...hero, [k]: e.target.value })} />
              )}
            </div>
          ))}
        </div>
        <Button className="mt-6" onClick={() => save("hero", hero)}><Save /> Сохранить hero</Button>
      </section>

      <section className="corner-frame p-8 bg-card/60">
        <h2 className="text-2xl font-bold mb-6">Контакты</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {CONTACTS_FIELDS.map(([k, label]) => (
            <div key={k}>
              <label className="font-mono text-xs uppercase text-muted-foreground mb-1 block">{label}</label>
              <Input value={contacts[k] || ""} onChange={(e) => setContacts({ ...contacts, [k]: e.target.value })} />
            </div>
          ))}
        </div>
        <Button className="mt-6" onClick={() => save("contacts", contacts)}><Save /> Сохранить контакты</Button>
      </section>
    </div>
  );
}
