import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { getActivities } from "../services/activityService";
import { getGalleryItems } from "../services/galleryService";

const categories = ["Semua", "Sosial", "Edukasi", "Olahraga", "Rapat"];

function ProgramCard({ program, index }) {
  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Ekonomi": return "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20";
      case "Sosial": return "bg-brand-red/10 text-brand-red border-brand-red/20";
      case "Pendidikan": return "bg-brand-blue/10 text-brand-blue border-brand-blue/20";
      case "Olahraga": return "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20";
      case "Budaya": return "bg-brand-red/10 text-brand-red border-brand-red/20";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="flex-shrink-0 w-[300px] sm:w-[360px]"
    >
      <Link
        to={`/kegiatan/${program.id}`}
        className="relative block group overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] hover:border-slate-200 transition-all duration-300 cursor-pointer"
      >

        {/* Photo Container with Hover Zoom */}
        <div className="relative h-56 rounded-[1.8rem] overflow-hidden bg-slate-50">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-10" />

          {/* Floating Date Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-slate-100 px-3.5 py-1.5 rounded-2xl text-[10px] font-black text-slate-600 tracking-wider shadow-sm z-20 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {program.date.toUpperCase()}
          </div>
        </div>

        {/* Text Area */}
        <div className="p-4 mt-2">
          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3 border ${getCategoryColor(program.category)}`}>
            {program.category}
          </span>
          <h3 className="text-xl font-black text-slate-800 mb-2 font-syne tracking-tight group-hover:text-brand-blue transition-colors">
            {program.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {program.description}
          </p>
        </div>

        {/* Hover Slide-in Decorative Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-6 right-6 h-1 bg-brand-blue origin-left rounded-full"
        />
      </Link>
    </motion.div>
  );
}


export default function ProgramKerjaGallery() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedIdx, setSelectedIdx] = useState(null);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const actData = await getActivities();
      if (isMounted) {
        setPrograms(actData);
        setLoading(false);
      }

      const gallData = await getGalleryItems();
      if (isMounted) {
        setGalleryItems(gallData);
        setGalleryLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);


  // Filter Gallery Images based on category
  const filteredGallery = activeCategory === "Semua"
    ? galleryItems
    : galleryItems.filter(img => img.category === activeCategory);

  // Close Lightbox on Escape Key Press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowRight" && selectedIdx !== null) handleNext();
      if (e.key === "ArrowLeft" && selectedIdx !== null) handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, filteredGallery]);

  const handleNext = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev + 1) % filteredGallery.length);
  };

  const handlePrev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <section id="program" ref={sectionRef} className="relative py-24 md:py-32 bg-white overflow-hidden">

      {/* Decorative background grid line split */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* ---------------- SECTION 1: PROGRAM KERJA ---------------- */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-500 border border-slate-200/50 tracking-wider uppercase mb-4">
            🚀 PROGRAM UTAMA
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 font-syne tracking-tight">
            Agenda <span className="text-brand-blue">Aksi Nyata</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Rangkaian rencana kerja strategis pemuda Bestfive untuk memajukan perekonomian, pendidikan, dan kerukunan warga.
          </p>
        </motion.div>

        {/* Horizontal Infinite/Scrolling Track */}
        <div className="relative overflow-hidden pb-8 cursor-grab active:cursor-grabbing">
          {loading ? (
            <div className="flex gap-6 w-max justify-center py-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="w-[300px] sm:w-[360px] h-[400px] bg-white border border-slate-100 rounded-[2.5rem] p-4 flex flex-col gap-4 animate-pulse shadow-[0_12px_35px_rgba(0,0,0,0.01)]">
                  <div className="h-52 rounded-[1.8rem] bg-slate-100" />
                  <div className="flex flex-col gap-2 p-2">
                    <div className="h-4 w-1/4 bg-slate-100 rounded-full" />
                    <div className="h-6 w-3/4 bg-slate-100 rounded-full mt-2" />
                    <div className="h-4 w-5/6 bg-slate-100 rounded-full mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div style={{ x }} className="flex gap-6 w-max">
              {programs.map((program, i) => (
                <ProgramCard key={program.id} program={program} index={i} />
              ))}
              {/* Duplicated for infinite effect */}
              {programs.map((program, i) => (
                <ProgramCard key={`${program.id}-dup-${i}`} program={program} index={i} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Track Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {!loading && programs.map((_, i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-slate-200"
              whileInView={{ scale: [1, 1.2, 1], backgroundColor: ["#cbd5e1", "#2563eb", "#cbd5e1"] }}
              transition={{ repeat: Infinity, duration: 4, delay: i * 0.4 }}
            />
          ))}
        </div>
      </div>

      {/* ---------------- SECTION 2: INTERACTIVE GALLERY ---------------- */}
      <div id="galeri" className="mt-28 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-500 border border-slate-200/50 tracking-wider uppercase mb-4">
              📸 MOMEN TERBAIK
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 font-syne tracking-tight">
              Galeri <span className=" text-brand-blue">Kegiatan</span>
            </h2>
          </motion.div>

          {/* Interactive Category Filter Tags */}
          <div className="flex flex-wrap justify-center items-center gap-2.5 mb-12">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSelectedIdx(null); // Reset lightbox on category filter
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider border transition-all duration-300 cursor-pointer ${isActive
                    ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10 scale-102"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Grid Layout of Gallery Cards */}
          {galleryLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-[2.2rem] border border-slate-100 p-3 bg-white animate-pulse shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
                  <div className="aspect-[4/3] rounded-[1.6rem] bg-slate-100" />
                  <div className="p-4 flex flex-col gap-2">
                    <div className="h-5 w-3/4 bg-slate-100 rounded-full" />
                    <div className="h-4 w-1/2 bg-slate-100 rounded-full mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredGallery.map((img, i) => (
                    <motion.div
                      key={img.id || img.title}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      whileHover={{ y: -6 }}
                      onClick={() => setSelectedIdx(i)}
                      className="group relative rounded-[2.2rem] overflow-hidden border border-slate-100 p-3 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.015)] hover:border-brand-blue/10 hover:shadow-[0_20px_45px_rgba(37,99,235,0.05)] transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] rounded-[1.6rem] overflow-hidden bg-slate-50">
                        {/* Zoomable Image */}
                        <img
                          src={img.src}
                          alt={img.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Gradient Vignette overlay on default */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity z-10" />

                        {/* Expand/Maximize Button overlay */}
                        <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 z-20 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-lg"
                          >
                            <Maximize2 className="w-5 h-5 text-brand-blue" />
                          </motion.div>
                        </div>

                        {/* Floating category Tag */}
                        <div className="absolute top-4 left-4 z-25">
                          <span className="inline-flex rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-[9px] font-black text-brand-blue border border-brand-blue/10 tracking-widest uppercase">
                            {img.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Bottom Text Info */}
                      <div className="p-4">
                        <h4 className="text-base font-black text-slate-800 tracking-tight font-syne leading-snug group-hover:text-brand-blue transition-colors mb-1">
                          {img.title}
                        </h4>
                        <p className="text-slate-400 text-xs line-clamp-1">
                          {img.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty state if no images */}
              {filteredGallery.length === 0 && (
                <div className="text-center py-16">
                  <span className="text-4xl mb-3 block">📂</span>
                  <p className="text-slate-400 font-bold font-syne">Belum ada dokumentasi untuk kategori ini.</p>
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* ---------------- LIGHTBOX MODAL DIALOG ---------------- */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 select-none"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Close Button top corner */}
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-6 right-6 z-55 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-6 z-55 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-6 z-55 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Selanjutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Central Modal Content Wrap */}
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="w-full max-w-4xl max-h-[85vh] flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()} // Stop closing on body click
            >
              {/* Main Expanded Image Frame */}
              <div className="relative w-full aspect-[4/3] max-h-[60vh] rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl flex items-center justify-center">
                <img
                  src={filteredGallery[selectedIdx].src}
                  alt={filteredGallery[selectedIdx].title}
                  className="max-w-full max-h-full object-contain pointer-events-none select-none"
                />

                {/* Floating category Tag on modal image */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex rounded-full bg-brand-blue text-white px-4 py-1.5 text-xs font-black tracking-wider uppercase">
                    {filteredGallery[selectedIdx].category}
                  </span>
                </div>
              </div>

              {/* Bottom Caption Meta Information */}
              <div className="w-full max-w-2xl text-center text-white px-6">
                <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase block mb-1">
                  DOKUMENTASI MOKMEN — {selectedIdx + 1} DARI {filteredGallery.length}
                </span>

                <h3 className="text-2xl sm:text-3xl font-black font-syne tracking-tight leading-tight mb-2">
                  {filteredGallery[selectedIdx].title}
                </h3>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {filteredGallery[selectedIdx].desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}