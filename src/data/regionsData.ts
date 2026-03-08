// Données des zones d'intervention — Paris & Île-de-France uniquement

export interface RegionData {
  name: string;
  slug: string;
  description: string;
  seoDescription: string;
  departments: DepartmentData[];
  mainCities: string[];
  economicHighlights: string[];
  clientTypes: string[];
  gpsCenter?: { lat: number; lng: number };
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
    departments: [{ name: "Paris", code: "75" }],
    mainCities: ["Paris 1er", "Paris 2e", "Paris 3e", "Paris 4e", "Paris 5e", "Paris 6e", "Paris 7e", "Paris 8e", "Paris 9e", "Paris 10e", "Paris 11e", "Paris 12e", "Paris 13e", "Paris 14e", "Paris 15e", "Paris 16e", "Paris 17e", "Paris 18e", "Paris 19e", "Paris 20e"],
    economicHighlights: ["Centre économique et touristique mondial", "Sièges sociaux d'entreprises", "Commerces de luxe", "Patrimoine historique"],
    clientTypes: ["Particuliers", "Entreprises", "Commerces", "Syndics de copropriété", "Hôtels"],
    gpsCenter: { lat: 48.8566, lng: 2.3522 }
  },
  {
    name: "Île-de-France",
    slug: "ile-de-france",
    description: "Répar'Action Volets intervient dans toute l'Île-de-France pour le dépannage, la réparation, l'installation et la motorisation de vos volets roulants. Service rapide et efficace dans les départements 77, 78, 91, 92, 93, 94, 95.",
    seoDescription: "Dépannage et réparation volets roulants Île-de-France, installation et motorisation volets 77, 78, 91, 92, 93, 94, 95. Intervention rapide et devis gratuit.",
    departments: [
      { name: "Seine-et-Marne", code: "77" }, { name: "Yvelines", code: "78" }, { name: "Essonne", code: "91" },
      { name: "Hauts-de-Seine", code: "92" }, { name: "Seine-Saint-Denis", code: "93" }, { name: "Val-de-Marne", code: "94" }, { name: "Val-d'Oise", code: "95" }
    ],
    mainCities: ["Créteil", "Vitry-sur-Seine", "Saint-Maur-des-Fossés", "Boulogne-Billancourt", "Versailles", "Saint-Denis", "Nanterre", "Argenteuil", "Montreuil", "Aubervilliers", "Cergy", "Évry", "Melun", "Mantes-la-Jolie", "Rambouillet"],
    economicHighlights: ["Pôles d'activités économiques majeurs", "Zones résidentielles denses", "Infrastructures de transport développées"],
    clientTypes: ["Particuliers", "Entreprises", "Commerces", "Administrations", "Syndics de copropriété"],
    gpsCenter: { lat: 48.8499, lng: 2.6370 }
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
