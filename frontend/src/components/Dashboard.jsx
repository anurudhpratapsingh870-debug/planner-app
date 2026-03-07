import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle2, AlertCircle, LayoutDashboard, Calendar as CalendarIcon, MoreHorizontal } from 'lucide-react';
import { format, startOfDay, endOfDay, differenceInHours, addHours } from 'date-fns';

const plannerMeta = {
  school: { label: 'School Project', color: 'var(--accent-indigo)', bg: 'var(--bg-blue-light)' },
  ug:     { label: 'UG Research', color: 'var(--accent-purple)', bg: 'var(--bg-purple-light)' },
  exam:   { label: 'Exam Prep', color: 'var(--accent-red)', bg: 'var(--bg-red-light)' },
  daily:  { label: 'Daily Tasks', color: 'var(--accent-orange)', bg: 'var(--bg-orange-light)' },
  office: { label: 'Office/Work', color: 'var(--accent-green)', bg: 'var(--bg-green-light)' },
};

export default function Dashboard({ tasks, onNavigate, onEditTask }) {
  // --- Derived Statistics ---
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const incompleteTasks = totalTasks - completedTasks - inProgressTasks;
  const urgentTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;

  // --- Mock Project Status Data (Grouped by Planner) ---
  const projectStats = Object.keys(plannerMeta).map(key => {
    const plannerTasks = tasks.filter(t => t.planner === key);
    const total = plannerTasks.length;
    const completed = plannerTasks.filter(t => t.status === 'done').length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return {
      key,
      ...plannerMeta[key],
      progress,
      total,
      completed
    };
  }).filter(p => p.total > 0);

  // --- Gantt Chart Timeline Calculation ---
  // We'll map tasks onto a 10-hour day from 07:00 to 17:00 for the visualization
  const timelineStartHour = 7;
  const timelineEndHour = 17;
  const totalHours = timelineEndHour - timelineStartHour;

  // Helper to place mock timeline bars based on index to simulate a Gantt chart layout
  const activeTimelineTasks = tasks.filter(t => t.status !== 'done').slice(0, 4);

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* --- Top Section: Header --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--text-primary)', marginBottom: '4px' }}>Task Overview</h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Welcome back. Here is your system status.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Professional Status / Teams (Initials instead of playful cartoons) */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {['SJ', 'MD', 'AR', 'KL'].map((initials, i) => (
               <div 
                 key={initials} 
                 style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid var(--bg-primary)', marginLeft: i > 0 ? '-12px' : '0', background: 'var(--bg-secondary)', zIndex: 10 - i, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', boxShadow: 'var(--shadow-sm)' }}
                 title={`Team Member: ${initials}`}
               >
                 {initials}
               </div>
            ))}
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid var(--bg-primary)', marginLeft: '-12px', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', zIndex: 0, boxShadow: 'var(--shadow-sm)' }}>
              +3
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }}></div>

          <div style={{ padding: '8px 16px', background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarIcon size={16} />
            {format(new Date(), 'do MMMM yyyy')}
          </div>
        </div>
      </div>

      {/* --- Row 1: Project Timeline (Gantt) --- */}
      <div style={{ background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Project Timeline</h3>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '12px' }}>Today</span>
        </div>

        {/* Timeline Header (Hours) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px', position: 'relative' }}>
          {Array.from({ length: totalHours + 1 }).map((_, i) => (
            <div key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', width: '40px', textAlign: 'center' }}>
              {`${(timelineStartHour + i).toString().padStart(2, '0')}:00`}
            </div>
          ))}
          {/* Vertical Grid Lines */}
          <div style={{ position: 'absolute', top: '30px', left: '20px', right: '20px', height: `${activeTimelineTasks.length * 50}px`, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between' }}>
             {Array.from({ length: totalHours + 1 }).map((_, i) => (
                <div key={i} style={{ borderLeft: '1px dashed var(--border-color)', height: '100%' }}></div>
             ))}
          </div>
        </div>

        {/* Timeline Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
          {activeTimelineTasks.length > 0 ? activeTimelineTasks.map((task, index) => {
            // Mock placement logic for stunning visual effect
            const startHourOffset = (index * 1.5) % (totalHours - 2); 
            const durationHours = 2 + (index % 2);
            const leftPercent = (startHourOffset / totalHours) * 100;
            const widthPercent = (durationHours / totalHours) * 100;
            const meta = plannerMeta[task.planner] || plannerMeta.daily;

            return (
              <div 
                key={task.id} 
                className="hover-lift"
                onClick={() => onEditTask && onEditTask(task)}
                style={{ height: '36px', background: meta.bg, borderRadius: '18px', width: `${widthPercent}%`, marginLeft: `${leftPercent}%`, display: 'flex', alignItems: 'center', padding: '0 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'relative', zIndex: 1, cursor: 'pointer', transition: 'transform 0.2s' }}
              >
                <div style={{ background: meta.color, width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px' }}></div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: meta.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</span>
              </div>
            )
          }) : (
             <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>No timeline tasks today.</div>
          )}
        </div>
      </div>

      {/* --- Row 2: Task Completion Summary Cards (Matching Reference Exact Layout) --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', marginBottom: '-16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Task Completion</h3>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>Overall Status</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '44px', height: '44px', background: 'var(--bg-blue-light)', color: 'var(--accent-indigo)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <LayoutDashboard size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{incompleteTasks} Tasks</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>Incomplete</div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '44px', height: '44px', background: 'var(--bg-orange-light)', color: 'var(--accent-orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{inProgressTasks} Tasks</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>In Progress</div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '44px', height: '44px', background: 'var(--bg-green-light)', color: 'var(--accent-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle2 size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{completedTasks} Tasks</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>Completed</div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '44px', height: '44px', background: 'var(--bg-red-light)', color: 'var(--accent-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertCircle size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{urgentTasks} Tasks</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>Urgent Items</div>
          </div>
        </div>
      </div>

      {/* --- Row 3: Performance & Project Status --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '24px', marginTop: '8px' }}>
        
        {/* Planner Performance (Circular Charts) */}
        <div style={{ background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Planner Engagement</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {projectStats.slice(0, 3).map((stat) => (
              <div key={stat.key} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{ value: stat.total }]}
                        cx="50%" cy="50%"
                        innerRadius={22} outerRadius={28}
                        startAngle={90} endAngle={-270}
                        dataKey="value" stroke="none" fill={stat.bg}
                      />
                      <Pie
                        data={[{ value: stat.total }]}
                        cx="50%" cy="50%"
                        innerRadius={22} outerRadius={28}
                        startAngle={90} endAngle={90 - (360 * (stat.progress / 100))}
                        dataKey="value" stroke="none" fill={stat.color} cornerRadius={10}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {stat.progress}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{stat.label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{stat.total} Total Tasks</div>
                </div>
              </div>
            ))}
            {projectStats.length === 0 && <div style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', paddingTop: '20px' }}>Not enough data. Add tasks!</div>}
          </div>
        </div>

        {/* Project Status (Progress Bars) */}
        <div style={{ background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Project Status</h3>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><MoreHorizontal size={20} /></button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {projectStats.map(stat => (
              <div key={stat.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {stat.label}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>{stat.progress}%</span>
                </div>
                <div style={{ height: '8px', background: stat.bg, borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: stat.color, width: `${stat.progress}%`, borderRadius: '4px', transition: 'width 0.5s ease-out' }}></div>
                </div>
              </div>
            ))}
             {projectStats.length === 0 && <div style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', paddingTop: '40px' }}>Create tasks inside planners to see progress here.</div>}
          </div>
        </div>

      </div>

    </div>
  );
}
