# Audit SEO Complet - Répar'Action Volets

## 📊 État Actuel du SEO

### ✅ Points Forts Identifiés

#### 1. **Balisage Sémantique**
- ✅ H1 unique et descriptif dans HeroSection : "Dépannage, Réparation & Motorisation de Volets Roulants à Paris"
- ✅ H2 bien structurés dans ServicesSection, AboutSection, FAQSection
- ✅ H3 présents dans les cartes de services et sections d'information
- ✅ Structure hiérarchique cohérente (H1 → H2 → H3)

#### 2. **Données Structurées (JSON-LD)**
- ✅ LocalBusiness schema complet avec adresse, téléphone, horaires
- ✅ Organization schema présent
- ✅ Service schema pour chaque service offert
- ✅ Review schema avec ratings agrégés (4.9/5)
- ✅ HowTo schema pour les recherches vocales
- ✅ FAQPage schema avec questions/réponses structurées

#### 3. **Meta Tags & Open Graph**
- ✅ Title tag optimisé (155 caractères)
- ✅ Meta description optimisé (160 caractères)
- ✅ Keywords pertinents inclus
- ✅ Open Graph tags pour les réseaux sociaux
- ✅ Twitter Card tags
- ✅ Canonical URL défini

#### 4. **Géo-ciblage**
- ✅ Balises geo.region, geo.placename, geo.position
- ✅ ICBM coordinates
- ✅ Language meta tags (fr-FR)
- ✅ areaServed avec 14 villes/régions listées

#### 5. **Performance & Core Web Vitals**
- ✅ Preconnect/DNS-prefetch pour Google Fonts
- ✅ Preload pour hero image en WebP
- ✅ Image lazy loading
- ✅ Code splitting avec React.lazy()
- ✅ Vite pour bundle optimization

---

## 🎯 Optimisations Recommandées

### Phase 2 : Optimisation du Balisage (H1-H3) & Meta-tags

#### 2.1 **Amélioration des Balises H1-H3**

**Objectif :** Renforcer la pertinence SEO en optimisant les balises de titre pour chaque page.

| Page | H1 Actuel | H1 Optimisé | Priorité |
|------|-----------|------------|----------|
| Accueil | "Dépannage, Réparation & Motorisation de Volets Roulants à Paris" | "Dépannage, Réparation & Motorisation de Volets Roulants à Paris — Expert RGE Intervention 48h" | 🔴 Haute |
| Réparation | À vérifier | "Réparation de Volets Roulants à Paris & Île-de-France — Diagnostic Gratuit, Garantie 3 ans" | 🔴 Haute |
| Installation | À vérifier | "Installation de Volets Roulants Neufs à Paris — Sur-mesure, Garantie Décennale" | 🔴 Haute |
| Vitrerie | À vérifier | "Vitrerie & Remplacement de Vitrage à Paris — Urgence 7j/7" | 🔴 Haute |
| Motorisation | À vérifier | "Motorisation de Volets Roulants — Somfy, Google Home, Alexa" | 🔴 Haute |
| Dépannage Express | À vérifier | "Dépannage Express Volets Roulants — Intervention le Jour Même à Paris" | 🔴 Haute |

#### 2.2 **Amélioration des Meta-tags par Page**

**Stratégie :** Chaque page doit avoir des meta-tags uniques et optimisés pour les mots-clés de longue traîne.

**Exemple pour la page Réparation :**
- Title : "Réparation de Volets Roulants à Paris & Île-de-France | Diagnostic Gratuit | Répar'Action"
- Description : "Réparation rapide de volets roulants à Paris. Diagnostic gratuit, devis transparent, garantie 3 ans. Intervention sous 48h. Appelez le 06 03 20 59 67."
- Keywords : "réparation volet roulant Paris, réparation volet électrique, volet bloqué, moteur volet en panne"

#### 2.3 **Optimisation des Balises H2 & H3**

**Règles à respecter :**
- Chaque H2 doit contenir des mots-clés pertinents
- Les H3 doivent être des sous-titres naturels et informatifs
- Éviter les H2/H3 vides ou génériques

**Exemple actuel (ServicesSection) :**
```
H2: "Dépannage, Réparation, Installation & Motorisation de Volets Roulants"
H3: "Dépannage Express", "Installation Complète", "Réparation de Volets Roulants", etc.
```

**Optimisation proposée :**
```
H2: "Nos Services Complets : Dépannage, Réparation, Installation & Motorisation de Volets Roulants à Paris"
H3: "Dépannage Express Volets Roulants — Intervention le Jour Même"
H3: "Installation Complète de Volets Roulants Neufs — Sur-mesure & Garantie Décennale"
H3: "Réparation Professionnelle de Volets Roulants — Toutes Marques (Somfy, Bubendorff, Simu)"
```

---

### Phase 3 : Données Structurées & Optimisation pour l'IA

#### 3.1 **Enrichissement des Schémas JSON-LD**

**Schémas à améliorer/ajouter :**

1. **BreadcrumbList** (Navigation structurée)
   - Ajouter sur chaque page pour améliorer le CTR dans les SERPs

2. **Product/Service avec Offer** (Prix structuré)
   - Ajouter les prix indicatifs pour les services principaux
   - Format : `"priceCurrency": "EUR", "price": "80-350"`

3. **AggregateOffer** (Comparaison de prix)
   - Afficher les plages de prix pour chaque service

4. **VideoObject** (Vidéos de démonstration)
   - Si des vidéos sont ajoutées ultérieurement

5. **NewsArticle** (Articles de blog)
   - Ajouter pour chaque article du blog

#### 3.2 **Optimisation pour les Moteurs de Réponse IA (SGE, Copilot, etc.)**

**Stratégie :**
- Ajouter des sections "Réponse directe" dans le contenu
- Utiliser des listes à puces et tableaux pour les faits structurés
- Inclure des définitions claires et concises
- Ajouter des citations et sources fiables

**Exemple :**
```
Q: "Combien coûte la réparation d'un volet roulant à Paris ?"
A: "La réparation d'un volet roulant à Paris coûte entre 60€ et 350€ selon le type de panne :
   - Sangle ou manivelle : 60€-120€
   - Moteur Somfy/Bubendorff : 180€-350€
   - Lames cassées : 80€-150€
   Répar'Action Volets offre un diagnostic gratuit et un devis transparent."
```

---

### Phase 4 : Géo-ciblage Avancé

#### 4.1 **Amélioration du Géo-ciblage Local**

**Actions :**
1. Ajouter des pages spécifiques par arrondissement de Paris (75001-75020)
2. Ajouter des pages par commune importante en Île-de-France
3. Inclure des adresses et horaires locaux dans le schema
4. Ajouter des reviews locales (Google, Trustpilot)

#### 4.2 **Optimisation Google My Business**

- ✅ Déjà inclus dans le schema (Google Maps link)
- À vérifier : Synchronisation avec le profil Google My Business réel

---

## 📝 Fichiers à Modifier

### Composants React à Optimiser
1. `src/pages/Index.tsx` - Améliorer les meta-tags
2. `src/pages/services/*.tsx` - Ajouter des H1 uniques et optimisés
3. `src/pages/regions/*.tsx` - Ajouter des H1 géo-ciblés
4. `src/components/HeroSection.tsx` - Vérifier H1
5. `src/components/ServicesSection.tsx` - Optimiser H2/H3
6. `src/components/FAQSection.tsx` - Vérifier H2/H3
7. `src/components/AboutSection.tsx` - Optimiser H2/H3

### Fichiers de Configuration
1. `index.html` - Améliorer les meta-tags globaux
2. `src/hooks/useSEO.tsx` - Vérifier l'implémentation

---

## 🎯 Objectif Final

**Atteindre le Top 3 des résultats de recherche pour :**
- "réparation volet roulant Paris"
- "dépannage volet roulant urgence"
- "motorisation volet roulant Paris"
- "vitrerie Paris urgence"
- Et 50+ autres requêtes de longue traîne

**Métriques de suivi :**
- Classement moyen des mots-clés cibles
- Trafic organique mensuel
- CTR (Click-Through Rate) dans les SERPs
- Taux de conversion
- Core Web Vitals scores

---

## 📅 Calendrier d'Implémentation

| Phase | Tâche | Durée | Statut |
|-------|-------|-------|--------|
| 1 | Analyse & Nettoyage | ✅ Complété | ✅ |
| 2 | Optimisation Balisage H1-H3 | En cours | 🔄 |
| 3 | Données Structurées & IA | À faire | ⏳ |
| 4 | Nettoyage & Archive | À faire | ⏳ |
| 5 | Livraison | À faire | ⏳ |

