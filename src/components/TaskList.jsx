import { useState } from "react";

export default function TaskList({ tasks, onAdd, onToggle, onDelete }) {
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (!input.trim()) return;
        onAdd(input.trim());
        setInput("");
    };

    return (
        <div className="tasklist">
            <h3 className="tasklist-title">
                <i className="bi bi-list-check" /> Tasks
            </h3>

            <div className="tasklist-input-row">
                <input
                className="tasklist-input"
                placeholder="Add a task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
                <button className="tasklist-add-btn" onClick={handleAdd}>
                    <i className="bi bi-plus-lg" />
                </button>
            </div>

            <ul className="tasklist-list">
                {tasks.length === 0 && (
                    <li className="tasklist-empty">No tasks yet. Add one above!</li>
                )}
                {tasks.map((task) => (
                    <li key={task.id} className={`tasklist-item ${task.done ? "done" : ""}`}>
                        <button className="task-check" onClick={() => onToggle(task.id)}>
                            <i className={`bi ${task.done ? "bi-check-circle-fill" : "bi-circle"}`} />
                        </button>
                        <span className="task-text">{task.text}</span>
                        <button className="task-delete" onClick={() => onDelete(task.id)}>
                            <i className="bi bi-x" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}