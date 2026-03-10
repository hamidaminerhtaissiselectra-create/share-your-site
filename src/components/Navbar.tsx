import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { content } from "@/data/content";

const serviceLinks = [
  { label: "Dépannage Express", href: "/services/depannage-express" },
  { label: "Installation & Remplacement", href: "/services/installation-remplacement-volets" },
  { label: "Réparation de volets", href: "/services/reparation-volets-roulants" },
  { label: "Motorisation & Domotique", href: "/services/motorisation-domotique" },
  { label: "Vitrerie & Vitrage", href: "/services/vitrerie-remplacement-vitrage" },
];

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Blog", href: "/blog" },
  { label: "Zones d'intervention", href: "/zones-intervention" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      if (location.pathname === "/") {
        const el = document.querySelector(href.replace("/", ""));
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav aria-label="Navigation principale" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        Aller au contenu principal
      </a>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display font-bold text-xl text-primary">
          {content.company.name.split(" ").slice(0, -1).join(" ")} <span className="text-accent">{content.company.name.split(" ").pop()}</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/" className={`text-sm font-medium transition-colors ${scrolled ? "text-muted-foreground hover:text-primary" : "text-foreground/80 hover:text-primary"}`}>
            Accueil
          </Link>
          
          {/* Services dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${scrolled ? "text-muted-foreground hover:text-primary" : "text-foreground/80 hover:text-primary"}`}>
              Services <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-card rounded-xl border border-border shadow-xl p-2 min-w-[240px]">
                {serviceLinks.map((s) => (
                  <Link key={s.href} to={s.href} className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(1).map((l) => (
            <Link key={l.href} to={l.href} onClick={() => handleNavClick(l.href)} className={`text-sm font-medium transition-colors ${scrolled ? "text-muted-foreground hover:text-primary" : "text-foreground/80 hover:text-primary"}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
            <Button size="sm" variant="accent-outline" asChild className="gap-2">
            <a href={`tel:${content.company.contact.phoneMobile.replace(/\s/g, '')}`}><Phone className="h-4 w-4" /> {content.company.contact.phoneMobile}</a>
          </Button>
            <Button size="sm" variant="accent" asChild>
            <a href="/#devis">Devis Gratuit</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-1">
              <Link to="/" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Accueil
              </Link>
              <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center justify-between w-full py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Services <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 space-y-1 overflow-hidden"
                  >
                    {serviceLinks.map((s) => (
                      <Link key={s.href} to={s.href} onClick={() => setOpen(false)} className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                        {s.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {navLinks.slice(1).map((l) => (
                <Link key={l.href} to={l.href} onClick={() => handleNavClick(l.href)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Button size="sm" variant="accent-outline" asChild className="w-full gap-2">
                  <a href={`tel:${content.company.contact.phoneMobile.replace(/\s/g, '')}`}><Phone className="h-4 w-4" /> {content.company.contact.phoneMobile}</a>
                </Button>
                <Button size="sm" variant="accent" asChild className="w-full">
                  <a href="/#devis" onClick={() => setOpen(false)}>Devis Gratuit</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
