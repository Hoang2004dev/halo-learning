// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyDayPage from "../pages/StudyDayPage";
import StudyDayDetail from "../features/studyDay/StudyDayDetail";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AppLayout from "../layouts/AppLayout";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import HomePage from "../pages/HomePage";
import AuthPageLayout from "../components/layout/AuthPageLayout";
import PublicLayout from "../layouts/PublicLayout";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Home công khai */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Auth pages (guest only) */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthPageLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* Khu vực private */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/study-day" element={<StudyDayPage />} />
          <Route path="/study-day/:id" element={<StudyDayDetail />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
