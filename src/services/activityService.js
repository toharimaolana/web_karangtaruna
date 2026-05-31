import { supabase } from '../lib/supabaseClient';
import { activities as mockActivities } from './activityData';

// Helper to determine if the current user session is a local mock sandbox session
const isMockSession = () => localStorage.getItem('karta_mock_session') === 'true';

// Normalization Mapper to ensure both Supabase DB schema and local Mock schema
// resolve to the exact same clean visual model in the UI components
function mapActivity(dbAct) {
  if (!dbAct) return null;
  return {
    id: dbAct.id,
    title: dbAct.title,
    slug: dbAct.slug || dbAct.id,
    category: dbAct.category || 'Kegiatan',
    image: dbAct.image_url || dbAct.image,
    description: dbAct.description,
    date: dbAct.activity_date || dbAct.date,
    location: dbAct.location,
    organizer: dbAct.organizer,
    stats: typeof dbAct.stats === 'string' ? JSON.parse(dbAct.stats) : (dbAct.stats || {}),
    content: dbAct.content || [],
    gallery: dbAct.gallery || []
  };
}

export async function getActivities() {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Operating in local mock sandbox mode. Returning mock activities.');
    return [...mockActivities];
  }

  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('activity_date', { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      console.log('[Supabase] Activities table is empty in live mode.');
      return [];
    }

    return data.map(mapActivity);
  } catch (error) {
    console.error('[Supabase] Error fetching live activities:', error.message);
    return [];
  }
}

export async function getActivityById(id) {
  if (!supabase || isMockSession()) {
    return mockActivities.find(act => act.id === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return mapActivity(data);
  } catch (error) {
    console.error(`[Supabase] Error fetching live activity by id (${id}):`, error.message);
    return null;
  }
}

export async function getRelatedActivities(currentId, limit = 3) {
  if (!supabase || isMockSession()) {
    return mockActivities
      .filter(act => act.id !== currentId)
      .slice(0, limit);
  }

  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .neq('id', currentId)
      .limit(limit);

    if (error) throw error;

    if (!data || data.length === 0) {
      return [];
    }

    return data.map(mapActivity);
  } catch (error) {
    console.error('[Supabase] Error fetching live related activities:', error.message);
    return [];
  }
}

export async function createActivity(activity) {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Client offline or mock sandbox. Creating activity in memory/local mock.');
    const newAct = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      ...activity,
    };
    mockActivities.unshift(newAct);
    return { data: newAct, error: null };
  }

  try {
    const dbPayload = {
      title: activity.title,
      slug: activity.slug || activity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: activity.category || 'Kegiatan',
      image_url: activity.image,
      description: activity.description,
      activity_date: activity.date,
      location: activity.location,
      organizer: activity.organizer || 'Karang Taruna Bestfive',
      stats: typeof activity.stats === 'string' ? activity.stats : JSON.stringify(activity.stats || {}),
      content: activity.content || [],
      gallery: activity.gallery || []
    };

    const { data, error } = await supabase
      .from('activities')
      .insert([dbPayload])
      .select()
      .single();

    if (error) throw error;
    return { data: mapActivity(data), error: null };
  } catch (error) {
    console.error('[Supabase] Error creating activity:', error.message);
    return { data: null, error };
  }
}

export async function updateActivity(id, activity) {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Client offline or mock sandbox. Updating activity in local mock.');
    const index = mockActivities.findIndex(act => act.id === id);
    if (index !== -1) {
      mockActivities[index] = { ...mockActivities[index], ...activity };
      return { data: mockActivities[index], error: null };
    }
    return { data: null, error: new Error('Activity not found in local mock.') };
  }

  try {
    const dbPayload = {
      title: activity.title,
      slug: activity.slug || activity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: activity.category || 'Kegiatan',
      image_url: activity.image,
      description: activity.description,
      activity_date: activity.date,
      location: activity.location,
      organizer: activity.organizer || 'Karang Taruna Bestfive',
      stats: typeof activity.stats === 'string' ? activity.stats : JSON.stringify(activity.stats || {}),
      content: activity.content || [],
      gallery: activity.gallery || []
    };

    const { data, error } = await supabase
      .from('activities')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: mapActivity(data), error: null };
  } catch (error) {
    console.error('[Supabase] Error updating activity:', error.message);
    return { data: null, error };
  }
}

export async function deleteActivity(id) {
  if (!supabase || isMockSession()) {
    console.log('[Supabase] Client offline or mock sandbox. Deleting activity from local mock.');
    const index = mockActivities.findIndex(act => act.id === id);
    if (index !== -1) {
      const deleted = mockActivities.splice(index, 1);
      return { data: deleted[0], error: null };
    }
    return { data: null, error: new Error('Activity not found in local mock.') };
  }

  try {
    const { data, error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: mapActivity(data), error: null };
  } catch (error) {
    console.error('[Supabase] Error deleting activity:', error.message);
    return { data: null, error };
  }
}


