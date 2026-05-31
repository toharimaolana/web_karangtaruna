import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Key, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { login, getCurrentUser } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If already logged in, redirect immediately to admin
  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      if (user) {
        navigate('/admin', { replace: true });
      }
    }
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Harap masukkan email dan kata sandi.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: loginErr } = await login(email, password);
      if (loginErr) {
        setError(loginErr.message || 'Kredensial tidak valid. Silakan coba lagi.');
      } else if (data) {
        // Successful login, redirect to admin control center
        navigate('/admin', { replace: true });
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi keamanan. Harap coba beberapa saat lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden select-none">
      
      {/* 🌌 High-Impact Animated Background Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-15%] w-[45rem] h-[45rem] rounded-full bg-brand-blue/10 blur-[130px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[45rem] h-[45rem] rounded-full bg-brand-red/10 blur-[130px] animate-pulse pointer-events-none" />
      <div className="absolute top-[35%] right-[20%] w-[30rem] h-[30rem] rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none" />

      {/* Login Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Sleek Logo / Header Icon Badge */}
        <div className="flex justify-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="w-16 h-16 rounded-[1.6rem] bg-gradient-to-br from-brand-blue to-blue-700 flex items-center justify-center text-white shadow-xl shadow-brand-blue/20 border border-white/10"
          >
            <Shield className="w-8 h-8" />
          </motion.div>
        </div>

        {/* Glassmorphic Card Wrapper */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black font-syne text-white tracking-tight leading-tight">
              Portal <span className="text-brand-blue">Pengurus</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-medium mt-2 leading-relaxed">
              Masuk untuk mengelola data kegiatan, struktur pengurus, dan profil Karang Taruna.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* 🔴 AnimatePresence Error Box */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  className="bg-red-950/40 border border-red-500/20 text-red-300 px-4 py-3 rounded-2xl flex items-start gap-2.5 text-xs font-semibold leading-relaxed"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Email Pengurus
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-blue transition-colors">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@bestfive.org"
                  disabled={loading}
                  className="w-full bg-slate-950/60 border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all duration-300 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Kata Sandi
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-blue transition-colors">
                  <Key className="w-4.5 h-4.5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-slate-950/60 border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all duration-300 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-blue text-white text-sm font-black rounded-2xl shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/30 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Mengotentikasi...
                </>
              ) : (
                <>
                  Masuk Ke Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back Link to Public Site */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-bold text-slate-500 hover:text-white transition-colors cursor-pointer"
          >
            ← Kembali ke Halaman Publik
          </button>
        </div>
      </motion.div>
    </div>
  );
}
