import React from 'react';
import { Milestone, Flag, Star, Briefcase, GraduationCap, Trophy, ChevronRight } from 'lucide-react';

const plannerColors = {
  school: '#4f46e5',
  ug:     '#7c3aed',
  exam:   '#ef4444',
  daily:  '#06b6d4',
  office: '#10b981',
};

const MilestoneIcon = ({ type }) => {
  switch (type) {
    case 'school': return <GraduationCap size={16} />;
    case 'ug':     return <Star size={16} />;
    case 'office': return <Briefcase size={16} />;
    case 'exam':   return <Trophy size={16} />;
    default:       return <Milestone size={16} />;
  }
};

export default function Timeline({ tasks, onEditTask }) {
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div className="page-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', letterSpacing: '-1px', marginBottom: '8px' }}>Your Life Path</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Visualizing your journey from immediate tasks to long-term milestones.</p>
      </div>

      {sortedTasks.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '16px' }}>
          <Milestone size={48} style={{ opacity: 0.3, marginBottom: '16px', color: 'var(--primary)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>No timeline events yet. Add tasks with deadlines to populate your path.</p>
        </div>
      ) : (
        <div style={{ position: 'relative', paddingLeft: '32px' }}>
          {/* Central Line */}
          <div style={{ position: 'absolute', left: '7px', top: '0', bottom: '0', width: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {sortedTasks.map((task, index) => {
              const color = plannerColors[task.planner] || 'var(--primary)';
              const isPast = new Date(task.deadline) < new Date();

              return (
                <div key={task.id} style={{ position: 'relative', zIndex: 1 }}>
                  {/* Timeline Dot */}
                  <div style={{ 
                    position: 'absolute', left: '-32px', top: '6px', 
                    width: '16px', height: '16px', borderRadius: '50%', 
                    background: isPast ? 'var(--bg-secondary)' : color, 
                    border: `3px solid ${isPast ? 'var(--border-color)' : 'var(--bg-primary)'}`,
                    boxShadow: isPast ? 'none' : `0 0 0 4px ${color}20`
                  }}></div>

                  {/* Date Label */}
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending'}
                  </div>

                  {/* Event Card */}
                  <div style={{ 
                    background: 'var(--bg-primary)', border: '1px solid var(--border-color)', 
                    borderRadius: '12px', padding: '16px 20px', 
                    boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s',
                    cursor: 'pointer'
                  }} className="hover-lift" onClick={() => onEditTask && onEditTask(task)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ color: color }}><MilestoneIcon type={task.planner} /></div>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{task.title}</h4>
                      </div>
                      <ChevronRight size={16} color="var(--text-muted)" />
                    </div>
                    
                    {task.description && (
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                        {task.description}
                      </p>
                    )}

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: `${color}15`, color: color, textTransform: 'uppercase' }}>
                        {task.planner}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        {task.priority}
                      </span>
                    </div>
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
