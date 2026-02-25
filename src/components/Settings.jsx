import { useState } from "react";

function MinuteInput({ label, value, onChange }) {
  const minutes = Math.floor(value / 60);
  return (
    <div className="setting-item">
      <label className="setting-label">{label}</label>
      <div className="setting-input-row">
        <button onClick={() => onChange(Math.max(1, minutes - 1) * 60)}>
          <i className="bi bi-dash" />
        </button>
        <span className="setting-value">{minutes}m</span>
        <button onClick={() => onChange(Math.min(60, minutes + 1) * 60)}>
          <i className="bi bi-plus" />
        </button>
      </div>
    </div>
  );
}

export default function Settings({ config, onUpdate, onClose }) {
    return (
        <div className="settings-overlay" onClick={onClose}>
            <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
                <div className="settings-header">
                    <h3>Settings</h3>
                    <button className="settings-close" onClick={onClose}>
                        <i className="bi bi-x-lg" />
                    </button>
                </div>

                <div className="settings-body">
                    <MinuteInput
                        label="Focus"
                        value={config.focus}
                        onChange={(v) => onUpdate("focus", v)}
                    />
                    <MinuteInput
                        label="Short Break"
                        value={config.shortBreak}
                        onChange={(v) => onUpdate("shortBreak", v)}
                    />
                    <MinuteInput
                        label="Long Break"
                        value={config.longBreak}
                        onChange={(v) => onUpdate("longBreak", v)}
                    />

                    <div className="setting-item">
                        <label className="setting-label">Auto Switch</label>
                        <button
                        className={`toggle-switch ${config.autoSwitch ? "on" : ""}`}
                        onClick={() => onUpdate("autoSwitch", !config.autoSwitch)}
                        >
                            <span className="toggle-knob" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}