import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { subscribeToAuth } from '../services/authService';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to session state updates
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Premium loading splash screen matching the Karang Taruna aesthetic
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-brand-blue rounded-full animate-spin mb-4" />
        <p className="text-slate-400 text-sm font-black font-syne uppercase tracking-widest animate-pulse">
          Memeriksa Kredensial Keamanan...
        </p>
      </div>
    );
  }

  // Redirect to Login if no active user session
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render children component if authenticated
  return children;
}
