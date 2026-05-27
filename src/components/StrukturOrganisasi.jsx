import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Quote, Shield, User, Heart } from "lucide-react";

function Instagram({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const teamMembers = [
  {
    name: "Aapis Hidayat",
    position: "Ketua Umum",
    image: "/images/aapis.jpg",
    instagram: "https://instagram.com/aapis_hid",
    roleGroup: "bph",
    superpower: "🚀 Visi Misi Master",
    funQuote: "Pemuda hari ini, pemimpin hari esok!",
    highlight: true,
  },
  {
    name: "Adau",
    position: "Wakil Ketua",
    image: "/images/adau.jpg",
    instagram: "https://instagram.com/adau_log",
    roleGroup: "bph",
    superpower: "⚡ Troubleshooter Ulung",
    funQuote: "Santai tapi selesai, tenang tapi menang.",
    highlight: true,
  },
  {
    name: "Anis Fitri",
    position: "Bendahara",
    image: "/images/anis.jpg",
    instagram: "https://instagram.com/anis_ftr",
    roleGroup: "bph",
    superpower: "💰 Kolektor Kas Legendaris",
    funQuote: "Jangan lupa bayar kas sebelum saya tagih! 😉",
    highlight: true,
  },
  {
    name: "M. Zidan",
    position: "Anggota Aktif",
    image: "/images/zidan.jpg",
    instagram: "https://instagram.com/zidan_karta",
    roleGroup: "anggota",
    superpower: "🧠 Konseptor Kreatif",
    funQuote: "Ide tanpa eksekusi adalah halusinasi.",
  },
  {
    name: "Rima Melati",
    position: "Anggota Aktif",
    image: "/images/rima.jpg",
    instagram: "https://instagram.com/rimamelati",
    roleGroup: "anggota",
    superpower: "🌟 Public Relations",
    funQuote: "Menghubungkan hati dan aspirasi warga.",
  },
  {
    name: "Fani Rahma",
    position: "Anggota Aktif",
    image: "/images/fani.jpg",
    instagram: "https://instagram.com/fanirh",
    roleGroup: "anggota",
    superpower: "📊 Ratu Excel & Notulensi",
    funQuote: "Hidup itu seperti proposal, butuh persetujuan.",
  },
  {
    name: "Karin Amelia",
    position: "Anggota Aktif",
    image: "/images/karin.jpg",
    instagram: "https://instagram.com/karin_amel",
    roleGroup: "anggota",
    superpower: "📂 Admin Terorganisir",
    funQuote: "Dokumen rapi, hidup terkendali.",
  },
  {
    name: "Egi Pratama",
    position: "Anggota Aktif",
    image: "/images/egi.jpg",
    instagram: "https://instagram.com/egi_prt",
    roleGroup: "anggota",
    superpower: "🔍 Auditor Sat-Set",
    funQuote: "Uang keluar harus ada kuitansinya ya!",
  },
  {
    name: "Reza Fahlevi",
    position: "Anggota Aktif",
    image: "/images/reza.jpg",
    instagram: "https://instagram.com/reza_fhlv",
    roleGroup: "anggota",
    superpower: "🗣️ Juru Bicara Humas",
    funQuote: "Ada kopi ada solusi.",
  },
  {
    name: "Dika Pratama",
    position: "Anggota Aktif",
    image: "/images/dika.jpg",
    instagram: "https://instagram.com/dika_art",
    roleGroup: "anggota",
    superpower: "🎭 Raja Gigs & Dekorasi",
    funQuote: "Tanpa seni, hidup ini bagai malam tanpa bintang.",
  },
  {
    name: "Ameh",
    position: "Anggota Aktif",
    image: "/images/ameh.jpg",
    instagram: "https://instagram.com/ameh_art",
    roleGroup: "anggota",
    superpower: "📹 Kreator Konten Viral",
    funQuote: "Seni itu mengekspresikan kebebasan!",
  },
  {
    name: "Sandi Wijaya",
    position: "Anggota Aktif",
    image: "/images/sandi.jpg",
    instagram: "https://instagram.com/sandi_wj",
    roleGroup: "anggota",
    superpower: "⚽ Raja Smash & Stamina",
    funQuote: "Di dalam tubuh yang sehat terdapat jiwa yang santai.",
  },
  {
    name: "Ibra",
    position: "Anggota Aktif",
    image: "/images/ibra.jpg",
    instagram: "https://instagram.com/ibra_rel",
    roleGroup: "anggota",
    superpower: "🕌 Kultum Penyejuk Jiwa",
    funQuote: "Dunia dikejar, akhirat jangan dilupakan.",
  },
  {
    name: "Sito Kusuma",
    position: "Anggota Aktif",
    image: "/images/sito.jpg",
    instagram: "https://instagram.com/sito_ksm",
    roleGroup: "anggota",
    superpower: "📦 Perlengkapan Ready",
    funQuote: "Barang aman, acara lancar, panitia tenang.",
  },
];

const categoryTabs = [
  { id: "semua", label: "Semua Pengurus" },
  { id: "bph", label: "Pengurus Harian (BPH)" },
  { id: "anggota", label: "Anggota Aktif" },
];

function MemberCard({ member, index }) {
  const isBPH = member.roleGroup === "bph";
  const randomRotation = index % 2 === 0 ? 1 : -1;

  const getPositionBadgeStyle = (pos) => {
    switch (pos) {
      case "Ketua Umum":
        return "bg-brand-red/10 text-brand-red border border-brand-red/20";
      case "Wakil Ketua":
        return "bg-brand-blue/10 text-brand-blue border border-brand-blue/20";
      case "Bendahara":
        return "bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200/50";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{
        scale: 1.03,
        rotate: randomRotation,
        y: -6,
        transition: { type: "spring", stiffness: 300, damping: 15 }
      }}
      className={`group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.02)] transition-all duration-300 ${isBPH
          ? "border-slate-200 shadow-md ring-1 ring-slate-100 hover:border-brand-blue/30 hover:ring-brand-blue/10 hover:shadow-[0_20px_50px_rgba(37,99,235,0.08)]"
          : "hover:border-brand-red/20 hover:shadow-[0_20px_50px_rgba(239,68,68,0.06)]"
        }`}
    >
      {/* Dynamic Polaroid Border Overlay */}
      <div className="absolute inset-0 border-2 border-slate-100 rounded-[2.5rem] pointer-events-none z-30 opacity-60 group-hover:opacity-100 group-hover:border-inherit transition-all" />

      {/* Image container */}
      <div className="relative overflow-hidden rounded-[1.8rem] aspect-[3/4] w-full bg-slate-50">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop`;
          }}
        />

        {/* Soft bottom vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent z-10" />

        {/* Position Badge */}
        <div className="absolute left-4 top-4 z-20">
          <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-black tracking-wider backdrop-blur-md ${getPositionBadgeStyle(member.position)}`}>
            {member.position === "Ketua Umum" && <Shield className="w-3.5 h-3.5 mr-1" />}
            {member.position === "Wakil Ketua" && <User className="w-3.5 h-3.5 mr-1" />}
            {member.position === "Bendahara" && <Heart className="w-3.5 h-3.5 mr-1" />}
            {member.position.toUpperCase()}
          </span>
        </div>

        {/* Fun Glass Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[9px] uppercase font-black tracking-widest text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/20 rounded-full px-3 py-1">
              <Sparkles className="w-3 h-3 text-brand-yellow animate-spin" /> Superpower
            </span>
            <h4 className="mt-4 text-xl font-black text-white leading-tight font-syne">
              {member.superpower}
            </h4>
          </div>

          <div className="relative border-l-2 border-brand-blue pl-4 py-1 my-4">
            <Quote className="absolute -top-3 -left-2 w-8 h-8 text-brand-blue/10 rotate-180" />
            <p className="text-sm font-semibold text-slate-200 italic leading-relaxed relative z-10">
              "{member.funQuote}"
            </p>
          </div>

          <div className="flex justify-between items-center border-t border-white/10 pt-4">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Instagram</span>
            <motion.a
              href={member.instagram}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.12, rotate: 6 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-white border border-slate-700/60 hover:bg-brand-blue hover:border-brand-blue hover:text-white transition-colors shadow-md"
            >
              <Instagram className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Default Card Bottom Info (inside photo frame, visible when not hovered) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm font-syne">{member.name}</h3>
          <p className="mt-0.5 text-xs font-semibold text-slate-300">
            {member.instagram.split("/").pop() ? `@${member.instagram.split("/").pop()}` : member.name}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StrukturOrganisasi() {
  const [activeTab, setActiveTab] = useState("semua");

  // Split members for visual tree/hierarchy
  const bphMembers = teamMembers.filter((m) => m.roleGroup === "bph");
  const activeMembers = teamMembers.filter((m) => m.roleGroup === "anggota");

  return (
    <section
      id="struktur"
      className="relative overflow-hidden bg-slate-50 py-24 md:py-32"
    >
      {/* Background glowing lights */}
      <div className="absolute -top-32 -left-32 h-[35rem] w-[35rem] rounded-full bg-brand-blue/3 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-[40rem] w-[40rem] rounded-full bg-brand-yellow/3 blur-[160px] pointer-events-none" />

      {/* Fun decorative elements */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 5, ease: "easeInOut" }}
        className="hidden xl:block absolute top-24 left-[8%] bg-white border border-slate-200/50 shadow-md rounded-2xl px-4.5 py-2.5 rotate-[-4deg] z-10 pointer-events-none font-syne"
      >
        <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
          🚀 100% PEMUDA AKTIF
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 4.5, ease: "easeInOut", delay: 0.5 }}
        className="hidden xl:block absolute bottom-24 right-[8%] bg-white border border-slate-200/50 shadow-md rounded-2xl px-4.5 py-2.5 rotate-[4deg] z-10 pointer-events-none font-syne"
      >
        <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
          🔥 SOLIDARITAS TANPA TAPI!
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-500 border border-slate-200/50 tracking-wider uppercase mb-4">
            ⚡ TIM KERJA KAMI
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 font-syne">
            Struktur <span className="text-brand-red">Organisasi</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-500 max-w-xl mx-auto">
            Pengurus Karang Taruna Bestfive RW 005 yang aktif, solid, dan siap berkontribusi secara nyata demi lingkungan dan kemajuan warga.
          </p>
        </motion.div>

        {/* Dynamic Category Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/60 backdrop-blur-md rounded-3xl border border-slate-200/40">
            {categoryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-2xl text-xs md:text-sm font-black tracking-wide transition-all duration-300 cursor-pointer ${isActive ? "text-white" : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-slate-900 rounded-2xl shadow-md"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Members Layout Rendering */}
        <div className="space-y-20">
          <AnimatePresence mode="popLayout">

            {/* TIER 1: BADAN PENGURUS HARIAN (BPH) */}
            {(activeTab === "semua" || activeTab === "bph") && (
              <motion.div
                key="bph-group"
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight font-syne uppercase">
                    👑 Badan Pengurus Harian (BPH)
                  </h3>
                  <span className="text-xs font-black text-brand-blue bg-brand-blue/10 px-3.5 py-1 rounded-full uppercase">
                    Pimpinan Utama
                  </span>
                </div>

                {/* Hierarchical Structure Flow: Centered BPH Tree Grid */}
                <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
                  {/* Leader Row */}
                  <div className="w-full max-w-sm flex justify-center">
                    {bphMembers.slice(0, 1).map((member, idx) => (
                      <div key={member.name} className="w-full">
                        <MemberCard member={member} index={idx} />
                      </div>
                    ))}
                  </div>

                  {/* Flow Connection Lines (Visual Decorator) */}
                  <div className="hidden md:flex flex-col items-center -my-8 z-0">
                    <div className="w-0.5 h-8 bg-slate-200" />
                    <div className="w-[320px] h-0.5 bg-slate-200" />
                    <div className="flex justify-between w-[320px]">
                      <div className="w-0.5 h-8 bg-slate-200" />
                      <div className="w-0.5 h-8 bg-slate-200" />
                    </div>
                  </div>

                  {/* Flank Rows (Wakil Ketua & Bendahara) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-2xl">
                    {bphMembers.slice(1).map((member, idx) => (
                      <MemberCard key={member.name} member={member} index={idx + 1} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TIER 2: ANGGOTA AKTIF */}
            {(activeTab === "semua" || activeTab === "anggota") && (
              <motion.div
                key="anggota-group"
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight font-syne uppercase">
                    ⚡ Anggota Aktif Bestfive
                  </h3>
                  <span className="text-xs font-black text-brand-red bg-brand-red/10 px-3.5 py-1 rounded-full uppercase">
                    Tim Aksi Lapangan
                  </span>
                </div>

                {/* Grid for Active Members */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {activeMembers.map((member, index) => (
                    <MemberCard key={member.name} member={member} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}