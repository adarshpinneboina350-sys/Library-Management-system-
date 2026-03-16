import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PublicHome } from './pages/PublicHome';
import { Explore } from './pages/Explore';
import { Login } from './pages/Login';
import { MemberHome } from './pages/MemberHome';
import { AdminHome } from './pages/AdminHome';
import { BookDetails } from './pages/BookDetails';
import { Profile } from './pages/Profile';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [userRole, setUserRole] = useState<'member' | 'admin' | null>(() => {
    return localStorage.getItem('userRole') as 'member' | 'admin' | null;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [isLoggedIn, userRole]);

  const handleLogin = (role: 'member' | 'admin') => {
    setIsLoggedIn(true);
    setUserRole(role);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-zinc-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicHome isLoggedIn={isLoggedIn} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search" element={<Explore />} />
          <Route path="/book/:id" element={<BookDetails />} />
          
          {/* Auth Route */}
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              isLoggedIn ? (
                userRole === 'admin' ? <Navigate to="/admin" /> : <MemberHome />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/admin" 
            element={isLoggedIn && userRole === 'admin' ? <AdminHome /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Simple Footer */}
        <footer className="border-t border-black/5 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-zinc-500">
              © 2026 Lumina Library Management System. Built with precision and care.
            </p>
            <div className="mt-4 flex justify-center gap-6">
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-600">Privacy</a>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-600">Terms</a>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-600">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
