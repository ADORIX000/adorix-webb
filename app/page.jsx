'use client';

import Link from 'next/link';
import TypingText from '@/components/ui/TypingText';
import ActionCard from '@/components/ui/ActionCard';
import { motion } from 'framer-motion';
import { LayoutDashboard, PenTool, BarChart3, Users } from 'lucide-react';

export default function RootPage() {
    const actions = [
        {
            title: "Analytics Dashboard",
            description: "Real-time insights into your campaign performance with advanced data visualization.",
            icon: BarChart3,
            href: "/dashboard",
            color: "adorix-primary"
        },
        {
            title: "Campaign Studio",
            description: "Create, edit and manage your marketing campaigns with our intuitive workspace.",
            icon: PenTool,
            href: "/campaign-studio",
            color: "adorix-primary"
        },
        {
            title: "Audience Manager",
            description: "Segment and target your customers with precision using smart filters.",
            icon: Users,
            href: "/dashboard",
            color: "adorix-primary"
        }
    ];

    return (
        <div className="relative min-h-screen flex flex-col bg-white">
            {/* Hero Section */}
            <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f0f9fa_0%,_transparent_40%),_radial-gradient(circle_at_bottom_left,_#fdf2f8_0%,_transparent_40%)]" />
                
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-adorix-dark tracking-tight mb-6">
                            Welcome to <span className="text-adorix-primary">Adorix</span>
                        </h1>
                        
                        <div className="h-20 md:h-24 mb-6">
                            <TypingText 
                                text="Advanced Campaign Studio for Visionary Creators." 
                                className="text-xl md:text-3xl font-medium text-gray-500 leading-relaxed block"
                                speed={0.04}
                            />
                        </div>

                        <p className="text-gray-500 mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Precision analytics meets creative freedom. Start building high-impact campaigns in minutes.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link 
                                href="/dashboard" 
                                className="w-full sm:w-auto px-8 py-4 bg-adorix-primary text-white font-bold rounded-2xl shadow-lg shadow-adorix-primary/20 hover:shadow-xl hover:shadow-adorix-primary/30 hover:scale-[1.02] transition-all transform duration-200"
                            >
                                Go to Dashboard
                            </Link>
                            <Link 
                                href="/campaign-studio" 
                                className="w-full sm:w-auto px-8 py-4 border border-gray-200 bg-white text-adorix-dark font-bold rounded-2xl hover:bg-gray-50 transition-all hover:scale-[1.02] duration-200"
                            >
                                Campaign Studio
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {actions.map((action, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ActionCard {...action} />
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Footer-like section */}
            <div className="bg-gray-50 py-12 mt-auto border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 font-medium">
                    &copy; 2026 Adorix Campaign Studio. All rights reserved.
                </div>
            </div>
        </div>
    );
}
