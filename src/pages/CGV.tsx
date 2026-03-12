import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, FileText, CreditCard, Clock, Shield, AlertTriangle, Scale, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/animations";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const articles = [
  { num: "1", icon: FileText, title: "Objet", color: "bg-service-blue", text: "Les présentes conditions générales régissent les relations commerciales entre Répar'Action Volets (SIRET : 982 156 978 000 16) et ses clients pour la fourniture de services de réparation, installation et motorisation de volets roulants, ainsi que de vitrerie." },
  { num: "2", icon: CreditCard, title: "Devis et tarification", color: "bg-service-emerald", text: "Tous les devis sont gratuits et sans engagement. Les tarifs affichés s'entendent hors taxes. Un devis détaillé vous sera remis avant toute intervention. Les prix peuvent être révisés en cas de modification du scope des travaux." },
  { num: "3", icon: Clock, title: "Délais d'intervention", color: "bg-service-orange", text: "Nous nous engageons à intervenir sous 48 heures à Paris et en Île-de-France pour les demandes standard, et le jour même pour les urgences de sécurité. Les délais peuvent varier selon votre localisation." },
  { num: "4", icon: CreditCard, title: "Paiement", color: "bg-service-violet", text: "Le paiement s'effectue à l'issue de l'intervention, selon les modalités convenues (chèque, virement, espèces). Une facture vous sera remise." },
  { num: "5", icon: Shield, title: "Garanties", color: "bg-service-cyan", text: "Toutes nos interventions sont garanties 3 ans pièces et main d'œuvre. Assurance responsabilité civile professionnelle couvrant tous nos travaux." },
  { num: "6", icon: AlertTriangle, title: "Responsabilité", color: "bg-service-rose", text: "Répar'Action Volets décline toute responsabilité pour les dommages causés par une mauvaise utilisation ou un manque d'entretien de la part du client après l'intervention." },
  { num: "7", icon: Scale, title: "Annulation et résiliation", color: "bg-service-blue", text: "Les demandes d'annulation doivent être effectuées au moins 48 heures avant l'intervention prévue. Passé ce délai, des frais de dépannage peuvent s'appliquer." },
  { num: "8", icon: Award, title: "Conformité légale", color: "bg-service-emerald", text: "Répar'Action Volets est certifiée RGE et Qualibat. Tous nos travaux respectent les normes en vigueur et les réglementations applicables." },
  { num: "9", icon: Scale, title: "Litiges", color: "bg-service-orange", text: "Tout litige sera résolu à l'amiable. En cas de désaccord, les parties acceptent la juridiction des tribunaux compétents." },
];

const CGV = () => {
  useSEO({
    title: "Conditions Générales de Vente | Répar'Action Volets",
    description: "Conditions générales de vente de Répar'Action Volets. Tarifs, garanties, conditions de paiement et modalités d'intervention.",
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
            <span className="text-primary-foreground">Conditions Générales de Vente</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-primary-foreground">
              Conditions Générales de Vente
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Conditions d'utilisation de nos services de réparation et installation de volets roulants.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-5">
            {articles.map((article, i) => (
              <motion.div
                key={article.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.04, ease }}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border card-shadow hover:card-shadow-hover transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-2xl font-display font-extrabold text-border/50">{article.num}</span>
                    <div className={`w-10 h-10 rounded-xl ${article.color} flex items-center justify-center border border-white/20`}>
                      <article.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-lg font-bold text-foreground mb-2">{article.title}</h2>
                    <p className="text-muted-foreground leading-relaxed text-sm">{article.text}</p>
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

export default CGV;
