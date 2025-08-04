import React, { createContext, useEffect, useState } from 'react';
import api from '../utils/axios';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem('token'),
  });

  useEffect(() => {
    if (auth.token) {
      const decoded = jwtDecode(auth.token);
      const now = Date.now();

      const tenMinutes = 10 * 60 * 1000; // 10 minutes in ms
      const fifteenMinutes = 15 * 60 * 1000; // 15 minutes in ms

      // Show alert after 10 minutes
      const alertTimer = setTimeout(() => {
        alert('⚠️ You will be logged out in 5 minutes. Please save your work.');
      }, tenMinutes);

      // Auto logout after 15 minutes
      const logoutTimer = setTimeout(() => {
        logout();
      }, fifteenMinutes);

      return () => {
        clearTimeout(alertTimer);
        clearTimeout(logoutTimer);
      };
    }
  }, [auth.token]);

  const login = async (email, password) => {
    const res = await axios.post('http://127.0.0.1:8000/api/token/', { email, password });
    localStorage.setItem('token', res.data.access);
    setAuth({ token: res.data.access, user: null });
  };

  const register = async (formData) => {
    const res = await axios.post('http://127.0.0.1:8000/api/user-register/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    localStorage.setItem('token', res.data.token);
    setAuth({ token: res.data.token, user: res.data.user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    window.location.href = '/user-login';
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
