import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Database, ShieldCheck, Users, Clock, Lock, Cookie, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/animations";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const sections = [
  {
    icon: Database,
    title: "Collecte des données",
    color: "bg-service-blue",
    content: "Répar'Action Volets (SIRET : 982 156 978 000 16) collecte vos données personnelles uniquement lorsque vous nous contactez via notre formulaire de devis ou par téléphone. Les données collectées incluent votre nom, prénom, adresse email, numéro de téléphone et adresse postale.",
  },
  {
    icon: Eye,
    title: "Utilisation des données",
    color: "bg-service-emerald",
    content: null,
    listItems: [
      "Traiter votre demande de devis",
      "Vous contacter pour confirmer votre intervention",
      "Vous envoyer des informations relatives à nos services",
      "Améliorer notre service client",
    ],
  },
  {
    icon: Lock,
    title: "Sécurité des données",
    color: "bg-service-violet",
    content: "Répar'Action Volets met en place des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, altération ou destruction.",
  },
  {
    icon: Users,
    title: "Partage des données",
    color: "bg-service-orange",
    content: "Vos données ne sont jamais partagées avec des tiers sans votre consentement explicite, sauf si la loi l'exige.",
  },
  {
    icon: Clock,
    title: "Durée de conservation",
    color: "bg-service-cyan",
    content: "Vos données personnelles sont conservées pendant la durée nécessaire au traitement de votre demande, puis supprimées conformément à la législation en vigueur.",
  },
  {
    icon: ShieldCheck,
    title: "Vos droits (RGPD)",
    color: "bg-service-rose",
    content: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à contact@reparaction-volets.fr.",
  },
  {
    icon: Cookie,
    title: "Cookies",
    color: "bg-service-blue",
    content: "Ce site utilise des cookies pour améliorer votre expérience utilisateur. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.",
  },
];

const PolitiqueConfidentialite = () => {
  useSEO({
    title: "Politique de Confidentialité | Répar'Action Volets",
    description: "Politique de confidentialité de Répar'Action Volets. Protection des données personnelles et respect de la vie privée conformément au RGPD.",
    noIndex: true,
  });

  return (
    <main id="main-content">
      <Navbar />

      <section className="pt-24 pb-16 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(205_85%_55%/0.15),_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-6">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-primary-foreground">Politique de Confidentialité</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-primary-foreground">
              Politique de Confidentialité
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Protection de vos données personnelles conformément au RGPD.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-5">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease }}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border card-shadow hover:card-shadow-hover transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${section.color} flex items-center justify-center shrink-0 border border-white/20`}>
                    <section.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-lg font-bold text-foreground mb-3">{section.title}</h2>
                    {section.content && (
                      <p className="text-muted-foreground leading-relaxed text-sm">{section.content}</p>
                    )}
                    {section.listItems && (
                      <>
                        <p className="text-muted-foreground leading-relaxed text-sm mb-3">Vos données sont utilisées exclusivement pour :</p>
                        <ul className="space-y-2">
                          {section.listItems.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Settings className="h-3.5 w-3.5 text-accent shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12 text-center">
            <Button size="lg" variant="accent" asChild className="gap-2 rounded-full shadow-lg shadow-accent/20">
              <a href="/#devis">Demander un Devis Gratuit <ArrowRight className="h-5 w-5" /></a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PolitiqueConfidentialite;
