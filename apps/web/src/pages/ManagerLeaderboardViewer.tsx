import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./css/ManagerLeaderboard_Dark.css";

export default function ManagerLeaderboardViewer() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isAddingParticipant, setIsAddingParticipant] = useState(false);
  const [isDeclaring, setIsDeclaring] = useState(false);
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);
  const [editDetails, setEditDetails] = useState({
    name: "50 Workouts in 30 Days",
    goal: 50,
    reward: "Winner picks next challenge",
    punishment: "Last place buys pizza",
  });
  const [newParticipant, setNewParticipant] = useState("");

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  // Mock data - will be replaced with Firebase data
  const [leaderboard, setLeaderboard] = useState({
    id: 1,
    name: "50 Workouts in 30 Days",
    goal: 50,
    daysLeft: 12,
    reward: "Winner picks next challenge",
    punishment: "Last place buys pizza",
    status: "active",
  });

  const [standings, setStandings] = useState([
    { 
      rank: 1, 
      username: "sarah_codes", 
      completions: 47, 
      percentage: 94,
      streak: 15,
      daysSinceCompletion: 0,
      participationDays: 28,
    },
    { 
      rank: 2, 
      username: "you", 
      completions: 23, 
      percentage: 46,
      streak: 8,
      daysSinceCompletion: 0,
      participationDays: 20,
    },
    { 
      rank: 3, 
      username: "alex_workout", 
      completions: 19, 
      percentage: 38,
      streak: 5,
      daysSinceCompletion: 1,
      participationDays: 18,
    },
    { 
      rank: 4, 
      username: "mike_runner", 
      completions: 15, 
      percentage: 30,
      streak: 3,
      daysSinceCompletion: 2,
      participationDays: 15,
    },
  ]);

  const [pendingSubmissions, setPendingSubmissions] = useState([
    { username: "sarah_codes", submittedAmount: 1, submittedAt: "2 hours ago" },
    { username: "alex_workout", submittedAmount: 2, submittedAt: "30 mins ago" },
  ]);

  const handleApproveSubmission = (username: string, amount: number) => {
    setStandings(prev => 
      prev.map(p => 
        p.username === username 
          ? { ...p, completions: p.completions + amount, percentage: Math.round(((p.completions + amount) / leaderboard.goal) * 100) }
          : p
      ).sort((a, b) => b.completions - a.completions).map((p, i) => ({ ...p, rank: i + 1 }))
    );
    setPendingSubmissions(prev => prev.filter(s => s.username !== username));
  };

  const handleDeclareWinner = () => {
    setLeaderboard(prev => ({ ...prev, status: "completed" }));
    setIsDeclaring(false);
  };

  const handleUpdateDetails = () => {
    setLeaderboard(prev => ({
      ...prev,
      name: editDetails.name,
      goal: editDetails.goal,
      reward: editDetails.reward,
      punishment: editDetails.punishment,
    }));
    setIsEditingDetails(false);
  };

  const handleAddParticipant = () => {
    if (newParticipant.trim()) {
      const newRank = standings.length + 1;
      setStandings(prev => [...prev, {
        rank: newRank,
        username: newParticipant,
        completions: 0,
        percentage: 0,
        streak: 0,
        daysSinceCompletion: 0,
        participationDays: 0,
      }]);
      setNewParticipant("");
      setIsAddingParticipant(false);
    }
  };

  const handleRemoveParticipant = (username: string) => {
    setStandings(prev => 
      prev.filter(p => p.username !== username)
        .map((p, i) => ({ ...p, rank: i + 1 }))
    );
  };

  return (
    <div className="manager-leaderboard-container">
      {/* Header/Navigation */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-logo" onClick={() => navigate("/")}>💪 Complete</h1>
          <nav className="dashboard-nav">
            <button className="nav-btn" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
            <button className="nav-btn active">Manager View</button>
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

      <div className="manager-content">
        {/* Leaderboard Header */}
        <div className="manager-header">
          <div className="manager-title-section">
            <h2 className="manager-title">{leaderboard.name}</h2>
            <span className={`status-badge ${leaderboard.status}`}>{leaderboard.status.toUpperCase()}</span>
          </div>
          <div className="manager-actions">
            <button className="manager-btn primary" onClick={() => setIsEditingDetails(true)}>
              ✏️ Edit Details
            </button>
            <button className="manager-btn secondary" onClick={() => setIsDeclaring(true)}>
              🏆 Declare Winner
            </button>
          </div>
        </div>

        {/* Edit Details Modal */}
        {isEditingDetails && (
          <div className="modal-overlay" onClick={() => setIsEditingDetails(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Leaderboard Details</h3>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={editDetails.name} onChange={(e) => setEditDetails({...editDetails, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Goal</label>
                <input type="number" value={editDetails.goal} onChange={(e) => setEditDetails({...editDetails, goal: parseInt(e.target.value)})} />
              </div>
              <div className="form-group">
                <label>Reward</label>
                <input type="text" value={editDetails.reward} onChange={(e) => setEditDetails({...editDetails, reward: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Punishment</label>
                <input type="text" value={editDetails.punishment} onChange={(e) => setEditDetails({...editDetails, punishment: e.target.value})} />
              </div>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setIsEditingDetails(false)}>Cancel</button>
                <button className="btn-save" onClick={handleUpdateDetails}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Declare Winner Modal */}
        {isDeclaring && (
          <div className="modal-overlay" onClick={() => setIsDeclaring(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>🏆 Declare Winner</h3>
              <p className="winner-name">{standings[0].username}</p>
              <p className="winner-stats">{standings[0].completions} / {leaderboard.goal} completions</p>
              <p className="modal-text">Are you sure you want to declare this leaderboard as complete?</p>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setIsDeclaring(false)}>Cancel</button>
                <button className="btn-save" onClick={handleDeclareWinner}>Declare Winner</button>
              </div>
            </div>
          </div>
        )}

        {/* Pending Submissions */}
        {pendingSubmissions.length > 0 && (
          <div className="pending-section">
            <h3>⏳ Pending Submissions ({pendingSubmissions.length})</h3>
            <div className="pending-list">
              {pendingSubmissions.map((submission, idx) => (
                <div key={idx} className="pending-item">
                  <div className="pending-info">
                    <span className="pending-username">{submission.username}</span>
                    <span className="pending-amount">+ {submission.submittedAmount}</span>
                    <span className="pending-time">{submission.submittedAt}</span>
                  </div>
                  <div className="pending-actions">
                    <button className="btn-approve" onClick={() => handleApproveSubmission(submission.username, submission.submittedAmount)}>
                      ✓ Approve
                    </button>
                    <button className="btn-reject">✕ Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manage Participants */}
        <div className="manage-section">
          <h3>👥 Manage Participants ({standings.length})</h3>
          <div className="participant-controls">
            {isAddingParticipant ? (
              <div className="add-participant-form">
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                />
                <button className="btn-add" onClick={handleAddParticipant}>Add</button>
                <button className="btn-cancel" onClick={() => setIsAddingParticipant(false)}>Cancel</button>
              </div>
            ) : (
              <button className="btn-add-participant" onClick={() => setIsAddingParticipant(true)}>
                + Add Participant
              </button>
            )}
          </div>
        </div>

        {/* Leaderboard with Hover Details */}
        <div className="standings-section">
          <h3>📊 Standings</h3>
          <div className="standings-list">
            {standings.map((player) => (
              <div 
                key={player.username}
                className="standing-row"
                onMouseEnter={() => setHoveredPlayer(player.username)}
                onMouseLeave={() => setHoveredPlayer(null)}
              >
                <div className="standing-left">
                  <div className="standing-rank">{player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : `#${player.rank}`}</div>
                  <div className="standing-user-info">
                    <div className="standing-username">{player.username}</div>
                    <div className="standing-progress-bar">
                      <div className="progress-fill" style={{ width: `${player.percentage}%` }} />
                    </div>
                    <div className="standing-stats">{player.completions} / {leaderboard.goal}</div>
                  </div>
                </div>

                {hoveredPlayer === player.username && (
                  <div className="hover-details">
                    <div className="detail-item">
                      <span className="detail-label">🔥 Streak:</span>
                      <span className="detail-value">{player.streak} days</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">⏰ Last Completion:</span>
                      <span className="detail-value">{player.daysSinceCompletion === 0 ? 'Today' : `${player.daysSinceCompletion}d ago`}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">📅 Active Days:</span>
                      <span className="detail-value">{player.participationDays} / {leaderboard.daysLeft || 30}</span>
                    </div>
                  </div>
                )}

                <div className="standing-actions">
                  <button className="btn-edit-score">Edit</button>
                  <button className="btn-remove" onClick={() => handleRemoveParticipant(player.username)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
