import { motion } from "framer-motion";
import { Wrench, GlassWater, Cpu, LayoutGrid, Zap, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerItem, hoverLiftMd } from "@/lib/animations";
const imgReparation = "/images/assets/service-reparation-v2.webp";
const imgVitrerie = "/images/assets/service-vitrerie-v2.webp";
const imgMotorisation = "/images/assets/service-motorisation-v2.webp";
const imgComplete = "/images/assets/service-installation-v2.webp";
const imgDepannage = "/images/assets/service-depannage-v2.webp";

const services = [
  {
    icon: Zap, title: "Dépannage Express",
    desc: "Service de dépannage rapide pour volets bloqués ou moteurs en panne. Intervention le jour même.",
    badge: "Express", badgeColor: "bg-service-orange/90 text-white border-service-orange",
    iconBg: "bg-service-orange", iconShadow: "shadow-[0_4px_14px_hsl(25,90%,55%,0.35)]",
    cardBorder: "hover:border-service-orange/40", image: imgDepannage, link: "/services/depannage-express",
  },
  {
    icon: LayoutGrid, title: "Installation Complète",
    desc: "Prise de mesures, fabrication sur-mesure et pose professionnelle. Accompagnement complet de A à Z.",
    badge: "Clé en main", badgeColor: "bg-service-cyan/90 text-white border-service-cyan",
    iconBg: "bg-service-cyan", iconShadow: "shadow-[0_4px_14px_hsl(190,80%,45%,0.35)]",
    cardBorder: "hover:border-service-cyan/40", image: imgComplete, link: "/services/installation-remplacement-volets",
  },
  {
    icon: Wrench, title: "Réparation de Volets Roulants",
    desc: "Diagnostic et réparation de tous types de volets roulants : manuels, électriques, solaires. Intervention rapide sur tous mécanismes.",
    badge: "Le + demandé", badgeColor: "bg-service-blue/90 text-white border-service-blue",
    iconBg: "bg-service-blue", iconShadow: "shadow-[0_4px_14px_hsl(213,72%,50%,0.35)]",
    cardBorder: "hover:border-service-blue/40", image: imgReparation, link: "/services/reparation-volets-roulants",
  },
  {
    icon: Cpu, title: "Motorisation & Domotique",
    desc: "Motorisation de vos volets roulants et rideaux métalliques. Intégration domotique compatible Somfy, Google Home, Alexa.",
    badge: "Connecté", badgeColor: "bg-service-violet/90 text-white border-service-violet",
    iconBg: "bg-service-violet", iconShadow: "shadow-[0_4px_14px_hsl(260,65%,55%,0.35)]",
    cardBorder: "hover:border-service-violet/40", image: imgMotorisation, link: "/services/motorisation-domotique",
  },
  {
    icon: GlassWater, title: "Vitrerie & Vitrage",
    desc: "Remplacement de vitrage simple, double ou triple. Intervention d'urgence pour bris de glace 7j/7.",
    badge: "Urgence 7j/7", badgeColor: "bg-service-emerald/90 text-white border-service-emerald",
    iconBg: "bg-service-emerald", iconShadow: "shadow-[0_4px_14px_hsl(160,70%,40%,0.35)]",
    cardBorder: "hover:border-service-emerald/40", image: imgVitrerie, link: "/services/vitrerie-remplacement-vitrage",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-12 sm:py-16 md:py-20 bg-section-gradient relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">
          <Shield className="h-3.5 w-3.5" /> Solutions Complètes
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
          Nos 5 Services Spécialisés pour Vos Volets Roulants
        </h2>
        <p className="text-muted-foreground mb-3">
          Dépannage express, réparation, installation et motorisation de volets roulants. Expertise multimarques (Somfy, Bubendorff, Profalux, Simu, Nice), intervention rapide, garantie 3 ans pièces et main d'œuvre. Paris & Île-de-France.
        </p>
        <p className="text-muted-foreground text-sm">
          Nos techniciens certifiés RGE traitent chaque année plus de 500 interventions : volets bloqués, moteurs en panne, lames cassées, sangles usées, coffres endommagés, remplacement de tablier complet et pose de volets neufs sur-mesure en aluminium ou PVC. Éligible MaPrimeRénov' et éco-PTZ.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            {...staggerItem(i)}
            {...hoverLiftMd}
            className={`group bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-500 border border-border ${s.cardBorder} relative`}
          >
            <div className="relative h-52 overflow-hidden">
              <img src={s.image} alt={`${s.title} par Répar'Action Volets — artisan certifié RGE à Paris`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width={600} height={400} />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl ${s.iconBg} ${s.iconShadow} flex items-center justify-center border border-white/20 z-10`}>
                <s.icon className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <Badge className={`absolute top-4 right-4 text-xs font-bold border ${s.badgeColor} shadow-md backdrop-blur-sm`}>{s.badge}</Badge>
            </div>
            <div className="p-8 relative z-10">
              <h3 className="font-display font-bold text-xl text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{s.desc}</p>
              <Link to={s.link} className="inline-flex items-center gap-2 text-accent text-sm font-bold transition-all duration-300 group-hover:gap-3">
                Découvrir le service <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
