const express = require('express');
const { planners } = require('../data/store');

const router = express.Router();

// GET all planners
router.get('/', (req, res) => {
  res.json(planners);
});

// GET single planner
router.get('/:id', (req, res) => {
  const planner = planners.find(p => p.id === req.params.id);
  if (!planner) return res.status(404).json({ error: 'Planner not found' });
  res.json(planner);
});

module.exports = router;
