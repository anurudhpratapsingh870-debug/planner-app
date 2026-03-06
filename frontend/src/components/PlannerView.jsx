import React from 'react';

const plannerMeta = {
  school: { icon: '🏫', label: 'School Planner',  color: '#4f46e5', desc: 'Track assignments, homework, and school activities' },
  ug:     { icon: '🎓', label: 'UG Planner',      color: '#7c3aed', desc: 'Undergraduate coursework, projects, and research' },
  daily:  { icon: '📅', label: 'Daily Planner',   color: '#0891b2', desc: 'Day-to-day tasks and routines' },
  office: { icon: '💼', label: 'Office Planner',  color: '#059669', desc: 'Work tasks, meetings, and projects' },
};

export default function PlannerView({ type, tasks, onToggleTask, onDeleteTask, onAddTask }) {
  const meta = plannerMeta[type];
  if (!meta) return null;

  const plannerTasks = tasks.filter(t => t.planner === type);
  const pending = plannerTasks.filter(t => t.status !== 'done');
  const done = plannerTasks.filter(t => t.status === 'done');

  return (
    <div className="page-content">
      <div className="planner-header-card">
        <div className="planner-icon-large" style={{ background: `${meta.color}18` }}>
          {meta.icon}
        </div>
        <div className="planner-header-info">
          <h3>{meta.label}</h3>
          <p>{meta.desc}</p>
          <div style={{ marginTop: '8px', display: 'flex', gap: '12px', fontSize: '13px' }}>
            <span style={{ color: 'var(--accent-amber)' }}>⏳ {pending.length} pending</span>
            <span style={{ color: 'var(--accent-emerald)' }}>✅ {done.length} done</span>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h3>Tasks</h3>
        <button className="btn btn-primary btn-sm" onClick={onAddTask}>+ Add Task</button>
      </div>

      {plannerTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{meta.icon}</div>
          <h4>No tasks yet</h4>
          <p>Click "Add Task" to get started with your {meta.label.toLowerCase()}</p>
        </div>
      ) : (
        <div className="task-list">
          {plannerTasks.map(task => (
            <div key={task.id} className="task-item">
              <div
                className={`task-checkbox ${task.status === 'done' ? 'checked' : ''}`}
                onClick={() => onToggleTask(task.id, task.status === 'done' ? 'pending' : 'done')}
              ></div>
              <div className="task-info">
                <div className={`task-title ${task.status === 'done' ? 'completed' : ''}`}>{task.title}</div>
                {task.description && <div className="task-desc">{task.description}</div>}
              </div>
              <div className="task-meta">
                <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                {task.deadline && <span className="task-deadline">📅 {task.deadline}</span>}
                <span className={`status-badge status-${task.status === 'in-progress' ? 'in-progress' : task.status}`}>
                  {task.status}
                </span>
              </div>
              <button className="task-delete-btn" onClick={() => onDeleteTask(task.id)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
