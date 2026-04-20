import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const teamMembers = [
  { name: 'Ahmad Fauzi', position: 'Ketua Umum', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face', instagram: '@fauzi_kt', size: 'large', pos: { x: 15, y: 10 } },
  { name: 'Siti Rahayu', position: 'Sekretaris', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face', instagram: '@siti_rh', size: 'medium', pos: { x: 55, y: 5 } },
  { name: 'Budi Santoso', position: 'Bendahara', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face', instagram: '@budi_st', size: 'medium', pos: { x: 75, y: 25 } },
  { name: 'Dewi Lestari', position: 'Koordinator Program', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=350&h=450&fit=crop&crop=face', instagram: '@dewi_lst', size: 'small', pos: { x: 5, y: 45 } },
  { name: 'Rico Pratama', position: 'Koordinator Media', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=350&h=450&fit=crop&crop=face', instagram: '@rico_pt', size: 'small', pos: { x: 30, y: 35 } },
  { name: 'Nina Kartika', position: 'Koordinator SDM', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=350&h=450&fit=crop&crop=face', instagram: '@nina_kt', size: 'small', pos: { x: 60, y: 55 } },
  { name: 'Andi Wijaya', position: 'Koordinator Logistik', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face', instagram: '@andi_wj', size: 'medium', pos: { x: 80, y: 60 } },
  { name: 'Lina Susilowati', position: 'Koordinator Relawan', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop&crop=face', instagram: '@lina_sl', size: 'medium', pos: { x: 45, y: 80 } },
  { name: 'Dimas Arya', position: 'Koordinator IT', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=350&h=450&fit=crop&crop=face', instagram: '@dimas_at', size: 'small', pos: { x: 20, y: 70 } },
];

const blobShapes = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '40% 60% 40% 60% / 50% 50% 50% 50%',
  '70% 30% 50% 50% / 60% 40% 60% 40%',
  '30% 70% 30% 70% / 40% 60% 40% 60%',
  '50% 50% 20% 80% / 70% 30% 70% 30%',
  '80% 20% 60% 40% / 50% 50% 50% 50%',
  '45% 55% 35% 65% / 55% 45% 65% 35%',
  '35% 65% 45% 55% / 65% 35% 55% 45%',
  '55% 45% 65% 35% / 45% 55% 35% 65%',
];

function OrganicCard({ member, index, isHovered, setHovered }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-50px' });
  const controls = useAnimation();

  const sizeClasses = {
    large: 'w-40 h-52 md:w-56 md:h-72',
    medium: 'w-32 h-40 md:w-44 md:h-56',
    small: 'w-24 h-32 md:w-32 md:h-44',
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: [0, 1],
        scale: [0.5, 1],
        y: [30, 0],
        rotate: [-10, 0],
        transition: {
          duration: 1.2,
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      });
    }
  }, [inView, controls, index]);

  useEffect(() => {
    const randomX = () => Math.random() * 20 - 10;
    const randomY = () => Math.random() * 20 - 10;
    const randomRotate = () => Math.random() * 6 - 3;
    const duration = () => 4000 + Math.random() * 2000;

    const animate = async () => {
      if (!cardRef.current) return;
      await controls.start({
        x: [0, randomX(), randomX(), 0],
        y: [0, randomY(), randomY(), 0],
        rotate: [0, randomRotate(), randomRotate(), 0],
        transition: {
          duration: duration(),
          repeat: Infinity,
          ease: 'easeInOut',
        }
      });
    };

    const timeout = setTimeout(animate, index * 200);
    return () => clearTimeout(timeout);
  }, [controls, index]);

  const isThisHovered = isHovered === index;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={controls}
      style={{
        left: `${member.pos.x}%`,
        top: `${member.pos.y}%`,
      }}
      className={`absolute ${sizeClasses[member.size]} cursor-pointer`}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      whileHover={{ scale: 1.15, zIndex: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="relative w-full h-full overflow-hidden shadow-xl"
        style={{ borderRadius: blobShapes[index % blobShapes.length] }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        <motion.div 
          className="absolute inset-0"
          style={{ borderRadius: blobShapes[index % blobShapes.length] }}
          animate={{
            background: isThisHovered 
              ? 'linear-gradient(135deg, rgba(65, 105, 225, 0.4) 0%, rgba(65, 105, 225, 0.1) 100%)'
              : 'transparent',
            boxShadow: isThisHovered 
              ? '0 0 40px rgba(65, 105, 225, 0.5), inset 0 0 30px rgba(65, 105, 225, 0.2)'
              : '0 10px 30px rgba(0,0,0,0.15)',
          }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isThisHovered ? 1 : 0,
            scale: isThisHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ borderRadius: blobShapes[index % blobShapes.length] }}
        >
          <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-royal-blue text-sm font-semibold shadow-lg">
            {member.instagram}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function StrukturOrganisasi() {
  const sectionRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={sectionRef}
      id="struktur" 
      className="relative py-24 md:py-40 bg-white overflow-hidden min-h-[800px] md:min-h-[900px]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] md:text-[25vw] font-bold font-[family-name:var(--font-syne)] text-royal-blue/5 whitespace-nowrap">
          TEAM
        </h1>
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20 relative z-10"
        >
          <span className="inline-block text-royal-blue font-semibold text-sm tracking-widest uppercase mb-4">
            Tim Kami
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
            Struktur Organisasi
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            Kepemimpinan yang solid untuk kemajuan Karang Taruna Bestfive
          </p>
        </motion.div>

        <div className="relative h-[500px] md:h-[600px]">
          {teamMembers.map((member, i) => (
            <OrganicCard
              key={`${member.name}-${i}`}
              member={member}
              index={i}
              isHovered={hovered}
              setHovered={setHovered}
            />
          ))}
          
        </div>
      </div>
    </section>
  );
}