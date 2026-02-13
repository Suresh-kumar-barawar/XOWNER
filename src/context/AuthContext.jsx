import React, { createContext, useState, useContext, useEffect } from 'react';
import { me } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken) {
        setToken(storedToken);
        
        try {
          // Try to fetch fresh user data from backend
          const userData = await me(storedToken);
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // Fallback to stored user data
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch (e) {
              console.error('Error parsing stored user:', e);
              logout();
            }
          } else {
            logout();
          }
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    // Handle multiple token field names from different backend responses
    const token = userData?.token || userData?.accessToken || userData?.access_token;
    
    if (token) {
      setToken(token);
      localStorage.setItem('token', token);
    }

    // Extract user data - either from userData.user or use the entire response
    const userToStore = userData?.user || userData;
    setUser(userToStore);
    localStorage.setItem('user', JSON.stringify(userToStore));
    
    if (userToStore?.id) {
      localStorage.setItem('userId', userToStore.id);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    isLoading,
    isLoggedIn: !!user && !!token,
    login,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
