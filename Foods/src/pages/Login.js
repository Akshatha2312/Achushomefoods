// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- call this after successful login

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:6050/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token & user locally (you already had this)
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        // Notify Auth context that user is logged in
        login();

        setMessage('✅ Login successful!');
        navigate('/profile');
      } else {
        setMessage(`❌ ${data.message || 'Login failed'}`);
      }
    } catch (err) {
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box fade-in">
        <h2>🔐 Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="forgot-password-link">
            <Link to="/request-reset">Forgot Password?</Link>
          </div>

          <button type="submit" className="auth-button">✨ Login</button>

          {message && <p className="auth-message">{message}</p>}

          <p className="auth-toggle">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
