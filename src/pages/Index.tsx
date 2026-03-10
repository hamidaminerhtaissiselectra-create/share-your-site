import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import ImageTextSection from "@/components/ImageTextSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QuoteFormSection from "@/components/QuoteFormSection";
import ServiceRegionsSection from "@/components/ServiceRegionsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Répar'Action Volets — Réparation Volets Roulants Paris | RGE",
    description: "Répar'Action Volets : expert certifié RGE en dépannage, réparation, installation et motorisation de volets roulants à Paris et en Île-de-France. Intervention sous 48h, diagnostic gratuit, garantie 3 ans pièces et main d'œuvre. Devis en ligne.",
    keywords: "dépannage volet roulant Paris, réparation volet roulant, installation volet roulant, motorisation volet, volet bloqué, artisan RGE, vitrerie Paris, Somfy, Bubendorff, devis gratuit",
    canonicalUrl: "https://reparaction-volets.fr/",
    ogImage: "https://reparaction-volets.fr/images/og-image.webp",
  });

  useEffect(() => {
    // HowTo Schema - Optimisé pour recherche vocale "Comment réparer un volet roulant ?"
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Comment faire réparer un volet roulant à Paris ?",
      "description": "Guide étape par étape pour faire réparer votre volet roulant par un professionnel certifié à Paris et en Île-de-France.",
      "totalTime": "PT2H",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "EUR",
        "value": "80-350"
      },
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Contactez Répar'Action Volets", "text": "Appelez le 06 03 20 59 67 ou remplissez le formulaire de devis en ligne. Un conseiller technique vous répond sous 2 heures." },
        { "@type": "HowToStep", "position": 2, "name": "Diagnostic gratuit", "text": "Un technicien certifié RGE se déplace chez vous pour diagnostiquer la panne et vous remettre un devis détaillé, gratuit et sans engagement." },
        { "@type": "HowToStep", "position": 3, "name": "Intervention rapide", "text": "Après validation du devis, nous intervenons sous 48 heures avec les pièces de rechange en stock. 95% des pannes sont résolues au premier passage." },
        { "@type": "HowToStep", "position": 4, "name": "Garantie 3 ans", "text": "Votre réparation est couverte par une garantie de 3 ans pièces et main d'œuvre. Notre SAV reste disponible 7j/7." }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(howToSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <main id="main-content" className="relative">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <QuoteFormSection />
      <AboutSection />
      <ProcessSection />
      <ImageTextSection />
      <TestimonialsSection />
      <ServiceRegionsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
