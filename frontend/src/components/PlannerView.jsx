import React from 'react';
import { Plus, Clock, Flag, Circle, CheckCircle2, MoreHorizontal, Calendar as CalIcon, BookOpen, Briefcase, GraduationCap, Users } from 'lucide-react';
import { format } from 'date-fns';

const plannerMeta = {
  school: { label: 'School Planner',  color: '#4f46e5', desc: 'Assignments & Classes', theme: 'indigo' },
  ug:     { label: 'UG Planner',      color: '#7c3aed', desc: 'Semester & Research', theme: 'violet' },
  daily:  { label: 'Daily Planner',   color: '#06b6d4', desc: 'Agendas & Time Blocks', theme: 'cyan' },
  office: { label: 'Office Planner',  color: '#10b981', desc: 'Meetings & Objectives', theme: 'emerald' },
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

  // --- Reusable Task Item Component ---
  const TaskListItem = ({ task }) => {
    const isDone = task.status === 'done';
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '16px 20px', borderRadius: '12px', transition: 'all 0.2s', opacity: isDone ? 0.6 : 1, marginBottom: '8px' }}>
        <div 
          onClick={() => onToggleTask(task.id, isDone ? 'pending' : 'done')}
          style={{ marginTop: '2px', cursor: 'pointer', color: isDone ? 'var(--success)' : 'var(--text-muted)' }}
        >
          {isDone ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </div>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: isDone ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: isDone ? 'line-through' : 'none', marginBottom: '4px' }}>
            {task.title}
          </div>
          {task.description && (
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.4 }}>
               {task.description}
            </div>
          )}
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', color: getPriorityColor(task.priority), background: `${getPriorityColor(task.priority)}15`, padding: '4px 8px', borderRadius: '6px' }}>
              <Flag size={12} /> {task.priority.toUpperCase()}
            </div>
            {task.deadline && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                <CalIcon size={14} /> {format(new Date(task.deadline), 'MMM d, yyyy')}
              </div>
            )}
          </div>
        </div>

        <button onClick={() => onDeleteTask(task.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}>
          <MoreHorizontal size={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="page-content" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', background: 'var(--bg-primary)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '36px', width: '64px', height: '64px', background: `${meta.color}15`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {meta.icon}
          </div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', margin: '0 0 4px 0' }}>{meta.label}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>{meta.desc}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '16px' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Progress</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{done.length} / {plannerTasks.length} Done</div>
          </div>
          <button 
            onClick={onAddTask}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', background: meta.color, color: '#fff', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer', boxShadow: `0 4px 12px ${meta.color}40`, transition: 'all 0.2s' }}
          >
            <Plus size={18} /> Add Task
          </button>
        </div>
      </div>

      {/* --- Specific Planner Layouts --- */}

      {/* 1. School Planner Layout */}
      {type === 'school' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '24px' }}>
           {/* Left Col: Class Schedule */}
           <div style={{ background: 'var(--bg-primary)', borderRadius: '20px', padding: '24px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <BookOpen size={20} color={meta.color} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Today's Classes</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['09:00 AM - Physics 101', '11:00 AM - Data Structures', '02:00 PM - Literature'].map((c, i) => (
                  <div key={i} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: `4px solid ${meta.color}` }}>
                     <div style={{ fontSize: '14px', fontWeight: 600 }}>{c.split(' - ')[1]}</div>
                     <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{c.split(' - ')[0]} • Room 30{i}</div>
                  </div>
                ))}
              </div>
           </div>
           
           {/* Right Col: Assignments List */}
           <div>
             <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Flag size={20} color="var(--primary)" /> Assignments & Tasks
             </h3>
             {plannerTasks.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No assignments yet. Enjoy your free time!</p> : plannerTasks.map(t => <TaskListItem key={t.id} task={t} />)}
           </div>
        </div>
      )}

      {/* 2. UG Planner Layout */}
      {type === 'ug' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Top: Semester Overview */}
          <div style={{ background: 'var(--bg-primary)', borderRadius: '20px', padding: '24px', border: '1px solid var(--border-color)', display: 'flex', gap: '32px', alignItems: 'center' }}>
             <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={32} color={meta.color} />
             </div>
             <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                   <span style={{ fontSize: '16px', fontWeight: 700 }}>Spring Semester 2026</span>
                   <span style={{ fontSize: '14px', fontWeight: 600, color: meta.color }}>Week 8 of 16</span>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                   <div style={{ width: '50%', height: '100%', background: meta.color, borderRadius: '4px' }}></div>
                </div>
             </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
             <div>
               <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Thesis / Projects</h3>
               {plannerTasks.filter(t => t.priority === 'high').map(t => <TaskListItem key={t.id} task={t} />)}
               {plannerTasks.filter(t => t.priority === 'high').length === 0 && <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No major projects currently.</div>}
             </div>
             <div>
               <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>General Coursework</h3>
               {plannerTasks.filter(t => t.priority !== 'high').map(t => <TaskListItem key={t.id} task={t} />)}
             </div>
          </div>
        </div>
      )}

      {/* 3. Daily Planner Layout */}
      {type === 'daily' && (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
          {/* Left: Time Blocks Visual */}
          <div style={{ background: 'var(--bg-primary)', borderRadius: '20px', padding: '24px', border: '1px solid var(--border-color)', alignSelf: 'start', position: 'sticky', top: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} color={meta.color}/> Daily Agenda</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '26px', top: '10px', bottom: '10px', width: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
              {['08:00 AM', '10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM'].map((time, i) => (
                <div key={time} style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', paddingTop: '4px', width: '60px', textAlign: 'right' }}>{time}</div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--bg-primary)', border: `2px solid ${i === 1 || i === 3 ? meta.color : 'var(--border-color)'}`, marginTop: '6px', flexShrink: 0 }}></div>
                  <div style={{ flex: 1, background: i === 1 || i === 3 ? `${meta.color}10` : 'transparent', border: i === 1 || i === 3 ? `1px solid ${meta.color}30` : 'none', padding: i === 1 || i === 3 ? '12px' : '0', borderRadius: '12px', minHeight: '32px' }}>
                    {i === 1 ? (
                      <div><div style={{ fontSize: '13px', fontWeight: 600, color: meta.color }}>Deep Work</div><div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Focus Session</div></div>
                    ) : i === 3 ? (
                      <div><div style={{ fontSize: '13px', fontWeight: 600, color: meta.color }}>Wrap Up</div></div>
                    ) : (
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', paddingTop: '4px' }}>Open</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: Task List */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Task Masterlist</h3>
            {plannerTasks.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>Clear schedule for today.</p> : plannerTasks.map(t => <TaskListItem key={t.id} task={t} />)}
          </div>
        </div>
      )}

      {/* 4. Office Planner Layout */}
      {type === 'office' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 1.5fr', gap: '24px' }}>
           {/* Left Col: Meetings & Objectives */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
             <div style={{ background: 'var(--bg-primary)', borderRadius: '20px', padding: '24px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={16} color={meta.color}/> Today's Meetings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                   {['10:00 AM - Design Sync', '01:30 PM - Client Call', '04:00 PM - Q2 Planning'].map((m) => (
                     <div key={m} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>{m.split('-')[1]}</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '12px' }}>{m.split('-')[0]}</span>
                     </div>
                   ))}
                </div>
             </div>
             <div style={{ background: meta.color, borderRadius: '20px', padding: '24px', color: '#fff', boxShadow: `0 8px 24px ${meta.color}40` }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={16}/> Weekly Objective</h3>
                <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.5 }}>Launch the new Dashboard UI components and ensure cross-platform responsiveness before friday.</p>
             </div>
           </div>
           
           {/* Right Col: Action Items */}
           <div style={{ background: 'var(--bg-primary)', borderRadius: '20px', padding: '24px', border: '1px solid var(--border-color)' }}>
             <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Action Items</h3>
             {plannerTasks.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>Inbox zero!</p> : plannerTasks.map(t => <TaskListItem key={t.id} task={t} />)}
           </div>
        </div>
      )}

    </div>
  );
}
