'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'pending' | 'active';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('fs_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simple mock logic
    if (email === 'admin@farmsetu.com' && password === 'admin123') {
      const adminUser: User = { id: 'admin-1', name: 'Admin User', email, role: 'admin', status: 'active' };
      setUser(adminUser);
      localStorage.setItem('fs_user', JSON.stringify(adminUser));
    } else if (email === 'user@farmsetu.com' && password === 'user123') {
      const normalUser: User = { id: 'user-1', name: 'John Doe', email, role: 'user', status: 'active' };
      setUser(normalUser);
      localStorage.setItem('fs_user', JSON.stringify(normalUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fs_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
