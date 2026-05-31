import { motion } from 'framer-motion';
import { MapPin, Compass, Building, Users } from 'lucide-react';

export default function PetaWilayah() {
  const stats = [
    { icon: <Building className="w-5 h-5 text-brand-blue" />, title: '10 Rukun Tetangga', desc: 'Melingkupi area RT 01 s/d RT 10' },
    { icon: <Users className="w-5 h-5 text-brand-red" />, title: '450+ Kepala Keluarga', desc: 'Warga yang rukun dan bergotong royong' },
    { icon: <Compass className="w-5 h-5 text-brand-yellow" />, title: 'POS RW 005', desc: 'Poros utama aktivitas kepemudaan' },
  ];

  return (
    <section
      id="peta-wilayah"
      className="relative py-24 md:py-32 bg-slate-50 overflow-hidden"
    >
      {/* Background glowing decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] left-[-15%] w-[40rem] h-[40rem] rounded-full bg-brand-blue/3 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[40rem] h-[40rem] rounded-full bg-brand-red/3 blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-500 border border-slate-200/50 tracking-wider uppercase mb-4">
            📍 WILAYAH KAMI
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 font-syne tracking-tight">
            Peta & <span className="text-brand-blue">Cakupan Wilayah</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Pusat koordinasi, kesekretariatan, dan batas administratif kepengurusan Karang Taruna RW 005.
          </p>
        </motion.div>

        {/* 2-Column Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

          {/* Left Column: Descriptive Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-brand-blue bg-brand-blue/10 border border-brand-blue/20 rounded-full px-4 py-1.5">
                🏠 SEKRETARIAT UTAMA
              </span>

              <h3 className="text-3xl font-black text-slate-900 font-syne leading-tight tracking-tight">
                Pos RW 005 Taman Sari
              </h3>

              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                Menjadi episentrum seluruh kegiatan kepemudaan, rapat bulanan, koordinasi sosial,
                hingga ruang kolaborasi program kreatif pemuda Karang Taruna Bestfive.
              </p>

              {/* Stats Area */}
              <div className="space-y-4 pt-2">
                {stats.map((stat, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-slate-200 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800 font-syne">{stat.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Footer Card */}
            <div className="flex gap-3 items-start p-4 bg-slate-900 text-slate-300 rounded-[1.8rem] border border-slate-800 shadow-md">
              <div className="p-2.5 bg-slate-800 rounded-xl text-brand-blue flex-shrink-0">
                <MapPin className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Alamat Fisik</span>
                <p className="text-xs font-semibold leading-relaxed mt-0.5 text-slate-200">
                  POS RW 05(Taman Sari)
                  Jl. Mangga Besar IV R No.35, RT.6/RW.5, Taman Sari, Kec. Taman Sari, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11150
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Responsive Embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            {/* Map Double Border Container */}
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-full min-h-[380px] rounded-[2.5rem] overflow-hidden border border-slate-200 p-2.5 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300">
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
                <iframe
                  title="Peta RW 005 Pejaten Barat"
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d247.92948252624865!2d106.81841136056886!3d-6.147925667331898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssd%20mangga%20besar%201!5e0!3m2!1sid!2sid!4v1780239935703!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}