// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // 👈 import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>       {/* 👈 Wrap with AuthProvider */}
      <CartProvider>     {/* 👈 Inside it keep CartProvider */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
