import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity } from "lucide-react";
import { assets } from "@/lib/assets";
import { supabase } from "@/integrations/supabase/client";

type HeroData = {
  eyebrow: string; title: string; subtitle: string; cta: string;
  stat1_n: string; stat1_l: string;
  stat2_n: string; stat2_l: string;
  stat3_n: string; stat3_l: string;
};
const fallback: HeroData = {
  eyebrow: "DEMETRA // INDUSTRIAL SYSTEMS",
  title: "РЕМОНТ КОНВЕЙЕРНЫХ СИСТЕМ НОВОГО ПОКОЛЕНИЯ",
  subtitle: "15 лет на промышленном рынке Казахстана. Поддерживаем непрерывность производства.",
  cta: "Оставить заявку",
  stat1_n: "15+", stat1_l: "лет опыта",
  stat2_n: "500+", stat2_l: "объектов",
  stat3_n: "24/7", stat3_l: "сервис",
};

export function Hero() {
  const [data, setData] = useState<HeroData>(fallback);

  useEffect(() => {
    supabase.from("site_content").select("value").eq("key", "hero").maybeSingle()
      .then(({ data: row }) => {
        if (row?.value) setData({ ...fallback, ...(row.value as Partial<HeroData>) });
      });
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={assets.heroConveyor} alt="Конвейерная система" className="w-full h-full object-cover opacity-50" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 scanlines opacity-50" />
      </div>

      {/* Animated scanline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan pointer-events-none" />

      <div className="container relative z-10 py-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-[0.3em] text-primary animate-flicker">
            <Activity className="h-3 w-3" />
            <span>{data.eyebrow}</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8 text-balance">
            {data.title.split(" ").map((word, i) => (
              <span key={i} className={i % 3 === 1 ? "neon-text" : ""}>{word} </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 text-balance">
            {data.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Button asChild variant="toxic" size="lg">
              <a href="#contact">{data.cta} <ArrowRight /></a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#catalog">Смотреть каталог</a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl">
            {[
              [data.stat1_n, data.stat1_l],
              [data.stat2_n, data.stat2_l],
              [data.stat3_n, data.stat3_l],
            ].map(([n, l]) => (
              <div key={l} className="corner-frame p-4 md:p-6 bg-card/40 backdrop-blur-sm">
                <div className="font-mono text-3xl md:text-5xl font-bold neon-text">{n}</div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-2">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
