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
  Truck
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useEmblaCarousel from "embla-carousel-react";
import ileDeFranceImg from "@/assets/regions/ile-de-france.webp";
import { usePhoneCall } from "@/hooks/usePhoneCall";

interface VilleCard {
  name: string;
  slug: string;
  image: string;
  description: string;
  highlight: string;
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
      { name: "Boulogne-Billancourt", slug: "reparation-volet-boulogne-billancourt", image: "/images/zones/boulogne.webp", description: "Réparation et motorisation de volets roulants — résidences et bureaux.", highlight: "92 — Secteur Prioritaire" },
      { name: "Neuilly-sur-Seine", slug: "reparation-volet-neuillysur-seine", image: "/images/zones/neuilly.webp", description: "Dépannage de volets haut de gamme — copropriétés de standing.", highlight: "92 — Prestige" },
      { name: "Levallois-Perret", slug: "reparation-volet-levallois-perret", image: "/images/zones/levallois-perret.webp", description: "Installation et réparation de volets — immeubles récents certifiés.", highlight: "92 — Dynamique" },
      { name: "Courbevoie", slug: "reparation-volet-courbevoie", image: "/images/zones/courbevoie.webp", description: "Dépannage express — proximité La Défense, intervention sous 48h.", highlight: "92 — La Défense" },
      { name: "Puteaux", slug: "reparation-volet-puteaux", image: "/images/zones/puteaux.webp", description: "Volets roulants résidentiels et tertiaires — moteurs Somfy et Simu.", highlight: "92 — Tertiaire" },
      { name: "Sèvres", slug: "reparation-volet-sevres", image: "/images/zones/sevres.webp", description: "Réparation de volets dans le secteur résidentiel — diagnostic gratuit.", highlight: "92 — Résidentiel" },
      { name: "Saint-Cloud", slug: "reparation-volet-saint-cloud", image: "/images/zones/saint-cloud.webp", description: "Intervention sur volets de maisons et copropriétés — garantie 3 ans.", highlight: "92 — Patrimoine" },
      { name: "Rueil-Malmaison", slug: "reparation-volet-rueil-malmaison", image: "/images/zones/rueil-malmaison.webp", description: "Motorisation et domotique — pilotage smartphone pour vos volets.", highlight: "92 — Connecté" },
    ]
  },
  {
    name: "Seine-Saint-Denis (93)",
    code: "93",
    iconBg: "bg-service-blue",
    badgeVariant: "serviceBlue",
    subtitle: "De Saint-Denis à Montreuil — réparations de volets roulants, motorisation et dépannage express.",
    villes: [
      { name: "Saint-Denis", slug: "reparation-volet-saint-denis", image: "/images/zones/saint-denis.webp", description: "Réparation de volets en zone urbaine dense — toutes marques.", highlight: "93 — Forte Demande" },
      { name: "Montreuil", slug: "reparation-volet-montreuil", image: "/images/zones/montreuil.webp", description: "Dépannage et remplacement — anciens et nouveaux bâtiments.", highlight: "93 — Mixte" },
      { name: "Bobigny", slug: "reparation-volet-bobigny", image: "/images/zones/bobigny.webp", description: "Installation de volets isolants — économies d'énergie garanties.", highlight: "93 — Préfecture" },
      { name: "Pantin", slug: "reparation-volet-pantin", image: "/images/zones/pantin.webp", description: "Motorisation de volets manuels — quartier en pleine rénovation.", highlight: "93 — Renouveau" },
      { name: "Bagnolet", slug: "reparation-volet-bagnolet", image: "/images/zones/bagnolet.webp", description: "Dépannage rapide de volets bloqués — intervention sous 48h.", highlight: "93 — Express" },
      { name: "Aubervilliers", slug: "reparation-volet-aubervilliers", image: "/images/zones/aubervilliers.webp", description: "Réparation et sécurisation de volets — résidences et commerces.", highlight: "93 — Sécurité" },
      { name: "Saint-Ouen", slug: "reparation-volet-saint-ouen", image: "/images/zones/saint-ouen.webp", description: "Volets roulants pour copropriétés — devis adaptés syndics.", highlight: "93 — Copropriétés" },
    ]
  },
  {
    name: "Val-de-Marne (94)",
    code: "94",
    iconBg: "bg-service-emerald",
    badgeVariant: "serviceEmerald",
    subtitle: "Créteil, Vincennes, Vitry-sur-Seine... Zones résidentielles avec forte demande de services volets roulants.",
    villes: [
      { name: "Créteil", slug: "reparation-volet-creteil", image: "/images/zones/creteil.webp", description: "Installation de volets roulants — motorisation et domotique.", highlight: "94 — Préfecture" },
      { name: "Vitry-sur-Seine", slug: "reparation-volet-vitrysur-seine", image: "/images/zones/vitry-sur-seine.webp", description: "Dépannage de volets — quartiers résidentiels et ensembles neufs.", highlight: "94 — Résidentiel" },
      { name: "Ivry-sur-Seine", slug: "reparation-volet-ivrysur-seine", image: "/images/zones/ivry-sur-seine.webp", description: "Réparation rapide — zone résidentielle et industrielle.", highlight: "94 — Mixte" },
      { name: "Villejuif", slug: "reparation-volet-villejuif", image: "/images/zones/villejuif.webp", description: "Installation et motorisation — proximité Grand Paris Express.", highlight: "94 — Grand Paris" },
      { name: "Vincennes", slug: "reparation-volet-vincennes", image: "/images/zones/vincennes.webp", description: "Dépannage rapide — quartier résidentiel, intervention sous 24h.", highlight: "94 — Express" },
      { name: "Saint-Mandé", slug: "reparation-volet-saint-mande", image: "/images/zones/saint-mande.webp", description: "Volets haut de gamme — copropriétés et maisons de ville.", highlight: "94 — Standing" },
      { name: "Fontenay-sous-Bois", slug: "reparation-volet-fontenaysous-bois", image: "/images/zones/fontenay-sous-bois.webp", description: "Remplacement et réparation — toutes marques de moteurs.", highlight: "94 — Toutes marques" },
    ]
  },
  {
    name: "Yvelines (78)",
    code: "78",
    iconBg: "bg-service-violet",
    badgeVariant: "serviceViolet",
    subtitle: "De Versailles à Saint-Germain-en-Laye — patrimoine historique et résidences modernes.",
    villes: [
      { name: "Versailles", slug: "reparation-volet-versailles", image: "/images/zones/versailles.webp", description: "Réparation respectueuse du patrimoine architectural royal.", highlight: "78 — Patrimoine" },
      { name: "Saint-Germain-en-Laye", slug: "reparation-volet-saint-germainen-laye", image: "/images/zones/saint-germain-en-laye.webp", description: "Spécialiste maisons individuelles et copropriétés.", highlight: "78 — Résidentiel" },
      { name: "Rambouillet", slug: "reparation-volet-rambouillet", image: "/images/zones/rambouillet.webp", description: "Intervention en zone semi-rurale — motorisation et isolation.", highlight: "78 — Nature" },
      { name: "Mantes-la-Jolie", slug: "reparation-volet-mantesla-jolie", image: "/images/zones/mantes-la-jolie.webp", description: "Dépannage et installation — résidences et logements sociaux.", highlight: "78 — Accessible" },
    ]
  },
  {
    name: "Essonne, Seine-et-Marne & Val-d'Oise",
    code: "91 · 77 · 95",
    iconBg: "bg-service-cyan",
    badgeVariant: "serviceCyan",
    subtitle: "Grande couronne — Évry, Melun, Cergy, Pontoise. Couverture complète avec techniciens locaux.",
    villes: [
      { name: "Évry", slug: "reparation-volet-evry", image: "/images/zones/evry.webp", description: "Dépannage et réparation — préfecture de l'Essonne.", highlight: "91 — Préfecture" },
      { name: "Corbeil-Essonnes", slug: "reparation-volet-corbeil-essonnes", image: "/images/zones/corbeil-essonnes.webp", description: "Intervention rapide — résidences et pavillons.", highlight: "91 — Résidentiel" },
      { name: "Melun", slug: "reparation-volet-melun", image: "/images/zones/melun.webp", description: "Réparation de volets — Seine-et-Marne, diagnostic gratuit.", highlight: "77 — Préfecture" },
      { name: "Cergy", slug: "reparation-volet-cergy", image: "/images/zones/cergy.webp", description: "Installation et motorisation — ville nouvelle dynamique.", highlight: "95 — Cergy-Pontoise" },
      { name: "Pontoise", slug: "reparation-volet-pontoise", image: "/images/zones/pontoise.webp", description: "Dépannage et remplacement — centre historique et quartiers neufs.", highlight: "95 — Patrimoine" },
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
    { question: "Proposez-vous des contrats de maintenance pour les copropriétés ?", answer: "Oui, nous proposons des contrats de maintenance préventive pour les copropriétés et les gestionnaires immobiliers. Entretien annuel de tous les volets, vérification des moteurs, lubrification des coulisses. Tarifs dégressifs selon le nombre de volets." }
  ];

  return (
    <div className="min-h-screen bg-background">
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
