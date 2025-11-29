# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# TaskFlow - Gestion de tâches et projets

TaskFlow est une application web de gestion de tâches et de projets. Elle permet aux utilisateurs de gérer leurs tâches quotidiennes et de suivre l’avancement de projets en équipe.

---

## 🚀 Fonctionnalités

- Authentification (connexion / inscription).  
- Création, modification et suppression de projets.  
- Ajout de membres à un projet et gestion de l’équipe.  
- Ajout, modification et suppression de tâches par utilisateur.  
- Barre de progression des projets.  
- Gestion des fichiers attachés aux projets.  
- Interface moderne avec React et composants Lucide-React.  

---

## 📂 Structure du projet

/frontend
├─ src/
│ ├─ components/ # Composants React (Home,calendar, Projects, Authentification)
│ ├─ CSS/ # Styles CSS
│ └─ App.jsx
/backend
├─ routes/
│ ├─ project.js # Routes API projets
│ ├─ tasks.js # Routes API tâches
│ └─ calendar.js # Routes API calendrier
├─ configuration/
│ └─ database.js # Configuration de la base de données
└─ server.js # Serveur Express


## 🛠 Installation et lancement

### Prérequis

- Node.js >= 18  
- npm ou yarn  

### Lancer le backend
```bash
npm run dev 

### Lancer le backend
```bash
npm run dev 