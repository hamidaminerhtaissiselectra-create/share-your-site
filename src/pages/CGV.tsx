import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CGV = () => {
  useSEO({
    title: "Conditions Générales de Vente | Répar'Action Volets",
    description: "Conditions générales de vente de Répar'Action Volets. Tarifs, garanties, conditions de paiement et modalités d'intervention.",
    noIndex: true,
  });

  return (
    <main>
      <Navbar />
      
      <section className="pt-24 pb-16 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-6">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Conditions Générales de Vente</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-primary-foreground">
              Conditions Générales de Vente
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Conditions d'utilisation de nos services</h2>
            
            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">1. Objet</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Les présentes conditions générales régissent les relations commerciales entre Répar'Action Volets (SIRET : 982 156 978 000 16) et ses clients pour la fourniture de services de réparation, installation et motorisation de volets roulants, ainsi que de vitrerie.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">2. Devis et tarification</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tous les devis sont gratuits et sans engagement. Les tarifs affichés s'entendent hors taxes. Un devis détaillé vous sera remis avant toute intervention. Les prix peuvent être révisés en cas de modification du scope des travaux.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">3. Délais d'intervention</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Nous nous engageons à intervenir sous 48 heures à Paris et en Île-de-France pour les demandes standard, et le jour même pour les urgences de sécurité. Les délais peuvent varier selon votre localisation.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">4. Paiement</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Le paiement s'effectue à l'issue de l'intervention, selon les modalités convenues (chèque, virement, espèces). Une facture vous sera remise.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">5. Garanties</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
               • Toutes nos interventions sont garanties 3 ans pièces et main d'œuvre<br />
               • Assurance responsabilité civile professionnelle couvrant tous nos travaux
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">6. Responsabilité</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Répar'Action Volets décline toute responsabilité pour les dommages causés par une mauvaise utilisation ou un manque d'entretien de la part du client après l'intervention.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">7. Annulation et résiliation</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Les demandes d'annulation doivent être effectuées au moins 48 heures avant l'intervention prévue. Passé ce délai, des frais de dépannage peuvent s'appliquer.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">8. Conformité légale</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Répar'Action Volets est certifiée RGE et Qualibat. Tous nos travaux respectent les normes en vigueur et les réglementations applicables.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">9. Litiges</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tout litige sera résolu à l'amiable. En cas de désaccord, les parties acceptent la juridiction des tribunaux compétents.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <Button size="lg" variant="accent" asChild className="gap-2">
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
