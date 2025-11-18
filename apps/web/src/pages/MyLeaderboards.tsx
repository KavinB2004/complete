import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./css/MyLeaderboards.css";

export default function MyLeaderboards() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };
  
  // Mock data - will be replaced with Firebase data
  const leaderboards = [
    {
      id: 1,
      name: "50 Workouts in 30 Days",
      goal: 50,
      daysLeft: 12,
      reward: "Winner picks next challenge",
      punishment: "Last place buys pizza",
      standings: [
        { rank: 1, username: "sarah_codes", completions: 47, percentage: 94 },
        { rank: 2, username: "you", completions: 23, percentage: 46 },
        { rank: 3, username: "alex_workout", completions: 19, percentage: 38 },
        { rank: 4, username: "mike_runner", completions: 15, percentage: 30 },
        { rank: 5, username: "emma_reads", completions: 12, percentage: 24 },
        { rank: 6, username: "john_lifts", completions: 8, percentage: 16 },
        { rank: 7, username: "lisa_yoga", completions: 6, percentage: 12 },
        { rank: 8, username: "tom_swims", completions: 3, percentage: 6 },
      ],
    },
    {
      id: 2,
      name: "100 LeetCode Problems",
      goal: 100,
      daysLeft: 45,
      reward: "$50 Amazon gift card",
      punishment: "Post embarrassing story",
      standings: [
        { rank: 1, username: "you", completions: 47, percentage: 47 },
        { rank: 2, username: "alex_workout", completions: 42, percentage: 42 },
        { rank: 3, username: "sarah_codes", completions: 38, percentage: 38 },
        { rank: 4, username: "mike_runner", completions: 28, percentage: 28 },
        { rank: 5, username: "emma_reads", completions: 15, percentage: 15 },
      ],
    },
    {
      id: 3,
      name: "Daily 10K Steps",
      goal: 30,
      daysLeft: 12,
      reward: "Bragging rights",
      punishment: "Do everyone's chores",
      standings: [
        { rank: 1, username: "mike_runner", completions: 28, percentage: 93 },
        { rank: 2, username: "sarah_codes", completions: 25, percentage: 83 },
        { rank: 3, username: "alex_workout", completions: 22, percentage: 73 },
        { rank: 4, username: "you", completions: 18, percentage: 60 },
        { rank: 5, username: "emma_reads", completions: 16, percentage: 53 },
        { rank: 6, username: "john_lifts", completions: 12, percentage: 40 },
        { rank: 7, username: "lisa_yoga", completions: 10, percentage: 33 },
        { rank: 8, username: "tom_swims", completions: 8, percentage: 27 },
        { rank: 9, username: "amy_hikes", completions: 5, percentage: 17 },
        { rank: 10, username: "dave_bikes", completions: 4, percentage: 13 },
        { rank: 11, username: "kate_runs", completions: 3, percentage: 10 },
        { rank: 12, username: "paul_climbs", completions: 1, percentage: 3 },
      ],
    },
    {
      id: 4,
      name: "Read 20 Books",
      goal: 20,
      daysLeft: 90,
      reward: "Book club champion",
      punishment: "Write book report for winner",
      standings: [
        { rank: 1, username: "emma_reads", completions: 12, percentage: 60 },
        { rank: 2, username: "sarah_codes", completions: 10, percentage: 50 },
        { rank: 3, username: "you", completions: 8, percentage: 40 },
        { rank: 4, username: "alex_workout", completions: 6, percentage: 30 },
        { rank: 5, username: "mike_runner", completions: 4, percentage: 20 },
        { rank: 6, username: "john_lifts", completions: 2, percentage: 10 },
      ],
    },
  ];

  const [currentLeaderboardIndex, setCurrentLeaderboardIndex] = useState(0);
  const currentLeaderboard = leaderboards[currentLeaderboardIndex];

  const handlePrevious = () => {
    setCurrentLeaderboardIndex((prev) => 
      prev === 0 ? leaderboards.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentLeaderboardIndex((prev) => 
      prev === leaderboards.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="my-leaderboards-container">
      {/* Header/Navigation */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-logo">💪 Complete</h1>
          <nav className="dashboard-nav">
            <button className="nav-btn" onClick={() => navigate("/app")}>
              Dashboard
            </button>
            <button className="nav-btn active">My Leaderboards</button>
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

      <div className="my-leaderboards-content">
        {/* Navigation Arrows */}
        <div className="leaderboard-navigation">
          <button className="nav-arrow" onClick={handlePrevious}>
            ←
          </button>
          <div className="leaderboard-selector">
            <h2 className="leaderboard-main-title">{currentLeaderboard.name}</h2>
            <div className="leaderboard-counter">
              {currentLeaderboardIndex + 1} of {leaderboards.length}
            </div>
          </div>
          <button className="nav-arrow" onClick={handleNext}>
            →
          </button>
        </div>

        {/* Leaderboard Info */}
        <div className="leaderboard-info-section">
          <div className="info-card">
            <div className="info-icon">🎯</div>
            <div className="info-content">
              <div className="info-label">Goal</div>
              <div className="info-value">{currentLeaderboard.goal} completions</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">⏰</div>
            <div className="info-content">
              <div className="info-label">Time Left</div>
              <div className="info-value">{currentLeaderboard.daysLeft} days</div>
            </div>
          </div>
          <div className="info-card reward-card">
            <div className="info-icon">🏆</div>
            <div className="info-content">
              <div className="info-label">Winner's Reward</div>
              <div className="info-value">{currentLeaderboard.reward}</div>
            </div>
          </div>
          <div className="info-card punishment-card">
            <div className="info-icon">😅</div>
            <div className="info-content">
              <div className="info-label">Last Place</div>
              <div className="info-value">{currentLeaderboard.punishment}</div>
            </div>
          </div>
        </div>

        {/* Standings */}
        <div className="standings-section">
          <h3 className="standings-title">Complete Standings</h3>
          <div className="standings-list">
            {currentLeaderboard.standings.map((standing) => (
              <div
                key={standing.rank}
                className={`standing-row ${standing.username === "you" ? "current-user" : ""} ${
                  standing.rank === 1 ? "first-place" : ""
                } ${
                  standing.rank === currentLeaderboard.standings.length ? "last-place" : ""
                }`}
              >
                <div className="standing-rank">
                  {standing.rank === 1 && "🥇"}
                  {standing.rank === 2 && "🥈"}
                  {standing.rank === 3 && "🥉"}
                  {standing.rank > 3 && `#${standing.rank}`}
                </div>
                <div className="standing-user">
                  <div className="standing-avatar">
                    {standing.username[0].toUpperCase()}
                  </div>
                  <div className="standing-username">
                    {standing.username === "you" ? "You" : standing.username}
                  </div>
                </div>
                <div className="standing-progress">
                  <div className="standing-stats">
                    <span className="standing-completions">
                      {standing.completions} / {currentLeaderboard.goal}
                    </span>
                    <span className="standing-percentage">{standing.percentage}%</span>
                  </div>
                  <div className="standing-bar">
                    <div
                      className="standing-fill"
                      style={{ width: `${standing.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
