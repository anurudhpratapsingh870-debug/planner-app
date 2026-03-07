import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus } from 'lucide-react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  isSameMonth, isSameDay, addDays, isToday, parseISO
} from 'date-fns';

export default function RightRail({ tasks = [], onEditTask, onAddEvent }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // --- Calendar Logic ---
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const isSelected = isSameDay(day, selectedDate);
      const isCurrentMonth = isSameMonth(day, monthStart);
      
      days.push(
        <div 
          key={day.toString()}
          onClick={() => setSelectedDate(cloneDay)}
          style={{ 
            width: '32px', height: '32px', display: 'flex', 
            justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
            borderRadius: '50%', 
            background: isSelected ? '#2563eb' : 'transparent',
            color: isSelected ? '#fff' : !isCurrentMonth ? '#cbd5e1' : '#1e293b',
            fontWeight: isSelected ? 700 : 500,
            fontSize: '13px',
            transition: 'all 0.2s', position: 'relative'
          }}
        >
          {format(day, 'd')}
          {isToday(day) && !isSelected && (
            <div style={{ position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '50%', background: '#2563eb' }}></div>
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

  // Agenda
  const selectedDayTasks = tasks.filter(t => t.deadline && isSameDay(parseISO(t.deadline), selectedDate));

  return (
    <aside className="right-rail" style={{ 
      width: '340px', background: '#fff', borderLeft: '1px solid #f1f5f9', 
      padding: '32px 24px', display: 'flex', flexDirection: 'column', 
      overflowY: 'auto' 
    }}>
      
      {/* Calendar Section */}
      <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #f1f5f9', marginBottom: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>{format(currentMonth, 'MMMM yyyy')}</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><ChevronLeft size={18} /></button>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><ChevronRight size={18} /></button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '16px', justifyItems: 'center' }}>
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
            <div key={d} style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', width: '32px', textAlign: 'center' }}>{d}</div>
          ))}
        </div>

        <div>{rows}</div>
      </div>

      {/* Schedule Section */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>Schedule — {format(selectedDate, 'MMM d')}</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { time: '9:00 AM', title: 'Design Review', color: '#ef4444' },
            { time: '11:30 AM', title: 'Study Session', color: '#3b82f6' },
            { time: '2:00 PM', title: 'Team Meeting', color: '#10b981' },
            { time: '4:30 PM', title: 'Gym', color: '#8b5cf6' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '80px', flexShrink: 0 }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>{item.time}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{item.title}</div>
            </div>
          ))}

          <button 
            onClick={onAddEvent}
            style={{ 
              marginTop: '12px', width: '100%', padding: '12px', 
              borderRadius: '12px', border: '1px solid #f1f5f9', 
              background: '#fff', color: '#2563eb', fontSize: '14px', 
              fontWeight: 700, display: 'flex', alignItems: 'center', 
              justifyContent: 'center', gap: '8px', cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
            }}
          >
            <Plus size={18} /> Add Event
          </button>
        </div>
      </div>

    </aside>
  );
}
