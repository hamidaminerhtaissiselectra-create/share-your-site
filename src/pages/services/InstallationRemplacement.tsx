import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { RefreshCcw, CheckCircle2, ArrowRight, Phone, Shield, ChevronRight, Thermometer, Volume2, Sun, Ruler, Award, Clock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const imgInstallation = "/images/assets/service-installation-v2.webp";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QuoteFormSection from "@/components/QuoteFormSection";
import RepairShowcaseSection from "@/components/RepairShowcaseSection";
import LocalZonesGrid from "@/components/LocalZonesGrid";
import FAQSection from "@/components/FAQSection";
const installationTechnicianImg = "/images/assets/paris-vosges-installation.webp";
import { fadeUp, staggerItem, hoverLift, heroEntry } from "@/lib/animations";

const avantages = [
  { icon: Thermometer, title: "Isolation thermique renforcée", desc: "Les volets roulants modernes en aluminium offrent une isolation thermique jusqu'à 25% supérieure aux anciens modèles, réduisant significativement vos factures de chauffage et de climatisation.", color: "border-service-blue/20", iconColor: "bg-service-blue/10 text-service-blue" },
  { icon: Volume2, title: "Isolation phonique optimale", desc: "Le double paroi en aluminium avec mousse polyuréthane injectée absorbe les bruits extérieurs. Idéal pour les habitations situées en zone urbaine ou à proximité d'axes routiers.", color: "border-service-violet/20", iconColor: "bg-service-violet/10 text-service-violet" },
  { icon: Shield, title: "Sécurité anti-effraction", desc: "Les volets roulants neufs intègrent des systèmes anti-relevage et des verrous automatiques qui renforcent considérablement la sécurité de votre domicile.", color: "border-service-rose/20", iconColor: "bg-service-rose/10 text-service-rose" },
  { icon: Sun, title: "Gestion de la luminosité", desc: "Contrôlez précisément la lumière dans chaque pièce grâce à des lames orientables ou un réglage fin de la position du volet.", color: "border-service-orange/20", iconColor: "bg-service-orange/10 text-service-orange" },
];

const types = [
  { title: "Volets roulants en aluminium", desc: "Le choix le plus populaire. L'aluminium offre le meilleur rapport poids/résistance, une excellente isolation thermique et une durabilité exceptionnelle.", points: ["Léger et résistant", "Isolation thermique et phonique", "200+ coloris disponibles", "Durée de vie 20+ ans"], color: "border-service-blue/20", badge: "Populaire", badgeColor: "bg-service-blue/90 text-white border-service-blue", image: "/images/materiaux/alu.webp", data: ["Isolation : R=0.25", "Résistance : Haute", "Entretien : Nul"] },
  { title: "Volets roulants en PVC", desc: "Solution économique et performante, les volets en PVC offrent un bon niveau d'isolation et une grande facilité d'entretien.", points: ["Prix accessible", "Entretien minimal", "Bonne isolation", "Résistance aux UV"], color: "border-service-emerald/20", badge: "Économique", badgeColor: "bg-service-emerald/90 text-white border-service-emerald", image: "/images/materiaux/pvc.webp", data: ["Isolation : R=0.22", "Résistance : Moyenne", "Entretien : Eau savonneuse"] },
  { title: "Volets roulants solaires", desc: "Installation de volets solaires autonomes avec panneau photovoltaïque intégré. Idéaux en rénovation car ils ne nécessitent aucun raccordement électrique.", points: ["Zéro câblage", "Énergie gratuite", "Autonomie 45 jours", "Marques Somfy/Bubendorff"], color: "border-service-orange/20", badge: "Éco-Responsable", badgeColor: "bg-service-orange/90 text-white border-service-orange", image: "/images/materiaux/solaire.webp", data: ["Installation : 1h", "Batterie : 10 ans", "Économie : 100% élec"] },
];

const InstallationRemplacementPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useSEO({
    title: "Installation & Remplacement Volets Roulants Paris | Alu, PVC, Solaire Sur-Mesure | Répar'Action Volets",
    description: "Installation volet roulant sur-mesure à Paris & IDF : aluminium, PVC ou solaire Somfy/Bubendorff. Pose professionnelle, éligible MaPrimeRénov', garantie 3 ans. Devis gratuit personnalisé.",
    keywords: "installation volet roulant Paris, remplacement volet roulant, volet aluminium sur mesure, volet PVC, volet solaire Somfy, pose volet roulant IDF, artisan RGE installation volet",
    canonicalUrl: "https://reparaction-volets.fr/services/installation-remplacement-volets",
  });

  useEffect(() => {
    const serviceSchema = { "@context": "https://schema.org", "@type": "Service", "name": "Installation & Remplacement de Volets Roulants", "provider": { "@type": "LocalBusiness", "@id": "https://reparaction-volets.fr/#business" }, "areaServed": [{ "@type": "City", "name": "Paris" }, { "@type": "State", "name": "Île-de-France" }], "description": "Installation et remplacement de volets roulants sur-mesure en aluminium, PVC ou solaire. Éligible MaPrimeRénov'.", "serviceType": "Installation volet roulant", "offers": { "@type": "AggregateOffer", "priceCurrency": "EUR", "lowPrice": "350", "highPrice": "1200" } };
    const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://reparaction-volets.fr" }, { "@type": "ListItem", "position": 2, "name": "Installation & Remplacement", "item": "https://reparaction-volets.fr/services/installation-remplacement-volets" }] };
    const s1 = document.createElement('script'); s1.type = 'application/ld+json'; s1.innerHTML = JSON.stringify(serviceSchema); document.head.appendChild(s1);
    const s2 = document.createElement('script'); s2.type = 'application/ld+json'; s2.innerHTML = JSON.stringify(breadcrumbSchema); document.head.appendChild(s2);
    return () => { document.head.removeChild(s1); document.head.removeChild(s2); };
  }, []);

  return (
    <main id="main-content" className="relative">
      <Navbar />
      <section ref={heroRef} className="relative pt-24 pb-16 min-h-[60vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src={imgInstallation} alt="Installation de volets roulants" className="w-full h-[120%] object-cover" fetchPriority="high" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
        </motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-foreground/60 text-sm mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Installation & Remplacement de Volets</span>
          </div>
          <motion.div {...heroEntry(0)} className="max-w-3xl">
            <Badge variant="accent" className="gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <RefreshCcw className="h-3.5 w-3.5" /> Fabrication sur-mesure
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-foreground">
              Installation & Remplacement de Volets Roulants — Paris & Île-de-France
            </h1>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Transformez votre habitat avec des volets roulants neufs fabriqués sur-mesure. Aluminium ou PVC — nous vous accompagnons du choix du matériau à la pose professionnelle, avec garantie 3 ans.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" variant="accent" asChild className="px-8 py-7 text-lg font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-105">
                <a href="/#devis" className="flex items-center gap-2">Devis Gratuit Personnalisé <ArrowRight className="h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="accent-outline" asChild className="px-8 py-7 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105">
                <a href="tel:0603205967" className="flex items-center gap-2"><Phone className="h-5 w-5" /> 06 03 20 59 67</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="serviceBlue"><Shield className="h-4 w-4" /> Garantie 3 ans</Badge>
              <Badge variant="serviceEmerald"><CheckCircle2 className="h-4 w-4" /> Fabrication sur-mesure</Badge>
              <Badge variant="serviceOrange"><Sun className="h-4 w-4" /> Options solaires</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">
              <RefreshCcw className="h-3.5 w-3.5" /> Avantages
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi Installer ou Remplacer Vos Volets Roulants ?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Un investissement rentable pour le confort, la sécurité et la performance énergétique. Éligible <strong className="text-foreground">MaPrimeRénov'</strong> grâce à notre certification RGE.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {avantages.map((a, i) => (
              <motion.div key={a.title} {...staggerItem(i)} {...hoverLift}
                className={`bg-card rounded-xl p-6 border ${a.color} card-shadow hover:card-shadow-hover transition-all`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${a.iconColor} shadow-lg border border-white/10`}>
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-section-gradient">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">Matériaux</span>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Quel Matériau Choisir ?</h2>
            <p className="text-muted-foreground">Nous vous conseillons sur le meilleur choix selon vos besoins et votre budget.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {types.map((t, i) => (
              <motion.div key={t.title} {...staggerItem(i)} {...hoverLift}
                className={`group bg-card rounded-2xl border ${t.color} overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-500 flex flex-col`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Badge className={`absolute top-4 right-4 text-xs font-bold border ${t.badgeColor} shadow-md backdrop-blur-sm`}>{t.badge}</Badge>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{t.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-6 flex-1">{t.desc}</p>
                  <div className="grid grid-cols-1 gap-2 mb-6">
                    {t.points.map((p) => (
                      <div key={p} className="flex items-center gap-2 text-[10px] font-bold text-foreground/90 bg-muted/50 p-2 rounded-lg">
                        <CheckCircle2 className="h-3 w-3 text-service-emerald" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="accent" size="sm" className="w-full rounded-xl gap-2" asChild>
                    <a href="/#devis">Demander un devis</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection 
        title="Les Étapes de Votre Installation de Volets Roulants"
        subtitle="De la visite technique à la mise en service, découvrez comment nous installons vos volets roulants sur-mesure."
        detail="Chaque installation commence par une visite technique gratuite pour prendre les mesures exactes et évaluer les contraintes architecturales. Fabrication sur-mesure en usine, puis pose soignée par nos artisans certifiés RGE."
      />
      <QuoteFormSection />
      <RepairShowcaseSection image={installationTechnicianImg} title="Installation sur Mesure — Place des Vosges & Marais"
        description="Nous installons des volets roulants adaptés à chaque type d'architecture parisienne, des hôtels particuliers du Marais aux résidences de standing de Versailles. Notre expertise garantit une intégration parfaite, respectant l'esthétique de votre façade."
        highlights={["Adaptation aux contraintes architecturales parisiennes", "Installation propre sans dégradation de vos façades", "Respect du patrimoine historique et des copropriétés", "Nettoyage complet du chantier après intervention"]}
        stats={[
          { icon: Ruler, label: "Sur-mesure", value: "100%", color: "text-service-violet", iconBg: "bg-service-violet/10" },
          { icon: Award, label: "Durée de vie", value: "20+ ans", color: "text-service-emerald", iconBg: "bg-service-emerald/10" },
          { icon: Clock, label: "Pose", value: "½ journée", color: "text-service-blue", iconBg: "bg-service-blue/10" },
        ]}
      />
      <FAQSection
        title="Questions Fréquentes — Installation & Remplacement de Volets"
        subtitle="Tout savoir sur l'installation de volets roulants neufs : matériaux, prix, aides financières, durée des travaux."
        faqs={[
          { q: "Quel est le prix d'une installation de volet roulant neuf ?", a: "Comptez entre 350€ et 900€ par volet pose comprise (aluminium ou PVC). Les volets solaires Somfy/Bubendorff se situent entre 600€ et 1 200€. Devis gratuit après visite technique." },
          { q: "Aluminium ou PVC : quel matériau choisir ?", a: "L'aluminium offre le meilleur rapport poids/résistance, une isolation thermique supérieure et plus de 200 coloris. Le PVC est plus économique et suffisant pour les fenêtres standard. Nous vous conseillons selon vos besoins." },
          { q: "Combien de temps dure l'installation ?", a: "Comptez une demi-journée pour 1 à 3 volets, une journée complète pour 4 à 8 volets. L'installation est propre : nous protégeons vos sols et murs et nettoyons le chantier après intervention." },
          { q: "Puis-je bénéficier de MaPrimeRénov' pour mes volets ?", a: "Oui, notre certification RGE vous permet de bénéficier de MaPrimeRénov', de l'éco-PTZ et du crédit d'impôt pour l'installation de volets isolants. Nous vous accompagnons dans les démarches." },
          { q: "Installez-vous des volets solaires ?", a: "Oui, les volets solaires Somfy et Bubendorff sont notre spécialité. Autonomes avec panneau photovoltaïque intégré, ils ne nécessitent aucun raccordement électrique. Idéaux en rénovation." },
          { q: "Faut-il un permis ou une autorisation pour installer des volets ?", a: "En copropriété, l'accord du syndic est souvent nécessaire (respect de l'harmonie de la façade). En maison individuelle, une déclaration préalable de travaux peut être requise selon la commune. Nous vous guidons." },
        ]}
      />
      <TestimonialsSection priorityService="installation" title="Avis Clients — Installation & Remplacement de Volets" subtitle="Les retours de nos clients après l'installation de volets roulants neufs." />

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
                { label: "Motorisation & Domotique", href: "/services/motorisation-domotique" },
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
                { label: "Comment choisir son volet roulant", slug: "choisir-volet-roulant" },
                { label: "Isolation thermique et volets", slug: "isolation-thermique-volets-roulants" },
                { label: "Aides financières volets", slug: "aides-financieres-volets-roulants" },
              ].map((link) => (
                <Link key={link.slug} to={`/blog/${link.slug}`} className="text-xs text-accent hover:text-accent/80 font-medium underline-offset-4 hover:underline transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <LocalZonesGrid pageId="installation-remplacement" />
      <Footer />
    </main>
  );
};

export default InstallationRemplacementPage;
