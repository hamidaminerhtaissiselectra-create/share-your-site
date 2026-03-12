import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ChevronDown, ChevronUp, Building2, Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CityCard {
  name: string;
  slug: string;
  image: string;
  description: string;
  highlight: string;
}

const parisCities: CityCard[] = [
  { name: "Paris 1er", slug: "paris-1", image: "/images/zones/paris-1.webp", description: "Quartier du Louvre et des Halles — dépannage de volets roulants sur immeubles classés et commerces de prestige.", highlight: "Louvre & Halles" },
  { name: "Paris 2e", slug: "paris-2", image: "/images/zones/paris-2.webp", description: "Passages couverts et Bourse — intervention rapide sur volets anciens et motorisation de stores.", highlight: "Bourse & Passages" },
  { name: "Paris 3e", slug: "paris-3", image: "/images/zones/paris-3.webp", description: "Haut Marais — réparation de volets sur façades historiques et résidences de caractère.", highlight: "Haut Marais" },
  { name: "Paris 4e", slug: "paris-4", image: "/images/zones/paris-4.webp", description: "Île de la Cité et Marais — spécialiste volets roulants en copropriétés haussmanniennes.", highlight: "Île de la Cité" },
  { name: "Paris 5e", slug: "paris-5", image: "/images/zones/paris-5.webp", description: "Quartier Latin et Panthéon — dépannage urgent de volets bloqués pour étudiants et résidents.", highlight: "Quartier Latin" },
  { name: "Paris 6e", slug: "paris-6", image: "/images/zones/paris-6.webp", description: "Saint-Germain-des-Prés — installation et remplacement de volets sur immeubles bourgeois.", highlight: "Saint-Germain" },
  { name: "Paris 7e", slug: "paris-7", image: "/images/zones/paris-7.webp", description: "Tour Eiffel et Invalides — motorisation et réparation de volets dans le quartier diplomatique.", highlight: "Tour Eiffel" },
  { name: "Paris 8e", slug: "paris-8", image: "/images/zones/paris-8.webp", description: "Champs-Élysées et Madeleine — intervention volets roulants pour boutiques et résidences de luxe.", highlight: "Champs-Élysées" },
  { name: "Paris 9e", slug: "paris-9", image: "/images/zones/paris-9.webp", description: "Opéra Garnier et Grands Boulevards — dépannage de volets sur immeubles de spectacle et habitations.", highlight: "Opéra" },
  { name: "Paris 10e", slug: "paris-10", image: "/images/zones/paris-10.webp", description: "Canal Saint-Martin et gares — réparation express de volets pour riverains et locaux commerciaux.", highlight: "Canal St-Martin" },
  { name: "Paris 11e", slug: "paris-11", image: "/images/zones/paris-11.webp", description: "Bastille et Oberkampf — installation de volets sécurisés pour appartements et restaurants.", highlight: "Bastille" },
  { name: "Paris 12e", slug: "paris-12", image: "/images/zones/paris-12.webp", description: "Bercy et Bois de Vincennes — remplacement de volets vieillissants et pose de motorisation Somfy.", highlight: "Bercy Village" },
  { name: "Paris 13e", slug: "paris-13", image: "/images/zones/paris-13.webp", description: "Bibliothèque et Chinatown — dépannage volets dans les résidences modernes et tours d'habitation.", highlight: "BnF & Tolbiac" },
  { name: "Paris 14e", slug: "paris-14", image: "/images/zones/paris-14.webp", description: "Montparnasse et Alésia — réparation de volets anciens et modernisation énergétique.", highlight: "Montparnasse" },
  { name: "Paris 15e", slug: "paris-15", image: "/images/zones/paris-15.webp", description: "Plus grand arrondissement — intervention massive sur copropriétés et pavillons résidentiels.", highlight: "Convention" },
  { name: "Paris 16e", slug: "paris-16", image: "/images/zones/paris-16.webp", description: "Trocadéro et Auteuil — volets roulants haut de gamme et motorisation domotique connectée.", highlight: "Trocadéro" },
  { name: "Paris 17e", slug: "paris-17", image: "/images/zones/paris-17.webp", description: "Batignolles et Ternes — remplacement de sangles cassées et remise en service de tabliers bloqués.", highlight: "Batignolles" },
  { name: "Paris 18e", slug: "paris-18", image: "/images/zones/paris-18.webp", description: "Montmartre et Sacré-Cœur — dépannage de volets sur façades en pente et immeubles atypiques.", highlight: "Montmartre" },
  { name: "Paris 19e", slug: "paris-19", image: "/images/zones/paris-19.webp", description: "Buttes-Chaumont et Villette — installation de volets isolants pour économies d'énergie.", highlight: "Buttes-Chaumont" },
  { name: "Paris 20e", slug: "paris-20", image: "/images/zones/paris-20.webp", description: "Belleville et Ménilmontant — réparation de volets en urgence et pose de modèles anti-effraction.", highlight: "Belleville" },
];

const idfCities: CityCard[] = [
  { name: "Boulogne-Billancourt", slug: "boulogne-billancourt", image: "/images/zones/boulogne.webp", description: "Réparation et motorisation de volets roulants à Boulogne — intervention rapide dans les résidences et bureaux.", highlight: "Hauts-de-Seine (92)" },
  { name: "Neuilly-sur-Seine", slug: "neuillysur-seine", image: "/images/zones/neuilly.webp", description: "Dépannage de volets haut de gamme à Neuilly — spécialiste des copropriétés de standing.", highlight: "Hauts-de-Seine (92)" },
  { name: "Levallois-Perret", slug: "levallois-perret", image: "/images/zones/levallois-perret.webp", description: "Installation et réparation de volets à Levallois — techniciens certifiés pour immeubles récents.", highlight: "Hauts-de-Seine (92)" },
  { name: "Courbevoie", slug: "courbevoie", image: "/images/zones/courbevoie.webp", description: "Dépannage express de volets roulants à Courbevoie — proximité La Défense, intervention sous 48h.", highlight: "Hauts-de-Seine (92)" },
  { name: "Saint-Denis", slug: "saint-denis", image: "/images/zones/saint-denis.webp", description: "Réparation de volets à Saint-Denis — intervention en zone urbaine dense, toutes marques prises en charge.", highlight: "Seine-St-Denis (93)" },
  { name: "Montreuil", slug: "montreuil", image: "/images/zones/montreuil.webp", description: "Dépannage et remplacement de volets à Montreuil — expertise sur anciens et nouveaux bâtiments.", highlight: "Seine-St-Denis (93)" },
  { name: "Créteil", slug: "creteil", image: "/images/zones/creteil.webp", description: "Installation de volets roulants à Créteil — motorisation et domotique pour résidences et commerces.", highlight: "Val-de-Marne (94)" },
  { name: "Versailles", slug: "versailles", image: "/images/zones/versailles.webp", description: "Volets roulants à Versailles — réparation respectueuse du patrimoine architectural royal.", highlight: "Yvelines (78)" },
  { name: "Vincennes", slug: "vincennes", image: "/images/zones/vincennes.webp", description: "Dépannage rapide de volets à Vincennes — quartier résidentiel, intervention garantie sous 24h.", highlight: "Val-de-Marne (94)" },
  { name: "Saint-Germain-en-Laye", slug: "saint-germainen-laye", image: "/images/zones/saint-germain-en-laye.webp", description: "Réparation volets à Saint-Germain-en-Laye — spécialiste maisons individuelles et copropriétés.", highlight: "Yvelines (78)" },
  { name: "Villejuif", slug: "villejuif", image: "/images/zones/villejuif.webp", description: "Installation et motorisation de volets à Villejuif — proximité Grand Paris Express.", highlight: "Val-de-Marne (94)" },
  { name: "Ivry-sur-Seine", slug: "ivrysur-seine", image: "/images/zones/ivry-sur-seine.webp", description: "Dépannage de volets roulants à Ivry — intervention rapide en zone résidentielle et industrielle.", highlight: "Val-de-Marne (94)" },
];

const testimonials = [
  {
    name: "Laurent M.",
    location: "Paris 15e",
    rating: 5,
    text: "Volet roulant bloqué un dimanche matin — le technicien est intervenu dès le lundi à 8h. Diagnostic précis, remplacement du moteur Somfy en moins d'une heure. Tarif annoncé respecté, aucune mauvaise surprise. Je recommande vivement Répar'Action Volets pour le sérieux et la ponctualité.",
    service: "Remplacement moteur Somfy",
  },
  {
    name: "Fatima B.",
    location: "Boulogne-Billancourt (92)",
    rating: 5,
    text: "Nous avions 6 volets roulants à motoriser dans notre copropriété. L'équipe a proposé une solution domotique centralisée avec pilotage smartphone. Travaux propres, réalisés en deux jours. Les économies d'énergie sont déjà visibles sur notre facture de chauffage cet hiver.",
    service: "Motorisation 6 volets + domotique",
  },
  {
    name: "Jean-Pierre D.",
    location: "Versailles (78)",
    rating: 5,
    text: "Sangle cassée sur un volet ancien dans une maison classée. Le technicien a su adapter la réparation sans endommager le coffre d'origine ni la façade. Un vrai professionnel qui connaît les contraintes du bâti patrimonial. Intervention rapide et devis gratuit tenu au centime près.",
    service: "Réparation sangle volet ancien",
  },
];

const FIRST_ROW = 4;

const CityCardComponent = ({ city, index }: { city: CityCard; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.6, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
    className="group flex flex-col"
  >
    <Link
      to={`/zones-intervention/reparation-volet-${city.slug}`}
      className="flex flex-col h-full"
    >
      <div className="relative h-40 w-full overflow-hidden rounded-t-2xl shadow-md">
        <img
          src={city.image}
          alt={`Réparation volets roulants ${city.name}`}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white drop-shadow-lg">
          {city.name}
        </h3>
      </div>
      <div className="flex-1 p-5 rounded-b-2xl border border-t-0 bg-card transition-all duration-500 card-shadow group-hover:card-shadow-hover">
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {city.description}
        </p>
        <div className="text-[10px] text-muted-foreground font-medium mb-4">
          <span className="px-2 py-1 rounded-md bg-accent/5 border border-accent/10">{city.highlight}</span>
        </div>
        <div className="mt-auto flex items-center gap-2 text-xs font-semibold text-accent transition-all duration-300 group-hover:gap-3">
          Voir les détails <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const IdfCitiesSection = () => {
  const [showMoreParis, setShowMoreParis] = useState(false);
  const [showMoreIdf, setShowMoreIdf] = useState(false);

  const parisFirstRow = parisCities.slice(0, FIRST_ROW);
  const parisRest = parisCities.slice(FIRST_ROW);
  const idfFirstRow = idfCities.slice(0, FIRST_ROW);
  const idfRest = idfCities.slice(FIRST_ROW);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <Badge variant="default" className="gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-accent/10 text-accent border border-accent/20">
            <MapPin className="h-3.5 w-3.5" /> Villes desservies
          </Badge>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Nos Villes d'Intervention en Île-de-France
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Répar'Action Volets assure le dépannage, la réparation et l'installation de volets roulants dans les 20 arrondissements de Paris et plus de 30 communes d'Île-de-France. Chaque technicien connaît les spécificités locales du bâti pour une intervention adaptée et rapide.
          </p>
        </motion.div>

        {/* ──── Arrondissements de Paris ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-service-orange flex items-center justify-center shadow-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">Arrondissements de Paris</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Du 1er au 20e, nos techniciens interviennent dans tous les arrondissements parisiens. Immeubles haussmanniens, résidences modernes ou commerces : chaque intervention est adaptée aux contraintes architecturales locales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {parisFirstRow.map((city, i) => (
            <CityCardComponent key={city.slug} city={city} index={i} />
          ))}
        </div>
        {parisRest.length > 0 && (
          showMoreParis ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {parisRest.map((city, i) => (
                  <CityCardComponent key={city.slug} city={city} index={i} />
                ))}
              </div>
              <div className="text-center mb-12">
                <Button onClick={() => setShowMoreParis(false)} variant="outline" size="sm" className="rounded-full border-accent/30 text-accent hover:bg-accent/10">
                  Masquer <ChevronUp className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center mb-12">
              <Button onClick={() => setShowMoreParis(true)} variant="outline" className="rounded-full border-accent/30 text-accent hover:bg-accent/10">
                Voir les {parisRest.length} autres arrondissements <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )
        )}

        {/* ──── Villes d'Île-de-France ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 mt-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-service-blue flex items-center justify-center shadow-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">Villes d'Île-de-France</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            De Versailles à Créteil, en passant par Boulogne-Billancourt et Saint-Denis, nos équipes couvrent les départements 77, 78, 91, 92, 93, 94 et 95. Intervention garantie sous 48 heures avec devis gratuit sur place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {idfFirstRow.map((city, i) => (
            <CityCardComponent key={city.slug} city={city} index={i} />
          ))}
        </div>
        {idfRest.length > 0 && (
          showMoreIdf ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {idfRest.map((city, i) => (
                  <CityCardComponent key={city.slug} city={city} index={i} />
                ))}
              </div>
              <div className="text-center mb-8">
                <Button onClick={() => setShowMoreIdf(false)} variant="outline" size="sm" className="rounded-full border-accent/30 text-accent hover:bg-accent/10">
                  Masquer <ChevronUp className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center mb-8">
              <Button onClick={() => setShowMoreIdf(true)} variant="outline" className="rounded-full border-accent/30 text-accent hover:bg-accent/10">
                Voir les {idfRest.length} autres villes <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )
        )}

        {/* ──── Témoignages clients ──── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <Badge variant="default" className="gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-service-emerald/10 text-service-emerald border border-service-emerald/20">
              <Star className="h-3.5 w-3.5" /> Avis Clients Vérifiés
            </Badge>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">
              Ce Que Disent Nos Clients en Île-de-France
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Des interventions réelles, des avis authentiques. Découvrez pourquoi nos clients nous recommandent à leurs proches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 card-shadow hover:card-shadow-hover transition-all duration-300 flex flex-col"
              >
                <Quote className="h-8 w-8 text-accent/20 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 italic">
                  "{t.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-service-orange text-service-orange" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location}</p>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-accent/10 text-accent font-semibold border border-accent/15">
                      {t.service}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IdfCitiesSection;
