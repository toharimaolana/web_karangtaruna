import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, LogOut, User, FolderKanban, Users, Settings,
  Plus, Pencil, Trash2, Calendar, MapPin, Image, Loader2, X, AlertCircle
} from 'lucide-react';
import { logout, getCurrentUser } from '../services/authService';
import {
  getActivities, createActivity, updateActivity, deleteActivity
} from '../services/activityService';
import { uploadActivityImage } from '../services/uploadService';
import {
  getMembers, createMember, updateMember, deleteMember
} from '../services/memberService';
import {
  getGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem
} from '../services/galleryService';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('kegiatan');

  // Activities CRUD States
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [formError, setFormError] = useState(null);
  const [activitySearchQuery, setActivitySearchQuery] = useState('');

  // Upload and Toggle states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [galleryUrlInput, setGalleryUrlInput] = useState('');
  const [showGalleryUrlInput, setShowGalleryUrlInput] = useState(false);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [statPartisipan, setStatPartisipan] = useState('');
  const [statDurasi, setStatDurasi] = useState('');
  const [gallery, setGallery] = useState([]);

  // Member Management CRUD States
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberDeleteConfirmOpen, setMemberDeleteConfirmOpen] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');

  // Member Form Fields
  const [memberName, setMemberName] = useState('');
  const [memberPosition, setMemberPosition] = useState('');
  const [memberImage, setMemberImage] = useState('');
  const [memberInstagram, setMemberInstagram] = useState('');
  const [memberRoleGroup, setMemberRoleGroup] = useState('anggota');
  const [memberSuperpower, setMemberSuperpower] = useState('');
  const [memberFunQuote, setMemberFunQuote] = useState('');
  const [memberHighlight, setMemberHighlight] = useState(false);
  const [uploadingMemberImage, setUploadingMemberImage] = useState(false);
  const [showMemberUrlInput, setShowMemberUrlInput] = useState(false);

  // Gallery Management CRUD States
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [galleryDeleteConfirmOpen, setGalleryDeleteConfirmOpen] = useState(false);
  const [gallerySearchQuery, setGallerySearchQuery] = useState('');

  // Gallery Form Fields
  const [galleryItemTitle, setGalleryItemTitle] = useState('');
  const [galleryItemCategory, setGalleryItemCategory] = useState('Sosial');
  const [galleryItemImage, setGalleryItemImage] = useState('');
  const [galleryItemDesc, setGalleryItemDesc] = useState('');
  const [uploadingGalleryItemImage, setUploadingGalleryItemImage] = useState(false);
  const [showGalleryItemUrlInput, setShowGalleryItemUrlInput] = useState(false);

  // Fetch current user, activities list, members list, and gallery items
  useEffect(() => {
    async function init() {
      const u = await getCurrentUser();
      setUser(u);

      try {
        const list = await getActivities();
        setActivities(list);
      } catch (err) {
        console.error('Failed to load activities:', err);
      } finally {
        setLoading(false);
      }

      try {
        const memList = await getMembers();
        setMembers(memList);
      } catch (err) {
        console.error('Failed to load members:', err);
      } finally {
        setMembersLoading(false);
      }

      try {
        const gallList = await getGalleryItems();
        setGalleryItems(gallList);
      } catch (err) {
        console.error('Failed to load gallery items:', err);
      } finally {
        setGalleryLoading(false);
      }
    }
    init();
  }, []);

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      navigate('/login', { replace: true });
    }
  };

  // Open modal for either ADD or EDIT activity
  const openFormModal = (act = null) => {
    setSelectedActivity(act);
    setFormError(null);
    setUploadingImage(false);
    setShowUrlInput(false);
    setUploadingGallery(false);
    setGalleryUrlInput('');
    setShowGalleryUrlInput(false);
    if (act) {
      // Populate fields for Edit Mode
      setTitle(act.title || '');
      setCategory(act.category || '');
      setDate(act.date || '');
      setLocation(act.location || '');
      setImage(act.image || '');
      setDescription(act.description || '');
      setContent(act.content ? act.content.join('\n') : '');
      setOrganizer(act.organizer || 'Karang Taruna Bestfive');
      setStatPartisipan(act.stats?.Partisipan || '');
      setStatDurasi(act.stats?.Durasi || '');
      setGallery(act.gallery || []);
    } else {
      // Clear fields for Add Mode
      setTitle('');
      setCategory('Sosial');
      setDate(new Date().toISOString().split('T')[0]);
      setLocation('');
      setImage('/images/placeholder-activity.jpg');
      setDescription('');
      setContent('');
      setOrganizer('Karang Taruna Bestfive RW 005');
      setStatPartisipan('50 Pemuda');
      setStatDurasi('1 Hari');
      setGallery([]);
    }
    setModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !date || !location || !description || !content) {
      setFormError('Harap lengkapi semua kolom wajib.');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    const payload = {
      title,
      category,
      date,
      location,
      image,
      description,
      organizer,
      stats: {
        Partisipan: statPartisipan,
        Durasi: statDurasi
      },
      content: content.split('\n').filter(p => p.trim() !== ''),
      gallery: gallery
    };

    try {
      if (selectedActivity) {
        // Edit Mode
        const { data, error } = await updateActivity(selectedActivity.id, payload);
        if (error) throw error;
        setActivities(prev => prev.map(act => act.id === selectedActivity.id ? data : act));
      } else {
        // Add Mode
        const { data, error } = await createActivity(payload);
        if (error) throw error;
        setActivities(prev => [data, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data kegiatan.');
    } finally {
      setSubmitting(false);
    }
  };

  const triggerDeleteConfirm = (act) => {
    setSelectedActivity(act);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!selectedActivity) return;
    setSubmitting(true);

    try {
      const { error } = await deleteActivity(selectedActivity.id);
      if (error) throw error;
      setActivities(prev => prev.filter(act => act.id !== selectedActivity.id));
      setDeleteConfirmOpen(false);
    } catch (err) {
      alert('Gagal menghapus kegiatan: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Member CRUD Handlers
  const openMemberModal = (mem = null) => {
    setSelectedMember(mem);
    setFormError(null);
    setUploadingMemberImage(false);
    setShowMemberUrlInput(false);
    if (mem) {
      setMemberName(mem.name || '');
      setMemberPosition(mem.position || '');
      setMemberImage(mem.image || '/images/placeholder-profile.jpg');
      setMemberInstagram(mem.instagram || '');
      setMemberRoleGroup(mem.roleGroup || 'anggota');
      setMemberSuperpower(mem.superpower || '');
      setMemberFunQuote(mem.funQuote || '');
      setMemberHighlight(mem.highlight || false);
    } else {
      setMemberName('');
      setMemberPosition('');
      setMemberImage('/images/placeholder-profile.jpg');
      setMemberInstagram('');
      setMemberRoleGroup('anggota');
      setMemberSuperpower('');
      setMemberFunQuote('');
      setMemberHighlight(false);
    }
    setMemberModalOpen(true);
  };

  const handleMemberFormSubmit = async (e) => {
    e.preventDefault();
    if (!memberName || !memberPosition) {
      setFormError('Nama dan Jabatan wajib diisi.');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    const payload = {
      name: memberName,
      position: memberPosition,
      image: memberImage,
      instagram: memberInstagram,
      roleGroup: memberRoleGroup,
      superpower: memberSuperpower || '⚡ Pemuda Aktif',
      funQuote: memberFunQuote || 'Solidaritas tanpa tapi!',
      highlight: memberHighlight
    };

    try {
      if (selectedMember) {
        // Edit Mode
        const { data, error } = await updateMember(selectedMember.id, payload);
        if (error) throw error;
        setMembers(prev => prev.map(m => m.id === selectedMember.id ? data : m));
      } else {
        // Add Mode
        const { data, error } = await createMember(payload);
        if (error) throw error;
        setMembers(prev => [data, ...prev]);
      }
      setMemberModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data pengurus.');
    } finally {
      setSubmitting(false);
    }
  };

  const triggerMemberDeleteConfirm = (mem) => {
    setSelectedMember(mem);
    setMemberDeleteConfirmOpen(true);
  };

  const handleMemberDeleteSubmit = async () => {
    if (!selectedMember) return;
    setSubmitting(true);

    try {
      const { error } = await deleteMember(selectedMember.id);
      if (error) throw error;
      setMembers(prev => prev.filter(m => m.id !== selectedMember.id));
      setMemberDeleteConfirmOpen(false);
    } catch (err) {
      alert('Gagal menghapus pengurus: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Gallery CRUD Handlers
  const openGalleryModal = (item = null) => {
    setSelectedGalleryItem(item);
    setFormError(null);
    setUploadingGalleryItemImage(false);
    setShowGalleryItemUrlInput(false);
    if (item) {
      setGalleryItemTitle(item.title || '');
      setGalleryItemCategory(item.category || 'Sosial');
      setGalleryItemImage(item.src || '');
      setGalleryItemDesc(item.desc || '');
    } else {
      setGalleryItemTitle('');
      setGalleryItemCategory('Sosial');
      setGalleryItemImage('/images/placeholder-gallery.jpg');
      setGalleryItemDesc('');
    }
    setGalleryModalOpen(true);
  };

  const handleGalleryFormSubmit = async (e) => {
    e.preventDefault();
    if (!galleryItemTitle) {
      setFormError('Judul momen wajib diisi.');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    const payload = {
      title: galleryItemTitle,
      category: galleryItemCategory,
      src: galleryItemImage,
      desc: galleryItemDesc
    };

    try {
      if (selectedGalleryItem) {
        // Edit Mode
        const { data, error } = await updateGalleryItem(selectedGalleryItem.id, payload);
        if (error) throw error;
        setGalleryItems(prev => prev.map(g => g.id === selectedGalleryItem.id ? data : g));
      } else {
        // Add Mode
        const { data, error } = await createGalleryItem(payload);
        if (error) throw error;
        setGalleryItems(prev => [data, ...prev]);
      }
      setGalleryModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data galeri.');
    } finally {
      setSubmitting(false);
    }
  };

  const triggerGalleryDeleteConfirm = (item) => {
    setSelectedGalleryItem(item);
    setGalleryDeleteConfirmOpen(true);
  };

  const handleGalleryDeleteSubmit = async () => {
    if (!selectedGalleryItem) return;
    setSubmitting(true);

    try {
      const { error } = await deleteGalleryItem(selectedGalleryItem.id);
      if (error) throw error;
      setGalleryItems(prev => prev.filter(g => g.id !== selectedGalleryItem.id));
      setGalleryDeleteConfirmOpen(false);
    } catch (err) {
      alert('Gagal menghapus momen galeri: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row select-none relative">

      {/* 🌌 Background ambient glowing lights */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] rounded-full bg-brand-blue/3 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[45rem] h-[45rem] rounded-full bg-brand-red/3 blur-[140px] pointer-events-none" />

      {/* Responsive Sidebar/Top Menu */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/5 bg-slate-900/40 backdrop-blur-xl p-4 lg:p-6 flex flex-col justify-between relative z-20">
        <div className="flex flex-row lg:flex-col items-center lg:items-stretch justify-between w-full gap-4 lg:gap-8">

          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-lg shadow-brand-blue/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black font-syne text-white tracking-tight">KartaBestFive</span>
            </div>
          </div>

          {/* Mobile Tab Selectors & Mini Profile Action */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="flex gap-1 bg-slate-950/60 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setActiveTab('kegiatan')}
                className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'kegiatan' ? 'bg-brand-blue text-white' : 'text-slate-400'
                }`}
              >
                Kegiatan
              </button>
              <button
                onClick={() => setActiveTab('pengurus')}
                className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'pengurus' ? 'bg-brand-blue text-white' : 'text-slate-400'
                }`}
              >
                Pengurus
              </button>
              <button
                onClick={() => setActiveTab('galeri')}
                className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'galeri' ? 'bg-brand-blue text-white' : 'text-slate-400'
                }`}
              >
                Galeri
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-500/10 text-red-400 rounded-xl transition-all cursor-pointer"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop-only Navigation Links */}
        <nav className="hidden lg:flex flex-col gap-1.5 mt-8 w-full">
          <button
            onClick={() => setActiveTab('kegiatan')}
            className={`w-full py-3.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-3 transition-all duration-300 cursor-pointer ${activeTab === 'kegiatan'
              ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/15 border border-white/5'
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
          >
            <FolderKanban className="w-4 h-4" />
            Kelola Kegiatan
          </button>

          <button
            onClick={() => setActiveTab('pengurus')}
            className={`w-full py-3.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-3 transition-all duration-300 cursor-pointer ${activeTab === 'pengurus'
              ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/15 border border-white/5'
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
          >
            <Users className="w-4 h-4" />
            Kelola Pengurus
          </button>

          <button
            onClick={() => setActiveTab('galeri')}
            className={`w-full py-3.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-3 transition-all duration-300 cursor-pointer ${activeTab === 'galeri'
              ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/15 border border-white/5'
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
          >
            <Image className="w-4 h-4" />
            Kelola Galeri
          </button>
        </nav>

        {/* Desktop-only User Identity & Logout Action */}
        <div className="hidden lg:flex flex-col gap-4 border-t border-white/5 pt-6 px-2 mt-auto w-full">
          {user && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 border border-white/5">
                <User className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase block">ADMIN</span>
                <span className="text-xs font-bold text-slate-300 block truncate">{user.email}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-950/20 hover:bg-red-950/40 border border-red-500/10 text-red-400 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 flex flex-col relative z-10 overflow-y-auto">
        <header className="py-4 lg:py-6 px-6 lg:px-10 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg lg:text-xl font-black font-syne text-white tracking-tight">
            Dashboard Pengurus
          </h2>
          <span className="text-[10px] font-black uppercase tracking-widest bg-brand-blue/10 text-brand-blue border border-brand-blue/20 px-3.5 py-1.5 rounded-full">
            {activeTab === 'kegiatan' && 'Kelola Kegiatan'}
            {activeTab === 'pengurus' && 'Kelola Pengurus'}
            {activeTab === 'galeri' && 'Kelola Galeri'}
          </span>
        </header>

        <div className="p-4 lg:p-10 flex-1 flex flex-col gap-6">

          {/* TAB 1: ACTIVITIES CRUD PANELS */}
          {activeTab === 'kegiatan' && (
            <div className="flex flex-col gap-6 flex-1">

              {/* Header Action Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900/20 border border-white/5 p-6 rounded-3xl">
                <div>
                  <h2 className="text-xl font-black font-syne text-white flex items-center gap-2">
                    <FolderKanban className="w-5 h-5 text-brand-blue" />
                    Kelola Kegiatan Karang Taruna
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Daftar program kerja dan berita pemuda yang tampil secara dinamis pada landing page.
                  </p>
                </div>

                <button
                  onClick={() => openFormModal(null)}
                  className="px-5 py-3.5 bg-brand-blue hover:bg-blue-600 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-brand-blue/10 flex items-center justify-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Kegiatan
                </button>
              </div>

              {/* Filtering and Search bar */}
              <div className="flex items-center bg-slate-900/40 border border-white/5 rounded-2xl px-4 py-3">
                <input
                  type="text"
                  placeholder="Cari kegiatan berdasarkan judul atau kategori..."
                  value={activitySearchQuery}
                  onChange={(e) => setActivitySearchQuery(e.target.value)}
                  className="bg-transparent border-none text-xs text-white placeholder-slate-500 w-full focus:outline-none focus:ring-0"
                />
              </div>

              {/* Data Table */}
              {loading ? (
                <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center flex-1">
                  <Loader2 className="w-10 h-10 animate-spin text-brand-blue mb-4" />
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest animate-pulse font-syne">
                    Memuat data kegiatan...
                  </p>
                </div>
              ) : activities.length === 0 ? (
                <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center flex-1">
                  <span className="text-4xl mb-4 block">📅</span>
                  <h4 className="text-xl font-black font-syne text-white mb-2">Belum Ada Kegiatan</h4>
                  <p className="text-slate-400 max-w-sm text-xs leading-relaxed mb-6">
                    Mulai tambahkan program kerja atau berita pemuda Karang Taruna agar tampil secara dinamis pada landing page.
                  </p>
                  <button
                    onClick={() => openFormModal(null)}
                    className="px-5 py-3 bg-brand-blue text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg hover:bg-blue-600 transition-all cursor-pointer"
                  >
                    Buat Kegiatan Pertama
                  </button>
                </div>
              ) : (
                <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-slate-950/40">
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-500 tracking-wider">Judul & Kategori</th>
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-500 tracking-wider">Tanggal & Lokasi</th>
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-500 tracking-wider">Penyelenggara</th>
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-500 tracking-wider text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activities.filter(act => 
                          act.title?.toLowerCase().includes(activitySearchQuery.toLowerCase()) ||
                          act.category?.toLowerCase().includes(activitySearchQuery.toLowerCase())
                        ).map((act) => (
                          <tr key={act.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 border border-white/5">
                                  <img
                                    src={act.image || '/images/placeholder-activity.jpg'}
                                    alt={act.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = '/images/placeholder-activity.jpg'; }}
                                  />
                                </div>
                                <div>
                                  <span className="font-bold text-sm text-white block leading-snug">{act.title}</span>
                                  <span className="text-[9px] font-black uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded-full inline-block mt-1 border border-brand-blue/10">
                                    {act.category}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                  {act.date}
                                </span>
                                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                  {act.location}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-xs text-slate-300">{act.organizer || 'Karang Taruna'}</span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openFormModal(act)}
                                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-blue/20 hover:text-brand-blue flex items-center justify-center text-slate-400 transition-all cursor-pointer border border-white/5"
                                  title="Edit"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => triggerDeleteConfirm(act)}
                                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-400 transition-all cursor-pointer border border-white/5"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MEMBERS (PENGURUS) WORKSPACE */}
          {activeTab === 'pengurus' && (
            <motion.div
              key="pengurus-workspace"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col gap-6"
            >
              {/* Header Action Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900/20 border border-white/5 p-6 rounded-3xl">
                <div>
                  <h2 className="text-xl font-black font-syne text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-blue" />
                    Kelola Pengurus Karang Taruna
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Kelola data pengurus harian (BPH) dan anggota aktif yang tampil pada halaman Struktur Organisasi.
                  </p>
                </div>

                <button
                  onClick={() => openMemberModal()}
                  className="px-5 py-3.5 bg-brand-blue hover:bg-blue-600 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-brand-blue/10 flex items-center justify-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Pengurus
                </button>
              </div>

              {/* Filtering and Search bar */}
              <div className="flex items-center bg-slate-900/40 border border-white/5 rounded-2xl px-4 py-3">
                <input
                  type="text"
                  placeholder="Cari nama pengurus atau jabatan..."
                  value={memberSearchQuery}
                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-xs text-white placeholder-slate-500 w-full focus:outline-none focus:ring-0"
                />
              </div>

              {/* Members Table */}
              {membersLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
                  <span className="text-xs font-bold text-slate-400 font-syne">Memuat data pengurus...</span>
                </div>
              ) : (
                <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-slate-900/60">
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400 tracking-wider">Profil / Nama</th>
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400 tracking-wider">Jabatan</th>
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400 tracking-wider">Kelompok Peran</th>
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400 tracking-wider">Kekuatan & Fun Quote</th>
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400 tracking-wider">Highlight</th>
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400 tracking-wider text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {members.filter(m =>
                          m.name?.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
                          m.position?.toLowerCase().includes(memberSearchQuery.toLowerCase())
                        ).map((mem) => (
                          <tr key={mem.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-slate-850 flex-shrink-0">
                                  <img
                                    src={mem.image || '/images/placeholder-profile.jpg'}
                                    alt={mem.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = '/images/placeholder-profile.jpg'; }}
                                  />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-white block">{mem.name}</span>
                                  {mem.instagram && (
                                    <a
                                      href={mem.instagram}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[10px] text-brand-blue hover:underline"
                                    >
                                      @{mem.instagram.split('/').pop()}
                                    </a>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                                {mem.position}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold ${mem.roleGroup === 'bph'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-slate-500/10 text-slate-400 border border-white/5'
                                }`}>
                                {mem.roleGroup?.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-4 px-6 max-w-xs">
                              <span className="text-[10px] font-bold text-brand-red block">{mem.superpower}</span>
                              <span className="text-[10px] text-slate-400 italic block mt-0.5 truncate">"{mem.funQuote}"</span>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${mem.highlight
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'text-slate-500'
                                }`}>
                                {mem.highlight ? 'Ya' : 'Tidak'}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openMemberModal(mem)}
                                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-blue/20 hover:text-brand-blue flex items-center justify-center text-slate-400 transition-all cursor-pointer border border-white/5"
                                  title="Edit"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => triggerMemberDeleteConfirm(mem)}
                                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-400 transition-all cursor-pointer border border-white/5"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {members.length === 0 && (
                          <tr>
                            <td colSpan="6" className="py-12 text-center text-xs text-slate-500 font-syne">
                              Belum ada data pengurus yang ditambahkan.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: GALLERY (GALERI) WORKSPACE */}
          {activeTab === 'galeri' && (
            <motion.div
              key="galeri-workspace"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col gap-6"
            >
              {/* Header Action Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900/20 border border-white/5 p-6 rounded-3xl">
                <div>
                  <h2 className="text-xl font-black font-syne text-white flex items-center gap-2">
                    <Image className="w-5 h-5 text-brand-blue" />
                    Kelola Galeri Dokumentasi Kegiatan
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Kelola foto-foto dokumentasi momen keseruan dan bakti sosial yang akan tampil di halaman depan.
                  </p>
                </div>

                <button
                  onClick={() => openGalleryModal()}
                  className="px-5 py-3.5 bg-brand-blue hover:bg-blue-600 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-brand-blue/10 flex items-center justify-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Dokumentasi
                </button>
              </div>

              {/* Filtering and Search bar */}
              <div className="flex items-center bg-slate-900/40 border border-white/5 rounded-2xl px-4 py-3">
                <input
                  type="text"
                  placeholder="Cari dokumentasi berdasarkan judul atau kategori..."
                  value={gallerySearchQuery}
                  onChange={(e) => setGallerySearchQuery(e.target.value)}
                  className="bg-transparent border-none text-xs text-white placeholder-slate-500 w-full focus:outline-none focus:ring-0"
                />
              </div>

              {/* Gallery List Table */}
              {galleryLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
                  <span className="text-xs font-bold text-slate-400 font-syne">Memuat data galeri...</span>
                </div>
              ) : (
                <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-slate-900/60">
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400 tracking-wider">Foto / Judul Momen</th>
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400 tracking-wider">Kategori</th>
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400 tracking-wider">Keterangan / Deskripsi</th>
                          <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400 tracking-wider text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {galleryItems.filter(g =>
                          g.title?.toLowerCase().includes(gallerySearchQuery.toLowerCase()) ||
                          g.category?.toLowerCase().includes(gallerySearchQuery.toLowerCase())
                        ).map((item) => (
                          <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-10 rounded-lg border border-white/10 overflow-hidden bg-slate-950 flex-shrink-0">
                                  <img
                                    src={item.src || '/images/placeholder-gallery.jpg'}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = '/images/placeholder-gallery.jpg'; }}
                                  />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-white block">{item.title}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold bg-brand-red/10 text-brand-red border border-brand-red/20 uppercase tracking-wider">
                                {item.category}
                              </span>
                            </td>
                            <td className="py-4 px-6 max-w-sm">
                              <span className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{item.desc || '-'}</span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openGalleryModal(item)}
                                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-blue/20 hover:text-brand-blue flex items-center justify-center text-slate-400 transition-all cursor-pointer border border-white/5"
                                  title="Edit"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => triggerGalleryDeleteConfirm(item)}
                                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-400 transition-all cursor-pointer border border-white/5"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {galleryItems.length === 0 && (
                          <tr>
                            <td colSpan="4" className="py-12 text-center text-xs text-slate-500 font-syne">
                              Belum ada data dokumentasi galeri.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </div>
      </main>

      {/* 🔴 MODAL: ADD / EDIT ACTIVITY FORM */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] z-10 relative flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black font-syne text-white">
                    {selectedActivity ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {selectedActivity ? 'Ubah rincian data kegiatan dan simpan perubahan.' : 'Lengkapi data kegiatan di bawah untuk mempublikasikannya.'}
                  </p>
                </div>
                <button
                  onClick={() => !submitting && setModalOpen(false)}
                  disabled={submitting}
                  className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </header>

              {/* Form Scrollable Body */}
              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">

                {/* Form Alert Error Banner */}
                {formError && (
                  <div className="bg-red-950/40 border border-red-500/20 text-red-300 p-4 rounded-2xl flex items-start gap-2.5 text-xs font-semibold leading-relaxed">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Section 1: Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Judul Kegiatan *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Kerja Bakti Bersama Pemuda"
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Kategori *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    >
                      <option value="Sosial">Sosial & Bakti</option>
                      <option value="Olahraga">Olahraga & Hobi</option>
                      <option value="Edukasi">Edukasi & Rapat</option>
                      <option value="Religi">Religi & Ibadah</option>
                      <option value="Seni">Seni & Kreatif</option>
                    </select>
                  </div>
                </div>

                {/* Section 2: Metadata */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Tanggal Pelaksanaan *</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Lokasi Kegiatan *</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="POS RW 05, Taman Sari"
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>
                </div>

                {/* Section 3: Extra Info */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Jumlah Partisipan (Stats)</label>
                    <input
                      type="text"
                      value={statPartisipan}
                      onChange={(e) => setStatPartisipan(e.target.value)}
                      placeholder="50 Pemuda"
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Durasi Kegiatan (Stats)</label>
                    <input
                      type="text"
                      value={statDurasi}
                      onChange={(e) => setStatDurasi(e.target.value)}
                      placeholder="1 Hari"
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Penyelenggara</label>
                    <input
                      type="text"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                      placeholder="Karang Taruna Bestfive"
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>
                </div>

                {/* Cover Image Uploader */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Gambar Cover Kegiatan *</label>

                  {image && image !== '/images/placeholder-activity.jpg' ? (
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/10 group bg-slate-950 flex items-center justify-center">
                      <img src={image} className="w-full h-full object-cover" alt="Preview Cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                        <button
                          type="button"
                          onClick={() => setImage('/images/placeholder-activity.jpg')}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" /> Hapus Gambar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-blue/30 transition-all bg-slate-950/20">
                      {uploadingImage ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
                          <span className="text-xs font-bold text-slate-300 animate-pulse font-syne">Mengompres & Mengunggah Gambar...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
                            <Image className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">Pilih Gambar Cover</span>
                            <span className="text-[9px] text-slate-500 block mt-1 leading-normal">
                              Format JPG, JPEG, PNG • Gambar akan dikompres otomatis agar hemat storage & cepat dimuat!
                            </span>
                          </div>
                          <label className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer">
                            Cari File
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setUploadingImage(true);
                                setFormError(null);
                                try {
                                  const url = await uploadActivityImage(file);
                                  setImage(url);
                                } catch (err) {
                                  setFormError("Gagal mengunggah gambar: " + err.message);
                                } finally {
                                  setUploadingImage(false);
                                }
                              }}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Toggle manual URL input */}
                  <div className="flex items-center justify-between px-1">
                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="text-[10px] font-bold text-slate-500 hover:text-brand-blue transition-all cursor-pointer"
                    >
                      {showUrlInput ? '← Kembali ke unggah file' : 'atau masukkan URL gambar secara manual'}
                    </button>
                  </div>

                  {showUrlInput && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-1.5 mt-1"
                    >
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Dokumentasi Kegiatan (Gallery) */}
                <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Dokumentasi Kegiatan (Gallery)</label>
                      <p className="text-[9px] text-slate-500 mt-0.5">Tambahkan foto-foto dokumentasi jalannya kegiatan ini.</p>
                    </div>
                  </div>

                  {/* Grid Preview of current gallery images */}
                  {gallery && gallery.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {gallery.map((imgUrl, idx) => (
                        <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-950 group">
                          <img src={imgUrl} className="w-full h-full object-cover" alt={`Doc ${idx}`} />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                            <button
                              type="button"
                              onClick={() => {
                                setGallery(prev => prev.filter((_, i) => i !== idx));
                              }}
                              className="w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center transition-all cursor-pointer"
                              title="Hapus"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add New Documentation Controls */}
                  <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-slate-950/20 border border-white/5">
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                      {uploadingGallery ? (
                        <div className="flex items-center gap-2 py-1.5">
                          <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                          <span className="text-xs font-bold text-slate-400 animate-pulse font-syne">Mengunggah Dokumentasi...</span>
                        </div>
                      ) : (
                        <div className="flex gap-2 w-full sm:w-auto">
                          <label className="flex-1 sm:flex-none text-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer">
                            Unggah Foto Dokumentasi
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setUploadingGallery(true);
                                setFormError(null);
                                try {
                                  const url = await uploadActivityImage(file);
                                  setGallery(prev => [...prev, url]);
                                } catch (err) {
                                  setFormError("Gagal mengunggah dokumentasi: " + err.message);
                                } finally {
                                  setUploadingGallery(false);
                                }
                              }}
                            />
                          </label>
                        </div>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => setShowGalleryUrlInput(!showGalleryUrlInput)}
                        className="text-[10px] font-bold text-slate-500 hover:text-brand-blue transition-all cursor-pointer"
                      >
                        {showGalleryUrlInput ? '← Batal input URL' : 'atau tambah via URL manual'}
                      </button>
                    </div>

                    {showGalleryUrlInput && (
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={galleryUrlInput}
                          onChange={(e) => setGalleryUrlInput(e.target.value)}
                          placeholder="Masukkan URL foto: https://images.unsplash.com/..."
                          className="flex-1 bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (galleryUrlInput.trim()) {
                              setGallery(prev => [...prev, galleryUrlInput.trim()]);
                              setGalleryUrlInput('');
                              setShowGalleryUrlInput(false);
                            }
                          }}
                          className="px-4 py-3 bg-brand-blue hover:bg-blue-600 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                        >
                          Tambah
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Sinopsis Ringkas (Description) *</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Kerja bakti pembersihan lingkungan RT untuk menyambut hari kemerdekaan."
                    disabled={submitting}
                    className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                  />
                </div>

                {/* Section 4: Narrative Content */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Isi Berita/Kegiatan (Gunakan enter untuk paragraf baru) *</label>
                  <textarea
                    rows="6"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Ketik detail cerita jalannya kegiatan di sini..."
                    disabled={submitting}
                    className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl p-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all resize-none"
                  />
                </div>



                {/* Form Actions footer */}
                <footer className="border-t border-white/5 pt-6 flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    disabled={submitting}
                    className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3.5 bg-brand-blue hover:bg-blue-600 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-brand-blue/10 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        Menyimpan...
                      </>
                    ) : (
                      'Simpan Kegiatan'
                    )}
                  </button>
                </footer>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔴 MODAL: DELETE CONFIRMATION DIALOG */}
      <AnimatePresence>
        {deleteConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setDeleteConfirmOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Dialog Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-[2rem] w-full max-w-md p-6 shadow-2xl z-10 relative text-center"
            >
              <span className="text-4xl mb-4 block">⚠️</span>
              <h4 className="text-xl font-black font-syne text-white mb-2">Hapus Kegiatan?</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Apakah Anda yakin ingin menghapus kegiatan <strong className="text-white">"{selectedActivity?.title}"</strong>? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmOpen(false)}
                  disabled={submitting}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleDeleteSubmit}
                  disabled={submitting}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/10 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      Menghapus...
                    </>
                  ) : (
                    'Ya, Hapus'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔴 MODAL: ADD / EDIT MEMBER FORM */}
      <AnimatePresence>
        {memberModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setMemberModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] z-10 relative flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black font-syne text-white">
                    {selectedMember ? 'Edit Data Pengurus' : 'Tambah Pengurus Baru'}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {selectedMember ? 'Ubah informasi profil pengurus.' : 'Lengkapi data profil pengurus Karang Taruna.'}
                  </p>
                </div>
                <button
                  onClick={() => !submitting && setMemberModalOpen(false)}
                  disabled={submitting}
                  className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </header>

              {/* Form Scrollable Body */}
              <form onSubmit={handleMemberFormSubmit} className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">

                {/* Form Alert Error Banner */}
                {formError && (
                  <div className="bg-red-950/40 border border-red-500/20 text-red-300 p-4 rounded-2xl flex items-start gap-2.5 text-xs font-semibold leading-relaxed">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Section 1: Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Nama Lengkap Pengurus *</label>
                    <input
                      type="text"
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      placeholder="Aapis Hidayat"
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Jabatan / Posisi *</label>
                    <input
                      type="text"
                      value={memberPosition}
                      onChange={(e) => setMemberPosition(e.target.value)}
                      placeholder="Ketua Umum / Anggota Aktif"
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Kelompok Peran *</label>
                    <select
                      value={memberRoleGroup}
                      onChange={(e) => setMemberRoleGroup(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    >
                      <option value="bph">BPH (Badan Pengurus Harian)</option>
                      <option value="anggota">Anggota Aktif</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Instagram URL / Username</label>
                    <input
                      type="text"
                      value={memberInstagram}
                      onChange={(e) => setMemberInstagram(e.target.value)}
                      placeholder="https://instagram.com/aapis_hid"
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>
                </div>

                {/* Section 2: Kekuatan & Quotes */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Kekuatan Unik / Superpower</label>
                    <input
                      type="text"
                      value={memberSuperpower}
                      onChange={(e) => setMemberSuperpower(e.target.value)}
                      placeholder="🚀 Visi Misi Master"
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Fun Quote</label>
                    <input
                      type="text"
                      value={memberFunQuote}
                      onChange={(e) => setMemberFunQuote(e.target.value)}
                      placeholder="Pemuda hari ini, pemimpin hari esok!"
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>
                </div>

                {/* Profile Photo Uploader Zone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Foto Profil Pengurus *</label>

                  {/* Photo Preview and Actions */}
                  <div className="flex items-center gap-4 bg-slate-950/30 p-4 border border-white/5 rounded-2xl">
                    <div className="w-16 h-16 rounded-full border border-white/10 overflow-hidden bg-slate-950 flex-shrink-0">
                      <img
                        src={memberImage || '/images/placeholder-profile.jpg'}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col gap-1.5">
                      {uploadingMemberImage ? (
                        <div className="flex items-center gap-2 text-brand-blue">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-[10px] font-bold animate-pulse font-syne">Mengompres & Mengunggah Foto...</span>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <label className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer">
                            Unggah Foto Baru
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setUploadingMemberImage(true);
                                setFormError(null);
                                try {
                                  const url = await uploadActivityImage(file);
                                  setMemberImage(url);
                                } catch (err) {
                                  setFormError("Gagal mengunggah foto profil: " + err.message);
                                } finally {
                                  setUploadingMemberImage(false);
                                }
                              }}
                            />
                          </label>
                        </div>
                      )}
                      <span className="text-[9px] text-slate-500">Mendukung JPEG, PNG. Ukuran berkas akan dikompres otomatis.</span>
                    </div>
                  </div>

                  {/* Manual URL Toggle */}
                  <div className="flex items-center justify-between px-1">
                    <button
                      type="button"
                      onClick={() => setShowMemberUrlInput(!showMemberUrlInput)}
                      className="text-[10px] font-bold text-slate-500 hover:text-brand-blue transition-all cursor-pointer"
                    >
                      {showMemberUrlInput ? '← Kembali ke unggah file' : 'atau masukkan URL gambar secara manual'}
                    </button>
                  </div>

                  {showMemberUrlInput && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-1.5 mt-1"
                    >
                      <input
                        type="text"
                        value={memberImage}
                        onChange={(e) => setMemberImage(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Highlight Checkbox */}
                <div className="flex items-center gap-2 bg-slate-950/30 p-4 border border-white/5 rounded-2xl">
                  <input
                    type="checkbox"
                    id="memberHighlight"
                    checked={memberHighlight}
                    onChange={(e) => setMemberHighlight(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950/60 border border-white/10 text-brand-blue focus:ring-brand-blue/35 cursor-pointer"
                  />
                  <label htmlFor="memberHighlight" className="text-xs text-slate-300 font-bold cursor-pointer select-none">
                    Highlight Profil Pengurus (Tampilkan dengan ornamen BPH Utama di website)
                  </label>
                </div>

                {/* Form Actions footer */}
                <footer className="border-t border-white/5 pt-6 flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setMemberModalOpen(false)}
                    disabled={submitting}
                    className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3.5 bg-brand-blue hover:bg-blue-600 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-brand-blue/10 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        Menyimpan...
                      </>
                    ) : (
                      'Simpan Pengurus'
                    )}
                  </button>
                </footer>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔴 MODAL: DELETE MEMBER CONFIRMATION DIALOG */}
      <AnimatePresence>
        {memberDeleteConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setMemberDeleteConfirmOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Dialog Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-[2rem] w-full max-w-md p-6 shadow-2xl z-10 relative text-center"
            >
              <span className="text-4xl mb-4 block">⚠️</span>
              <h4 className="text-xl font-black font-syne text-white mb-2">Hapus Pengurus?</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Apakah Anda yakin ingin menghapus pengurus <strong className="text-white">"{selectedMember?.name}"</strong>? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setMemberDeleteConfirmOpen(false)}
                  disabled={submitting}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleMemberDeleteSubmit}
                  disabled={submitting}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/10 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      Menghapus...
                    </>
                  ) : (
                    'Ya, Hapus'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔴 MODAL: ADD / EDIT GALLERY ITEM */}
      <AnimatePresence>
        {galleryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setGalleryModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Dialog Card Container */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl h-[90vh] sm:h-auto max-h-[85vh] flex flex-col overflow-hidden shadow-2xl z-10 relative"
            >
              {/* Modal Header */}
              <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-slate-950/30">
                <div>
                  <h3 className="text-lg font-black font-syne text-white tracking-tight">
                    {selectedGalleryItem ? 'Edit Dokumentasi Galeri' : 'Tambah Dokumentasi Galeri'}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-0.5">
                    {selectedGalleryItem ? 'Perbarui momen kegiatan Karang Taruna' : 'Unggah foto dokumentasi kegiatan baru'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </header>

              {/* Form Scrollable Body */}
              <form onSubmit={handleGalleryFormSubmit} className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">

                {/* Form Alert Error Banner */}
                {formError && (
                  <div className="bg-red-950/40 border border-red-500/20 text-red-300 p-4 rounded-2xl flex items-start gap-2.5 text-xs font-semibold leading-relaxed">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Section 1: Title and Category */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Judul Momen *</label>
                    <input
                      type="text"
                      value={galleryItemTitle}
                      onChange={(e) => setGalleryItemTitle(e.target.value)}
                      placeholder="Gotong Royong Pos RW 005"
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Kategori *</label>
                    <select
                      value={galleryItemCategory}
                      onChange={(e) => setGalleryItemCategory(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                    >
                      <option value="Sosial">Sosial</option>
                      <option value="Edukasi">Edukasi</option>
                      <option value="Olahraga">Olahraga</option>
                      <option value="Rapat">Rapat</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Keterangan / Deskripsi Singkat</label>
                  <textarea
                    value={galleryItemDesc}
                    onChange={(e) => setGalleryItemDesc(e.target.value)}
                    placeholder="Momen kebersamaan para pengurus Bestfive RW 005 membersihkan lingkungan sekitar..."
                    disabled={submitting}
                    rows="3"
                    className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all resize-none"
                  />
                </div>

                {/* Cover Image Uploader Zone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Foto Dokumentasi *</label>

                  {/* Photo Preview and Actions */}
                  <div className="flex items-center gap-4 bg-slate-950/30 p-4 border border-white/5 rounded-2xl">
                    <div className="w-24 h-16 rounded-xl border border-white/10 overflow-hidden bg-slate-950 flex-shrink-0">
                      <img
                        src={galleryItemImage || '/images/placeholder-gallery.jpg'}
                        alt="Gallery Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col gap-1.5">
                      {uploadingGalleryItemImage ? (
                        <div className="flex items-center gap-2 text-brand-blue">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-[10px] font-bold animate-pulse font-syne">Mengompres & Mengunggah Foto...</span>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <label className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer">
                            Unggah Foto Momen
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setUploadingGalleryItemImage(true);
                                setFormError(null);
                                try {
                                  const url = await uploadActivityImage(file);
                                  setGalleryItemImage(url);
                                } catch (err) {
                                  setFormError("Gagal mengunggah gambar galeri: " + err.message);
                                } finally {
                                  setUploadingGalleryItemImage(false);
                                }
                              }}
                            />
                          </label>
                        </div>
                      )}
                      <span className="text-[9px] text-slate-500">Mendukung JPEG, PNG. Gambar dikompres otomatis agar memuat sangat cepat.</span>
                    </div>
                  </div>

                  {/* Manual URL Toggle */}
                  <div className="flex items-center justify-between px-1">
                    <button
                      type="button"
                      onClick={() => setShowGalleryItemUrlInput(!showGalleryItemUrlInput)}
                      className="text-[10px] font-bold text-slate-500 hover:text-brand-blue transition-all cursor-pointer"
                    >
                      {showGalleryItemUrlInput ? '← Kembali ke unggah file' : 'atau masukkan URL gambar secara manual'}
                    </button>
                  </div>

                  {showGalleryItemUrlInput && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-1.5 mt-1"
                    >
                      <input
                        type="text"
                        value={galleryItemImage}
                        onChange={(e) => setGalleryItemImage(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-slate-950/60 border border-white/5 focus:border-brand-blue rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/35 transition-all"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Form Actions footer */}
                <footer className="border-t border-white/5 pt-6 flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setGalleryModalOpen(false)}
                    disabled={submitting}
                    className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3.5 bg-brand-blue hover:bg-blue-600 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-brand-blue/10 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        Menyimpan...
                      </>
                    ) : (
                      'Simpan Momen'
                    )}
                  </button>
                </footer>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔴 MODAL: DELETE GALLERY CONFIRMATION DIALOG */}
      <AnimatePresence>
        {galleryDeleteConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setGalleryDeleteConfirmOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Dialog Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-[2rem] w-full max-w-md p-6 shadow-2xl z-10 relative text-center"
            >
              <span className="text-4xl mb-4 block">⚠️</span>
              <h4 className="text-xl font-black font-syne text-white mb-2">Hapus Dokumentasi Galeri?</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Apakah Anda yakin ingin menghapus momen <strong className="text-white">"{selectedGalleryItem?.title}"</strong>? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setGalleryDeleteConfirmOpen(false)}
                  disabled={submitting}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleGalleryDeleteSubmit}
                  disabled={submitting}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/10 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      Menghapus...
                    </>
                  ) : (
                    'Ya, Hapus'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
