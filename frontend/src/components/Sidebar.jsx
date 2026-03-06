import React from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'timeline',  label: 'Timeline',  icon: '🕐' },
];

const plannerItems = [
  { id: 'school', label: 'School Planner',  icon: '🏫' },
  { id: 'ug',     label: 'UG Planner',      icon: '🎓' },
  { id: 'exam',   label: 'Exam Planner',    icon: '📝' },
  { id: 'daily',  label: 'Daily Planner',   icon: '📅' },
  { id: 'office', label: 'Office Planner',  icon: '💼' },
];

const extraItems = [
  { id: 'habits',   label: 'Habit Tracker', icon: '🔥' },
  { id: 'calendar', label: 'Calendar',      icon: '📆' },
];

export default function Sidebar({ activeView, onNavigate, taskCounts }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">📋</div>
        <h1>Life Planner</h1>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Overview</div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <div
              key={item.id}
              className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="item-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Planners</div>
        <nav className="sidebar-nav">
          {plannerItems.map(item => (
            <div
              key={item.id}
              className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="item-icon">{item.icon}</span>
              {item.label}
              {taskCounts[item.id] > 0 && (
                <span className="item-badge">{taskCounts[item.id]}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Tracking</div>
        <nav className="sidebar-nav">
          {extraItems.map(item => (
            <div
              key={item.id}
              className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="item-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
