import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { BrainCircuit, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';

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
      // Determine the correct redirect URL for mobile vs web
      const isNative = window.location.hostname === 'localhost';
      const redirectTo = isNative 
        ? 'com.antigravity.lifeos://login-callback'
        : window.location.origin + '/app';

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo
        }
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      background: '#f8fafc', padding: '20px', fontFamily: 'Inter, sans-serif' 
    }}>
      
      <div style={{ width: '100%', maxWidth: '440px' }}>
        
        {/* Back Link */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '32px' }}>
          <ArrowLeft size={16} /> Back to home
        </Link>

        {/* Auth Card */}
        <div style={{ 
          background: '#fff', padding: '48px', borderRadius: '24px', 
          border: '1px solid #f1f5f9', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' 
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <BrainCircuit size={28} />
              </div>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: '8px' }}>
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 500 }}>
              {isLogin ? 'Let\'s get back to achieving your goals' : 'Start your productivity journey today'}
            </p>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', color: '#dc2626', padding: '14px', borderRadius: '12px', fontSize: '14px', marginBottom: '24px', border: '1px solid #fee2e2', fontWeight: 500 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Email address</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Password</label>
                {isLogin && <Link to="#" style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600 }}>Forgot password?</Link>}
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', background: '#2563eb', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : (isLogin ? 'Sign in' : 'Create account')}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', margin: '12px 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}></div>
              <span style={{ padding: '0 12px', fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}></div>
            </div>

            <button 
              type="button" 
              onClick={handleGoogleLogin}
              style={{ width: '100%', background: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 20, height: 20 }} />
              Sign in with Google
            </button>
          </form>

          <p style={{ textAlign: 'center', margin: '32px 0 0', fontSize: '14px', color: '#64748b', fontWeight: 500 }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link to={isLogin ? '/signup' : '/login'} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 700 }}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
