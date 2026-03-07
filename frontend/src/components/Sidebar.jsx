import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, Clock, Map, Target, 
  CheckSquare, Flame, BarChart3, BrainCircuit,
  Settings, LogOut, Moon, Sun, Crown, HelpCircle,
  Briefcase, GraduationCap, ClipboardList
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

  const NavItem = ({ id, icon, label, count, highlight }) => (
    <button 
      onClick={() => onNavigate(id)}
      className={`sidebar-nav-item ${activeView === id ? 'active' : ''}`}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
        padding: '10px 12px', borderRadius: '10px', transition: 'all 0.2s',
        border: 'none', background: highlight
          ? '#2563eb'
          : activeView === id ? '#eff6ff' : 'transparent',
        cursor: 'pointer', textAlign: 'left', position: 'relative',
        marginBottom: '2px'
      }}
    >
      <div style={{ color: highlight ? '#fff' : activeView === id ? '#2563eb' : '#64748b' }}>{icon}</div>
      <span style={{ 
        fontSize: '14px', 
        fontWeight: highlight ? 700 : activeView === id ? 600 : 500, 
        color: highlight ? '#fff' : activeView === id ? '#1e293b' : '#64748b', 
        flex: 1 
      }}>{label}</span>
      {count > 0 && (
        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px', background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>{count}</span>
      )}
    </button>
  );

  return (
    <div className="sidebar" style={{ 
      width: '240px', height: '100vh', padding: '24px 16px', 
      borderRight: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', 
      gap: '24px', background: '#fff', overflowY: 'auto' 
    }}>
      
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px', marginBottom: '8px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <BrainCircuit size={20} />
        </div>
        <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px', color: '#1e293b' }}>Antigravity</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', paddingLeft: '12px' }}>Overview</div>
        <NavItem id="dashboard" label="Dashboard" icon={<LayoutDashboard size={18} />} />
        <NavItem id="calendar" label="Calendar" icon={<Calendar size={18} />} />
        <NavItem id="timeline" label="Timeline" icon={<Map size={18} />} />
        <NavItem id="goals" label="Goal Planner" icon={<Target size={18} />} />
        <NavItem id="tasks" label="Tasks" icon={<CheckSquare size={18} />} />
        <NavItem id="habits" label="Habits" icon={<Flame size={18} />} />
        <NavItem id="timer" label="Focus Timer" icon={<Clock size={18} />} />
        <NavItem id="analytics" label="Analytics" icon={<BarChart3 size={18} />} />
        <NavItem id="ai" label="AI Planner" icon={<BrainCircuit size={18} />} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', paddingLeft: '12px' }}>Planners</div>
        <NavItem id="school" label="School" icon={<GraduationCap size={18} />} count={taskCounts['school']} />
        <NavItem id="ug" label="UG Planner" icon={<Briefcase size={18} />} count={taskCounts['ug']} />
        <NavItem id="daily" label="Daily" icon={<ClipboardList size={18} />} count={taskCounts['daily']} />
        <NavItem id="office" label="Office" icon={<Briefcase size={18} />} count={taskCounts['office']} />
        <NavItem id="exam" label="Study/Exams" icon={<Flame size={18} />} count={taskCounts['exam']} />
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <NavItem id="pricing" label="Upgrade" icon={<Crown size={18} />} highlight />
        <NavItem id="settings" label="Settings" icon={<Settings size={18} />} />
        <NavItem id="help" label="Help & Support" icon={<HelpCircle size={18} />} />
        <div style={{ height: '1px', background: '#f1f5f9', margin: '12px 0' }}></div>
        <button 
          onClick={handleSignOut}
          style={{ 
            width: '100%', display: 'flex', alignItems: 'center', gap: '12px', 
            padding: '10px 12px', color: '#ef4444', fontSize: '14px', 
            fontWeight: 600, border: 'none', background: 'transparent', cursor: 'pointer' 
          }}
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>

    </div>
  );
}
