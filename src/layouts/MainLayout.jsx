import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  const { pathname } = useLocation();
  const isAdminOrLogin = pathname === '/login' || pathname.startsWith('/admin');

  useEffect(() => {
    // Disable Lenis smooth scrolling entirely for admin and login dashboards
    if (isAdminOrLogin) return;

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
  }, [isAdminOrLogin]);

  if (isAdminOrLogin) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <main>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}

