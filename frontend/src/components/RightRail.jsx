import React from 'react';
import { Bot, Sparkles, CalendarDays } from 'lucide-react';

export default function RightRail() {
  return (
    <aside className="right-rail" style={{ width: '300px', background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px', overflowY: 'auto' }}>
      
      {/* Mini Calendar Preview */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <CalendarDays size={18} color="var(--text-secondary)" />
          <h4 style={{ fontSize: '13px', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Up Next</h4>
        </div>
        
        <div style={{ padding: '16px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          {/* Mock mini calendar data */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Today</span>
            <span style={{ fontSize: '12px', color: 'var(--accent-indigo)', fontWeight: 600 }}>3 events</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)' }}></div>
              Morning Review (10:00 AM)
            </div>
            <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)' }}></div>
              Team Sync (2:00 PM)
            </div>
            <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-color)' }}></div>
              Workout (6:00 PM)
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions Panel */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Bot size={18} color="var(--text-secondary)" />
          <h4 style={{ fontSize: '13px', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>AI Assistant</h4>
        </div>
        
        <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          <div style={{ background: 'var(--gradient-primary)', padding: '16px', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={16} />
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Smart Suggestions</span>
            </div>
            <p style={{ fontSize: '13px', opacity: 0.9 }}>Looks like you have a free block at 3 PM. Want me to schedule some study time?</p>
          </div>
          <div style={{ padding: '12px', display: 'flex', gap: '8px', background: 'var(--bg-card)' }}>
            <button style={{ flex: 1, padding: '8px', background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--text-primary)' }}>Dismiss</button>
            <button style={{ flex: 1, padding: '8px', background: 'rgba(255, 107, 95, 0.1)', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--accent-indigo)' }}>Schedule It</button>
          </div>
        </div>
        
        <button style={{ width: '100%', padding: '12px', background: 'var(--bg-primary)', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', cursor: 'pointer', marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
          Ask AI to generate a plan
        </button>
      </div>
      
    </aside>
  );
}
