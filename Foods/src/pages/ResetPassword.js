// src/pages/ResetPassword.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./reset.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`http://localhost:6050/api/reset-password/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Password updated successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error resetting password.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>🔁 Reset Your Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
        </form>
        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
