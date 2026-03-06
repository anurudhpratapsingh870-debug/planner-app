import React, { useState } from 'react';
import { BookOpen, FileUp, Sparkles, BrainCircuit, Calendar as CalIcon, Clock, MoreVertical, Plus } from 'lucide-react';

export default function ExamPlanner({ tasks, onToggleTask, onDeleteTask, onAddTask }) {
  const examTasks = tasks.filter(t => t.planner === 'exam');
  const [showAIModal, setShowAIModal] = useState(false);

  // Calculate days until deadline
  const getDaysLeft = (deadline) => {
    if (!deadline) return null;
    const diff = Math.ceil((new Date(deadline) - new Date()) / 86400000);
    return diff;
  };

  return (
    <div className="page-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', color: 'var(--danger)' }}>
              <BookOpen size={24} />
            </div>
            <h1 style={{ fontSize: '32px', letterSpacing: '-1px', margin: 0 }}>Study & Exam Planner</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Track syllabus, plan revision cycles, and let AI build your study schedule.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
            <FileUp size={16} /> Import Syllabus
          </button>
          <button 
            onClick={() => setShowAIModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid rgba(255, 107, 95, 0.3)', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
          >
            <Sparkles size={16} /> Generate AI Plan
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Subject Cards */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Active Subjects</h3>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={onAddTask}>
              <Plus size={16} /> Add Subject
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {examTasks.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '12px', color: 'var(--text-muted)' }}>
                <BookOpen size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                <p>No exams currently mapped. Add a subject to start.</p>
              </div>
            ) : (
              examTasks.map(task => {
                const daysLeft = getDaysLeft(task.deadline);
                const isUrgent = daysLeft !== null && daysLeft <= 7;
                
                return (
                  <div key={task.id} style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>{task.title}</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{task.description || 'General studies'}</p>
                      </div>
                      <MoreVertical size={20} color="var(--text-muted)" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <CalIcon size={16} color={isUrgent ? 'var(--danger)' : 'var(--text-muted)'} />
                        <span style={{ fontWeight: isUrgent ? 600 : 400, color: isUrgent ? 'var(--danger)' : 'inherit' }}>
                          {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Unscheduled'}
                          {daysLeft !== null && ` (${daysLeft > 0 ? daysLeft + ' days left' : 'Past due'})`}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <Clock size={16} />
                        <span>Syllabus: 40% covered</span>
                      </div>
                    </div>
                    
                    {/* Fake progress bar */}
                    <div style={{ width: '100%', height: '6px', background: 'var(--bg-glass)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '40%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Revision Cycles UI */}
        <div>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', position: 'sticky', top: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <BrainCircuit size={20} color="var(--accent-blue)" />
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Spaced Repetition</h3>
            </div>
            
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
              Your upcoming revision cycles based on the forgetting curve memory model.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'var(--bg-glass)', borderRadius: '8px', borderLeft: '3px solid var(--danger)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--danger)', marginBottom: '4px' }}>DUE TODAY</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>Cell Biology (Phase 2)</div>
              </div>
              <div style={{ padding: '12px', background: 'var(--bg-glass)', borderRadius: '8px', borderLeft: '3px solid var(--accent-amber)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-amber)', marginBottom: '4px' }}>TOMORROW</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>World War II (Phase 1)</div>
              </div>
              <div style={{ padding: '12px', background: 'var(--bg-glass)', borderRadius: '8px', borderLeft: '3px solid var(--success)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--success)', marginBottom: '4px' }}>IN 3 DAYS</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>Calculus Integration (Phase 4)</div>
              </div>
            </div>

            {/* Fake Chart Illustration */}
            <div style={{ marginTop: '24px', padding: '16px 0', borderTop: '1px solid var(--border-color)' }}>
               <svg viewBox="0 0 200 60" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                  {/* Grid lines */}
                  <line x1="0" y1="50" x2="200" y2="50" stroke="var(--border-color)" strokeWidth="1" />
                  {/* Forgetting curves */}
                  <path d="M0 10 Q 30 50, 80 50" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="4" />
                  <path d="M30 10 Q 70 45, 140 50" fill="none" stroke="var(--accent-blue)" strokeWidth="2" opacity="0.6" />
                  <path d="M70 10 Q 120 40, 200 45" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
                  {/* Points */}
                  <circle cx="0" cy="10" r="3" fill="var(--text-muted)" />
                  <circle cx="30" cy="10" r="3" fill="var(--accent-blue)" />
                  <circle cx="70" cy="10" r="3" fill="var(--primary)" />
               </svg>
               <div style={{ display: 'flex', justifyContent: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>Memory Retention Graph</div>
            </div>
          </div>
        </div>

      </div>

      {/* AI Generate Plan Modal UI Mockup */}
      {showAIModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'var(--bg-primary)', width: '500px', borderRadius: '16px', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '8px', background: 'rgba(255, 107, 95, 0.1)', borderRadius: '50%', color: 'var(--primary)' }}>
                <Sparkles size={24} />
              </div>
              <h2 style={{ fontSize: '24px', margin: 0 }}>AI Study Blueprint</h2>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Describe your exam, current level, and target score. AI will map out a day-by-day plan using spaced repetition.</p>
            
            <textarea 
              placeholder="e.g. I have a Biology final in 3 weeks. I am weak on Genetics but strong in Ecology..."
              style={{ width: '100%', height: '120px', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical', outline: 'none', marginBottom: '24px' }}
            ></textarea>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAIModal(false)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: '#fff', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} /> Generate Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
