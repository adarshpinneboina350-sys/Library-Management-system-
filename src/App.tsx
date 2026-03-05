import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PublicHome } from './pages/PublicHome';
import { Explore } from './pages/Explore';
import { Login } from './pages/Login';
import { MemberHome } from './pages/MemberHome';
import { BookDetails } from './pages/BookDetails';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <div className="min-h-screen bg-zinc-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicHome isLoggedIn={isLoggedIn} />} />
          <Route 
            path="/explore" 
            element={isLoggedIn ? <Explore /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/search" 
            element={isLoggedIn ? <Explore /> : <Navigate to="/login" />} 
          />
          <Route path="/book/:id" element={<BookDetails />} />
          
          {/* Auth Route */}
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <MemberHome /> : <Navigate to="/login" />} 
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
