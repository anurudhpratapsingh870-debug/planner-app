import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthPage({ mode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isLogin = mode === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;
      if (isLogin) {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }

      if (result.error) throw result.error;
      
      // Navigate to app if successful
      if (result.data.user) {
        navigate('/app');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/app'
        }
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: '#fafafa', paddingTop: '10vh' }}>
      
      <div style={{ width: '100%', maxWidth: 400, padding: 40, background: '#fff', borderRadius: 12, border: '1px solid #f0f0f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: '#e44332' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', color: '#202020' }}>
            {isLogin ? 'Log in' : 'Sign up'}
          </h2>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: 8, fontSize: 13, marginBottom: 20, border: '1px solid #fecaca' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#5a5a5a', marginBottom: 8, display: 'block' }}>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email..." 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e5e5', fontSize: 15 }}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#5a5a5a', marginBottom: 8, display: 'block' }}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password..." 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e5e5', fontSize: 15 }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', background: '#e44332', color: '#fff', border: 'none', padding: '12px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8 }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Log in' : 'Sign up')}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#f0f0f0' }}></div>
            <span style={{ padding: '0 12px', fontSize: 13, color: '#a0a0a0' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: '#f0f0f0' }}></div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleLogin}
            style={{ width: '100%', background: '#fff', color: '#202020', border: '1px solid #e5e5e5', padding: '12px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 20, height: 20 }} />
            Continue with Google
          </button>
        </form>

        <p style={{ textAlign: 'center', margin: '32px 0 0', fontSize: 13, color: '#808080' }}>
          {isLogin ? "Don't have an account? " : "Already signed up? "}
          <Link to={isLogin ? '/signup' : '/login'} style={{ color: '#202020', textDecoration: 'underline', fontWeight: 600 }}>
            {isLogin ? 'Sign up' : 'Go to login'}
          </Link>
        </p>

      </div>
    </div>
  );
}
