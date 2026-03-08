import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

const parisArrondissements = [
  { name: "Paris 1er", slug: "reparation-volet-paris-1", highlight: "Louvre & Palais Royal" },
  { name: "Paris 2ème", slug: "reparation-volet-paris-2", highlight: "Sentier & Bourse" },
  { name: "Paris 3ème", slug: "reparation-volet-paris-3", highlight: "Marais & Haut-Marais" },
  { name: "Paris 4ème", slug: "reparation-volet-paris-4", highlight: "Notre-Dame & Île Saint-Louis" },
  { name: "Paris 5ème", slug: "reparation-volet-paris-5", highlight: "Quartier Latin" },
  { name: "Paris 6ème", slug: "reparation-volet-paris-6", highlight: "Saint-Germain-des-Prés" },
  { name: "Paris 7ème", slug: "reparation-volet-paris-7", highlight: "Tour Eiffel & Invalides" },
  { name: "Paris 8ème", slug: "reparation-volet-paris-8", highlight: "Champs-Élysées" },
  { name: "Paris 9ème", slug: "reparation-volet-paris-9", highlight: "Opéra & Grands Magasins" },
  { name: "Paris 10ème", slug: "reparation-volet-paris-10", highlight: "Gare du Nord & Canal" },
  { name: "Paris 11ème", slug: "reparation-volet-paris-11", highlight: "Bastille & Oberkampf" },
  { name: "Paris 12ème", slug: "reparation-volet-paris-12", highlight: "Bercy & Nation" },
  { name: "Paris 13ème", slug: "reparation-volet-paris-13", highlight: "Bibliothèque & Chinatown" },
  { name: "Paris 14ème", slug: "reparation-volet-paris-14", highlight: "Montparnasse & Denfert" },
  { name: "Paris 15ème", slug: "reparation-volet-paris-15", highlight: "Convention & Vaugirard" },
  { name: "Paris 16ème", slug: "reparation-volet-paris-16", highlight: "Trocadéro & Passy" },
  { name: "Paris 17ème", slug: "reparation-volet-paris-17", highlight: "Batignolles & Ternes" },
  { name: "Paris 18ème", slug: "reparation-volet-paris-18", highlight: "Montmartre & Goutte d'Or" },
  { name: "Paris 19ème", slug: "reparation-volet-paris-19", highlight: "Buttes-Chaumont & Villette" },
  { name: "Paris 20ème", slug: "reparation-volet-paris-20", highlight: "Belleville & Père-Lachaise" },
];

const banlieue = [
  { dept: "Hauts-de-Seine (92)", cities: [
    { name: "Boulogne-Billancourt", slug: "reparation-volet-boulogne-billancourt" },
    { name: "Neuilly-sur-Seine", slug: "reparation-volet-neuillysur-seine" },
    { name: "Levallois-Perret", slug: "reparation-volet-levallois-perret" },
    { name: "Courbevoie", slug: "reparation-volet-courbevoie" },
    { name: "Puteaux", slug: "reparation-volet-puteaux" },
    { name: "La Défense", slug: "reparation-volet-la-defense" },
    { name: "Sèvres", slug: "reparation-volet-sevres" },
    { name: "Saint-Cloud", slug: "reparation-volet-saint-cloud" },
    { name: "Rueil-Malmaison", slug: "reparation-volet-rueil-malmaison" },
  ], color: "bg-service-blue/5 border-service-blue/20" },
  { dept: "Seine-Saint-Denis (93)", cities: [
    { name: "Saint-Denis", slug: "reparation-volet-saint-denis" },
    { name: "Montreuil", slug: "reparation-volet-montreuil" },
    { name: "Bobigny", slug: "reparation-volet-bobigny" },
    { name: "Pantin", slug: "reparation-volet-pantin" },
    { name: "Bagnolet", slug: "reparation-volet-bagnolet" },
    { name: "Noisy-le-Sec", slug: "reparation-volet-noisyle-sec" },
    { name: "Aubervilliers", slug: "reparation-volet-aubervilliers" },
    { name: "Saint-Ouen", slug: "reparation-volet-saint-ouen" },
  ], color: "bg-service-rose/5 border-service-rose/20" },
  { dept: "Val-de-Marne (94)", cities: [
    { name: "Créteil", slug: "reparation-volet-creteil" },
    { name: "Vitry-sur-Seine", slug: "reparation-volet-vitrysur-seine" },
    { name: "Ivry-sur-Seine", slug: "reparation-volet-ivrysur-seine" },
    { name: "Villejuif", slug: "reparation-volet-villejuif" },
    { name: "Fontenay-sous-Bois", slug: "reparation-volet-fontenaysous-bois" },
    { name: "Vincennes", slug: "reparation-volet-vincennes" },
    { name: "Saint-Mandé", slug: "reparation-volet-saint-mande" },
  ], color: "bg-service-emerald/5 border-service-emerald/20" },
  { dept: "Yvelines (78)", cities: [
    { name: "Versailles", slug: "reparation-volet-versailles" },
    { name: "Saint-Germain-en-Laye", slug: "reparation-volet-saint-germainen-laye" },
    { name: "Rambouillet", slug: "reparation-volet-rambouillet" },
    { name: "Mantes-la-Jolie", slug: "reparation-volet-mantesla-jolie" },
  ], color: "bg-service-violet/5 border-service-violet/20" },
  { dept: "Seine-et-Marne (77)", cities: [
    { name: "Melun", slug: "reparation-volet-melun" },
  ], color: "bg-service-cyan/5 border-service-cyan/20" },
  { dept: "Essonne (91)", cities: [
    { name: "Évry-Courcouronnes", slug: "reparation-volet-evry" },
    { name: "Corbeil-Essonnes", slug: "reparation-volet-corbeil-essonnes" },
  ], color: "bg-service-orange/5 border-service-orange/20" },
  { dept: "Val-d'Oise (95)", cities: [
    { name: "Cergy", slug: "reparation-volet-cergy" },
    { name: "Pontoise", slug: "reparation-volet-pontoise" },
  ], color: "bg-service-cyan/5 border-service-cyan/20" },
];

const RegionsSection = () => {
  const [showAllParis, setShowAllParis] = useState(false);
  const [showBanlieue, setShowBanlieue] = useState(false);
  const visibleParis = showAllParis ? parisArrondissements : parisArrondissements.slice(0, 8);

  return (
    <section id="regions" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="serviceBlue" className="gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            <MapPin className="h-3.5 w-3.5" /> Zones d'intervention
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Volets Roulants à Paris & en Île-de-France — Intervention Rapide 48h
          </h2>
          <p className="text-muted-foreground mb-3">
            Répar'Action Volets intervient dans les 20 arrondissements de Paris et dans toutes les communes de la banlieue parisienne.
          </p>
          <p className="text-muted-foreground text-sm">
            Nos techniciens circulent quotidiennement dans les départements 75, 77, 78, 91, 92, 93, 94 et 95. Créneau sous 24 à 48 heures garanti.
          </p>
        </motion.div>

        {/* Paris Arrondissements */}
        <div className="mb-12">
          <motion.h3 {...fadeUp} className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Badge variant="serviceOrange" className="text-xs">PRIORITAIRE</Badge>
            Paris — 20 Arrondissements
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {visibleParis.map((arr, i) => (
                <motion.div
                  key={arr.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <Link
                    to={`/zones-intervention/${arr.slug}`}
                    className="group flex items-start gap-3 rounded-xl p-4 border transition-all card-shadow hover:card-shadow-hover bg-service-orange/5 border-service-orange/20 hover:border-service-orange/40"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm bg-service-orange text-white">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-bold text-foreground group-hover:text-service-orange transition-colors">{arr.name}</span>
                      <div className="text-xs text-muted-foreground mt-0.5">{arr.highlight}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {!showAllParis && (
            <div className="mt-4 text-center">
              <Button onClick={() => setShowAllParis(true)} variant="outline" size="sm" className="rounded-full border-service-orange/30 text-service-orange hover:bg-service-orange/10">
                Voir les 20 arrondissements <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
          {showAllParis && (
            <div className="mt-4 text-center">
              <Button onClick={() => setShowAllParis(false)} variant="outline" size="sm" className="rounded-full border-service-orange/30 text-service-orange hover:bg-service-orange/10">
                Voir moins <ChevronUp className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Banlieue Parisienne */}
        <div>
          <motion.h3 {...fadeUp} className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Badge variant="serviceBlue" className="text-xs">ÎLE-DE-FRANCE</Badge>
            Banlieue Parisienne — Départements 77, 78, 91, 92, 93, 94, 95
          </motion.h3>

          {!showBanlieue ? (
            <div className="text-center">
              <p className="text-muted-foreground mb-4 text-sm">
                Plus de 30 villes desservies dans toute la petite et grande couronne parisienne.
              </p>
              <Button onClick={() => setShowBanlieue(true)} variant="outline" className="rounded-full border-accent/30 text-accent hover:bg-accent/10">
                Voir les villes de banlieue <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-8">
                {banlieue.map((dept) => (
                  <motion.div key={dept.dept} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h4 className="font-display text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">{dept.dept}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {dept.cities.map((city) => (
                        <Link
                          key={city.slug}
                          to={`/zones-intervention/${city.slug}`}
                          className={`group flex items-center gap-3 rounded-xl p-3 border transition-all card-shadow hover:card-shadow-hover ${dept.color}`}
                        >
                          <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-accent shrink-0" />
                          <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{city.name}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button onClick={() => setShowBanlieue(false)} variant="outline" size="sm" className="rounded-full border-accent/30 text-accent hover:bg-accent/10">
                  Masquer <ChevronUp className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>

        <motion.div {...fadeUp} className="mt-12 text-center">
          <Link to="/zones-intervention" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-bold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl">
            Toutes nos zones d'intervention <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RegionsSection;
