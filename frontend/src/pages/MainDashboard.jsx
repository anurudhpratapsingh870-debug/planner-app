import React, { useState, useEffect } from 'react';
import '../index.css';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Timeline from '../components/Timeline';
import PlannerView from '../components/PlannerView';
import ExamPlanner from '../components/ExamPlanner';
import HabitTracker from '../components/HabitTracker';
import Calendar from '../components/Calendar';
import TaskModal from '../components/TaskModal';
import RightRail from '../components/RightRail';
import { fetchTasks, createTask, updateTask, deleteTask, fetchHabits, toggleHabitDay } from '../services/api';

export default function MainDashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    async function load() {
      try {
        const [t, h] = await Promise.all([fetchTasks(), fetchHabits()]);
        setTasks(t);
        setHabits(h);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Task count per planner
  const taskCounts = {};
  tasks.forEach(t => {
    if (t.status !== 'done') {
      taskCounts[t.planner] = (taskCounts[t.planner] || 0) + 1;
    }
  });

  // CRUD handlers
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleToggleTask = async (id, newStatus) => {
    try {
      const updated = await updateTask(id, { status: newStatus });
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleToggleHabit = async (habitId, day) => {
    try {
      const updated = await toggleHabitDay(habitId, day);
      setHabits(prev => prev.map(h => h.id === habitId ? updated : h));
    } catch (err) {
      console.error('Failed to toggle habit:', err);
    }
  };

  // View titles
  const viewTitles = {
    dashboard: '📊 Dashboard',
    timeline:  '🕐 Timeline',
    school:    '🏫 School Planner',
    ug:        '🎓 UG Planner',
    exam:      '📝 Exam Planner',
    daily:     '📅 Daily Planner',
    office:    '💼 Office Planner',
    habits:    '🔥 Habit Tracker',
    calendar:  '📆 Calendar',
  };

  // Render active view
  const renderView = () => {
    if (loading) {
      return (
        <div className="page-content">
          <div className="empty-state">
            <div className="empty-icon">⏳</div>
            <h4>Loading your planner...</h4>
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard tasks={tasks} onNavigate={setActiveView} />;
      case 'timeline':
        return <Timeline tasks={tasks} />;
      case 'exam':
        return (
          <ExamPlanner
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={() => setShowModal(true)}
          />
        );
      case 'habits':
        return <HabitTracker habits={habits} onToggleDay={handleToggleHabit} />;
      case 'calendar':
        return <Calendar tasks={tasks} />;
      case 'school':
      case 'ug':
      case 'daily':
      case 'office':
        return (
          <PlannerView
            type={activeView}
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={() => setShowModal(true)}
          />
        );
      default:
        return <Dashboard tasks={tasks} onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="app-layout" style={{ display: 'flex', height: '100vh', width: '100vw', background: 'var(--bg-primary)' }}>
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        taskCounts={taskCounts}
      />

      <main className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header className="main-header" style={{ height: '72px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', background: 'var(--bg-primary)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{viewTitles[activeView] || 'Dashboard'}</h2>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              ✨ New Task
            </button>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {renderView()}
        </div>
      </main>

      {/* Right Rail added per spec */}
      <RightRail />

      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          onSave={handleAddTask}
          initialPlanner={['school', 'ug', 'exam', 'daily', 'office'].includes(activeView) ? activeView : 'daily'}
        />
      )}
    </div>
  );
}
