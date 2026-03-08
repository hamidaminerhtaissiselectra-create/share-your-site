import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  useSEO({
    title: "Mentions Légales | Répar'Action Volets",
    description: "Mentions légales de Répar'Action Volets. Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation du site reparaction-volets.fr.",
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
            <span>Mentions Légales</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-primary-foreground">
              Mentions Légales
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="prose max-w-none">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Informations Légales</h2>
            
            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Éditeur du site</h3>
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">Répar'Action Volets</strong><br />
              62 Rue Emile Zola<br />
              77610 Fontenay-Trésigny<br />
              France<br />
              <strong className="text-foreground">SIRET :</strong> 982 156 978 000 16
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Coordonnées de contact</h3>
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">Téléphone :</strong> 06 03 20 59 67<br />
              <strong className="text-foreground">Email :</strong> contact@reparaction-volets.fr
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Responsable de publication</h3>
            <p className="text-muted-foreground mb-4">
              Le responsable de la publication du site est Répar'Action Volets.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Hébergement</h3>
            <p className="text-muted-foreground mb-4">
              Ce site est hébergé par <strong className="text-foreground">Hostinger</strong>.<br />
              HOSTINGER INTERNATIONAL LTD, 61 Lordou Vironos Street, 6023 Larnaca, Chypre.<br />
              Contact : https://www.hostinger.fr/contact
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Propriété intellectuelle</h3>
            <p className="text-muted-foreground mb-4">
              L'ensemble du contenu de ce site (textes, images, logos, etc.) est la propriété exclusive de Répar'Action Volets ou de ses partenaires. Toute reproduction, même partielle, sans autorisation écrite est strictement interdite.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Limitation de responsabilité</h3>
            <p className="text-muted-foreground mb-4">
              Répar'Action Volets décline toute responsabilité quant aux erreurs ou omissions qui pourraient figurer sur le site. Les informations fournies sont à titre informatif et ne constituent pas un engagement contractuel.
            </p>

            <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Certifications et agréments</h3>
            <p className="text-muted-foreground mb-4">
              Répar'Action Volets est certifiée RGE (Reconnu Garant de l'Environnement) et Qualibat. Nos interventions bénéficient d'une garantie 3 ans pièces et main d'œuvre.
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

export default MentionsLegales;
