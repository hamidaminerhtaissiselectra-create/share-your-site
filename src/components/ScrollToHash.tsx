import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_HEIGHT = 80;

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (attempt < 15) {
        setTimeout(() => tryScroll(attempt + 1), 120);
      }
    };

    // Small delay to let page render
    setTimeout(() => tryScroll(), 100);
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;
