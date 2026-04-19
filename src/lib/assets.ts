import heroConveyor from "@/assets/hero-conveyor.jpg";
import catCoatings from "@/assets/cat-coatings.jpg";
import catDampers from "@/assets/cat-dampers.jpg";
import catAdhesives from "@/assets/cat-adhesives.jpg";
import catCompressors from "@/assets/cat-compressors.jpg";
import catRollers from "@/assets/cat-rollers.jpg";
import catVulcanization from "@/assets/cat-vulcanization.jpg";
import serviceEngineer from "@/assets/service-engineer.jpg";

export const assets = {
  heroConveyor,
  serviceEngineer,
};

export const categoryImageBySlug: Record<string, string> = {
  coatings: catCoatings,
  dampers: catDampers,
  adhesives: catAdhesives,
  compressors: catCompressors,
  rollers: catRollers,
  vulcanization: catVulcanization,
};

export function resolveCategoryImage(slug: string | null | undefined, urlInDb: string | null | undefined): string {
  // If admin uploaded a real http(s) url to storage — use it
  if (urlInDb && /^https?:\/\//i.test(urlInDb)) return urlInDb;
  if (slug && categoryImageBySlug[slug]) return categoryImageBySlug[slug];
  return catCoatings;
}
