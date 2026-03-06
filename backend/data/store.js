const { v4: uuidv4 } = require('uuid');

// ─── In-Memory Data Store ───
// Easy to swap for PostgreSQL / Supabase later

const tasks = [
  // seed data
  { id: uuidv4(), title: 'Complete Math Assignment',   description: 'Chapter 5 exercises',        deadline: '2026-03-10', priority: 'high',   status: 'pending',    planner: 'school',  createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'DSA Practice',               description: 'Solve 5 LeetCode problems',  deadline: '2026-03-08', priority: 'high',   status: 'in-progress',planner: 'ug',      createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Physics Exam Prep',           description: 'Revise chapters 1-4',        deadline: '2026-03-15', priority: 'high',   status: 'pending',    planner: 'exam',    createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Morning Jog',                 description: '30 min run',                  deadline: '2026-03-07', priority: 'medium', status: 'pending',    planner: 'daily',   createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Team Standup Meeting',        description: 'Daily sync at 10 AM',         deadline: '2026-03-07', priority: 'medium', status: 'pending',    planner: 'office',  createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Read Research Paper',         description: 'ML fundamentals paper',       deadline: '2026-03-12', priority: 'low',    status: 'pending',    planner: 'ug',      createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Chemistry Lab Report',        description: 'Experiment 3 analysis',       deadline: '2026-03-11', priority: 'medium', status: 'pending',    planner: 'school',  createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Code Review',                 description: 'Review PR #42',               deadline: '2026-03-07', priority: 'high',   status: 'in-progress',planner: 'office',  createdAt: new Date().toISOString() },
];

const habits = [
  { id: uuidv4(), name: 'Exercise',       icon: '🏃', color: '#4f46e5', completedDays: [1, 3, 5, 6] },
  { id: uuidv4(), name: 'Read 30 mins',   icon: '📖', color: '#0891b2', completedDays: [1, 2, 3, 4, 5] },
  { id: uuidv4(), name: 'Meditate',       icon: '🧘', color: '#7c3aed', completedDays: [2, 4, 6] },
  { id: uuidv4(), name: 'Drink 2L Water', icon: '💧', color: '#0ea5e9', completedDays: [1, 2, 3, 4, 5, 6, 7] },
  { id: uuidv4(), name: 'No Junk Food',   icon: '🥗', color: '#10b981', completedDays: [1, 2, 5, 6] },
  { id: uuidv4(), name: 'Sleep by 11pm',  icon: '😴', color: '#6366f1', completedDays: [1, 3, 4, 7] },
];

const planners = [
  { id: 'school', label: 'School Planner',  icon: '🏫', color: '#4f46e5', description: 'Track assignments, homework, and school activities' },
  { id: 'ug',     label: 'UG Planner',      icon: '🎓', color: '#7c3aed', description: 'Undergraduate coursework, projects, and research' },
  { id: 'exam',   label: 'Exam Planner',    icon: '📝', color: '#dc2626', description: 'Exam schedules, study plans, and preparation' },
  { id: 'daily',  label: 'Daily Planner',   icon: '📅', color: '#0891b2', description: 'Day-to-day tasks and routines' },
  { id: 'office', label: 'Office Planner',  icon: '💼', color: '#059669', description: 'Work tasks, meetings, and projects' },
];

module.exports = { tasks, habits, planners };
