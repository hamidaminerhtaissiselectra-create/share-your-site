import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, ChevronRight, BookOpen, Phone, Wrench, Zap, GlassWater, Cpu, LayoutGrid, Shield, Star, Quote, MapPin, FileText, ClipboardCheck, Clock, ShieldCheck, HelpCircle } from "lucide-react";
import { fadeUp, staggerItem, hoverLift } from "@/lib/animations";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogArticles } from "@/data/blogArticles";
const blogHeroImg = "/images/assets/paris-saint-germain-blog.webp";

// Map categories to colored badge variants and icons
const categoryStyle: Record<string, { variant: "serviceBlue" | "serviceOrange" | "serviceEmerald" | "serviceRose" | "serviceViolet" | "serviceCyan" | "accent"; icon: typeof Wrench }> = {
  "Entretien": { variant: "serviceBlue", icon: Wrench },
  "Réparation": { variant: "serviceOrange", icon: Zap },
  "Motorisation": { variant: "serviceViolet", icon: Cpu },
  "Installation": { variant: "serviceCyan", icon: LayoutGrid },
  "Vitrerie": { variant: "serviceEmerald", icon: GlassWater },
  "Énergie": { variant: "serviceRose", icon: Shield },
  "Comparatif": { variant: "serviceViolet", icon: Cpu },
  "Sécurité": { variant: "serviceOrange", icon: Shield },
  "Domotique": { variant: "serviceCyan", icon: Cpu },
};

const getCategoryStyle = (category: string) => categoryStyle[category] || { variant: "accent" as const, icon: BookOpen };

const BlogPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useSEO({
    title: "Blog Expert Volets & Vitrerie | Conseils, Guides & Comparatifs | Répar'Action Volets",
    description: "Conseils professionnels, guides de dépannage et d'entretien, comparatifs de marques et actualités sur les volets roulants et la vitrerie. Articles rédigés par nos experts.",
    keywords: "blog volet roulant, dépannage volet, entretien volet, guide motorisation, comparatif Somfy Bubendorff, conseils vitrerie",
    canonicalUrl: "https://reparaction-volets.fr/blog",
  });

  useEffect(() => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://reparaction-volets.fr" },
        { "@type": "ListItem", "position": 2, "name": "Blog Expert", "item": "https://reparaction-volets.fr/blog" }
      ]
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.innerHTML = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  const categories = [...new Set(blogArticles.map((a) => a.category))];
  const featuredArticle = blogArticles[0];
  const featuredStyle = getCategoryStyle(featuredArticle.category);

  return (
    <main id="main-content" className="relative">
      <Navbar />
      
      {/* Hero - gradient riche comme la page d'accueil */}
      <section ref={heroRef} className="relative pt-24 pb-20 min-h-[65vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src={blogHeroImg} alt="Boulevard Saint-Germain à Paris — Blog expert volets et vitrerie Répar'Action" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/20" />
        </motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-6">
              <Link to="/" className="hover:text-primary-foreground transition-colors">Accueil</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-foreground">Blog Expert</span>
            </div>
            <Badge variant="accent" className="gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm shadow-lg">
              <BookOpen className="h-4 w-4" /> Conseils & Guides d'Experts
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-primary-foreground">
              Blog Expert <span className="text-accent">Volets & Vitrerie</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-2xl">
              Conseils professionnels, guides d'entretien, comparatifs de marques et actualités du secteur. <strong>{blogArticles.length} articles</strong> pour tout savoir sur vos volets roulants et votre vitrerie.
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const style = getCategoryStyle(cat);
                const colorMap: Record<string, string> = {
                  serviceBlue: 'bg-service-blue text-white border-service-blue',
                  serviceOrange: 'bg-service-orange text-white border-service-orange',
                  serviceViolet: 'bg-service-violet text-white border-service-violet',
                  serviceCyan: 'bg-service-cyan text-white border-service-cyan',
                  serviceEmerald: 'bg-service-emerald text-white border-service-emerald',
                  serviceRose: 'bg-service-rose text-white border-service-rose',
                  accent: 'bg-accent text-white border-accent',
                };
                return (
                  <span key={cat} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-md backdrop-blur-sm border ${colorMap[style.variant] || colorMap.accent}`}>
                    <style.icon className="h-3 w-3" />
                    {cat}
                  </span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article - avec couleurs vives */}
      <section className="py-16 bg-section-gradient">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="accent" className="gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
              ⭐ Article à la une
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Notre dernier article recommandé
            </h2>
          </motion.div>
          <motion.div {...fadeUp}
            className="max-w-5xl mx-auto bg-card rounded-2xl overflow-hidden border border-accent/20 card-shadow hover:card-shadow-hover transition-all group">
            <div className="grid md:grid-cols-2">
              {featuredArticle.image && (
                <div className="h-64 md:h-full overflow-hidden relative">
                  <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-lg`}>
                    <featuredStyle.icon className="h-6 w-6 text-accent-foreground" strokeWidth={2} />
                  </div>
                </div>
              )}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-4 w-fit shadow-sm ${
                  featuredStyle.variant === 'serviceBlue' ? 'bg-service-blue text-white' :
                  featuredStyle.variant === 'serviceOrange' ? 'bg-service-orange text-white' :
                  featuredStyle.variant === 'serviceViolet' ? 'bg-service-violet text-white' :
                  featuredStyle.variant === 'serviceCyan' ? 'bg-service-cyan text-white' :
                  featuredStyle.variant === 'serviceEmerald' ? 'bg-service-emerald text-white' :
                  featuredStyle.variant === 'serviceRose' ? 'bg-service-rose text-white' :
                  'bg-accent text-white'
                }`}>
                  <featuredStyle.icon className="h-3 w-3" />
                  {featuredArticle.category}
                </span>
                <h3 className="font-display font-bold text-foreground text-2xl md:text-3xl mb-4">{featuredArticle.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                  <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-accent" /> {featuredArticle.date}</div>
                  <div className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-accent" /> {featuredArticle.author}</div>
                </div>
                <Button variant="accent" asChild className="rounded-full w-fit px-6 shadow-lg">
                  <Link to={`/blog/${featuredArticle.slug}`} className="flex items-center gap-2">
                    Lire l'article <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Articles Grid - avec badges colorés par catégorie */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">
              <BookOpen className="h-3.5 w-3.5" /> Bibliothèque Complète
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">Tous nos articles</h2>
            <p className="text-muted-foreground">Explorez nos guides, comparatifs et conseils pour l'entretien de vos volets roulants.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogArticles.slice(1).map((article, i) => {
              const style = getCategoryStyle(article.category);
              return (
                <motion.div
                  key={article.id}
                  {...staggerItem(i)}
                  {...hoverLift}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 card-shadow hover:card-shadow-hover transition-all duration-500"
                >
                  {article.image && (
                    <div className="h-52 overflow-hidden relative">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                      <Badge className={`absolute top-4 right-4 text-xs font-bold shadow-md backdrop-blur-sm ${
                        style.variant === 'serviceBlue' ? 'bg-service-blue/90 text-white border-service-blue' :
                        style.variant === 'serviceOrange' ? 'bg-service-orange/90 text-white border-service-orange' :
                        style.variant === 'serviceViolet' ? 'bg-service-violet/90 text-white border-service-violet' :
                        style.variant === 'serviceCyan' ? 'bg-service-cyan/90 text-white border-service-cyan' :
                        style.variant === 'serviceEmerald' ? 'bg-service-emerald/90 text-white border-service-emerald' :
                        style.variant === 'serviceRose' ? 'bg-service-rose/90 text-white border-service-rose' :
                        'bg-accent/90 text-white border-accent'
                      }`}>
                        {article.category}
                      </Badge>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-accent" /> {article.date}</div>
                      <div className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-accent" /> {article.author}</div>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-all font-bold text-sm group-hover:gap-3 duration-300"
                    >
                      Lire l'article <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== Section Devis Blog ========== */}
      <section id="devis-blog" className="py-16 md:py-20 bg-section-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-service-blue/5" />
        <div className="container mx-auto px-4 relative">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">
              <FileText className="h-3.5 w-3.5" /> Devis Personnalisé
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Un projet de volets ou vitrerie ? Obtenez votre devis
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos experts analysent chaque demande individuellement. Recevez un devis détaillé sous 2h, adapté à vos besoins réels — sans engagement.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: ClipboardCheck, title: "Diagnostic offert", desc: "Un technicien certifié évalue votre installation sur place, gratuitement.", color: "service-blue" },
                { icon: Clock, title: "Réponse sous 2h", desc: "Votre devis chiffré vous est envoyé par email en moins de 2 heures.", color: "service-orange" },
                { icon: ShieldCheck, title: "Garantie 3 ans", desc: "Toutes nos interventions sont garanties 3 ans pièces et main d'œuvre.", color: "service-emerald" },
              ].map((item) => (
                <div key={item.title} className="bg-card rounded-2xl p-6 border border-border card-shadow hover:card-shadow-hover transition-all duration-500 text-center group">
                  <div className={`w-14 h-14 rounded-xl bg-${item.color}/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`h-7 w-7 text-${item.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="accent" className="px-8 py-7 text-lg font-bold rounded-full shadow-xl hover:scale-105 transition-all" asChild>
                  <a href="/#devis" className="flex items-center gap-2">Demander un Devis Gratuit <ArrowRight className="h-5 w-5" /></a>
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-7 text-lg font-bold rounded-full border-accent/30 text-accent hover:bg-accent/10 transition-all" asChild>
                  <a href="tel:0603205967" className="flex items-center gap-2"><Phone className="h-5 w-5" /> 06 03 20 59 67</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== Section Témoignages Blog ========== */}
      <section className="py-16 md:py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-service-orange/10 text-service-orange text-sm font-semibold border border-service-orange/20 mb-4">
              <Star className="h-3.5 w-3.5" /> Nos clients témoignent
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Avis Clients — Retours d'Expérience Vérifiés
            </h2>
            <p className="text-muted-foreground mb-3">Ce que disent nos clients après une intervention Répar'Action Volets.</p>
          </motion.div>

          <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-5 mb-12">
            {[
              { num: "500+", label: "Interventions réalisées", color: "text-service-blue" },
              { num: "4.9/5", label: "Satisfaction clients", color: "text-service-orange" },
              { num: "98%", label: "Taux de recommandation", color: "text-service-emerald" },
            ].map((s) => (
              <div key={s.label} className="text-center px-6">
                <div className={`text-2xl font-display font-extrabold ${s.color}`}>{s.num}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Caroline V.", location: "Paris 11e", text: "Un article du blog m'a aidée à identifier la panne de mon volet. J'ai contacté Répar'Action et le technicien a confirmé le diagnostic. Réparation en 45 minutes, prix conforme au devis. Service irréprochable !", service: "Réparation", badgeColor: "bg-service-blue/10 text-service-blue border-service-blue/20", date: "Février 2026" },
              { name: "Thomas G.", location: "Levallois-Perret", text: "Grâce au comparatif Somfy vs Bubendorff du blog, j'ai fait le bon choix pour la motorisation de mes volets. L'installation a été impeccable, le technicien très pédagogue. Je recommande les yeux fermés.", service: "Motorisation", badgeColor: "bg-service-violet/10 text-service-violet border-service-violet/20", date: "Janvier 2026" },
              { name: "Fatima B.", location: "Créteil", text: "Article très utile sur l'isolation thermique via les volets roulants. J'ai demandé un devis pour remplacer mes anciens volets PVC. Résultat : -30% sur ma facture de chauffage cet hiver. Merci Répar'Action !", service: "Installation", badgeColor: "bg-service-emerald/10 text-service-emerald border-service-emerald/20", date: "Décembre 2025" },
            ].map((t, i) => (
              <motion.div key={t.name} {...staggerItem(i)} {...hoverLift}
                className="bg-card rounded-2xl p-8 card-shadow border border-border hover:card-shadow-hover transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${t.badgeColor}`}>{t.service}</span>
                  <span className="text-xs text-muted-foreground font-medium">{t.date}</span>
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-service-orange text-service-orange" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-accent/10 mb-4" />
                <p className="text-foreground text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="border-t border-border pt-6 mt-auto">
                  <div className="font-bold text-foreground text-base">{t.name}</div>
                  <div className="text-xs text-muted-foreground font-medium flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-service-orange/40" />
                    {t.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section FAQ Blog ========== */}
      <section className="py-16 md:py-20 bg-section-gradient relative overflow-hidden" itemScope itemType="https://schema.org/FAQPage">
        <div className="container mx-auto px-4 relative">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">
              <HelpCircle className="h-3.5 w-3.5" /> FAQ
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Questions Fréquentes sur nos Articles & Services
            </h2>
            <p className="text-muted-foreground">Retrouvez les réponses aux questions posées par les lecteurs de notre blog expert volets et vitrerie.</p>
          </motion.div>

          <motion.div {...fadeUp} className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: "Vos articles de blog sont-ils rédigés par des professionnels ?", a: "Oui, chaque article est rédigé ou validé par nos techniciens certifiés RGE, forts de plus de 10 ans d'expérience terrain en dépannage, réparation, installation et motorisation de volets roulants à Paris et en Île-de-France." },
                { q: "Puis-je diagnostiquer ma panne de volet grâce à vos guides ?", a: "Nos guides pratiques vous aident à identifier les pannes courantes (sangle cassée, moteur en panne, lames abîmées). Pour un diagnostic précis et une réparation durable, nous recommandons l'intervention d'un technicien qualifié — le diagnostic est offert." },
                { q: "Quelles marques de volets recommandez-vous dans vos comparatifs ?", a: "Nos comparatifs couvrent les marques leaders du marché : Somfy, Bubendorff, Profalux, Franciaflex, Simu et Nice. Nous testons et installons ces marques quotidiennement, ce qui nous permet de donner des avis objectifs basés sur notre expérience terrain." },
                { q: "Proposez-vous des conseils pour réduire sa facture énergétique ?", a: "Oui, plusieurs articles traitent de l'isolation thermique via les volets roulants, du choix du vitrage performant et des aides financières disponibles (MaPrimeRénov', éco-PTZ). Des gestes simples comme la motorisation programmée peuvent réduire votre consommation de 15 à 25%." },
                { q: "Comment contacter un expert après avoir lu un article ?", a: "Vous pouvez nous joindre directement au 06 03 20 59 67 ou via notre formulaire de devis en ligne. Mentionnez l'article consulté, notre équipe adaptera ses conseils à votre situation spécifique." },
              ].map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`blog-faq-${i}`}
                  className="bg-card rounded-2xl border border-border card-shadow hover:card-shadow-hover px-8 transition-all duration-300 group overflow-hidden"
                  itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
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
                    className="text-muted-foreground text-sm leading-relaxed pb-6 pl-11"
                    itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                  >
                    <span itemProp="text">{f.a}</span>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ========== Section Régions Blog ========== */}
      <section className="py-16 md:py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-4">
              <MapPin className="h-3.5 w-3.5" /> Couverture Nationale
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Nos Zones d'Intervention en France
            </h2>
            <p className="text-muted-foreground">
              Retrouvez nos services de dépannage, réparation, installation et motorisation de volets roulants dans toute la France.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mb-10">
            {[
              { name: "Paris (75)", link: "/zones-intervention/paris", color: "service-blue", depts: "20 arrondissements", img: "/images/zones/paris.webp" },
              { name: "Île-de-France", link: "/zones-intervention/ile-de-france", color: "service-emerald", depts: "7 départements", img: "/images/zones/ile-de-france.webp" },
              { name: "Hauts-de-France", link: "/zones-intervention", color: "service-violet", depts: "5 départements", img: "/images/zones/hauts-de-france.webp" },
              { name: "Auvergne-Rhône-Alpes", link: "/zones-intervention", color: "service-orange", depts: "12 départements", img: "/images/zones/auvergne-rhone-alpes.webp" },
              { name: "PACA", link: "/zones-intervention", color: "service-rose", depts: "6 départements", img: "/images/zones/paca.webp" },
              { name: "Normandie", link: "/zones-intervention", color: "service-cyan", depts: "5 départements", img: "/images/zones/normandie.webp" },
              { name: "Grand Est", link: "/zones-intervention", color: "service-blue", depts: "10 départements", img: "/images/zones/grand-est.webp" },
              { name: "Occitanie", link: "/zones-intervention", color: "service-orange", depts: "13 départements", img: "/images/zones/occitanie.webp" },
              { name: "Nouvelle-Aquitaine", link: "/zones-intervention", color: "service-emerald", depts: "12 départements", img: "/images/zones/nouvelle-aquitaine.webp" },
              { name: "Bretagne", link: "/zones-intervention", color: "service-violet", depts: "4 départements", img: "/images/zones/bretagne.webp" },
            ].map((r, i) => (
              <motion.div key={r.name} {...staggerItem(i)}>
                <Link to={r.link} className="block bg-card rounded-xl overflow-hidden border border-border card-shadow hover:card-shadow-hover transition-all duration-500 text-center group">
                  <div className="h-24 overflow-hidden relative">
                    <img src={r.img} alt={`Intervention volets roulants ${r.name}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className={`absolute top-2 left-2 w-8 h-8 rounded-lg bg-${r.color} flex items-center justify-center shadow-lg`}>
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-display font-bold text-foreground text-sm mb-0.5 group-hover:text-accent transition-colors">{r.name}</h3>
                    <p className="text-xs text-muted-foreground">{r.depts}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/zones-intervention" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
              Voir toutes nos zones d'intervention <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA + Maillage interne - style riche comme accueil */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <Shield className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Besoin d'une intervention ?</h2>
            <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto">
              Nos experts sont disponibles pour vous conseiller et intervenir rapidement. Contactez-nous dès maintenant.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button size="lg" variant="secondary" className="px-8 py-7 text-lg font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-105" asChild>
                <a href="/#devis" className="flex items-center gap-2">Demander un Devis <ArrowRight className="h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 px-8 py-7 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105" asChild>
                <a href="tel:0603205967" className="flex items-center gap-2"><Phone className="h-5 w-5" /> 06 03 20 59 67</a>
              </Button>
            </div>
            {/* Service links - Maillage interne */}
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {[
                { label: "Réparation de volets", href: "/services/reparation-volets-roulants", icon: Wrench },
                { label: "Dépannage express", href: "/services/depannage-express", icon: Zap },
                { label: "Installation & Remplacement", href: "/services/installation-remplacement-volets", icon: LayoutGrid },
                { label: "Motorisation & Domotique", href: "/services/motorisation-domotique", icon: Cpu },
                { label: "Vitrerie & Vitrage", href: "/services/vitrerie-remplacement-vitrage", icon: GlassWater },
              ].map((s) => (
                <Link key={s.href} to={s.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-foreground/20 bg-accent-foreground/5 text-sm font-semibold text-accent-foreground hover:bg-accent-foreground/15 hover:shadow-md transition-all duration-300 backdrop-blur-sm">
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPage;
