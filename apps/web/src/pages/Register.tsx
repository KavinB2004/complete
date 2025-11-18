import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      // TODO: Check if username is unique in Firebase
      // TODO: Store username in user profile after signup
      await signUp(email.trim(), pw);
      navigate("/app");
    } catch (e: any) {
      setErr(e.message);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "4rem auto", padding: "1.5rem", borderRadius: 16, boxShadow: "0 0 12px rgba(0,0,0,0.1)" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Create your account</h1>
      {err && (
        <div style={{ background: "#fee2e2", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: 8 }}>
          {err}
        </div>
      )}
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: 8, border: "1px solid #ccc" }}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <input
          placeholder="Password (min 6 chars)"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button style={{ padding: "0.5rem", borderRadius: 8, border: "none", background: "black", color: "white" }}>
          Create Account
        </button>
      </form>
      <button
        style={{ padding: "0.5rem", borderRadius: 8, border: "1px solid #ccc", width: "100%", marginTop: "0.5rem" }}
        onClick={signInWithGoogle}
      >
        Sign up with Google
      </button>
      <div style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
}
