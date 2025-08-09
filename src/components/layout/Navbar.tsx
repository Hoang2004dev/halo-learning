// src/components/layout/Navbar.tsx
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

type Props = { guest?: boolean };

const Navbar = ({ guest = false }: Props) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const showUserMenu = !guest && !!user;

  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          🌱 Halo <span className="text-sm text-gray-500 dark:text-gray-400">Learning</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 dark:text-blue-400" : ""
            }
          >
            Trang chủ
          </NavLink>

          {guest ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 dark:text-blue-400" : ""
                }
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 dark:text-blue-400" : ""
                }
              >
                Đăng ký
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/study-day"
              className={({ isActive }) =>
                isActive ? "text-blue-600 dark:text-blue-400" : ""
              }
            >
              Lịch học
            </NavLink>
          )}
        </nav>

        {/* User menu */}
        {showUserMenu && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span>👋 {user!.name}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  menuOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-lg z-10">
                <div className="px-4 py-2 text-sm border-b dark:border-gray-700">
                  <div className="font-medium">{user!.email}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {user!.role}
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
