'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, User as UserIcon, Settings } from 'lucide-react';
import { useUser, useAuth } from '@clerk/nextjs';

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Keep one animation style for all pages: expand at top, compact on scroll.
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
  }, [pathname]);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', protected: true },
    { name: 'Campaign Studio', path: '/campaign-studio', protected: true },
  ];

  const visibleLinks = navLinks.filter(link => !link.protected || isSignedIn);

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
          <Link href="/dashboard" className="text-2xl font-bold tracking-tight text-adorix-dark flex items-center gap-2 group">
            <span className="bg-adorix-dark text-white w-8 h-8 flex items-center justify-center rounded-lg group-hover:bg-adorix-primary transition-colors">A</span>
            ADORIX
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm text-gray-600">
            {visibleLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`transition-colors hover:text-adorix-primary relative group ${pathname === link.path ? 'text-adorix-primary font-bold' : ''}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-adorix-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${pathname === link.path ? 'scale-x-100' : ''}`} />
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm text-gray-600">
            {!isSignedIn ? (
              <>
                <Link
                  href="/login"
                  className={`transition-colors hover:text-adorix-primary relative group ${pathname === '/login' ? 'text-adorix-primary font-bold' : ''}`}
                >
                  Log In
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-adorix-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${pathname === '/login' ? 'scale-x-100' : ''}`} />
                </Link>
                <Link
                  href="/signup"
                  className="bg-adorix-dark text-white px-6 py-2 rounded-full hover:bg-adorix-primary transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 transition-colors hover:text-adorix-primary ${pathname === '/profile' ? 'text-adorix-primary font-bold' : 'text-adorix-dark'}`}
                >
                  <UserIcon size={18} />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/profile#settings"
                  className={`flex items-center gap-2 transition-colors hover:text-adorix-primary ${pathname === '/settings' ? 'text-adorix-primary font-bold' : 'text-gray-500'}`}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
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
              href={link.path}
              className="text-2xl font-bold text-gray-800 hover:text-adorix-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col items-center gap-8 mt-2 w-full max-w-xs">
            {!isSignedIn ? (
              <>
                <Link
                  href="/login"
                  className="text-2xl font-bold text-gray-800 hover:text-adorix-primary transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="w-full bg-adorix-dark text-white text-center py-4 rounded-xl text-xl font-bold hover:bg-adorix-primary transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="text-2xl font-bold text-gray-800 hover:text-adorix-primary transition-colors flex items-center gap-3"
                >
                  <UserIcon size={24} />
                  Profile
                </Link>
                <Link
                  href="/profile#settings"
                  className="text-2xl font-bold text-gray-800 hover:text-adorix-primary transition-colors flex items-center gap-3"
                >
                  <Settings size={24} />
                  Settings
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
