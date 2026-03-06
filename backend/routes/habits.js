const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { habits } = require('../data/store');

const router = express.Router();

// GET all habits
router.get('/', (req, res) => {
  res.json(habits);
});

// POST create habit
router.post('/', (req, res) => {
  const { name, icon, color } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const habit = {
    id: uuidv4(),
    name,
    icon: icon || '✅',
    color: color || '#4f46e5',
    completedDays: [],
  };
  habits.push(habit);
  res.status(201).json(habit);
});

// PUT toggle day for a habit
router.put('/:id/toggle/:day', (req, res) => {
  const habit = habits.find(h => h.id === req.params.id);
  if (!habit) return res.status(404).json({ error: 'Habit not found' });
  const day = parseInt(req.params.day);
  if (habit.completedDays.includes(day)) {
    habit.completedDays = habit.completedDays.filter(d => d !== day);
  } else {
    habit.completedDays.push(day);
  }
  res.json(habit);
});

// DELETE habit
router.delete('/:id', (req, res) => {
  const idx = habits.findIndex(h => h.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Habit not found' });
  habits.splice(idx, 1);
  res.json({ success: true });
});

module.exports = router;
