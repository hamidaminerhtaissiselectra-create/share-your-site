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

interface ArrondissementCard {
  name: string;
  slug: string;
  image: string;
  description: string;
  highlight: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
  searchKeywords?: string;
  voiceSearch?: string;
}

// Enhanced data with GPS coordinates, zip codes and voice search
const arrondissements: ArrondissementCard[] = [
  { 
    name: "Paris 1er", 
    slug: "reparation-volet-paris-1", 
    image: "/images/zones/paris-1.webp", 
    zipCode: "75001",
    lat: 48.8626,
    lng: 2.3364,
    description: "Quartier du Louvre et des Halles — dépannage de volets roulants sur immeubles classés et commerces de prestige.",
    highlight: "Louvre & Halles",
    searchKeywords: "volet roulant paris 1er, dépannage volet louvre, réparation volet châtelet halles",
    voiceSearch: "Où réparer un volet roulant dans le premier arrondissement de Paris près du Louvre ?"
  },
  { 
    name: "Paris 2e", 
    slug: "reparation-volet-paris-2", 
    image: "/images/zones/paris-2.webp", 
    zipCode: "75002",
    lat: 48.8677,
    lng: 2.3412,
    description: "Passages couverts et Bourse — intervention rapide sur volets anciens et motorisation de stores.",
    highlight: "Bourse & Passages",
    searchKeywords: "volet roulant paris 2ème, dépannage volet bourse, réparation volet grands boulevards",
    voiceSearch: "Comment faire réparer un volet roulant dans le 2ème arrondissement près de la Bourse ?"
  },
  { 
    name: "Paris 3e", 
    slug: "reparation-volet-paris-3", 
    image: "/images/zones/paris-3.webp",
    zipCode: "75003", 
    lat: 48.8629,
    lng: 2.3601,
    description: "Haut Marais — réparation de volets sur façades historiques et résidences de caractère.",
    highlight: "Haut Marais",
    searchKeywords: "volet roulant paris 3ème, dépannage volet marais, réparation volet arts et métiers",
    voiceSearch: "Qui peut réparer un volet roulant dans le Marais du 3ème arrondissement ?"
  },
  { 
    name: "Paris 4e", 
    slug: "reparation-volet-paris-4", 
    image: "/images/zones/paris-4.webp", 
    zipCode: "75004",
    lat: 48.8543,
    lng: 2.3576,
    description: "Île de la Cité et Marais — spécialiste volets roulants en copropriétés haussmanniennes.",
    highlight: "Île de la Cité",
    searchKeywords: "volet roulant paris 4ème, dépannage volet notre dame, réparation volet île saint louis",
    voiceSearch: "Dépannage volet roulant près de Notre-Dame dans le 4ème arrondissement ?"
  },
  { 
    name: "Paris 5e", 
    slug: "reparation-volet-paris-5", 
    image: "/images/zones/paris-5.webp", 
    zipCode: "75005",
    lat: 48.8445,
    lng: 2.3490,
    description: "Quartier Latin et Panthéon — dépannage urgent de volets bloqués pour étudiants et résidents.",
    highlight: "Quartier Latin",
    searchKeywords: "volet roulant paris 5ème, dépannage volet panthéon, réparation volet quartier latin sorbonne",
    voiceSearch: "Réparation de volet roulant pas cher pour étudiant dans le 5ème arrondissement ?"
  },
  { 
    name: "Paris 6e", 
    slug: "reparation-volet-paris-6", 
    image: "/images/zones/paris-6.webp", 
    zipCode: "75006",
    lat: 48.8491,
    lng: 2.3329,
    description: "Saint-Germain-des-Prés — installation et remplacement de volets sur immeubles bourgeois.",
    highlight: "Saint-Germain",
    searchKeywords: "volet roulant paris 6ème, dépannage volet saint germain des prés, réparation volet luxembourg",
    voiceSearch: "Expert volet roulant haut de gamme Saint-Germain-des-Prés 6ème arrondissement ?"
  },
  { 
    name: "Paris 7e", 
    slug: "reparation-volet-paris-7", 
    image: "/images/zones/paris-7.webp", 
    zipCode: "75007",
    lat: 48.8561,
    lng: 2.3126,
    description: "Tour Eiffel et Invalides — motorisation et réparation de volets dans le quartier diplomatique.",
    highlight: "Tour Eiffel",
    searchKeywords: "volet roulant paris 7ème, dépannage volet tour eiffel, réparation volet invalides",
    voiceSearch: "Dépannage volet roulant sécurisé près de la Tour Eiffel dans le 7ème ?"
  },
  { 
    name: "Paris 8e", 
    slug: "reparation-volet-paris-8", 
    image: "/images/zones/paris-8.webp", 
    zipCode: "75008",
    lat: 48.8725,
    lng: 2.3126,
    description: "Champs-Élysées et Madeleine — intervention volets roulants pour boutiques et résidences de luxe.",
    highlight: "Champs-Élysées",
    searchKeywords: "volet roulant paris 8ème, dépannage volet champs elysées, réparation volet madeleine",
    voiceSearch: "Réparateur volet roulant de luxe sur les Champs-Élysées dans le 8ème ?"
  },
  { 
    name: "Paris 9e", 
    slug: "reparation-volet-paris-9", 
    image: "/images/zones/paris-9.webp", 
    zipCode: "75009",
    lat: 48.8760,
    lng: 2.3375,
    description: "Opéra Garnier et Grands Boulevards — dépannage de volets sur immeubles de spectacle et habitations.",
    highlight: "Opéra",
    searchKeywords: "volet roulant paris 9ème, dépannage volet opéra, réparation volet pigalle grands boulevards",
    voiceSearch: "Dépanneur volet roulant rapide près de l'Opéra dans le 9ème arrondissement ?"
  },
  { 
    name: "Paris 10e", 
    slug: "reparation-volet-paris-10", 
    image: "/images/zones/paris-10.webp", 
    zipCode: "75010",
    lat: 48.8761,
    lng: 2.3601,
    description: "Canal Saint-Martin et gares — réparation express de volets pour riverains et locaux commerciaux.",
    highlight: "Canal St-Martin",
    searchKeywords: "volet roulant paris 10ème, dépannage volet canal saint martin, réparation volet gare du nord est",
    voiceSearch: "Réparation volet roulant urgent près du Canal Saint-Martin dans le 10ème ?"
  },
  { 
    name: "Paris 11e", 
    slug: "reparation-volet-paris-11", 
    image: "/images/zones/paris-11.webp", 
    zipCode: "75011",
    lat: 48.8594,
    lng: 2.3787,
    description: "Bastille et Oberkampf — installation de volets sécurisés pour appartements et restaurants.",
    highlight: "Bastille",
    searchKeywords: "volet roulant paris 11ème, dépannage volet bastille, réparation volet oberkampf république",
    voiceSearch: "Installateur volet roulant sécurisé à Bastille dans le 11ème arrondissement ?"
  },
  { 
    name: "Paris 12e", 
    slug: "reparation-volet-paris-12", 
    image: "/images/zones/paris-12.webp", 
    zipCode: "75012",
    lat: 48.8393,
    lng: 2.3959,
    description: "Bercy et Bois de Vincennes — remplacement de volets vieillissants et pose de motorisation Somfy.",
    highlight: "Bercy Village",
    searchKeywords: "volet roulant paris 12ème, dépannage volet bercy, réparation volet gare de lyon",
    voiceSearch: "Motorisation volet roulant Somfy à Bercy dans le 12ème arrondissement ?"
  },
  { 
    name: "Paris 13e", 
    slug: "reparation-volet-paris-13", 
    image: "/images/zones/paris-13.webp", 
    zipCode: "75013",
    lat: 48.8283,
    lng: 2.3622,
    description: "Bibliothèque et Chinatown — dépannage volets dans les résidences modernes et tours d'habitation.",
    highlight: "BnF & Tolbiac",
    searchKeywords: "volet roulant paris 13ème, dépannage volet bibliothèque nationale, réparation volet tolbiac",
    voiceSearch: "Réparation volet roulant dans les tours du 13ème arrondissement à Tolbiac ?"
  },
  { 
    name: "Paris 14e", 
    slug: "reparation-volet-paris-14", 
    image: "/images/zones/paris-14.webp", 
    zipCode: "75014",
    lat: 48.8296,
    lng: 2.3237,
    description: "Montparnasse et Alésia — réparation de volets anciens et modernisation énergétique.",
    highlight: "Montparnasse",
    searchKeywords: "volet roulant paris 14ème, dépannage volet montparnasse, réparation volet alésia",
    voiceSearch: "Rénovation volet roulant éco-responsable à Montparnasse dans le 14ème ?"
  },
  { 
    name: "Paris 15e", 
    slug: "reparation-volet-paris-15", 
    image: "/images/zones/paris-15.webp", 
    zipCode: "75015",
    lat: 48.8412,
    lng: 2.2999,
    description: "Plus grand arrondissement — intervention massive sur copropriétés et pavillons résidentiels.",
    highlight: "Convention",
    searchKeywords: "volet roulant paris 15ème, dépannage volet tour eiffel, réparation volet beaugrenelle",
    voiceSearch: "Dépannage volet roulant dans le 15ème arrondissement le plus grand de Paris ?"
  },
  { 
    name: "Paris 16e", 
    slug: "reparation-volet-paris-16", 
    image: "/images/zones/paris-16.webp", 
    zipCode: "75016",
    lat: 48.8604,
    lng: 2.2740,
    description: "Trocadéro et Auteuil — volets roulants haut de gamme et motorisation domotique connectée.",
    highlight: "Trocadéro",
    searchKeywords: "volet roulant paris 16ème, dépannage volet trocadéro, réparation volet auteuil passy",
    voiceSearch: "Spécialiste volet roulant haut de gamme au Trocadéro dans le 16ème ?"
  },
  { 
    name: "Paris 17e", 
    slug: "reparation-volet-paris-17", 
    image: "/images/zones/paris-17.webp", 
    zipCode: "75017",
    lat: 48.8835,
    lng: 2.3067,
    description: "Batignolles et Ternes — remplacement de sangles cassées et remise en service de tabliers bloqués.",
    highlight: "Batignolles",
    searchKeywords: "volet roulant paris 17ème, dépannage volet batignolles, réparation volet ternes",
    voiceSearch: "Réparation sangle volet roulant aux Batignolles dans le 17ème arrondissement ?"
  },
  { 
    name: "Paris 18e", 
    slug: "reparation-volet-paris-18", 
    image: "/images/zones/paris-18.webp", 
    zipCode: "75018",
    lat: 48.8925,
    lng: 2.3444,
    description: "Montmartre et Sacré-Cœur — dépannage de volets sur façades en pente et immeubles atypiques.",
    highlight: "Montmartre",
    searchKeywords: "volet roulant paris 18ème, dépannage volet montmartre, réparation volet sacré coeur",
    voiceSearch: "Dépannage volet roulant difficile d'accès à Montmartre dans le 18ème ?"
  },
  { 
    name: "Paris 19e", 
    slug: "reparation-volet-paris-19", 
    image: "/images/zones/paris-19.webp", 
    zipCode: "75019",
    lat: 48.8827,
    lng: 2.3821,
    description: "Buttes-Chaumont et Villette — installation de volets isolants pour économies d'énergie.",
    highlight: "Buttes-Chaumont",
    searchKeywords: "volet roulant paris 19ème, dépannage volet buttes chaumont, réparation volet villette",
    voiceSearch: "Volet roulant isolant économie d'énergie Buttes-Chaumont dans le 19ème ?"
  },
  { 
    name: "Paris 20e", 
    slug: "reparation-volet-paris-20", 
    image: "/images/zones/paris-20.webp", 
    zipCode: "75020",
    lat: 48.8631,
    lng: 2.4008,
    description: "Belleville et Ménilmontant — réparation de volets en urgence et pose de modèles anti-effraction.",
    highlight: "Belleville",
    searchKeywords: "volet roulant paris 20ème, dépannage volet belleville, réparation volet ménilmontant",
    voiceSearch: "Volet roulant anti-effraction à Belleville dans le 20ème arrondissement ?"
  },
];

// Enhanced CitySlide with GPS coordinates and more data
const CitySlide = ({ city }: { city: ArrondissementCard }) => (
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
        
        {/* GPS coordinates badge */}
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
        
        {/* GPS Coordinates display */}
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

const CarouselSection = ({ 
  items, 
  title, 
  subtitle, 
  iconBg, 
  icon: Icon 
}: { 
  items: ArrondissementCard[]; 
  title: string; 
  subtitle: string; 
  iconBg: string; 
  icon: React.ElementType;
}) => {
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
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shadow-lg`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">{subtitle}</p>
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
          {items.map((city) => (
            <CitySlide key={city.slug} city={city} />
          ))}
        </div>
      </div>

      {/* Dots */}
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
    </div>
  );
};

const ParisPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const { phoneNumber } = usePhoneCall();

  // Enhanced FAQs with voice search optimization (declared before structuredData)
  const faqs = [
    { question: "Quel est le délai d'intervention pour un volet bloqué à Paris ?", answer: "Nous intervenons en urgence sous 24h à 48h pour tous les dépannages à Paris. Pour les volets bloqués en position ouverte représentant un risque de sécurité, nous traitons la demande en priorité et intervenons souvent le jour même. Appelez le 06 03 20 59 67." },
    { question: "Combien coûte la réparation d'un volet roulant à Paris ?", answer: "Le coût dépend de la panne : remplacement de sangle (60-120€), changement de moteur Somfy/Bubendorff (180-350€), remplacement de lames (80-200€). Diagnostic gratuit et devis détaillé avant toute intervention. Pas de frais de déplacement à Paris." },
    { question: "Intervenez-vous dans tous les arrondissements de Paris ?", answer: "Oui, nous couvrons les 20 arrondissements de Paris sans exception. Nos techniciens connaissent les spécificités de chaque quartier : immeubles haussmanniens du 7e et 16e, ateliers du Marais, résidences modernes du 13e et 15e." },
    { question: "Travaillez-vous sur les volets des immeubles haussmanniens ?", answer: "Oui, c'est notre spécialité à Paris. Les volets d'immeubles haussmanniens ont des contraintes spécifiques (coffres intégrés, hauteurs atypiques). Nos techniciens sont formés pour intervenir sans dégrader les éléments architecturaux protégés." },
    { question: "Proposez-vous la motorisation pour les volets manuels parisiens ?", answer: "Absolument. Nous motorisons vos volets manuels existants sans travaux de maçonnerie ni modification de façade. Installation de moteurs Somfy (filaires, radio ou connectés) en 1 à 2 heures par volet. Compatible Google Home, Alexa, Apple HomeKit." },
    { question: "Êtes-vous certifié RGE pour bénéficier de MaPrimeRénov' ?", answer: "Oui, Répar'Action Volets est certifié RGE et Qualibat. Cette certification vous permet de bénéficier de MaPrimeRénov', de l'éco-PTZ et du crédit d'impôt pour l'installation de volets isolants ou de double vitrage à Paris." },
    { question: "Comment trouver un bon réparateur de volets roulants à Paris ?", answer: "Pour trouver le meilleur réparateur à Paris, vérifiez : la certification RGE, les avis clients (nous avons 4.9/5), la garantie offerte (3 ans chez nous), et la couverture géographique. Répar'Action intervient dans les 20 arrondissements avec des techniciens spécialisés." },
    { question: "Que faire quand mon volet roulant est bloqué à Paris ?", answer: "Si votre volet est bloqué à Paris : 1) Ne forcez pas le mécanisme, 2) Vérifiez l'alimentation électrique, 3) Contactez-nous au 06 03 20 59 67 pour un diagnostic gratuit. Nous intervenons en urgence dans tous les arrondissements, souvent le jour même." },
    { question: "Quel est le prix d'un volet roulant neuf à Paris ?", answer: "Prix volet roulant neuf à Paris : manuel 300-600€, électrique 500-900€, sur-mesure 600-1200€. Installation comprise. Devis gratuit, financement possible, éligible aux aides MaPrimeRénov'. Garantie 3 ans pièces et main d'œuvre." }
  ];

  // JSON-LD structured data for Local Business and FAQ
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://reparaction-volets.fr/zones-intervention/paris#business",
        "name": "Répar'Action Volets Paris",
        "description": "Expert en dépannage et réparation de volets roulants dans tous les arrondissements de Paris. Intervention rapide, diagnostic gratuit et garantie 3 ans.",
        "url": "https://reparaction-volets.fr/zones-intervention/paris",
        "telephone": phoneNumber.replace(/\s/g, ''),
        "priceRange": "€€",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "FR",
          "addressRegion": "Île-de-France",
          "addressLocality": "Paris"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 48.8566,
          "longitude": 2.3522
        },
        "areaServed": arrondissements.map(arr => ({
          "@type": "City",
          "name": arr.name,
          "addressLocality": arr.name,
          "addressRegion": "Paris",
          "geo": arr.lat && arr.lng ? {
            "@type": "GeoCoordinates", 
            "latitude": arr.lat,
            "longitude": arr.lng
          } : undefined
        })),
        "serviceType": ["Réparation volets roulants", "Installation volets", "Motorisation volets", "Dépannage express"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Services Volets Roulants Paris",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Dépannage Volets Roulants Paris",
                "description": "Intervention rapide sur volets bloqués ou cassés dans tous les arrondissements"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Installation Volets Roulants Paris",
                "description": "Pose de volets neufs sur-mesure, solutions aluminium et PVC"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Motorisation Volets Paris", 
                "description": "Modernisation volets manuels avec moteurs Somfy et domotique"
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "ratingCount": "247"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://reparaction-volets.fr/zones-intervention/paris#faq",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": faq.answer
          }
        }))
      }
    ]
  };

  useSEO({
    title: "Dépannage & Réparation Volets Roulants Paris | Tous Arrondissements | Répar'Action",
    description: "Expert en dépannage et réparation de volets roulants à Paris. Intervention rapide dans les 20 arrondissements. Dépannage express, installation et motorisation. Devis gratuit.",
    keywords: "réparation volets Paris, volets roulants arrondissements Paris, dépannage volets Paris, installation volets 75",
    canonicalUrl: "https://reparaction-volets.fr/zones-intervention/paris",
  });

  const breadcrumbItems = [
    { name: "Zones d'intervention", url: "/zones-intervention" },
    { name: "Paris", url: "/zones-intervention/paris" },
  ];

  const stats = [
    { icon: Building2, value: "20", label: "Arrondissements", color: "text-service-violet" },
    { icon: Clock, value: "24-48h", label: "Délai d'intervention", color: "text-service-orange" },
    { icon: Users, value: "2000+", label: "Clients parisiens", color: "text-service-emerald" },
    { icon: Award, value: "4.9/5", label: "Note moyenne", color: "text-service-blue" }
  ];

  const riveDroite = arrondissements.filter(a => 
    ["1", "2", "3", "4", "9", "10", "11", "12", "17", "18", "19", "20"].some(n => a.name.includes(`Paris ${n}e`) || a.name.includes(`Paris ${n}er`))
  );
  const riveGauche = arrondissements.filter(a => 
    ["5", "6", "7", "8", "13", "14", "15", "16"].some(n => a.name.includes(`Paris ${n}e`) || a.name.includes(`Paris ${n}er`))
  );

  const services = [
    { icon: Wrench, title: "Réparation & Dépannage", description: "Intervention rapide sur volets bloqués ou cassés à Paris. Diagnostic gratuit et réparation immédiate.", link: "/services/reparation-volets-roulants" },
    { icon: Settings, title: "Installation & Remplacement", description: "Pose de volets roulants neufs sur-mesure à Paris. Solutions aluminium ou PVC haute qualité.", link: "/services/installation-remplacement-volets" },
    { icon: Zap, title: "Motorisation", description: "Modernisez vos volets manuels à Paris. Installation de moteurs Somfy, Bubendorff et solutions connectées.", link: "/services/motorisation-domotique" },
    { icon: Home, title: "Domotique", description: "Centralisez le contrôle de vos volets à Paris. Pilotage à distance via smartphone et scénarios intelligents.", link: "/services/motorisation-domotique" },
    { icon: ShieldCheck, title: "Sécurité Renforcée", description: "Installation de verrous de sécurité et volets anti-effraction à Paris pour protéger votre habitat.", link: "/services/installation-remplacement-volets" },
    { icon: Truck, title: "Dépannage Express", description: "Service d'urgence disponible à Paris pour les pannes critiques. Intervention sous 24h garantie.", link: "/services/depannage-express" }
  ];


  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} 
      />
      
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[600px] flex items-center overflow-hidden pt-20">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src={ileDeFranceImg} alt="Volets roulants Paris" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
        </motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl mt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-8 backdrop-blur-sm">
                <MapPin className="h-4 w-4" />
                20 Arrondissements — Intervention Express
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 text-foreground">
              Dépannage & Réparation de Volets Roulants à <span className="text-accent">Paris</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Répar'Action Volets est votre expert de proximité pour le dépannage et la réparation de volets roulants dans tous les arrondissements de Paris. Intervention rapide, diagnostic gratuit et garantie 3 ans.
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
                { icon: Clock, label: "24-48h", variant: "serviceBlue" as const },
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

      {/* Arrondissements Carousels */}
      <section className="py-20 bg-section-gradient">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-14">
              <Badge variant="default" className="gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-accent/10 text-accent border border-accent/20">
                <MapPin className="h-3.5 w-3.5" /> 20 Arrondissements
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">Tous les Arrondissements de Paris</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Cliquez sur votre arrondissement pour accéder à la page dédiée et découvrir nos services spécifiques.</p>
            </div>
          </AnimatedSection>

          <CarouselSection
            items={riveDroite}
            title="Rive Droite — Centre & Nord"
            subtitle="Du 1er au 4e, 9e au 12e, 17e au 20e arrondissement. Intervention sur immeubles haussmanniens et modernes avec expertise adaptée au patrimoine parisien."
            iconBg="bg-service-blue"
            icon={Building2}
          />

          <CarouselSection
            items={riveGauche}
            title="Rive Gauche & Ouest"
            subtitle="Du 5e au 8e, 13e au 16e arrondissement. Quartiers résidentiels et de prestige — motorisation Somfy et domotique connectée."
            iconBg="bg-service-orange"
            icon={Building2}
          />
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
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">Nos Services de Volets Roulants à Paris</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Répar'Action Volets propose une gamme complète de solutions pour vos volets roulants dans tous les arrondissements de Paris.</p>
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
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Vos Questions sur Paris</h2>
              <p className="text-muted-foreground">Tout ce qu'il faut savoir sur nos services dans les 20 arrondissements.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Besoin d'un dépannage à Paris ?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">Contactez-nous pour un dépannage rapide et un devis gratuit dans votre arrondissement.</p>
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

export default ParisPage;
