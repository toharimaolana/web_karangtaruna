import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Apa itu Karang Taruna Bestfive?',
    answer: 'Karang Taruna Bestfive adalah organisasi pemuda yang bergerak di bidang pemberdayaan generasi muda melalui program-program pendidikan, sosial, dan ekonomi. Kami berkomitmen untuk menciptakan dampak positif bagi masyarakat sekitar.',
  },
  {
    question: 'Siapa yang bisa menjadi anggota?',
    answer: 'Siapapun berusia antara 16-35 tahun yang memiliki semangat untuk berkontribusi dan berkembang bersama dapat bergabung dengan Karang Taruna Bestfive. Tidak diperlukan pengalaman khusus, yang penting adalah komitmen dan semangat untuk belajar.',
  },
  {
    question: 'Apa saja program kerja yang tersedia?',
    answer: 'Kami memiliki berbagai program kerja meliputi: Pelatihan Kewirausahaan, Bakti Sosial, Workshop Digital, Festival Budaya, dan kegiatan Olahraga. Setiap program dirancang untuk mengembangkan potensi generasi muda.',
  },
  {
    question: 'Bagaimana cara bergabung dengan organisasi ini?',
    answer: 'Anda dapat bergabung dengan menghubungi kami melalui form kontak di website atau langsung datang ke sekretariat kami. Kami akan memberikan informasi lebih lanjut tentang proses orientasi dan pendaftaran anggota.',
  },
  {
    question: 'Apakah ada biaya keanggotaan?',
    answer: 'Keanggotaan Karang Taruna Bestfive tidak dipungut biaya. Kami percaya bahwa setiap pemuda berhak mendapatkan akses untuk berkembang tanpa halangan finansial. Namun, kami mengharapkan komitmen aktif dari setiap anggota.',
  },
  {
    question: 'Bagaimana saya bisa berkontribusi dalam kegiatan?',
    answer: 'Anda dapat berkontribusi dengan menjadi sukarelawan, mengikuti program kerja, atau memberikan dukungan berupa ide dan masukan. Hubungi tim kami untuk informasi lebih detail tentang peluang berkontribusi.',
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="border-b border-slate-100 last:border-b-0"
    >
      <motion.button
        onClick={onToggle}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-semibold text-slate-800 group-hover:text-royal-blue transition-colors duration-300">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4"
        >
          {isOpen ? (
            <Minus className="w-5 h-5 text-royal-blue" />
          ) : (
            <Plus className="w-5 h-5 text-slate-400 group-hover:text-royal-blue transition-colors duration-300" />
          )}
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="pb-6">
              <p className="text-slate-500 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-royal-blue font-semibold text-sm tracking-widest uppercase mb-4">
            Pertanyaan
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
            FAQ
          </h2>
          <p className="mt-4 text-slate-500">
            Pertanyaan yang sering diajukan tentang Karang Taruna Bestfive
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-slate-50 rounded-3xl p-6 md:p-8"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-slate-500 text-sm">
            Masih ada pertanyaan?{' '}
            <a href="#kontak" className="text-royal-blue hover:underline font-medium">
              Hubungi kami
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}