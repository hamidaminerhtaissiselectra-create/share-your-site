import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Phone, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  useSEO({
    title: "Page Non Trouvée | Répar'Action Volets",
    description: "La page que vous recherchez n'existe pas. Découvrez nos services de réparation et installation de volets roulants.",
    noIndex: true,
  });

  return (
    <main id="main-content" className="relative">
      <Navbar />
      
      {/* 404 Hero Section */}
      <section className="relative pt-24 pb-16 bg-hero-gradient text-primary-foreground min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-8"
            >
              <div className="text-9xl font-display font-extrabold text-accent mb-4">404</div>
            </motion.div>
            
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Page Non Trouvée
            </h1>
            
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              Désolé, la page que vous recherchez n'existe pas ou a été supprimée. Ne vous inquiétez pas, nous sommes là pour vous aider !
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button size="lg" variant="accent" asChild className="gap-2 rounded-full">
                <Link to="/">
                  <Home className="h-5 w-5" />
                  Retour à l'Accueil
                </Link>
              </Button>
              <Button size="lg" variant="accent-outline" asChild className="gap-2 rounded-full">
                <a href="tel:0603205967">
                  <Phone className="h-5 w-5" />
                  Nous Appeler
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Suggestions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Explorez nos Services
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Réparation de Volets Roulants",
                  description: "Diagnostic et réparation rapide de vos volets bloqués ou endommagés.",
                  icon: "🔧",
                  link: "/services/reparation-volets-roulants"
                },
                {
                  title: "Installation & Remplacement",
                  description: "Installation de nouveaux volets avec garantie décennale.",
                  icon: "🏗️",
                  link: "/services/installation-remplacement-volets"
                },
                {
                  title: "Motorisation & Domotique",
                  description: "Motorisez vos volets pour plus de confort et de sécurité.",
                  icon: "⚡",
                  link: "/services/motorisation-domotique"
                },
                {
                  title: "Vitrerie & Remplacement",
                  description: "Remplacement de vitres cassées et vitrerie spécialisée.",
                  icon: "🪟",
                  link: "/services/vitrerie-remplacement-vitrage"
                },
                {
                  title: "Dépannage Express",
                  description: "Intervention d'urgence disponible 7j/7 pour les pannes.",
                  icon: "🚨",
                  link: "/services/depannage-express"
                },
                {
                  title: "Zones d'Intervention",
                  description: "Découvrez nos zones de couverture en France.",
                  icon: "📍",
                  link: "/zones-intervention"
                }
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-xl p-6 border border-accent/10 card-shadow hover:card-shadow-hover transition-all"
                >
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="font-display font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-semibold text-sm"
                  >
                    Découvrir <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-section-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Liens Utiles
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                to="/blog"
                className="bg-card rounded-xl p-6 border border-accent/10 card-shadow hover:card-shadow-hover transition-all group"
              >
                <Search className="h-8 w-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-bold text-foreground mb-2">Blog Expert</h3>
                <p className="text-sm text-muted-foreground">Conseils et guides pour vos volets</p>
              </Link>

              <Link
                to="/qui-sommes-nous"
                className="bg-card rounded-xl p-6 border border-accent/10 card-shadow hover:card-shadow-hover transition-all group"
              >
                <div className="text-2xl mb-3">👥</div>
                <h3 className="font-display font-bold text-foreground mb-2">Qui Sommes-Nous</h3>
                <p className="text-sm text-muted-foreground">Découvrez notre expertise</p>
              </Link>

              <a
                href="tel:0603205967"
                className="bg-card rounded-xl p-6 border border-accent/10 card-shadow hover:card-shadow-hover transition-all group"
              >
                <Phone className="h-8 w-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-bold text-foreground mb-2">Nous Contacter</h3>
                <p className="text-sm text-muted-foreground">06 03 20 59 67</p>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold mb-4">Besoin d'Aide ?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Notre équipe est disponible pour répondre à toutes vos questions. Contactez-nous dès maintenant !
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="accent" asChild className="gap-2 rounded-full">
                <a href="/#devis">Demander un Devis <ArrowRight className="h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="accent-outline" asChild className="gap-2 rounded-full">
                <a href="mailto:contact@reparaction-volets.fr">
                  <Mail className="h-5 w-5" />
                  Envoyer un Email
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NotFound;
