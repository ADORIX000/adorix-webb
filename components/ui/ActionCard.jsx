'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ActionCard = ({ title, description, icon: Icon, href, color = "adorix-primary" }) => {
    return (
        <Link href={href} className="group h-full">
            <motion.div
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="h-full p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all flex flex-col items-start"
            >
                <div className={`p-4 rounded-2xl bg-opacity-10 mb-6 group-hover:scale-110 transition-transform flex items-center justify-center`} style={{ backgroundColor: `var(--${color}-bg, rgba(13, 148, 136, 0.1))` }}>
                    <Icon className={`w-8 h-8 text-adorix-primary`} />
                </div>
                
                <h3 className="text-2xl font-bold text-adorix-dark mb-3 group-hover:text-adorix-primary transition-colors">
                    {title}
                </h3>
                
                <p className="text-gray-500 text-lg leading-relaxed mb-8 flex-grow">
                    {description}
                </p>
                
                <div className="flex items-center gap-2 font-bold text-adorix-primary">
                    Learn more <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
            </motion.div>
        </Link>
    );
};

export default ActionCard;
