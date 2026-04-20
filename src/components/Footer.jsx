import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socialLinks = [
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
  { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
];

const footerLinks = [
  {
    title: 'Navigasi',
    links: [
      { name: 'Beranda', href: '#' },
      { name: 'Visi Misi', href: '#visi-misi' },
      { name: 'Struktur', href: '#struktur' },
      { name: 'Program', href: '#program' },
    ],
  },
  {
    title: 'Program',
    links: [
      { name: 'Pelatihan Kewirausahaan', href: '#' },
      { name: 'Bakti Sosial', href: '#' },
      { name: 'Workshop Digital', href: '#' },
      { name: 'Festival Budaya', href: '#' },
    ],
  },
  {
    title: 'Kontak',
    links: [
      { name: 'info@bestfive.org', href: 'mailto:info@bestfive.org' },
      { name: '+62 812 3456 7890', href: 'tel:+6281234567890' },
      { name: 'Jakarta Selatan, Indonesia', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="kontak" className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-royal-blue/50 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-royal-blue/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-royal-blue/5 rounded-full blur-[60px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold font-[family-name:var(--font-syne)] mb-4">
                KARANG TARUNA <span className="text-royal-blue">BESTFIVE</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Organisasi pemuda yang berkomitmen untuk memberdayakan generasi muda 
                melalui pendidikan, kreativitas, dan solidaritas sosial.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-slate-800 rounded-full text-slate-400 hover:bg-royal-blue hover:text-white transition-colors duration-300"
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {footerLinks.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.6 }}
            >
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-royal-blue transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Karang Taruna Bestfive. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={14} className="text-royal-blue" />
              <span>Jakarta Selatan, Indonesia</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}