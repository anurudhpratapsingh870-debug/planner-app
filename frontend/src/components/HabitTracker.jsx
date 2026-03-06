import React from 'react';
import { Flame, Medal, Calendar as CalIcon, Settings, Plus } from 'lucide-react';

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HabitTracker({ habits, onToggleDay }) {
  const getStreak = (completedDays) => {
    let streak = 0;
    for (let i = 7; i >= 1; i--) {
      if (completedDays.includes(i)) streak++;
      else break;
    }
    return Math.max(streak, 0); // avoid negative
  };

  return (
    <div className="page-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', color: 'var(--accent-amber)' }}>
              <Flame size={28} />
            </div>
            <h1 style={{ fontSize: '32px', letterSpacing: '-1px', margin: 0 }}>Habit Tracker</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Build consistency. Track intense streaks and weekly heatmaps.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
            <Settings size={16} /> Manage
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', background: 'var(--primary)', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
            <Plus size={16} /> New Habit
          </button>
        </div>
      </div>

      {habits.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '16px', background: 'var(--bg-primary)' }}>
          <Flame size={48} style={{ opacity: 0.3, marginBottom: '16px', display: 'inline-block', color: 'var(--accent-amber)' }} />
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No habits yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Start building better routines today!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {habits.map(habit => {
            const streak = getStreak(habit.completedDays);
            const progress = Math.round((habit.completedDays.length / 7) * 100);
            
            return (
              <div key={habit.id} style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', display: 'flex', gap: '32px', alignItems: 'center', transition: 'box-shadow 0.2s', boxShadow: 'var(--shadow-sm)' }}>
                
                {/* Info & Streak */}
                <div style={{ width: '240px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${habit.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      {habit.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{habit.name}</h3>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <Medal size={14} color={streak > 0 ? 'var(--accent-amber)' : 'var(--text-muted)'} />
                        <span style={{ fontWeight: streak > 0 ? 600 : 400, color: streak > 0 ? 'var(--accent-amber)' : 'inherit' }}>
                          {streak > 0 ? `${streak} Day Streak!` : 'No streak'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ flex: 1, height: '6px', background: 'var(--bg-glass)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${progress}%`, background: habit.color, borderRadius: '999px', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', width: '30px' }}>{progress}%</span>
                  </div>
                </div>

                {/* Tracking Grid Heatmap */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: '16px 24px', borderRadius: '12px' }}>
                  {dayLabels.map((day, idx) => {
                    const dayNum = idx + 1;
                    const isCompleted = habit.completedDays.includes(dayNum);
                    return (
                      <div key={dayNum} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{day}</span>
                        <div
                          onClick={() => onToggleDay(habit.id, dayNum)}
                          style={{ 
                            width: '36px', height: '36px', borderRadius: '10px', 
                            background: isCompleted ? habit.color : 'var(--bg-primary)', 
                            border: `2px solid ${isCompleted ? habit.color : 'var(--border-color)'}`,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s', boxShadow: isCompleted ? `0 4px 12px ${habit.color}40` : 'none',
                            color: isCompleted ? '#ffffff' : 'transparent',
                            transform: 'translateY(0)'
                          }}
                          className="hover-bg"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
