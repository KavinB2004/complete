import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./css/MyLeaderboards_Dark.css";

export default function MyLeaderboards() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);

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
      manager: "you",
      standings: [
        { rank: 1, username: "sarah_codes", completions: 47, percentage: 94, streak: 15, daysSinceCompletion: 0, participationDays: 28 },
        { rank: 2, username: "you", completions: 23, percentage: 46, streak: 8, daysSinceCompletion: 0, participationDays: 20 },
        { rank: 3, username: "alex_workout", completions: 19, percentage: 38, streak: 5, daysSinceCompletion: 1, participationDays: 18 },
        { rank: 4, username: "mike_runner", completions: 15, percentage: 30, streak: 3, daysSinceCompletion: 2, participationDays: 15 },
        { rank: 5, username: "emma_reads", completions: 12, percentage: 24, streak: 2, daysSinceCompletion: 3, participationDays: 12 },
        { rank: 6, username: "john_lifts", completions: 8, percentage: 16, streak: 1, daysSinceCompletion: 4, participationDays: 8 },
        { rank: 7, username: "lisa_yoga", completions: 6, percentage: 12, streak: 2, daysSinceCompletion: 1, participationDays: 6 },
        { rank: 8, username: "tom_swims", completions: 3, percentage: 6, streak: 1, daysSinceCompletion: 5, participationDays: 3 },
      ],
    },
    {
      id: 2,
      name: "100 LeetCode Problems",
      goal: 100,
      daysLeft: 45,
      reward: "$50 Amazon gift card",
      punishment: "Post embarrassing story",
      manager: "sarah_codes",
      standings: [
        { rank: 1, username: "you", completions: 47, percentage: 47, streak: 12, daysSinceCompletion: 0, participationDays: 32 },
        { rank: 2, username: "alex_workout", completions: 42, percentage: 42, streak: 7, daysSinceCompletion: 1, participationDays: 28 },
        { rank: 3, username: "sarah_codes", completions: 38, percentage: 38, streak: 9, daysSinceCompletion: 0, participationDays: 30 },
        { rank: 4, username: "mike_runner", completions: 28, percentage: 28, streak: 4, daysSinceCompletion: 2, participationDays: 20 },
        { rank: 5, username: "emma_reads", completions: 15, percentage: 15, streak: 3, daysSinceCompletion: 3, participationDays: 15 },
      ],
    },
    {
      id: 3,
      name: "Daily 10K Steps",
      goal: 30,
      daysLeft: 12,
      reward: "Bragging rights",
      punishment: "Do everyone's chores",
      manager: "mike_runner",
      standings: [
        { rank: 1, username: "mike_runner", completions: 28, percentage: 93, streak: 18, daysSinceCompletion: 0, participationDays: 28 },
        { rank: 2, username: "sarah_codes", completions: 25, percentage: 83, streak: 14, daysSinceCompletion: 0, participationDays: 25 },
        { rank: 3, username: "alex_workout", completions: 22, percentage: 73, streak: 11, daysSinceCompletion: 1, participationDays: 22 },
        { rank: 4, username: "you", completions: 18, percentage: 60, streak: 8, daysSinceCompletion: 1, participationDays: 18 },
        { rank: 5, username: "emma_reads", completions: 16, percentage: 53, streak: 6, daysSinceCompletion: 2, participationDays: 16 },
        { rank: 6, username: "john_lifts", completions: 12, percentage: 40, streak: 4, daysSinceCompletion: 3, participationDays: 12 },
        { rank: 7, username: "lisa_yoga", completions: 10, percentage: 33, streak: 5, daysSinceCompletion: 0, participationDays: 10 },
        { rank: 8, username: "tom_swims", completions: 8, percentage: 27, streak: 2, daysSinceCompletion: 4, participationDays: 8 },
        { rank: 9, username: "amy_hikes", completions: 5, percentage: 17, streak: 1, daysSinceCompletion: 5, participationDays: 5 },
        { rank: 10, username: "dave_bikes", completions: 4, percentage: 13, streak: 1, daysSinceCompletion: 6, participationDays: 4 },
        { rank: 11, username: "kate_runs", completions: 3, percentage: 10, streak: 1, daysSinceCompletion: 7, participationDays: 3 },
        { rank: 12, username: "paul_climbs", completions: 1, percentage: 3, streak: 0, daysSinceCompletion: 10, participationDays: 1 },
      ],
    },
    {
      id: 4,
      name: "Read 20 Books",
      goal: 20,
      daysLeft: 90,
      reward: "Book club champion",
      punishment: "Write book report for winner",
      manager: "emma_reads",
      standings: [
        { rank: 1, username: "emma_reads", completions: 12, percentage: 60, streak: 20, daysSinceCompletion: 0, participationDays: 45 },
        { rank: 2, username: "sarah_codes", completions: 10, percentage: 50, streak: 15, daysSinceCompletion: 1, participationDays: 42 },
        { rank: 3, username: "you", completions: 8, percentage: 40, streak: 10, daysSinceCompletion: 2, participationDays: 38 },
        { rank: 4, username: "alex_workout", completions: 6, percentage: 30, streak: 7, daysSinceCompletion: 3, participationDays: 35 },
        { rank: 5, username: "mike_runner", completions: 4, percentage: 20, streak: 3, daysSinceCompletion: 5, participationDays: 30 },
        { rank: 6, username: "john_lifts", completions: 2, percentage: 10, streak: 1, daysSinceCompletion: 7, participationDays: 20 },
      ],
    },
    {
      id: 5,
      name: "Morning Meditation Challenge",
      goal: 30,
      daysLeft: 20,
      reward: "Zen master title",
      punishment: "Buy coffee for the group",
      manager: "lisa_yoga",
      standings: [
        { rank: 1, username: "you", completions: 15, percentage: 50, streak: 10, daysSinceCompletion: 0, participationDays: 20 },
        { rank: 2, username: "emma_reads", completions: 14, percentage: 47, streak: 9, daysSinceCompletion: 1, participationDays: 19 },
        { rank: 3, username: "sarah_codes", completions: 12, percentage: 40, streak: 7, daysSinceCompletion: 1, participationDays: 18 },
        { rank: 4, username: "mike_runner", completions: 10, percentage: 33, streak: 5, daysSinceCompletion: 2, participationDays: 16 },
        { rank: 5, username: "alex_workout", completions: 8, percentage: 27, streak: 3, daysSinceCompletion: 3, participationDays: 14 },
        { rank: 6, username: "john_lifts", completions: 5, percentage: 17, streak: 2, daysSinceCompletion: 4, participationDays: 10 },
        { rank: 7, username: "lisa_yoga", completions: 3, percentage: 10, streak: 2, daysSinceCompletion: 2, participationDays: 8 },
        { rank: 8, username: "tom_swims", completions: 1, percentage: 3, streak: 0, daysSinceCompletion: 8, participationDays: 3 },
      ],
    },
  ];

  const [currentLeaderboardIndex, setCurrentLeaderboardIndex] = useState(() => {
    const boardId = searchParams.get('id');
    if (boardId) {
      const boardIndex = leaderboards.findIndex(board => board.id === parseInt(boardId));
      return boardIndex !== -1 ? boardIndex : 0;
    }
    return 0;
  });
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

  const handleSelectBoard = (index: number) => {
    setCurrentLeaderboardIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragStart(e.clientX + scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    
    const carouselContainer = e.currentTarget;
    const newScrollLeft = dragStart - e.clientX;
    setScrollLeft(newScrollLeft);
    carouselContainer.scrollLeft = newScrollLeft;
  };

  return (
    <div className="my-leaderboards-container">
      {/* Header/Navigation */}
      <header className="dashboard-header">
        <div className="header-content">
          <img 
            src="/Complete Logo.png" 
            alt="Complete Logo" 
            className="dashboard-logo" 
            onClick={() => navigate("/")}
            style={{ cursor: 'pointer', height: '50px', width: 'auto' }}
          />
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
        {/* Leaderboard Carousel */}
        <div 
          className="leaderboard-carousel"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setDragStart(0)}
        >
          {leaderboards.map((board, index) => (
            <div
              key={board.id}
              className={`carousel-box ${currentLeaderboardIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentLeaderboardIndex(index)}
            >
              <div className="carousel-box-content">
                <span className="carousel-box-number">{index + 1}</span>
                <span className="carousel-box-title">{board.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Drag Indicator */}
        {leaderboards.length > 5 && (
          <div className="carousel-hint">
            📌 Drag to scroll through leaderboards
          </div>
        )}
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

        {/* Dropdown Selector */}
        <div className="dropdown-selector-container">
          <label className="dropdown-label">Or select a leaderboard:</label>
          <select 
            className="leaderboard-dropdown" 
            value={currentLeaderboardIndex}
            onChange={(e) => handleSelectBoard(Number(e.target.value))}
          >
            {leaderboards.map((board, index) => (
              <option key={board.id} value={index}>
                {board.name}
              </option>
            ))}
          </select>
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

        {/* Manager Edit Button */}
        {currentLeaderboard.manager === "you" && (
          <div className="manager-controls">
            <button 
              className="edit-leaderboard-btn"
              onClick={() => navigate(`/manager-leaderboards?id=${currentLeaderboard.id}`)}
            >
              ✏️ Edit (Manager)
            </button>
          </div>
        )}

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
                onMouseEnter={() => setHoveredPlayer(standing.username)}
                onMouseLeave={() => setHoveredPlayer(null)}
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

                {hoveredPlayer === standing.username && (
                  <div className="analytics-dropdown">
                    <div className="analytics-item">
                      <span className="analytics-label">🔥 Streak:</span>
                      <span className="analytics-value">{standing.streak} days</span>
                    </div>
                    <div className="analytics-item">
                      <span className="analytics-label">⏰ Last Completion:</span>
                      <span className="analytics-value">{standing.daysSinceCompletion === 0 ? 'Today' : `${standing.daysSinceCompletion}d ago`}</span>
                    </div>
                    <div className="analytics-item">
                      <span className="analytics-label">📅 Active Days:</span>
                      <span className="analytics-value">{standing.participationDays} / {currentLeaderboard.daysLeft + Math.floor(Math.random() * 30)}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
