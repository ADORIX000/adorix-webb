import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-adorix-dark text-white pt-20 pb-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">

                {/* Top Section: Logo, Links, Newsletter */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand & Socials */}
                    <div className="space-y-6">
                        <Link to="/" className="text-3xl font-bold tracking-tight text-white">
                            ADORIX
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Transforming passive screens into intelligent, interactive experiences with local AI.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-adorix-primary hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-adorix-primary hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-adorix-primary hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Product</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="/features" className="hover:text-adorix-primary transition-colors">Features</Link></li>
                            <li><Link to="/pricing" className="hover:text-adorix-primary transition-colors">Pricing</Link></li>
                            <li><Link to="/dashboard" className="hover:text-adorix-primary transition-colors">Live Demo</Link></li>
                            <li><Link to="/api" className="hover:text-adorix-primary transition-colors">API Docs</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Company</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="/about" className="hover:text-adorix-primary transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-adorix-primary transition-colors">Contact</Link></li>
                            <li><Link to="/careers" className="hover:text-adorix-primary transition-colors">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-adorix-primary transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-4">Latest AI features and updates.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-adorix-primary transition-colors"
                            />
                            <button className="bg-adorix-primary hover:bg-adorix-secondary text-white px-4 py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                                Subscribe <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/10 mb-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Adorix Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
