// src/routes/GuestRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

const GuestRoute = () => {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  return token ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default GuestRoute;
