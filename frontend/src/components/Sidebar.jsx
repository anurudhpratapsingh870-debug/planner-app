import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, ClipboardList, Target, 
  BarChart3, BrainCircuit, Settings, LogOut, Flame,
  Briefcase, GraduationCap, Map, Moon, Sun
} from 'lucide-react';

export default function Sidebar({ activeView, onNavigate, taskCounts }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const NavItem = ({ id, icon, label, count }) => (
    <button 
      onClick={() => onNavigate(id)}
      className={`sidebar-nav-item ${activeView === id ? 'active' : ''}`}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
        padding: '10px 12px', borderRadius: '10px', transition: 'all 0.2s',
        border: 'none', background: activeView === id ? 'rgba(255, 107, 95, 0.1)' : 'transparent',
        cursor: 'pointer', textAlign: 'left', position: 'relative'
      }}
    >
      <div style={{ color: activeView === id ? 'var(--primary)' : 'var(--text-muted)' }}>{icon}</div>
      <span style={{ fontSize: '14px', fontWeight: activeView === id ? 600 : 500, color: activeView === id ? 'var(--text-primary)' : 'var(--text-secondary)', flex: 1 }}>{label}</span>
      {count > 0 && (
        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px', background: 'var(--bg-glass)', color: 'var(--text-muted)' }}>{count}</span>
      )}
      {activeView === id && (
        <div style={{ position: 'absolute', left: '-12px', top: '15%', bottom: '15%', width: '4px', background: 'var(--primary)', borderRadius: '0 4px 4px 0' }}></div>
      )}
    </button>
  );

  return (
    <div className="sidebar" style={{ width: '280px', height: '100vh', padding: '32px 24px', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '32px', background: 'var(--bg-primary)', overflowY: 'auto' }}>
      
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <BrainCircuit size={20} />
        </div>
        <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-1px' }}>Antigravity</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', paddingLeft: '8px' }}>Overview</div>
        <NavItem id="dashboard" label="Dashboard" icon={<LayoutDashboard size={18} />} />
        <NavItem id="calendar" label="Calendar" icon={<Calendar size={18} />} />
        <NavItem id="timeline" label="Timeline" icon={<Map size={18} />} />
        <NavItem id="goals" label="Goal Planner" icon={<Target size={18} />} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', paddingLeft: '8px' }}>Planners</div>
        <NavItem id="school" label="School" icon={<GraduationCap size={18} />} count={taskCounts['school']} />
        <NavItem id="ug" label="UG Planner" icon={<Briefcase size={18} />} count={taskCounts['ug']} />
        <NavItem id="daily" label="Daily" icon={<ClipboardList size={18} />} count={taskCounts['daily']} />
        <NavItem id="office" label="Office" icon={<Briefcase size={18} />} count={taskCounts['office']} />
        <NavItem id="exam" label="Study/Exams" icon={<Flame size={18} />} count={taskCounts['exam']} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', paddingLeft: '8px' }}>Trackers & AI</div>
        <NavItem id="habits" label="Habits" icon={<Flame size={18} />} />
        <NavItem id="ai" label="AI Assistant" icon={<BrainCircuit size={18} />} />
        <NavItem id="analytics" label="Analytics" icon={<BarChart3 size={18} />} />
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button 
          onClick={toggleTheme}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600, border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
        </button>
        <NavItem id="settings" label="Settings" icon={<Settings size={18} />} />
        <button 
          onClick={handleSignOut}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: 'var(--danger)', fontSize: '14px', fontWeight: 600, border: 'none', background: 'transparent', cursor: 'pointer' }}
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>

    </div>
  );
}
