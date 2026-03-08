import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, Clock, ShieldCheck, Hammer, HeartHandshake } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, staggerItem } from "@/lib/animations";
import CounterAnimation from "./CounterAnimation";

const points = [
  { icon: Award, text: "Plus de 10 ans d'expérience en volets roulants à Paris", color: "bg-service-blue/10 text-service-blue" },
  { icon: Clock, text: "Intervention rapide sous 24-48h — Paris & Île-de-France", color: "bg-service-orange/10 text-service-orange" },
  { icon: ShieldCheck, text: "Artisan certifié RGE et Qualibat — Éligible MaPrimeRénov'", color: "bg-service-emerald/10 text-service-emerald" },
  { icon: Hammer, text: "Garantie 3 ans pièces et main d'œuvre sur toutes interventions", color: "bg-service-violet/10 text-service-violet" },
  { icon: HeartHandshake, text: "Devis gratuit et transparent, sans engagement ni surprise", color: "bg-service-cyan/10 text-service-cyan" },
  { icon: Users, text: "SAV réactif disponible 7j/7 — Urgences traitées le jour même", color: "bg-service-rose/10 text-service-rose" },
];

const certifications = [
  { label: "Certification RGE", color: "bg-service-emerald/10 text-service-emerald border-service-emerald/20" },
  { label: "Qualibat", color: "bg-service-blue/10 text-service-blue border-service-blue/20" },
  { label: "Garantie 3 ans", color: "bg-service-orange/10 text-service-orange border-service-orange/20" },
  { label: "Assurance décennale", color: "bg-service-violet/10 text-service-violet border-service-violet/20" },
];

const AboutSection = () => (
  <section id="apropos" className="py-20 relative overflow-hidden">
    <div className="container mx-auto px-4 relative">
      <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-service-emerald/10 text-service-emerald text-sm font-semibold border border-service-emerald/20 mb-4">Notre Engagement</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
          Répar'Action Volets : Votre Artisan Expert en Volets Roulants à Paris depuis 10 ans
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
          Fondée il y a plus de 10 ans, Répar'Action Volets s'est imposée comme la référence incontournable du dépannage, de la réparation, de l'installation et de la motorisation de volets roulants à Paris et en Île-de-France. Notre engagement est simple : vous offrir un service de qualité, rapide et transparent, pour que votre habitat reste sécurisé, confortable et économe en énergie.
        </p>
        <p className="text-muted-foreground leading-relaxed text-sm">
          Basés à Fontenay-Trésigny (77), nous avons développé un réseau de techniciens répartis stratégiquement sur l'ensemble de la région parisienne. Chaque artisan est formé en continu sur les dernières technologies de motorisation Somfy io-homecontrol, les solutions solaires Bubendorff ID2 et les systèmes domotiques connectés Google Home et Alexa. Notre flotte de véhicules équipés embarque un stock permanent de pièces détachées — moteurs, condensateurs, sangles, lames aluminium et PVC — pour résoudre 95% des pannes dès le premier passage.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Chiffres & cartes — maintenant à gauche */}
        <motion.div {...fadeLeft} className="space-y-8">
          <div className="bg-accent rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <h3 className="font-display text-2xl font-bold mb-8 relative">Répar'Action Volets en Chiffres</h3>
            <div className="grid grid-cols-2 gap-10 relative">
              {[
                { num: 500, suffix: "+", label: "Interventions / an" },
                { num: 98, suffix: "%", label: "Clients satisfaits" },
                { num: 48, suffix: "h", label: "Délai max garanti" },
                { num: 3, suffix: " ans", label: "De garantie" },
              ].map((s, i) => (
                <motion.div key={s.label} {...staggerItem(i)}>
                  <CounterAnimation end={s.num} suffix={s.suffix} />
                  <div className="text-sm text-white/80 font-medium mt-2 uppercase tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Pièces d'origine", desc: "Marques premium certifiées", color: "border-service-blue/20" },
              { label: "Techniciens certifiés", desc: "Formation continue RGE", color: "border-service-emerald/20" },
              { label: "Garantie 3 ans", desc: "Pièces et main d'œuvre", color: "border-service-orange/20" },
              { label: "Support 7j/7", desc: "Urgences traitées le jour même", color: "border-service-violet/20" },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className={`bg-card rounded-2xl p-6 border ${item.color} card-shadow text-center transition-all duration-300 hover:card-shadow-hover`}
              >
                <div className="font-bold text-foreground text-sm mb-1">{item.label}</div>
                <div className="text-xs text-muted-foreground font-medium">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Texte, points & certifications — maintenant à droite */}
        <motion.div {...fadeRight}>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Implantés à Paris et en Île-de-France, nos techniciens certifiés interviennent sur toutes les marques de volets roulants : Somfy, Bubendorff, Profalux, Simu, Nice, Becker et bien d'autres. Chaque intervention est réalisée avec des pièces d'origine, dans le respect des normes de sécurité en vigueur. Notre certification RGE vous permet de bénéficier des aides de l'État (MaPrimeRénov', éco-PTZ) pour vos travaux d'isolation.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {points.map((p, i) => (
              <motion.div key={p.text} {...staggerItem(i)} className="flex items-start gap-4 p-2 rounded-xl transition-colors group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${p.color.split(" ")[0]} shadow-sm border border-white/10`}>
                  <p.icon className={`h-5 w-5 ${p.color.split(" ")[1]}`} />
                </div>
                <span className="text-sm font-medium text-foreground leading-snug">{p.text}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {certifications.map((c) => (
              <span key={c.label} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border ${c.color}`}>
                <CheckCircle2 className="h-3.5 w-3.5" /> {c.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
