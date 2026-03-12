import { motion } from "framer-motion";
import { MapPin, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Region {
  name: string;
  depts: string;
  color: string;
  image: string;
  link: string;
  active: boolean;
}

const activeRegions: Region[] = [
  { name: "Paris (75)", depts: "75001 à 75020", color: "bg-service-blue/5 border-service-blue/20", image: "/images/zones/paris.webp", link: "/zones-intervention/paris", active: true },
  { name: "Île-de-France", depts: "77, 78, 91, 92, 93, 94, 95", color: "bg-service-emerald/5 border-service-emerald/20", image: "/images/zones/ile-de-france.webp", link: "/zones-intervention/ile-de-france", active: true },
  { name: "Rive Gauche & Ouest", depts: "75005-07, 75014-15, 92", color: "bg-service-violet/5 border-service-violet/20", image: "/images/zones/rive-gauche.webp", link: "/zones-intervention/paris", active: true },
  { name: "Rive Droite — Centre & Nord", depts: "75001-04, 75008-11, 75016-20", color: "bg-service-orange/5 border-service-orange/20", image: "/images/zones/rive-droite.webp", link: "/zones-intervention/paris", active: true },
  { name: "Petite Couronne", depts: "92, 93, 94", color: "bg-service-rose/5 border-service-rose/20", image: "/images/zones/petite-couronne.webp", link: "/zones-intervention/ile-de-france", active: true },
];

const allFranceRegions: Region[] = [
  { name: "Hauts-de-France", depts: "02, 59, 60, 62, 80", color: "bg-service-cyan/5 border-service-cyan/20", image: "/images/zones/hauts-de-france.webp", link: "/zones-intervention", active: false },
  { name: "Grand Est", depts: "08, 10, 51, 52, 54, 55, 57, 67, 68, 88", color: "bg-service-blue/5 border-service-blue/20", image: "/images/zones/grand-est.webp", link: "/zones-intervention", active: false },
  { name: "Normandie", depts: "14, 27, 50, 61, 76", color: "bg-service-emerald/5 border-service-emerald/20", image: "/images/zones/normandie.webp", link: "/zones-intervention", active: false },
  { name: "Bretagne", depts: "22, 29, 35, 56", color: "bg-service-violet/5 border-service-violet/20", image: "/images/zones/bretagne.webp", link: "/zones-intervention", active: false },
  { name: "Pays de la Loire", depts: "44, 49, 53, 72, 85", color: "bg-service-orange/5 border-service-orange/20", image: "/images/zones/pays-de-la-loire.webp", link: "/zones-intervention", active: false },
  { name: "Centre-Val de Loire", depts: "18, 28, 36, 37, 41, 45", color: "bg-service-rose/5 border-service-rose/20", image: "/images/zones/centre-val-de-loire.webp", link: "/zones-intervention", active: false },
  { name: "Bourgogne-Franche-Comté", depts: "21, 25, 39, 58, 70, 71, 89, 90", color: "bg-service-cyan/5 border-service-cyan/20", image: "/images/zones/bourgogne-franche-comte.webp", link: "/zones-intervention", active: false },
  { name: "Nouvelle-Aquitaine", depts: "16, 17, 19, 23, 24, 33, 40, 47, 64, 79, 86, 87", color: "bg-service-blue/5 border-service-blue/20", image: "/images/zones/nouvelle-aquitaine.webp", link: "/zones-intervention", active: false },
  { name: "Occitanie", depts: "09, 11, 12, 30, 31, 32, 34, 46, 48, 65, 66, 81, 82", color: "bg-service-orange/5 border-service-orange/20", image: "/images/zones/occitanie.webp", link: "/zones-intervention", active: false },
  { name: "Auvergne-Rhône-Alpes", depts: "01, 03, 07, 15, 26, 38, 42, 43, 63, 69, 73, 74", color: "bg-service-emerald/5 border-service-emerald/20", image: "/images/zones/auvergne-rhone-alpes.webp", link: "/zones-intervention", active: false },
  { name: "Provence-Alpes-Côte d'Azur", depts: "04, 05, 06, 13, 83, 84", color: "bg-service-violet/5 border-service-violet/20", image: "/images/zones/paca.webp", link: "/zones-intervention", active: false },
];

const RegionCard = ({ r, i }: { r: Region; i: number }) => {
  const content = (
    <>
      <div className="relative h-40 w-full overflow-hidden rounded-t-2xl shadow-md">
        <img 
          src={r.image} 
          alt={`Réparation volets roulants ${r.name}`} 
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white drop-shadow-lg">
          {r.name}
        </h3>
      </div>
      <div className={`flex-1 p-5 rounded-b-2xl border border-t-0 transition-all duration-500 card-shadow group-hover:card-shadow-hover ${r.color}`}>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          Répar'Action Volets intervient en {r.name} pour la réparation, l'installation et la motorisati...
        </p>
        <div className="text-[10px] text-muted-foreground font-medium mb-4">
          <span className="px-2 py-1 rounded-md bg-black/5">{r.depts.split(",").length} départements</span>
        </div>
        {r.active && (
          <div className="mt-auto flex items-center gap-2 text-xs font-semibold text-accent transition-all duration-300 group-hover:gap-3">
            Voir les détails <ArrowRight className="h-3 w-3" />
          </div>
        )}
      </div>
    </>
  );

  return (
    <motion.div
      key={r.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col"
    >
      {r.active ? (
        <Link to={r.link} className="flex flex-col h-full">{content}</Link>
      ) : (
        <div className="flex flex-col h-full">{content}</div>
      )}
    </motion.div>
  );
};

const ServiceRegionsSection = ({ regionsFirst = false }: { regionsFirst?: boolean }) => {
  const [showMore, setShowMore] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);

  // When regionsFirst is true, show allFranceRegions first, then Paris/IDF
  const primaryRegions = regionsFirst ? allFranceRegions : activeRegions;
  const secondaryRegions = regionsFirst ? activeRegions : allFranceRegions;
  
  // Show only 1 row initially (4 items on lg)
  const firstRowCount = 4;
  const primaryFirstRow = primaryRegions.slice(0, firstRowCount);
  const primaryRest = primaryRegions.slice(firstRowCount);

  return (
    <section className="py-16 bg-section-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">
            <MapPin className="h-3.5 w-3.5" /> Nos Régions d'Intervention
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-4">
            Nos Régions d'Intervention en France
          </h2>
          <p className="text-muted-foreground">
            Nous couvrons prioritairement Paris et toute l'Île-de-France pour des interventions rapides sous 24h-48h.
          </p>
        </motion.div>

        {/* Primary regions - first row always visible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {primaryFirstRow.map((r, i) => (
            <RegionCard key={r.name} r={r} i={i} />
          ))}
        </div>

        {/* Primary regions - remaining rows expandable */}
        {primaryRest.length > 0 && (
          <>
            {showMore ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {primaryRest.map((r, i) => (
                    <RegionCard key={r.name} r={r} i={i} />
                  ))}
                </div>
                <div className="text-center mb-6">
                  <Button onClick={() => setShowMore(false)} variant="outline" size="sm" className="rounded-full border-accent/30 text-accent hover:bg-accent/10">
                    Masquer <ChevronUp className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center mb-6">
                <Button onClick={() => setShowMore(true)} variant="outline" className="rounded-full border-accent/30 text-accent hover:bg-accent/10">
                  Voir plus de régions ({primaryRest.length}) <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* Secondary regions - expandable */}
        {!showSecondary ? (
          <div className="text-center">
            <Button onClick={() => setShowSecondary(true)} variant="outline" className="rounded-full border-accent/30 text-accent hover:bg-accent/10">
              {regionsFirst ? "Voir Paris & Île-de-France" : "Voir toutes les régions de France"} <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {secondaryRegions.map((r, i) => (
                <RegionCard key={r.name} r={r} i={i} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button onClick={() => setShowSecondary(false)} variant="outline" size="sm" className="rounded-full border-accent/30 text-accent hover:bg-accent/10">
                Masquer <ChevronUp className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          className="mt-10 text-center"
        >
          <Link 
            to="/zones-intervention"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
          >
            Voir toutes nos zones d'intervention <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceRegionsSection;
