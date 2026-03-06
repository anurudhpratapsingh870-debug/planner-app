const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { tasks } = require('../data/store');

const router = express.Router();

// GET all tasks (optional filter: ?planner=school)
router.get('/', (req, res) => {
  const { planner, status, priority } = req.query;
  let result = [...tasks];
  if (planner)  result = result.filter(t => t.planner === planner);
  if (status)   result = result.filter(t => t.status === status);
  if (priority) result = result.filter(t => t.priority === priority);
  result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  res.json(result);
});

// GET single task
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST create task
router.post('/', (req, res) => {
  const { title, description, deadline, priority, status, planner } = req.body;
  if (!title || !planner) return res.status(400).json({ error: 'title and planner are required' });
  const task = {
    id: uuidv4(),
    title,
    description: description || '',
    deadline: deadline || '',
    priority: priority || 'medium',
    status: status || 'pending',
    planner,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT update task
router.put('/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[idx] = { ...tasks[idx], ...req.body, id: tasks[idx].id };
  res.json(tasks[idx]);
});

// DELETE task
router.delete('/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(idx, 1);
  res.json({ success: true });
});

module.exports = router;
