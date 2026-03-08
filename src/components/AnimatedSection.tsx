import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in';
  delay?: number;
}

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const variants = {
  'fade-up': { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } },
  'fade-left': { initial: { opacity: 0, x: -24 }, whileInView: { opacity: 1, x: 0 } },
  'fade-right': { initial: { opacity: 0, x: 24 }, whileInView: { opacity: 1, x: 0 } },
  'scale-in': { initial: { opacity: 0, scale: 0.96 }, whileInView: { opacity: 1, scale: 1 } },
};

const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fade-up',
  delay = 0,
}: AnimatedSectionProps) => {
  const v = variants[animation] || variants['fade-up'];

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ 
        duration: 0.7, 
        delay: delay / 1000,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
