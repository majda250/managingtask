import express from 'express';

const router = express.Router();

// Stockage en mémoire pour le calendrier
let calendarTasks = [];
let currentId = 1;

// GET : récupérer les tâches d'une date
router.get('/:date', (req, res) => {
  const { date } = req.params; // format Date.toDateString() côté front
  const tasksForDate = calendarTasks.filter(task => task.date === date);
  res.json(tasksForDate);
});

// POST : ajouter une tâche
router.post('/', (req, res) => {
  const { text, date, priority, time } = req.body;

  if (!text || !date) {
    return res.status(400).json({ error: "text et date sont requis" });
  }

  const newTask = {
    id: currentId++,
    text,
    completed: false,
    priority: priority || 'moyenne',
    time: time || null,
    date
  };

  calendarTasks.push(newTask);
  res.status(201).json({ message: 'Tâche ajoutée', task: newTask });
});

// PUT : modifier une tâche (par ex. completed)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { completed, text, priority, time } = req.body;

  const idx = calendarTasks.findIndex(t => t.id === parseInt(id));
  if (idx === -1) return res.status(404).json({ error: 'Tâche non trouvée' });

  if (completed !== undefined) calendarTasks[idx].completed = completed;
  if (text) calendarTasks[idx].text = text;
  if (priority) calendarTasks[idx].priority = priority;
  if (time) calendarTasks[idx].time = time;

  res.json({ message: 'Tâche mise à jour', task: calendarTasks[idx] });
});

// DELETE : supprimer une tâche
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const idx = calendarTasks.findIndex(t => t.id === parseInt(id));
  if (idx === -1) return res.status(404).json({ error: 'Tâche non trouvée' });

  const deleted = calendarTasks.splice(idx, 1);
  res.json({ message: 'Tâche supprimée', deleted });
});

export default router;
