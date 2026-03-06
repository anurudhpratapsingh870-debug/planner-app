import React from 'react';

export default function ExamPlanner({ tasks, onToggleTask, onDeleteTask, onAddTask }) {
  const examTasks = tasks.filter(t => t.planner === 'exam');

  // Calculate days until deadline
  const getDaysLeft = (deadline) => {
    if (!deadline) return null;
    const diff = Math.ceil((new Date(deadline) - new Date()) / 86400000);
    return diff;
  };

  return (
    <div className="page-content">
      <div className="planner-header-card">
        <div className="planner-icon-large" style={{ background: 'rgba(220,38,38,0.12)' }}>📝</div>
        <div className="planner-header-info">
          <h3>Exam Planner</h3>
          <p>Exam schedules, study plans, and preparation tracking</p>
          <div style={{ marginTop: '8px', display: 'flex', gap: '12px', fontSize: '13px' }}>
            <span style={{ color: 'var(--accent-rose)' }}>📝 {examTasks.length} exams</span>
            <span style={{ color: 'var(--accent-emerald)' }}>✅ {examTasks.filter(t => t.status === 'done').length} prepared</span>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h3>📚 Exam Schedule</h3>
        <button className="btn btn-primary btn-sm" onClick={onAddTask}>+ Add Exam</button>
      </div>

      {examTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h4>No exams scheduled</h4>
          <p>Add your upcoming exams to start preparing!</p>
        </div>
      ) : (
        <div className="exam-grid">
          {examTasks.map(task => {
            const daysLeft = getDaysLeft(task.deadline);
            const urgencyColor = daysLeft !== null && daysLeft <= 3 ? 'var(--accent-rose)' : daysLeft !== null && daysLeft <= 7 ? 'var(--accent-amber)' : 'var(--accent-indigo)';
            return (
              <div key={task.id} className="exam-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="exam-subject">{task.title}</div>
                    <div className="exam-date">{task.description || 'No details added'}</div>
                  </div>
                  <button className="task-delete-btn" style={{ opacity: 1 }} onClick={() => onDeleteTask(task.id)}>✕</button>
                </div>
                {task.deadline && (
                  <div className="exam-countdown">
                    <span className="countdown-number" style={{ color: urgencyColor }}>
                      {daysLeft !== null ? (daysLeft > 0 ? daysLeft : '🔴') : '—'}
                    </span>
                    <div>
                      <div className="countdown-label" style={{ color: urgencyColor, fontWeight: 600 }}>
                        {daysLeft !== null ? (daysLeft > 0 ? 'days left' : 'Past due!') : ''}
                      </div>
                      <div className="countdown-label">📅 {task.deadline}</div>
                    </div>
                  </div>
                )}
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                  <span
                    className={`status-badge ${task.status === 'done' ? 'status-done' : 'status-pending'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onToggleTask(task.id, task.status === 'done' ? 'pending' : 'done')}
                  >
                    {task.status === 'done' ? '✅ Prepared' : '📖 Studying'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
