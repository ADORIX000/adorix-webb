'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, PenTool, Home } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Studio', href: '/campaign-studio', icon: PenTool },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm' : 'bg-transparent py-5'
        }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-adorix-primary rounded-xl flex items-center justify-center shadow-lg shadow-adorix-primary/20 group-hover:scale-110 transition-transform">
                        <span className="text-white font-black text-xl">A</span>
                    </div>
                    <span className="text-2xl font-bold text-adorix-dark hidden sm:block">Adorix</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href}
                            className="text-gray-600 hover:text-adorix-primary font-medium transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    <div className="h-6 w-[1px] bg-gray-200" />
                    
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="px-5 py-2.5 bg-adorix-primary text-white font-bold rounded-xl hover:bg-[#085a66] transition shadow-md shadow-adorix-primary/10">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden p-2 text-gray-600"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-adorix-primary"
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-100">
                                <SignedIn>
                                    <div className="flex items-center gap-3">
                                        <UserButton afterSignOutUrl="/" />
                                        <span className="font-medium text-gray-700">Account</span>
                                    </div>
                                </SignedIn>
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button className="w-full py-3 bg-adorix-primary text-white font-bold rounded-xl">
                                            Sign In
                                        </button>
                                    </SignInButton>
                                </SignedOut>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
