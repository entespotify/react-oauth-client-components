import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthConfig, TokenResponse } from './types';
import { AuthService } from './authService';

interface AuthContextType {
  token: TokenResponse | null;
  isAuthenticated: boolean;
  login: (state?: string) => void;
  logout: () => void;
  service: AuthService;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ config: AuthConfig; children: React.ReactNode }> = ({ config, children }) => {
  const [service] = useState(() => new AuthService(config));
  const [token, setToken] = useState<TokenResponse | null>(service.getToken());

  useEffect(() => {
    setToken(service.getToken());
    service.refreshTokenIfNeeded().then((t) => {
      if (t) setToken(t);
    }).catch(() => {});
  }, [service]);

  const login = (state?: string) => service.login(state);
  const logout = () => { service.logout(); setToken(null); };

  return <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout, service }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
