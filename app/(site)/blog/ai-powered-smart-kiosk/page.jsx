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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent italic">
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
                    className="prose prose-lg prose-adorix max-w-none text-gray-600 font-medium leading-relaxed"
                >
                    <p className="text-xl text-adorix-dark font-bold leading-relaxed mb-10">
                        Traditional digital signage is static. It plays the same content for everyone, cannot understand who is standing in front of it, and offers no way for users to interact. ADORIX was built to solve that limitation.
                    </p>

                    <p className="mb-8">
                        At the heart of the project is a two-repository architecture. The <strong>adorix-project</strong> repository powers the kiosk itself, handling computer vision, wake-word detection, speech recognition, text-to-speech, and the real-time interaction flow. The <strong>adorix-webb</strong> repository acts as the cloud-based management platform, allowing businesses to upload campaigns, manage ad content, and monitor analytics through a centralized dashboard. Together, these two parts create a full smart advertising ecosystem rather than just a standalone kiosk demo.
                    </p>

                    <h2 className="text-3xl font-black text-adorix-dark mt-16 mb-8 tracking-tighter flex items-center gap-3">
                        <CornerRightDown className="text-adorix-primary" />
                        The 3-State Architecture
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { step: "01", title: "Idle Ad Loop", desc: "Generic ads play while monitoring for nearby users." },
                            { step: "02", title: "Personalized Mode", desc: "Face detection & demographics trigger relevant content." },
                            { step: "03", title: "Assistant Mode", desc: "Interactive 'Hey Adorix' voice conversation loop." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/40 p-6 rounded-3xl border border-white/60 relative overflow-hidden group hover:border-adorix-primary/20 transition-colors">
                                <span className="text-4xl font-black text-adorix-primary/10 absolute -top-2 -right-2">
                                    {item.step}
                                </span>
                                <h3 className="text-lg font-black text-adorix-dark mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="mb-8">
                        The kiosk intelligence is powered by a combination of OpenCV, DeepFace, Picovoice Porcupine, SpeechRecognition, pyttsx3, and TinyLlama. OpenCV and DeepFace are used for stable face detection and age-gender estimation, while Picovoice enables offline wake-word detection. SpeechRecognition captures user queries, pyttsx3 handles spoken responses, and TinyLlama supports flexible product question answering when direct matches are not enough.
                    </p>



                    <p className="mb-8">
                        On the frontend side, the kiosk interface was designed to make interaction clear and engaging. It uses a React-based UI with real-time WebSocket updates to show the current system state, including subtitles, product cards, microphone prompts, and animated avatar states such as wakeup, listening, and talking. These visual cues are important because they help users understand what the kiosk is doing at every stage of the interaction.
                    </p>

                    <blockquote className="my-16 p-8 bg-gradient-to-br from-adorix-dark via-adorix-dark/95 to-adorix-dark/90 rounded-[2.5rem] border-l-8 border-adorix-primary shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                             <Sparkles size={120} className="text-white" />
                        </div>
                        <p className="text-2xl md:text-3xl font-black text-white italic leading-tight mb-4 relative z-10">
                            "ADORIX is not only an interactive device, but also a scalable platform for managing smart advertising across multiple locations."
                        </p>
                        <cite className="text-adorix-primary font-bold text-sm uppercase tracking-widest relative z-10">
                            — Adorix Engineering Philosophy
                        </cite>
                    </blockquote>

                    <p className="mb-8 font-bold text-adorix-dark italic border-l-4 border-adorix-accent/30 pl-6 py-2">
                        A major engineering focus of the project was reliability. The system includes safeguards such as temporal consensus logic for noisy vision predictions, silence timeouts for abandoned interactions, local ad caching for offline operation, and safe return-to-idle behavior.
                    </p>

                    <p className="mb-12">
                        Overall, ADORIX demonstrates how static signage can evolve into a more intelligent and engaging retail experience. By combining personalized advertising, voice interaction, real-time UI feedback, and cloud-based campaign management, the project shows how AI can be applied not only to display content, but to create meaningful customer interaction at the point of engagement.
                    </p>

                    {/* Share Section */}
                    <div className="mt-20 pt-10 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex gap-2">
                             {['AI', 'Retail', 'Architecture'].map(tag => (
                                 <span key={tag} className="px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                     #{tag}
                                 </span>
                             ))}
                        </div>
                        <button className="inline-flex items-center gap-2 text-adorix-primary font-black text-xs uppercase tracking-widest hover:opacity-70 transition-opacity">
                            <Share2 size={16} /> Share Article
                        </button>
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
