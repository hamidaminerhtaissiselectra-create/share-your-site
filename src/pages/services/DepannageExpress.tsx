import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, ArrowRight, Phone, ChevronRight, Clock, Shield, AlertTriangle, Wrench, ShieldAlert } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const imgDepannage = "/images/assets/service-depannage-v2.webp";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QuoteFormSection from "@/components/QuoteFormSection";
import RepairShowcaseSection from "@/components/RepairShowcaseSection";
import LocalZonesGrid from "@/components/LocalZonesGrid";
import FAQSection from "@/components/FAQSection";
const emergencyTechnicianImg = "/images/assets/paris-sacre-coeur-depannage.webp";
import { fadeUp, staggerItem, hoverLift, heroEntry } from "@/lib/animations";

const situations = [
  { title: "Urgence Nocturne & Sécurité", desc: "Volet bloqué en position ouverte la nuit ou suite à une panne moteur ? Nous intervenons pour sécuriser votre domicile immédiatement.", urgency: "CRITIQUE", badgeColor: "bg-service-rose/90 text-white border-service-rose", color: "border-service-rose/30", image: "/images/depannage/nuit.webp", data: ["Intervention : < 1h", "Dispo : 24h/24", "Sécurisation : Immédiate"] },
  { title: "Tentative d'Effraction", desc: "Votre volet a été forcé ou endommagé ? Nous réparons les lames, les coulisses et renforçons la sécurité de votre installation.", urgency: "HAUTE", badgeColor: "bg-service-orange/90 text-white border-service-orange", color: "border-service-orange/30", image: "/images/depannage/effraction.webp", data: ["Réparation : Lames/Axe", "Renfort : Anti-relevage", "Assurance : Devis agréé"] },
  { title: "Dégâts Intempéries", desc: "Grêle, tempête ou vent violent ? Si votre volet est sorti de ses rails ou si le tablier est abîmé, nous intervenons rapidement.", urgency: "MOYENNE", badgeColor: "bg-service-blue/90 text-white border-service-blue", color: "border-service-blue/30", image: "/images/depannage/intemperies.webp", data: ["Diagnostic : Structurel", "Pièces : Tablier/Lames", "Garantie : 2 ans"] },
];

const engagements = [
  { icon: Clock, title: "Intervention le jour même", desc: "Pour les urgences de sécurité, nous nous engageons à intervenir le jour même à Paris et en Île-de-France.", color: "bg-service-orange", border: "border-service-orange/20" },
  { icon: Shield, title: "Diagnostic offert", desc: "Pas de frais de déplacement, pas de frais de diagnostic. Transparence totale.", color: "bg-service-emerald", border: "border-service-emerald/20" },
  { icon: Wrench, title: "Pièces en stock", desc: "Nos véhicules sont équipés des pièces les plus courantes. 95% des pannes résolues au premier passage.", color: "bg-service-blue", border: "border-service-blue/20" },
  { icon: AlertTriangle, title: "Disponible 7j/7", desc: "Urgences traitées 7 jours sur 7, y compris les week-ends et jours fériés.", color: "bg-service-rose", border: "border-service-rose/20" },
];

const DepannageExpressPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useSEO({
    title: "Dépannage Express Volets Roulants Paris | Urgence 7j/7, Jour Même | Répar'Action Volets",
    description: "Dépannage express volet roulant bloqué à Paris & IDF. Intervention le jour même 7j/7, urgences nocturnes, effraction, intempéries. Diagnostic gratuit, techniciens certifiés RGE.",
    keywords: "dépannage express volet roulant, urgence volet bloqué Paris, intervention jour même volet, dépannage volet 7j/7, volet roulant en panne urgence",
    canonicalUrl: "https://reparaction-volets.fr/services/depannage-express",
  });

  useEffect(() => {
    const serviceSchema = { "@context": "https://schema.org", "@type": "Service", "name": "Dépannage Express Volets Roulants", "provider": { "@type": "LocalBusiness", "@id": "https://reparaction-volets.fr/#business" }, "areaServed": [{ "@type": "City", "name": "Paris" }, { "@type": "State", "name": "Île-de-France" }], "description": "Service de dépannage express pour volets roulants bloqués ou en panne. Intervention le jour même 7j/7.", "serviceType": "Dépannage urgence volet roulant" };
    const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://reparaction-volets.fr" }, { "@type": "ListItem", "position": 2, "name": "Dépannage Express", "item": "https://reparaction-volets.fr/services/depannage-express" }] };
    const s1 = document.createElement('script'); s1.type = 'application/ld+json'; s1.innerHTML = JSON.stringify(serviceSchema); document.head.appendChild(s1);
    const s2 = document.createElement('script'); s2.type = 'application/ld+json'; s2.innerHTML = JSON.stringify(breadcrumbSchema); document.head.appendChild(s2);
    return () => { document.head.removeChild(s1); document.head.removeChild(s2); };
  }, []);

  return (
    <main id="main-content" className="relative">
      <Navbar />
      <section ref={heroRef} className="relative pt-24 pb-16 min-h-[60vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src={imgDepannage} alt="Dépannage express volets roulants" className="w-full h-[120%] object-cover" fetchPriority="high" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
        </motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-foreground/60 text-sm mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Dépannage Express</span>
          </div>
          <motion.div {...heroEntry(0)} className="max-w-3xl">
            <Badge variant="accent" className="gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5" /> Intervention rapide
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-foreground">
              Dépannage Express Volets Roulants — Paris & Île-de-France
            </h1>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Volet bloqué ? Moteur en panne ? Vitre cassée ? Notre service de dépannage express intervient dans les plus brefs délais pour rétablir la sécurité et le confort de votre habitat. Disponible 7j/7, diagnostic gratuit, pièces en stock.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" variant="accent" asChild className="px-8 py-7 text-lg font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-105">
                <a href="tel:0603205967" className="flex items-center gap-2"><Phone className="h-5 w-5" /> Appeler Maintenant</a>
              </Button>
              <Button size="lg" variant="accent-outline" asChild className="px-8 py-7 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105">
                <a href="/#devis" className="flex items-center gap-2">Demander un Devis <ArrowRight className="h-5 w-5" /></a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="serviceRose"><AlertTriangle className="h-4 w-4" /> Urgence 7j/7</Badge>
              <Badge variant="serviceOrange"><Clock className="h-4 w-4" /> Intervention le jour même</Badge>
              <Badge variant="serviceEmerald"><Shield className="h-4 w-4" /> Diagnostic offert</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">Nos Engagements</span>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Nos Engagements Dépannage Express</h2>
            <p className="text-muted-foreground">Un service d'urgence fiable, transparent et efficace — c'est la promesse Répar'Action Volets.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {engagements.map((e, i) => (
              <motion.div key={e.title} {...staggerItem(i)} {...hoverLift}
                className={`bg-card rounded-xl p-6 border ${e.border} card-shadow hover:card-shadow-hover text-center transition-all`}>
                <div className={`w-14 h-14 rounded-2xl ${e.color} flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/20`}>
                  <e.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2 text-sm">{e.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-section-gradient">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">Urgences</span>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Les Situations que Nous Traitons en Urgence</h2>
            <p className="text-muted-foreground">Quelle que soit la panne, nous avons la solution pour la résoudre rapidement.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {situations.map((s, i) => (
              <motion.div key={s.title} {...staggerItem(i)} {...hoverLift}
                className={`group bg-card rounded-2xl border ${s.color} overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-500 flex flex-col`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Badge className={`absolute top-4 right-4 text-xs font-bold border ${s.badgeColor} shadow-md backdrop-blur-sm`}>{s.urgency}</Badge>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    {s.data.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs font-semibold text-foreground/90">
                        <ShieldAlert className="h-5 w-5 text-service-rose flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="accent" size="sm" className="w-full rounded-xl gap-2 mt-auto" asChild>
                    <a href="tel:0603205967"><Phone className="h-4 w-4" /> Urgence 24h/7j</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection 
        title="Comment Fonctionne Notre Dépannage Express ?"
        subtitle="Un processus optimisé pour résoudre votre urgence le plus rapidement possible, du premier appel à la résolution complète."
        detail="Notre service d'urgence est conçu pour les situations critiques : volet bloqué ouvert la nuit, tentative d'effraction, dégâts d'intempéries. Nos techniciens d'astreinte interviennent dans l'heure à Paris."
      />
      <QuoteFormSection />
      <RepairShowcaseSection image={emergencyTechnicianImg} title="Dépannage Urgence à Paris — Montmartre & Sacré-Cœur"
        description="De jour comme de nuit, nos équipes sillonnent Paris pour résoudre vos urgences volets. Du quartier de Montmartre aux Grands Boulevards, nous intervenons dans l'heure pour sécuriser votre domicile."
        highlights={["Intervention dans l'heure à Paris et petite couronne", "Disponibilité 24h/24, 7 jours sur 7", "Connaissance parfaite des quartiers parisiens", "Diagnostic gratuit et transparence totale"]}
        stats={[
          { icon: Clock, label: "Réactivité", value: "< 1h", color: "text-service-rose", iconBg: "bg-service-rose/10" },
          { icon: Shield, label: "Dispo", value: "7j/7", color: "text-service-blue", iconBg: "bg-service-blue/10" },
          { icon: Wrench, label: "Résolu 1er passage", value: "95%", color: "text-service-emerald", iconBg: "bg-service-emerald/10" },
        ]}
      />
      <FAQSection
        title="Questions Fréquentes — Dépannage Express Volets Roulants"
        subtitle="Réponses à vos questions sur notre service de dépannage d'urgence pour volets roulants."
        faqs={[
          { q: "Intervenez-vous la nuit pour un volet bloqué ?", a: "Oui, notre service d'astreinte couvre les urgences nocturnes à Paris et petite couronne. Un volet bloqué en position ouverte la nuit est traité en priorité absolue. Appelez le 06 03 20 59 67." },
          { q: "Quel est le délai d'intervention en urgence ?", a: "À Paris intra-muros, nous intervenons généralement en moins d'1 heure. En petite couronne (92, 93, 94), comptez 1 à 2 heures. En grande couronne, intervention le jour même." },
          { q: "Y a-t-il un surcoût pour le dépannage le week-end ?", a: "Un forfait week-end/jour férié s'applique (majoration de 30€). Cependant, le diagnostic reste gratuit et le devis est établi avant toute intervention. Aucune surprise." },
          { q: "Que faire en attendant le technicien si mon volet est bloqué ouvert ?", a: "Sécurisez votre domicile : fermez les fenêtres et portes, allumez les lumières visibles de l'extérieur. Si c'est une tentative d'effraction, contactez aussi la police." },
          { q: "Pouvez-vous intervenir après une tentative de cambriolage ?", a: "Absolument. Nous réparons les lames forcées, remettons en état les coulisses et installons des dispositifs anti-relevage renforcés. Nous fournissons un devis agréé par les assurances." },
          { q: "Le dépannage est-il couvert par mon assurance habitation ?", a: "Dans la plupart des cas, oui. Les interventions suite à effraction ou intempéries sont couvertes par votre assurance. Nous établissons un devis conforme aux exigences des assureurs." },
        ]}
      />
      <TestimonialsSection priorityService="dépannage" title="Avis Clients — Dépannage Express Volets Roulants" subtitle="Témoignages de nos clients secourus en urgence pour des pannes de volets roulants." />

      {/* Maillage interne contextuel */}
      <section className="py-12 bg-section-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Services Complémentaires</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Découvrez nos autres services pour vos volets roulants et votre vitrerie.</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { label: "Réparation de volets", href: "/services/reparation-volets-roulants" },
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
                { label: "Volet roulant bloqué : que faire ?", slug: "volet-roulant-bloque-que-faire" },
                { label: "Pannes fréquentes et solutions", slug: "pannes-frequentes-volets-roulants" },
                { label: "Prix réparation volets", slug: "prix-reparation-volet-roulant" },
              ].map((link) => (
                <Link key={link.slug} to={`/blog/${link.slug}`} className="text-xs text-accent hover:text-accent/80 font-medium underline-offset-4 hover:underline transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <LocalZonesGrid pageId="depannage-express" />
      <Footer />
    </main>
  );
};

export default DepannageExpressPage;
