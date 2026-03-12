// Données des zones d'intervention — Paris & Île-de-France uniquement

export interface RegionData {
  name: string;
  slug: string;
  description: string;
  seoDescription: string;
  seoKeywords?: string[];
  departments: DepartmentData[];
  mainCities: string[];
  economicHighlights: string[];
  clientTypes: string[];
  gpsCenter?: { lat: number; lng: number };
  imageAlt?: string;
}

export interface DepartmentData {
  name: string;
  code: string;
}

export const regionsData: RegionData[] = [
  {
    name: "Paris",
    slug: "paris",
    description: "Répar'Action Volets est votre expert en dépannage, réparation, installation et motorisation de volets roulants à Paris. Intervention rapide dans tous les arrondissements pour un service de qualité.",
    seoDescription: "Dépannage volets roulants Paris, réparation volets Paris, installation et motorisation volets Paris. Intervention rapide dans tous les arrondissements de Paris. Devis gratuit.",
    seoKeywords: [
      "volet roulant Paris", "dépannage volet Paris", "réparation volet roulant Paris",
      "motorisation volet Paris", "artisan RGE Paris", "volet bloqué Paris",
      "installation volet roulant Paris", "Somfy Paris", "Bubendorff Paris",
      "rideau métallique Paris", "vitrerie Paris", "devis volet roulant Paris",
      "volet roulant 75", "volet roulant haussmannien", "volet roulant immeuble classé",
    ],
    departments: [{ name: "Paris", code: "75" }],
    mainCities: ["Paris 1er", "Paris 2e", "Paris 3e", "Paris 4e", "Paris 5e", "Paris 6e", "Paris 7e", "Paris 8e", "Paris 9e", "Paris 10e", "Paris 11e", "Paris 12e", "Paris 13e", "Paris 14e", "Paris 15e", "Paris 16e", "Paris 17e", "Paris 18e", "Paris 19e", "Paris 20e"],
    economicHighlights: ["Centre économique et touristique mondial", "Sièges sociaux d'entreprises", "Commerces de luxe", "Patrimoine historique"],
    clientTypes: ["Particuliers", "Entreprises", "Commerces", "Syndics de copropriété", "Hôtels"],
    gpsCenter: { lat: 48.8566, lng: 2.3522 },
    imageAlt: "Panorama des toits de Paris avec volets roulants sur immeubles haussmanniens",
  },
  {
    name: "Île-de-France",
    slug: "ile-de-france",
    description: "Répar'Action Volets intervient dans toute l'Île-de-France pour le dépannage, la réparation, l'installation et la motorisation de vos volets roulants. Service rapide et efficace dans les départements 77, 78, 91, 92, 93, 94, 95.",
    seoDescription: "Dépannage et réparation volets roulants Île-de-France, installation et motorisation volets 77, 78, 91, 92, 93, 94, 95. Intervention rapide et devis gratuit.",
    seoKeywords: [
      "volet roulant Île-de-France", "dépannage volet roulant IDF", "réparation volet 92",
      "volet roulant 93", "volet roulant 94", "volet roulant 78",
      "motorisation volet Hauts-de-Seine", "installation volet Val-de-Marne",
      "volet roulant Seine-Saint-Denis", "artisan RGE Île-de-France",
      "Somfy Île-de-France", "Bubendorff banlieue Paris",
      "devis volet roulant banlieue", "rénovation volet copropriété IDF",
    ],
    departments: [
      { name: "Seine-et-Marne", code: "77" }, { name: "Yvelines", code: "78" }, { name: "Essonne", code: "91" },
      { name: "Hauts-de-Seine", code: "92" }, { name: "Seine-Saint-Denis", code: "93" }, { name: "Val-de-Marne", code: "94" }, { name: "Val-d'Oise", code: "95" }
    ],
    mainCities: ["Créteil", "Vitry-sur-Seine", "Saint-Maur-des-Fossés", "Boulogne-Billancourt", "Versailles", "Saint-Denis", "Nanterre", "Argenteuil", "Montreuil", "Aubervilliers", "Cergy", "Évry", "Melun", "Mantes-la-Jolie", "Rambouillet"],
    economicHighlights: ["Pôles d'activités économiques majeurs", "Zones résidentielles denses", "Infrastructures de transport développées"],
    clientTypes: ["Particuliers", "Entreprises", "Commerces", "Administrations", "Syndics de copropriété"],
    gpsCenter: { lat: 48.8499, lng: 2.6370 },
    imageAlt: "Vue aérienne de l'Île-de-France avec habitations résidentielles et volets roulants",
  },
];

export const getRegionBySlug = (slug: string): RegionData | undefined => {
  return regionsData.find(region => region.slug === slug);
};

export const getAllRegionSlugs = (): string[] => {
  return regionsData.map(region => region.slug);
};

export const getRegionCities = (regionSlug: string): string[] => {
  const region = getRegionBySlug(regionSlug);
  return region ? region.mainCities : [];
};
