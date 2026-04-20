import { useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import VisiMisi from './components/VisiMisi';
import StrukturOrganisasi from './components/StrukturOrganisasi';
import ProgramKerjaGallery from './components/ProgramKerjaGallery';
import PetaWilayah from './components/PetaWilayah';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <VisiMisi />
        <StrukturOrganisasi />
        <ProgramKerjaGallery />
        <PetaWilayah />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;