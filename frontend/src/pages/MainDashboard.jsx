import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import '../index.css';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Timeline from '../components/Timeline';
import PlannerView from '../components/PlannerView';
import ExamPlanner from '../components/ExamPlanner';
import HabitTracker from '../components/HabitTracker';
import Calendar from '../components/Calendar';
import GoalPlanner from '../components/GoalPlanner';
import Analytics from '../components/Analytics';
import AIAssistant from '../components/AIAssistant';
import Settings from '../components/Settings';
import Pricing from '../components/Pricing';
import TaskModal from '../components/TaskModal';
import RightRail from '../components/RightRail';
import { fetchTasks, createTask, updateTask, deleteTask, fetchHabits, toggleHabitDay } from '../services/api';

export default function MainDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Derive active view from URL
  const pathParts = location.pathname.split('/');
  const activeView = pathParts[2] || 'dashboard';

  // Load data
  useEffect(() => {
    async function load() {
      try {
        const [t, h] = await Promise.all([fetchTasks(), fetchHabits()]);
        setTasks(t || []);
        setHabits(h || []);
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
      if (editingTask) {
        const updated = await updateTask(editingTask.id, taskData);
        setTasks(prev => prev.map(t => t.id === editingTask.id ? updated : t));
      } else {
        const newTask = await createTask(taskData);
        setTasks(prev => [...prev, newTask]);
      }
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setShowModal(false);
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

  // Bulk create tasks from AI
  const handleBulkCreateTasks = async (tasksArray) => {
    for (const taskData of tasksArray) {
      try {
        const newTask = await createTask(taskData);
        setTasks(prev => [...prev, newTask]);
      } catch (err) {
        console.error('Failed to create AI task:', err);
      }
    }
  };

  // View titles
  const viewTitles = {
    dashboard: 'Dashboard',
    timeline:  'Timeline',
    school:    'School Planner',
    ug:        'UG Planner',
    exam:      'Exam Planner',
    daily:     'Daily Planner',
    office:    'Office Planner',
    habits:    'Habit Tracker',
    calendar:  'Calendar',
    goals:     'Goal Planner',
    analytics: 'Analytics',
    ai:        'AI Autonomous Planner',
    pricing:   'Pricing',
    settings:  'Settings',
  };

  const handleNavigate = (view) => {
    navigate(`/app/${view}`);
  };

  const MainContent = () => {
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

    return (
      <Routes>
        <Route path="/" element={<Dashboard tasks={tasks} onNavigate={handleNavigate} onEditTask={handleOpenEdit} />} />
        <Route path="dashboard" element={<Dashboard tasks={tasks} onNavigate={handleNavigate} onEditTask={handleOpenEdit} />} />
        <Route path="timeline" element={<Timeline tasks={tasks} onEditTask={handleOpenEdit} />} />
        <Route path="goals" element={<GoalPlanner tasks={tasks} />} />
        <Route path="analytics" element={<Analytics tasks={tasks} />} />
        <Route path="ai" element={<AIAssistant onCreateTasks={handleBulkCreateTasks} />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="settings" element={<Settings />} />
        <Route path="exam" element={
          <ExamPlanner
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={() => setShowModal(true)}
          />
        } />
        <Route path="habits" element={<HabitTracker habits={habits} onToggleDay={handleToggleHabit} />} />
        <Route path="calendar" element={<Calendar tasks={tasks} />} />
        {['school', 'ug', 'daily', 'office'].map(type => (
          <Route 
            key={type} 
            path={type} 
            element={
              <PlannerView
                type={type}
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onAddTask={() => setShowModal(true)}
                onEditTask={handleOpenEdit}
              />
            } 
          />
        ))}
        {/* Fallback for /app/any-unknown */}
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    );
  };

  return (
    <div className="app-layout" style={{ display: 'flex', height: '100vh', width: '100vw', background: 'var(--bg-primary)' }}>
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        taskCounts={taskCounts}
      />

      <main className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header className="main-header" style={{ height: '72px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', background: 'var(--bg-primary)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{viewTitles[activeView] || 'Dashboard'}</h2>
          <div className="header-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => setShowModal(true)}
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              New Task
            </button>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <MainContent />
        </div>
      </main>

      <RightRail tasks={tasks} onEditTask={handleOpenEdit} />

      {showModal && (
        <TaskModal
          onClose={handleCloseModal}
          onSave={handleAddTask}
          onDelete={handleDeleteTask}
          initialPlanner={['school', 'ug', 'exam', 'daily', 'office'].includes(activeView) ? activeView : 'daily'}
          editingTask={editingTask}
        />
      )}
    </div>
  );
}
