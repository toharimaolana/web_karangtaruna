import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const programs = [
  {
    title: 'Pelatihan Kewirausahaan',
    category: 'Ekonomi',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    description: 'Program pelatihan keterampilan entrepreneurship untuk generasi muda',
  },
  {
    title: 'Bakti Sosial',
    category: 'Sosial',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
    description: 'Pengabdian masyarakat untuk membantu mereka yang membutuhkan',
  },
  {
    title: 'Workshop Digital',
    category: 'Pendidikan',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
    description: 'Pelatihan teknologi digital untuk persiapan karir masa depan',
  },
  {
    title: 'Lomba Olah Raga',
    category: 'Olahraga',
    image: 'https://images.unsplash.com/photo-1461896836934- voices-of-the-game?w=800&h=600&fit=crop',
    description: 'Turnamen olah raga untuk menjaga kebugaran dan solidarity',
  },
  {
    title: 'Festival Budaya',
    category: 'Budaya',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
    description: 'Pameran seni dan budaya untuk melestarikan warisan budaya lokal',
  },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511795409834-432f7b1728d2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
];

function CurtainImage({ src, alt, index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group overflow-hidden rounded-2xl"
    >
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-royal-blue"
        style={{ clipPath: 'inset(50% 0 50% 0)' }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      
      <motion.div
        initial={{ clipPath: 'inset(50% 0 0 0)' }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 + index * 0.1 }}
        className="absolute bottom-4 left-4 right-4"
      >
        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700">
          Galeri {index + 1}
        </span>
      </motion.div>
    </motion.div>
  );
}

function ProgramCard({ program, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="flex-shrink-0 w-80 md:w-96"
    >
      <div className="relative group overflow-hidden rounded-3xl">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="relative h-64 overflow-hidden"
        >
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-block px-3 py-1 bg-royal-blue text-white text-xs font-medium rounded-full mb-3">
            {program.category}
          </span>
          <h3 className="text-xl font-bold text-white mb-2">{program.title}</h3>
          <p className="text-slate-300 text-sm line-clamp-2">{program.description}</p>
        </div>
        
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-royal-blue origin-left"
        />
      </div>
    </motion.div>
  );
}

export default function ProgramKerjaGallery() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-royal-blue font-semibold text-sm tracking-widest uppercase mb-4">
            Aktivitas
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
            Program Kerja
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Berbagai program kerja untuk memberdayakan generasi muda
          </p>
        </motion.div>

        <div className="relative overflow-hidden pb-8">
          <motion.div style={{ x }} className="flex gap-6">
            {programs.map((program, i) => (
              <ProgramCard key={program.title} program={program} index={i} />
            ))}
            {programs.map((program, i) => (
              <ProgramCard key={`${program.title}-dup-${i}`} program={program} index={i} />
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {programs.map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="w-2 h-2 rounded-full bg-slate-200"
            />
          ))}
        </div>
      </div>

      <div className="mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-royal-blue font-semibold text-sm tracking-widest uppercase mb-4">
            Momen
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
            Galeri Kegiatan
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((img, i) => (
              <CurtainImage key={i} src={img} alt={`Gallery ${i + 1}`} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}