import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Home, Folder, Calendar, User, Settings, Bell, Share2 } from 'lucide-react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Sidebar - Une seule fois */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">TaskFlow</h1>
          <p className="subtitle">Organisez votre journée</p>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            <Home size={18} />
            <span>Mon espace</span>
          </button>
          
          <button 
            className={`nav-button ${location.pathname === '/Project' ? 'active' : ''}`}
            onClick={() => navigate('/Project')}
          >
            <Folder size={18} />
            <span>Tous les projets</span>
          </button>
          
          <button 
            className={`nav-button ${location.pathname === '/Calendar' ? 'active' : ''}`}
            onClick={() => navigate('/calendar')}
          >
            <Calendar size={18} />
            <span>Calendrier</span>
          </button>
        </nav>

        <button className="new-project-button">
          <Plus size={16} />
          <span>Nouveau projet</span>
        </button>
      </aside>

      {/* Contenu qui change selon la page */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}