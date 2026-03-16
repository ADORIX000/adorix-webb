import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', protected: true },
    { name: 'Campaign Studio', path: '/dashboard/studio', protected: true },
    { name: 'Profile', path: '/profile', protected: true },
  ];

  const visibleLinks = navLinks.filter(link => !link.protected || isAuthenticated);

  return (
    <>
      <nav
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
          : 'h-24 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
             <img src="/icon.png" alt="Adorix Logo" className="w-8 h-8 object-contain rounded-lg group-hover:scale-110 transition-transform" />
            ADORIX
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm text-gray-600">
            {visibleLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-adorix-primary relative group ${location.pathname === link.path ? 'text-adorix-primary font-bold' : ''}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-adorix-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${location.pathname === link.path ? 'scale-x-100' : ''}`} />
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm text-gray-600">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className={`transition-colors hover:text-adorix-primary relative group ${location.pathname === '/login' ? 'text-adorix-primary font-bold' : ''}`}
                >
                  Log In
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-adorix-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${location.pathname === '/login' ? 'scale-x-100' : ''}`} />
                </Link>
                <Link
                  to="/signup"
                  className="bg-adorix-dark text-white px-6 py-2 rounded-full hover:bg-adorix-primary transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-adorix-dark hover:text-adorix-primary transition-colors"
                >
                  <User size={18} />
                  <span>{user?.name || 'Account'}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors font-semibold"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {visibleLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-2xl font-bold text-gray-800 hover:text-adorix-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col items-center gap-8 mt-2 w-full max-w-xs">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-2xl font-bold text-gray-800 hover:text-adorix-primary transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="w-full bg-adorix-dark text-white text-center py-4 rounded-xl text-xl font-bold hover:bg-adorix-primary transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="text-2xl font-bold text-gray-800 hover:text-adorix-primary transition-colors flex items-center gap-3"
                >
                  <User size={24} />
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-2xl font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-3"
                >
                  <LogOut size={24} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;