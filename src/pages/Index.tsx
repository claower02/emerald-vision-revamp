import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Catalog } from "@/components/site/Catalog";
import { Service } from "@/components/site/Service";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Features />
        <Catalog />
        <Service />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
