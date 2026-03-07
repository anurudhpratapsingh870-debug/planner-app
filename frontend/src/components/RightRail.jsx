import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  isSameMonth, isSameDay, addDays, isToday, parseISO
} from 'date-fns';

const plannerColors = {
  school: '#4f46e5',
  ug:     '#7c3aed',
  exam:   '#ef4444',
  daily:  '#06b6d4',
  office: '#10b981',
};

export default function RightRail({ tasks = [] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // --- Calendar Logic ---
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      
      // Check if day has tasks
      const dayTasks = tasks.filter(t => t.deadline && isSameDay(parseISO(t.deadline), cloneDay));
      const hasTasks = dayTasks.length > 0;
      
      // Calculate dot colors for this day
      const dotColors = [...new Set(dayTasks.map(t => plannerColors[t.planner] || plannerColors.daily))].slice(0, 3);

      days.push(
        <div 
          className="calendar-cell"
          key={day.toString()}
          onClick={() => setSelectedDate(cloneDay)}
          style={{ 
            width: '32px', height: '32px', display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
            borderRadius: '50%', background: isSameDay(day, selectedDate) ? 'var(--primary)' : 'transparent',
            color: isSameDay(day, selectedDate) ? '#fff' : !isSameMonth(day, monthStart) ? 'var(--text-muted)' : 'var(--text-primary)',
            fontWeight: isSameDay(day, selectedDate) ? 700 : 500,
            transition: 'all 0.2s', position: 'relative'
          }}
        >
          <span>{formattedDate}</span>
          {hasTasks && !isSameDay(day, selectedDate) && (
            <div style={{ display: 'flex', gap: '2px', position: 'absolute', bottom: '2px' }}>
              {dotColors.map((color, i) => (
                <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: color }}></div>
              ))}
            </div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '8px', justifyItems: 'center' }} key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  // --- Selected Day Agenda ---
  const selectedDayTasks = tasks.filter(t => t.deadline && isSameDay(parseISO(t.deadline), selectedDate));

  return (
    <aside className="right-rail" style={{ width: '340px', background: 'var(--bg-primary)', borderLeft: '1px solid var(--border-color)', padding: '24px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      
      {/* Calendar Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} style={{ background: 'var(--bg-secondary)', border: 'none', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <ChevronLeft size={16} />
        </button>
        <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} style={{ background: 'var(--primary)', border: 'none', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Calendar Days of Week */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '16px', justifyItems: 'center' }}>
        {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(d => (
          <div key={d} style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', width: '32px', textAlign: 'center' }}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{ marginBottom: '32px' }}>
        {rows}
      </div>

      {/* Separation Line */}
      <div style={{ height: '1px', background: 'var(--border-color)', margin: '0 -24px 24px -24px' }}></div>

      {/* Daily Agenda */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Schedule ({format(selectedDate, 'MMM d')})</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
         {/* Timeline Bar Background */}
         <div style={{ position: 'absolute', left: '38px', top: '10px', bottom: '10px', width: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>

         {selectedDayTasks.length > 0 ? selectedDayTasks.map((task, idx) => {
            const dotColor = plannerColors[task.planner] || plannerColors.daily;
            // Mock time generation for UI flavor
            const hour = (9 + (idx * 2)) % 24; 
            const timeStr = `${hour.toString().padStart(2, '0')}:00`;
            
            return (
              <div key={task.id} style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1, alignItems: 'flex-start' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', width: '40px', marginTop: '12px' }}>{timeStr}</div>
                
                <div style={{ flex: 1, background: '#fff', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', padding: '16px', position: 'relative' }}>
                  {/* Timeline Node */}
                  <div style={{ position: 'absolute', left: '-18px', top: '16px', width: '10px', height: '10px', borderRadius: '50%', background: dotColor, border: '2px solid #fff', boxShadow: '0 0 0 1px var(--border-color)' }}></div>
                  
                  {/* Task Content */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{task.title}</div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><MoreHorizontal size={16}/></button>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{task.title}</div>
                </div>
              </div>
            );
         }) : (
           <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', padding: '20px 0', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
              No tasks scheduled for this day.
           </div>
         )}
      </div>

    </aside>
  );
}
