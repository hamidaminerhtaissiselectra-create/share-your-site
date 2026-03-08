import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PolitiqueConfidentialite = () => {
  useSEO({
    title: "Politique de Confidentialité | Répar'Action Volets",
    description: "Politique de confidentialité de Répar'Action Volets. Protection des données personnelles et respect de la vie privée conformément au RGPD.",
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
            <span>Politique de Confidentialité</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-primary-foreground">
              Politique de Confidentialité
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Protection de vos données personnelles</h2>
            
            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Collecte des données</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Répar'Action Volets (SIRET : 982 156 978 000 16) collecte vos données personnelles uniquement lorsque vous nous contactez via notre formulaire de devis ou par téléphone. Les données collectées incluent votre nom, prénom, adresse email, numéro de téléphone et adresse postale.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Utilisation des données</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Vos données sont utilisées exclusivement pour :
            </p>
            <ul className="text-muted-foreground mb-4 space-y-2 leading-relaxed">
              <li>• Traiter votre demande de devis</li>
              <li>• Vous contacter pour confirmer votre intervention</li>
              <li>• Vous envoyer des informations relatives à nos services</li>
              <li>• Améliorer notre service client</li>
            </ul>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Sécurité des données</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Répar'Action Volets met en place des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, altération ou destruction.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Partage des données</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Vos données ne sont jamais partagées avec des tiers sans votre consentement explicite, sauf si la loi l'exige.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Durée de conservation</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Vos données personnelles sont conservées pendant la durée nécessaire au traitement de votre demande, puis supprimées conformément à la législation en vigueur.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Vos droits</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à contact@reparaction-volets.fr.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Cookies</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Ce site utilise des cookies pour améliorer votre expérience utilisateur. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
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

export default PolitiqueConfidentialite;
