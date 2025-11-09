import { type FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Forgot() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    try {
      await resetPassword(email.trim());
      setMsg("Password reset email sent.");
    } catch (e: any) {
      setErr(e.message);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "4rem auto", padding: "1.5rem", borderRadius: 16, boxShadow: "0 0 12px rgba(0,0,0,0.1)" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Reset password</h1>
      {msg && (
        <div style={{ background: "#dcfce7", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: 8 }}>
          {msg}
        </div>
      )}
      {err && (
        <div style={{ background: "#fee2e2", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: 8 }}>
          {err}
        </div>
      )}
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button style={{ padding: "0.5rem", borderRadius: 8, border: "none", background: "black", color: "white" }}>
          Send reset link
        </button>
      </form>
    </div>
  );
}
