/**
 * Hook personnalisé pour générer des srcset responsives et des images optimisées
 * Supporte WebP avec fallback et différentes résolutions
 */
export const useResponsiveImage = (basePath: string, name: string) => {
  const generateSrcSet = (format: 'webp' | 'jpg' = 'webp') => {
    const ext = format === 'webp' ? 'webp' : 'jpg';
    return `
      ${basePath}/${name}-sm.${ext} 640w,
      ${basePath}/${name}-md.${ext} 1024w,
      ${basePath}/${name}-lg.${ext} 1920w
    `.trim();
  };

  const generatePictureSources = () => {
    return {
      webp: generateSrcSet('webp'),
      jpg: generateSrcSet('jpg'),
    };
  };

  return {
    generateSrcSet,
    generatePictureSources,
    webpSrcSet: generateSrcSet('webp'),
    jpgSrcSet: generateSrcSet('jpg'),
  };
};

/**
 * Fonction utilitaire pour calculer les dimensions d'image optimales
 */
export const calculateImageDimensions = (
  containerWidth: number,
  aspectRatio: number = 16 / 9
) => {
  return {
    width: containerWidth,
    height: Math.round(containerWidth / aspectRatio),
  };
};

/**
 * Fonction pour générer une couleur de placeholder basée sur le hash du chemin
 */
export const generatePlaceholderColor = (imagePath: string): string => {
  let hash = 0;
  for (let i = 0; i < imagePath.length; i++) {
    hash = ((hash << 5) - hash) + imagePath.charCodeAt(i);
    hash = hash & hash;
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 80%)`;
};
