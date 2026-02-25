function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

function CircleProgress({ progress, mode }) {
    const size = 280;
    const stroke = 6;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress);

    const colors = {
        focus: "#e2b714",
        shortBreak: "#4ecca3",
        longBreak: "#7c83fd",
    };

    return (
        <svg width={size} height={size} className="timer-svg">
            {/* track */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#2c2e31"
                strokeWidth={stroke}
            />
            {/* progress */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={colors[mode]}
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.5s ease" }}
            />
        </svg>
    );
}

export default function Timer({ timeLeft, running, progress, mode, onToggle, onReset, sessionCount }) {
    const modeLabel = {
        focus: "Focus",
        shortBreak: "Short Break",
        longBreak: "Long Break",
    };
    
    return (
        <div className="timer-wrapper">
            <div className="timer-circle">
                <CircleProgress progress={progress} mode={mode} />
                <div className="timer-inner">
                    <span className="timer-mode-label">{modeLabel[mode]}</span>
                    <span className="timer-time">{formatTime(timeLeft)}</span>
                    <span className="timer-session">#{sessionCount + 1}</span>
                </div>
            </div>
    
            <div className="timer-controls">
                <button className="ctrl-btn" onClick={onReset} title="Reset">
                    <i className="bi bi-arrow-counterclockwise" />
                </button>
                <button className={`ctrl-btn play-btn ${running ? "running" : ""}`} onClick={onToggle}>
                    <i className={`bi ${running ? "bi-pause-fill" : "bi-play-fill"}`} />
                </button>
                <button className="ctrl-btn" onClick={() => {}} title="Skip">
                    <i className="bi bi-skip-forward-fill" />
                </button>
            </div>
        </div>
    );
}