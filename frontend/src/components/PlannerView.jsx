import React from 'react';
import { Plus, Clock, Flag, Circle, CheckCircle2, MoreHorizontal, Calendar as CalIcon, BookOpen, Briefcase, GraduationCap, Users, LayoutDashboard } from 'lucide-react';
import { format } from 'date-fns';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const plannerMeta = {
  school: { label: 'School Planner',  color: '#4f46e5', desc: 'Assignments & Classes', theme: 'indigo', icon: <GraduationCap size={28} /> },
  ug:     { label: 'UG Planner',      color: '#7c3aed', desc: 'Semester & Research', theme: 'violet', icon: <TargetIcon size={28} /> },
  daily:  { label: 'Daily Planner',   color: '#06b6d4', desc: 'Agendas & Time Blocks', theme: 'cyan', icon: <Clock size={28} /> },
  office: { label: 'Office Planner',  color: '#10b981', desc: 'Meetings & Objectives', theme: 'emerald', icon: <Briefcase size={28} /> },
};

function TargetIcon({ size }) { return <LayoutDashboard size={size} />; }

export default function PlannerView({ type, tasks, onToggleTask, onDeleteTask, onAddTask, onEditTask, onReorderTasks }) {
  const meta = plannerMeta[type];
  if (!meta) return null;

  const plannerTasks = tasks.filter(t => t.planner === type);
  const done = plannerTasks.filter(t => t.status === 'done');

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const affectedTasks = tasks.filter(t => t.planner === type);
    const [reorderedItem] = affectedTasks.splice(result.source.index, 1);
    affectedTasks.splice(result.destination.index, 0, reorderedItem);
    
    // Merge back into original tasks array
    const newTasks = tasks.map(t => {
      if (t.planner === type) {
        return affectedTasks.shift();
      }
      return t;
    });
    onReorderTasks(newTasks);
  };

  const getPriorityColor = (p) => {
    if (p === 'high') return '#ef4444';
    if (p === 'medium') return '#f59e0b';
    return '#10b981';
  };

  const TaskListItem = ({ task, index }) => {
    const isDone = task.status === 'done';
    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ 
              ...provided.draggableProps.style,
              display: 'flex', alignItems: 'flex-start', gap: '16px', 
              background: snapshot.isDragging ? '#f8fafc' : '#fff', 
              border: snapshot.isDragging ? `1px solid ${meta.color}40` : '1px solid #f1f5f9', 
              padding: '16px 20px', borderRadius: '12px', 
              boxShadow: snapshot.isDragging ? '0 8px 24px rgba(0,0,0,0.05)' : 'none',
              opacity: isDone ? 0.6 : 1, marginBottom: '8px', cursor: 'pointer' 
            }}
            onClick={() => onEditTask(task)}
          >
            <div 
              onClick={(e) => { e.stopPropagation(); onToggleTask(task.id, isDone ? 'pending' : 'done'); }}
              style={{ marginTop: '2px', cursor: 'pointer', color: isDone ? '#10b981' : '#cbd5e1' }}
            >
              {isDone ? <CheckCircle2 size={22} /> : <Circle size={22} />}
            </div>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '15px', fontWeight: 600, color: isDone ? '#64748b' : '#1e293b', textDecoration: isDone ? 'line-through' : 'none', marginBottom: '4px' }}>
                {task.title}
              </div>
              {task.description && (
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px', lineHeight: 1.4 }}>
                   {task.description}
                </div>
              )}
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', color: getPriorityColor(task.priority), background: `${getPriorityColor(task.priority)}15`, padding: '4px 8px', borderRadius: '6px' }}>
                  <Flag size={12} /> {task.priority.toUpperCase()}
                </div>
                {task.deadline && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                    <CalIcon size={14} /> {format(new Date(task.deadline), 'MMM d, yyyy')}
                  </div>
                )}
              </div>
            </div>

            <button onClick={(e) => { e.stopPropagation(); onDeleteTask(task.id); }} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '4px' }}>
              <MoreHorizontal size={20} />
            </button>
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <div className="page-content" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '36px', width: '64px', height: '64px', background: `${meta.color}15`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {meta.icon}
          </div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', margin: '0 0 4px 0', color: '#1e293b' }}>{meta.label}</h1>
            <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>{meta.desc}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '16px' }}>
            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Progress</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>{done.length} / {plannerTasks.length} Done</div>
          </div>
          <button 
            onClick={onAddTask}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', background: meta.color, color: '#fff', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer', boxShadow: `0 4px 12px ${meta.color}40` }}
          >
            <Plus size={18} /> Add Task
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="planner-tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {plannerTasks.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', background: '#f8fafc', borderRadius: '20px', border: '2px dashed #e2e8f0' }}>
                   <p style={{ color: '#64748b', fontWeight: 500 }}>No tasks in this planner. Click 'Add Task' to begin.</p>
                </div>
              ) : (
                plannerTasks.map((t, i) => <TaskListItem key={t.id} task={t} index={i} />)
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  );
}
