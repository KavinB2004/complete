import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Hyperspeed from "../components/Hyperspeed";
import "./css/RetroLogin.css";

export default function RetroRegister() {
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [err, setErr] = useState("");
  const [isSliding, setIsSliding] = useState(false);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSliding(true);
    setTimeout(() => {
      navigate("/");
    }, 600);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");

    if (pw !== confirmPw) {
      setErr("Passwords do not match");
      return;
    }

    if (pw.length < 6) {
      setErr("Password must be at least 6 characters");
      return;
    }

    try {
      await signUp(email.trim(), pw);
      navigate("/app");
    } catch (e: any) {
      setErr(e.message);
    }
  };

  const hyperspeedOptions = {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xFFFFFF,
      brokenLines: 0xFFFFFF,
      leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
      rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
      sticks: 0x03B3C3,
    }
  };

  return (
    <div className={`retro-login-container ${isSliding ? 'slide-out' : ''}`}>
      <div className="hyperspeed-background">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>

      <div className="retro-login-content">
        <a href="#" onClick={handleBackClick} className="back-arrow">
          ←
        </a>
        <div className="retro-login-card">
          <div className="retro-header">
            <h1 className="retro-logo">💪 Complete</h1>
            <h2 className="retro-title">Create Account</h2>
          </div>

          {err && <div className="retro-error">{err}</div>}

          <form onSubmit={onSubmit} className="retro-form">
            <div className="retro-form-group">
              <label className="retro-label">Username</label>
              <input
                className="retro-input"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
              />
            </div>

            <div className="retro-form-group">
              <label className="retro-label">Email</label>
              <input
                className="retro-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>

            <div className="retro-form-group">
              <label className="retro-label">Password</label>
              <input
                className="retro-input"
                placeholder="Create a password"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                required
              />
            </div>

            <div className="retro-form-group">
              <label className="retro-label">Confirm Password</label>
              <input
                className="retro-input"
                placeholder="Confirm your password"
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="retro-submit-btn">
              Create Account
            </button>
          </form>

          <div className="retro-divider">
            <span>or</span>
          </div>

          <button className="retro-google-btn" onClick={signInWithGoogle}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
              />
              <path
                fill="#34A853"
                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.01a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
              />
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z" />
              <path
                fill="#EA4335"
                d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="retro-links">
            <Link to="/login" className="retro-link">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
