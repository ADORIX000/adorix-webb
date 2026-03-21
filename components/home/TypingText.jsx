'use client';

import { useEffect, useState } from 'react';

/**
 * TypingText – animates characters one by one.
 * @param {string}  text       - The text to type out.
 * @param {number}  speed      - Seconds between each character (default 0.05).
 * @param {number}  startDelay - Seconds to wait before starting (default 0).
 */
export default function TypingText({ text = '', speed = 0.05, startDelay = 0 }) {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        setDisplayed('');
        let timeout;

        timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayed(text.slice(0, i + 1));
                i++;
                if (i >= text.length) clearInterval(interval);
            }, speed * 1000);

            return () => clearInterval(interval);
        }, startDelay * 1000);

        return () => clearTimeout(timeout);
    }, [text, speed, startDelay]);

    return <span>{displayed}</span>;
}
