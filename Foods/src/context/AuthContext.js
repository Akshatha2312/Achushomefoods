// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

/**
 * AuthProvider - wraps the app and provides isAuthenticated, login and logout
 * - Reads token from localStorage on init so authentication persists on reload.
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // If you store token in localStorage on login, this will keep user logged in across reloads
    return Boolean(localStorage.getItem('token'));
  });

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    // remove stored auth data (adjust keys if you use different names)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);
