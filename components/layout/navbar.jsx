'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useUser, useAuth, SignOutButton } from '@clerk/nextjs';

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', protected: true },
    { name: 'Campaign Studio', path: '/dashboard/studio', protected: true },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Profile', path: '/profile', protected: true },
    { name: 'Contact', path: '/contact' },
  ];

  const visibleLinks = navLinks.filter(link => !link.protected || isSignedIn);

  return (
    <>
      <nav
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled || pathname === '/login' || pathname === '/signup'
          ? 'h-16 bg-white border-b border-gray-200/50 shadow-sm'
          : 'h-24 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-adorix-dark flex items-center gap-3 group">
            <img src="/icon.png" alt="Adorix Logo" className="w-8 h-8 rounded-lg group-hover:scale-110 transition-transform duration-200" />
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
                  className={`transition-colors hover:text-adorix-primary relative group ${pathname === '/signup' ? 'text-adorix-primary font-bold' : ''}`}
                >
                  Sign Up
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-adorix-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${pathname === '/signup' ? 'scale-x-100' : ''}`} />
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-adorix-dark hover:text-adorix-primary transition-colors"
                >
                  <UserIcon size={18} />
                  <span>{user?.fullName || user?.firstName || 'Account'}</span>
                </Link>
                <button
                  onClick={() => signOut()}
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
                  className="text-2xl font-bold text-gray-800 hover:text-adorix-primary transition-colors"
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
                <button
                  onClick={() => signOut()}
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
