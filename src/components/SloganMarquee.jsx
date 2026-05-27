import { motion } from "framer-motion";

export default function SloganMarquee() {
  const slogans = [
    { text: "KARANG TARUNA BESTFIVE", color: "text-white" },
    { text: "SOLID TANPA TAPI", color: "text-brand-yellow" },
    { text: "KREATIF TANPA BATAS", color: "text-white" },
    { text: "POSITIF VIBES ONLY", color: "text-brand-yellow" },
    { text: "WADAHNYA PEMUDA AKTIF", color: "text-white" },
    { text: "GAK ADA JALUR MUNDUR!", color: "text-brand-red" }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 py-6 border-y border-slate-800 shadow-md select-none z-10 flex">
      {/* Dynamic ambient lines inside marquee */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 via-transparent to-brand-red/5 pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          ease: "linear", 
          duration: 25, 
          repeat: Infinity 
        }}
        className="flex whitespace-nowrap gap-16 font-syne font-black uppercase text-sm md:text-base tracking-widest w-max"
      >
        {/* Track 1 */}
        <div className="flex items-center gap-16">
          {slogans.map((slogan, idx) => (
            <div key={`t1-${idx}`} className="flex items-center gap-16">
              <span className={`${slogan.color} drop-shadow-md`}>{slogan.text}</span>
              <span className="text-brand-blue text-2xl font-black flex items-center justify-center animate-pulse">•</span>
            </div>
          ))}
        </div>

        {/* Track 2 - Identical clone to ensure perfect loop without layout jumps */}
        <div className="flex items-center gap-16" aria-hidden="true">
          {slogans.map((slogan, idx) => (
            <div key={`t2-${idx}`} className="flex items-center gap-16">
              <span className={`${slogan.color} drop-shadow-md`}>{slogan.text}</span>
              <span className="text-brand-blue text-2xl font-black flex items-center justify-center animate-pulse">•</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
