import { supabase } from '../lib/supabase';

export async function fetchTasks(planner) {
  let query = supabase.from('tasks').select('*');
  if (planner) {
    query = query.eq('planner_type', planner);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(t => ({...t, planner: t.planner_type}));
}

export async function createTask(task) {
  const { data, error } = await supabase.from('tasks').insert([{
    title: task.title,
    description: task.description,
    deadline: task.deadline,
    priority: task.priority,
    status: task.status,
    planner_type: task.planner
  }]).select();
  if (error) throw error;
  const t = data[0];
  return {...t, planner: t.planner_type};
}

export async function updateTask(id, updateData) {
  if (updateData.planner) {
    updateData.planner_type = updateData.planner;
    delete updateData.planner;
  }
  const { data, error } = await supabase.from('tasks').update(updateData).eq('id', id).select();
  if (error) throw error;
  const t = data[0];
  return {...t, planner: t.planner_type};
}

export async function deleteTask(id) {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw error;
  return { success: true };
}

export async function fetchPlanners() {
  return [
    { id: 'school', name: 'School', icon: '🏫' },
    { id: 'ug', name: 'Undergrad', icon: '🎓' },
    { id: 'exam', name: 'Exam Prep', icon: '📝' },
    { id: 'daily', name: 'Daily', icon: '📅' },
    { id: 'office', name: 'Office', icon: '💼' }
  ];
}

export async function fetchHabits() {
  const { data, error } = await supabase.from('habits').select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return data.map(h => ({...h, completedDays: h.completed_days || []}));
}

export async function toggleHabitDay(id, day) {
  const { data: habit, error: fetchErr } = await supabase.from('habits').select('completed_days').eq('id', id).single();
  if (fetchErr) throw fetchErr;

  let days = habit.completed_days || [];
  if (days.includes(day)) {
    days = days.filter(d => d !== day);
  } else {
    days = [...days, day];
  }

  const { data, error } = await supabase.from('habits').update({ completed_days: days }).eq('id', id).select();
  if (error) throw error;
  const h = data[0];
  return {...h, completedDays: h.completed_days};
}

export async function createHabit(habit) {
  const { data, error } = await supabase.from('habits').insert([habit]).select();
  if (error) throw error;
  const h = data[0];
  return {...h, completedDays: h.completed_days};
}
