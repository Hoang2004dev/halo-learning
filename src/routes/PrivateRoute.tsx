// src/routes/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../types';

const PrivateRoute = () => {
  const token = localStorage.getItem('accessToken');
  const location = useLocation();

  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) throw new Error('Token expired');
    return <Outlet />;
  } catch {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
};

export default PrivateRoute;
