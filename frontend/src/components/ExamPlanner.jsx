import React, { useState, useEffect } from 'react';
import { BookOpen, FileUp, Sparkles, BrainCircuit, Calendar as CalIcon, Clock, MoreVertical, Plus, ChevronRight } from 'lucide-react';

export default function ExamPlanner({ tasks, onToggleTask, onDeleteTask, onAddTask }) {
  const examTasks = tasks.filter(t => t.planner === 'exam');
  const [showAIModal, setShowAIModal] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // For live countdown effects
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculate days until deadline
  const getDaysLeft = (deadline) => {
    if (!deadline) return null;
    const diff = Math.ceil((new Date(deadline) - now) / 86400000);
    return diff;
  };

  return (
    <div className="page-content" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', background: 'var(--bg-primary)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '36px', width: '64px', height: '64px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)' }}>
            <BookOpen size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', margin: '0 0 4px 0' }}>Study & Exam Planner</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>Map syllabus coverage, countdown to finals, and plan revision logic.</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <FileUp size={16} /> Import Syllabus
          </button>
          <button 
            onClick={() => setShowAIModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'var(--danger)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            <Sparkles size={16} /> Auto-Generate Schedule
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Subject Cards */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Upcoming Exams</h3>
            <button style={{ background: 'none', border: 'none', color: 'var(--danger)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={onAddTask}>
              <Plus size={16} /> Track New Subject
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {examTasks.length === 0 ? (
              <div style={{ padding: '60px 40px', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '20px', background: 'var(--bg-primary)', color: 'var(--text-muted)' }}>
                <BookOpen size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                <p>No exams currently mapped. Add a subject to start studying.</p>
              </div>
            ) : (
              examTasks.map(task => {
                const daysLeft = getDaysLeft(task.deadline);
                const isUrgent = daysLeft !== null && daysLeft <= 14;
                const statusColor = isUrgent ? 'var(--danger)' : 'var(--primary)';
                const bgLight = isUrgent ? 'rgba(239, 68, 68, 0.05)' : 'var(--bg-primary)';
                
                // Mock syllabus progress based on title length for visual variation
                const syllabusCoverage = Math.max(10, Math.min(90, task.title.length * 5));

                return (
                  <div key={task.id} style={{ background: bgLight, border: `1px solid ${isUrgent ? 'rgba(239, 68, 68, 0.2)' : 'var(--border-color)'}`, borderRadius: '20px', padding: '24px', transition: 'box-shadow 0.2s', position: 'relative', overflow: 'hidden' }}>
                    {isUrgent && <div style={{ position: 'absolute', top: 0, right: 0, padding: '4px 12px', background: 'var(--danger)', color: '#fff', fontSize: '11px', fontWeight: 700, borderBottomLeftRadius: '12px' }}>CRITICAL</div>}
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                      <div>
                        <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>{task.title}</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>{task.description || 'General studies and revision'}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '28px', fontWeight: 800, color: statusColor, lineHeight: 1 }}>{daysLeft !== null ? daysLeft : '--'}</div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Days Left</div>
                      </div>
                    </div>

                    <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                         <span>Syllabus Coverage</span>
                         <span style={{ color: statusColor }}>{syllabusCoverage}%</span>
                       </div>
                       <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                         <div style={{ width: `${syllabusCoverage}%`, height: '100%', background: statusColor, borderRadius: '4px' }}></div>
                       </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Revision Cycles UI */}
        <div>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px', position: 'sticky', top: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <BrainCircuit size={20} color="var(--accent-blue)" />
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Spaced Repetition</h3>
            </div>
            
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
              Your immediate revision load based on memory curves.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '4px solid var(--danger)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--danger)', marginBottom: '4px' }}>DUE TODAY</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>Cell Biology (Phase 2)</div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '4px solid var(--accent-amber)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '4px' }}>TOMORROW</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>World War II (Phase 1)</div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '4px solid var(--success)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--success)', marginBottom: '4px' }}>IN 3 DAYS</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>Calculus Integration (Phase 4)</div>
              </div>
            </div>

            {/* Premium Chart Illustration */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
               <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Retention Forecast</h4>
               <svg viewBox="0 0 200 80" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                  {/* Grid lines */}
                  <line x1="0" y1="70" x2="200" y2="70" stroke="var(--border-color)" strokeWidth="1" />
                  <line x1="0" y1="40" x2="200" y2="40" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="2" />
                  {/* Forgetting curves */}
                  <path d="M0 10 Q 30 70, 80 70" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="4" />
                  <path d="M30 10 Q 70 60, 140 70" fill="none" stroke="var(--accent-blue)" strokeWidth="2" opacity="0.6" />
                  <path d="M70 10 Q 120 40, 200 45" fill="none" stroke="var(--primary)" strokeWidth="3" />
                  {/* Points & Connectors */}
                  <line x1="30" y1="10" x2="30" y2="70" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="2" />
                  <line x1="70" y1="10" x2="70" y2="70" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="2" />
                  <circle cx="0" cy="10" r="4" fill="var(--bg-primary)" stroke="var(--text-muted)" strokeWidth="2" />
                  <circle cx="30" cy="10" r="4" fill="var(--bg-primary)" stroke="var(--accent-blue)" strokeWidth="2" />
                  <circle cx="70" cy="10" r="5" fill="#fff" stroke="var(--primary)" strokeWidth="2" />
               </svg>
            </div>
          </div>
        </div>

      </div>

      {/* AI Generate Plan Modal UI Mockup */}
      {showAIModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'var(--bg-primary)', width: '500px', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', color: 'var(--danger)' }}>
                <Sparkles size={24} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>AI Study Blueprint</h2>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>Describe your exam, current level, and target score. AI will map out a day-by-day plan using science-backed spaced repetition.</p>
            
            <textarea 
              placeholder="e.g. I have a Biology final in 3 weeks. I am weak on Genetics but strong in Ecology..."
              style={{ width: '100%', height: '140px', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '15px', fontFamily: 'inherit', resize: 'vertical', outline: 'none', marginBottom: '24px' }}
            ></textarea>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAIModal(false)} style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: 'var(--danger)', color: '#fff', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} /> Generate Matrix
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
