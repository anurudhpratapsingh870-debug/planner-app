import React from 'react';
import { Plus, Clock, Flag, Circle, CheckCircle2, MoreHorizontal, Calendar as CalIcon } from 'lucide-react';

const plannerMeta = {
  school: { icon: '🏫', label: 'School Planner',  color: '#4f46e5', desc: 'Track assignments, homework, and school activities' },
  ug:     { icon: '🎓', label: 'UG Planner',      color: '#7c3aed', desc: 'Undergraduate coursework, projects, and research' },
  daily:  { icon: '📅', label: 'Daily Planner',   color: '#06b6d4', desc: 'Day-to-day tasks, time blocks and routines' },
  office: { icon: '💼', label: 'Office Planner',  color: '#10b981', desc: 'Work tasks, meetings, and projects' },
};

export default function PlannerView({ type, tasks, onToggleTask, onDeleteTask, onAddTask }) {
  const meta = plannerMeta[type];
  if (!meta) return null;

  const plannerTasks = tasks.filter(t => t.planner === type);
  const pending = plannerTasks.filter(t => t.status !== 'done');
  const done = plannerTasks.filter(t => t.status === 'done');

  const getPriorityColor = (p) => {
    if (p === 'high') return 'var(--danger)';
    if (p === 'medium') return 'var(--accent-amber)';
    return 'var(--success)';
  };

  return (
    <div className="page-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ fontSize: '28px', padding: '8px', background: `${meta.color}15`, borderRadius: '12px' }}>
              {meta.icon}
            </div>
            <h1 style={{ fontSize: '32px', letterSpacing: '-1px', margin: 0 }}>{meta.label}</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>{meta.desc}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--primary)', marginRight: '8px' }}>{pending.length} pending</span>
            <span style={{ color: 'var(--success)' }}>{done.length} done</span>
          </div>
          <button 
            onClick={onAddTask}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', background: 'var(--primary)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
          >
            <Plus size={16} /> New Task
          </button>
        </div>
      </div>

      {plannerTasks.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '16px', background: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>{meta.icon}</div>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>It's quiet here...</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Add your first task to start organizing your {meta.label.toLowerCase()}</p>
          <button 
            onClick={onAddTask}
            style={{ padding: '10px 24px', borderRadius: '8px', background: 'var(--primary)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
          >
            Add Task
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: type === 'daily' ? '1fr 2fr' : '1fr', gap: '24px' }}>
          
          {/* Daily Planner specifics: Timeblock visual */}
          {type === 'daily' && (
            <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', height: 'fit-content' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <Clock size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Time Blocks</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '26px', top: '10px', bottom: '10px', width: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
                
                {['08:00 AM', '10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM'].map((time, i) => (
                  <div key={time} style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', paddingTop: '4px', width: '60px', textAlign: 'right' }}>{time}</div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--bg-primary)', border: `2px solid ${i === 1 ? 'var(--primary)' : 'var(--border-color)'}`, marginTop: '6px', flexShrink: 0 }}></div>
                    <div style={{ flex: 1, background: i === 1 ? 'var(--bg-card-hover)' : 'transparent', border: i === 1 ? '1px solid var(--border-color)' : 'none', padding: i === 1 ? '12px' : '0', borderRadius: '8px', minHeight: '32px' }}>
                      {i === 1 ? (
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 500 }}>Deep Work Session</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Focus on highly cognitive tasks</div>
                        </div>
                      ) : (
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', paddingTop: '4px' }}>Unscheduled</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Task List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>All Tasks</h3>
            {plannerTasks.map(task => {
              const isDone = task.status === 'done';
              return (
                <div key={task.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '16px 20px', borderRadius: '12px', transition: 'all 0.2s', opacity: isDone ? 0.6 : 1 }}>
                  <div 
                    onClick={() => onToggleTask(task.id, isDone ? 'pending' : 'done')}
                    style={{ marginTop: '2px', cursor: 'pointer', color: isDone ? 'var(--success)' : 'var(--text-muted)' }}
                  >
                    {isDone ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '16px', fontWeight: 500, color: isDone ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: isDone ? 'line-through' : 'none', marginBottom: '4px' }}>
                      {task.title}
                    </div>
                    {task.description && (
                      <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.4 }}>
                        {task.description}
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: getPriorityColor(task.priority), background: `${getPriorityColor(task.priority)}15`, padding: '4px 8px', borderRadius: '6px' }}>
                        <Flag size={12} /> {task.priority.toUpperCase()}
                      </div>
                      
                      {task.deadline && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                          <CalIcon size={14} /> {new Date(task.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <button onClick={() => onDeleteTask(task.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', borderRadius: '4px' }} className="hover-bg">
                      <MoreHorizontal size={20} />
                    </button>
                    {/* In a real app, this would open a dropdown. For now, we'll keep the quick delete accessible on hover via css or just map it to the button */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
