import React from 'react';
import { motion } from 'framer-motion';

const TypingText = ({ text, className, delay = 0, speed = 0.03, startDelay = 0, triggerOnce = true }) => {
    return (
        <span className={className}>
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: triggerOnce }}
                    transition={{
                        duration: 0.05,
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
