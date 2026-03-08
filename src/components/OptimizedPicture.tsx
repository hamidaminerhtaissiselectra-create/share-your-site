import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedPictureProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  placeholder?: string;
}

/**
 * Composant Picture optimisé avec support WebP, lazy loading et placeholder
 * Améliore les Core Web Vitals en utilisant des formats modernes et le lazy loading
 */
const OptimizedPicture = ({
  src,
  alt,
  srcSet,
  sizes,
  className,
  width,
  height,
  priority = false,
  onLoad,
  placeholder,
}: OptimizedPictureProps) => {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [imageSrc, setImageSrc] = useState<string | undefined>(priority ? src : placeholder);
  const pictureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (pictureRef.current) {
      observer.observe(pictureRef.current);
    }

    return () => {
      if (pictureRef.current) {
        observer.unobserve(pictureRef.current);
      }
    };
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Générer les chemins WebP et fallback
  const webpSrc = (imageSrc || src).replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const jpgSrc = imageSrc || src;

  return (
    <div ref={pictureRef} className={cn('overflow-hidden', className)}>
      <picture>
        {/* WebP format (modern browsers) */}
        <source
          srcSet={srcSet || webpSrc}
          type="image/webp"
          sizes={sizes}
        />
        {/* Fallback to JPG/PNG */}
        <img
          src={jpgSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={handleLoad}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
        />
      </picture>
    </div>
  );
};

export default OptimizedPicture;
