import React, { useState } from 'react';
import { X, Calendar as CalIcon, Flag, Briefcase, GraduationCap, ClipboardList, Target, Flame } from 'lucide-react';

export default function TaskModal({ onClose, onSave, onDelete, initialPlanner, editingTask }) {
  const [form, setForm] = useState(editingTask ? {
    title: editingTask.title || '',
    description: editingTask.description || '',
    deadline: editingTask.deadline ? editingTask.deadline.split('T')[0] : '', // format for date input
    priority: editingTask.priority || 'medium',
    status: editingTask.status || 'pending',
    planner: editingTask.planner || initialPlanner || 'daily'
  } : {
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    status: 'pending',
    planner: initialPlanner || 'daily',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
    onClose();
  };

  const plannerIcons = {
    school: <GraduationCap size={16} />,
    ug:     <Target size={16} />,
    exam:   <Flame size={16} />,
    daily:  <ClipboardList size={16} />,
    office: <Briefcase size={16} />,
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ width: '560px', background: 'var(--bg-primary)', borderRadius: '20px', padding: '32px', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)', animation: 'slideUp 0.3s ease-out' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Task Title (e.g., Study PostgreSQL index)"
              autoFocus
              style={{ width: '100%', padding: '12px 16px', fontSize: '18px', fontWeight: 600, border: 'none', background: 'var(--bg-secondary)', borderRadius: '12px', outline: 'none', color: 'var(--text-primary)' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Add details or notes..."
              style={{ width: '100%', minHeight: '100px', padding: '16px', fontSize: '15px', border: 'none', background: 'var(--bg-secondary)', borderRadius: '12px', outline: 'none', color: 'var(--text-primary)', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
            
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Deadline</label>
              <div style={{ position: 'relative' }}>
                <CalIcon size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
                <input
                  type="date"
                  value={form.deadline}
                  onChange={e => setForm({ ...form, deadline: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px 10px 40px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Priority</label>
              <div style={{ position: 'relative' }}>
                <Flag size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: form.priority === 'high' ? 'var(--danger)' : 'var(--text-secondary)' }} />
                <select 
                  value={form.priority} 
                  onChange={e => setForm({ ...form, priority: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px 10px 40px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px', outline: 'none', appearance: 'none' }}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Planner Module</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--primary)' }}>
                   {plannerIcons[form.planner] || <ClipboardList size={16} />}
                </div>
                <select 
                  value={form.planner} 
                  onChange={e => setForm({ ...form, planner: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px 10px 40px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px', outline: 'none', appearance: 'none' }}
                >
                  <option value="school">School Planner</option>
                  <option value="ug">UG Planner</option>
                  <option value="exam">Exam Planner</option>
                  <option value="daily">Daily Planner</option>
                  <option value="office">Office Planner</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Initial Status</label>
              <select 
                value={form.status} 
                onChange={e => setForm({ ...form, status: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Completed</option>
              </select>
            </div>

          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            {editingTask ? (
              <button type="button" onClick={() => { onDelete(editingTask.id); onClose(); }} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#fee2e2', fontWeight: 600, color: '#dc2626', cursor: 'pointer' }}>Delete</button>
            ) : <div></div>}
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={onClose} style={{ padding: '10px 24px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ padding: '10px 32px', borderRadius: '8px', border: 'none', background: 'var(--primary)', fontWeight: 700, color: '#fff', cursor: 'pointer', boxShadow: 'var(--shadow-md)' }}>{editingTask ? 'Save Changes' : 'Save Task'}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
