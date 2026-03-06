import React from 'react';
import { LayoutDashboard, CheckCircle2, Clock, AlertCircle, CalendarDays, Plus } from 'lucide-react';

const plannerMeta = {
  school: { icon: '🏫', label: 'School',  color: '#4f46e5' },
  ug:     { icon: '🎓', label: 'UG',      color: '#7c3aed' },
  exam:   { icon: '📝', label: 'Exam',    color: '#ef4444' }, /* matched to danger */
  daily:  { icon: '📅', label: 'Daily',   color: '#06b6d4' },
  office: { icon: '💼', label: 'Office',  color: '#10b981' }, /* matched to success */
};

export default function Dashboard({ tasks, onNavigate }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const urgentTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'done');
  
  // Today's tasks
  const today = tasks.filter(t => t.status !== 'done').slice(0, 4);

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header / Quick Add */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', letterSpacing: '-1px', marginBottom: '8px', color: 'var(--text-primary)' }}>Good morning</h1>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>You have {totalTasks - completedTasks} active tasks across all planners.</p>
        </div>
      </div>

      {/* Overview Stats (Progress Widgets) */}
      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,107,95,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <LayoutDashboard size={20} />
            </div>
            <h3 style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Total Tasks</h3>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1 }}>{totalTasks}</div>
        </div>

        <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
              <CheckCircle2 size={20} />
            </div>
            <h3 style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Completed</h3>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1 }}>{completedTasks}</div>
        </div>

        <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)' }}>
              <AlertCircle size={20} />
            </div>
            <h3 style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Urgent</h3>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1 }}>{urgentTasks.length}</div>
        </div>
      </div>

      {/* Today Card (Task List) */}
      <div style={{ background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarDays size={18} color="var(--primary)" />
            <span style={{ fontSize: '16px', fontWeight: 600 }}>Today's Tasks</span>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
            View all
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {today.length > 0 ? today.map(task => (
            <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background 0.2s' }} className="task-row">
              <div style={{ width: '20px', height: '20px', borderRadius: '6px', border: '2px solid var(--text-muted)', cursor: 'pointer', flexShrink: 0 }}></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>{task.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}><Clock size={14} /> {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No date'}</span>
                  <span style={{ background: `${plannerMeta[task.planner]?.color}15`, color: plannerMeta[task.planner]?.color, padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>{plannerMeta[task.planner]?.label}</span>
                </div>
              </div>
            </div>
          )) : (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ fontSize: '16px', fontWeight: 500 }}>All caught up!</h3>
              <p style={{ fontSize: '14px', marginTop: '4px' }}>No active tasks for today.</p>
            </div>
          )}
        </div>
        <div style={{ padding: '16px 24px', background: 'var(--surface)' }}>
          <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', background: 'transparent', border: '1px dashed var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        </div>
      </div>
      
    </div>
  );
}
