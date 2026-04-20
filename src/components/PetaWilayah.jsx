import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const regions = [
  { id: 1, name: 'Karang Taruna Mabes 05', x: 50, y: 50, activities: [' POS RW 05', ''], color: '#4169E1' },
];

function PulsingDot({ cx, cy, color }) {
  return (
    <motion.g>
      <motion.circle
        cx={cx}
        cy={cy}
        r="8"
        fill={color}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
        style={{ transformOrigin: `${cx}% ${cy}%` }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r="5"
        fill={color}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ transformOrigin: `${cx}% ${cy}%` }}
      />
    </motion.g>
  );
}

export default function PetaWilayah() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeRegion, setActiveRegion] = useState(null);

  return (
    <section
      id="peta-wilayah"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-slate-50 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-royal-blue font-semibold text-sm tracking-widest uppercase mb-4">
            Lokasi
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
            Peta Wilayah
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Jelajahi area kegiatan kami di berbagai wilayah
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-2xl mx-auto aspect-[4/3]"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 4px 20px rgba(65, 105, 225, 0.1))' }}
            >
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F8FAFC" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M15 20 Q30 10 45 25 T75 30 Q90 40 85 55 T70 75 Q55 90 40 85 T15 70 Q5 50 15 20"
                fill="url(#mapGradient)"
                stroke="#4169E1"
                strokeWidth="0.5"
                opacity="0.8"
              />

              <path
                d="M25 35 Q40 30 50 40 T65 45"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="0.3"
                strokeDasharray="2 2"
                opacity="0.5"
              />
              <path
                d="M30 55 Q45 50 55 60 T70 65"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="0.3"
                strokeDasharray="2 2"
                opacity="0.5"
              />
              <path
                d="M20 70 Q35 65 50 75"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="0.3"
                strokeDasharray="2 2"
                opacity="0.5"
              />

              <circle cx="50" cy="50" r="20" fill="none" stroke="#4169E1" strokeWidth="0.3" opacity="0.3" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#4169E1" strokeWidth="0.2" opacity="0.2" />

              {isInView && regions.map((region) => (
                <g key={region.id}>
                  <PulsingDot cx={region.x} cy={region.y} color={region.color} />
                  <motion.circle
                    cx={region.x}
                    cy={region.y}
                    r="6"
                    fill="#4169E1"
                    filter="url(#glow)"
                    whileHover={{ scale: 1.5 }}
                    onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                    style={{ cursor: 'pointer' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: region.id * 0.2, duration: 0.4 }}
                  />
                </g>
              ))}
            </svg>

            {activeRegion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-4 right-4 bg-white rounded-2xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100"
              >
                {regions.find((r) => r.id === activeRegion) && (
                  <>
                    <h4 className="font-bold text-slate-900 mb-2">
                      {regions.find((r) => r.id === activeRegion).name}
                    </h4>
                    <ul className="space-y-1">
                      {regions.find((r) => r.id === activeRegion).activities.map((activity, i) => (
                        <li key={i} className="text-sm text-slate-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-royal-blue rounded-full" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {regions.map((region) => (
              <motion.button
                key={region.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeRegion === region.id
                    ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/30'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-royal-blue'
                }`}
              >
                {region.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}