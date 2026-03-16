'use client';

import Link from 'next/link';
import TypingText from '@/components/ui/TypingText';
import { motion } from 'framer-motion';

export default function RootPage() {
    return (
        <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-white">
            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f0f9fa_0%,_transparent_40%),_radial-gradient(circle_at_bottom_left,_#fdf2f8_0%,_transparent_40%)]" />
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
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
    );
}
