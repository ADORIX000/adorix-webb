'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * A reusable typing animation component using Framer Motion.
 * 
 * @param {string} text - The text to animate.
 * @param {string} className - Optional CSS classes for the container.
 * @param {number} delay - Base delay before animation starts.
 * @param {number} speed - Delay between each character.
 * @param {number} startDelay - Additional delay before starting.
 * @param {boolean} triggerOnce - Whether to trigger animation only once when in view.
 */
const TypingText = ({ 
    text, 
    className = "", 
    delay = 0, 
    speed = 0.05, 
    startDelay = 0, 
    triggerOnce = true 
}) => {
    return (
        <span className={className}>
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: triggerOnce }}
                    transition={{
                        duration: 0.1,
                        delay: startDelay + delay + index * speed
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

export default TypingText;
