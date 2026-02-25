export default function ModeSelector({ mode, onSwitch }) {
    const modes = [
        { key: "focus", label: "Focus" },
        { key: "shortBreak", label: "Short Break" },
        { key: "longBreak", label: "Long Break" },
    ];

    return (
        <div className="mode-selector">
            {modes.map((m) => (
            <button
                key={m.key}
                className={`mode-btn ${mode === m.key ? "active" : ""}`}
                onClick={() => onSwitch(m.key)}
            >
                {m.label}
            </button>
            ))}
        </div>
    );
}