import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Calendar, Check, Github } from 'lucide-react';
import '../CSS/Authentification.css';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const endpoint = isLogin ? 'login' : 'register';
    const response = await fetch(`http://localhost:5003/api/tasks/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Succès:', data);
      
      // ✅ IMPORTANT: Sauvegarder l'utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Rediriger vers la page home
      navigate('/');
    } else {
      console.log('Erreur:', data.error);
      alert(data.error);
    }
  } catch (error) {
    console.log('Erreur réseau:', error);
    alert('Erreur de connexion au serveur');
  }
};
  
  

  const handleGoogleAuth = () => {
    // Intégration Google OAuth
    console.log('Authentification Google');
    // Redirection temporaire pour la démo
    navigate('/home');
  };

  const handleGithubAuth = () => {
    // Intégration GitHub OAuth
    console.log('Authentification GitHub');
    // Redirection temporaire pour la démo
    navigate('/home');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-blob blob-1"></div>
        <div className="auth-blob blob-2"></div>
        <div className="auth-blob blob-3"></div>
      </div>

      <div className="auth-card">
        
        <div className="auth-header">
          <div className="auth-logo">
            <Calendar size={32} className="logo-icon" />
            <span className="logo-text">TaskFlow</span>
          </div>
          <h1 className="auth-title">
            {isLogin ? 'Content de vous revoir' : 'Rejoignez-nous'}
          </h1>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Connectez-vous à votre compte pour continuer' 
              : 'Créez votre compte pour commencer'
            }
          </p>
        </div>

        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <div className="input-container">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  className="auth-input"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <div className="input-container">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Adresse email"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-container">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span className="checkbox-checkmark">
                  <Check size={12} />
                </span>
                <span className="checkbox-label">Se souvenir de moi</span>
              </label>
              <button type="button" className="forgot-password">
                Mot de passe oublié ?
              </button>
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Se connecter' : 'Créer un compte'}
          </button>
        </form>

      
        <div className="auth-separator">
          <span className="separator-text">Ou continuer avec</span>
        </div>

        
        <div className="oauth-buttons">
          <button 
            type="button" 
            onClick={handleGoogleAuth}
            className="oauth-btn google-btn"
          >
            <svg className="oauth-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          <button 
            type="button" 
            onClick={handleGithubAuth}
            className="oauth-btn github-btn"
          >
            <Github size={18} className="oauth-icon" />
            GitHub
          </button>
        </div>

      
        <div className="auth-switch">
          <p className="switch-text">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)}
              className="switch-btn"
            >
              {isLogin ? 'Créer un compte' : 'Se connecter'}
            </button>
          </p>
        </div>

        
        
      </div>
    </div>
  );
}


