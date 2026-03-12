import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Clock, Award, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

// Image chargée depuis /public pour optimiser le bundle
const heroImg = "/images/assets/hero-shutters.webp";

const badges = [
  { icon: Shield, text: "Garantie 3 ans pièces & MO", variant: "serviceBlue" },
  { icon: Clock, text: "Intervention sous 48h", variant: "serviceOrange" },
  { icon: Award, text: "Artisan certifié RGE", variant: "serviceEmerald" },
];

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section ref={ref} id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img 
          src={heroImg} 
          alt="Réparation et installation de volets roulants à Paris par Répar'Action Volets, artisan certifié RGE" 
          className="w-full h-[120%] object-cover"
          width={1920}
          height={1280}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
      </motion.div>

      <motion.div style={{ opacity }} className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-8 backdrop-blur-sm">
              <Shield className="h-4 w-4" />
              Artisan Certifié RGE — Expert Volets Roulants Paris & Île-de-France depuis 10 ans
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 sm:mb-8 text-foreground"
          >
            Dépannage, Réparation & Motorisation de <span className="text-accent">Volets Roulants</span> à Paris
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 max-w-2xl leading-relaxed hero-description"
          >
            Répar'Action Volets, votre spécialiste du dépannage, de la réparation, installation et motorisation de volets roulants à Paris et en Île-de-France. Techniciens certifiés RGE, intervention rapide sous 48h, diagnostic 100% gratuit et garantie 3 ans pièces & main d'œuvre.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-sm sm:text-base text-muted-foreground/80 mb-8 sm:mb-10 max-w-2xl leading-relaxed hidden sm:block"
          >
            Que votre volet soit bloqué en position ouverte, que le moteur Somfy ou Bubendorff émette un bourdonnement sans bouger, ou que vous souhaitiez passer à la motorisation connectée avec pilotage smartphone — nos artisans qualifiés interviennent dans tous les arrondissements de Paris (du 1er au 20e), à Boulogne-Billancourt, Neuilly, Saint-Denis, Versailles et dans plus de 50 communes d'Île-de-France. Devis transparent, sans surprise ni frais cachés.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <Button size="lg" variant="accent" asChild className="px-6 sm:px-8 py-6 sm:py-7 text-base sm:text-lg font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <a href="/#devis" className="flex items-center gap-2">
                Demander un Devis Gratuit <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="accent-outline" asChild className="px-6 sm:px-8 py-6 sm:py-7 text-base sm:text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <a href="tel:0603205967" className="flex items-center gap-2">
                <Phone className="h-5 w-5" /> 06 03 20 59 67
              </a>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            {badges.map((b, i) => (
              <motion.div 
                key={b.text} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-bold backdrop-blur-sm"
              >
                <Badge variant={b.variant as "serviceBlue" | "serviceOrange" | "serviceEmerald"}>
                  <b.icon className="h-5 w-5" />
                  <span>{b.text}</span>
                </Badge>
              </motion.div>
            
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
