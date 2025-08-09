// src/hooks/AuthProvider.tsx
import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../types';
import { refreshToken } from '../api/authApi';
import API from '../api/authApi';

interface AuthContextType {
  user: DecodedToken | null;
  isLoggedIn: boolean;
  setUser: (user: DecodedToken | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          // ✅ Giải mã đơn giản chỉ để lấy lại thông tin cần thiết
          const userFromToken: DecodedToken = {
            sub: decoded.sub || '',
            name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            exp: decoded.exp,
          };
          setUser(userFromToken);
        } else {
          logout();
        }
      } catch {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    const interceptor = API.interceptors.request.use(async (config) => {
      let token = localStorage.getItem('accessToken');

      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired) {
            const newTokens = await refreshToken(localStorage.getItem('refreshToken')!);
            localStorage.setItem('accessToken', newTokens.accessToken);
            localStorage.setItem('refreshToken', newTokens.refreshToken);
            token = newTokens.accessToken;

            const refreshed: any = jwtDecode(token);
            setUser({
              sub: refreshed.sub || '',
              name: refreshed['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
              email: refreshed['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
              role: refreshed['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
              exp: refreshed.exp,
            });
          }
        } catch {
          logout();
        }

        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return () => {
      API.interceptors.request.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
