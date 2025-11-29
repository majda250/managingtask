
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, ChevronLeft, ChevronRight, Calendar, Clock, Check, X, Star, Filter } from 'lucide-react';
import '../CSS/Calendar.css';

export default function ModernCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({
    [new Date().toDateString()]: [
      
    ]
  });
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('moyenne');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [viewMode, setViewMode] = useState('month'); // month, week, day

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const days = [];
    
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString()
      });
    }
    
    const totalCells = 42;
    let nextMonthDay = 1;
    while (days.length < totalCells) {
      days.push({
        date: new Date(year, month + 1, nextMonthDay),
        isCurrentMonth: false,
        isToday: false
      });
      nextMonthDay++;
    }
    
    return days;
  };

  const addTask = () => {
    if (newTaskText.trim() && selectedDate) {
      const dateKey = selectedDate.toDateString();
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
        priority: newTaskPriority,
        time: newTaskTime
      };
      
      setTasks({
        ...tasks,
        [dateKey]: [...(tasks[dateKey] || []), newTask]
      });
      
      setNewTaskText('');
      setNewTaskTime('');
      setNewTaskPriority('moyenne');
    }
  };

  const toggleTaskCompletion = (dateKey, taskId) => {
    setTasks({
      ...tasks,
      [dateKey]: tasks[dateKey].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    });
  };

  const deleteTask = (dateKey, taskId) => {
    setTasks({
      ...tasks,
      [dateKey]: tasks[dateKey].filter(task => task.id !== taskId)
    });
  };

  const days = getDaysInMonth();
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const selectedDateTasks = tasks[selectedDate.toDateString()] || [];
  const filteredTasks = filterPriority === 'all' 
    ? selectedDateTasks 
    : selectedDateTasks.filter(task => task.priority === filterPriority);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <div className="calendar-header-left">
          <h1 className="calendar-title">
            <Calendar size={32} />
            Calendrier
          </h1>
          
          <div className="calendar-month-navigation">
            <button onClick={goToPreviousMonth} className="calendar-nav-btn">
              <ChevronLeft size={20} />
            </button>
            <span className="calendar-current-month-text">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button onClick={goToNextMonth} className="calendar-nav-btn">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="calendar-header-right">
          <div className="calendar-view-mode-toggle">
            <button 
              className={`calendar-view-mode-btn ${viewMode === 'month' ? 'active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              Mois
            </button>
            <button 
              className={`calendar-view-mode-btn ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => setViewMode('week')}
            >
              Semaine
            </button>
            <button 
              className={`calendar-view-mode-btn ${viewMode === 'day' ? 'active' : ''}`}
              onClick={() => setViewMode('day')}
            >
              Jour
            </button>
          </div>

          <select 
            className="calendar-filter-btn"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">Toutes priorités</option>
            <option value="haute">Haute</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>
        </div>
      </div>

      <div className="calendar-main">
        <div className="calendar-grid-container">
          <div className="calendar-weekdays-header">
            {dayNames.map(day => (
              <div key={day} className="calendar-weekday">{day}</div>
            ))}
          </div>

          <div className="calendar-days-grid">
            {days.map((day, index) => {
              const dateKey = day.date.toDateString();
              const dayTasks = tasks[dateKey] || [];
              
              return (
                <div
                  key={index}
                  className={`calendar-day-cell ${
                    !day.isCurrentMonth ? 'other-month' : ''
                  } ${day.isToday ? 'today' : ''} ${
                    selectedDate && selectedDate.toDateString() === dateKey ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  <div className="calendar-day-number">
                    {day.date.getDate()}
                    {dayTasks.length > 0 && (
                      <div className="calendar-task-dots">
                        {dayTasks.slice(0, 3).map(task => (
                          <div key={task.id} className={`calendar-task-dot ${task.priority}`} />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="calendar-day-tasks-mini">
                    {dayTasks.slice(0, 2).map(task => (
                      <div
                        key={task.id}
                        className={`calendar-mini-task ${task.completed ? 'completed' : ''}`}
                      >
                        {task.text}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="calendar-more-tasks-indicator">
                        +{dayTasks.length - 2} autres
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="calendar-sidebar-panel">
          <div className="calendar-sidebar-header">
            <h2 className="calendar-selected-date-title">
              {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
            </h2>
            <p className="calendar-selected-date-subtitle">
              <Clock size={14} />
              {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long' })}
            </p>
          </div>

          <div className="calendar-tasks-section">
            {filteredTasks.length === 0 ? (
              <div className="calendar-empty-state">
                <Calendar className="calendar-empty-state-icon" />
                <p className="calendar-empty-state-text">
                  Aucune tâche pour cette journée
                </p>
              </div>
            ) : (
              <div className="calendar-tasks-list">
                {filteredTasks.map(task => (
                  <div key={task.id} className={`calendar-task-item priority-${task.priority}`}>
                    <div 
                      className={`calendar-task-checkbox ${task.completed ? 'checked' : ''}`}
                      onClick={() => toggleTaskCompletion(selectedDate.toDateString(), task.id)}
                    >
                      {task.completed && <Check size={14} />}
                    </div>
                    
                    <div className="calendar-task-content">
                      <div className={`calendar-task-text ${task.completed ? 'completed' : ''}`}>
                        {task.text}
                      </div>
                      <div className="calendar-task-meta">
                        {task.time && (
                          <span className="calendar-task-time">
                            <Clock size={12} />
                            {task.time}
                          </span>
                        )}
                        <span className={`calendar-task-priority-badge ${task.priority}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    <div className="calendar-task-actions">
                      <button
                        onClick={() => deleteTask(selectedDate.toDateString(), task.id)}
                        className="calendar-task-action-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="calendar-add-task-form">
            <div className="calendar-task-input-wrapper">
              <input
                type="text"
                placeholder="Nouvelle tâche..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                className="calendar-task-input"
              />
            </div>

            <div className="calendar-task-options">
              <input
                type="time"
                value={newTaskTime}
                onChange={(e) => setNewTaskTime(e.target.value)}
                className="calendar-task-option-select"
              />
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="calendar-task-option-select"
              >
                <option value="basse">Basse</option>
                <option value="moyenne">Moyenne</option>
                <option value="haute">Haute</option>
              </select>
            </div>

            <button onClick={addTask} className="calendar-add-task-btn">
              <Plus size={18} />
              Ajouter la tâche
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}