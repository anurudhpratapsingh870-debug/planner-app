import React, { useState } from 'react';

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Calendar({ tasks }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Start from Monday
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const daysInMonth = lastDay.getDate();
  const today = new Date();

  // Build calendar days
  const calendarDays = [];
  // Previous month filler
  const prevMonthLast = new Date(year, month, 0).getDate();
  for (let i = startOffset - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthLast - i, otherMonth: true });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const hasTasks = tasks.some(t => t.deadline === dateStr);
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
    calendarDays.push({ day: d, otherMonth: false, hasTasks, isToday, dateStr });
  }
  // Next month filler
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, otherMonth: true });
  }

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Tasks for the selected month
  const monthTasks = tasks.filter(t => {
    if (!t.deadline) return false;
    const d = new Date(t.deadline);
    return d.getFullYear() === year && d.getMonth() === month;
  }).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div className="page-content">
      <div className="calendar-widget" style={{ maxWidth: '500px' }}>
        <div className="calendar-header">
          <h4>{monthNames[month]} {year}</h4>
          <div className="calendar-nav">
            <button onClick={goToPrevMonth}>‹</button>
            <button onClick={goToNextMonth}>›</button>
          </div>
        </div>
        <div className="calendar-grid">
          {dayNames.map(d => (
            <div key={d} className="calendar-day-label">{d}</div>
          ))}
          {calendarDays.map((cd, i) => (
            <div
              key={i}
              className={`calendar-day ${cd.isToday ? 'today' : ''} ${cd.hasTasks ? 'has-tasks' : ''} ${cd.otherMonth ? 'other-month' : ''}`}
            >
              {cd.day}
            </div>
          ))}
        </div>
      </div>

      {/* Month's tasks */}
      {monthTasks.length > 0 && (
        <div style={{ marginTop: '28px' }}>
          <div className="section-header">
            <h3>📅 Events this month</h3>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{monthTasks.length} tasks</span>
          </div>
          <div className="task-list">
            {monthTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-info">
                  <div className="task-title">{task.title}</div>
                  <div className="task-desc">{task.description}</div>
                </div>
                <div className="task-meta">
                  <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                  <span className="task-deadline">📅 {task.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
