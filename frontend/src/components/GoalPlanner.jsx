import React, { useState } from 'react';
import { Target, Milestone, CheckCircle2, Circle, ChevronRight, ChevronDown, Plus, Sparkles } from 'lucide-react';

export default function GoalPlanner({ tasks }) {
  const [expandedGoals, setExpandedGoals] = useState([1]); // Mock expanded ID

  // Mock Goal Data (In a real app, this would come from Supabase)
  const goals = [
    {
      id: 1,
      title: "Become a Full Stack Developer",
      desc: "Master React, Node, and System Design by Q4",
      progress: 65,
      milestones: [
        { id: 101, title: "Complete Advanced React Course", status: "done" },
        { id: 102, title: "Build 3 Portfolio Projects", status: "pending" },
        { id: 103, title: "Learn PostgreSQL & Redis", status: "pending" }
      ]
    },
    {
      id: 2,
      title: "Healthy Lifestyle 2026",
      desc: "Maintain sub-15% body fat and run a half marathon",
      progress: 30,
      milestones: [
        { id: 201, title: "Run 5km without stopping", status: "done" },
        { id: 202, title: "Consistency check: 4 workouts/week", status: "pending" }
      ]
    }
  ];

  const toggleGoal = (id) => {
    setExpandedGoals(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="page-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--accent-indigo)' }}>
              <Target size={28} />
            </div>
            <h1 style={{ fontSize: '32px', letterSpacing: '-1px', margin: 0 }}>Goal Planner</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Break your life ambitions into actionable milestones and tasks.</p>
        </div>
        
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', background: 'var(--primary)', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
          <Plus size={16} /> Create Goal
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {goals.map(goal => (
          <div key={goal.id} style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            
            {/* Goal Row */}
            <div 
              onClick={() => toggleGoal(goal.id)}
              style={{ padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', background: expandedGoals.includes(goal.id) ? 'var(--bg-secondary)' : 'transparent' }}
            >
              <div style={{ color: 'var(--text-muted)' }}>
                {expandedGoals.includes(goal.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{goal.title}</h3>
                  <div style={{ fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-indigo)' }}>{goal.progress}%</div>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>{goal.desc}</p>
              </div>

              <div style={{ width: '150px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${goal.progress}%`, height: '100%', background: 'var(--accent-indigo)' }}></div>
                </div>
              </div>
            </div>

            {/* Milestones (Tree View) */}
            {expandedGoals.includes(goal.id) && (
              <div style={{ padding: '0 24px 24px 64px', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-muted)' }}>
                  <Milestone size={14} />
                  <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Milestones</span>
                </div>
                
                {goal.milestones.map(ms => (
                  <div key={ms.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    {ms.status === 'done' ? <CheckCircle2 size={18} color="var(--success)" /> : <Circle size={18} color="var(--text-muted)" />}
                    <span style={{ fontSize: '14px', fontWeight: 500, color: ms.status === 'done' ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: ms.status === 'done' ? 'line-through' : 'none' }}>
                      {ms.title}
                    </span>
                  </div>
                ))}

                <button style={{ marginTop: '8px', width: 'fit-content', border: '1px dashed var(--border-color)', background: 'transparent', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <Plus size={14} /> Add Milestone
                </button>
              </div>
            )}
          </div>
        ))}

        {/* AI Generator Suggestion Card */}
        <div style={{ padding: '32px', background: 'var(--gradient-primary)', borderRadius: '16px', color: '#fff', textAlign: 'center', boxShadow: '0 10px 25px rgba(255, 107, 95, 0.2)' }}>
          <Sparkles size={32} style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Need help planning?</h3>
          <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '24px' }}>Tell AI your big dream, and we'll break it into a step-by-step roadmap for you.</p>
          <button style={{ padding: '12px 24px', borderRadius: '8px', background: '#fff', color: 'var(--primary)', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Generate AI Roadmap</button>
        </div>
      </div>

    </div>
  );
}
