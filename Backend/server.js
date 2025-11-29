
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Stockage en mémoire (remplace la base de données pour tester)
let tasks = [];
let currentId = 1;

// Routes des tâches
app.get('/api/tasks/:userId', (req, res) => {
  const { userId } = req.params;
  const userTasks = tasks.filter(task => task.user_id === parseInt(userId));
  res.json(userTasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, category, user_id } = req.body;
  
  const newTask = {
    id: currentId++,
    title,
    category,
    user_id: parseInt(user_id),
    status: 'à faire',
    priority: 'moyenne',
    tags: ['Nouveau'],
    created_at: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.status(201).json({ message: 'Tâche créée', task: newTask });
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }
  
  tasks[taskIndex].status = status;
  res.json({ message: 'Tâche mise à jour', task: tasks[taskIndex] });
});

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend fonctionne!', taskCount: tasks.length });
});
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }

  tasks.splice(taskIndex, 1);

  res.json({ message: 'Tâche supprimée', id: parseInt(id) });
});

const PORT = 5003;
app.listen(PORT, () => {
  console.log(` Backend sur http://localhost:${PORT}`);
  console.log(` Routes disponibles:`);
  console.log(`   GET  /api/tasks/:userId`);
  console.log(`   POST /api/tasks`);
  console.log(`   PUT  /api/tasks/:id`);
  console.log(`   GET  /api/test`);
});







