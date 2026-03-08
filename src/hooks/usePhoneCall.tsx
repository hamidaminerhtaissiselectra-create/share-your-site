import { useMemo } from 'react';
import { content } from '@/data/content';

export const usePhoneCall = () => {
  const contactInfo = content.company.contact;
  
  const phoneNumber = contactInfo.phoneMobile;
  const cleanPhone = phoneNumber.replace(/\s/g, '');
  
  const whatsappNumber = cleanPhone.replace('+', '');
  const whatsappMessage = encodeURIComponent("Bonjour, je souhaite obtenir un devis pour la réparation ou l'installation de volets roulants.");
  
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
      || window.innerWidth < 768;
  }, []);
  
  const callUrl = useMemo(() => {
    if (isMobile) {
      return `tel:${cleanPhone}`;
    }
    return `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  }, [isMobile, cleanPhone, whatsappNumber, whatsappMessage]);
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const telUrl = `tel:${cleanPhone}`;
  
  return {
    phoneNumber,
    cleanPhone,
    whatsappNumber,
    callUrl,
    whatsappUrl,
    telUrl,
    isMobile,
  };
};

export default usePhoneCall;
