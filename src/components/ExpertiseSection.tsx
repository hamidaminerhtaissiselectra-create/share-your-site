import { motion } from "framer-motion";
import { CheckCircle2, Zap, ShieldCheck } from "lucide-react";

interface ExpertiseSectionProps {
  image: string;
  title: string;
  description: string;
  points: string[];
}

const ExpertiseSection = ({ image, title, description, points }: ExpertiseSectionProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>
            
            <div className="space-y-4 mb-10">
              {points.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-8 pt-6 border-t border-border">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-service-blue/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-service-blue" />
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Diagnostic</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-service-emerald/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-service-emerald" />
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Garantie</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
