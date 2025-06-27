"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

type User = {
  name: string;
  email: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getUsersFromStorage = () => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const getCurrentUserFromStorage = () => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUserFromStorage();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    const users = getUsersFromStorage();
    const existingUser = users.find((u: any) => u.email === email);

    if (existingUser) {
      toast({
        title: "Erro de Cadastro",
        description: "Este e-mail já está em uso.",
        variant: "destructive",
      });
      return false;
    }
    
    const newUser = { name, email, password: pass };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    localStorage.setItem('currentUser', JSON.stringify({ name, email }));
    setUser({ name, email });
    toast({
      title: "Cadastro Realizado!",
      description: "Bem-vindo(a) à Aetheria AI!",
    });
    return true;
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    const users = getUsersFromStorage();
    const foundUser = users.find((u: any) => u.email === email && u.password === pass);

    if (foundUser) {
      const userData = { name: foundUser.name, email: foundUser.email };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      toast({
        title: "Login bem-sucedido!",
        description: `Bem-vindo(a) de volta, ${foundUser.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Erro de Login",
        description: "E-mail ou senha inválidos.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    toast({
      title: "Logout realizado.",
      description: "Esperamos ver você novamente em breve.",
    });
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
