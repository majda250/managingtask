
import React, { useState, useEffect } from 'react';
import {
    Check,
    X,
    Calendar,
    Clock,
    Plus,
    Trash2
} from "lucide-react";
import "../CSS/home.css";

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskCategory, setNewTaskCategory] = useState("today");

    const categories = [
        { id: "today", name: "Aujourd'hui", color: "#3b82f6" },
        { id: "planned", name: "Planifié", color: "#f59e0b" },
        { id: "ideas", name: "Idées", color: "#10b981" },
    ];

    const user = { id: 1 }; // comme ton code original

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch(`http://localhost:5003/api/tasks/${user.id}`);
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error("Erreur fetch:", err);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async () => {
        if (!newTaskTitle.trim()) return;

        try {
            const res = await fetch("http://localhost:5003/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: newTaskTitle,
                    category: newTaskCategory,
                    user_id: user.id,
                }),
            });

            if (res.ok) {
                const { task } = await res.json();
                setTasks((prev) => [...prev, task]);
                setNewTaskTitle("");
            }
        } catch (err) {
            console.error("Erreur ajout tâche:", err);
        }
    };

    const toggleStatus = async (task) => {
        const newStatus = task.status === "terminé" ? "à faire" : "terminé";

        try {
            await fetch(`http://localhost:5003/api/tasks/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            setTasks((prev) =>
                prev.map((t) =>
                    t.id === task.id ? { ...t, status: newStatus } : t
                )
            );
        } catch (err) {
            console.error("Erreur update:", err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:5003/api/tasks/${id}`, {
                method: "DELETE",
            });

            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error("Erreur suppression:", err);
        }
    };

    return (
        <div className="task-home-container">
            
            {/* HEADER */}
            <header className="task-header">
                <h1 className="task-title">Tableau de tâches</h1>
            </header>

            {/* FORMULAIRE AJOUT */}
            <div className="add-task-bar">
                <input
                    className="add-task-input"
                    type="text"
                    placeholder="Ajouter une nouvelle tâche..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTask()}
                />

                <select
                    className="add-task-select"
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                >
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <button className="add-task-btn" onClick={addTask}>
                    <Plus size={18} />
                    Ajouter
                </button>
            </div>

            {/* GRID DES COLONNES */}
            <div className="task-grid">
                {categories.map((cat) => (
                    <div className="task-column" key={cat.id}>
                        
                        <div className="task-column-header">
                            <h2 style={{ color: cat.color }}>{cat.name}</h2>
                        </div>

                        <div className="task-list">
                            {tasks
                                .filter((t) => t.category === cat.id)
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        className={`task-card ${
                                            task.status === "terminé" ? "task-done" : ""
                                        }`}
                                    >
                                        <div className="task-card-top">
                                            <button
                                                className={`task-check ${
                                                    task.status === "terminé" ? "checked" : ""
                                                }`}
                                                onClick={() => toggleStatus(task)}
                                            >
                                                <Check size={16} />
                                            </button>

                                            <p className="task-card-title">{task.title}</p>
                                        </div>

                                        <div className="task-card-bottom">
                                            <button
                                                className="task-delete-btn"
                                                onClick={() => deleteTask(task.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            {tasks.filter((t) => t.category === cat.id).length === 0 && (
                                <p className="task-empty">Aucune tâche</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}