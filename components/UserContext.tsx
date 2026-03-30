'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface MDowod {
  series: string;
  number: string;
  status: string;
  issuer: string;
  validTo: string;
  issuedAt: string;
  lastUpdated: string;
}

interface User {
  firstName: string;
  lastName: string;
  pesel: string;
  dob: string;
  citizenship: string;
  mDowod: MDowod;
  points?: { MAT: number; NIE: number };
  profileImage?: string | null;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUser: User = {
  firstName: 'JAN',
  lastName: 'KOWALSKI',
  pesel: '90010112345',
  dob: '1990-01-01',
  citizenship: 'POLSKIE',
  mDowod: {
    series: 'ZZC',
    number: '108201',
    status: 'Wydany',
    issuer: 'URZĄD MIASTA WARSZAWA',
    validTo: '2032-04-13',
    issuedAt: '2022-07-14',
    lastUpdated: '2026-02-04',
  },
  points: { MAT: 75, NIE: 25 },
  profileImage: null,
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('mobywatel_auth');
    if (stored === 'true') {
      const storedUser = localStorage.getItem('mobywatel_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    }
    const storedImage = localStorage.getItem('profile_image');
    if (storedImage && !user?.profileImage) {
      // obrazek zostanie załadowany przy następnym renderze
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    if (password === 'demo1234') {
      setUser(defaultUser);
      setIsAuthenticated(true);
      localStorage.setItem('mobywatel_auth', 'true');
      localStorage.setItem('mobywatel_user', JSON.stringify(defaultUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mobywatel_auth');
    localStorage.removeItem('mobywatel_user');
    // nie usuwamy zdjęcia profilowego – zostaje
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('mobywatel_user', JSON.stringify(updated));
      
      // jeśli aktualizujemy zdjęcie, zapisz je osobno
      if (data.profileImage !== undefined) {
        if (data.profileImage) {
          localStorage.setItem('profile_image', data.profileImage);
        } else {
          localStorage.removeItem('profile_image');
        }
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
