'use client';


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, User as UserIcon, Settings } from 'lucide-react';
import Image from 'next/image';
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
    { name: 'Home', path: '/home', protected: false },
    { name: 'Dashboard', path: '/dashboard', protected: true },
    { name: 'Campaign Studio', path: '/campaign-studio', protected: true },
    { name: 'Pricing', path: '/pricing', protected: false },
    { name: 'Contact', path: '/contact', protected: false },
  ];

  const isHomeActive = pathname === '/home' || pathname === '/';

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
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <Image
              src="/icon.png"
              alt="Adorix Logo"
              width={32}
              height={32}
              className="rounded-lg group-hover:scale-110 transition-transform"
            />
            <span className="text-2xl font-bold tracking-tight text-adorix-dark">ADORIX</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm text-gray-600">
            {visibleLinks.map((link) => {
              const isActive = link.path === '/home' ? isHomeActive : pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`transition-colors hover:text-adorix-primary relative group ${isActive ? 'text-adorix-primary font-bold' : ''}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-adorix-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${isActive ? 'scale-x-100' : ''}`} />
                </Link>
              );
            })}
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
                  className={`flex items-center gap-2 transition-colors hover:text-adorix-primary relative group ${pathname === '/profile' ? 'text-adorix-primary font-bold' : 'text-adorix-dark'}`}
                >
                  <UserIcon size={18} />
                  <span>Profile</span>
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-adorix-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${pathname === '/profile' ? 'scale-x-100' : ''}`} />
                </Link>
                <button
                  onClick={() => signOut({ redirectUrl: process.env.NEXT_PUBLIC_LANDING_PAGE_URL || 'https://adorix-landingpage.vercel.app/' })}
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
          {visibleLinks.map((link) => {
            const isActive = link.path === '/home' ? isHomeActive : pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-2xl font-bold transition-colors ${isActive ? 'text-adorix-primary' : 'text-gray-800 hover:text-adorix-primary'}`}
              >
                {link.name}
              </Link>
            );
          })}
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
                  onClick={() => signOut({ redirectUrl: process.env.NEXT_PUBLIC_LANDING_PAGE_URL || 'https://adorix-landingpage.vercel.app/' })}
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
