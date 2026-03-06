const express = require('express');
const cors = require('cors');

const tasksRouter = require('./routes/tasks');
const plannersRouter = require('./routes/planners');
const habitsRouter = require('./routes/habits');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRouter);
app.use('/api/planners', plannersRouter);
app.use('/api/habits', habitsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Life Planner API running on http://localhost:${PORT}`);
});
