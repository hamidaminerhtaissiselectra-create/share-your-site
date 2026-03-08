import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
        >
          <div className="bg-card border border-border shadow-2xl rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-accent/10 p-2 rounded-lg">
                <Cookie className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground mb-2">Respect de votre vie privée</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. En continuant, vous acceptez notre politique de confidentialité.
                </p>
                <div className="flex gap-3">
                  <Button onClick={acceptCookies} className="bg-accent text-white hover:bg-accent/90 flex-1">
                    Accepter
                  </Button>
                  <Button variant="outline" onClick={() => setIsVisible(false)} className="flex-1">
                    Refuser
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
