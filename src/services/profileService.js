import { supabase } from '../lib/supabaseClient';

const mockProfile = {
  name: "Karang Taruna Bestfive RW 005",
  vision: "Menjadi wadah resmi kolaborasi internal pemuda RW 005 yang kreatif, solid, inovatif, dan berintegritas tinggi demi mewujudkan kontribusi nyata bagi masyarakat.",
  mission: "Mengembangkan potensi pemuda melalui wadah edukasi kreatif, aksi kepedulian sosial yang nyata, serta mempererat kerukunan pemuda dan warga sekitar.",
  values: "Menjunjung tinggi asas kekeluargaan, keguyuban, solidaritas tanpa tapi, transparansi kerja organisasi, serta semangat berkolaborasi yang tak pernah padam.",
  address: "POS RW 05(Taman Sari) Jl. Mangga Besar IV R No.35, RT.6/RW.5, Taman Sari, Kec. Taman Sari, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11150",
  contactEmail: "contact@kartabestfive.org",
  contactPhone: "+628123456789",
  instagramUrl: "https://instagram.com/kartabestfive"
};

export async function getProfile() {
  if (!supabase) {
    console.log('[Supabase] Client not initialized. Returning mock profile.');
    return mockProfile;
  }

  try {
    const { data, error } = await supabase
      .from('organization_profile')
      .select('*')
      .maybeSingle(); // Safely fetches single row, if none exists returns null without throwing

    if (error) throw error;

    if (!data) {
      console.log('[Supabase] Profile table is empty. Falling back to mock data.');
      return mockProfile;
    }

    return {
      name: data.name || mockProfile.name,
      vision: data.vision || mockProfile.vision,
      mission: data.mission || mockProfile.mission,
      values: data.values || mockProfile.values,
      address: data.address || mockProfile.address,
      contactEmail: data.contact_email || data.contactEmail || mockProfile.contactEmail,
      contactPhone: data.contact_phone || data.contactPhone || mockProfile.contactPhone,
      instagramUrl: data.instagram_url || data.instagramUrl || mockProfile.instagramUrl
    };
  } catch (error) {
    console.error('[Supabase] Error fetching profile:', error.message);
    console.log('[Supabase] Falling back to local static profile mock.');
    return mockProfile;
  }
}
