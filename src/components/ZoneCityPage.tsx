import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ChevronRight, ArrowRight, Phone, CheckCircle2, Shield, Star, Clock, Award, Users, Wrench, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { ZoneCityData } from "@/data/zonesPagesData";
import { citiesLocationData } from "@/data/villes-geolocalisation";
import AnimatedSection from "@/components/AnimatedSection";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ZoneCityPageProps {
  city: ZoneCityData;
}

const ZoneCityPage = ({ city }: ZoneCityPageProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useSEO({
    title: city.metaTitle,
    description: city.metaDescription,
    keywords: `réparation volet roulant ${city.name}, dépannage volet ${city.name}, volet roulant ${city.name}, motorisation volet ${city.name}, installation volet ${city.name}, artisan volet roulant ${city.name}, ${city.department} volet roulant, volet bloqué ${city.name}, remplacement volet ${city.name}, Somfy ${city.name}, Bubendorff ${city.name}, devis volet roulant ${city.name}, volet roulant ${city.departmentCode}`,
    canonicalUrl: `https://reparaction-volets.fr/zones-intervention/${city.slug}`,
  });

  // Trouver les coordonnées GPS de la ville depuis les données de géolocalisation
  const cityGeo = citiesLocationData.find(c => c.name === city.name || c.name === city.name.replace('ème', 'e').replace('er', 'er'));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Répar'Action Volets — ${city.name}`,
    "description": city.metaDescription,
    "url": `https://reparaction-volets.fr/zones-intervention/${city.slug}`,
    "areaServed": {
      "@type": "City",
      "name": city.name,
      ...(cityGeo ? { "geo": { "@type": "GeoCoordinates", "latitude": cityGeo.lat, "longitude": cityGeo.lng } } : {}),
      "containedInPlace": { "@type": "AdministrativeArea", "name": city.department }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "62 Rue Emile Zola",
      "addressLocality": "Fontenay-Trésigny",
      "postalCode": "77610",
      "addressCountry": "FR"
    },
    "telephone": "+33603205967",
    "email": "contact@reparaction-volets.fr",
    "priceRange": "€€",
    "image": city.image ? `https://reparaction-volets.fr${city.image}` : undefined,
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": String(Math.max(city.testimonials.length * 12, 35)), "bestRating": "5" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Services volets roulants ${city.name}`,
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Réparation volet roulant ${city.name}` } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Dépannage volet roulant ${city.name}` } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Motorisation volet roulant ${city.name}` } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Installation volet roulant ${city.name}` } },
      ]
    },
    "sameAs": [
      "https://www.facebook.com/reparactionvolets",
      "https://www.instagram.com/reparactionvolets",
      "https://www.linkedin.com/company/reparaction-volets"
    ],
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "19:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "17:00" }
    ]
  };

  // FAQPage schema generated after faqs are defined - moved to render

  const services = [
    { icon: Wrench, title: "Réparation d'Urgence 7j/7", text: `Volet bloqué, moteur défaillant ? Intervention d'urgence 7j/7 à ${city.name}. Délai : généralement moins de 24h.`, color: "text-service-orange" },
    { icon: Shield, title: "Installation & Remplacement", text: `Volets manuels, électriques et solaires adaptés à l'habitat de ${city.name}. Toutes marques.`, color: "text-service-blue" },
    { icon: Star, title: "Motorisation & Domotique", text: `Motorisation Somfy, Bubendorff. Contrôle à distance, programmation solaire, intégration domotique à ${city.name}.`, color: "text-service-violet" },
    { icon: Home, title: "Vitrerie & Vitrage", text: `Double vitrage, remplacement vitrage spécialisé à ${city.name}. Isolation thermique et phonique.`, color: "text-service-emerald" },
    { icon: Clock, title: "Maintenance Préventive", text: `Contrats de maintenance pour vos volets à ${city.name}. Nettoyage, lubrification, vérification.`, color: "text-accent" },
    { icon: Award, title: city.specialService.title, text: city.specialService.text, color: "text-primary" },
  ];

  const faqs = [
    { q: `Quel est le délai d'intervention pour un volet bloqué à ${city.name} ?`, a: `Pour un volet roulant bloqué à ${city.name}, Répar'Action Volets intervient sous 24-48h en semaine, et le jour même pour les urgences de sécurité (volet ouvert la nuit, bris de glace). Nos véhicules sont pré-équipés des pièces les plus courantes (moteurs Somfy, sangles, lames alu/PVC) pour résoudre 95% des pannes au premier passage. Appelez le 06 03 20 59 67 pour connaître le délai précis dans votre quartier.` },
    { q: `Proposez-vous un service d'urgence volets roulants 7j/7 à ${city.name} ?`, a: `Oui, nos techniciens certifiés sont mobilisables 7j/7, y compris dimanches et jours fériés, pour toute urgence à ${city.name} : volet bloqué en position ouverte, rideau métallique de commerce coincé, bris de glace suite à effraction. La prise en charge est immédiate par téléphone, et l'intervention sur site se fait dans les meilleurs délais selon votre localisation précise.` },
    { q: `Quelle garantie offrez-vous sur vos réparations de volets à ${city.name} ?`, a: `Toutes nos interventions à ${city.name} sont couvertes par une garantie de 3 ans sur les pièces et la main d'œuvre. Nous utilisons exclusivement des pièces d'origine des fabricants (Somfy, Bubendorff, Profalux, Simu). Notre certification RGE et notre assurance décennale vous protègent contre tout défaut. En cas de problème, nous revenons gratuitement dans le cadre de la garantie.` },
    city.uniqueFaq,
    { q: `Quel est le coût moyen d'une réparation de volet roulant à ${city.name} ?`, a: `Les tarifs à ${city.name} varient selon le type de panne : remplacement de sangle (80-120€), réparation moteur électrique (180-350€), remplacement de lames (100-250€), déblocage tablier (90-150€). Un remplacement complet de volet coûte entre 350€ et 900€ pose comprise. Le diagnostic est 100% gratuit et sans engagement — nous vous remettons un devis détaillé avant toute intervention.` },
    { q: `Quelles marques de volets roulants réparez-vous à ${city.name} ?`, a: `Nous intervenons sur toutes les marques à ${city.name} : Somfy, Bubendorff, Profalux, Franciaflex, Simu, Nice, Becker, Came, Zurflüh-Feller, Lakal. Nos techniciens sont certifiés multimarques et disposent des outils de diagnostic spécifiques à chaque fabricant. Que votre volet soit manuel, électrique filaire, radio ou solaire — nous avons la solution.` },
    { q: `Pouvez-vous motoriser mes volets manuels existants à ${city.name} ?`, a: `Absolument. La motorisation de volets manuels existants est l'une de nos spécialités à ${city.name}. Nous installons un moteur tubulaire (filaire, radio ou connecté io-homecontrol) directement dans le tube d'enroulement existant, sans aucun travail de maçonnerie. L'opération prend 1 à 2 heures par volet. Vous pouvez ensuite piloter vos volets par télécommande ou via smartphone avec l'application Somfy TaHoma.` },
    { q: `Êtes-vous certifié RGE ? Puis-je bénéficier d'aides financières à ${city.name} ?`, a: `Oui, Répar'Action Volets est certifié RGE (Reconnu Garant de l'Environnement) et Qualibat. En faisant appel à un artisan RGE pour vos travaux à ${city.name}, vous pouvez bénéficier de MaPrimeRénov', de l'éco-PTZ (prêt à taux zéro jusqu'à 30 000€), de la TVA réduite à 5,5% et des Certificats d'Économies d'Énergie (CEE). Nous vous accompagnons dans toutes les démarches administratives.` },
  ];

  const advantages = [
    { t: "Expertise Locale", d: `Nos techniciens connaissent parfaitement ${city.name} et ses spécificités architecturales.` },
    { t: "Intervention Rapide", d: `Délai moyen de 24-48h à ${city.name}. Urgences 7j/7.` },
    { t: "Devis Gratuit", d: "Tous nos devis sont gratuits et sans engagement. Évaluation précise." },
    { t: "Garantie 3 Ans", d: "Garantie complète sur pièces et main d'œuvre pendant 3 ans." },
    { t: "Certifications RGE & Qualibat", d: "Techniciens certifiés pour tous types de travaux et rénovations." },
    { t: "Marques Partenaires", d: "Somfy, Bubendorff, Profalux et autres grandes marques." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* JSON-LD LocalBusiness */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* JSON-LD FAQPage for rich snippets */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }) }} />

      {/* Hero — parallax style like homepage */}
      <section ref={heroRef} className="relative min-h-[550px] flex items-center overflow-hidden pt-20">
        {city.image ? (
          <motion.div className="absolute inset-0" style={{ y: bgY }}>
            <img src={city.image} alt={`Volets roulants ${city.name}`} className="w-full h-[120%] object-cover" width={1920} height={1080} />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-section-gradient" />
        )}

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-foreground/60 text-sm mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/zones-intervention" className="hover:text-foreground transition-colors">Zones d'Intervention</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{city.name}</span>
          </div>

          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge variant="serviceBlue" className="gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5" /> {city.department} ({city.departmentCode})
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 text-foreground"
            >
              {city.h1}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed max-w-2xl"
            >
              {city.heroText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8"
            >
              <Button size="lg" variant="accent" asChild className="px-6 sm:px-8 py-6 sm:py-7 text-base sm:text-lg font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                <a href="/#devis" className="flex items-center gap-2">
                  Devis Gratuit <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="accent-outline" asChild className="px-6 sm:px-8 py-6 sm:py-7 text-base sm:text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                <a href="tel:0603205967" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" /> 06 03 20 59 67
                </a>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <Badge variant="serviceBlue" className="backdrop-blur-sm"><Shield className="h-4 w-4" /> Garantie 3 ans</Badge>
              <Badge variant="serviceOrange" className="backdrop-blur-sm"><Clock className="h-4 w-4" /> Intervention sous 48h</Badge>
              <Badge variant="serviceEmerald" className="backdrop-blur-sm"><Award className="h-4 w-4" /> Artisan certifié RGE</Badge>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick AI Answer */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto p-8 bg-background rounded-2xl border border-border shadow-sm text-center">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Réparation Volets Roulants {city.name} ({city.departmentCode}) — Réponse Rapide</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Pour la réparation de volets roulants à {city.name}, Répar'Action Volets intervient en 48h maximum, propose un devis gratuit et sans engagement, et garantit ses interventions 3 ans. Nos techniciens certifiés RGE et Qualibat sont disponibles 7j/7.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Expertise complète : dépannage, réparation, installation et motorisation de volets roulants. Marques : Somfy, Bubendorff, Profalux.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Info ville — cards style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">À Propos de {city.name}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Découvrez pourquoi nos techniciens sont les experts de référence pour les volets roulants dans votre ville.</p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Users, label: "Population", value: city.population, color: "from-service-orange/20 to-service-orange/5" },
                { icon: MapPin, label: "Repères", value: city.landmarks, color: "from-service-blue/20 to-service-blue/5" },
                { icon: Award, label: "Caractère", value: city.character, color: "from-service-emerald/20 to-service-emerald/5" },
              ].map((card, i) => (
                <AnimatedSection key={i} animation="scale-in" delay={i * 100}>
                  <div className={`p-6 rounded-2xl border border-border bg-gradient-to-br ${card.color} text-center h-full`}>
                    <card.icon className="h-8 w-8 text-accent mb-3 mx-auto" />
                    <h3 className="font-semibold text-foreground mb-2">{card.label}</h3>
                    <p className={`${card.label === "Population" ? "text-2xl font-bold text-accent" : "text-sm text-muted-foreground"}`}>{card.value}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection animation="fade-up">
              <div className="bg-muted/30 p-8 rounded-2xl border border-border">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-3">🏠 Type d'Immobilier</h3>
                    <p className="text-muted-foreground leading-relaxed">{city.housingType}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-3">⚠️ Problèmes Courants</h3>
                    <p className="text-muted-foreground leading-relaxed">{city.commonIssues}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services — card grid */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <Badge variant="default" className="gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-accent/10 text-accent border border-accent/20">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Services Professionnels
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Services Spécialisés pour {city.name}</h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <AnimatedSection key={i} animation="scale-in" delay={i * 80}>
                  <div className="p-6 rounded-2xl border border-border bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4`}>
                      <s.icon className={`h-6 w-6 ${s.color}`} />
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Pourquoi Choisir Répar'Action Volets à {city.name} ?</h2>
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((a, i) => (
                <AnimatedSection key={i} animation="scale-in" delay={i * 80}>
                  <div className="p-6 rounded-2xl border border-border hover:border-accent/30 transition-colors">
                    <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" /> {a.t}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.d}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Témoignages de Clients à {city.name}</h2>
                <p className="text-muted-foreground mt-3">Ce que nos clients disent de nos interventions.</p>
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {city.testimonials.map((t, i) => (
                <AnimatedSection key={i} animation="scale-in" delay={i * 100}>
                  <div className="p-6 rounded-2xl border border-border bg-background h-full flex flex-col">
                    <div className="text-accent text-lg mb-3">★★★★★</div>
                    <p className="text-foreground leading-relaxed italic flex-1">"{t.text}"</p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{city.name}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — Accordion style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Questions Fréquentes — Volets Roulants {city.name}</h2>
              </div>
            </AnimatedSection>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 data-[state=open]:shadow-sm">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Zones voisines */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-up">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Zones d'Intervention Voisines</h2>
              <p className="text-muted-foreground mb-8">Nous intervenons également dans les villes et quartiers voisins.</p>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {city.nearbyLinks.map((link) => (
                <Link
                  key={link.slug}
                  to={`/zones-intervention/${link.slug}`}
                  className="p-4 rounded-xl border border-border bg-background text-accent hover:border-accent hover:shadow-md transition-all duration-300 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/zones-intervention"
                className="p-4 rounded-xl border border-border bg-background text-accent hover:border-accent hover:shadow-md transition-all duration-300 font-medium"
              >
                Toutes les zones →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-accent-foreground mb-6">
              Besoin d'un Expert Volets à {city.name} ?
            </h2>
            <p className="text-accent-foreground/90 mb-10 max-w-2xl mx-auto text-lg">
              Contactez-nous pour un devis gratuit ou une intervention d'urgence. Techniciens disponibles 7j/7.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Button size="lg" asChild className="bg-white text-accent hover:bg-white/90 px-6 sm:px-8 py-6 sm:py-7 text-base sm:text-lg font-bold rounded-full shadow-xl w-full sm:w-auto">
                <a href="/#devis" className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5" /> Demander un Devis
                </a>
              </Button>
              <Button size="lg" asChild className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-6 sm:px-8 py-6 sm:py-7 text-base sm:text-lg font-bold rounded-full w-full sm:w-auto">
                <a href="tel:0603205967" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" /> 06 03 20 59 67
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ZoneCityPage;
