'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

const Footer = () => {
    const { isSignedIn } = useUser();

    return (
        <footer className="bg-adorix-dark text-white pt-20 pb-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">

                {/* Top Section: Logo, Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">

                    {/* Brand & Socials */}
                    <div className="space-y-6">
                        <Link href="/" className="text-3xl font-bold tracking-tight text-white flex items-center gap-2 group">
                            <Image
                                src="/icon.png"
                                alt="Adorix Logo"
                                width={40}
                                height={40}
                                className="rounded-lg group-hover:scale-110 transition-transform"
                            />
                            ADORIX
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            The advanced campaign studio for intelligent, interactive experiences.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://twitter.com" aria-label="Adorix on Twitter" className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-adorix-primary hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com" aria-label="Adorix on LinkedIn" className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-adorix-primary hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://github.com" aria-label="Adorix on GitHub" className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-adorix-primary hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <h2 className="sr-only">Footer Navigation</h2>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Product</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            {/* Always show landing page essentials */}
                            <li><Link href="/home" className="hover:text-adorix-primary transition-colors">Home & Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-adorix-primary transition-colors">Pricing</Link></li>

                            {/* App links added for logged-in users */}
                            {isSignedIn && (
                                <>
                                    <li><Link href="/dashboard" className="hover:text-adorix-primary transition-colors">Analytics Dashboard</Link></li>
                                    <li><Link href="/campaign-studio" className="hover:text-adorix-primary transition-colors">Campaign Studio</Link></li>
                                    <li><Link href="/dashboard/analytics" className="hover:text-adorix-primary transition-colors">Performance Insights</Link></li>
                                </>
                            )}
                            {!isSignedIn && (
                                <li><Link href="/signup" className="hover:text-adorix-primary transition-colors">Get Started</Link></li>
                            )}
                        </ul>
                    </div>

                    {/* Company & Support */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Resources</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            {/* Always show company essentials */}
                            <li><Link href="/contact" className="hover:text-adorix-primary transition-colors">Contact Us</Link></li>

                            {/* Redirecting to Profile Settings as requested */}
                            <li><Link href="/profile?tab=system" className="hover:text-adorix-primary transition-colors">Help Center</Link></li>

                            {/* User-specific links added for logged-in users */}
                            {isSignedIn && (
                                <>
                                    <li><Link href="/profile?tab=account" className="hover:text-adorix-primary transition-colors">Account Profile</Link></li>
                                    <li><Link href="/profile?tab=billing" className="hover:text-adorix-primary transition-colors">Billing & Subscription</Link></li>
                                    <li><Link href="/profile?tab=system" className="hover:text-adorix-primary transition-colors">System Preferences</Link></li>
                                </>
                            )}
                            <li><Link href="/profile?tab=security" className="hover:text-adorix-primary transition-colors">Privacy & Terms</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/10 mb-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-300">
                    <p>&copy; {new Date().getFullYear()} Adorix Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/settings/policies" className="inline-flex items-center min-h-10 text-gray-200 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/settings/policies" className="inline-flex items-center min-h-10 text-gray-200 hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/settings/policies" className="inline-flex items-center min-h-10 text-gray-200 hover:text-white transition-colors">Cookie Settings</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
