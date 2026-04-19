import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { assets } from "@/lib/assets";
import { resolveCategoryImage } from "@/lib/assets";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const items = [
  { src: resolveCategoryImage("adhesives", null), title: "Клеи и грунтовки GermanBond" },
  { src: resolveCategoryImage("vulcanization", null), title: "Оборудование для вулканизации" },
  { src: resolveCategoryImage("compressors", null), title: "Компрессоры Denair" },
  { src: resolveCategoryImage("rollers", null), title: "Конвейерные ролики HDPE" },
  { src: resolveCategoryImage("dampers", null), title: "Демпферные станции" },
  { src: resolveCategoryImage("coatings", null), title: "Защитные покрытия" },
  { src: assets.heroConveyor, title: "Промышленный конвейер на объекте" },
  { src: assets.serviceEngineer, title: "Бригада на сервисном выезде" },
];

export default function GalleryPage() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => { document.title = "Фотогалерея — Деметра 2005"; }, []);

  return (
    <PageShell
      eyebrow="// Gallery"
      title={<>Фото<span className="neon-text">галерея</span></>}
      description="Реальные снимки оборудования, материалов и работы наших бригад на промышленных объектах Казахстана."
      breadcrumb="Фотогалерея"
    >
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {items.map((it, i) => (
              <button
                key={i}
                onClick={() => setOpen(i)}
                className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all aspect-[4/3] text-left"
              >
                <img
                  src={it.src}
                  alt={it.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:saturate-150"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute top-3 left-3 font-mono text-[10px] text-primary bg-background/80 backdrop-blur px-2 py-1 border border-primary/40">
                  IMG_{String(i + 1).padStart(3, "0")}
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="font-mono text-xs uppercase tracking-wider text-foreground/90">{it.title}</div>
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={open !== null} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-5xl bg-background border-primary p-0 overflow-hidden">
          {open !== null && (
            <div className="relative">
              <img src={items[open].src} alt={items[open].title} className="w-full h-auto" />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-background to-transparent">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-1">IMG_{String(open + 1).padStart(3, "0")}</div>
                <div className="text-xl font-bold">{items[open].title}</div>
              </div>
              <button
                onClick={() => setOpen(null)}
                className="absolute top-4 right-4 h-10 w-10 grid place-items-center bg-background/80 border border-primary/40 hover:border-primary hover:shadow-neon transition-all"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5 text-primary" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
