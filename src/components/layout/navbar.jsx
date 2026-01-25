import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full h-20 flex items-center justify-between px-8 fixed top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-adorix-900 tracking-tighter">
        ADORIX
      </Link>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
        <Link to="/" className="hover:text-adorix-600 transition">Home</Link>
        <Link to="/dashboard" className="hover:text-adorix-600 transition">Dashboard</Link>
        <Link to="/dashboard/studio" className="hover:text-adorix-600 transition">Campaign Studio</Link>
        <Link to="/pricing" className="hover:text-adorix-600 transition">Pricing</Link>
        <Link to="/profile" className="hover:text-adorix-600 transition">Profile</Link>
        <Link to="/contact" className="hover:text-adorix-600 transition">Contact</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-adorix-900 font-medium hover:text-adorix-600">
          Sign in
        </Link>
        <Link to="/signup" className="px-5 py-2 bg-adorix-900 text-white rounded-full font-medium hover:bg-adorix-800 transition shadow-lg shadow-adorix-500/20">
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;