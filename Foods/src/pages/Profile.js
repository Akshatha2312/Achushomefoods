// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <div className="profile-card fade-in">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="User Avatar"
          className="profile-avatar"
        />
        <h2 className="profile-name">{user?.name}</h2>
        <p className="profile-email">{user?.email}</p>

        <div className="profile-section">
          <h3>📋 Personal Details</h3>
          <p><strong>📞 Phone:</strong> {user?.phone || 'Not Provided'}</p>
          <p><strong>🏡 Address:</strong> {user?.address || 'Not Provided'}</p>
        </div>

        <div className="profile-section">
          <h3>🛍️ Recent Orders</h3>
          {user?.orders && user.orders.length > 0 ? (
            <div className="orders-list">
              {user.orders.map((order, index) => (
                <div className="order-item fade-in" key={index}>
                  <p><strong>Order #{index + 1}</strong></p>
                  <p><strong>Product:</strong> {order.product}</p>
                  <p><strong>Price:</strong> ₹{order.price}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-orders">You have not placed any orders yet.</p>
          )}
        </div>

        <div className="profile-buttons">
          <button className="edit-btn" onClick={() => alert("✏️ Edit Profile coming soon!")}>
            ✏️ Edit Profile
          </button>
          <button className="logout-button" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
