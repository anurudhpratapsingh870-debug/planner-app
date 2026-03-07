import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, CheckCircle2, Layout, Calendar as CalIcon, 
  ArrowRight, Zap, Target, BarChart3, Globe, 
  Shield, BrainCircuit, Star
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fff', 
      color: '#1e293b', 
      fontFamily: 'Inter, -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(241, 245, 249, 1);
        }
      `}</style>

      {/* Navigation */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', padding: '16px 48px', alignItems: 'center', 
        maxWidth: 1400, margin: '0 auto', background: scrollY > 20 ? 'rgba(255,255,255,0.9)' : 'transparent',
        backdropFilter: scrollY > 20 ? 'blur(10px)' : 'none',
        position: 'sticky', top: 0, zIndex: 1000, transition: 'all 0.3s'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <BrainCircuit size={20} />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#1e293b', letterSpacing: '-0.5px' }}>Antigravity</span>
        </div>
        
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '24px', fontSize: 14, fontWeight: 600, color: '#64748b' }}>
            <span>Features</span>
            <span>Templates</span>
            <span>Analytics</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              onClick={() => navigate('/login')}
              style={{ background: 'transparent', color: '#1e293b', border: 'none', padding: '8px 16px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
            >
              Log in
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="btn-primary"
              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: '0.2s' }}
            >
              Sign up free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        maxWidth: 1200, margin: '0 auto', padding: '100px 48px 120px', 
        textAlign: 'center'
      }}>
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '8px', 
          background: '#eff6ff', color: '#2563eb', padding: '6px 16px', 
          borderRadius: '20px', fontSize: '13px', fontWeight: 700, marginBottom: '24px'
        }}>
          <Sparkles size={14} /> New: AI Autonomous Planning is here
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 800, lineHeight: 1.1, 
          letterSpacing: '-2px', color: '#0f172a', marginBottom: '24px', maxWidth: '900px', margin: '0 auto 24px'
        }}>
          Organize your work and life, <span style={{ color: '#2563eb' }}>effortlessly.</span>
        </h1>
        
        <p style={{ 
          fontSize: '20px', color: '#64748b', lineHeight: 1.6, 
          maxWidth: '650px', margin: '0 auto 40px', fontWeight: 500 
        }}>
          The ultimate workspace for your tasks, habits, goals, and schedules. Unified, intelligent, and beautifully designed.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
          <button 
            onClick={() => navigate('/signup')}
            className="btn-primary"
            style={{ 
              background: '#2563eb', color: '#fff', border: 'none', padding: '16px 36px', 
              borderRadius: '12px', fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: '0.2s'
            }}
          >
            Start your project
          </button>
          <button 
            style={{ 
              background: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', padding: '16px 36px', 
              borderRadius: '12px', fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: '0.2s'
            }}
          >
            Watch Demo
          </button>
        </div>

        {/* Dashboard Preview Image */}
        <div style={{ position: 'relative', marginTop: '40px' }} className="animate-fade-in">
          <div style={{ 
            background: 'linear-gradient(135deg, #2563eb10 0%, #3b82f610 100%)', 
            padding: '24px', borderRadius: '32px', border: '1px solid #f1f5f9'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1200" 
              alt="Dashboard Preview" 
              style={{ width: '100%', borderRadius: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', border: '1px solid #f1f5f9' }} 
            />
          </div>
          {/* Floating Widget 1 */}
          <div className="glass-card" style={{ 
            position: 'absolute', top: '10%', left: '-5%', width: '220px', 
            padding: '20px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', 
            textAlign: 'left' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={18} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>Task Done!</span>
            </div>
            <div style={{ height: '4px', background: '#dcfce7', borderRadius: '4px', width: '100%' }}>
              <div style={{ height: '100%', background: '#16a34a', borderRadius: '4px', width: '80%' }}></div>
            </div>
          </div>
          {/* Floating Widget 2 */}
          <div className="glass-card" style={{ 
            position: 'absolute', bottom: '15%', right: '-5%', width: '240px', 
            padding: '20px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', 
            textAlign: 'left' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={18} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>Urgent Task</span>
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Release design v2.0</div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ padding: '80px 48px', bg: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>Trusted by productivity hackers everywhere</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '64px', opacity: 0.5, filter: 'grayscale(1)', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>GITHUB</div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>NOTION</div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>VERCEL</div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>STRIPE</div>
        </div>
      </section>

      {/* CTA Footer */}
      <section style={{ padding: '120px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#1a1a1a', marginBottom: '24px' }}>Ready to take control?</h2>
        <button 
          onClick={() => navigate('/signup')}
          className="btn-hover"
          style={{ 
            background: '#2563eb', color: '#fff', border: 'none', padding: '18px 48px', 
            borderRadius: '12px', fontSize: '18px', fontWeight: 700, cursor: 'pointer', transition: '0.2s'
          }}
        >
          Sign up for free
        </button>
      </section>

      <footer style={{ padding: '60px 48px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <BrainCircuit size={14} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '16px' }}>Antigravity</span>
        </div>
        <div style={{ color: '#94a3b8', fontSize: '14px' }}>
          © 2026 Life Planner — 100% Precise UI Replication
        </div>
      </footer>
    </div>
  );
}
