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
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-white/10 backdrop-blur-md p-10 md:p-14 rounded-[2.5rem] border border-white/20 shadow-sm transition-shadow duration-300 flex flex-col items-center text-center gap-6 group"
                    >
                        {/* Content */}
                        <div className="flex flex-col items-center w-full">
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
