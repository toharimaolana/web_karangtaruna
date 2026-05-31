import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from '../pages/Home';
import ActivityDetail from '../pages/ActivityDetail';
import Login from '../pages/Login';
import AdminDashboard from '../pages/AdminDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

// Scroll Restoration component to reset window scroll position on route changes
export function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll to top immediately
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kegiatan/:id" element={<ActivityDetail />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

