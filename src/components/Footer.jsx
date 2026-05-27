import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare, ExternalLink } from 'lucide-react';

function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

const socialLinks = [
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
  { icon: YouTubeIcon, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer id="kontak" className="relative bg-slate-950 text-white overflow-hidden">

      {/* Visual Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-blue/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-brand-red/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

          {/* Column 1: Organization Brief (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xl sm:text-2xl font-black font-syne tracking-tight">
              KARANG TARUNA <span className="text-brand-blue">BESTFIVE</span>
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Organisasi kepemudaan RW 005 Taman Sari yang modern, berjiwa aksi sosial nyata,
              serta menjunjung tinggi sportivitas dan gotong royong warga.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-900 border border-slate-800/80 rounded-full text-slate-400 hover:bg-brand-blue hover:border-brand-blue hover:text-white flex items-center justify-center transition-all duration-300 shadow-md"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Fast Navigation (Span 2) */}
          <div className="lg:col-span-2 lg:pl-4 space-y-5">
            <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-widest font-syne">
              Navigasi Cepat
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Beranda', href: '#' },
                { name: 'Visi Misi', href: '#visi-misi' },
                { name: 'Struktur Organisasi', href: '#struktur' },
                { name: 'Program Kerja', href: '#program' },
                { name: 'Peta Wilayah', href: '#peta-wilayah' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-brand-blue transition-colors duration-300 text-sm font-semibold flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 bg-slate-800 group-hover:bg-brand-blue rounded-full transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Official Address (Span 3) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-widest font-syne">
              Alamat Resmi
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-black text-slate-300 font-syne">Pos RW 005</h5>
                  <p className="text-slate-400 text-xs leading-relaxed mt-1">
                    POS RW 05(Taman Sari)
                    Jl. Mangga Besar IV R No.35, RT.6/RW.5, Taman Sari, Kec. Taman Sari, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11150
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Contact & WhatsApp (Span 3) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-widest font-syne">
              Hubungi Kami
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Mail className="w-4 h-4 text-brand-blue" />
                <a href="mailto:info@bestfive.org" className="hover:text-brand-blue transition-colors font-semibold">
                  info@bestfive.org
                </a>
              </div>

              {/* Pulsing Active WhatsApp Action Button */}
              <motion.a
                href="https://wa.me/6281234567890?text=Halo%20Karang%20Taruna%20Bestfive!"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full items-center justify-between gap-3 p-3.5 bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 hover:border-emerald-500 text-emerald-400 hover:text-white rounded-2xl transition-all duration-300 shadow-md group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {/* Pulse active green dot indicator */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider font-syne">
                    Hubungi WhatsApp
                  </span>
                </div>
                <MessageSquare className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              </motion.a>

              <p className="text-[10px] text-slate-500 leading-normal">
                Pusat pengaduan masyarakat, pendaftaran kegiatan, dan aspirasi kepemudaan RW 005.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 pt-8 border-t border-slate-900"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-xs font-medium text-center sm:text-left">
              © {new Date().getFullYear()} Karang Taruna Bestfive RW 005. All rights reserved.
            </p>

            <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-black tracking-wider">
              <span>Made with Love for RW 005</span>
              <ExternalLink className="w-3 h-3 text-brand-blue" />
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}