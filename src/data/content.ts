// Fichier de centralisation du contenu statique pour Répar'Action Volets

export const content = {
  // --- Informations Générales ---
  company: {
    name: "Répar'Action Volets",
    slogan: "Dépannage, Réparation & Motorisation de Volets Roulants.",
    answerFirst: "Répar'Action Volets est le spécialiste français du dépannage, de la réparation, l'installation et la motorisation de volets roulants pour particuliers et entreprises.",
    contact: {
      email: "contact@reparaction-volets.fr",
      phoneMobile: "06 03 20 59 67",
      phoneFixe: "06 03 20 59 67",
      address: "62 Rue Emile Zola, 77610 Fontenay-Trésigny",
    },
    social: {
      linkedin: "https://www.linkedin.com/company/reparaction-volets",
      facebook: "https://www.facebook.com/reparactionvolets",
      instagram: "https://www.instagram.com/reparactionvolets",
    },
  },

  // --- Navigation ---
  nav: [
    { label: "Services", href: "#services", scrollTo: "services" },
    { label: "À Propos", href: "#about", scrollTo: "about" },
    { label: "Devis", href: "#quote", scrollTo: "quote", mode: "quote" as const },
    { label: "Contact", href: "#contact", scrollTo: "contact" },
  ],

  // --- Section Hero ---
  hero: {
    title: "Répar'Action Volets dépanne, répare, installe et motorise vos volets roulants à Paris et partout en France",
    subtitle: "Dépannage, réparation, installation et motorisation de volets roulants. Intervention rapide sous 48h, diagnostic gratuit, garantie 3 ans pièces et main d'œuvre. Plus de 500 clients satisfaits en Île-de-France.",
    ctaQuote: "Demander un Devis Gratuit",
    ctaContact: "Contactez-nous",
  },

  // --- Section Services ---
  services: {
    title: "Dépannage, Réparation, Installation & Motorisation de Volets Roulants",
    subtitle: "Répar'Action Volets propose 5 services spécialisés : dépannage express, installation complète, réparation de volets roulants, motorisation & domotique, vitrerie & vitrage.",
    items: [
      {
        title: "Dépannage Express",
        description: "Service de dépannage rapide pour volets bloqués ou moteurs en panne. Intervention le jour même.",
        icon: "Zap",
        link: "/services/depannage-express",
      },
      {
        title: "Installation Complète",
        description: "Prise de mesures, fabrication sur-mesure et pose professionnelle. Accompagnement complet de A à Z.",
        icon: "LayoutGrid",
        link: "/services/installation-remplacement-volets",
      },
      {
        title: "Réparation de Volets Roulants",
        description: "Diagnostic et réparation de tous types de volets roulants : manuels, électriques, solaires. Intervention rapide sur tous mécanismes.",
        icon: "Wrench",
        link: "/services/reparation-volets-roulants",
      },
      {
        title: "Motorisation & Domotique",
        description: "Motorisation de vos volets roulants et rideaux métalliques. Intégration domotique compatible Somfy, Google Home, Alexa.",
        icon: "Cpu",
        link: "/services/motorisation-domotique",
      },
      {
        title: "Vitrerie & Vitrage",
        description: "Remplacement de vitrage simple, double ou triple. Intervention d'urgence pour bris de glace 7j/7.",
        icon: "GlassWater",
        link: "/services/vitrerie-remplacement-vitrage",
      },
    ],
  },

  // --- Section À Propos ---
  about: {
    title: "Répar'Action Volets : Expert Volets Roulants depuis 2014",
    content: [
      "Fort de plus de 10 ans d'expérience, Répar'Action Volets est votre partenaire expert en dépannage, réparation, installation et motorisation de volets roulants. Certifiés RGE et Qualibat, nous garantissons des interventions professionnelles et conformes aux normes en vigueur.",
      "Nos techniciens certifiés assurent le dépannage express, la réparation et l'installation de volets roulants manuels, électriques et solaires. Basés en Île-de-France, nous intervenons sous 48h à Paris et dans toute la région parisienne.",
    ],
    stats: [
      { value: "10+", label: "Années d'Expérience" },
      { value: "500+", label: "Clients Satisfaits" },
      { value: "48h", label: "Délai d'Intervention" },
      { value: "3 ans", label: "Garantie" },
    ],
  },

  // --- Certifications ---
  certifications: ["RGE", "Qualibat"],

  // --- Marques ---
  brands: ["Somfy", "Bubendorff", "Profalux", "Simu", "Nice"],
};
