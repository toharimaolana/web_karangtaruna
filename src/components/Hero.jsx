import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

const floatAnimation = (duration, delay = 0) => ({
  y: [0, -8, 0],
  transition: {
    duration,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    delay,
  },
});

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);

  const scrollToVisiMisi = () => {
    const section = document.getElementById("visi-misi");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProgram = () => {
    const section = document.getElementById("program");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-white text-slate-800 pt-32 pb-24 md:pb-32"
    >
      {/* Light Mode Editorial Background & Ambient Gradients */}
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-white to-white" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234169E1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Shifting radial ambient gradients (Tri-Color play) */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-10 left-10 w-[30rem] h-[30rem] bg-brand-blue/5 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] right-10 w-[28rem] h-[28rem] bg-brand-red/3 rounded-full blur-[130px]"
        />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full flex flex-col items-center">

        {/* UPPER SECTION: Typographic Masterpiece & CTAs */}
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl text-center flex flex-col items-center mb-16"
        >
          {/* Stacked Member Avatar Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 bg-white hover:bg-slate-50 px-4 py-2 rounded-full border border-slate-200/60 shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all duration-300 cursor-pointer mb-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div className="flex -space-x-1.5">
              {["/images/aapis.jpg", "/images/adau.jpg", "/images/anis.jpg"].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Avatar Pengurus"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null; // Mencegah loop tak terbatas jika fallback juga gagal
                    e.target.src = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop`;
                  }}
                />
              ))}
            </motion.div>
            <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              🔥 <span className="text-brand-blue">29+ Pemuda Aktif</span> RW 005
            </span>
          </motion.div>

          {/* High-Impact Magazine Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-slate-900 leading-[1.08] tracking-tight mb-8 font-syne"
          >
            Wadah Pemuda{" "}
            <span className="relative inline-block align-middle my-1">
              <motion.span
                whileHover={{ scale: 1.05, rotate: -1 }}
                className="relative z-10 bg-brand-yellow text-white rounded-2xl px-5 py-2 rotate-[-2.5deg] inline-block shadow-lg shadow-brand-yellow/25 border border-brand-yellow/20 font-syne font-black text-3xl sm:text-5xl md:text-6xl"
              >
                KREATIF
              </motion.span>
            </span>{" "}
            <br className="hidden sm:inline" />
            <span className="text-brand-blue relative">
              Gak Bisa Diem!
              <span className="absolute bottom-1 left-0 w-full h-2 bg-brand-blue/10 rounded-full" />
            </span>
          </motion.h1>

          {/* Casual Clean Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-xl text-slate-500 leading-relaxed max-w-2xl mb-10"
          >
            Bukan sekadar tempat ngumpul biasa, kami wadah resmi aksi nyata pemuda
            <span className="text-brand-blue font-extrabold"> Bestfive</span> yang seru,
            solid, dan berdampak positif bagi lingkungan kita!
          </motion.p>

          {/* Sleek CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToVisiMisi}
              className="px-8 py-4 bg-brand-blue text-white font-bold rounded-full text-base shadow-lg shadow-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/30 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Kenali Kami 👋
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToProgram}
              className="px-8 py-4 bg-white text-slate-700 font-bold rounded-full text-base border-2 border-slate-200 hover:border-brand-red hover:text-brand-red transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Kegiatan Seru 🎬
            </motion.button>
          </motion.div>
        </motion.div>

        {/* LOWER SECTION: Massive Full-Width Asymmetric Gallery Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-6xl mt-6 relative z-10"
        >
          {/* Ambient Glows behind the grid */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 via-brand-yellow/3 to-transparent rounded-[3rem] blur-3xl z-0 pointer-events-none" />

          {/* Grid Layout: Staggered Masonry Gallery */}
          <motion.div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

            {/* Left Polaroid Item: Tilted Left */}
            <motion.div
              variants={floatAnimation(5.5, 0.2)}
              whileHover={{ scale: 1.03, rotate: -1 }}
              className="md:col-span-3 hidden md:block bg-white border border-slate-100 p-3 rounded-[2rem] shadow-[0_15px_35px_rgba(0,0,0,0.03)] cursor-pointer rotate-[-3deg] transition-all"
            >
              <div className="aspect-[3/4] rounded-[1.4rem] overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
                  alt="Aktivitas Edukasi Pemuda"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-3">
                <h4 className="text-slate-800 font-extrabold text-sm font-syne">Edukasi Digital</h4>
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Workshop Seri</p>
              </div>
            </motion.div>

            {/* Middle Main Polaroid: Centered, Massive and Powerful */}
            <div className="col-span-12 md:col-span-6 relative flex justify-center">
              {/* Offset Design Outline Frame */}
              <div className="absolute inset-0 border-2 border-slate-200 rounded-[2.5rem] translate-x-3 translate-y-3 z-0 pointer-events-none hidden md:block" />

              <motion.div
                variants={floatAnimation(6, 0)}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative w-full bg-white border border-slate-100 p-4.5 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_rgba(37,99,235,0.08)] transition-all duration-300 z-10 cursor-pointer overflow-visible"
              >
                {/* Clean Badge */}
                <div className="absolute -top-3.5 left-8 bg-brand-blue text-white px-4 py-1.5 rounded-full text-xs font-black tracking-wider shadow-md z-20 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-yellow animate-spin" />
                  DOKUMENTASI KAMI
                </div>

                {/* Photo canvas */}
                <div className="aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-slate-50 relative group/photo">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                    alt="Karang Taruna Bestfive Big Family"
                    className="w-full h-full object-cover group-hover/photo:scale-102 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Editorial text caption */}
                <div className="text-center mt-5">
                  <h4 className="text-slate-900 font-extrabold text-lg tracking-tight font-syne">
                    Big Family Karang Taruna Bestfive
                  </h4>
                  <p className="text-slate-400 text-xs mt-1 font-black tracking-widest uppercase">
                    Aksi Nyata & Kolaborasi Kreatif RW 005
                  </p>
                </div>
              </motion.div>

              {/* Floating Badges */}
              {/* Left Badge */}
              <motion.div
                variants={floatAnimation(5, 0.5)}
                whileHover={{ scale: 1.05 }}
                className="absolute left-[-20px] bottom-[30px] z-20 bg-white/95 backdrop-blur-sm border border-brand-yellow/30 px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer font-black text-xs text-slate-800"
              >
                <span className="text-brand-yellow text-sm">🔥</span> KREATIF
              </motion.div>

              {/* Right Badge */}
              <motion.div
                variants={floatAnimation(5.2, 0.9)}
                whileHover={{ scale: 1.05 }}
                className="absolute right-[-20px] top-[40px] z-20 bg-white/95 backdrop-blur-sm border border-brand-blue/30 px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer font-black text-xs text-slate-800"
              >
                <span className="text-brand-blue text-sm">⚡</span> SOLID
              </motion.div>
            </div>

            {/* Right Polaroid Item: Tilted Right */}
            <motion.div
              variants={floatAnimation(5.5, 0.6)}
              whileHover={{ scale: 1.03, rotate: 1 }}
              className="md:col-span-3 hidden md:block bg-white border border-slate-100 p-3 rounded-[2rem] shadow-[0_15px_35px_rgba(0,0,0,0.03)] cursor-pointer rotate-[3deg] transition-all"
            >
              <div className="aspect-[3/4] rounded-[1.4rem] overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-432f7b1728d2?auto=format&fit=crop&w=600&q=80"
                  alt="Aktivitas Sosial Pemuda"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-3">
                <h4 className="text-slate-800 font-extrabold text-sm font-syne">Aksi Sosial</h4>
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Lingkungan & Warga</p>
              </div>
            </motion.div>

          </motion.div>

          {/* Slogan / Community Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-5xl mt-20 text-center border-t border-slate-100/80 pt-14"
          >
            <span className="text-slate-400 text-[10px] font-black tracking-widest uppercase mb-4 block">
              — BESTFIVE SLOGAN UTAMA —
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-syne tracking-tighter leading-[1.1] text-slate-900 uppercase">
              Kreativitas Tanpa Batas,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-red to-brand-yellow">
                Solidaritas Tanpa Tapi!
              </span>
            </h3>
          </motion.div>

        </motion.div>

      </div>

      {/* Down Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={scrollToVisiMisi}
        whileHover={{ y: 4 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 p-2.5 bg-white border border-slate-200 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center"
        aria-label="Scroll Down"
      >
        <ArrowDown className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors" />
      </motion.button>
    </section>
  );
}