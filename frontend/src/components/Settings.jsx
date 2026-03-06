import React from 'react';
import { User, Bell, Lock, Globe, Moon, Palette, Shield, LogOut } from 'lucide-react';

export default function Settings() {
  return (
    <div className="page-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', letterSpacing: '-1px', marginBottom: '8px' }}>Internal Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Configure your profile, theme preferences, and sync options.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Profile Section */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-muted)' }}>
            <User size={14} />
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account</span>
          </div>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', fontWeight: 700 }}>JD</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>John Doe</h3>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>john.doe@example.com · Premium Plan</p>
            </div>
            <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Edit Profile</button>
          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-muted)' }}>
            <Palette size={14} />
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferences</span>
          </div>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden' }}>
            {[
              { icon: <Moon size={18} />, label: 'Dark Mode', desc: 'Sleek dark interface for night planning', toggle: true },
              { icon: <Bell size={18} />, label: 'Notifications', desc: 'Browser and email reminders for tasks', toggle: true },
              { icon: <Globe size={18} />, label: 'Language', desc: 'English (US)', value: 'Change' },
              { icon: <Shield size={18} />, label: 'Privacy', desc: 'Manage your data and visibility', value: 'Configure' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: i === 3 ? 'none' : '1px solid var(--border-color)', cursor: 'pointer' }} className="hover-bg">
                <div style={{ color: 'var(--text-secondary)' }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.desc}</div>
                </div>
                {item.toggle ? (
                   <div style={{ width: '40px', height: '22px', background: i === 0 ? 'var(--primary)' : 'var(--bg-secondary)', borderRadius: '11px', position: 'relative', border: '1px solid var(--border-color)' }}>
                     <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: i === 0 ? '20px' : '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'left 0.2s' }}></div>
                   </div>
                ) : (
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Security Section */}
        <section>
           <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '16px', borderRadius: '12px', border: '1px solid var(--danger)', background: 'transparent', color: 'var(--danger)', fontWeight: 600, cursor: 'pointer' }}>
             <LogOut size={18} /> Sign Out of All Devices
           </button>
        </section>

      </div>

    </div>
  );
}
