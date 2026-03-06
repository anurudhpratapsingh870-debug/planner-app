import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, Layout, Calendar as CalIcon } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#202020', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <div style={{ color: '#e44332' }}>
            {/* Simple Logo Icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px', color: '#e44332' }}>Life Planner</span>
        </div>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '20px', fontSize: 15, fontWeight: 500, color: '#5a5a5a' }}>
            <span style={{ cursor: 'pointer' }}>Features</span>
            <span style={{ cursor: 'pointer' }}>For Teams</span>
            <span style={{ cursor: 'pointer' }}>Resources</span>
            <span style={{ cursor: 'pointer' }}>Pricing</span>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e5e5e5' }}></div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer', fontSize: 15, fontWeight: 500 }} onClick={() => navigate('/login')}>Log in</span>
            <button 
              onClick={() => navigate('/signup')}
              style={{ background: '#e44332', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
            >
              Start for free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-2px', marginBottom: 24, lineHeight: 1.15, color: '#202020' }}>
          Clarity, finally.
        </h1>
        <p style={{ fontSize: 20, color: '#5a5a5a', maxWidth: 650, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Simplify life for both you and your goals. The world's #1 task manager and to-do list app designed for pure focus.
        </p>
        <button 
          onClick={() => navigate('/signup')}
          style={{ background: '#e44332', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: 18, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(228, 67, 50, 0.3)' }}
        >
          Start for free
        </button>

        {/* Fake UI mockup image representation */}
        <div style={{ marginTop: 60, position: 'relative' }}>
          <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 16, padding: 8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)', display: 'inline-block', width: '100%', maxWidth: 800, height: 450, overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: 8, display: 'flex' }}>
              <div style={{ width: '25%', background: '#fafafa', borderRight: '1px solid #f0f0f0', padding: 20, textAlign: 'left' }}>
                <div style={{ width: '60%', height: 12, background: '#e5e5e5', borderRadius: 4, marginBottom: 20 }}></div>
                <div style={{ width: '80%', height: 10, background: '#f0f0f0', borderRadius: 4, marginBottom: 12 }}></div>
                <div style={{ width: '70%', height: 10, background: '#f0f0f0', borderRadius: 4, marginBottom: 12 }}></div>
                <div style={{ width: '90%', height: 10, background: '#f0f0f0', borderRadius: 4, marginBottom: 12 }}></div>
              </div>
              <div style={{ flex: 1, padding: 30, textAlign: 'left' }}>
                <div style={{ width: '40%', height: 24, background: '#e5e5e5', borderRadius: 4, marginBottom: 30 }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #e5e5e5' }}></div>
                  <div style={{ flex: 1, height: 12, background: '#f5f5f5', borderRadius: 4 }}></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #e5e5e5' }}></div>
                  <div style={{ width: '60%', height: 12, background: '#f5f5f5', borderRadius: 4 }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div style={{ margin: '80px 0 60px' }}>
          <p style={{ fontSize: 13, textTransform: 'uppercase', fontWeight: 600, color: '#a0a0a0', letterSpacing: 1.5, marginBottom: 24 }}>30 million+ people and teams trust our planner</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, opacity: 0.5 }}>
            <span style={{ fontSize: 20, fontWeight: 800 }}>Microsoft</span>
            <span style={{ fontSize: 20, fontWeight: 800 }}>Disney</span>
            <span style={{ fontSize: 20, fontWeight: 800 }}>Amazon</span>
            <span style={{ fontSize: 20, fontWeight: 800 }}>Apple</span>
          </div>
        </div>
      </main>

      {/* Feature section left aligned */}
      <section style={{ maxWidth: 1000, margin: '80px auto', display: 'flex', alignItems: 'center', gap: 60, padding: '0 24px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 14, color: '#e44332', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Clear your mind</h2>
          <h3 style={{ fontSize: 40, fontWeight: 700, color: '#202020', marginBottom: 24, lineHeight: 1.15, letterSpacing: '-1px' }}>
            Capture tasks at the speed of thought
          </h3>
          <p style={{ fontSize: 18, color: '#5a5a5a', lineHeight: 1.6 }}>
            We’ve spent over a decade refining how you add tasks to your planner. Type exactly what's on your mind and watch it magically organize your life.
          </p>
        </div>
        <div style={{ flex: 1, height: 400, background: '#fafafa', borderRadius: 20, border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ padding: 20, background: '#fff', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '80%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CheckCircle2 size={24} color="#e5e5e5" />
              <span style={{ fontSize: 16, fontWeight: 500 }}>Review notes for final exam tomorrow @10am #school</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
