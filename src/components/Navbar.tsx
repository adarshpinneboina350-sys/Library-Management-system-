import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Library, Search, LogIn, LogOut, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Library className="h-8 w-8 text-emerald-600" />
          <span className="text-xl font-bold tracking-tight text-zinc-900">Lumina Library</span>
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <Link
              to="/explore"
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Explore</span>
            </Link>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">My Account</span>
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  navigate('/');
                }}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-lg active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
