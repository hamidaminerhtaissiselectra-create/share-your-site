import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Chaque zone a une image UNIQUE — aucun doublon d'image
const allLocalZones = [
  { name: "Paris 1er — Louvre", slug: "reparation-volet-paris-1", image: "/images/zones/paris-1.webp" },
  { name: "Paris 2ème — Sentier", slug: "reparation-volet-paris-2", image: "/images/zones/paris-2.webp" },
  { name: "Paris 3ème — Marais", slug: "reparation-volet-paris-3", image: "/images/zones/paris-3.webp" },
  { name: "Paris 4ème — Notre-Dame", slug: "reparation-volet-paris-4", image: "/images/zones/paris-4.webp" },
  { name: "Paris 5ème — Quartier Latin", slug: "reparation-volet-paris-5", image: "/images/zones/paris-5.webp" },
  { name: "Paris 6ème — Saint-Germain", slug: "reparation-volet-paris-6", image: "/images/zones/paris-6.webp" },
  { name: "Paris 7ème — Tour Eiffel", slug: "reparation-volet-paris-7", image: "/images/zones/paris-7.webp" },
  { name: "Paris 8ème — Champs-Élysées", slug: "reparation-volet-paris-8", image: "/images/zones/paris-8.webp" },
  { name: "Paris 9ème — Opéra", slug: "reparation-volet-paris-9", image: "/images/zones/paris-9.webp" },
  { name: "Paris 10ème — Gare du Nord", slug: "reparation-volet-paris-10", image: "/images/zones/paris-10.webp" },
  { name: "Paris 11ème — Bastille", slug: "reparation-volet-paris-11", image: "/images/zones/paris-11.webp" },
  { name: "Paris 12ème — Bercy", slug: "reparation-volet-paris-12", image: "/images/zones/paris-12.webp" },
  { name: "Paris 13ème — Bibliothèque", slug: "reparation-volet-paris-13", image: "/images/zones/paris-13.webp" },
  { name: "Paris 14ème — Montparnasse", slug: "reparation-volet-paris-14", image: "/images/zones/paris-14.webp" },
  { name: "Paris 15ème — Convention", slug: "reparation-volet-paris-15", image: "/images/zones/paris-15.webp" },
  { name: "Paris 16ème — Trocadéro", slug: "reparation-volet-paris-16", image: "/images/zones/paris-16.webp" },
  { name: "Paris 17ème — Batignolles", slug: "reparation-volet-paris-17", image: "/images/zones/paris-17.webp" },
  { name: "Paris 18ème — Montmartre", slug: "reparation-volet-paris-18", image: "/images/zones/paris-18.webp" },
  { name: "Paris 19ème — Buttes-Chaumont", slug: "reparation-volet-paris-19", image: "/images/zones/paris-19.webp" },
  { name: "Paris 20ème — Belleville", slug: "reparation-volet-paris-20", image: "/images/zones/paris-20.webp" },
  { name: "Boulogne-Billancourt (92)", slug: "reparation-volet-boulogne-billancourt", image: "/images/zones/boulogne.webp" },
  { name: "Neuilly-sur-Seine (92)", slug: "reparation-volet-neuillysur-seine", image: "/images/zones/neuilly.webp" },
  { name: "Levallois-Perret (92)", slug: "reparation-volet-levallois-perret", image: "/images/zones/levallois-perret.webp" },
  { name: "Courbevoie (92)", slug: "reparation-volet-courbevoie", image: "/images/zones/courbevoie.webp" },
  { name: "La Défense (92)", slug: "reparation-volet-la-defense", image: "/images/zones/la-defense.webp" },
  { name: "Saint-Denis (93)", slug: "reparation-volet-saint-denis", image: "/images/zones/saint-denis.webp" },
  { name: "Montreuil (93)", slug: "reparation-volet-montreuil", image: "/images/zones/montreuil.webp" },
  { name: "Pantin (93)", slug: "reparation-volet-pantin", image: "/images/zones/pantin.webp" },
  { name: "Créteil (94)", slug: "reparation-volet-creteil", image: "/images/zones/creteil.webp" },
  { name: "Vincennes (94)", slug: "reparation-volet-vincennes", image: "/images/zones/vincennes.webp" },
  { name: "Versailles (78)", slug: "reparation-volet-versailles", image: "/images/zones/versailles.webp" },
  { name: "Saint-Germain-en-Laye (78)", slug: "reparation-volet-saint-germainen-laye", image: "/images/zones/saint-germain-en-laye.webp" },
];

// Premières lignes spécifiques par page — chaque page a des arrondissements/villes différents
const firstRowByPage: Record<string, string[]> = {
  "depannage-express": [
    "reparation-volet-paris-1",
    "reparation-volet-paris-11",
    "reparation-volet-boulogne-billancourt",
    "reparation-volet-saint-denis",
  ],
  "reparation-volets": [
    "reparation-volet-paris-5",
    "reparation-volet-paris-15",
    "reparation-volet-neuillysur-seine",
    "reparation-volet-creteil",
  ],
  "installation-remplacement": [
    "reparation-volet-paris-8",
    "reparation-volet-paris-18",
    "reparation-volet-courbevoie",
    "reparation-volet-vincennes",
  ],
  "motorisation-domotique": [
    "reparation-volet-paris-3",
    "reparation-volet-paris-16",
    "reparation-volet-levallois-perret",
    "reparation-volet-montreuil",
  ],
  "vitrerie": [
    "reparation-volet-paris-7",
    "reparation-volet-paris-12",
    "reparation-volet-la-defense",
    "reparation-volet-pantin",
  ],
  "a-propos": [
    "reparation-volet-paris-9",
    "reparation-volet-paris-20",
    "reparation-volet-versailles",
    "reparation-volet-saint-germainen-laye",
  ],
};

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const shuffled = [...arr];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 16807 + 12345) % 2147483647;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface LocalZonesGridProps {
  pageId: string;
  count?: number;
}

const VISIBLE_ROW = 4;

const ZoneCard = ({ zone, index }: { zone: typeof allLocalZones[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="group flex flex-col"
  >
    <Link to={`/zones-intervention/${zone.slug}`} className="flex flex-col h-full">
      <div className="relative h-36 w-full overflow-hidden rounded-t-2xl shadow-md">
        <img
          src={zone.image}
          alt={`Réparation volets roulants ${zone.name}`}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h4 className="absolute bottom-3 left-3 right-3 text-sm font-bold text-white drop-shadow-lg leading-tight">
          {zone.name}
        </h4>
      </div>
      <div className="flex-1 p-3 rounded-b-2xl border border-t-0 border-border bg-card transition-all duration-500 card-shadow group-hover:card-shadow-hover">
        <div className="flex items-center gap-2 text-xs font-semibold text-accent transition-all duration-300 group-hover:gap-3">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          Voir les détails <ArrowRight className="h-3 w-3 ml-auto" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const LocalZonesGrid = ({ pageId, count = 16 }: LocalZonesGridProps) => {
  const [showAll, setShowAll] = useState(false);

  const zones = useMemo(() => {
    // 1. Déterminer la première ligne spécifique à cette page
    const firstRowSlugs = firstRowByPage[pageId] || [];
    const firstRow = firstRowSlugs
      .map(slug => allLocalZones.find(z => z.slug === slug))
      .filter(Boolean) as typeof allLocalZones;

    // 2. Mélanger le reste (sans les zones de la première ligne) 
    const remaining = allLocalZones.filter(z => !firstRowSlugs.includes(z.slug));
    const seed = hashString(pageId);
    const shuffledRemaining = seededShuffle(remaining, seed);

    // 3. Combiner : première ligne fixe + reste mélangé, limité au count
    return [...firstRow, ...shuffledRemaining].slice(0, count);
  }, [pageId, count]);

  const visibleZones = showAll ? zones : zones.slice(0, VISIBLE_ROW);

  return (
    <section className="py-12 bg-section-gradient relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-3">
            <MapPin className="h-3.5 w-3.5" /> Nos Zones d'Intervention
          </span>
          <h3 className="font-display text-2xl font-bold text-foreground">
            Intervention rapide à Paris & en Île-de-France
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {visibleZones.map((zone, i) => (
            <ZoneCard key={zone.slug} zone={zone} index={i} />
          ))}
        </div>

        {!showAll && zones.length > VISIBLE_ROW && (
          <div className="mt-6 text-center">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="rounded-full border-accent/30 text-accent hover:bg-accent/10"
            >
              Voir plus de zones <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}

        {showAll && zones.length > VISIBLE_ROW && (
          <div className="mt-6 text-center">
            <Button
              onClick={() => setShowAll(false)}
              variant="outline"
              size="sm"
              className="rounded-full border-accent/30 text-accent hover:bg-accent/10"
            >
              Masquer <ChevronUp className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/zones-intervention"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all text-sm"
          >
            Voir toutes nos zones d'intervention <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocalZonesGrid;
