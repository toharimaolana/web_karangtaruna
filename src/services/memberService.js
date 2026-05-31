import { supabase } from '../lib/supabaseClient';

const mockMembers = [
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

// Ensure all mock members have a consistent, unique ID for in-memory sandbox CRUD operations
mockMembers.forEach((mem, idx) => {
  mem.id = mem.id || `mock-member-${idx + 1}`;
});

// Helper to determine if we are operating in sandbox/offline mode
const isMockSession = () => localStorage.getItem('karta_mock_session') === 'true';

// Helper to normalize the database schema with the frontend UI model
function mapMember(dbMem) {
  if (!dbMem) return null;
  return {
    id: dbMem.id,
    name: dbMem.name,
    position: dbMem.position,
    image: dbMem.photo_url || dbMem.image || '/images/placeholder-profile.jpg',
    instagram: dbMem.instagram || '',
    roleGroup: String(dbMem.role_group || dbMem.roleGroup || dbMem.rolegroup || dbMem.role || 'anggota').toLowerCase().trim(),
    superpower: dbMem.superpower || '⚡ Pemuda Aktif',
    funQuote: dbMem.fun_quote || dbMem.funQuote || 'Solidaritas tanpa tapi!',
    highlight: dbMem.highlight === true || dbMem.highlight === 'true'
  };
}

export async function getMembers() {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Operating in local mock sandbox mode. Returning mock members.');
    return [...mockMembers];
  }

  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    if (!data || data.length === 0) {
      console.log('[Supabase] Members table is empty in live mode.');
      return [];
    }

    return data.map(mapMember);
  } catch (error) {
    console.error('[Supabase] Error fetching live members:', error.message);
    return [];
  }
}

export async function createMember(member) {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Client offline or mock sandbox. Creating member in memory.');
    const newMem = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      ...member,
    };
    mockMembers.push(newMem);
    return { data: { ...newMem }, error: null };
  }

  try {
    const dbPayload = {
      name: member.name,
      position: member.position,
      photo_url: member.image,
      instagram: member.instagram,
      role_group: member.roleGroup || 'anggota',
      superpower: member.superpower || '⚡ Pemuda Aktif',
      fun_quote: member.funQuote || 'Solidaritas tanpa tapi!',
      highlight: member.highlight || false
    };

    const { data, error } = await supabase
      .from('members')
      .insert([dbPayload])
      .select()
      .single();

    if (error) throw error;
    return { data: mapMember(data), error: null };
  } catch (error) {
    console.error('[Supabase] Member insertion error:', error.message);
    return { data: null, error };
  }
}

export async function updateMember(id, member) {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Client offline or mock sandbox. Updating member in memory.');
    const idx = mockMembers.findIndex(m => m.id === id);
    if (idx !== -1) {
      mockMembers[idx] = { ...mockMembers[idx], ...member };
      return { data: { ...mockMembers[idx] }, error: null };
    }
    return { data: null, error: new Error('Anggota tidak ditemukan di memori') };
  }

  try {
    const dbPayload = {
      name: member.name,
      position: member.position,
      photo_url: member.image,
      instagram: member.instagram,
      role_group: member.roleGroup,
      superpower: member.superpower,
      fun_quote: member.funQuote,
      highlight: member.highlight
    };

    const { data, error } = await supabase
      .from('members')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: mapMember(data), error: null };
  } catch (error) {
    console.error('[Supabase] Member update error:', error.message);
    return { data: null, error };
  }
}

export async function deleteMember(id) {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Client offline or mock sandbox. Deleting member from memory.');
    const idx = mockMembers.findIndex(m => m.id === id);
    if (idx !== -1) {
      const deleted = mockMembers.splice(idx, 1)[0];
      return { data: deleted, error: null };
    }
    return { data: null, error: new Error('Anggota tidak ditemukan di memori') };
  }

  try {
    const { data, error } = await supabase
      .from('members')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: mapMember(data), error: null };
  } catch (error) {
    console.error('[Supabase] Member deletion error:', error.message);
    return { data: null, error };
  }
}
