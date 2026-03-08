import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, staggerItem } from "@/lib/animations";

const ContactSection = React.forwardRef<HTMLElement>((_, ref) => (
  <section ref={ref} id="contact" className="py-12 sm:py-16 md:py-20">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">Contact Direct</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">Contactez-Nous pour un Devis Gratuit — Réparation de Volets Roulants en France et à Paris</h2>
        <p className="text-muted-foreground mb-3">Notre équipe est à votre écoute pour répondre à vos questions et vous conseiller sur la meilleure solution pour vos volets roulants.</p>
        <p className="text-muted-foreground text-sm">Que vous ayez besoin d'un dépannage urgent un dimanche, d'un devis pour motoriser vos volets manuels, ou d'un conseil sur le choix entre aluminium et PVC — nos conseillers techniques vous répondent sous 2 heures et planifient l'intervention au créneau qui vous convient.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        <motion.div {...fadeLeft} className="rounded-2xl overflow-hidden border border-border h-96 shadow-lg">
          <iframe
            title="Localisation Répar'Action Volets"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.5!2d2.8755!3d48.7053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQyJzE5LjEiTiAywrA1MiczMy4wIkU!5e0!3m2!1sfr!2sfr!4v1"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </motion.div>

        <motion.div {...fadeRight} className="space-y-6">
          {[
            { icon: Phone, title: "Téléphone", text: "06 03 20 59 67", sub: "Lun - Ven : 8h - 18h", color: "bg-service-blue" },
            { icon: Mail, title: "Email", text: "contact@reparaction-volets.fr", sub: "Réponse sous 24h", color: "bg-service-rose" },
            { icon: MapPin, title: "Adresse", text: "62 Rue Emile Zola, 77610 Fontenay-Trésigny", sub: "Siège social", color: "bg-service-emerald" },
            { icon: Clock, title: "Horaires", text: "Lun - Ven : 8h00 - 18h00 | Sam : 9h00 - 13h00", sub: "Urgences 7j/7", color: "bg-service-violet" },
          ].map((item, index) => (
            <motion.div key={item.title} {...staggerItem(index)}
              className="flex items-start gap-4 bg-card rounded-2xl p-6 card-shadow border border-border hover:card-shadow-hover transition-all duration-300">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg border border-white/20 ${item.color} text-white`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="font-display font-bold text-foreground text-base mb-1">{item.title}</div>
                <div className="text-foreground font-semibold text-sm mb-1">{item.text}</div>
                <div className="text-xs text-muted-foreground font-medium">{item.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
));

ContactSection.displayName = "ContactSection";

export default ContactSection;
