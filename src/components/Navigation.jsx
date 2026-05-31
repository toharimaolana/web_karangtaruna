import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';


const navLinks = [
  { name: 'Beranda', href: '#' },
  { name: 'Visi Misi', href: '#visi-misi' },
  { name: 'Program', href: '#program' },
  { name: 'Galeri', href: '#galeri' },
];

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  // Scroll Spy Logic
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // Offset untuk kecocokan posisi scroll

      if (window.scrollY < 50) {
        setActiveSection('#');
        return;
      }

      const sections = [
        { id: '#visi-misi', element: document.getElementById('visi-misi') },
        { id: '#program', element: document.getElementById('program') },
        { id: '#galeri', element: document.getElementById('galeri') },
        { id: '#kontak', element: document.getElementById('kontak') },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Pemicu awal

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle redirect from another page or initial hash scroll
  useEffect(() => {
    if (location.pathname !== '/') return;

    // 1. Check if we navigated here with state
    if (location.state?.scrollToSection) {
      const target = location.state.scrollToSection;
      
      // Clear location state to prevent repeating on refresh
      navigate('/', { replace: true, state: {} });
      
      setTimeout(() => {
        if (target === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('#');
        } else {
          const element = document.querySelector(target);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            setActiveSection(target);
          }
        }
      }, 150);
      return;
    }

    // 2. Check if we have a hash in the URL on initial mount/load
    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          setActiveSection(hash);
        }
      }, 300);
    }
  }, [location, navigate]);

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToSection: href } });
      return;
    }

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('#');
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setActiveSection(href);
      }
    }
  };


  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass border-b border-slate-100/80 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.01)]' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#');
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-xl font-bold font-syne tracking-tight cursor-pointer"
          >
            <span className="text-slate-900 font-black">
              KARTA<span className="text-brand-blue">BESTFIVE</span>
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-bold px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-brand-blue bg-brand-blue/8 shadow-sm shadow-brand-blue/5'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}

            <div className="w-px h-6 bg-slate-200/80 mx-2" />

            <motion.a
              href="#kontak"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#kontak');
              }}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-brand-blue text-white text-sm font-bold rounded-full shadow-md shadow-brand-blue/15 hover:shadow-lg hover:shadow-brand-blue/25 transition-all duration-300 cursor-pointer flex items-center gap-1.5"
            >
              <MessageCircle size={15} />
              Kontak
            </motion.a>
          </div>

          {/* Hamburguer Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Premium Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-0 z-40 bg-white md:hidden flex flex-col justify-between p-8 pt-28"
          >
            {/* Ambient Background Glow in Mobile Menu */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <div className="absolute top-[-10%] right-[-10%] w-[18rem] h-[18rem] bg-brand-blue/6 rounded-full blur-[80px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[15rem] h-[15rem] bg-brand-red/4 rounded-full blur-[80px]" />
            </div>

            {/* Menu Links */}
            <div className="relative z-10 flex flex-col gap-8">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    onClick={() => scrollToSection(link.href)}
                    whileTap={{ scale: 0.98 }}
                    className={`text-4xl font-black font-syne tracking-tight text-left w-full cursor-pointer ${
                      isActive ? 'text-brand-blue' : 'text-slate-800 hover:text-brand-blue'
                    }`}
                  >
                    {link.name}
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 flex flex-col gap-6 w-full"
            >
              <button
                onClick={() => scrollToSection('#kontak')}
                className="w-full py-4 bg-brand-blue text-white font-bold rounded-2xl shadow-lg shadow-brand-blue/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={18} />
                Hubungi Pengurus
              </button>
              <div className="text-center text-xs text-slate-400 font-extrabold tracking-wider uppercase">
                Karang Taruna RW 005 • Mangga Besar
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}