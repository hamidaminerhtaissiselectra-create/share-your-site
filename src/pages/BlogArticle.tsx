import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, ChevronRight, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogArticles } from "@/data/blogArticles";

const FRENCH_MONTHS: Record<string, string> = {
  "janvier": "01", "février": "02", "mars": "03", "avril": "04",
  "mai": "05", "juin": "06", "juillet": "07", "août": "08",
  "septembre": "09", "octobre": "10", "novembre": "11", "décembre": "12",
};

const parseFrenchDate = (dateStr: string): string => {
  const parts = dateStr.toLowerCase().match(/(\d+)\s+(\w+)\s+(\d{4})/);
  if (!parts) return "2026-02-22";
  const month = FRENCH_MONTHS[parts[2]] || "01";
  return `${parts[3]}-${month}-${parts[1].padStart(2, "0")}`;
};

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  useSEO({
    title: article ? `${article.title} | Blog Répar'Action Volets` : "Article non trouvé | Répar'Action Volets",
    description: article?.metaDescription || "Article de blog Répar'Action Volets.",
    keywords: article ? `${article.category}, volet roulant, ${article.title.toLowerCase().split(" ").slice(0, 3).join(", ")}` : "",
    canonicalUrl: article ? `https://reparaction-volets.fr/blog/${article.slug}` : undefined,
    ogImage: article?.image ? `https://reparaction-volets.fr${article.image}` : undefined,
  });

  useEffect(() => {
    if (article) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://reparaction-volets.fr" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://reparaction-volets.fr/blog" },
          { "@type": "ListItem", position: 3, name: article.title, item: `https://reparaction-volets.fr/blog/${article.slug}` },
        ],
      };

      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.metaDescription,
        image: article.image ? `https://reparaction-volets.fr${article.image}` : undefined,
        author: { "@type": "Organization", name: "Répar'Action Volets", url: "https://reparaction-volets.fr" },
        publisher: { 
          "@type": "Organization", 
          name: "Répar'Action Volets", 
          url: "https://reparaction-volets.fr",
          logo: { "@type": "ImageObject", url: "https://reparaction-volets.fr/images/og-image.webp" }
        },
        datePublished: article.date ? parseFrenchDate(article.date) : "2026-02-22",
        dateModified: article.date ? parseFrenchDate(article.date) : "2026-02-22",
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://reparaction-volets.fr/blog/${article.slug}` },
        inLanguage: "fr-FR",
        keywords: `${article.category}, volet roulant`,
      };

      const s1 = document.createElement("script");
      s1.type = "application/ld+json";
      s1.innerHTML = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(s1);

      const s2 = document.createElement("script");
      s2.type = "application/ld+json";
      s2.innerHTML = JSON.stringify(articleSchema);
      document.head.appendChild(s2);

      return () => {
        document.head.removeChild(s1);
        document.head.removeChild(s2);
      };
    }
  }, [article]);

  if (!article) return <Navigate to="/blog" replace />;

  const relatedArticles = [
    ...blogArticles.filter((a) => a.slug !== slug && a.category === article.category),
    ...blogArticles.filter((a) => a.slug !== slug && a.category !== article.category),
  ].slice(0, 3);

  // Simple markdown-to-JSX renderer with proper list wrapping
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const rawElements: { type: string; element: JSX.Element }[] = [];
    let tableRows: string[][] = [];
    let inTable = false;
    let tableIndex = 0;

    const processInline = (text: string) => {
      const parts = text.split(/\*\*(.*?)\*\*/g);
      return parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-foreground font-semibold">{part}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      );
    };

    const flushTable = () => {
      if (tableRows.length > 1) {
        const headers = tableRows[0];
        const rows = tableRows.slice(2);
        rawElements.push({ type: "other", element: (
          <div key={`table-${tableIndex}`} className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  {headers.map((h, i) => (
                    <th key={i} className="text-left py-3 px-4 font-bold text-foreground bg-muted/50">{processInline(h.trim())}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border hover:bg-muted/30 transition-colors">
                    {row.map((cell, ci) => (
                      <td key={ci} className="py-2.5 px-4 text-muted-foreground">{processInline(cell.trim())}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )});
        tableIndex++;
      }
      tableRows = [];
      inTable = false;
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("|")) {
        const cells = trimmed.split("|").filter(Boolean);
        if (!inTable) inTable = true;
        tableRows.push(cells);
        return;
      } else if (inTable) {
        flushTable();
      }

      if (!trimmed) return;

      if (trimmed.startsWith("## ")) {
        rawElements.push({ type: "other", element: <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-10 mb-4">{trimmed.slice(3)}</h2> });
      } else if (trimmed.startsWith("### ")) {
        rawElements.push({ type: "other", element: <h3 key={i} className="font-display text-xl font-bold text-foreground mt-8 mb-3">{trimmed.slice(4)}</h3> });
      } else if (trimmed.startsWith("- ")) {
        rawElements.push({ type: "ul", element: (
          <li key={i} className="flex items-start gap-2 text-muted-foreground mb-1.5">
            <span className="text-accent mt-1.5 shrink-0">•</span>
            <span>{processInline(trimmed.slice(2))}</span>
          </li>
        )});
      } else if (/^\d+\.\s/.test(trimmed)) {
        const num = trimmed.match(/^(\d+)\.\s/)?.[1];
        rawElements.push({ type: "ol", element: (
          <li key={i} className="flex items-start gap-3 text-muted-foreground mb-2">
            <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{num}</span>
            <span>{processInline(trimmed.replace(/^\d+\.\s/, ""))}</span>
          </li>
        )});
      } else {
        rawElements.push({ type: "other", element: <p key={i} className="text-muted-foreground leading-relaxed mb-4">{processInline(trimmed)}</p> });
      }
    });

    if (inTable) flushTable();

    // Group consecutive li into ul/ol
    const finalElements: JSX.Element[] = [];
    let listBuffer: JSX.Element[] = [];
    let listType = "";
    let listIdx = 0;

    const flushList = () => {
      if (listBuffer.length > 0) {
        const Tag = listType === "ol" ? "ol" : "ul";
        finalElements.push(<Tag key={`list-${listIdx}`} className="ml-4 mb-4 list-none">{listBuffer}</Tag>);
        listIdx++;
        listBuffer = [];
        listType = "";
      }
    };

    rawElements.forEach((item) => {
      if (item.type === "ul" || item.type === "ol") {
        if (listType && listType !== item.type) flushList();
        listType = item.type;
        listBuffer.push(item.element);
      } else {
        flushList();
        finalElements.push(item.element);
      }
    });
    flushList();

    return finalElements;
  };

  return (
    <main id="main-content" className="relative">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-12 bg-hero-gradient text-primary-foreground overflow-hidden">
        {article.image && (
          <div className="absolute inset-0 opacity-15">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" width={1200} height={630} />
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-6">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="truncate max-w-[200px]">{article.title}</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <Badge variant="accent" className="px-3 py-1 rounded-full text-xs font-semibold mb-4">
              {article.category}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {article.date}</div>
              <div className="flex items-center gap-2"><User className="h-4 w-4" /> {article.author}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {article.image && (
                <div className="rounded-2xl overflow-hidden mb-8 shadow-xl border border-border">
                  <img src={article.image} alt={article.title} className="w-full h-auto object-cover max-h-[400px]" width={800} height={400} />
                </div>
              )}
              {renderContent(article.content)}
            </motion.article>

            {/* CTA in article */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 bg-hero-gradient rounded-2xl p-8 text-primary-foreground text-center">
              <h3 className="font-display text-2xl font-bold mb-3">Besoin d'un Expert ?</h3>
              <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">Nos techniciens certifiés RGE interviennent dans toute la France. Diagnostic gratuit, devis transparent.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="accent" asChild className="gap-2 rounded-full">
                  <a href="/#devis">Devis Gratuit <ArrowRight className="h-4 w-4" /></a>
                </Button>
                <Button variant="accent-outline" asChild className="gap-2 rounded-full">
                  <a href="tel:0603205967"><Phone className="h-4 w-4" /> 06 03 20 59 67</a>
                </Button>
              </div>
            </motion.div>

            {/* Back */}
            <div className="mt-8">
              <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm transition-colors">
                <ArrowLeft className="h-4 w-4" /> Retour au blog
              </Link>
            </div>
          </div>

          {/* Related */}
          {relatedArticles.length > 0 && (
            <div className="max-w-5xl mx-auto mt-16">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Articles similaires</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((a) => (
                  <Link key={a.slug} to={`/blog/${a.slug}`} className="bg-card rounded-xl p-6 border border-border card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all">
                    <Badge variant="accent" className="px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3">{a.category}</Badge>
                    <h3 className="font-display font-bold text-foreground text-sm mb-2 line-clamp-2">{a.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{a.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogArticlePage;
