// src/components/Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // send user home after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span role="img" aria-label="logo">🌸</span> Achu’s Home Foods
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/">🏠 Home</NavLink></li>
        <li><NavLink to="/about">ℹ️ About</NavLink></li>
        <li><NavLink to="/products">🍲 Products</NavLink></li>
        <li><NavLink to="/contact">📞 Contact</NavLink></li>
        <li><NavLink to="/cart">🛒 Cart</NavLink></li>

        {isAuthenticated ? (
          <>
            <li><NavLink to="/profile">👤 Profile</NavLink></li>
            <li>
              <button type="button" className="logout-button" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" className="login-button">
              🔑 Login / Register
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
