import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./css/Dashboard_Dark.css";

export default function Dashboard() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [viewMode, setViewMode] = useState(false)

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  // Mock data - will be replaced with real data later
  const activeLeaderboards = [
    {
      id: 1,
      name: "50 Workouts in 30 Days",
      progress: 23,
      goal: 50,
      rank: 2,
      participants: 8,
      daysLeft: 12,
      reward: "Winner picks next challenge",
      punishment: "Last place buys pizza",
    },
    {
      id: 2,
      name: "100 LeetCode Problems",
      progress: 47,
      goal: 100,
      rank: 1,
      participants: 5,
      daysLeft: 45,
      reward: "$50 Amazon gift card",
      punishment: "Post embarrassing story",
    },
    {
      id: 3,
      name: "Daily 10K Steps",
      progress: 18,
      goal: 30,
      rank: 4,
      participants: 12,
      daysLeft: 12,
      reward: "Bragging rights",
      punishment: "Do everyone's chores",
    },
    {
      id: 4,
      name: "Read 20 Books",
      progress: 8,
      goal: 20,
      rank: 3,
      participants: 6,
      daysLeft: 90,
      reward: "Book club champion",
      punishment: "Write book report for winner",
    },
  ];

  // Find biggest opponent (person right above you in highest ranking leaderboard)
  const biggestOpp = {
    name: "Sarah K.",
    leaderboard: "100 LeetCode Problems",
    position: "1st place",
    yourPosition: "2nd place",
  };

  const recentActivity = [
    { user: "Alex M.", action: "completed workout #45", leaderboard: "50 Workouts", time: "2 hours ago" },
    { user: "Sarah K.", action: "solved 3 problems", leaderboard: "100 LeetCode", time: "5 hours ago" },
    { user: "You", action: "logged 10,234 steps", leaderboard: "Daily 10K Steps", time: "Yesterday" },
  ];

  return (
    <div className="dashboard-container">
      {/* Header/Navigation */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-logo" onClick={() => navigate("/")}>💪 Complete</h1>
          <nav className="dashboard-nav">
            <button className="nav-btn active">Dashboard</button>
            <button className="nav-btn" onClick={() => navigate("/my-leaderboards")}>
              My Leaderboards
            </button>
          </nav>
          <div className="header-actions">
            <button className="friends-btn" onClick={() => navigate("/friends")}>
              👥 Friends
            </button>
            <button className="create-btn" onClick={() => navigate("/create-leaderboard")}>
              + Create Leaderboard
            </button>
            <div className="user-menu">
              <button className="user-btn" onClick={() => setShowMenu(!showMenu)}>
                <div className="user-avatar">{user?.email?.[0].toUpperCase()}</div>
              </button>
              {showMenu && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">{user?.email}</div>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item" onClick={() => navigate("/profile")}>
                    Profile
                  </button>
                  <button className="dropdown-item" onClick={() => navigate("/settings")}>
                    Settings
                  </button>
                  <button className="dropdown-item" onClick={() => setViewMode(true)}>
                    Dark Mode
                  </button>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h2 className="welcome-title">Welcome back, {user?.email?.split("@")[0]}! 👋</h2>
          <p className="welcome-subtitle">You're competing in {activeLeaderboards.length} challenges</p>
        </section>

        {/* Two Column Layout */}
        <div className="dashboard-grid">
          {/* Left Column - Stats Cards */}
          <section className="stats-section">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <div className="stat-value">2</div>
                <div className="stat-label">1st Place Positions</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-value">88</div>
                <div className="stat-label">Total Completions</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-content">
                <div className="stat-value">12</div>
                <div className="stat-label">Day Streak</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <div className="stat-value">{activeLeaderboards.length}</div>
                <div className="stat-label">Active Challenges</div>
              </div>
            </div>

            {/* Biggest Opp Section */}
            <div className="biggest-opp-card">
              <div className="opp-header">
                <span className="opp-title">💀 Biggest Opp</span>
              </div>
              <div className="opp-content">
                <div className="opp-avatar">{biggestOpp.name[0]}</div>
                <div className="opp-info">
                  <div className="opp-name">{biggestOpp.name}</div>
                  <div className="opp-position">
                    {biggestOpp.position} • {biggestOpp.leaderboard}
                  </div>
                  <div className="opp-status">You're in {biggestOpp.yourPosition}</div>
                </div>
              </div>
              <button className="trash-talk-btn">💬 Talk Trash</button>
            </div>
          </section>

          {/* Right Column - Active Leaderboards */}
          <section className="leaderboards-section">
            <div className="section-header">
              <h3 className="section-title">Your Active Leaderboards</h3>
              <button className="view-all-btn" onClick={() => navigate("/my-leaderboards")}>View All →</button>
            </div>
            <div className="leaderboards-grid">
              {activeLeaderboards.map((board) => (
                <div key={board.id} className="leaderboard-card">
                  <div className="leaderboard-header">
                    <h4 className="leaderboard-name">{board.name}</h4>
                    <span className={`rank-badge rank-${board.rank}`}>#{board.rank}</span>
                  </div>
                  
                  <div className="progress-section">
                    <div className="progress-info">
                      <span className="progress-text">
                        {board.progress} / {board.goal}
                      </span>
                      <span className="progress-percentage">
                        {Math.round((board.progress / board.goal) * 100)}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${(board.progress / board.goal) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="leaderboard-meta">
                    <div className="meta-item">
                      <span className="meta-icon">👥</span>
                      <span className="meta-text">{board.participants} participants</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">⏰</span>
                      <span className="meta-text">{board.daysLeft} days left</span>
                    </div>
                  </div>

                  <div className="leaderboard-rewards">
                    <div className="reward-item">
                      <span className="reward-label">🏆 Reward:</span>
                      <span className="reward-text">{board.reward}</span>
                    </div>
                    <div className="reward-item punishment">
                      <span className="reward-label">😅 Last Place:</span>
                      <span className="reward-text">{board.punishment}</span>
                    </div>
                  </div>

                  <button className="view-leaderboard-btn">View Leaderboard</button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Recent Activity */}
        <section className="activity-section">
          <h3 className="section-title">Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-avatar">
                  {activity.user === "You" ? user?.email?.[0].toUpperCase() : activity.user[0]}
                </div>
                <div className="activity-content">
                  <p className="activity-text">
                    <span className="activity-user">{activity.user}</span> {activity.action}
                  </p>
                  <p className="activity-meta">
                    {activity.leaderboard} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
