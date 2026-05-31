import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import SloganMarquee from '../components/SloganMarquee';
import VisiMisi from '../components/VisiMisi';
import StrukturOrganisasi from '../components/StrukturOrganisasi';
import ProgramKerjaGallery from '../components/ProgramKerjaGallery';
import PetaWilayah from '../components/PetaWilayah';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollToSection) {
      const href = location.state.scrollToSection;
      
      const timer = setTimeout(() => {
        if (href === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150); // Small delay to let DOM render and Lenis initialize

      // Clear router state to prevent scrolling again on page refresh
      window.history.replaceState({}, document.title);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <SloganMarquee />
      <VisiMisi />
      <StrukturOrganisasi />
      <ProgramKerjaGallery />
      <PetaWilayah />
    </>
  );
}

