import { useState, useRef, useCallback, useEffect } from "react";

const DEFAULT_CONFIG = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    longBreakInterval: 4,
    autoSwitch: true,
};

export function usePomodoro() {
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [mode, setMode] = useState("focus");
    const [timeLeft, setTimeLeft] = useState(DEFAULT_CONFIG.focus);
    const [running, setRunning] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ today: 0, total: 0 });

    const intervalRef = useRef(null);
    const audioCtxRef = useRef(null);

    const playSound = useCallback((type = "finish") => {
        try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtxRef.current = ctx;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        if (type === "finish") {
            oscillator.frequency.setValueAtTime(880, ctx.currentTime);
            oscillator.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.5);
        } else {
            oscillator.frequency.setValueAtTime(440, ctx.currentTime);
            gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.2);
        }
        } catch (e) {
        // audio not supported
        }
    }, []);

    const getNextMode = useCallback((currentMode, sessions) => {
        if (currentMode !== "focus") return "focus";
        const nextSession = sessions + 1;
        if (nextSession % config.longBreakInterval === 0) return "longBreak";
        return "shortBreak";
    }, [config.longBreakInterval]);

    const switchMode = useCallback((newMode) => {
        setMode(newMode);
        setTimeLeft(config[newMode]);
        setRunning(false);
        clearInterval(intervalRef.current);
    }, [config]);

    const handleFinish = useCallback(() => {
        clearInterval(intervalRef.current);
        setRunning(false);
        playSound("finish");

        if (mode === "focus") {
        const newCount = sessionCount + 1;
        setSessionCount(newCount);
        setStats((prev) => ({
            today: prev.today + 1,
            total: prev.total + 1,
        }));

        if (config.autoSwitch) {
            const next = getNextMode("focus", sessionCount);
            setTimeout(() => {
            setMode(next);
            setTimeLeft(config[next]);
            setRunning(true);
            }, 500);
        }
        } else {
        if (config.autoSwitch) {
            setTimeout(() => {
            setMode("focus");
            setTimeLeft(config.focus);
            setRunning(true);
            }, 500);
        }
        }
    }, [mode, sessionCount, config, playSound, getNextMode]);

    useEffect(() => {
        if (running) {
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
            if (prev <= 1) {
                clearInterval(intervalRef.current);
                handleFinish();
                return 0;
            }
            return prev - 1;
            });
        }, 1000);
        } else {
        clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [running, handleFinish]);

    const toggle = useCallback(() => {
        setRunning((prev) => !prev);
        playSound("tick");
    }, [playSound]);

    const reset = useCallback(() => {
        clearInterval(intervalRef.current);
        setRunning(false);
        setTimeLeft(config[mode]);
    }, [config, mode]);

    const updateConfig = useCallback((key, value) => {
        const newConfig = { ...config, [key]: value };
        setConfig(newConfig);
        if (key === mode) setTimeLeft(value);
    }, [config, mode]);

    const addTask = useCallback((text) => {
        setTasks((prev) => [...prev, { id: Date.now(), text, done: false }]);
    }, []);

    const toggleTask = useCallback((id) => {
        setTasks((prev) =>
        prev.map((t) => t.id === id ? { ...t, done: !t.done } : t)
        );
    }, []);

    const deleteTask = useCallback((id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const progress = 1 - timeLeft / config[mode];

    return {
        mode, timeLeft, running, sessionCount, progress,
        config, tasks, stats,
        toggle, reset, switchMode, updateConfig,
        addTask, toggleTask, deleteTask,
    };
}