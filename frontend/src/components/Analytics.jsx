import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Calendar } from 'lucide-react';

export default function Analytics({ tasks = [] }) {
  // Calculated stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Weekly Tasks (Tasks due this week or created recently, simple count for now)
  const activeTasks = tasks.filter(t => t.status !== 'done').length;

  // Breakdown by planner
  const plannerBreakdown = {};
  tasks.forEach(t => {
    plannerBreakdown[t.planner] = (plannerBreakdown[t.planner] || 0) + 1;
  });

  const getPlannerColor = (p) => {
    switch(p) {
      case 'school': return 'var(--accent-indigo)';
      case 'office': return 'var(--success)';
      case 'daily': return 'var(--accent-amber)';
      case 'exam': return 'var(--accent-red)';
      case 'ug': return 'var(--accent-purple)';
      default: return 'var(--text-muted)';
    }
  };

  const getPlannerLabel = (p) => {
    const labels = { school: 'Studies', office: 'Work', daily: 'Daily', exam: 'Exams', ug: 'Undergrad' };
    return labels[p] || 'Other';
  };

  const breakdownStats = Object.keys(plannerBreakdown).map(k => ({
    label: getPlannerLabel(k),
    color: getPlannerColor(k),
    p: Math.round((plannerBreakdown[k] / totalTasks) * 100)
  })).sort((a,b) => b.p - a.p);
  return (
    <div className="page-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', letterSpacing: '-1px', marginBottom: '8px' }}>Productivity Insights</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Measure your progress, study habits, and goal completion trends.</p>
      </div>

      {/* Hero Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {[
          { label: 'Completion Rate', value: `${completionRate}%`, icon: <Activity size={20} />, color: 'var(--success)' },
          { label: 'Total Tasks', value: totalTasks.toString(), icon: <Calendar size={20} />, color: 'var(--accent-indigo)' },
          { label: 'Active Tasks', value: activeTasks.toString(), icon: <TrendingUp size={20} />, color: 'var(--accent-amber)' },
          { label: 'Goals On Track', value: 'Local Env', icon: <PieChart size={20} />, color: 'var(--accent-blue)' },
        ].map((stat, i) => (
          <div key={i} style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
             <div style={{ color: stat.color, marginBottom: '12px' }}>{stat.icon}</div>
             <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>{stat.value}</div>
             <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '32px' }}>
        
        {/* Main Chart Card */}
        <div style={{ background: 'var(--bg-primary)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Task Completion Frequency</h3>
            </div>
            <select style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '8px', fontSize: '13px' }}>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          {/* SVG Chart Mockup */}
          <div style={{ height: '240px', width: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: '30px' }}>
            {/* Grid Lines */}
            <div style={{ position: 'absolute', inset: '0 0 30px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {[0, 1, 2, 3].map(i => <div key={i} style={{ width: '100%', height: '1px', background: 'var(--border-color)' }}></div>)}
            </div>
            
            {/* Bars */}
            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
              <div key={i} style={{ width: '40px', background: i === 3 ? 'var(--primary)' : 'var(--accent-indigo)', borderRadius: '6px 6px 0 0', height: `${h}%`, position: 'relative', transition: 'height 0.4s ease' }}>
                <div style={{ position: 'absolute', bottom: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{['M','T','W','T','F','S','S'][i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown Card */}
        <div style={{ background: 'var(--bg-primary)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Time Distribution</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {breakdownStats.length > 0 ? breakdownStats.map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{item.p}%</span>
                </div>
                <div style={{ height: '8px', width: '100%', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.p}%`, height: '100%', background: item.color, transition: 'width 0.5s ease-out' }}></div>
                </div>
              </div>
            )) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', paddingTop: '10px' }}>No tasks assigned to categories yet.</div>
            )}
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
             <button style={{ background: 'none', border: `1px solid var(--border-color)`, padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}>Download Report</button>
          </div>
        </div>

      </div>

    </div>
  );
}
