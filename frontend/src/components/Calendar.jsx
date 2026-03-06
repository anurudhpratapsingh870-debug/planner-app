import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Clock } from 'lucide-react';

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
    <div className="page-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', letterSpacing: '-1px', marginBottom: '8px' }}>Global Calendar</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Manage all your tasks and milestones in one unified view.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '8px' }}>
          <button style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', fontSize: '13px', fontWeight: 600 }}>Month</button>
          <button style={{ padding: '6px 12px', borderRadius: '6px', background: 'transparent', border: 'none', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Week</button>
          <button style={{ padding: '6px 12px', borderRadius: '6px', background: 'transparent', border: 'none', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Day</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Calendar Grid */}
        <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{monthNames[month]} {year}</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={goToPrevMonth} style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer' }}><ChevronLeft size={18} /></button>
              <button onClick={goToNextMonth} style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer' }}><ChevronRight size={18} /></button>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {dayNames.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>{d}</div>
            ))}
            {calendarDays.map((cd, i) => (
              <div
                key={i}
                style={{ 
                  aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', borderRadius: '8px', cursor: 'pointer', position: 'relative',
                  color: cd.otherMonth ? 'var(--text-muted)' : 'var(--text-primary)',
                  background: cd.isToday ? 'rgba(255, 107, 95, 0.1)' : 'transparent',
                  fontWeight: cd.isToday ? 700 : 400,
                  opacity: cd.otherMonth ? 0.3 : 1
                }}
                className="calendar-day-hover"
              >
                {cd.day}
                {cd.hasTasks && (
                  <div style={{ position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                )}
                {cd.isToday && (
                  <div style={{ position: 'absolute', top: '4px', right: '4px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Month Events */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalIcon size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{monthNames[month]} Schedule</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {monthTasks.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No events scheduled for this month.</p>
              </div>
            ) : (
              monthTasks.map(task => (
                <div key={task.id} style={{ padding: '16px', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{task.title}</h4>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>{task.priority}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {new Date(task.deadline).toLocaleDateString()}</div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>{task.planner}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
