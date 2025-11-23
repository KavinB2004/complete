import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./components/AuthLayout";
import Forgot from "./pages/Forgot";
import Dashboard from "./pages/Dashboard";
import CreateLeaderboard from "./pages/CreateLeaderboard";
import Friends from "./pages/Friends";
import MyLeaderboards from "./pages/MyLeaderboards";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagerLeaderboardViewer from "./pages/ManagerLeaderboardViewer"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />} />
          <Route path="/login" element={<AuthLayout />} />
          <Route path="/register" element={<AuthLayout />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-leaderboard"
            element={
              <ProtectedRoute>
                <CreateLeaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <Friends />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-leaderboards"
            element={
              <ProtectedRoute>
                <MyLeaderboards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager-leaderboards"
            element={
              <ProtectedRoute>
                <ManagerLeaderboardViewer />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<AuthLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
