/**
 * Animation Presets — Premium Scroll Reveal System
 * 
 * 3 types d'animations max : fade-up, fade-left, fade-right
 * Courbe d'easing douce, durées cohérentes, pas de clignotement.
 * 
 * Usage: <motion.div {...fadeUp}> ou <motion.div {...staggerItem(i)}>
 */

// Courbe d'easing premium — décélération douce et naturelle
const ease = [0.25, 0.1, 0.25, 1.0] as const;

// Viewport config — déclenche quand 20% visible, empêche le flicker
const viewport = { once: true, amount: 0.15 };

// ─── Section-Level Animations ───────────────────────────────────────────

/** Fade-in + slide-up — pour les en-têtes et blocs de contenu */
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { duration: 0.7, ease },
};

/** Fade-in + slide depuis la gauche — pour les blocs image/texte alternés */
export const fadeLeft = {
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport,
  transition: { duration: 0.7, ease },
};

/** Fade-in + slide depuis la droite */
export const fadeRight = {
  initial: { opacity: 0, x: 24 },
  whileInView: { opacity: 1, x: 0 },
  viewport,
  transition: { duration: 0.7, ease },
};

/** Fade-in simple sans mouvement — pour les conteneurs déjà animés */
export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport,
  transition: { duration: 0.6, ease },
};

// ─── Staggered Item Animations ──────────────────────────────────────────

/** Pour les items de grille avec stagger — i = index de l'item */
export const staggerItem = (i: number) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport,
  transition: { duration: 0.5, delay: Math.min(i * 0.08, 0.48), ease },
});

// ─── Hover Effects ──────────────────────────────────────────────────────

/** Lift subtil au hover pour les cartes */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.3, ease } },
};

/** Lift plus prononcé pour les cartes de service */
export const hoverLiftMd = {
  whileHover: { y: -6, transition: { duration: 0.3, ease } },
};

// ─── Hero / Page Entry Animations ───────────────────────────────────────

/** Animation d'entrée de page (pas whileInView, mais animate) */
export const heroEntry = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});
