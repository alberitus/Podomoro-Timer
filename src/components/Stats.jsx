export default function Stats({ stats, sessionCount }) {
    return (
        <div className="stats-bar">
            <div className="stat-item">
                <i className="bi bi-fire" />
                <span>{stats.today} today</span>
            </div>
            <div className="stat-divider" />
                <div className="stat-item">
                    <i className="bi bi-trophy" />
                    <span>{stats.total} total</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                <i className="bi bi-hourglass-split" />
                <span>Session #{sessionCount + 1}</span>
            </div>
        </div>
    );
}