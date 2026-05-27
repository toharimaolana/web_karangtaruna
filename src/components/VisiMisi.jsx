import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.215, 0.610, 0.355, 1.000],
    },
  }),
};

const pathVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1.2,
      ease: 'easeInOut',
    },
  },
};

function VisionIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        d="M32 4L8 20V44L32 60L56 44V20L32 4Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.circle
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        cx="32"
        cy="32"
        r="12"
        stroke={color}
        strokeWidth="3.5"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        d="M32 20V32L40 32"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MissionIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        d="M8 8H56V56H8V8Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        d="M20 20H44"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        d="M20 32H44"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        d="M20 44H36"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ValueIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        d="M32 8L56 24V40L32 56L8 40V24L32 8Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        d="M32 24V56"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        d="M8 24L32 40L56 24"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function VisiMisi() {
  const cards = [
    {
      icon: <VisionIcon color="#2563EB" />,
      title: 'Visi',
      description: 'Menjadi wadah resmi kolaborasi internal pemuda RW 005 yang kreatif, solid, inovatif, dan berintegritas tinggi demi mewujudkan kontribusi nyata bagi masyarakat.',
      themeClass: 'group-hover:border-brand-blue/30 group-hover:shadow-brand-blue/8 hover:y-[-8px]',
      bgIconClass: 'bg-brand-blue/10',
      badge: '🎯 UTAMA'
    },
    {
      icon: <MissionIcon color="#EF4444" />,
      title: 'Misi',
      description: 'Mengembangkan potensi pemuda melalui wadah edukasi kreatif, aksi kepedulian sosial yang nyata, serta mempererat kerukunan pemuda dan warga sekitar.',
      themeClass: 'group-hover:border-brand-red/30 group-hover:shadow-brand-red/8 hover:y-[-8px]',
      bgIconClass: 'bg-brand-red/10',
      badge: '⚡ AKSI'
    },
    {
      icon: <ValueIcon color="#F59E0B" />,
      title: 'Nilai',
      description: 'Menjunjung tinggi asas kekeluargaan, keguyuban, solidaritas tanpa tapi, transparansi kerja organisasi, serta semangat berkolaborasi yang tak pernah padam.',
      themeClass: 'group-hover:border-brand-yellow/30 group-hover:shadow-brand-yellow/8 hover:y-[-8px]',
      bgIconClass: 'bg-brand-yellow/10',
      badge: '🔥 PRINSIP'
    },
  ];

  return (
    <section
      id="visi-misi"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Dynamic light glows in background */}
      <div className="absolute inset-0 bg-slate-50/40 pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-brand-blue/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-brand-red/3 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-black text-slate-500 tracking-wider uppercase mb-4 border border-slate-200/50">
            ⭐ SIAPA KAMI
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-syne">
            Visi, Misi & <span className="text-brand-blue">Nilai Kami</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Landasan kokoh Karang Taruna Bestfive RW 005 dalam berkarya, berbakti, dan berdaya bersama masyarakat.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card visual wrapper */}
              <div className={`relative p-8 md:p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.02)] transition-all duration-300 ${card.themeClass}`}>
                
                {/* Floating badge */}
                <span className="absolute top-6 right-6 inline-flex items-center text-[10px] font-black tracking-widest bg-slate-50 text-slate-400 border border-slate-100 px-3.5 py-1 rounded-full">
                  {card.badge}
                </span>

                {/* Animated Iconic visual wrapper */}
                <div className={`w-16 h-16 rounded-[1.3rem] ${card.bgIconClass} flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[2deg]`}>
                  {card.icon}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 font-syne">
                  {card.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed text-sm md:text-base font-normal">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}