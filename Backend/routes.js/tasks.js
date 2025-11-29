
import express from 'express';
import pool from '../configuration/database.js';   

const router = express.Router();


router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT id, title, category, status, priority, user_id, tags, time, date FROM tasks WHERE user_id = ?',
      [userId]
    );

    const tasksWithParsedTags = rows.map(task => ({
      ...task,
      tags: task.tags ? JSON.parse(task.tags) : ["Nouveau"]
    }));

    return res.json(tasksWithParsedTags);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    return res.status(500).json({ error: 'Erreur serveur lors de la récupération des tâches' });
  }
});


router.post('/', async (req, res) => {
  const { title, category, user_id, status, priority, date, time } = req.body;

  if (!title || !category || !user_id) {
    return res.status(400).json({ error: 'title, category et user_id sont obligatoires' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO tasks (title, category, status, priority, user_id, tags, time, date, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        title,
        category,
        status || 'à faire',
        priority || 'moyenne',
        user_id,
        JSON.stringify(['Nouveau']),
        time || null,
        date || null
      ]
    );

    
    const [newTaskRows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    const newTask = newTaskRows[0];

    return res.status(201).json({ 
      message: 'Tâche créée avec succès', 
      task: {
        ...newTask,
        tags: JSON.parse(newTask.tags) 
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création de la tâche :', error);
    return res.status(500).json({ error: 'Erreur serveur lors de la création de la tâche' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, title, category, priority } = req.body;

  try {
    
    const [existing] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }

    const current = existing[0];

    const newStatus = status || current.status;
    const newTitle = title || current.title;
    const newCategory = category || current.category;
    const newPriority = priority || current.priority;

    await pool.query(
      `UPDATE tasks 
       SET status = ?, title = ?, category = ?, priority = ?
       WHERE id = ?`,
      [newStatus, newTitle, newCategory, newPriority, id]
    );

    return res.json({
      message: 'Tâche mise à jour avec succès',
      task: {
        ...current,
        status: newStatus,
        title: newTitle,
        category: newCategory,
        priority: newPriority
      }
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche :', error);
    return res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la tâche' });
  }
});

export default router;


