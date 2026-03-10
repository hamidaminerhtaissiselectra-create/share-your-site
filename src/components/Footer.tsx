import { Phone, Mail, MapPin, ArrowRight, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { content } from "@/data/content";

const phoneClean = content.company.contact.phoneMobile.replace(/\s/g, '');
const Footer = () => (
  <footer className="bg-primary text-primary-foreground" itemScope itemType="https://schema.org/LocalBusiness">
    {/* CTA Banner */}
    <div className="border-b border-primary-foreground/10">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-xl md:text-2xl font-bold">Prêt à réparer vos volets ?</p>
          <p className="text-primary-foreground/70 text-sm mt-1">Contactez-nous dès maintenant pour un devis gratuit et personnalisé.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
            <a href="/#devis">Demander un devis <ArrowRight className="h-4 w-4" /></a>
          </Button>
           <Button asChild className="border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 gap-2">
            <a href={`tel:${phoneClean}`}><Phone className="h-4 w-4" /> Appeler</a>
          </Button>
        </div>
      </div>
    </div>

    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="font-display font-bold text-2xl mb-4">{content.company.name.replace('Volets', '')}<span className="text-accent">Volets</span></div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed mb-3">
            Spécialiste du dépannage, de la réparation et de l'installation de volets roulants à Paris et en Île-de-France. Qualité, rapidité et garantie 3 ans pièces et main d'œuvre.
          </p>
          <p className="text-primary-foreground/50 text-xs mb-3">SIRET : 982 156 978 000 16</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {[...content.certifications, "Garantie 3 ans"].map((c) => (
              <Badge key={c} variant="default" className="text-[10px]">{c}</Badge>
            ))}
          </div>
          <div className="flex gap-4">
            <a href={content.company.social.facebook} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={content.company.social.instagram} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/services/reparation-volets-roulants" className="hover:text-primary-foreground transition-colors">Réparation de volets</Link></li>
            <li><Link to="/services/installation-remplacement-volets" className="hover:text-primary-foreground transition-colors">Remplacement de volets</Link></li>
            <li><Link to="/services/vitrerie-remplacement-vitrage" className="hover:text-primary-foreground transition-colors">Vitrerie & Vitrage</Link></li>
            <li><Link to="/services/motorisation-domotique" className="hover:text-primary-foreground transition-colors">Motorisation & Domotique</Link></li>
            <li><Link to="/services/depannage-express" className="hover:text-primary-foreground transition-colors">Dépannage express</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/" className="hover:text-primary-foreground transition-colors">Accueil</Link></li>
            <li><Link to="/qui-sommes-nous" className="hover:text-primary-foreground transition-colors">Qui sommes-nous</Link></li>
            <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog Expert</Link></li>
            <li><Link to="/zones-intervention" className="hover:text-primary-foreground transition-colors">Zones d'intervention</Link></li>
            <li><a href="/#devis" className="hover:text-primary-foreground transition-colors">Devis gratuit</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> <span itemProp="streetAddress">{content.company.contact.address.split(',')[0]}</span>, <span itemProp="postalCode">77610</span> <span itemProp="addressLocality">Fontenay-Trésigny</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /><a href={`tel:${phoneClean}`} className="hover:text-primary-foreground transition-colors" itemProp="telephone">{content.company.contact.phoneMobile}</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> <span itemProp="email">{content.company.contact.email}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
        <p>© 2026 Répar'Action Volets. Tous droits réservés.</p>
        <div className="flex gap-4">
          <Link to="/mentions-legales" className="hover:text-primary-foreground transition-colors">Mentions légales</Link>
          <Link to="/politique-confidentialite" className="hover:text-primary-foreground transition-colors">Politique de confidentialité</Link>
          <Link to="/cgv" className="hover:text-primary-foreground transition-colors">CGV</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
