import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const cardVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const pathVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

function VisionIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        d="M32 4L8 20V44L32 60L56 44V20L32 4Z"
        stroke="#4169E1"
        strokeWidth="2"
        fill="none"
      />
      <motion.circle
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        cx="32"
        cy="32"
        r="12"
        stroke="#4169E1"
        strokeWidth="2"
        fill="none"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        d="M32 20V32L44 32"
        stroke="#4169E1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MissionIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        d="M8 8H56V56H8V8Z"
        stroke="#4169E1"
        strokeWidth="2"
        fill="none"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        d="M20 20H44"
        stroke="#4169E1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        d="M20 32H44"
        stroke="#4169E1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        d="M20 44H36"
        stroke="#4169E1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ValueIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        d="M32 8L56 24V40L32 56L8 40V24L32 8Z"
        stroke="#4169E1"
        strokeWidth="2"
        fill="none"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        d="M32 24V56"
        stroke="#4169E1"
        strokeWidth="2"
      />
      <motion.path
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        d="M8 24L32 40L56 24"
        stroke="#4169E1"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function VisiMisi() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const cards = [
    {
      icon: <VisionIcon />,
      title: 'Visi',
      description: 'Menjadi organisasi pemuda yang produktif, kreatif, dan berintegritas untuk mewujudkan kontribusi positif bagi masyarakat dan bangsa.',
    },
    {
      icon: <MissionIcon />,
      title: 'Misi',
      description: 'Mengembangkan potensi generasi muda melalui program pendidikan, pelatihan keterampilan, dan kegiatan sosial yang berdampak nyata.',
    },
    {
      icon: <ValueIcon />,
      title: 'Nilai',
      description: 'Semangat persaudaraan, dedication terhadap negeri, inovasi tanpa henti, dan kejujuran dalam setiap tindakan untuk kemajuan bersama.',
    },
  ];

  return (
    <section
      id="visi-misi"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-slate-50/50" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block text-royal-blue font-semibold text-sm tracking-widest uppercase mb-4">
            Siapa Kami
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
            Visi, Misi & Nilai
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-royal-blue/10 transition-all duration-500">
                <div className="w-16 h-16 mb-6">
                  {card.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {card.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed">
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