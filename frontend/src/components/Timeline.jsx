import React from 'react';

const plannerColors = {
  school: '#4f46e5',
  ug:     '#7c3aed',
  exam:   '#dc2626',
  daily:  '#0891b2',
  office: '#059669',
};

const plannerIcons = {
  school: '🏫',
  ug:     '🎓',
  exam:   '📝',
  daily:  '📅',
  office: '💼',
};

export default function Timeline({ tasks }) {
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  if (sortedTasks.length === 0) {
    return (
      <div className="page-content">
        <div className="empty-state">
          <div className="empty-icon">🕐</div>
          <h4>No events yet</h4>
          <p>Add tasks to your planners and they'll appear on your timeline</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="section-header" style={{ marginBottom: '28px' }}>
        <h3>📌 Your Life Timeline</h3>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{sortedTasks.length} events</span>
      </div>
      <div className="timeline-container">
        {sortedTasks.map(task => {
          const color = plannerColors[task.planner] || '#6366f1';
          return (
            <div key={task.id} className="timeline-item">
              <div className="timeline-dot" style={{ '--dot-color': color }}></div>
              <div className="timeline-card">
                <div className="tl-header">
                  <span className="tl-title">{task.title}</span>
                  <span className="tl-planner" style={{ background: `${color}20`, color }}>
                    {plannerIcons[task.planner]} {task.planner}
                  </span>
                </div>
                {task.description && <div className="tl-desc">{task.description}</div>}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="tl-date">📅 {task.deadline || 'No deadline'}</span>
                  <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                  <span className={`status-badge status-${task.status === 'in-progress' ? 'in-progress' : task.status}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
