import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle2, AlertCircle, LayoutDashboard, Calendar as CalendarIcon, MoreHorizontal, Zap, Target, BrainCircuit, ArrowRight, TrendingUp, Star } from 'lucide-react';
import { format } from 'date-fns';

const plannerMeta = {
  school: { label: 'School',   color: '#6366f1', bg: '#eef2ff', lightBg: '#e0e7ff' },
  ug:     { label: 'UG',       color: '#8b5cf6', bg: '#f5f3ff', lightBg: '#ede9fe' },
  exam:   { label: 'Exams',    color: '#ef4444', bg: '#fef2f2', lightBg: '#fee2e2' },
  daily:  { label: 'Daily',    color: '#f59e0b', bg: '#fffbeb', lightBg: '#fef3c7' },
  office: { label: 'Office',   color: '#10b981', bg: '#ecfdf5', lightBg: '#d1fae5' },
};

export default function Dashboard({ tasks, onNavigate, onEditTask }) {
  // Derived statistics
  const totalTasks       = tasks.length;
  const completedTasks   = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks  = tasks.filter(t => t.status === 'in_progress').length;
  const incompleteTasks  = totalTasks - completedTasks - inProgressTasks;
  const urgentTasks      = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;
  const completionRate   = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const projectStats = Object.keys(plannerMeta).map(key => {
    const plannerTasks = tasks.filter(t => t.planner === key);
    const total = plannerTasks.length;
    const completed = plannerTasks.filter(t => t.status === 'done').length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { key, ...plannerMeta[key], progress, total, completed };
  }).filter(p => p.total > 0);

  const timelineStartHour = 7;
  const totalHours = 10;
  const activeTimelineTasks = tasks.filter(t => t.status !== 'done').slice(0, 4);

  const today = format(new Date(), 'EEEE, do MMMM yyyy');

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>

      {/* ===== HERO BANNER (Reference-matched blue gradient) ===== */}
      <div style={{
        borderRadius: '24px',
        background: 'linear-gradient(130deg, #3730a3 0%, #4f46e5 40%, #6366f1 70%, #818cf8 100%)',
        padding: '0',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(79, 70, 229, 0.3)',
        position: 'relative',
        minHeight: '220px',
        display: 'flex',
        alignItems: 'stretch'
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-40px', right: '200px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '60px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20px', right: '300px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

        {/* Left content */}
        <div style={{ flex: 1, padding: '40px 40px 40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '20px', padding: '4px 12px', marginBottom: '16px', width: 'fit-content' }}>
            <Star size={12} fill="#fbbf24" stroke="none" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#fde68a' }}>Life OS — Your Personal HQ</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: '10px', lineHeight: 1.2 }}>
            Plan the life that<br />works for <span style={{ color: '#fde68a' }}>you</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px', maxWidth: '380px', lineHeight: 1.6 }}>
            AI-powered planning, habit tracking, goal management, and financial planning — all in one workspace.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('ai')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#fbbf24', color: '#1e293b', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(251, 191, 36, 0.4)', transition: 'transform 0.2s' }}
            >
              <BrainCircuit size={16} /> Generate AI Plan
            </button>
            <button
              onClick={() => onNavigate('goals')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}
            >
              Set Goals <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right: floating stat cards (reference floating UI cards) */}
        <div style={{ width: '340px', padding: '28px 40px 28px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
          {[
            { label: 'Tasks Completed', value: `${completedTasks}/${totalTasks}`, sub: `${completionRate}% done`, icon: <CheckCircle2 size={16} />, accent: '#4ade80' },
            { label: 'Urgent Items', value: urgentTasks.toString(), sub: 'Needs attention', icon: <AlertCircle size={16} />, accent: '#fb923c' },
            { label: today, value: '', sub: 'Today', icon: <CalendarIcon size={16} />, accent: '#a78bfa', isDate: true },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              borderRadius: '14px',
              padding: '12px 16px',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.accent, flexShrink: 0 }}>
                {card.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: card.isDate ? '11px' : '16px', fontWeight: card.isDate ? 600 : 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {card.isDate ? card.label : card.value}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{card.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== STAT CARDS ROW ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total Tasks',   value: totalTasks,       icon: <LayoutDashboard size={20} />, color: '#6366f1', bg: '#eef2ff' },
          { label: 'In Progress',   value: inProgressTasks,  icon: <Clock size={20} />,           color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Completed',     value: completedTasks,   icon: <CheckCircle2 size={20} />,    color: '#10b981', bg: '#ecfdf5' },
          { label: 'Urgent',        value: urgentTasks,      icon: <AlertCircle size={20} />,     color: '#ef4444', bg: '#fef2f2' },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(30,41,59,0.04)', display: 'flex', alignItems: 'center', gap: '14px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 12px ${stat.color}20` }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.5px' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== FEATURE CARDS (What you can do — reference "What you can do?" section) ===== */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', letterSpacing: '-0.5px' }}>What you can do</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, #e2e8f0, transparent)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            {
              icon: <BrainCircuit size={28} />,
              color: '#6366f1', bg: '#eef2ff',
              title: 'AI Autonomous Planning',
              desc: 'Tell the AI your goal — it generates a complete plan, schedule, and tasks automatically.',
              action: () => onNavigate('ai'),
              cta: 'Try AI Now',
            },
            {
              icon: <Target size={28} />,
              color: '#8b5cf6', bg: '#f5f3ff',
              title: 'Goal & Milestone Tracker',
              desc: 'Set your life goals, break them into milestones, and track progress visually.',
              action: () => onNavigate('goals'),
              cta: 'View Goals',
            },
            {
              icon: <TrendingUp size={28} />,
              color: '#10b981', bg: '#ecfdf5',
              title: 'Analytics & Insights',
              desc: 'Understand your productivity patterns with real-time charts and smart metrics.',
              action: () => onNavigate('analytics'),
              cta: 'View Analytics',
            },
          ].map((feat, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 8px rgba(30,41,59,0.04)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onClick={feat.action} className="hover-lift">
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: feat.bg, color: feat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: `0 4px 14px ${feat.color}25` }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{feat.title}</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7, marginBottom: '20px' }}>{feat.desc}</p>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: feat.color, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {feat.cta} <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== ROW: Timeline + Project Status ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>

        {/* Timeline Gantt */}
        <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9', padding: '24px', boxShadow: '0 2px 8px rgba(30,41,59,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>Task Timeline</h3>
            <span style={{ fontSize: '12px', color: '#64748b', background: '#f8fafc', border: '1px solid #f1f5f9', padding: '4px 12px', borderRadius: '20px', fontWeight: 600 }}>Today</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', marginBottom: '16px' }}>
            {Array.from({ length: totalHours + 1 }).map((_, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#94a3b8', width: '36px', textAlign: 'center' }}>
                {`${(timelineStartHour + i).toString().padStart(2, '0')}h`}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeTimelineTasks.length > 0 ? activeTimelineTasks.map((task, index) => {
              const startHourOffset = (index * 1.5) % (totalHours - 2);
              const durationHours = 2 + (index % 2);
              const leftPercent = (startHourOffset / totalHours) * 100;
              const widthPercent = (durationHours / totalHours) * 100;
              const meta = plannerMeta[task.planner] || plannerMeta.daily;
              return (
                <div key={task.id} className="hover-lift" onClick={() => onEditTask && onEditTask(task)}
                  style={{ height: '40px', background: meta.bg, borderRadius: '20px', width: `${widthPercent}%`, marginLeft: `${leftPercent}%`, display: 'flex', alignItems: 'center', padding: '0 14px', cursor: 'pointer', transition: 'transform 0.2s', border: `1px solid ${meta.lightBg}` }}>
                  <div style={{ background: meta.color, width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: meta.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</span>
                </div>
              );
            }) : (
              <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '14px', flexDirection: 'column', gap: '8px' }}>
                <Clock size={28} color="#e2e8f0" />
                <span>No active tasks on the timeline</span>
              </div>
            )}
          </div>
        </div>

        {/* Project Status */}
        <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9', padding: '24px', boxShadow: '0 2px 8px rgba(30,41,59,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>Project Status</h3>
            <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><MoreHorizontal size={18} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {projectStats.length > 0 ? projectStats.map(stat => (
              <div key={stat.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: stat.color }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{stat.label}</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: stat.color }}>{stat.progress}%</span>
                </div>
                <div style={{ height: '8px', background: stat.bg, borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: `linear-gradient(90deg, ${stat.color}, ${stat.lightBg})`, width: `${stat.progress}%`, borderRadius: '8px', transition: 'width 0.5s ease-out', backgroundImage: `linear-gradient(90deg, ${stat.color}cc, ${stat.color})` }} />
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8', fontSize: '14px' }}>
                <Target size={36} color="#e2e8f0" style={{ marginBottom: '10px', display: 'block', margin: '0 auto 10px' }} />
                Add tasks to planners to see progress here.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== PLANNER QUICK ACCESS ROW ===== */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', letterSpacing: '-0.5px' }}>Your Planners</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, #e2e8f0, transparent)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
          {[
            { id: 'school', label: 'School', icon: '📚', color: '#6366f1', bg: '#eef2ff', desc: 'Classes & Assignments' },
            { id: 'ug',     label: 'UG',     icon: '🎓', color: '#8b5cf6', bg: '#f5f3ff', desc: 'Research & Projects' },
            { id: 'exam',   label: 'Exams',  icon: '✏️', color: '#ef4444', bg: '#fef2f2', desc: 'Prep & Mock Tests' },
            { id: 'daily',  label: 'Daily',  icon: '📋', color: '#f59e0b', bg: '#fffbeb', desc: 'Tasks & Habits' },
            { id: 'office', label: 'Office', icon: '💼', color: '#10b981', bg: '#ecfdf5', desc: 'Work & Meetings' },
          ].map(p => {
            const count = tasks.filter(t => t.planner === p.id && t.status !== 'done').length;
            return (
              <div key={p.id} onClick={() => onNavigate(p.id)} className="hover-lift"
                style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '20px 16px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center', boxShadow: '0 2px 8px rgba(30,41,59,0.04)' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{p.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{p.label}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>{p.desc}</div>
                {count > 0 && (
                  <div style={{ display: 'inline-block', background: p.bg, color: p.color, fontSize: '11px', fontWeight: 700, padding: '2px 10px', borderRadius: '20px' }}>{count} tasks</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
