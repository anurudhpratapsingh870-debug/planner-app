import React from 'react';

const plannerMeta = {
  school: { icon: '🏫', label: 'School',  color: '#4f46e5' },
  ug:     { icon: '🎓', label: 'UG',      color: '#7c3aed' },
  exam:   { icon: '📝', label: 'Exam',    color: '#dc2626' },
  daily:  { icon: '📅', label: 'Daily',   color: '#0891b2' },
  office: { icon: '💼', label: 'Office',  color: '#059669' },
};

export default function Dashboard({ tasks, onNavigate }) {
  const plannerTypes = ['school', 'ug', 'exam', 'daily', 'office'];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const urgentTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'done');

  // Upcoming deadlines (next 3 days)
  const now = new Date();
  const threeDays = new Date(now.getTime() + 3 * 86400000);
  const upcoming = tasks
    .filter(t => t.deadline && new Date(t.deadline) <= threeDays && t.status !== 'done')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  return (
    <div className="page-content">
      {/* Overview Stats */}
      <div className="dashboard-grid">
        <div className="stat-card" style={{ '--card-accent': 'var(--accent-indigo)', '--icon-bg': 'rgba(99,102,241,0.12)' }}>
          <div className="card-header">
            <div className="card-icon">📋</div>
          </div>
          <div className="card-count">{totalTasks}</div>
          <div className="card-label">Total Tasks</div>
          <div className="card-bar">
            <div className="card-bar-fill" style={{ width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%' }}></div>
          </div>
        </div>

        <div className="stat-card" style={{ '--card-accent': 'var(--accent-emerald)', '--icon-bg': 'rgba(16,185,129,0.12)' }}>
          <div className="card-header">
            <div className="card-icon">✅</div>
          </div>
          <div className="card-count">{completedTasks}</div>
          <div className="card-label">Completed</div>
          <div className="card-bar">
            <div className="card-bar-fill" style={{ width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%', background: 'var(--accent-emerald)' }}></div>
          </div>
        </div>

        <div className="stat-card" style={{ '--card-accent': 'var(--accent-rose)', '--icon-bg': 'rgba(244,63,94,0.12)' }}>
          <div className="card-header">
            <div className="card-icon">🔴</div>
          </div>
          <div className="card-count">{urgentTasks.length}</div>
          <div className="card-label">Urgent Tasks</div>
        </div>

        <div className="stat-card" style={{ '--card-accent': 'var(--accent-amber)', '--icon-bg': 'rgba(245,158,11,0.12)' }}>
          <div className="card-header">
            <div className="card-icon">⏰</div>
          </div>
          <div className="card-count">{upcoming.length}</div>
          <div className="card-label">Due in 3 Days</div>
        </div>
      </div>

      {/* Planner Cards */}
      <div className="section-header">
        <h3>Your Planners</h3>
      </div>
      <div className="dashboard-grid">
        {plannerTypes.map(type => {
          const meta = plannerMeta[type];
          const plannerTasks = tasks.filter(t => t.planner === type);
          const done = plannerTasks.filter(t => t.status === 'done').length;
          return (
            <div
              key={type}
              className="stat-card"
              style={{ '--card-accent': meta.color, '--icon-bg': `${meta.color}20`, cursor: 'pointer' }}
              onClick={() => onNavigate(type)}
            >
              <div className="card-header">
                <div className="card-icon" style={{ background: `${meta.color}20` }}>{meta.icon}</div>
                <span className="status-badge" style={{ background: `${meta.color}15`, color: meta.color }}>
                  {plannerTasks.length} tasks
                </span>
              </div>
              <div className="card-count" style={{ fontSize: '24px' }}>{meta.label}</div>
              <div className="card-label">{done}/{plannerTasks.length} completed</div>
              <div className="card-bar">
                <div className="card-bar-fill" style={{ width: plannerTasks.length > 0 ? `${(done / plannerTasks.length) * 100}%` : '0%', background: meta.color }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Deadlines */}
      {upcoming.length > 0 && (
        <div style={{ marginTop: '28px' }}>
          <div className="section-header">
            <h3>⚡ Upcoming Deadlines</h3>
          </div>
          <div className="task-list">
            {upcoming.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-checkbox"></div>
                <div className="task-info">
                  <div className="task-title">{task.title}</div>
                  <div className="task-desc">{task.description}</div>
                </div>
                <div className="task-meta">
                  <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                  <span className="task-deadline">📅 {task.deadline}</span>
                  <span className={`tl-planner`} style={{ background: `${plannerMeta[task.planner]?.color}20`, color: plannerMeta[task.planner]?.color, fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '9999px' }}>
                    {plannerMeta[task.planner]?.icon} {task.planner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
