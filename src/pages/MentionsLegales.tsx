import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Building2, Globe, ShieldCheck, Scale, Award, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/animations";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const sections = [
  {
    icon: Building2,
    title: "Éditeur du site",
    color: "bg-service-blue",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Répar'Action Volets</strong><br />
        62 Rue Emile Zola<br />
        77610 Fontenay-Trésigny<br />
        France<br />
        <strong className="text-foreground">SIRET :</strong> 982 156 978 000 16
      </p>
    ),
  },
  {
    icon: Phone,
    title: "Coordonnées de contact",
    color: "bg-service-emerald",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Téléphone :</strong>{" "}
        <a href="tel:0603205967" className="text-accent hover:underline">06 03 20 59 67</a><br />
        <strong className="text-foreground">Email :</strong>{" "}
        <a href="mailto:contact@reparaction-volets.fr" className="text-accent hover:underline">contact@reparaction-volets.fr</a>
      </p>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Responsable de publication",
    color: "bg-service-violet",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Le responsable de la publication du site est Répar'Action Volets.
      </p>
    ),
  },
  {
    icon: Globe,
    title: "Hébergement",
    color: "bg-service-orange",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Ce site est hébergé par <strong className="text-foreground">Hostinger</strong>.<br />
        HOSTINGER INTERNATIONAL LTD, 61 Lordou Vironos Street, 6023 Larnaca, Chypre.<br />
        Contact : <a href="https://www.hostinger.fr/contact" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">hostinger.fr/contact</a>
      </p>
    ),
  },
  {
    icon: Scale,
    title: "Propriété intellectuelle",
    color: "bg-service-rose",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        L'ensemble du contenu de ce site (textes, images, logos, etc.) est la propriété exclusive de Répar'Action Volets ou de ses partenaires. Toute reproduction, même partielle, sans autorisation écrite est strictement interdite.
      </p>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Limitation de responsabilité",
    color: "bg-service-cyan",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Répar'Action Volets décline toute responsabilité quant aux erreurs ou omissions qui pourraient figurer sur le site. Les informations fournies sont à titre informatif et ne constituent pas un engagement contractuel.
      </p>
    ),
  },
  {
    icon: Award,
    title: "Certifications et agréments",
    color: "bg-service-emerald",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Répar'Action Volets est certifiée <strong className="text-foreground">RGE</strong> (Reconnu Garant de l'Environnement) et <strong className="text-foreground">Qualibat</strong>. Nos interventions bénéficient d'une garantie 3 ans pièces et main d'œuvre.
      </p>
    ),
  },
];

const MentionsLegales = () => {
  useSEO({
    title: "Mentions Légales | Répar'Action Volets",
    description: "Mentions légales de Répar'Action Volets. Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation du site reparaction-volets.fr.",
    noIndex: true,
  });

  return (
    <main id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(205_85%_55%/0.15),_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-6">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-primary-foreground">Mentions Légales</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-primary-foreground">
              Mentions Légales
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Informations légales et réglementaires de Répar'Action Volets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
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
                    {section.content}
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

export default MentionsLegales;
