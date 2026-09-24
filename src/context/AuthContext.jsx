import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_USER, ADMIN_USER } from '../data/users';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('careerCoachUser');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('careerCoachUser', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('careerCoachUser');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (email, password) => {
    if (email.toLowerCase().includes('admin')) {
      const adminData = { ...ADMIN_USER, email };
      setUser(adminData);
      return { success: true, user: adminData };
    }
    // Accept any credentials in demo mode or default user
    const loggedUser = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: email === DEFAULT_USER.email ? DEFAULT_USER.name : (email.split('@')[0] || 'Hemant Saraswat')
    };
    setUser(loggedUser);
    return { success: true, user: loggedUser };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('careerCoachUser');
  };

  const register = (formData) => {
    const newUser = {
      ...DEFAULT_USER,
      id: 'user_' + Date.now(),
      name: formData.name || 'New Member',
      email: formData.email,
      education: formData.education || 'B.Tech Computer Science',
      qualification: formData.qualification || 'Graduate',
      graduationYear: formData.graduationYear || '2026',
      location: formData.preferredLocation || 'Vadodara, Gujarat',
      preferredLocation: formData.preferredLocation || 'Vadodara / Bengaluru',
      careerGoal: 'Software Developer'
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const updateProfile = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('careerCoachUser', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
