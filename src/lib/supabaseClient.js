import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Safely initialize client only if connection credentials are provided
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Clean console notice for future developers
if (!supabase) {
  console.warn(
    '[Supabase] Warning: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing in your .env file. ' +
    'The application will fall back to local static mock data.'
  );
}
