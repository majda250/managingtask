import React, { useState } from 'react';
import { Plus, Search, Bell, Settings, Calendar, List, Grid, Share2, MoreVertical, Check, Clock, Users, FileText, Upload, X } from 'lucide-react';
import "../CSS/Project.css";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Site Web E-commerce",
      description: "Développement d'une plateforme de vente en ligne",
      status: "en cours",
      startDate: "2024-01-15",
      endDate: "2024-03-30",
      team: ["Alice", "Bob", "Charlie"],
      progress: 65,
      colorClass: "project-card project-blue",
      files: ["specifications.pdf", "maquettes.zip"]
    },
    {
      id: 2,
      name: "Application Mobile",
      description: "Application de gestion de tâches mobile",
      status: "planifié",
      startDate: "2024-02-01",
      endDate: "2024-04-15",
      team: ["David", "Eve"],
      progress: 0,
      colorClass: "project-card project-purple",
      files: []
    },
    {
      id: 3,
      name: "Refonte Branding",
      description: "Nouvelle identité visuelle de l'entreprise",
      status: "terminé",
      startDate: "2023-11-01",
      endDate: "2024-01-10",
      team: ["Frank", "Grace", "Henry", "Ivy"],
      progress: 100,
      colorClass: "project-card project-green",
      files: ["logo.ai", "guide-style.pdf", "presentation.pptx"]
    }
  ]);

  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    team: [],
    status: "planifié"
  });
  const [newTeamMember, setNewTeamMember] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const addProject = () => {
    if (newProject.name.trim() && newProject.startDate && newProject.endDate) {
      const colors = [
        "project-card project-blue",
        "project-card project-purple",
        "project-card project-green",
        "project-card project-amber",
        "project-card project-pink"
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const project = {
        id: Date.now(),
        name: newProject.name,
        description: newProject.description,
        status: newProject.status,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        team: newProject.team,
        progress: 0,
        colorClass: randomColor,
        files: uploadedFiles.map(file => file.name)
      };
      
      setProjects([...projects, project]);
      setNewProject({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        team: [],
        status: "planifié"
      });
      setUploadedFiles([]);
      setShowAddProject(false);
    }
  };

  const addTeamMember = () => {
    if (newTeamMember.trim() && !newProject.team.includes(newTeamMember)) {
      setNewProject({
        ...newProject,
        team: [...newProject.team, newTeamMember]
      });
      setNewTeamMember("");
    }
  };

  const removeTeamMember = (member) => {
    setNewProject({
      ...newProject,
      team: newProject.team.filter(m => m !== member)
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (fileName) => {
    setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'en cours': return 'status-en-cours';
      case 'terminé': return 'status-termine';
      case 'planifié': return 'status-planifie';
      default: return 'status-planifie';
    }
  };

  const [activeView, setActiveView] = useState("grid");

  return (
    <>
      {/* Top Bar - Même structure que Home */}
      

      {/* Main Content */}
      <div className="projects-container">
        {/* Header avec bouton d'ajout */}
        <div className="projects-header">
          <div className="projects-title-section">
            <h1 className="projects-main-title">Mes Projets</h1>
            <p className="projects-subtitle">
              {projects.length} projet{projects.length > 1 ? 's' : ''} au total
            </p>
          </div>
          <button 
            onClick={() => setShowAddProject(true)}
            className="add-project-btn"
          >
            <Plus size={18} />
            Nouveau Projet
          </button>
        </div>

        {/* Grid des projets */}
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className={project.colorClass}>
              <div className="project-header">
                <div className="project-title-section">
                  <h3 className="project-name">{project.name}</h3>
                  <span className={`project-status ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <button className="project-menu">
                  <MoreVertical size={16} />
                </button>
              </div>

              <p className="project-description">{project.description}</p>

              {/* Barre de progression */}
              <div className="project-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{project.progress}%</span>
              </div>

              {/* Dates */}
              <div className="project-dates">
                <div className="date-item">
                  <Calendar size={12} />
                  <span>Début: {new Date(project.startDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="date-item">
                  <Calendar size={12} />
                  <span>Fin: {new Date(project.endDate).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>

              {/* Équipe */}
              <div className="project-team">
                <div className="team-header">
                  <Users size={14} />
                  <span>Équipe ({project.team.length})</span>
                </div>
                <div className="team-members">
                  {project.team.map((member, index) => (
                    <span key={index} className="team-member">
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fichiers */}
              {project.files.length > 0 && (
                <div className="project-files">
                  <div className="files-header">
                    <FileText size={14} />
                    <span>Fichiers ({project.files.length})</span>
                  </div>
                  <div className="files-list">
                    {project.files.map((file, index) => (
                      <span key={index} className="file-item">
                        {file}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal d'ajout de projet */}
        {showAddProject && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Nouveau Projet</h2>
                <button 
                  onClick={() => setShowAddProject(false)}
                  className="modal-close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nom du projet *</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="form-input"
                    placeholder="Entrez le nom du projet"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="form-textarea"
                    placeholder="Décrivez le projet..."
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date de début *</label>
                    <input
                      type="date"
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date de fin *</label>
                    <input
                      type="date"
                      value={newProject.endDate}
                      onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Équipe</label>
                  <div className="team-input-container">
                    <input
                      type="text"
                      value={newTeamMember}
                      onChange={(e) => setNewTeamMember(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTeamMember()}
                      className="form-input"
                      placeholder="Ajouter un membre d'équipe"
                    />
                    <button 
                      onClick={addTeamMember}
                      className="add-member-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="team-members-preview">
                    {newProject.team.map((member, index) => (
                      <span key={index} className="team-member-tag">
                        {member}
                        <button 
                          onClick={() => removeTeamMember(member)}
                          className="remove-member"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Fichiers</label>
                  <div className="file-upload-area">
                    <Upload size={24} className="upload-icon" />
                    <p className="upload-text">Glissez-déposez vos fichiers ou</p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="file-input"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="upload-btn">
                      Parcourir
                    </label>
                  </div>
                  <div className="uploaded-files">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="uploaded-file">
                        <FileText size={14} />
                        <span className="file-name">{file.name}</span>
                        <button 
                          onClick={() => removeFile(file.name)}
                          className="remove-file"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Statut</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                    className="form-select"
                  >
                    <option value="planifié">Planifié</option>
                    <option value="en cours">En cours</option>
                    <option value="terminé">Terminé</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  onClick={() => setShowAddProject(false)}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button 
                  onClick={addProject}
                  className="btn-primary"
                  disabled={!newProject.name || !newProject.startDate || !newProject.endDate}
                >
                  Créer le projet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}