import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToVisiMisi = () => {
    const visiMisiSection = document.getElementById('visi-misi');
    if (visiMisiSection) {
      visiMisiSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234169E1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-blue rounded-full blur-[150px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-royal-blue rounded-full blur-[120px]"
        />
      </motion.div>

      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 bg-royal-blue/10 text-royal-blue text-sm font-medium rounded-full tracking-wider">
            KARANG TARUNA BESTFIVE
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-slate-900 leading-[0.9] tracking-tight mb-8"
        >
          Membangun
          <br />
          <span className="text-royal-blue">Generasi</span>
          <br />
          <span className="text-slate-400">Maju</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 leading-relaxed mb-12"
        >
          Organisasi pemuda yang berkomitmen untuk memberdayakan generasi muda 
          melalui pendidikan, kreativitas, dan solidaritas sosial.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-royal-blue text-white font-semibold rounded-full text-lg shadow-lg shadow-royal-blue/25 hover:shadow-xl hover:shadow-royal-blue/30 transition-all duration-300"
          >
            Bergabung Sekarang
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-full text-lg border-2 border-slate-200 hover:border-royal-blue hover:text-royal-blue transition-all duration-300"
          >
            Pelajari Lebih Lanjut
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={scrollToVisiMisi}
        whileHover={{ y: 4 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 p-3 bg-white/80 glass rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <ArrowDown className="w-5 h-5 text-slate-600" />
      </motion.button>
    </section>
  );
}