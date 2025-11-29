import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManager from './pages/home'; 
import './App.css';
import Layout from './components/Layout';
import Calendar from './pages/Calendar';
import Project from './pages/Project'
import Authentifaction from './pages/Authentification'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TaskManager />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Project" element={<Project />} />
          <Route path="/Authentification" element={<Authentifaction />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;