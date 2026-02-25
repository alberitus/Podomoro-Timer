import { useState } from "react";
import "./index.css";
import { usePomodoro } from "./hooks/usePomodoro";
import Timer from "./components/Timer";
import ModeSelector from "./components/ModeSelector";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";
import Settings from "./components/Settings";

export default function App() {
  const pomo = usePomodoro();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={`app mode-${pomo.mode}`}>
      <header className="header">
        <div className="logo">pomodoro</div>
        <button className="icon-btn" onClick={() => setShowSettings(true)}>
          <i className="bi bi-gear" />
        </button>
      </header>

      <main className="main">
        <ModeSelector mode={pomo.mode} onSwitch={pomo.switchMode} />

        <Timer
          timeLeft={pomo.timeLeft}
          running={pomo.running}
          progress={pomo.progress}
          mode={pomo.mode}
          sessionCount={pomo.sessionCount}
          onToggle={pomo.toggle}
          onReset={pomo.reset}
          onSkip={() => pomo.switchMode(
            pomo.mode === "focus" ? "shortBreak" : "focus"
          )}
        />

        <Stats stats={pomo.stats} sessionCount={pomo.sessionCount} />

        <TaskList
          tasks={pomo.tasks}
          onAdd={pomo.addTask}
          onToggle={pomo.toggleTask}
          onDelete={pomo.deleteTask}
        />
      </main>

      {showSettings && (
        <Settings
          config={pomo.config}
          onUpdate={pomo.updateConfig}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}