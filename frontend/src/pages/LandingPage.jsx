import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, Layout, Calendar as CalIcon, ArrowRight, Zap, Target, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fff', 
      color: '#1a1a1a', 
      fontFamily: '"Outfit", "Inter", sans-serif',
      overflowX: 'hidden'
    }}>
      
      {/* Dynamic Background Accents */}
      <div style={{ 
        position: 'fixed', top: '-10%', right: '-5%', width: '40vw', height: '40vw', 
        background: 'radial-gradient(circle, rgba(255,107,95,0.08) 0%, rgba(255,255,255,0) 70%)',
        zIndex: 0, pointerEvents: 'none' 
      }}></div>
      <div style={{ 
        position: 'fixed', bottom: '-10%', left: '-5%', width: '30vw', height: '30vw', 
        background: 'radial-gradient(circle, rgba(67,97,238,0.05) 0%, rgba(255,255,255,0) 70%)',
        zIndex: 0, pointerEvents: 'none' 
      }}></div>

      {/* Injecting CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes shine {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }
        .fade-in { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .float { animation: float 6s ease-in-out infinite; }
        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after {
          content: '';
          position: absolute;
          top: -50%; left: -100%; width: 100%; height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: rotate(35deg);
          animation: shine 4s infinite;
        }
      `}</style>

      {/* Top Navbar */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', padding: '24px 40px', alignItems: 'center', 
        maxWidth: 1300, margin: '0 auto', position: 'relative', zIndex: 10 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ 
            background: 'linear-gradient(135deg, #FF6B5F 0%, #E44332 100%)', 
            padding: '8px', borderRadius: '10px', color: '#fff',
            boxShadow: '0 4px 12px rgba(228, 67, 50, 0.2)'
          }}>
            <Layout size={24} strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.8px', color: '#1a1a1a' }}>Antigravity<span style={{color: '#E44332'}}>Planner</span></span>
        </div>
        
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ display: 'none', lg: 'flex', gap: '28px', fontSize: 15, fontWeight: 600, color: '#666' }}>
            <span style={{ cursor: 'pointer', transition: '0.2s color' }}>Features</span>
            <span style={{ cursor: 'pointer' }}>Pricing</span>
            <span style={{ cursor: 'pointer' }}>Showcase</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              onClick={() => navigate('/login')}
              style={{ background: 'transparent', border: 'none', padding: '10px 20px', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#1a1a1a' }}
            >
              Log in
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="btn btn-shine"
              style={{ 
                background: '#1a1a1a', color: '#fff', border: 'none', padding: '12px 24px', 
                borderRadius: '12px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                transition: 'transform 0.2s', boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Get Started — Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="fade-in" style={{ animationDelay: '0.1s' }}>
          <span style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            padding: '8px 16px', background: 'rgba(228,67,50,0.08)', 
            borderRadius: '100px', color: '#E44332', fontSize: '13px', 
            fontWeight: 700, marginBottom: '24px', letterSpacing: '0.5px' 
          }}>
            <Sparkles size={14} /> NEW: AI-POWERED PRODUCTIVITY TOOLS
          </span>
        </div>

        <h1 className="fade-in" style={{ 
          fontSize: 'clamp(48px, 8vw, 84px)', fontWeight: 900, letterSpacing: '-0.04em', 
          marginBottom: 24, lineHeight: 0.95, color: '#1a1a1a', animationDelay: '0.2s' 
        }}>
          One tool for <br />
          <span style={{ 
            background: 'linear-gradient(90deg, #FF6B5F, #E44332)', 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' 
          }}>pure productivity.</span>
        </h1>

        <p className="fade-in" style={{ 
          fontSize: 'clamp(18px, 2vw, 22px)', color: '#666', maxWidth: 700, 
          margin: '0 auto 48px', lineHeight: 1.5, fontWeight: 500, animationDelay: '0.3s' 
        }}>
          The ultimate workspace for your life. Break down goals, track habits, 
          and manage your timeline with a professional dashboard designed for high-performance minds.
        </p>

        <div className="fade-in" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', animationDelay: '0.4s' }}>
          <button 
            onClick={() => navigate('/signup')}
            className="btn-shine"
            style={{ 
              background: '#E44332', color: '#fff', border: 'none', padding: '20px 48px', 
              borderRadius: '16px', fontSize: 18, fontWeight: 800, cursor: 'pointer',
              boxShadow: '0 20px 40px rgba(228, 67, 50, 0.25)', transition: 'all 0.3s'
            }}
          >
            Create Your Planner 
          </button>
          <button 
            style={{ 
              background: '#fff', color: '#1a1a1a', border: '2px solid #f0f0f0', padding: '20px 32px', 
              borderRadius: '16px', fontSize: 18, fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '12px'
            }}
            onMouseEnter={(e) => e.target.style.background = '#fafafa'}
            onMouseLeave={(e) => e.target.style.background = '#fff'}
          >
            Watch Demo <ArrowRight size={20} />
          </button>
        </div>

        {/* Professional UI Mockup (Premium CSS-based) */}
        <div className="fade-in float" style={{ marginTop: 100, position: 'relative', animationDelay: '0.6s' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,240,240,0.5))', 
            backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.8)', 
            borderRadius: '32px', padding: '16px', 
            boxShadow: '0 40px 100px rgba(0,0,0,0.12)', 
            display: 'inline-block', width: '100%', maxWidth: '1000px',
            position: 'relative'
          }}>
            {/* Toolbar mockup */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', padding: '0 8px' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }}></div>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }}></div>
            </div>
            
            <div style={{ 
              background: '#fff', borderRadius: '20px', display: 'flex', 
              height: 550, overflow: 'hidden', textAlign: 'left',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)' 
            }}>
              {/* Sidebar Mockup */}
              <div style={{ width: '220px', background: '#f8f9fa', padding: '24px', borderRight: '1px solid #f0f0f0' }}>
                <div style={{ width: '100%', height: 32, background: '#eee', borderRadius: 8, marginBottom: 32 }}></div>
                {[60, 80, 70, 90, 65].map((w, i) => (
                    <div key={i} style={{ width: `${w}%`, height: 10, background: '#f0f0f0', borderRadius: 4, marginBottom: 20 }}></div>
                ))}
              </div>
              {/* Content Mockup */}
              <div style={{ flex: 1, padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                    <div style={{ width: '40%', height: 32, background: '#f0f0f0', borderRadius: 8 }}></div>
                    <div style={{ width: '100px', height: 32, background: '#E44332', borderRadius: 8, opacity: 0.1 }}></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ background: '#fafafa', height: 200, borderRadius: 16, border: '1px solid #f0f0f0', padding: 20 }}>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
                            <Zap size={18} color="#E44332" /> <div style={{ width: 80, height: 10, background: '#eee', borderRadius: 5, marginTop: 4 }}></div>
                        </div>
                        <div style={{ width: '100%', height: 10, background: '#eee', borderRadius: 5, marginBottom: 10 }}></div>
                        <div style={{ width: '80%', height: 10, background: '#eee', borderRadius: 5, marginBottom: 10 }}></div>
                    </div>
                    <div style={{ background: '#fafafa', height: 200, borderRadius: 16, border: '1px solid #f0f0f0', padding: 20 }}>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
                            <BarChart3 size={18} color="#4361EE" /> <div style={{ width: 80, height: 10, background: '#eee', borderRadius: 5, marginTop: 4 }}></div>
                        </div>
                        <div style={{ width: '100%', height: 10, background: '#eee', borderRadius: 5, marginBottom: 10 }}></div>
                        <div style={{ width: '60%', height: 10, background: '#eee', borderRadius: 5, marginBottom: 10 }}></div>
                    </div>
                </div>
              </div>
            </div>
            
            {/* Floating Badges */}
            <div style={{ 
                position: 'absolute', top: '-20px', right: '-30px', background: '#fff', 
                padding: '16px 24px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700 
            }}>
                <CheckCircle2 color="#27c93f" /> <span>Done: Exam Prep</span>
            </div>
            <div style={{ 
                position: 'absolute', bottom: '40px', left: '-50px', background: '#FF6B5F', color: '#fff',
                padding: '16px', borderRadius: '50%', boxShadow: '0 20px 40px rgba(228,67,50,0.3)',
                width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
                <Sparkles />
            </div>
          </div>
        </div>

        {/* Features Minimalist */}
        <div style={{ marginTop: 150, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', padding: '0 24px' }}>
            <div className="fade-in" style={{ animationDelay: '0.7s', textAlign: 'left' }}>
                <div style={{ color: '#E44332', marginBottom: 16 }}><Target size={32} /></div>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Precision Planning</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>Define macro-goals and watch them get sliced into manageable daily habits automatically.</p>
            </div>
            <div className="fade-in" style={{ animationDelay: '0.8s', textAlign: 'left' }}>
                <div style={{ color: '#4361EE', marginBottom: 16 }}><BarChart3 size={32} /></div>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Deep Analytics</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>Understand where your time goes with beautiful, interactive charts and focus metrics.</p>
            </div>
            <div className="fade-in" style={{ animationDelay: '0.9s', textAlign: 'left' }}>
                <div style={{ color: '#FFBD2E', marginBottom: 16 }}><Zap size={32} /></div>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Sync Anywhere</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>Your life doesn't stop. Access your planner on any device with instant cloud synchronization.</p>
            </div>
        </div>

        {/* Git Timing Tip Section */}
        <div className="fade-in" style={{ 
            marginTop: 150, padding: 40, background: '#f8f9fa', borderRadius: 32, 
            textAlign: 'left', border: '1px solid #f0f0f0', animationDelay: '1s' 
        }}>
            <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Developer Insights</h4>
            <p style={{ color: '#666', marginBottom: 24 }}>You can monitor your <b>git push</b> health by checking the terminal output. Want to see exactly how long it takes? Try this command:</p>
            <code style={{ background: '#1a1a1a', color: '#fff', padding: '12px 20px', borderRadius: '12px', display: 'block', fontSize: 14 }}>
               Measure-Command { "{" } git push { "}" }
            </code>
            <p style={{ marginTop: 24, fontSize: 13, color: '#999' }}>* This works on Windows PowerShell. It will show you exactly how many seconds your push takes from start to finish.</p>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #f0f0f0', padding: '60px 24px', textAlign: 'center', marginTop: 100 }}>
          <p style={{ color: '#999', fontSize: 14 }}>© 2026 Antigravity Planner. All rights reserved.</p>
      </footer>
    </div>
  );
}
