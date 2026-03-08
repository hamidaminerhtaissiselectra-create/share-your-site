import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


const features = [
  "Intervention rapide et efficace sous 48h",
  "Techniciens certifiés RGE et Qualibat",
  "Travail soigné avec pièces d'origine",
  "Garantie 3 ans pièces et main d'œuvre",
];

const blogLinks = [
  { label: "Guide d'entretien des volets roulants", slug: "entretien-volets-roulants" },
  { label: "Réparation ou remplacement : que choisir ?", slug: "reparation-vs-remplacement" },
  { label: "Pannes fréquentes et solutions", slug: "pannes-frequentes-volets-roulants" },
];

const ImageTextSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/10 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image - Left side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden card-shadow">
               <img
                src="/repair-service-v2.webp"
                alt="Technicien certifié RGE de Répar'Action Volets en train de réparer un volet roulant électrique Somfy à Paris — diagnostic gratuit et intervention sous 48h"
                className="w-full h-auto object-cover"
                width={800}
                height={600}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating badge - coin droit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="absolute -bottom-4 -right-4 bg-accent text-white rounded-xl p-4 card-shadow-hover border border-white/20"
            >
              <div className="text-2xl font-bold">48h</div>
              <div className="text-xs font-medium">Intervention max</div>
            </motion.div>
          </motion.div>

          {/* Text content - Right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">
                  Notre Expertise
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-3">
                  Réparation et Maintenance de Volets Roulants
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-3">
                  Depuis plus de 10 ans, nous intervenons à Paris et en Île-de-France pour réparer, installer et entretenir vos volets roulants. Notre équipe de techniciens certifiés RGE garantit une intervention rapide et un travail de qualité irréprochable.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Un volet qui grince, une sangle qui lâche, un moteur qui ne répond plus ? Nos experts diagnostiquent la panne en quelques minutes et interviennent avec des pièces d'origine Somfy, Bubendorff ou Profalux. Résultat : 95% des réparations sont finalisées en un seul passage, sans déplacement supplémentaire ni surcoût.
                </p>
              </div>

              {/* Features list */}
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Blog internal links - Maillage interne */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-semibold text-foreground mb-3">📖 Articles utiles :</p>
                <div className="flex flex-wrap gap-2">
                  {blogLinks.map((link) => (
                    <Link
                      key={link.slug}
                      to={`/blog/${link.slug}`}
                      className="text-xs text-accent hover:text-accent/80 font-medium underline-offset-4 hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="pt-2"
              >
                <Button size="lg" variant="accent" asChild className="gap-2 rounded-full shadow-lg shadow-accent/20">
                  <a href="/#devis">
                    Demander un devis gratuit <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImageTextSection;
