import express from 'express';

const router = express.Router();

// Stockage en mémoire
let projects = [];
let currentId = 1;

// GET : récupérer tous les projets
router.get('/', (req, res) => {
  res.json(projects);
});

// POST : ajouter un projet
router.post('/', (req, res) => {
  const { name, description, startDate, endDate, team, status, files } = req.body;

  if (!name || !startDate || !endDate) {
    return res.status(400).json({ error: "name, startDate et endDate sont requis" });
  }

  const colors = [
    "project-card project-blue",
    "project-card project-purple",
    "project-card project-green",
    "project-card project-amber",
    "project-card project-pink"
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const newProject = {
    id: currentId++,
    name,
    description: description || "",
    status: status || "planifié",
    startDate,
    endDate,
    team: team || [],
    progress: 0,
    colorClass: randomColor,
    files: files || []
  };

  projects.push(newProject);
  res.status(201).json({ message: "Projet créé", project: newProject });
});

// PUT : mettre à jour un projet
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, team, status, progress, files } = req.body;

  const idx = projects.findIndex(p => p.id === parseInt(id));
  if (idx === -1) return res.status(404).json({ error: "Projet non trouvé" });

  if (name) projects[idx].name = name;
  if (description) projects[idx].description = description;
  if (startDate) projects[idx].startDate = startDate;
  if (endDate) projects[idx].endDate = endDate;
  if (team) projects[idx].team = team;
  if (status) projects[idx].status = status;
  if (progress !== undefined) projects[idx].progress = progress;
  if (files) projects[idx].files = files;

  res.json({ message: "Projet mis à jour", project: projects[idx] });
});

// DELETE : supprimer un projet
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const idx = projects.findIndex(p => p.id === parseInt(id));
  if (idx === -1) return res.status(404).json({ error: "Projet non trouvé" });

  const deleted = projects.splice(idx, 1);
  res.json({ message: "Projet supprimé", deleted });
});

export default router;
