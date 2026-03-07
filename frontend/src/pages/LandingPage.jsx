import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, Layout, Calendar as CalIcon, ArrowRight, Zap, Target, BarChart3, Globe, Shield, Users, Smartphone } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Fade-in logic using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fff', 
      color: '#202020', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      overflowX: 'hidden'
    }}>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .wavy-bg {
          background: linear-gradient(180deg, rgba(255,107,95,0.03) 0%, rgba(255,255,255,0) 100%);
          border-radius: 50% 50% 0 0 / 10% 10% 0 0;
        }
        .btn-hover:hover {
          filter: brightness(0.9);
          transform: scale(1.02);
        }
      `}</style>

      {/* Navigation */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', padding: '12px 40px', alignItems: 'center', 
        maxWidth: 1400, margin: '0 auto', background: scrollY > 20 ? 'rgba(255,255,255,0.9)' : 'transparent',
        backdropFilter: scrollY > 20 ? 'blur(10px)' : 'none',
        position: 'sticky', top: 0, zIndex: 1000, transition: 'all 0.3s'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ color: '#E44332' }}><Layout size={28} strokeWidth={3} /></div>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#E44332' }}>Life Planner</span>
        </div>
        
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '24px', fontSize: 15, fontWeight: 500, color: '#666' }}>
            <span>Features</span>
            <span>For Teams</span>
            <span>Resources</span>
            <span>Pricing</span>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e5e5e5' }}></div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer', fontSize: 15, fontWeight: 500 }} onClick={() => navigate('/login')}>Log in</span>
            <button 
              onClick={() => navigate('/signup')}
              className="btn-hover"
              style={{ background: '#E44332', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '5px', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: '0.2s' }}
            >
              Start for free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Left Aligned Text, Right Aligned App Preview */}
      <section style={{ 
        maxWidth: 1200, margin: '0 auto', padding: '120px 40px 80px', 
        display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' 
      }}>
        <div style={{ flex: '1 1 500px' }}>
          <h1 style={{ 
            fontSize: 'clamp(48px, 6vw, 76px)', fontWeight: 800, lineHeight: 1.05, 
            letterSpacing: '-0.04em', margin: '0 0 24px', color: '#1a1a1a' 
          }}>
            Clarity, finally.
          </h1>
          <p style={{ fontSize: 22, color: '#555', marginBottom: 40, lineHeight: 1.5, maxWidth: 500 }}>
            Simplify life for both you and your goals. The world’s #1 task manager and to-do list app.
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="btn-hover"
            style={{ 
              background: '#E44332', color: '#fff', border: 'none', padding: '14px 28px', 
              borderRadius: '8px', fontSize: 18, fontWeight: 700, cursor: 'pointer', transition: '0.2s'
            }}
          >
            Start for free
          </button>
          <p style={{ marginTop: 20, fontSize: 14, color: '#999' }}>Available on Web, iOS, and Android.</p>
        </div>
        
        {/* Hero Illustration Mockup */}
        <div style={{ flex: '1 1 500px', position: 'relative' }}>
          <div style={{ 
            background: 'rgba(255,107,95,0.05)', borderRadius: '30px', padding: '40px',
            boxShadow: '0 40px 80px rgba(0,0,0,0.05)', animation: 'float 8s ease-in-out infinite' 
          }}>
            <img 
              src="https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&q=80&w=1000" 
              alt="UI Preview" 
              style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
            />
          </div>
          {/* Floating Mobile Mockup */}
          <div style={{ 
            position: 'absolute', bottom: '-40px', right: '-20px', width: '240px',
            background: '#fff', borderRadius: '24px', padding: '10px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)', animation: 'float 6s ease-in-out infinite reverse'
          }}>
             <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400" 
              alt="Mobile" 
              style={{ width: '100%', borderRadius: '18px' }} 
            />
          </div>
        </div>
      </section>

      {/* Wavy Feature Ribbon (The "Carousel") */}
      <div style={{ 
        margin: '100px 0', overflow: 'hidden', padding: '40px 0',
        background: 'linear-gradient(5deg, rgba(255,255,255,1) 0%, rgba(255,107,95,0.03) 50%, rgba(255,255,255,1) 100%)',
        position: 'relative'
      }}>
        <div style={{ 
          display: 'flex', width: '200%', animation: 'marquee 30s linear infinite',
          fontSize: '18px', fontWeight: 600, color: '#e44332', gap: '80px', opacity: 0.6
        }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <CheckCircle2 size={24} /> <span>30 Million+ Users Trust Us</span>
              <Sparkles size={24} /> <span>Built for Peak Performance</span>
              <Globe size={24} /> <span>Local to Global Sync</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alternating Feature Sections */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
        
        {/* Section 1: Capture */}
        <div className="scroll-reveal" style={{ display: 'flex', alignItems: 'center', gap: '100px', marginBottom: '150px', flexWrap: 'wrap-reverse' }}>
          <div style={{ flex: '1 1 450px' }}>
            <img 
              src="https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800" 
              alt="Feature 1" 
              style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }} 
            />
          </div>
          <div style={{ flex: '1 1 450px' }}>
            <h4 style={{ color: '#E44332', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>Workflow</h4>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Capture tasks at the speed of thought</h2>
            <p style={{ fontSize: 18, color: '#666', lineHeight: 1.6 }}>
              Capture and organize tasks the moment they pop into your head. 
              Use powerful natural language processing to set smart deadlines and reminders instantly.
            </p>
          </div>
        </div>

        {/* Section 2: Organize */}
        <div className="scroll-reveal" style={{ display: 'flex', alignItems: 'center', gap: '100px', marginBottom: '150px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h4 style={{ color: '#E44332', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>Organization</h4>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>Stay organized and focused</h2>
            <p style={{ fontSize: 18, color: '#666', lineHeight: 1.6 }}>
              Group your tasks into projects, tags, and sections. 
              Stay on top of your priorities with custom filters and smart views that show only what you need.
            </p>
          </div>
          <div style={{ flex: '1 1 450px', background: 'rgba(67,97,238,0.03)', borderRadius: '30px', padding: '30px' }}>
             <img 
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800" 
              alt="Feature 2" 
              style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }} 
            />
          </div>
        </div>

      </div>

      {/* Footer / CTA Section */}
      <section style={{ 
        background: 'linear-gradient(180deg, #fff 0%, #E4433205 100%)', 
        padding: '120px 40px', textAlign: 'center' 
      }}>
        <div className="scroll-reveal">
          <h2 style={{ fontSize: 48, fontWeight: 800, marginBottom: 24 }}>Ready to gain clarity?</h2>
          <button 
            onClick={() => navigate('/signup')}
            className="btn-hover"
            style={{ 
              background: '#E44332', color: '#fff', border: 'none', padding: '16px 36px', 
              borderRadius: '8px', fontSize: 18, fontWeight: 700, cursor: 'pointer', transition: '0.2s'
            }}
          >
            Get Started Now — It's Free
          </button>
          <div style={{ marginTop: 60, display: 'flex', justifyContent: 'center', gap: '60px', borderTop: '1px solid #eee', paddingTop: '60px' }}>
             <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Features</div>
                <div style={{ fontSize: 14, color: '#666', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span>How it works</span>
                  <span>Templates</span>
                  <span>Integrations</span>
                </div>
             </div>
             <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Company</div>
                <div style={{ fontSize: 14, color: '#666', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span>About Us</span>
                  <span>Careers</span>
                  <span>Blog</span>
                </div>
             </div>
             <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Social</div>
                <div style={{ fontSize: 14, color: '#666', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span>Twitter</span>
                  <span>Instagram</span>
                  <span>Community</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '40px', textAlign: 'center', fontSize: 12, color: '#999', borderTop: '1px solid #f9f9f9' }}>
        © 2026 Life Planner. All rights reserved. Built with precision.
      </footer>
    </div>
  );
}
