import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Cpu, CheckCircle2, ArrowRight, Phone, ChevronRight, Smartphone, Zap, Shield, Clock, Settings } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import imgMotorisation from "@/assets/service-motorisation-v2.webp";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QuoteFormSection from "@/components/QuoteFormSection";
import RepairShowcaseSection from "@/components/RepairShowcaseSection";
import LocalZonesGrid from "@/components/LocalZonesGrid";
import FAQSection from "@/components/FAQSection";
import motorizationWiredImg from "@/assets/motorization-wired.webp";
import motorizationRadioImg from "@/assets/motorization-radio.webp";
import motorizationSmartImg from "@/assets/motorization-smart.webp";
import motorizationTechnicianImg from "@/assets/paris-defense-motorisation.webp";
import { fadeUp, staggerItem, hoverLift, heroEntry } from "@/lib/animations";

const solutions = [
  { title: "Motorisation filaire", desc: "La solution la plus fiable et économique. Le moteur est commandé par un interrupteur mural fixe.", points: ["Prix accessible", "Très fiable", "Aucune pile à changer", "Installation simple"], prix: "à partir de 200€/volet", color: "border-service-blue/20", badgeColor: "bg-service-blue/90 text-white border-service-blue", image: motorizationWiredImg, data: ["Type : Filaire 230V", "Couple : 6 à 50 Nm", "Garantie : 5 ans"] },
  { title: "Motorisation radio (sans fil)", desc: "Le moteur est commandé par une télécommande sans fil. Plus de flexibilité, centralisation possible.", points: ["Télécommande sans fil", "Pas de câblage mural", "Centralisation possible", "Programmation horaire"], prix: "à partir de 300€/volet", color: "border-service-rose/20", badgeColor: "bg-service-rose/90 text-white border-service-rose", image: motorizationRadioImg, data: ["Protocole : RTS / io", "Portée : 20m (murs)", "Multi-canaux"] },
  { title: "Motorisation connectée", desc: "Contrôlez vos volets depuis votre smartphone. Compatible Somfy TaHoma, Google Home, Alexa, Apple HomeKit.", points: ["Contrôle smartphone", "Compatible assistants vocaux", "Scénarios automatisés", "Gestion à distance"], prix: "à partir de 450€/volet", color: "border-service-violet/20", badgeColor: "bg-service-violet/90 text-white border-service-violet", image: motorizationSmartImg, data: ["App : TaHoma / Home", "Feedback : Temps réel", "Cloud sécurisé"] },
];

const MotorisationDomotiquePage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useSEO({
    title: "Motorisation Volet Roulant Paris | Somfy, Radio, Connecté Google Home & Alexa | Répar'Action Volets",
    description: "Motorisez vos volets manuels à Paris & IDF : moteurs filaires, radio ou connectés Somfy TaHoma. Contrôle smartphone, Google Home, Alexa. Dès 200€/volet, garantie 5 ans moteur.",
    keywords: "motorisation volet roulant Paris, moteur volet Somfy, volet connecté Google Home, volet Alexa, domotique volet roulant, télécommande volet, motorisation sans fil",
    canonicalUrl: "https://reparaction-volets.fr/services/motorisation-domotique",
  });

  useEffect(() => {
    const serviceSchema = { "@context": "https://schema.org", "@type": "Service", "name": "Motorisation & Domotique Volets Roulants", "provider": { "@type": "LocalBusiness", "@id": "https://reparaction-volets.fr/#business" }, "areaServed": [{ "@type": "City", "name": "Paris" }, { "@type": "State", "name": "Île-de-France" }], "description": "Motorisation de volets manuels avec moteurs Somfy filaires, radio ou connectés. Compatible Google Home, Alexa.", "serviceType": "Motorisation volet roulant", "offers": { "@type": "AggregateOffer", "priceCurrency": "EUR", "lowPrice": "200", "highPrice": "450" }, "brand": [{ "@type": "Brand", "name": "Somfy" }, { "@type": "Brand", "name": "Bubendorff" }] };
    const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://reparaction-volets.fr" }, { "@type": "ListItem", "position": 2, "name": "Motorisation & Domotique", "item": "https://reparaction-volets.fr/services/motorisation-domotique" }] };
    const s1 = document.createElement('script'); s1.type = 'application/ld+json'; s1.innerHTML = JSON.stringify(serviceSchema); document.head.appendChild(s1);
    const s2 = document.createElement('script'); s2.type = 'application/ld+json'; s2.innerHTML = JSON.stringify(breadcrumbSchema); document.head.appendChild(s2);
    return () => { document.head.removeChild(s1); document.head.removeChild(s2); };
  }, []);

  return (
    <main id="main-content" className="relative">
      <Navbar />
      <section ref={heroRef} className="relative pt-24 pb-16 min-h-[60vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src={imgMotorisation} alt="Motorisation de volets roulants" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
        </motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-foreground/60 text-sm mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Motorisation & Domotique</span>
          </div>
          <motion.div {...heroEntry(0)} className="max-w-3xl">
            <Badge variant="accent" className="gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <Cpu className="h-3.5 w-3.5" /> Maison connectée
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-foreground">
              Motorisation & Domotique de Volets Roulants — Paris & Île-de-France
            </h1>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Transformez vos volets manuels en volets motorisés et connectés. Contrôle à distance, programmation horaire, scénarios automatisés — découvrez le confort de la maison intelligente.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" variant="accent" asChild className="px-8 py-7 text-lg font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-105">
                <a href="/#devis" className="flex items-center gap-2">Devis Gratuit <ArrowRight className="h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="accent-outline" asChild className="px-8 py-7 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105">
                <a href="tel:0603205967" className="flex items-center gap-2"><Phone className="h-5 w-5" /> 06 03 20 59 67</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="serviceViolet"><Cpu className="h-4 w-4" /> Domotique compatible</Badge>
              <Badge variant="serviceBlue"><Smartphone className="h-4 w-4" /> Contrôle smartphone</Badge>
              <Badge variant="serviceEmerald"><Shield className="h-4 w-4" /> Garantie 5 ans moteur</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">
              <Cpu className="h-3.5 w-3.5" /> Confort & Innovation
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi Motoriser Vos Volets Roulants ?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Plus de confort, plus de sécurité, plus d'économies d'énergie. La motorisation transforme votre quotidien.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Smartphone, label: "Contrôle smartphone", color: "bg-service-violet/10 text-service-violet", border: "border-service-violet/20" },
              { icon: Clock, label: "Programmation horaire", color: "bg-service-blue/10 text-service-blue", border: "border-service-blue/20" },
              { icon: Shield, label: "Simulation présence", color: "bg-service-emerald/10 text-service-emerald", border: "border-service-emerald/20" },
              { icon: Zap, label: "Économies d'énergie", color: "bg-service-orange/10 text-service-orange", border: "border-service-orange/20" },
            ].map((item, i) => (
              <motion.div key={item.label} {...staggerItem(i)}
                whileHover={{ y: -3, transition: { duration: 0.3 } }}
                className={`bg-card rounded-xl p-4 border ${item.border} card-shadow text-center transition-all`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${item.color} shadow-lg border border-white/10`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="font-display font-bold text-foreground text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-section-gradient">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">Solutions</span>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Nos Solutions de Motorisation</h2>
            <p className="text-muted-foreground">Chaque solution est adaptée à votre configuration et à vos besoins.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {solutions.map((s, i) => (
              <motion.div key={s.title} {...staggerItem(i)} {...hoverLift}
                className={`group bg-card rounded-2xl border ${s.color} overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-500 flex flex-col`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Badge className={`absolute top-4 right-4 text-xs font-bold border ${s.badgeColor} shadow-md backdrop-blur-sm`}>{s.prix}</Badge>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-6 flex-1">{s.desc}</p>
                  <div className="grid grid-cols-1 gap-2 mb-6">
                    {s.data.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[10px] font-bold text-foreground/90 bg-muted/50 p-2 rounded-lg">
                        <Settings className="h-3 w-3 text-accent" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-service-emerald shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                  <Button variant="accent" size="sm" className="w-full transition-all duration-300 rounded-xl" asChild>
                    <a href="/#devis">Motoriser mes volets</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection 
        title="Comment Motoriser Vos Volets Roulants Existants ?"
        subtitle="De l'audit de vos volets actuels à la configuration de votre application smartphone, voici le processus de motorisation."
        detail="Nous motorisons vos volets manuels sans travaux de maçonnerie. Le moteur tubulaire est installé directement dans le tube d'enroulement existant. Compatibilité Somfy TaHoma, Google Home, Alexa, Apple HomeKit."
      />
      <QuoteFormSection />
      <RepairShowcaseSection image={motorizationTechnicianImg} title="Motorisation Connectée — La Défense & Bureaux IDF"
        description="Du quartier d'affaires de La Défense aux résidences modernes d'Île-de-France, nous motorisons et connectons vos volets aux dernières technologies smart home. Solutions adaptées aux immeubles tertiaires et résidentiels."
        highlights={["Motorisation adaptée aux bureaux et résidences modernes", "Installation de moteurs silencieux et performants", "Configuration domotique et appairage smartphone", "Compatibilité Google Home, Alexa, Apple HomeKit"]}
        stats={[
          { icon: Smartphone, label: "Connecté", value: "100%", color: "text-service-violet", iconBg: "bg-service-violet/10" },
          { icon: Shield, label: "Garantie moteur", value: "5 ans", color: "text-service-emerald", iconBg: "bg-service-emerald/10" },
          { icon: Settings, label: "Marques", value: "Somfy/Bubendorff", color: "text-service-blue", iconBg: "bg-service-blue/10" },
        ]}
      />
      <FAQSection
        title="Questions Fréquentes — Motorisation & Domotique Volets Roulants"
        subtitle="Tout savoir sur la motorisation de volets : prix, compatibilité domotique, types de moteurs, installation."
        faqs={[
          { q: "Peut-on motoriser n'importe quel volet roulant manuel ?", a: "Oui, dans 95% des cas. Un moteur tubulaire s'installe dans le tube d'enroulement existant sans modifier le coffre ni la façade. Seuls les très anciens modèles à treuil peuvent nécessiter une adaptation." },
          { q: "Quel est le prix de la motorisation d'un volet ?", a: "Comptez à partir de 200€/volet pour un moteur filaire, 300€ pour un moteur radio, et 450€ pour un moteur connecté compatible smartphone. Remises dégressives pour plusieurs volets." },
          { q: "Mes volets motorisés seront-ils compatibles Google Home / Alexa ?", a: "Oui, avec les moteurs Somfy io-homecontrol et la box TaHoma. Nous configurons entièrement votre installation : appairage des volets, création de scénarios automatisés, programmation horaire." },
          { q: "Combien de temps dure la motorisation d'un volet ?", a: "1 à 2 heures par volet. Pour un logement complet (5-8 volets), comptez une journée. L'installation est propre et ne nécessite aucun travaux de maçonnerie." },
          { q: "Que se passe-t-il en cas de coupure de courant ?", a: "Tous les moteurs que nous installons disposent d'un déverrouillage manuel de secours. Les volets solaires sont autonomes grâce à leur batterie (45 jours d'autonomie). Les moteurs radio fonctionnent aussi sur pile de secours." },
          { q: "Peut-on centraliser tous les volets sur une seule télécommande ?", a: "Oui, la centralisation est l'un de nos points forts. Une télécommande multicanaux ou l'application Somfy TaHoma vous permet de piloter tous vos volets simultanément ou individuellement." },
        ]}
      />
      <TestimonialsSection priorityService="motorisation" title="Avis Clients — Motorisation & Domotique" subtitle="Les avis de nos clients après la motorisation de leurs volets roulants." />

      {/* Maillage interne contextuel */}
      <section className="py-12 bg-section-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Services Complémentaires</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Découvrez nos autres services pour vos volets roulants et votre vitrerie.</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { label: "Réparation de volets", href: "/services/reparation-volets-roulants" },
                { label: "Dépannage Express", href: "/services/depannage-express" },
                { label: "Installation & Remplacement", href: "/services/installation-remplacement-volets" },
                { label: "Vitrerie & Vitrage", href: "/services/vitrerie-remplacement-vitrage" },
              ].map((s) => (
                <Link key={s.href} to={s.href} className="px-4 py-2 rounded-full border border-border bg-card text-sm font-semibold text-accent hover:border-accent hover:shadow-md transition-all duration-300">
                  {s.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <p className="w-full text-sm font-semibold text-foreground mb-2">📖 Articles utiles :</p>
              {[
                { label: "Guide motorisation volets", slug: "guide-motorisation-volets" },
                { label: "Domotique et volets connectés", slug: "domotique-volets-roulants" },
                { label: "Somfy vs Bubendorff", slug: "somfy-vs-bubendorff" },
              ].map((link) => (
                <Link key={link.slug} to={`/blog/${link.slug}`} className="text-xs text-accent hover:text-accent/80 font-medium underline-offset-4 hover:underline transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <LocalZonesGrid pageId="motorisation-domotique" />
      <Footer />
    </main>
  );
};

export default MotorisationDomotiquePage;
