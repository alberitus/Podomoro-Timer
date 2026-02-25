# 🍅 Pomodoro Timer

A clean, minimal Pomodoro Timer app built with **React 18** + **Vite**. Stay focused and productive with customizable sessions, task management, and session statistics.

## ✨ Features

- ⏱️ Three timer modes — **Focus**, **Short Break**, **Long Break**
- 🔄 Auto-switch between modes after each session
- 📋 Task list — add, complete, and delete tasks
- 📊 Session stats — track today's and total completed sessions
- ⚙️ Customizable timer durations and long break interval
- 🔔 Audio notification when a session ends
- 🎨 Dynamic theme that changes per mode

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **Bootstrap Icons**
- **Web Audio API** (for sound notifications)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/username/pomodoro-timer.git
cd pomodoro-timer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── Timer.jsx          # Countdown timer with progress ring
│   ├── ModeSelector.jsx   # Switch between Focus / Short Break / Long Break
│   ├── TaskList.jsx       # Add, complete, and delete tasks
│   ├── Stats.jsx          # Session statistics display
│   └── Settings.jsx       # Configure timer durations and preferences
├── hooks/
│   └── usePomodoro.js     # Core timer logic and state management
├── App.jsx
├── App.css
└── index.css
```

## ⚙️ Default Configuration

| Setting | Default |
|---|---|
| Focus duration | 25 minutes |
| Short break | 5 minutes |
| Long break | 15 minutes |
| Long break interval | Every 4 sessions |
| Auto-switch | Enabled |

## 🎮 How to Use

1. Click **Start** to begin a focus session
2. Take a break when the timer finishes — it auto-switches!
3. Add **tasks** to keep track of what you're working on
4. Check **stats** to see how many sessions you've completed
5. Open **Settings** (⚙️) to customize durations to your liking
