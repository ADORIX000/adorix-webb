'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, User, Share2, CornerRightDown, Sparkles } from 'lucide-react';
import TypingText from '@/components/home/TypingText';

const BlogDetail = () => {
    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-transparent relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link 
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-500 font-black text-xs uppercase tracking-widest hover:text-adorix-primary transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
                        Back to Blog
                    </Link>
                </motion.div>

                {/* Article Header */}
                <header className="mb-16">

                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-adorix-dark mb-10 leading-[1.1] tracking-tighter"
                    >
                        How ADORIX Combines Personalization, Voice AI, and <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent">
                            Real-Time Advertising?
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center gap-8 py-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-adorix-primary/10 flex items-center justify-center text-adorix-primary font-black text-sm">
                                AT
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Author</p>
                                <p className="text-sm font-bold text-adorix-dark">Adorix Team</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Date</p>
                                <p className="text-sm font-bold text-adorix-dark">March 30, 2026</p>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Article Content */}
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-xl prose-adorix max-w-none text-gray-600 font-medium leading-relaxed"
                >
                    <p className="text-2xl md:text-3xl text-adorix-dark font-black leading-tight mb-12 tracking-tighter">
                        Traditional digital signage is static. ADORIX changes this by turning passive displays into intelligent kiosks that understand and respond to users in real time.
                    </p>

                    <p className="mb-10 text-lg md:text-xl">
                        At the heart of ADORIX is a dual-system setup. Our <strong>kiosk system</strong> handles the "brain" tasks: seeing users with computer vision and talking to them using Voice AI. Meanwhile, our <strong>web platform</strong> acts as the command center, letting businesses manage ads and track performance from anywhere.
                    </p>

                    <h2 className="text-4xl font-black text-adorix-dark mt-20 mb-10 tracking-tighter">
                        How it Works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            { title: "Watch", desc: "Generic ads play until a person walks by." },
                            { title: "Personalize", desc: "AI detects demographics to show targeted content." },
                            { title: "Interact", desc: "Users can ask questions using 'Hey Adorix'." }
                        ].map((item, i) => (
                            <div key={i} className="bg-adorix-primary/5 p-8 rounded-[2rem] border border-adorix-primary/10">
                                <h3 className="text-xl font-black text-adorix-dark mb-3">{item.title}</h3>
                                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="mb-10 text-lg md:text-xl">
                        The kiosk's intelligence comes from advanced AI tools. It uses **Face Detection** to understand who is watching and **Speech Recognition** to have natural conversations. This allows it to answer product questions and provide help instantly, making the shopping experience much more engaging.
                    </p>

                    <p className="mb-12 text-lg md:text-xl">
                        On the screen, users see a simple and friendly interface. Real-time updates show subtitles and animated avatars so passengers always know the kiosk is listening. This clear feedback is key to making the AI feel natural and easy to use.
                    </p>

                    <blockquote className="my-20 p-10">
                        <p className="text-xl md:text-2xl font-bold text-adorix-dark leading-relaxed">
                            "ADORIX isn't just a screen—it's a smart assistant that brings the personalization of online shopping to the real world."
                        </p>
                    </blockquote>

                    <p className="mb-12 text-lg md:text-xl">
                        By combining personalized ads, voice interaction, and cloud management, ADORIX shows the future of retail. It’s a complete ecosystem designed to make every interaction more meaningful and effective.
                    </p>

                    {/* Footer Tags */}
                    <div className="mt-24 pt-12 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex gap-3">
                             {['AI', 'Smart Retail', 'Innovation'].map(tag => (
                                 <span key={tag} className="px-5 py-2 bg-gray-50 rounded-full text-xs font-black text-gray-400 uppercase tracking-widest">
                                     #{tag}
                                 </span>
                             ))}
                        </div>
                    </div>
                </motion.article>
            </div>

            {/* Backdrop Decorations */}
            <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-gradient-to-bl from-adorix-primary/5 via-transparent to-transparent -z-10" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[30%] bg-gradient-to-tr from-adorix-accent/5 via-transparent to-transparent -z-10" />
        </div>
    );
};

export default BlogDetail;
