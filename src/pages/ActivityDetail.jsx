import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Award,
  Share2,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  X,
  ChevronLeft
} from "lucide-react";
import { getActivityById, getRelatedActivities } from "../services/activityService";

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activity, setActivity] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hook 1: Fetching activity and related posts
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const act = await getActivityById(id);
        if (!isMounted) return;

        if (act) {
          setActivity(act);
          const rel = await getRelatedActivities(act.id, 3);
          if (isMounted) {
            setRelated(rel);
          }
        } else {
          setActivity(null);
        }
      } catch (err) {
        console.error('Error loading activity details:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [id]);

  const handleNextImage = () => {
    if (selectedGalleryIdx === null || !activity || !activity.gallery) return;
    setSelectedGalleryIdx((prev) => (prev + 1) % activity.gallery.length);
  };

  const handlePrevImage = () => {
    if (selectedGalleryIdx === null || !activity || !activity.gallery) return;
    setSelectedGalleryIdx((prev) => (prev - 1 + activity.gallery.length) % activity.gallery.length);
  };

  // Hook 2: Keyboard navigation for image lightbox (Declared at top level to respect Rules of Hooks!)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedGalleryIdx(null);
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedGalleryIdx, activity]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Loading state placeholder with premium design
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-24 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-brand-blue rounded-full animate-spin mb-4" />
        <p className="text-slate-400 text-sm font-extrabold font-syne uppercase tracking-widest animate-pulse">
          Memuat Kisah Inspiratif...
        </p>
      </div>
    );
  }

  // If activity not found, show a beautiful 404 page
  if (!activity) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-12 rounded-[3rem] shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-slate-100 max-w-lg"
        >
          <span className="text-6xl mb-6 block">🔍</span>
          <h1 className="text-3xl font-black font-syne text-slate-800 mb-4">
            Kegiatan Tidak Ditemukan
          </h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Maaf, halaman kegiatan yang Anda cari tidak dapat ditemukan atau telah dipindahkan oleh pengurus.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-blue text-white font-bold rounded-full shadow-md shadow-brand-blue/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </motion.div>
      </div>
    );
  }


  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-24">

      {/* ---------------- ARTICLE HEADER / IMMERSIVE HERO ---------------- */}
      <section className="relative w-full overflow-hidden bg-slate-900 text-white min-h-[45vh] sm:min-h-[60vh] flex flex-col justify-end">
        {/* Immersive Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-full object-cover opacity-60 scale-102 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        </div>

        {/* Back Button & Share Float */}
        <div className="absolute top-6 left-6 z-20 max-w-6xl mx-auto w-full px-6 flex items-center justify-between pointer-events-none">
          <Link
            to="/"
            className="pointer-events-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-bold rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>

          <button
            onClick={handleShare}
            className="pointer-events-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-bold rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-lg"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                Tersalin!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Bagikan
              </>
            )}
          </button>
        </div>

        {/* Hero Title & Main Category Badge */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 w-full text-left">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4 border border-brand-blue/30 bg-brand-blue/20 text-brand-blue"
          >
            {activity.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black font-syne tracking-tight leading-tight mb-6 text-white"
          >
            {activity.title}
          </motion.h1>

          {/* Quick Header Metadata Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-slate-300 font-extrabold"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              {activity.date}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              {activity.location}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- MAIN ARTICLE CONTENT & SIDEBAR ---------------- */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">

        {/* 1. Article Narrative / Story (Left 2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_10px_35px_rgba(0,0,0,0.015)] border border-slate-100/50"
          >
            {/* Story Content with Editorial Typography */}
            <div className="prose prose-slate max-w-none">
              {activity.content.map((paragraph, index) => {
                // Large styled Drop Cap for the very first letter of the first paragraph
                if (index === 0) {
                  const firstLetter = paragraph.charAt(0);
                  const rest = paragraph.slice(1);
                  return (
                    <p key={index} className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
                      <span className="float-left text-5xl sm:text-6xl font-black font-syne text-brand-blue mr-3 mt-1 leading-[0.8] tracking-tight bg-slate-50 px-3 py-2 rounded-2xl border border-slate-100">
                        {firstLetter}
                      </span>
                      {rest}
                    </p>
                  );
                }
                return (
                  <p key={index} className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </motion.div>

          {/* 2. Gallery / Dokumentasi Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_10px_35px_rgba(0,0,0,0.015)] border border-slate-100/50"
          >
            <h3 className="text-2xl font-black font-syne text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-brand-red">📸</span> Dokumentasi Kegiatan
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activity.gallery.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedGalleryIdx(i)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-slate-50 border border-slate-100"
                >
                  <img
                    src={img}
                    alt={`Dokumentasi ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-4 h-4 text-brand-red" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3. Sidebar Metadata & Action Card (Right 1 Column) */}
        <div className="flex flex-col gap-8">

          {/* Metadata Statistics Block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_35px_rgba(0,0,0,0.015)] border border-slate-100/50"
          >
            <h4 className="text-lg font-black font-syne text-slate-800 mb-6 border-b border-slate-100 pb-3">
              Informasi Agenda
            </h4>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                    Penyelenggara
                  </span>
                  <span className="text-sm font-bold text-slate-700 leading-snug">
                    {activity.organizer}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-brand-blue p-8 rounded-[2.5rem] text-white shadow-xl shadow-brand-blue/10 border border-slate-800"
          >
            {/* Ambient Background Glow inside Card */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-brand-blue/30 rounded-full blur-2xl pointer-events-none" />

            <span className="text-3xl mb-3 block">🙌</span>
            <h4 className="text-2xl font-black font-syne leading-tight mb-3">
              Ikut Berkontribusi Nyata
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
              Karang Taruna Bestfive selalu membuka pintu kolaborasi bagi pemuda yang ingin menjadi relawan panitia atau menyumbangkan ide kreatif di program berikutnya.
            </p>

            <a
              href="https://wa.me/628123456789" // Dummy WhatsApp Link
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-white text-brand-blue text-sm font-black rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Hubungi Divisi Relawan
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ---------------- RELATED ACTIVITIES SUGGESTIONS ---------------- */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <div className="border-t border-slate-200/80 pt-16">
          <h3 className="text-3xl font-black font-syne text-slate-800 mb-10 text-center sm:text-left">
            Agenda Kegiatan <span className="text-brand-blue">Lainnya</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((act) => (
              <Link
                key={act.id}
                to={`/kegiatan/${act.id}`}
                className="group bg-white rounded-[2.2rem] border border-slate-100 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_18px_40px_rgba(37,99,235,0.05)] hover:border-slate-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo cover container */}
                  <div className="relative aspect-[4/3] rounded-[1.6rem] overflow-hidden bg-slate-50 mb-4">
                    <img
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] font-black text-brand-blue border border-brand-blue/5 tracking-wider uppercase">
                        {act.category}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg font-black text-slate-800 font-syne leading-snug group-hover:text-brand-blue transition-colors mb-2">
                    {act.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4 font-medium">
                    {act.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-extrabold uppercase text-slate-400 pt-3 border-t border-slate-50">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {act.date}
                  </div>
                  <span className="text-brand-blue font-black flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Baca
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY LIGHTBOX MODAL DIALOG ---------------- */}
      <AnimatePresence>
        {selectedGalleryIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 select-none"
            onClick={() => setSelectedGalleryIdx(null)}
          >
            {/* Close Button top corner */}
            <button
              onClick={() => setSelectedGalleryIdx(null)}
              className="absolute top-6 right-6 z-55 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
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
                handleNextImage();
              }}
              className="absolute right-4 sm:right-6 z-55 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Selanjutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Central Modal Content Wrap */}
            <motion.div
              key={selectedGalleryIdx}
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
                  src={activity.gallery[selectedGalleryIdx]}
                  alt={`Dokumentasi ${selectedGalleryIdx + 1}`}
                  className="max-w-full max-h-full object-contain pointer-events-none select-none"
                />
              </div>

              {/* Bottom Caption Meta Information */}
              <div className="w-full max-w-2xl text-center text-white px-6">
                <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase block mb-1">
                  DOKUMENTASI DOKUMEN — {selectedGalleryIdx + 1} DARI {activity.gallery.length}
                </span>

                <h3 className="text-xl sm:text-2xl font-black font-syne tracking-tight leading-tight mb-2 text-slate-300">
                  {activity.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
