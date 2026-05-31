import { supabase } from '../lib/supabaseClient';

const MOCK_ADMIN_EMAIL = 'admin@bestfive.org';
const MOCK_ADMIN_PASSWORD = 'admin123';

// Simple listeners array for session state changes
const authListeners = new Set();

// Try to load any existing session from localStorage (for mock mode persistence)
let mockSession = localStorage.getItem('karta_mock_session') === 'true';

export async function login(email, password) {
  // 1. Fast-track local mock credentials to prevent unnecessary network requests & console noise
  if (email === MOCK_ADMIN_EMAIL && password === MOCK_ADMIN_PASSWORD) {
    console.log('[Auth] Local mock credentials matched. Activating offline admin session.');
    mockSession = true;
    localStorage.setItem('karta_mock_session', 'true');
    notifyListeners(true);
    return { data: { user: { email } }, error: null };
  }

  // 2. If not mock credentials, proceed with live Supabase Authentication
  if (!supabase) {
    return { data: null, error: new Error('Layanan Supabase offline dan kredensial mock tidak cocok.') };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    // Clear any lingering mock session flags on successful real Supabase login
    mockSession = false;
    localStorage.removeItem('karta_mock_session');

    return { data, error: null };
  } catch (error) {
    console.error('[Auth] Live Login error:', error.message);
    return { data: null, error };
  }
}

export async function logout() {
  if (mockSession || !supabase) {
    console.log('[Auth] Logging out mock session.');
    mockSession = false;
    localStorage.removeItem('karta_mock_session');
    notifyListeners(false);
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('[Auth] Logout error:', error.message);
    // Force clear session state on failure
    mockSession = false;
    localStorage.removeItem('karta_mock_session');
    notifyListeners(false);
    return { error };
  }
}

export async function getCurrentUser() {
  if (!supabase) {
    return mockSession ? { email: MOCK_ADMIN_EMAIL } : null;
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;

    // Self-healing: If real Supabase user session exists, wipe any lingering local mock flags
    if (user) {
      mockSession = false;
      localStorage.removeItem('karta_mock_session');
    }

    return user;
  } catch (error) {
    // If supabase gets user error (e.g. offline), check mock session
    return mockSession ? { email: MOCK_ADMIN_EMAIL } : null;
  }
}

export function subscribeToAuth(callback) {
  authListeners.add(callback);
  
  // Set up Supabase real auth subscription if available
  let supabaseSub = null;
  if (supabase) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Prevent Supabase's null session from overriding active mock offline sessions and causing blinking redirect loops
      if (mockSession) {
        callback({ email: MOCK_ADMIN_EMAIL });
      } else {
        callback(session ? session.user : null);
      }
    });
    supabaseSub = subscription;
  }

  // Trigger initial callback
  getCurrentUser().then(callback);

  // Return unsubscribe handle
  return () => {
    authListeners.delete(callback);
    if (supabaseSub) {
      supabaseSub.unsubscribe();
    }
  };
}

function notifyListeners(userState) {
  const userObj = userState ? { email: MOCK_ADMIN_EMAIL } : null;
  authListeners.forEach((cb) => cb(userObj));
}
