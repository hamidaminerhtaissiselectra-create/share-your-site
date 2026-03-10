import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Wrench, ArrowRight, Phone, ChevronRight, AlertTriangle, CheckCircle2, Shield, Clock, Award, Zap } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const imgReparation = "/images/assets/service-reparation-v2.webp";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QuoteFormSection from "@/components/QuoteFormSection";
import RepairShowcaseSection from "@/components/RepairShowcaseSection";
import LocalZonesGrid from "@/components/LocalZonesGrid";
import FAQSection from "@/components/FAQSection";
const repairTechnicianImg = "/images/assets/paris-haussmann-reparation.webp";
import { fadeUp, staggerItem, hoverLift, heroEntry } from "@/lib/animations";

const pannesCourantes = [
  { title: "Volet roulant bloqué", desc: "Votre volet ne monte plus ou ne descend plus ? Le problème peut venir d'une lame cassée, d'un axe d'enroulement tordu ou d'un verrou bloqué.", urgence: true, color: "border-service-rose/20", image: "/images/pannes/volet-bloque.webp", data: ["Diagnostic en 15 min", "Pièces d'origine", "Réparation immédiate"] },
  { title: "Sangle ou manivelle cassée", desc: "La sangle est effilochée ou la manivelle ne tourne plus ? Remplacement rapide par un mécanisme neuf, identique ou amélioré.", urgence: false, color: "border-service-blue/20", image: "/images/pannes/sangle-cassee.webp", data: ["Sangles haute résistance", "Manivelles renforcées", "Pose incluse"] },
  { title: "Moteur électrique HS", desc: "Le moteur ne répond plus, fait un bruit anormal ou surchauffe ? Diagnostic du condensateur, du câblage et du moteur.", urgence: false, color: "border-service-orange/20", image: "/images/pannes/moteur-hs.webp", data: ["Moteurs Somfy/Bubendorff", "Garantie 5 ans moteur", "Réglage fins de course"] },
  { title: "Lames abîmées ou tordues", desc: "Lames fissurées, déformées ou arrachées par le vent ? Remplacement à l'identique sans démonter tout le volet.", urgence: false, color: "border-service-emerald/20", image: "/images/pannes/lames-abimees.webp", data: ["Lames PVC ou Alu", "Coloris sur mesure", "Isolation renforcée"] },
  { title: "Tablier sorti des rails", desc: "Le tablier s'est décalé et ne glisse plus correctement dans les coulisses ? Remise en place et ajustement.", urgence: true, color: "border-service-violet/20", image: "/images/pannes/tablier-sorti.webp", data: ["Remise en axe", "Nettoyage coulisses", "Graissage silicone"] },
  { title: "Télécommande ou récepteur HS", desc: "Votre volet électrique ne répond plus à la télécommande ? Reprogrammation, changement de pile ou remplacement du récepteur.", urgence: false, color: "border-service-cyan/20", image: "/images/pannes/telecommande-hs.webp", data: ["Centralisation possible", "Émetteurs radio", "Domotique compatible"] },
];

const ReparationVoletsPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useSEO({
    title: "Réparation de Volets Roulants à Paris | Volet Bloqué, Moteur HS, Sangle Cassée | Répar'Action Volets",
    description: "Expert réparation volet roulant à Paris & IDF. Volet bloqué, moteur Somfy/Bubendorff en panne, sangle cassée ? Diagnostic gratuit, intervention sous 48h, garantie 3 ans pièces & MO. Devis en ligne.",
    keywords: "réparation volet roulant Paris, dépannage volet roulant, volet bloqué Paris, moteur volet Somfy, sangle volet cassée, artisan RGE volet, réparation volet Île-de-France",
    canonicalUrl: "https://reparaction-volets.fr/services/reparation-volets-roulants",
  });

  useEffect(() => {
    const serviceSchema = {
      "@context": "https://schema.org", "@type": "Service",
      "name": "Réparation de Volets Roulants",
      "provider": { "@type": "LocalBusiness", "@id": "https://reparaction-volets.fr/#business" },
      "areaServed": [{ "@type": "City", "name": "Paris" }, { "@type": "State", "name": "Île-de-France" }],
      "description": "Réparation rapide de tous types de volets roulants : manuels, électriques, solaires. Diagnostic gratuit, devis transparent, garantie 3 ans pièces et main d'œuvre.",
      "serviceType": "Réparation volet roulant",
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "price": "80-350" }
    };
    const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://reparaction-volets.fr" },
      { "@type": "ListItem", "position": 2, "name": "Réparation de Volets Roulants", "item": "https://reparaction-volets.fr/services/reparation-volets-roulants" }
    ]};
    const s1 = document.createElement('script'); s1.type = 'application/ld+json'; s1.innerHTML = JSON.stringify(serviceSchema); document.head.appendChild(s1);
    const s2 = document.createElement('script'); s2.type = 'application/ld+json'; s2.innerHTML = JSON.stringify(breadcrumbSchema); document.head.appendChild(s2);
    return () => { document.head.removeChild(s1); document.head.removeChild(s2); };
  }, []);

  return (
    <main id="main-content" className="relative">
      <Navbar />
      <section ref={heroRef} className="relative pt-24 pb-16 min-h-[60vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src={imgReparation} alt="Réparation de volets roulants" className="w-full h-[120%] object-cover" fetchPriority="high" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
        </motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-foreground/60 text-sm mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Réparation de Volets Roulants</span>
          </div>
          <motion.div {...heroEntry(0)} className="max-w-3xl">
            <Badge variant="accent" className="gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <Wrench className="h-3.5 w-3.5" /> Expertise technique
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-foreground">
              Réparation de Volets Roulants — Paris & Île-de-France
            </h1>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Volet bloqué, moteur en panne, sangle cassée ? Nos techniciens experts interviennent rapidement pour diagnostiquer et réparer votre volet roulant. Diagnostic gratuit, pièces en stock, garantie 3 ans.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" variant="accent" asChild className="px-8 py-7 text-lg font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-105">
                <a href="/#devis" className="flex items-center gap-2">Demander un Devis Gratuit <ArrowRight className="h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="accent-outline" asChild className="px-8 py-7 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105">
                <a href="tel:0603205967" className="flex items-center gap-2"><Phone className="h-5 w-5" /> 06 03 20 59 67</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="serviceBlue"><Shield className="h-4 w-4" /> Garantie 3 ans</Badge>
              <Badge variant="serviceOrange"><Clock className="h-4 w-4" /> Intervention sous 48h</Badge>
              <Badge variant="serviceEmerald"><Award className="h-4 w-4" /> Artisan certifié RGE</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-section-gradient">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">Pannes Courantes</span>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Les Pannes que Nous Réparons</h2>
            <p className="text-muted-foreground">Quelle que soit votre panne, nous avons la solution. Diagnostic gratuit et rapide.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pannesCourantes.map((p, i) => (
              <motion.div key={p.title} {...staggerItem(i)} {...hoverLift}
                className={`group bg-card rounded-2xl border ${p.color} overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-500 flex flex-col`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {p.urgence && (
                    <Badge className="absolute top-4 right-4 text-xs font-bold border bg-service-rose/90 text-white border-service-rose shadow-md backdrop-blur-sm gap-1">
                      <AlertTriangle className="h-3 w-3" /> Urgence
                    </Badge>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>
                  <div className="space-y-2 mb-6">
                    {p.data.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs font-semibold text-foreground/90">
                        <CheckCircle2 className="h-3.5 w-3.5 text-service-emerald flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="accent" className="w-full transition-all duration-300 rounded-xl" asChild>
                    <a href="/#devis">Réparer mon volet</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection 
        title="Comment Se Déroule une Réparation de Volet Roulant ?"
        subtitle="De votre appel à la remise en état complète de votre volet, voici les étapes de notre intervention de réparation."
        detail="Nos techniciens arrivent équipés des pièces les plus courantes (lames, sangles, moteurs Somfy/Bubendorff). 95% des réparations sont finalisées au premier passage, en 1 à 2 heures."
      />
      <QuoteFormSection />
      <RepairShowcaseSection image={repairTechnicianImg} title="Intervention Rapide à Paris — Quartiers Haussmanniens"
        description="Nous intervenons dans tous les arrondissements de Paris, des immeubles haussmanniens du 7e et 16e aux résidences du Marais et de Montmartre. Nos techniciens connaissent les spécificités des volets roulants parisiens et disposent de pièces adaptées à chaque type de bâtiment."
        highlights={["Intervention dans tous les arrondissements de Paris", "Expertise des immeubles haussmanniens et historiques", "Pièces de rechange en stock dans le véhicule", "Garantie 3 ans pièces et main d'œuvre"]}
        stats={[
          { icon: Zap, label: "Diagnostic", value: "15 min", color: "text-service-blue", iconBg: "bg-service-blue/10" },
          { icon: Shield, label: "Garantie", value: "3 ans", color: "text-service-emerald", iconBg: "bg-service-emerald/10" },
          { icon: Award, label: "Satisfaction", value: "98%", color: "text-service-orange", iconBg: "bg-service-orange/10" },
        ]}
      />
      <FAQSection
        title="Questions Fréquentes — Réparation de Volets Roulants"
        subtitle="Tout savoir sur la réparation de volets roulants : prix, délais, garantie, marques compatibles."
        faqs={[
          { q: "Combien coûte la réparation d'un volet roulant à Paris ?", a: "Le coût varie selon la panne : remplacement de sangle (60-120€), changement de moteur (180-350€), remplacement de lames (80-200€). Diagnostic gratuit et devis détaillé avant intervention." },
          { q: "Réparez-vous les volets de toutes les marques ?", a: "Oui, nous intervenons sur toutes les marques : Somfy, Bubendorff, Profalux, Franciaflex, Simu, Nice, Becker, Came, Zurflüh-Feller. Pièces d'origine garanties." },
          { q: "En combien de temps mon volet sera-t-il réparé ?", a: "95% des réparations sont finalisées en 1 à 2 heures au premier passage. Nos véhicules sont équipés des pièces les plus courantes pour éviter un second déplacement." },
          { q: "Quelle garantie sur la réparation ?", a: "Toutes nos réparations sont garanties 3 ans pièces et main d'œuvre. Nous utilisons exclusivement des pièces d'origine certifiées par les fabricants." },
          { q: "Mon volet est bloqué en position ouverte, que faire ?", a: "Appelez immédiatement le 06 03 20 59 67. Un volet bloqué ouvert représente un risque de sécurité. Nous intervenons en priorité pour sécuriser votre domicile, 7j/7." },
          { q: "Faut-il remplacer mon volet ou peut-on le réparer ?", a: "Dans 80% des cas, la réparation est possible et plus économique. Nous vous conseillons honnêtement : si le volet a plus de 20 ans ou que le caisson est endommagé, le remplacement peut être préférable." },
        ]}
      />
      <TestimonialsSection priorityService="réparation" title="Avis Clients — Réparation de Volets Roulants" subtitle="Ce que nos clients disent de nos interventions de réparation à Paris et en Île-de-France." />

      {/* Maillage interne contextuel */}
      <section className="py-12 bg-section-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Services Complémentaires</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Découvrez nos autres services pour vos volets roulants et votre vitrerie.</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { label: "Dépannage Express", href: "/services/depannage-express" },
                { label: "Installation & Remplacement", href: "/services/installation-remplacement-volets" },
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
                { label: "Pannes fréquentes et solutions", slug: "pannes-frequentes-volets-roulants" },
                { label: "Réparation ou remplacement ?", slug: "reparation-vs-remplacement" },
                { label: "Entretien des volets roulants", slug: "entretien-volets-roulants" },
              ].map((link) => (
                <Link key={link.slug} to={`/blog/${link.slug}`} className="text-xs text-accent hover:text-accent/80 font-medium underline-offset-4 hover:underline transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <LocalZonesGrid pageId="reparation-volets" />
      <Footer />
    </main>
  );
};

export default ReparationVoletsPage;
