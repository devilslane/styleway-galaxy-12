<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
=======
import React, { createContext, useState, useContext, useEffect } from 'react';
>>>>>>> 091a32d (last)

interface User {
  id: string;
  email: string;
  name: string;
<<<<<<< HEAD
  isAdmin?: boolean;
  isSupplier?: boolean;
=======
  role: 'CUSTOMER' | 'ADMIN' | 'SUPPLIER';
>>>>>>> 091a32d (last)
}

interface AuthContextType {
  user: User | null;
<<<<<<< HEAD
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
=======
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
>>>>>>> 091a32d (last)
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

<<<<<<< HEAD
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'demo@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      } else if (email === 'admin@example.com' && password === 'admin') {
        const userData: User = {
          id: '2',
          email: 'admin@example.com',
          name: 'Admin User',
          isAdmin: true
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast({
          title: "Welcome back, Admin!",
          description: "You've successfully signed in with admin privileges.",
        });
      } else if (email === 'supplier@example.com' && password === 'supplier') {
        const userData: User = {
          id: '3',
          email: 'supplier@example.com',
          name: 'Supplier User',
          isSupplier: true
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast({
          title: "Welcome back, Supplier!",
          description: "You've successfully signed in to the supplier portal.",
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: Date.now().toString(),
        email,
        name
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
=======
const API_URL = 'http://localhost:3000/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
>>>>>>> 091a32d (last)
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
<<<<<<< HEAD
};
=======
}
>>>>>>> 091a32d (last)
