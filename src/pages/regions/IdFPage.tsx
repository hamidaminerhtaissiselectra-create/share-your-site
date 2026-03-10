import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumbs from "@/components/SEO/Breadcrumbs";
import AnimatedSection from "@/components/AnimatedSection";
import { useRef, useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  Phone, 
  Clock, 
  Award,
  Wrench,
  Settings,
  Zap,
  Building2,
  Users,
  Shield,
  HelpCircle,
  Home,
  ShieldCheck,
  Truck,
  Navigation,
  Star
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useEmblaCarousel from "embla-carousel-react";
const ileDeFranceImg = "/images/assets/regions/ile-de-france.webp";
import { usePhoneCall } from "@/hooks/usePhoneCall";

interface VilleCard {
  name: string;
  slug: string;
  image: string;
  description: string;
  highlight: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
  voiceSearch?: string;
}

interface Departement {
  name: string;
  code: string;
  iconBg: string;
  badgeVariant: "serviceOrange" | "serviceBlue" | "serviceEmerald" | "serviceViolet" | "serviceCyan";
  subtitle: string;
  villes: VilleCard[];
}

const departements: Departement[] = [
  {
    name: "Hauts-de-Seine (92)",
    code: "92",
    iconBg: "bg-service-orange",
    badgeVariant: "serviceOrange",
    subtitle: "Boulogne-Billancourt, Neuilly, La Défense, Courbevoie... Intervention rapide sur volets roulants résidentiels et bureaux.",
    villes: [
      { name: "Boulogne-Billancourt", slug: "reparation-volet-boulogne-billancourt", image: "/images/zones/boulogne.webp", zipCode: "92100", lat: 48.8352, lng: 2.2409, description: "Réparation et motorisation de volets roulants — résidences et bureaux.", highlight: "92 — Secteur Prioritaire", voiceSearch: "Réparateur volet roulant à Boulogne-Billancourt ?" },
      { name: "Neuilly-sur-Seine", slug: "reparation-volet-neuillysur-seine", image: "/images/zones/neuilly.webp", zipCode: "92200", lat: 48.8885, lng: 2.2692, description: "Dépannage de volets haut de gamme — copropriétés de standing.", highlight: "92 — Prestige", voiceSearch: "Dépannage volet roulant haut de gamme à Neuilly-sur-Seine ?" },
      { name: "Levallois-Perret", slug: "reparation-volet-levallois-perret", image: "/images/zones/levallois-perret.webp", zipCode: "92300", lat: 48.8946, lng: 2.2874, description: "Installation et réparation de volets — immeubles récents certifiés.", highlight: "92 — Dynamique", voiceSearch: "Installer un volet roulant neuf à Levallois-Perret ?" },
      { name: "Courbevoie", slug: "reparation-volet-courbevoie", image: "/images/zones/courbevoie.webp", zipCode: "92400", lat: 48.8973, lng: 2.2522, description: "Dépannage express — proximité La Défense, intervention sous 48h.", highlight: "92 — La Défense", voiceSearch: "Dépannage volet roulant urgence Courbevoie La Défense ?" },
      { name: "Puteaux", slug: "reparation-volet-puteaux", image: "/images/zones/puteaux.webp", zipCode: "92800", lat: 48.8850, lng: 2.2389, description: "Volets roulants résidentiels et tertiaires — moteurs Somfy et Simu.", highlight: "92 — Tertiaire", voiceSearch: "Motorisation volet roulant Somfy à Puteaux ?" },
      { name: "Sèvres", slug: "reparation-volet-sevres", image: "/images/zones/sevres.webp", zipCode: "92310", lat: 48.8239, lng: 2.2114, description: "Réparation de volets dans le secteur résidentiel — diagnostic gratuit.", highlight: "92 — Résidentiel", voiceSearch: "Réparation volet roulant résidentiel à Sèvres ?" },
      { name: "Saint-Cloud", slug: "reparation-volet-saint-cloud", image: "/images/zones/saint-cloud.webp", zipCode: "92210", lat: 48.8437, lng: 2.2195, description: "Intervention sur volets de maisons et copropriétés — garantie 3 ans.", highlight: "92 — Patrimoine", voiceSearch: "Réparateur volet roulant garanti à Saint-Cloud ?" },
      { name: "Rueil-Malmaison", slug: "reparation-volet-rueil-malmaison", image: "/images/zones/rueil-malmaison.webp", zipCode: "92500", lat: 48.8763, lng: 2.1809, description: "Motorisation et domotique — pilotage smartphone pour vos volets.", highlight: "92 — Connecté", voiceSearch: "Domotique volet roulant connecté smartphone à Rueil-Malmaison ?" },
    ]
  },
  {
    name: "Seine-Saint-Denis (93)",
    code: "93",
    iconBg: "bg-service-blue",
    badgeVariant: "serviceBlue",
    subtitle: "De Saint-Denis à Montreuil — réparations de volets roulants, motorisation et dépannage express.",
    villes: [
      { name: "Saint-Denis", slug: "reparation-volet-saint-denis", image: "/images/zones/saint-denis.webp", zipCode: "93200", lat: 48.9362, lng: 2.3574, description: "Réparation de volets en zone urbaine dense — toutes marques.", highlight: "93 — Forte Demande", voiceSearch: "Réparation volet roulant toutes marques à Saint-Denis ?" },
      { name: "Montreuil", slug: "reparation-volet-montreuil", image: "/images/zones/montreuil.webp", zipCode: "93100", lat: 48.8638, lng: 2.4484, description: "Dépannage et remplacement — anciens et nouveaux bâtiments.", highlight: "93 — Mixte", voiceSearch: "Dépannage volet roulant rapide à Montreuil ?" },
      { name: "Bobigny", slug: "reparation-volet-bobigny", image: "/images/zones/bobigny.webp", zipCode: "93000", lat: 48.9086, lng: 2.4397, description: "Installation de volets isolants — économies d'énergie garanties.", highlight: "93 — Préfecture", voiceSearch: "Installation volet roulant isolant à Bobigny ?" },
      { name: "Pantin", slug: "reparation-volet-pantin", image: "/images/zones/pantin.webp", zipCode: "93500", lat: 48.8924, lng: 2.4073, description: "Motorisation de volets manuels — quartier en pleine rénovation.", highlight: "93 — Renouveau", voiceSearch: "Motoriser volet roulant manuel à Pantin ?" },
      { name: "Bagnolet", slug: "reparation-volet-bagnolet", image: "/images/zones/bagnolet.webp", zipCode: "93170", lat: 48.8692, lng: 2.4181, description: "Dépannage rapide de volets bloqués — intervention sous 48h.", highlight: "93 — Express", voiceSearch: "Volet roulant bloqué à Bagnolet urgence ?" },
      { name: "Aubervilliers", slug: "reparation-volet-aubervilliers", image: "/images/zones/aubervilliers.webp", zipCode: "93300", lat: 48.9131, lng: 2.3832, description: "Réparation et sécurisation de volets — résidences et commerces.", highlight: "93 — Sécurité", voiceSearch: "Volet roulant sécurisé anti-effraction à Aubervilliers ?" },
      { name: "Saint-Ouen", slug: "reparation-volet-saint-ouen", image: "/images/zones/saint-ouen.webp", zipCode: "93400", lat: 48.9119, lng: 2.3343, description: "Volets roulants pour copropriétés — devis adaptés syndics.", highlight: "93 — Copropriétés", voiceSearch: "Devis volet roulant copropriété à Saint-Ouen ?" },
    ]
  },
  {
    name: "Val-de-Marne (94)",
    code: "94",
    iconBg: "bg-service-emerald",
    badgeVariant: "serviceEmerald",
    subtitle: "Créteil, Vincennes, Vitry-sur-Seine... Zones résidentielles avec forte demande de services volets roulants.",
    villes: [
      { name: "Créteil", slug: "reparation-volet-creteil", image: "/images/zones/creteil.webp", zipCode: "94000", lat: 48.7771, lng: 2.4531, description: "Installation de volets roulants — motorisation et domotique.", highlight: "94 — Préfecture", voiceSearch: "Installation volet roulant motorisé à Créteil ?" },
      { name: "Vitry-sur-Seine", slug: "reparation-volet-vitrysur-seine", image: "/images/zones/vitry-sur-seine.webp", zipCode: "94400", lat: 48.7875, lng: 2.3920, description: "Dépannage de volets — quartiers résidentiels et ensembles neufs.", highlight: "94 — Résidentiel", voiceSearch: "Dépannage volet roulant résidentiel Vitry-sur-Seine ?" },
      { name: "Ivry-sur-Seine", slug: "reparation-volet-ivrysur-seine", image: "/images/zones/ivry-sur-seine.webp", zipCode: "94200", lat: 48.8158, lng: 2.3876, description: "Réparation rapide — zone résidentielle et industrielle.", highlight: "94 — Mixte", voiceSearch: "Réparation volet roulant rapide à Ivry-sur-Seine ?" },
      { name: "Villejuif", slug: "reparation-volet-villejuif", image: "/images/zones/villejuif.webp", zipCode: "94800", lat: 48.7920, lng: 2.3639, description: "Installation et motorisation — proximité Grand Paris Express.", highlight: "94 — Grand Paris", voiceSearch: "Installation volet roulant près du Grand Paris Express Villejuif ?" },
      { name: "Vincennes", slug: "reparation-volet-vincennes", image: "/images/zones/vincennes.webp", zipCode: "94300", lat: 48.8477, lng: 2.4397, description: "Dépannage rapide — quartier résidentiel, intervention sous 24h.", highlight: "94 — Express", voiceSearch: "Dépannage volet roulant urgent 24h à Vincennes ?" },
      { name: "Saint-Mandé", slug: "reparation-volet-saint-mande", image: "/images/zones/saint-mande.webp", zipCode: "94160", lat: 48.8412, lng: 2.4186, description: "Volets haut de gamme — copropriétés et maisons de ville.", highlight: "94 — Standing", voiceSearch: "Volet roulant haut de gamme maison de ville Saint-Mandé ?" },
      { name: "Fontenay-sous-Bois", slug: "reparation-volet-fontenaysous-bois", image: "/images/zones/fontenay-sous-bois.webp", zipCode: "94120", lat: 48.8514, lng: 2.4770, description: "Remplacement et réparation — toutes marques de moteurs.", highlight: "94 — Toutes marques", voiceSearch: "Réparation moteur volet roulant toutes marques Fontenay-sous-Bois ?" },
    ]
  },
  {
    name: "Yvelines (78)",
    code: "78",
    iconBg: "bg-service-violet",
    badgeVariant: "serviceViolet",
    subtitle: "De Versailles à Saint-Germain-en-Laye — patrimoine historique et résidences modernes.",
    villes: [
      { name: "Versailles", slug: "reparation-volet-versailles", image: "/images/zones/versailles.webp", zipCode: "78000", lat: 48.8014, lng: 2.1301, description: "Réparation respectueuse du patrimoine architectural royal.", highlight: "78 — Patrimoine", voiceSearch: "Réparation volet roulant patrimoine à Versailles ?" },
      { name: "Saint-Germain-en-Laye", slug: "reparation-volet-saint-germainen-laye", image: "/images/zones/saint-germain-en-laye.webp", zipCode: "78100", lat: 48.8989, lng: 2.0938, description: "Spécialiste maisons individuelles et copropriétés.", highlight: "78 — Résidentiel", voiceSearch: "Volet roulant maison individuelle Saint-Germain-en-Laye ?" },
      { name: "Rambouillet", slug: "reparation-volet-rambouillet", image: "/images/zones/rambouillet.webp", zipCode: "78120", lat: 48.6444, lng: 1.8319, description: "Intervention en zone semi-rurale — motorisation et isolation.", highlight: "78 — Nature", voiceSearch: "Motorisation volet roulant maison campagne Rambouillet ?" },
      { name: "Mantes-la-Jolie", slug: "reparation-volet-mantesla-jolie", image: "/images/zones/mantes-la-jolie.webp", zipCode: "78200", lat: 48.9907, lng: 1.7159, description: "Dépannage et installation — résidences et logements sociaux.", highlight: "78 — Accessible", voiceSearch: "Dépannage volet roulant pas cher Mantes-la-Jolie ?" },
    ]
  },
  {
    name: "Essonne, Seine-et-Marne & Val-d'Oise",
    code: "91 · 77 · 95",
    iconBg: "bg-service-cyan",
    badgeVariant: "serviceCyan",
    subtitle: "Grande couronne — Évry, Melun, Cergy, Pontoise. Couverture complète avec techniciens locaux.",
    villes: [
      { name: "Évry", slug: "reparation-volet-evry", image: "/images/zones/evry.webp", zipCode: "91000", lat: 48.6298, lng: 2.4418, description: "Dépannage et réparation — préfecture de l'Essonne.", highlight: "91 — Préfecture", voiceSearch: "Dépannage volet roulant à Évry préfecture Essonne ?" },
      { name: "Corbeil-Essonnes", slug: "reparation-volet-corbeil-essonnes", image: "/images/zones/corbeil-essonnes.webp", zipCode: "91100", lat: 48.6138, lng: 2.4840, description: "Intervention rapide — résidences et pavillons.", highlight: "91 — Résidentiel", voiceSearch: "Intervention rapide volet roulant Corbeil-Essonnes ?" },
      { name: "Melun", slug: "reparation-volet-melun", image: "/images/zones/melun.webp", zipCode: "77000", lat: 48.5405, lng: 2.6559, description: "Réparation de volets — Seine-et-Marne, diagnostic gratuit.", highlight: "77 — Préfecture", voiceSearch: "Réparation volet roulant diagnostic gratuit à Melun ?" },
      { name: "Cergy", slug: "reparation-volet-cergy", image: "/images/zones/cergy.webp", zipCode: "95000", lat: 49.0362, lng: 2.0771, description: "Installation et motorisation — ville nouvelle dynamique.", highlight: "95 — Cergy-Pontoise", voiceSearch: "Installation volet roulant motorisé à Cergy ?" },
      { name: "Pontoise", slug: "reparation-volet-pontoise", image: "/images/zones/pontoise.webp", zipCode: "95000", lat: 49.0516, lng: 2.1010, description: "Dépannage et remplacement — centre historique et quartiers neufs.", highlight: "95 — Patrimoine", voiceSearch: "Dépannage volet roulant centre ville Pontoise ?" },
    ]
  },
];

const CitySlide = ({ city }: { city: VilleCard }) => (
  <div className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/4 pl-4">
    <Link to={`/zones-intervention/${city.slug}`} className="group flex flex-col h-full">
      <div className="relative h-40 w-full overflow-hidden rounded-t-2xl shadow-md">
        <img
          src={city.image}
          alt={`Réparation volets roulants ${city.name}`}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* GPS + ZIP badges */}
        <div className="absolute top-3 right-3 flex gap-1">
          <div className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium rounded-full flex items-center gap-1">
            <Navigation className="h-2.5 w-2.5" />
            GPS
          </div>
          {city.zipCode && (
            <div className="px-2 py-1 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
              {city.zipCode}
            </div>
          )}
        </div>
        
        <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white drop-shadow-lg">
          {city.name}
        </h3>
      </div>
      <div className="flex-1 p-5 rounded-b-2xl border border-t-0 bg-card transition-all duration-500 card-shadow group-hover:card-shadow-hover">
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {city.description}
        </p>
        
        {/* GPS Coordinates */}
        {city.lat && city.lng && (
          <div className="text-[9px] text-muted-foreground/70 font-mono mb-2 flex items-center gap-1">
            <MapPin className="h-2.5 w-2.5" />
            {city.lat.toFixed(4)}°N, {city.lng.toFixed(4)}°E
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] text-muted-foreground font-medium">
            <span className="px-2 py-1 rounded-md bg-accent/5 border border-accent/10">{city.highlight}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-semibold text-muted-foreground">4.9</span>
          </div>
        </div>
        
        <div className="mt-auto flex items-center gap-2 text-xs font-semibold text-accent transition-all duration-300 group-hover:gap-3">
          Voir les détails <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  </div>
);

const DeptCarousel = ({ dept }: { dept: Departement }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start", 
    loop: true,
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollSnaps = emblaApi?.scrollSnapList() || [];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl ${dept.iconBg} flex items-center justify-center shadow-lg`}>
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">{dept.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">{dept.subtitle}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-accent/30 text-accent hover:bg-accent/10"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-accent/30 text-accent hover:bg-accent/10"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-4">
          {dept.villes.map((ville) => (
            <CitySlide key={ville.slug} city={ville} />
          ))}
        </div>
      </div>

      {/* Dots */}
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-6">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === selectedIndex ? "w-6 bg-accent" : "w-2 bg-accent/20"
              }`}
              onClick={() => emblaApi?.scrollTo(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const IdFPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const { phoneNumber } = usePhoneCall();

  useSEO({
    title: "Dépannage & Réparation Volets Île-de-France | 7 Départements | Répar'Action",
    description: "Expert en dépannage et réparation de volets roulants en Île-de-France. Intervention rapide dans les départements 77, 78, 91, 92, 93, 94, 95. Dépannage express et installation.",
    keywords: "réparation volets Île-de-France, volets roulants IdF, dépannage volets 77 78 91 92 93 94 95, installation volets",
    canonicalUrl: "https://reparaction-volets.fr/zones-intervention/ile-de-france",
  });

  const breadcrumbItems = [
    { name: "Zones d'intervention", url: "/zones-intervention" },
    { name: "Île-de-France", url: "/zones-intervention/ile-de-france" },
  ];

  const stats = [
    { icon: MapPin, value: "7", label: "Départements", color: "text-service-blue" },
    { icon: Building2, value: "50+", label: "Villes desservies", color: "text-service-violet" },
    { icon: Users, value: "3000+", label: "Clients satisfaits", color: "text-service-emerald" },
    { icon: Clock, value: "48-72h", label: "Délai d'intervention", color: "text-service-orange" }
  ];

  const services = [
    { icon: Wrench, title: "Réparation & Dépannage", description: "Intervention rapide sur volets bloqués ou cassés en Île-de-France. Diagnostic gratuit et réparation immédiate.", link: "/services/reparation-volets-roulants" },
    { icon: Settings, title: "Installation & Remplacement", description: "Pose de volets roulants neufs sur-mesure en IdF. Solutions aluminium ou PVC haute qualité.", link: "/services/installation-remplacement-volets" },
    { icon: Zap, title: "Motorisation", description: "Modernisez vos volets manuels en Île-de-France. Installation de moteurs Somfy, Bubendorff et solutions connectées.", link: "/services/motorisation-domotique" },
    { icon: Home, title: "Domotique", description: "Centralisez le contrôle de vos volets en IdF. Pilotage à distance via smartphone et scénarios intelligents.", link: "/services/motorisation-domotique" },
    { icon: ShieldCheck, title: "Sécurité Renforcée", description: "Installation de verrous de sécurité et volets anti-effraction en Île-de-France pour protéger votre habitat.", link: "/services/installation-remplacement-volets" },
    { icon: Truck, title: "Dépannage Express", description: "Service d'urgence disponible en IdF pour les pannes critiques. Intervention sous 48h garantie.", link: "/services/depannage-express" }
  ];

  const faqs = [
    { question: "Quel est le délai d'intervention en banlieue parisienne ?", answer: "En petite couronne (92, 93, 94), nous intervenons sous 24 à 48h. En grande couronne (77, 78, 91, 95), comptez 48 à 72h. Pour les urgences de sécurité (volet bloqué ouvert, effraction), nous traitons la demande en priorité quel que soit le département." },
    { question: "Y a-t-il des frais de déplacement en Île-de-France ?", answer: "Aucun frais de déplacement en petite couronne (92, 93, 94). En grande couronne, un forfait déplacement de 20 à 30€ s'applique selon la distance. Ce forfait est offert si vous acceptez le devis. Diagnostic toujours gratuit." },
    { question: "Couvrez-vous tous les départements de l'Île-de-France ?", answer: "Oui, nous couvrons les 7 départements : Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94) et Val-d'Oise (95). Plus de 50 villes desservies." },
    { question: "Intervenez-vous en résidence et en copropriété ?", answer: "Oui, nous intervenons aussi bien chez les particuliers que dans les copropriétés et les résidences. Nous pouvons fournir des devis conformes aux exigences des syndics et des bailleurs sociaux." },
    { question: "Quelles marques de volets roulants réparez-vous en IdF ?", answer: "Nos techniciens sont experts sur toutes les marques : Somfy, Bubendorff, Profalux, Franciaflex, Simu, Nice, Becker, Came, Zurflüh-Feller. Nous disposons de pièces de rechange dans nos véhicules pour les réparations au premier passage." },
    { question: "Proposez-vous des contrats de maintenance pour les copropriétés ?", answer: "Oui, nous proposons des contrats de maintenance préventive pour les copropriétés et les gestionnaires immobiliers. Entretien annuel de tous les volets, vérification des moteurs, lubrification des coulisses. Tarifs dégressifs selon le nombre de volets." },
    // Voice search optimized FAQs
    { question: "Où trouver un réparateur de volets roulants en Île-de-France ?", answer: "Répar'Action Volets couvre toute l'Île-de-France avec plus de 50 villes desservies. Nos techniciens locaux interviennent dans les Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Yvelines (78), Essonne (91), Seine-et-Marne (77) et Val-d'Oise (95)." },
    { question: "Comment motoriser un volet roulant manuel en banlieue parisienne ?", answer: "Nos techniciens motorisent vos volets manuels en 1 à 2h par volet, sans travaux de maçonnerie. Moteurs Somfy, Simu ou Bubendorff. Compatible smartphone via TaHoma, Google Home et Alexa. Devis gratuit en Île-de-France." },
    { question: "Mon volet roulant fait du bruit en Île-de-France, que faire ?", answer: "Un volet bruyant nécessite souvent une lubrification des coulisses, un recalibrage du tablier ou un changement de lames abîmées. Nos techniciens diagnostiquent gratuitement la cause et interviennent rapidement dans toute l'Île-de-France." }
  ];

  // JSON-LD structured data
  const allVilles = departements.flatMap(d => d.villes);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://reparaction-volets.fr/zones-intervention/ile-de-france#business",
        "name": "Répar'Action Volets Île-de-France",
        "description": "Expert en dépannage et réparation de volets roulants en Île-de-France. 7 départements couverts, plus de 50 villes.",
        "url": "https://reparaction-volets.fr/zones-intervention/ile-de-france",
        "telephone": phoneNumber.replace(/\s/g, ''),
        "priceRange": "€€",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "FR",
          "addressRegion": "Île-de-France"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 48.8566,
          "longitude": 2.3522
        },
        "areaServed": allVilles.map(v => ({
          "@type": "City",
          "name": v.name,
          "geo": v.lat && v.lng ? {
            "@type": "GeoCoordinates",
            "latitude": v.lat,
            "longitude": v.lng
          } : undefined
        })),
        "serviceType": ["Réparation volets roulants", "Installation volets", "Motorisation volets", "Dépannage express"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "ratingCount": "389"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://reparaction-volets.fr/zones-intervention/ile-de-france#faq",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[600px] flex items-center overflow-hidden pt-20">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src={ileDeFranceImg} alt="Volets roulants Île-de-France" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
        </motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl mt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-8 backdrop-blur-sm">
                <MapPin className="h-4 w-4" />
                7 Départements — Couverture Complète
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 text-foreground">
              Dépannage & Réparation de Volets en <span className="text-accent">Île-de-France</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Répar'Action Volets assure le dépannage et la réparation de volets roulants dans toute la région parisienne. Nos techniciens couvrent les 7 départements (77, 78, 91, 92, 93, 94, 95). Diagnostic gratuit et garantie 3 ans.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" variant="accent" asChild className="px-8 py-7 text-lg font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-105">
                <a href="/#devis" className="flex items-center gap-2">Demander un Devis Gratuit <ArrowRight className="h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="accent-outline" asChild className="px-8 py-7 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105">
                <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="flex items-center gap-2"><Phone className="h-5 w-5" /> {phoneNumber}</a>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="flex flex-wrap gap-4">
              {[
                { icon: Clock, label: "48-72h", variant: "serviceBlue" as const },
                { icon: Award, label: "Certifié RGE", variant: "serviceOrange" as const },
                { icon: Shield, label: "Garantie 3 ans", variant: "serviceEmerald" as const },
              ].map((b, i) => (
                <motion.div key={b.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }} className="flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-bold backdrop-blur-sm">
                  <Badge variant={b.variant}><b.icon className="h-5 w-5" /><span>{b.label}</span></Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Départements Carousels */}
      <section className="py-20 bg-section-gradient">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-14">
              <Badge variant="default" className="gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-accent/10 text-accent border border-accent/20">
                <MapPin className="h-3.5 w-3.5" /> Départements Couverts
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">Les Départements d'Île-de-France</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Cliquez sur votre ville pour accéder à la page dédiée et découvrir nos services spécifiques.</p>
            </div>
          </AnimatedSection>

          {departements.map((dept) => (
            <DeptCarousel key={dept.code} dept={dept} />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <Badge variant="default" className="gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-service-violet/10 text-service-violet border border-service-violet/20">
                <Wrench className="h-3.5 w-3.5" /> Nos Services
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">Nos Services en Île-de-France</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Répar'Action Volets propose une gamme complète de solutions pour vos volets roulants dans toute la région parisienne.</p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={index} animation="scale-in" delay={index * 100}>
                <Card className="hover:shadow-md transition-shadow h-full border-border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                    <Link to={service.link} className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1">
                      En savoir plus <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
              <Badge variant="default" className="gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-accent/10 text-accent border border-accent/20">
                <HelpCircle className="h-3.5 w-3.5" /> Questions Fréquentes
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Vos Questions sur l'Île-de-France</h2>
              <p className="text-muted-foreground">Tout ce qu'il faut savoir sur nos services dans les 7 départements.</p>
            </motion.div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Besoin d'un dépannage en Île-de-France ?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">Contactez nos experts pour un dépannage rapide, un diagnostic gratuit et une intervention sur vos volets roulants.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-10" asChild>
              <a href="/#devis">Demander un devis gratuit</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-10" asChild>
              <a href={`tel:${phoneNumber.replace(/\s/g, '')}`}>Appeler le {phoneNumber}</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IdFPage;
