import React from 'react';

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HabitTracker({ habits, onToggleDay }) {
  const getStreak = (completedDays) => {
    let streak = 0;
    for (let i = 7; i >= 1; i--) {
      if (completedDays.includes(i)) streak++;
      else break;
    }
    return streak;
  };

  if (habits.length === 0) {
    return (
      <div className="page-content">
        <div className="section-header"><h3>🔥 Habit Tracker</h3></div>
        <div className="empty-state">
          <div className="empty-icon">🔥</div>
          <h4>No habits yet</h4>
          <p>Start building better habits!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <h3>🔥 Habit Tracker</h3>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>This week</span>
      </div>

      <div className="habits-grid">
        {habits.map(habit => {
          const streak = getStreak(habit.completedDays);
          const progress = Math.round((habit.completedDays.length / 7) * 100);
          return (
            <div key={habit.id} className="habit-card">
              <div className="habit-header">
                <div className="habit-icon" style={{ background: `${habit.color}20` }}>{habit.icon}</div>
                <div>
                  <div className="habit-name">{habit.name}</div>
                  <div className="habit-streak">
                    {streak > 0 ? `🔥 ${streak} day streak` : '💪 Start your streak!'}
                    {' • '}
                    {progress}% this week
                  </div>
                </div>
              </div>
              <div className="habit-days">
                {dayLabels.map((day, idx) => {
                  const dayNum = idx + 1;
                  const isCompleted = habit.completedDays.includes(dayNum);
                  return (
                    <div
                      key={dayNum}
                      className={`habit-day ${isCompleted ? 'completed' : ''}`}
                      style={isCompleted ? { background: habit.color, borderColor: 'transparent' } : {}}
                      onClick={() => onToggleDay(habit.id, dayNum)}
                      title={`${day} - Click to toggle`}
                    >
                      {isCompleted ? '✓' : day.charAt(0)}
                    </div>
                  );
                })}
              </div>
              {/* Progress bar */}
              <div style={{ marginTop: '14px', height: '4px', background: 'var(--bg-glass)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: habit.color, borderRadius: '9999px', transition: 'width 0.4s ease' }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
