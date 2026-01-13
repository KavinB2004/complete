import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./css/Settings.css";

export default function Settings() {
  const { user, logOut, theme, setTheme } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <div className={`settings-container ${theme}`}>
      {/* Header/Navigation */}
      <header className="settings-header">
        <div className="header-content">
          <img 
            src="/Complete Logo.png" 
            alt="Complete Logo" 
            className="settings-logo" 
            onClick={() => navigate("/")}
            style={{ cursor: 'pointer', height: '50px', width: 'auto' }}
          />
          <nav className="settings-nav">
            <button className="nav-btn" onClick={() => navigate("/dashboard")}>Dashboard</button>
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
            <button className="back-btn" onClick={() => navigate("/dashboard")}>
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="settings-main">
        <div className="settings-container-inner">
          <h2 className="page-title">Settings</h2>

          {/* User Profile Card */}
          <div className="settings-card">
            <div className="card-header">
              <h3>Profile</h3>
            </div>
            <div className="card-content">
              <div className="profile-item">
                <div className="profile-avatar">{user?.email?.[0].toUpperCase()}</div>
                <div className="profile-info">
                  <p className="profile-email">{user?.email}</p>
                  <p className="profile-status">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="settings-card">
            <div className="card-header">
              <h3>Appearance</h3>
            </div>
            <div className="card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Dark Mode</h4>
                  <p className="setting-description">
                    {theme === "dark" 
                      ? "Dark mode is currently enabled. Click to switch to light mode." 
                      : "Light mode is currently enabled. Click to switch to dark mode."}
                  </p>
                </div>
                <button 
                  className={`theme-toggle ${theme}`}
                  onClick={toggleTheme}
                  title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  <div className="toggle-circle" />
                </button>
              </div>
              <div className="theme-preview">
                <div className="preview-title">Theme Preview:</div>
                <div className="preview-current">
                  Currently using: <span className="theme-label">{theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="settings-card">
            <div className="card-header">
              <h3>Account</h3>
            </div>
            <div className="card-content">
              <button className="settings-btn danger" onClick={handleLogout}>
                Log Out
              </button>
              <p className="setting-description">
                You will be logged out of your account and redirected to the login page.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
