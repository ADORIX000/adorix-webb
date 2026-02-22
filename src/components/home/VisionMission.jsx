"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

const VisionMission = () => {
    const cardData = [
        {
            title: "Our Vision",
            content: "To breathe life into the digital frontier, creating a world where every screen is a sentient partner that understands, anticipates, and respects the human gaze."
        },
        {
            title: "Our Mission",
            content: "To pioneer the next generation of interactive intelligence—transforming raw physiological data into meaningful brand dialogues through ethical, high-fidelity AI vision."
        }
    ];

    return (
        <section className="py-24 px-6 max-w-4xl mx-auto z-10 relative">
            <div className="flex flex-col gap-10">
                {cardData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 0.7,
                            ease: [0.175, 0.885, 0.32, 1.275], // Custom spring-like easing
                            delay: index * 0.15 // Staggered appearance
                        }}
                        className="relative bg-white/10 backdrop-blur-md p-10 md:p-14 rounded-[2.5rem] shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-white flex flex-col items-center text-center gap-6 group overflow-hidden"
                    >
                        {/* Animated Border Lining */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[2.5rem]" preserveAspectRatio="none">
                            <motion.rect
                                width="100%"
                                height="100%"
                                rx="40"
                                fill="none"
                                stroke="var(--adorix-primary)"
                                strokeWidth="4"
                                initial={{ strokeDasharray: "0 2000", strokeOpacity: 0 }}
                                whileInView={{ strokeDasharray: "2000 0", strokeOpacity: [0, 1, 0.2] }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.5, delay: index * 0.15 + 0.3, ease: "easeInOut" }}
                            />
                        </svg>

                        {/* Standard Static Border (Fallback/Subtle) */}
                        <div className="absolute inset-0 rounded-[2.5rem] border border-white/20 pointer-events-none" />

                        {/* Content */}
                        <div className="flex flex-col items-center w-full relative z-10">
                            <div className="relative inline-block mb-6">
                                <h2 className="text-4xl font-bold text-adorix-dark cursor-default">
                                    {item.title}
                                </h2>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                                {item.content}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default VisionMission;
