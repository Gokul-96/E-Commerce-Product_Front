import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(null);

  const getToken = () => {
    return token;
  };

  const signup = async (userData) => {
    try {
      const response = await fetch('https://e-commerce-product-back.onrender.com/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const registeredUser = await response.json();
        setUserProfile(registeredUser);
        localStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
        return registeredUser;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
      throw error;
    }
  };

  const login = async (userData) => {
    try {
      const response = await fetch('https://e-commerce-product-back.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const authenticatedUser = await response.json();
        setToken(authenticatedUser.token);
        setUserProfile(authenticatedUser.user);
        sessionStorage.setItem('loggedInUser', JSON.stringify(authenticatedUser));
        return authenticatedUser;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('login failed:', error.message);
      throw error;
    }
  };

  const logout = () => {
    setUserProfile(null);
    setToken(null);
    sessionStorage.removeItem('loggedInUser');
  };

  const isAuthenticated = () => {
    return token !== null && token !== undefined;
  };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (storedUser) {
      setUserProfile(storedUser);
      setToken(storedUser.token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userProfile, token, signup, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
