import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import MainDashboard from './pages/MainDashboard';
import { supabase } from './lib/supabase';
import './index.css';

// Main App Component
export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setLoading(false);
      
      // Clear hash fragment if it contains auth tokens
      if (window.location.hash && (window.location.hash.includes('access_token') || window.location.hash.includes('error'))) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setLoading(false);
      
      if (event === 'SIGNED_IN') {
        // Force immediate check of URL to clear fragments
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#666', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #E44332', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          Signing you in...
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Auto-redirect to /app if session exists */}
        <Route path="/" element={session ? <Navigate to="/app" replace /> : <LandingPage />} />
        <Route path="/login" element={session ? <Navigate to="/app" replace /> : <AuthPage mode="login" />} />
        <Route path="/signup" element={session ? <Navigate to="/app" replace /> : <AuthPage mode="signup" />} />

        {/* Protected App Routes - Auto-redirect to /login if no session */}
        <Route 
          path="/app/*" 
          element={
            session ? <MainDashboard /> : <Navigate to="/login" replace />
          } 
        />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
