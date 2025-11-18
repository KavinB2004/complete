import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./css/CreateLeaderboard.css";

export default function CreateLeaderboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goalType: "custom",
    targetNumber: "",
    startDate: "",
    endDate: "",
    reward: "",
    punishment: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Create leaderboard in Firebase
    console.log("Creating leaderboard:", formData);
    // For now, redirect to dashboard
    navigate("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="create-leaderboard-container">
      <div className="create-background">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="floating-orb orb-3" />
      </div>

      <div className="create-content">
        <button className="back-button" onClick={() => navigate("/app")}>
          ← Back to Dashboard
        </button>

        <div className="create-header">
          <h1 className="create-title">Create a Challenge</h1>
          <p className="create-subtitle">
            Set up a new leaderboard and invite your friends to compete
          </p>
        </div>

        <form className="create-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">Challenge Details</h2>
            
            <div className="form-group">
              <label htmlFor="name">Challenge Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., 30-Day Workout Challenge"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what this challenge is about..."
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="goalType">Goal Type *</label>
                <select
                  id="goalType"
                  name="goalType"
                  value={formData.goalType}
                  onChange={handleChange}
                  required
                >
                  <option value="custom">Custom</option>
                  <option value="workout">Workouts</option>
                  <option value="coding">Coding Problems</option>
                  <option value="reading">Books/Pages</option>
                  <option value="steps">Daily Steps</option>
                  <option value="meditation">Meditation Minutes</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="targetNumber">Target Number *</label>
                <input
                  type="number"
                  id="targetNumber"
                  name="targetNumber"
                  value={formData.targetNumber}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date *</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date *</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Stakes & Rewards</h2>
            
            <div className="form-group">
              <label htmlFor="reward">Winner's Reward *</label>
              <input
                type="text"
                id="reward"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                placeholder="e.g., $50, Dinner at a nice restaurant, Bragging rights"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="punishment">Loser's Punishment *</label>
              <input
                type="text"
                id="punishment"
                name="punishment"
                value={formData.punishment}
                onChange={handleChange}
                placeholder="e.g., Buy everyone pizza, Clean the house, Post an embarrassing photo"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
            <button type="submit" className="create-button">
              Create Leaderboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
