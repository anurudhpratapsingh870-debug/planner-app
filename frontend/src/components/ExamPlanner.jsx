import React, { useState, useEffect } from 'react';
import { BookOpen, FileUp, Sparkles, BrainCircuit, Calendar as CalIcon, Clock, MoreVertical, Plus, ChevronRight, CheckSquare, Circle } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function ExamPlanner({ tasks, onToggleTask, onDeleteTask, onAddTask, onEditTask, onReorderTasks }) {
  const examTasks = tasks.filter(t => t.planner === 'exam');
  const [showAIModal, setShowAIModal] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getDaysLeft = (deadline) => {
    if (!deadline) return null;
    const diff = Math.ceil((new Date(deadline) - now) / 86400000);
    return diff;
  };

  const onDragEnd = (result) => {
    if (Capacitor.isNativePlatform()) {
      Haptics.impact({ style: ImpactStyle.Medium });
    }

    if (!result.destination) return;
    const items = Array.from(tasks);
    const affectedTasks = tasks.filter(t => t.planner === 'exam');
    const [reorderedItem] = affectedTasks.splice(result.source.index, 1);
    affectedTasks.splice(result.destination.index, 0, reorderedItem);
    
    const newTasks = tasks.map(t => {
      if (t.planner === 'exam') {
        return affectedTasks.shift();
      }
      return t;
    });
    onReorderTasks(newTasks);
  };

  return (
    <div className="page-content" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '36px', width: '64px', height: '64px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
            <BookOpen size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', margin: '0 0 4px 0', color: '#1e293b' }}>Study & Exam Planner</h1>
            <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>Map syllabus coverage, countdown to finals, and plan revision logic.</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', color: '#64748b', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
            <FileUp size={16} /> Import Syllabus
          </button>
          <button 
            onClick={() => setShowAIModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}
          >
            <Sparkles size={16} /> Auto-Generate Schedule
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Subject Cards */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>Upcoming Exams</h3>
            <button style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={onAddTask}>
              <Plus size={16} /> Track New Subject
            </button>
          </div>
          <DragDropContext 
            onDragEnd={onDragEnd}
            onDragStart={() => {
              if (Capacitor.isNativePlatform()) Haptics.impact({ style: ImpactStyle.Light });
            }}
          >
            <Droppable droppableId="exam-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {examTasks.length === 0 ? (
                    <div style={{ padding: '60px 40px', textAlign: 'center', border: '1px dashed #e2e8f0', borderRadius: '20px', background: '#fff', color: '#94a3b8' }}>
                      <BookOpen size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                      <p>No exams currently mapped. Add a subject to start studying.</p>
                    </div>
                  ) : (
                    examTasks.map((task, index) => {
                      const daysLeft = getDaysLeft(task.deadline);
                      const isUrgent = daysLeft !== null && daysLeft <= 14;
                      const statusColor = isUrgent ? '#ef4444' : '#2563eb';
                      const bgLight = isUrgent ? 'rgba(239, 68, 68, 0.05)' : '#fff';
                      const syllabusCoverage = Math.max(10, Math.min(90, (task.title?.length || 5) * 5));

                      return (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div 
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => onEditTask(task)}
                              style={{ 
                                ...provided.draggableProps.style,
                                background: snapshot.isDragging ? '#f8fafc' : bgLight, 
                                border: snapshot.isDragging ? `2px solid ${statusColor}40` : `1px solid ${isUrgent ? 'rgba(239, 68, 68, 0.2)' : '#f1f5f9'}`, 
                                borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden', cursor: 'pointer',
                                boxShadow: snapshot.isDragging ? '0 12px 30px rgba(0,0,0,0.1)' : 'none'
                              }}
                            >
                              {isUrgent && <div style={{ position: 'absolute', top: 0, right: 0, padding: '4px 12px', background: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: 700, borderBottomLeftRadius: '12px' }}>CRITICAL</div>}
                              
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div>
                                  <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px', color: '#1e293b' }}>{task.title}</h4>
                                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{task.description || 'General studies and revision'}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <div style={{ fontSize: '28px', fontWeight: 800, color: statusColor, lineHeight: 1 }}>{daysLeft !== null ? daysLeft : '--'}</div>
                                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Days Left</div>
                                </div>
                              </div>

                              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                                   <span style={{ color: '#64748b' }}>Syllabus Coverage</span>
                                   <span style={{ color: statusColor }}>{syllabusCoverage}%</span>
                                 </div>
                                 <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                   <div style={{ width: `${syllabusCoverage}%`, height: '100%', background: statusColor, borderRadius: '4px' }}></div>
                                 </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Right Column: Revision Cycles UI */}
        <div>
          <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '24px', position: 'sticky', top: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <BrainCircuit size={20} color="#3b82f6" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>Spaced Repetition</h3>
            </div>
            
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px', lineHeight: 1.5 }}>
              Your immediate revision load based on memory curves.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', marginBottom: '4px' }}>DUE TODAY</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>Cell Biology (Phase 2)</div>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', marginBottom: '4px' }}>TOMORROW</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>World War II (Phase 1)</div>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', marginBottom: '4px' }}>IN 3 DAYS</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>Calculus Integration (Phase 4)</div>
              </div>
            </div>

            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
               <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#1e293b' }}>Retention Forecast</h4>
               <svg viewBox="0 0 200 80" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                  <line x1="0" y1="70" x2="200" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="40" x2="200" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2" />
                  <path d="M0 10 Q 30 70, 80 70" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
                  <path d="M30 10 Q 70 60, 140 70" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
                  <path d="M70 10 Q 120 40, 200 45" fill="none" stroke="#2563eb" strokeWidth="3" />
                  <circle cx="70" cy="10" r="5" fill="#fff" stroke="#2563eb" strokeWidth="2" />
               </svg>
            </div>
          </div>
        </div>

      </div>

      {showAIModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', width: '500px', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', color: '#ef4444' }}>
                <Sparkles size={24} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#1e293b' }}>AI Study Blueprint</h2>
            </div>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px', lineHeight: 1.5 }}>Describe your exam, current level, and target score. AI will map out a day-by-day plan using science-backed spaced repetition.</p>
            <textarea placeholder="e.g. I have a Biology final in 3 weeks. I am weak on Genetics but strong in Ecology..." style={{ width: '100%', height: '140px', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', background: '#f8fafc', color: '#1e293b', fontSize: '15px', fontFamily: 'inherit', resize: 'vertical', outline: 'none', marginBottom: '24px' }}></textarea>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAIModal(false)} style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid #f1f5f9', background: 'transparent', cursor: 'pointer', fontWeight: 600, color: '#64748b' }}>Cancel</button>
              <button style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} /> Generate Matrix
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
