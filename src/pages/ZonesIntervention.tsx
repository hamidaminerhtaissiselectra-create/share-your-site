import { Link } from "react-router-dom";
import ServiceRegionsSection from "@/components/ServiceRegionsSection";
import IdfCitiesSection from "@/components/IdfCitiesSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumbs from "@/components/SEO/Breadcrumbs";
import AnimatedSection from "@/components/AnimatedSection";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  ArrowRight, 
  Building2, 
  Shield, 
  Phone, 
  Clock, 
  Award, 
  Users,
  Zap,
  Smartphone,
  Gauge,
  Lightbulb,
  HelpCircle
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import QuoteFormSection from "@/components/QuoteFormSection";

const ileDeFranceImg = "/images/assets/regions/ile-de-france.webp";
const parisCityscapeImg = "/images/assets/regions/paris-cityscape.webp";

const ZonesIntervention = () => {
  
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useSEO({
    title: "Zones d'Intervention France | Dépannage & Réparation Volets Roulants | Répar'Action Volets",
    description: "Répar'Action Volets intervient à Paris, Île-de-France et partout en France pour le dépannage, la réparation, l'installation et la motorisation de vos volets roulants. Intervention express en 24-48h.",
    keywords: "dépannage volets roulants France, réparation volets roulants, installation volets roulants, motorisation volets, zones intervention",
    canonicalUrl: "https://reparaction-volets.fr/zones-intervention",
  });

  const breadcrumbItems = [
    { name: "Zones d'intervention", url: "/zones-intervention" },
  ];

  // Stats adaptées
  const stats = [
    { icon: MapPin, value: "50+", label: "Villes desservies", color: "text-service-blue" },
    { icon: Building2, value: "40", label: "Arrondissements Paris", color: "text-service-violet" },
    { icon: Users, value: "5000+", label: "Clients satisfaits", color: "text-service-emerald" },
    { icon: Clock, value: "24-48h", label: "Délai d'intervention", color: "text-service-orange" }
  ];

  // FAQ adaptée
  const faqs = [
    {
      question: "Où intervenez-vous en priorité ?",
      answer: "Répar'Action Volets intervient en priorité à Paris et en Île-de-France, avec des délais garantis de 24 à 48h. Nous couvrons également l'ensemble des grandes métropoles françaises pour vos besoins de dépannage, réparation et installation."
    },
    {
      question: "Quels sont les délais d'intervention à Paris ?",
      answer: "À Paris : intervention sous 24h à 48h pour les urgences. En Île-de-France : intervention rapide sous 48h à 72h. Pour les autres zones, nous planifions l'intervention selon la disponibilité de nos techniciens locaux."
    },
    {
      question: "Proposez-vous des devis gratuits partout en France ?",
      answer: "Oui, nous proposons des devis gratuits et sans engagement pour tous vos projets de réparation ou d'installation, quelle que soit votre localisation en France métropolitaine."
    },
    {
      question: "Intervenez-vous sur toutes les marques de volets roulants ?",
      answer: "Absolument. Nos techniciens sont formés pour intervenir sur toutes les marques majeures : Somfy, Bubendorff, Simu, Nice, Profalux, etc., que vos volets soient manuels ou électriques."
    },
    {
      question: "Comment obtenir un devis rapidement ?",
      answer: "Vous pouvez demander un devis en remplissant le formulaire ci-dessous, en nous appelant au 06 03 20 59 67, ou en nous envoyant un email. Nous vous recontactons sous 24h avec votre devis personnalisé."
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Style identique à la page d'accueil */}
      <section ref={heroRef} className="relative min-h-[600px] flex items-center overflow-hidden pt-20">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src={ileDeFranceImg} alt="Zones d'intervention volets roulants" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
        </motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-3xl mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-8 backdrop-blur-sm">
                <Shield className="h-4 w-4" />
                Expert en Volets Roulants depuis 10 ans — Partout en France
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 text-foreground"
            >
              Nos Zones d'Intervention : <span className="text-accent">Dépannage & Réparation</span> partout en France
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            >
              Basés à Fontenay-Trésigny, nous intervenons sur l'ensemble du territoire français pour garantir le bon fonctionnement de vos volets roulants. Intervention express en Île-de-France et dans les grandes métropoles. Nos techniciens utilisent la géolocalisation intelligente pour optimiser les délais d'intervention et vous proposer le meilleur service.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button size="lg" variant="accent" asChild className="px-8 py-7 text-lg font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-105">
                <a href="/#devis" className="flex items-center gap-2">
                  Demander un Devis Gratuit <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="accent-outline" asChild className="px-8 py-7 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105">
                <a href="tel:0603205967" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" /> 06 03 20 59 67
                </a>
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-bold backdrop-blur-sm"
              >
                <Badge variant="serviceBlue">
                  <Shield className="h-5 w-5" />
                  <span>Garantie 3 ans</span>
                </Badge>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-bold backdrop-blur-sm"
              >
                <Badge variant="serviceOrange">
                  <Clock className="h-5 w-5" />
                  <span>Intervention sous 48h</span>
                </Badge>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-bold backdrop-blur-sm"
              >
                <Badge variant="serviceEmerald">
                  <Award className="h-5 w-4" />
                  <span>Artisan certifié RGE</span>
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - colorée comme la page d'accueil */}
      <section className="py-14 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const bgColors = ["bg-service-blue", "bg-service-violet", "bg-service-emerald", "bg-service-orange"];
              return (
                <motion.div key={index} {...staggerItem(index)} className="text-center p-6 rounded-2xl bg-background border border-border card-shadow hover:card-shadow-hover transition-all">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${bgColors[index]} shadow-lg mb-4`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-semibold mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IdF & Paris - Sections INVERSÉES + amélioration visuelle */}
      <section className="py-20 bg-section-gradient">
        <div className="container mx-auto px-4">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">
              <Building2 className="h-3.5 w-3.5" /> Nos Zones Prioritaires
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Paris & Île-de-France : Notre Cœur d'Activité
            </h2>
            <p className="text-muted-foreground">
              Intervention express garantie dans toute la région parisienne avec nos techniciens certifiés.
            </p>
          </motion.div>

          {/* Bloc Île-de-France (PREMIER) */}
          <AnimatedSection animation="fade-up">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src={ileDeFranceImg} 
                  alt="Réparation volets Île-de-France" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent group-hover:from-foreground/10 transition-all duration-500" />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-service-blue shadow-[0_4px_14px_hsl(213,72%,50%,0.35)] flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
              </div>
              <div>
                <Badge variant="serviceBlue" className="gap-2 px-3 py-1.5 rounded-full text-sm font-bold mb-4">
                  <MapPin className="h-3.5 w-3.5" /> Couverture Régionale
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">Intervention en Île-de-France</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Nous couvrons l'intégralité de la région parisienne avec une présence locale dans tous les départements. Nos techniciens circulent quotidiennement dans les départements 77, 78, 91, 92, 93, 94 et 95.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Que vous soyez à Versailles, Créteil, Cergy ou Melun, nous disposons de ressources locales pour intervenir rapidement avec des solutions adaptées.
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-service-blue/10 border border-service-blue/20">
                    <span className="text-3xl font-bold text-service-blue">7</span>
                    <span className="text-xs text-muted-foreground font-semibold">Départements</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-service-emerald/10 border border-service-emerald/20">
                    <span className="text-3xl font-bold text-service-emerald">50+</span>
                    <span className="text-xs text-muted-foreground font-semibold">Villes</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-service-orange/10 border border-service-orange/20">
                    <span className="text-3xl font-bold text-service-orange">48h</span>
                    <span className="text-xs text-muted-foreground font-semibold">Garanti</span>
                  </div>
                </div>
                <Button size="lg" variant="accent" asChild className="rounded-full px-8 shadow-lg">
                  <Link to="/zones-intervention/ile-de-france">
                    Découvrir les départements <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Bloc Paris (SECOND) */}
          <AnimatedSection animation="fade-up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2 relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src={parisCityscapeImg} 
                  alt="Réparation volets Paris" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent group-hover:from-foreground/10 transition-all duration-500" />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-service-orange shadow-[0_4px_14px_hsl(25,90%,55%,0.35)] flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
              </div>
              <div className="md:order-1">
                <Badge variant="serviceOrange" className="gap-2 px-3 py-1.5 rounded-full text-sm font-bold mb-4">
                  <Zap className="h-3.5 w-3.5" /> Secteur Prioritaire
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">Réparation de Volets à Paris</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Répar'Action Volets est votre expert de proximité dans tous les arrondissements de Paris. Intervention en urgence pour tout dépannage de volet roulant bloqué ou moteur en panne.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Nos équipes maîtrisent toutes les marques et disposent des pièces de rechange en stock. Intervention sous 24h à 48h garantie, diagnostic gratuit, garantie 3 ans.
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-service-orange/10 border border-service-orange/20">
                    <span className="text-3xl font-bold text-service-orange">20</span>
                    <span className="text-xs text-muted-foreground font-semibold">Arrondissements</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-service-violet/10 border border-service-violet/20">
                    <span className="text-3xl font-bold text-service-violet">24h</span>
                    <span className="text-xs text-muted-foreground font-semibold">Délai moyen</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-service-emerald/10 border border-service-emerald/20">
                    <span className="text-3xl font-bold text-service-emerald">3 ans</span>
                    <span className="text-xs text-muted-foreground font-semibold">Garantie</span>
                  </div>
                </div>
                <Button size="lg" variant="accent" asChild className="rounded-full px-8 shadow-lg">
                  <Link to="/zones-intervention/paris">
                    Voir tous les arrondissements <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* Section Régions d'Intervention — autres régions en premier */}
      <ServiceRegionsSection regionsFirst />

      {/* Section Innovation & Technologie */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Badge variant="default" className="gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-service-violet/10 text-service-violet border border-service-violet/20">
              <Lightbulb className="h-3.5 w-3.5" /> Innovation & Technologie
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Une Couverture Nationale Optimisée par l'IA et la Géolocalisation
            </h2>
            <p className="text-muted-foreground">
              Répar'Action Volets utilise des technologies avancées pour vous proposer le meilleur service, où que vous soyez en France.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "Géolocalisation Intelligente",
                desc: "Notre système d'IA analyse votre position et celle de nos techniciens pour optimiser les trajets et réduire les délais d'intervention.",
                badge: "GEO",
                iconBg: "bg-service-cyan",
              },
              {
                icon: Gauge,
                title: "Optimisation des Tournées",
                desc: "Algorithmes d'optimisation qui regroupent les interventions par zone géographique pour une meilleure efficacité et des coûts réduits.",
                badge: "IA",
                iconBg: "bg-service-emerald",
              },
              {
                icon: Lightbulb,
                title: "Prédiction & Prévention",
                desc: "Nos données historiques permettent d'identifier les pannes récurrentes et de proposer des solutions préventives à nos clients.",
                badge: "Data",
                iconBg: "bg-service-orange",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.4 } }}
                className="group bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-500 border border-border relative p-8"
              >
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
                
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
                <Badge variant="default" className="text-[11px] font-bold bg-accent/10 text-accent border border-accent/20">
                  {item.badge}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section villes IDF détaillées */}
      <IdfCitiesSection />

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <Badge variant="default" className="gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-accent/10 text-accent border border-accent/20">
                <HelpCircle className="h-3.5 w-3.5" /> Questions Fréquentes
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Vos Questions sur Nos Zones d'Intervention</h2>
              <p className="text-muted-foreground">Tout ce qu'il faut savoir sur nos services et notre couverture géographique.</p>
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

      {/* Quote Form Section */}
      <section className="py-20 bg-background">
        <QuoteFormSection />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <ArrowRight className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Un problème de volet roulant ?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">Nos techniciens interviennent rapidement chez vous, partout en France. Devis gratuit et intervention garantie avec notre système de géolocalisation optimisé.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-10" asChild>
              <Link to="#devis">Demander mon devis gratuit</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 text-lg px-10" asChild>
              <a href="tel:0603205967">Appeler le 06 03 20 59 67</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ZonesIntervention;
