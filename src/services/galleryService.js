import { supabase } from '../lib/supabaseClient';

// Static mock gallery items for sandbox mode / empty fallback
const mockGalleryItems = [
  {
    id: "mock-gal-1",
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1000&h=750&fit=crop",
    title: "Rapat Kerja Tahunan Bestfive",
    category: "Rapat",
    desc: "Perumusan program kerja inovatif bersama seluruh pengurus inti dan dewan penasihat."
  },
  {
    id: "mock-gal-2",
    src: "https://images.unsplash.com/photo-1511795409834-432f7b1728d2?w=1000&h=750&fit=crop",
    title: "Kolaborasi Bakti Sosial Warga",
    category: "Sosial",
    desc: "Penyaluran bantuan sembako dan gotong royong merapikan pos RW 005."
  },
  {
    id: "mock-gal-3",
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1000&h=750&fit=crop",
    title: "Karnaval Kemerdekaan RI",
    category: "Sosial",
    desc: "Aksi pawai obor dan kostum daur ulang kreatif garapan pemuda Bestfive."
  },
  {
    id: "mock-gal-4",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&h=750&fit=crop",
    title: "Malam Panggung Gembira",
    category: "Sosial",
    desc: "Puncak perayaan HUT RI dengan penampilan band lokal dan pembagian piala lomba."
  },
  {
    id: "mock-gal-5",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&h=750&fit=crop",
    title: "Workshop Content Marketing",
    category: "Edukasi",
    desc: "Kelas interaktif membedah taktik digital branding bagi usaha mikro warga setempat."
  },
  {
    id: "mock-gal-6",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&h=750&fit=crop",
    title: "Final Lomba Futsal RW Cup",
    category: "Olahraga",
    desc: "Ketegangan babak final futsal yang mempertemukan RT 03 dan RT 05."
  }
];

// Helper to determine if sandbox mode is active
const isMockSession = () => localStorage.getItem('karta_mock_session') === 'true';

// Normalize database object to UI schema
function mapGalleryItem(dbItem) {
  if (!dbItem) return null;
  return {
    id: dbItem.id,
    src: dbItem.photo_url || dbItem.src || '/images/placeholder-gallery.jpg',
    title: dbItem.title,
    category: dbItem.category || 'Sosial',
    desc: dbItem.description || dbItem.desc || ''
  };
}

// Read All Gallery Items
export async function getGalleryItems() {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Offline/Sandbox mode. Returning mock gallery items.');
    return [...mockGalleryItems];
  }

  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      console.log('[Supabase] Gallery table is empty. Falling back to mock gallery.');
      return [...mockGalleryItems];
    }

    return data.map(mapGalleryItem);
  } catch (error) {
    console.error('[Supabase] Error fetching gallery:', error.message);
    return [...mockGalleryItems];
  }
}

// Create Gallery Item
export async function createGalleryItem(item) {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Offline/Sandbox mode. Creating gallery item in memory.');
    const newItem = {
      id: `mock-gal-${Date.now()}`,
      src: item.src || '/images/placeholder-gallery.jpg',
      title: item.title,
      category: item.category || 'Sosial',
      desc: item.desc || ''
    };
    mockGalleryItems.unshift(newItem);
    return { data: newItem, error: null };
  }

  try {
    const dbPayload = {
      title: item.title,
      category: item.category || 'Sosial',
      photo_url: item.src,
      description: item.desc
    };

    const { data, error } = await supabase
      .from('gallery')
      .insert([dbPayload])
      .select()
      .single();

    if (error) throw error;
    return { data: mapGalleryItem(data), error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// Update Gallery Item
export async function updateGalleryItem(id, item) {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Offline/Sandbox mode. Updating gallery item in memory.');
    const idx = mockGalleryItems.findIndex(g => g.id === id);
    if (idx !== -1) {
      mockGalleryItems[idx] = {
        ...mockGalleryItems[idx],
        src: item.src || mockGalleryItems[idx].src,
        title: item.title,
        category: item.category || mockGalleryItems[idx].category,
        desc: item.desc
      };
      return { data: mockGalleryItems[idx], error: null };
    }
    return { data: null, error: new Error('Momen tidak ditemukan') };
  }

  try {
    const dbPayload = {
      title: item.title,
      category: item.category,
      photo_url: item.src,
      description: item.desc
    };

    const { data, error } = await supabase
      .from('gallery')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: mapGalleryItem(data), error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// Delete Gallery Item
export async function deleteGalleryItem(id) {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Offline/Sandbox mode. Deleting gallery item in memory.');
    const idx = mockGalleryItems.findIndex(g => g.id === id);
    if (idx !== -1) {
      mockGalleryItems.splice(idx, 1);
      return { error: null };
    }
    return { error: new Error('Momen tidak ditemukan') };
  }

  try {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
}
