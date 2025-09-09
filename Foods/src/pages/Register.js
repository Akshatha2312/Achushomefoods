import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:6050/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Auto-login: save user info & mark as logged in
        const userData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          orders: 0,
          isLoggedIn: true,  // <-- login flag
        };

        localStorage.setItem('user', JSON.stringify(userData));

        setMessage('✅ Registered & logged in successfully!');
        
        // Redirect to profile immediately
        navigate('/profile');
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="register-page">
      <div className="register-box fade-in">
        <h2>🎉 Create Your Account</h2>
        <p className="register-intro">
          Join Achu's Home Foods and explore our homemade products!
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label>Full Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              id="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="1234567890"
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
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="auth-button">✨ Register</button>

          {message && <p className="auth-message">{message}</p>}

          <p className="auth-toggle">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
