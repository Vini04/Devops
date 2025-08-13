// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!AuthService.getToken());
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null); // State to manage user data

  useEffect(() => {
    const token = AuthService.getToken();
    setIsLoggedIn(!!token);

    // Try to get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser, login, logout, setIsLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
