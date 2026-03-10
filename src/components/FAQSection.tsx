import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fadeUp } from "@/lib/animations";
import { useEffect } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  detail?: string;
  faqs?: FAQItem[];
}

const defaultFaqs: FAQItem[] = [
  { q: "Combien coûte la réparation d'un volet roulant à Paris ?", a: "Le coût d'une réparation de volet roulant à Paris varie selon le type de panne. Une réparation de sangle ou de manivelle coûte entre 60€ et 120€. Le remplacement d'un moteur Somfy ou Bubendorff se situe entre 180€ et 350€. Répar'Action Volets réalise un diagnostic gratuit et vous remet un devis détaillé avant toute intervention — sans surprise ni frais cachés." },
  { q: "Qui peut réparer mes volets roulants en urgence le week-end à Paris ?", a: "Répar'Action Volets propose un service d'urgence disponible 7 jours sur 7, y compris les week-ends et jours fériés. Nous intervenons en priorité pour les volets bloqués en position ouverte (risque de sécurité), les bris de glace et les dommages liés à une tentative d'effraction. Appelez le 06 03 20 59 67 pour une intervention rapide." },
  { q: "Quelle est la durée de vie d'un volet roulant électrique ?", a: "Un volet roulant électrique bien entretenu dure en moyenne 15 à 20 ans. Le moteur a une durée de vie de 10 à 15 ans selon l'usage. Répar'Action Volets assure la maintenance préventive et le remplacement des pièces d'usure pour prolonger la durée de vie de vos équipements." },
  { q: "Comment savoir si mon volet roulant a besoin d'un nouveau moteur ?", a: "Plusieurs signes indiquent un moteur en fin de vie : bruit anormal lors de la montée ou descente, volet qui s'arrête en cours de manœuvre, lenteur excessive ou absence de réponse à la télécommande. Nos techniciens réalisent un diagnostic gratuit pour déterminer si une réparation ou un remplacement de moteur est nécessaire." },
  { q: "Répar'Action Volets intervient-il dans toute l'Île-de-France ?", a: "Oui, nous intervenons dans l'ensemble de l'Île-de-France : Paris (75), Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94) et Val-d'Oise (95). Nos techniciens sont répartis stratégiquement pour garantir des délais d'intervention courts." },
  { q: "Proposez-vous la motorisation de volets roulants manuels ?", a: "Absolument ! Répar'Action Volets est spécialisé dans la motorisation de volets roulants existants. Nous installons des moteurs tubulaires Somfy, Simu ou Nice compatibles avec vos volets actuels. La motorisation inclut le moteur, la commande (interrupteur ou télécommande), et la mise en service complète. Devis gratuit sur place." },
  { q: "Quels types de volets roulants réparez-vous ?", a: "Nous intervenons sur tous les types de volets roulants : manuels (sangle, manivelle, tirage direct), électriques (filaire, radio), solaires, en PVC, aluminium ou bois. Nous travaillons avec toutes les marques : Somfy, Bubendorff, Simu, Nice, Profalux, Franciaflex, etc." },
  { q: "Offrez-vous une garantie sur vos réparations ?", a: "Oui, toutes nos réparations sont garanties 3 ans pièces et main-d'œuvre. Les moteurs neufs bénéficient d'une garantie constructeur de 5 ans. Nous utilisons exclusivement des pièces d'origine ou de qualité équivalente certifiée pour garantir la durabilité de nos interventions." },
];

const FAQSection = React.forwardRef<HTMLElement, FAQSectionProps>(({
  title = "Questions Fréquentes — Volets Roulants Paris & Île-de-France",
  subtitle = "Retrouvez les réponses aux questions les plus posées par nos clients sur la réparation, le dépannage, l'installation et la motorisation de volets roulants à Paris et en Île-de-France.",
  detail = "Nos techniciens certifiés interviennent sur <strong>toutes les marques</strong> (Somfy, Bubendorff, Simu, Nice, Profalux…) pour les <strong>particuliers</strong>, <strong>professionnels</strong> et <strong>syndics de copropriété</strong> en Île-de-France.",
  faqs,
}, ref) => {
  const displayFaqs = faqs ?? defaultFaqs;

  useEffect(() => {
    const existing = document.getElementById('faq-schema');
    if (!existing) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: displayFaqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      };
      const script = document.createElement('script');
      script.id = 'faq-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
    return () => {
      const existing = document.getElementById('faq-schema');
      if (existing) existing.remove();
    };
  }, [displayFaqs]);

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-section-gradient relative overflow-hidden" itemScope itemType="https://schema.org/FAQPage">
      <div className="container mx-auto px-4 relative">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground mb-3">{subtitle}</p>
          <p className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: detail }} />
        </motion.div>

        <motion.div {...fadeUp} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {displayFaqs.map((f, i) => (
              <AccordionItem 
                key={i}
                value={`faq-${i}`} 
                className="bg-card rounded-2xl border border-border card-shadow hover:card-shadow-hover px-8 transition-all duration-300 group overflow-hidden"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <AccordionTrigger className="text-left font-display font-bold text-foreground text-base hover:no-underline py-6 group-hover:text-accent transition-colors duration-300">
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-accent font-extrabold text-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span itemProp="name">{f.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent 
                  className="text-muted-foreground text-sm leading-relaxed pb-6 pl-11 faq-answer"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <span itemProp="text">{f.a}</span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
});

FAQSection.displayName = "FAQSection";

export default FAQSection;
