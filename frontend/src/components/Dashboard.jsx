import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import { 
  Clock, CheckCircle2, AlertCircle, LayoutDashboard, 
  Calendar as CalendarIcon, MoreHorizontal, Plus, 
  CheckSquare, Flame, BarChart3, TrendingUp, Zap
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';


const analyticsData = [
  { name: 'Mon', value: 3 },
  { name: 'Tue', value: 2 },
  { name: 'Wed', value: 4.5 },
  { name: 'Thu', value: 3.5 },
  { name: 'Fri', value: 5 },
  { name: 'Sat', value: 7.5 },
  { name: 'Sun', value: 6.5 },
];

export default function Dashboard({ tasks = [], onNavigate, onEditTask, onReorderTasks }) {
  // Stats
  const totalTasks = tasks.length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const completed = tasks.filter(t => t.status === 'done').length;
  const upcoming = tasks.filter(t => t.status === 'pending').length;

  const priorityTasks = tasks.slice(0, 5); // Just show top 5 for dashboard

  const onDragEnd = (result) => {
    if (Capacitor.isNativePlatform()) {
      Haptics.impact({ style: ImpactStyle.Medium });
    }

    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onReorderTasks(items);
  };

  const onDragStart = () => {
    if (Capacitor.isNativePlatform()) {
      Haptics.impact({ style: ImpactStyle.Light });
    }
  };

  return (
    <div className="dashboard-container" style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Greeting Header */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b', marginBottom: '4px', letterSpacing: '-0.5px' }}>
          Good morning, Alex 👋
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 500 }}>
          Stay focused, achieve more today.
        </p>
      </div>

      {/* Summary Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {[
          { label: 'Total Tasks', value: totalTasks, sub: `+${tasks.filter(t => new Date(t.created_at).toDateString() === new Date().toDateString()).length} today`, subColor: '#10b981', color: '#1e293b' },
          { label: 'In Progress', value: inProgress, sub: '', subColor: '#f59e0b', dotColor: '#f59e0b' },
          { label: 'Completed', value: completed, sub: 'All time', dotColor: '#10b981' },
          { label: 'Upcoming', value: upcoming, sub: 'Pending', dotColor: '#3b82f6' },
        ].map((card, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b', marginBottom: '12px' }}>{card.label}</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#1e293b', marginBottom: '12px' }}>{card.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
              {card.dotColor && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: card.dotColor }}></div>}
              <span style={{ color: card.subColor || '#94a3b8' }}>{card.sub || (card.dotColor ? card.label : '')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Grid: Priorities + Goal/Analytics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        
        {/* Today's Priorities */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>Today's Priorities</h3>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>Drag to reorder</span>
          </div>
          
          <DragDropContext 
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
          >
            <Droppable droppableId="tasks-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {priorityTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => onEditTask(task)}
                          style={{ 
                            ...provided.draggableProps.style,
                            display: 'flex', alignItems: 'center', gap: '16px', 
                            padding: '12px 16px', borderRadius: '12px',
                            background: snapshot.isDragging ? '#f8fafc' : 'transparent',
                            border: snapshot.isDragging ? '1px solid #e2e8f0' : '1px solid transparent',
                            boxShadow: snapshot.isDragging ? '0 8px 24px rgba(0,0,0,0.05)' : 'none',
                            cursor: 'pointer', transition: 'background 0.2s'
                          }}
                        >
                          <div style={{ width: '20px', height: '20px', borderRadius: '6px', border: `2px solid ${task.status === 'done' ? '#10b981' : '#e2e8f0'}`, background: task.status === 'done' ? '#10b981' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {task.status === 'done' && <CheckSquare size={12} color="#fff" />}
                          </div>
                          <span style={{ flex: 1, fontSize: '15px', fontWeight: 500, color: task.status === 'done' ? '#94a3b8' : '#1e293b', textDecoration: task.status === 'done' ? 'line-through' : 'none' }}>{task.title}</span>
                          <div style={{ 
                            padding: '4px 12px', borderRadius: '20px', 
                            background: task.priority === 'high' ? '#fef2f2' : task.priority === 'medium' ? '#fffbeb' : '#f0fdf4',
                            color: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#d97706' : '#16a34a',
                            fontSize: '11px', fontWeight: 700, textTransform: 'capitalize'
                          }}>
                            {task.priority}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {priorityTasks.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      <p style={{ fontSize: '14px' }}>No tasks found. Create one to get started!</p>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Right side of middle grid: Goal Progress + Weekly Analytics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Goal Progress */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>Goal Progress</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Complete UG Project', progress: 72, color: '#2563eb' },
                { label: 'Read 12 Books', progress: 40, color: '#f59e0b' },
                { label: 'Fitness Routine', progress: 88, color: '#10b981' },
              ].map((goal, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: goal.color }}></div>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>{goal.label}</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>{goal.progress}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${goal.progress}%`, background: goal.color, borderRadius: '10px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Analytics */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>Weekly Analytics</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                This Week <Zap size={14} />
              </div>
            </div>
            
            <div style={{ height: '150px', width: '100%', position: 'relative' }}>
              <div style={{ position: 'absolute', right: '0', top: '10px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '6px 12px', fontSize: '13px', fontWeight: 800, color: '#1e293b', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', zIndex: 1 }}>
                6.5 hrs
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <span key={day} style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>{day}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom row of info cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {[
          { label: 'Habits Streak', value: '12 days', icon: <Flame size={20} />, iconBg: '#fff7ed', iconColor: '#f97316' },
          { label: 'Focus Time', value: '24h 30m', icon: <Clock size={20} />, iconBg: '#eff6ff', iconColor: '#3b82f6' },
          { label: 'Tasks Done', value: completed.toString(), icon: <CheckCircle2 size={20} />, iconBg: '#f0fdf4', iconColor: '#22c55e' },
          { label: 'Productivity', value: '18%', trend: '+', iconColor: '#22c55e' },
        ].map((card, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>{card.label}</div>
              {card.icon && (
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: card.iconBg, color: card.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {card.icon}
                </div>
              )}
              {card.trend && (
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f0fdf4', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Zap size={20} />
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {card.trend && <TrendingUp size={20} color="#22c55e" />}
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>
                {card.trend && <span style={{ color: '#22c55e' }}>{card.trend}</span>}
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
