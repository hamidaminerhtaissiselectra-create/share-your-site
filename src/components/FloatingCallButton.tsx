import { Phone, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FloatingCallButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.a
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              href="https://wa.me/33603205967"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-xl hover:bg-[#128C7E] transition-colors"
              aria-label="Contacter par WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-bold whitespace-nowrap">WhatsApp</span>
            </motion.a>
            <motion.a
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ duration: 0.2 }}
              href="tel:+33603205967"
              className="flex items-center gap-3 bg-accent text-accent-foreground pl-4 pr-5 py-3 rounded-full shadow-xl hover:bg-accent/90 transition-colors"
              aria-label="Appeler directement"
            >
              <Phone className="h-5 w-5" />
              <span className="text-sm font-bold whitespace-nowrap">Appeler</span>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-accent text-accent-foreground p-4 rounded-full shadow-2xl hover:bg-accent/90 transition-colors flex items-center justify-center"
        aria-label="Nous contacter"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-7 w-7" />
            </motion.div>
          ) : (
            <motion.div key="phone" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Phone className="h-7 w-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingCallButton;
