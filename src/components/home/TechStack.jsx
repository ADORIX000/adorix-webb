import React, { useEffect, useRef, useState } from "react";

// Brand Logos (Full Color Inline SVGs)
const Logos = {
    RaspberryPi: (props) => (
        <svg viewBox="0 0 100 120" {...props}>
            <path stroke="#BF1042" strokeWidth="2" fill="#C51A4A" d="M16 112c.5-5.5-2.2-7.5-6.5-12.2-2.3-2.6-3.7-5.4-3.5-7.7 0-.5.6-.2 1.2.6.4.7.7 1.2 2.1 2.2 4.4 3 6.6 4.6 13.9 10.9 9.3 8 20.3 8.3 27 8.3 6.7 0 17.6-.3 27-8.3 7.3-6.3 9.5-7.9 13.9-10.9 1.4-1 1.7-1.5 2.1-2.2.6-.8 1.2-1.1 1.2-.6.2 2.3-1.2 5.1-3.5 7.7-4.3 4.7-7 6.7-6.5 12.2 1 9.9 8.7 15.6 9.4 16.1 1.5.9 2.5.3 2.1-1.3-.8-3.4-1.3-3.6-1.5-4.1-1.5-3.3-1.8-8 .4-12.7 1.9-4 3.7-10.9 4-19 .5-13.6-7.8-21.6-11.8-25.2-1.7-1.5-2-2.1-1.7-4.8.2-1.2 1.3-4.1 2.4-7.8 1.1-3.6 1.8-5.3 1.8-5.8 0-.4-.3-1.4-.9-2.7-1.8-3.5-5.6-5.7-9.5-5.7-4.2 0-8.6 3.4-11 8.5l-.9 1.9c-.3.7-.7.9-1.3.4C63.2 47.7 57.7 45.4 50 45.4c-7.7 0-13.2 2.3-16.5 6.3-.6.5-1 .3-1.3-.4l-.9-1.9c-2.4-5.1-6.8-8.5-11-8.5-3.9 0-7.7 2.2-9.5 5.7-.6 1.3-.9 2.3-.9 2.7 0 .5.7 2.2 1.8 5.8 1.1 3.7 2.2 6.6 2.4 7.8.3 2.7 0 3.3-1.7 4.8-4 3.6-12.3 11.6-11.8 25.2.3 8.1 2.1 15 4 19 2.2 4.7 1.9 9.4.4 12.7-.2.5-.7.7-1.5 4.1-.4 1.6.6 2.2 2.1 1.3.7-.5 8.4-6.2 9.4-16.1z" />
            <path stroke="#6DB33F" strokeWidth="2" fill="#7CBD42" d="M78 18.2c-.4 5.9-4.8 15.3-10.4 17.6-1.5.6-2.5 1.1-3.6 2 4.2 17.5 1.1 28.5-8.4 29.5-9.3.9-19.1-8.7-19.1-8.7-2.6-3-5.2-3-7.8 0 0 0-9.8 9.6-19.1 8.7-9.5-1-12.6-12-8.4-29.5-1.1-.9-2.1-1.4-3.6-2-5.6-2.3-10-11.7-10.4-17.6-.8-11.4 7.9-15.7 7.9-15.7 3.3-1.5 7.4-1 10.4.9l.4.2c3.1 1.9 5.8 1.8 7.3.3.4-.4 1.1-1.1 2.2-2.3 3.6-3.8 10-3.3 12.1-.9l1.6 1.9c2 2.3 5 2.3 7 0l1.6-1.9c2.1-2.4 8.5-2.9 12.1.9 1.1 1.2 1.8 1.9 2.2 2.3 1.5 1.5 4.2 1.6 7.3-.3l.4-.2c3-1.9 7.1-2.4 10.4-.9 0 0 8.7 4.3 7.9 15.7z" />
        </svg>
    ),
    Python: (props) => (
        <svg viewBox="0 0 100 100" {...props}>
            <defs>
                <linearGradient id="py_a" x1="16" y1="17" x2="88" y2="82" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#3776AB" />
                    <stop offset="1" stopColor="#2F6690" />
                </linearGradient>
                <linearGradient id="py_b" x1="14" y1="16" x2="84" y2="86" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#FFD343" />
                    <stop offset="1" stopColor="#FFC331" />
                </linearGradient>
            </defs>
            <path fill="url(#py_a)" d="M49.7 10.7c-9.6 0-18.4 1-18.4 8v8.6H49v2.8H18.6c-4.4 0-8.3 3.5-8.3 8.3v22.4h17.2v-5c0-5.8 4.8-10.6 10.6-10.6h17v-8.6c0-6-8.5-7.9-15.4-7.9zm-6 5.8c1.7 0 3 1.4 3 3s-1.4 3-3 3-3-1.4-3-3 1.3-3 3-3z" />
            <path fill="url(#py_b)" d="M50.2 89.3c9.6 0 17.5-1.2 17.5-8.2V72.6H51v-2.9h29.5c4.4 0 8.3-3.5 8.3-8.3V39H71.5v5c0 5.8-4.8 10.6-10.6 10.6H43.9v8.6c0 6.1 8.8 8 15.7 8l.6 18.1zm6.2-14.7c-1.7 0-3-1.4-3-3s1.4-3 3-3c1.6 0 3 1.3 3 3s-1.3 3-3 3z" />
        </svg>
    ),
    React: (props) => (
        <svg viewBox="-11.5 -10.232 23 20.463" {...props}>
            <circle r="2.05" fill="#61dafb" />
            <g stroke="#61dafb" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
        </svg>
    ),
    TensorFlow: (props) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path fill="#FF6F00" d="M11.66 2.38L2.4 6.7v3.05l9.26-3.88 9.25 3.88v-3.04L11.66 2.38z" />
            <path fill="#FFA000" d="M11.66 7.86l-8.08 3.4 8.08 3.39 8.08-3.4-8.08-3.38z" />
            <path fill="#FFD54F" d="M11.66 16.21L4.85 13.3v7.36l6.81-2.9v-1.55zm1.37 0v1.55l6.81 2.9V13.3l-6.81 2.91z" />
        </svg>
    ),
    Node: (props) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path fill="#339933" d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2zm0 2.9l5.5 3.1-2 1.1L12 7.2 8.5 9.1l-2-1.1L12 4.9zm-6 10.9V8.2l1.6.9v4.5l3.9 2.2V18L6 15.8zm12 0l-5.5 3.1v-2.2l3.9-2.2V10l3.1 1.8-1.5.9v3.1z" />
        </svg>
    ),
    OpenCV: (props) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path fill="#FF0000" d="M12 0A12 12 0 1 0 12 24 12 12 0 0 0 12 0zm0 3.38a8.63 8.63 0 1 1 0 17.25 8.63 8.63 0 0 1 0-17.25z" />
            <path fill="#0000FF" d="M5.91 6.89A8.63 8.63 0 0 1 18.09 6.89L15.6 9.38a5.1 5.1 0 0 0-7.2 0L5.91 6.89z" />
            <path fill="#00FF00" d="M18.09 17.11a8.63 8.63 0 0 1-12.18 0l2.49-2.49a5.1 5.1 0 0 0 7.2 0l2.49 2.49z" />
        </svg>
    ),
    JS: (props) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path fill="#F7DF1E" d="M0 0h24v24H0V0z" />
            <path fill="#000" d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.24-.156-.375l-1.785.885c.16.435.42.81.69 1.11 1.05 1.035 3.06 1.14 4.38.195 1.41-1.035 1.635-2.61 1.635-4.41V11.03z" />
        </svg>
    ),
    Vite: (props) => (
        <svg viewBox="0 0 410 404" {...props}>
            <path fill="#FFC920" d="M370.6 8.7l30.2 24.3-199 371.1-2.4-1.2L0 33 30.2 8.7h340.4z" />
            <path fill="#BD34FE" d="M228.4 345.1L188.2 3.8l164.6 150.8-124.4 190.5z" />
            <path fill="#4DB6AC" d="M199.6 374.9L.1 31.8l158.4 150.3 41.1 192.8z" />
        </svg>
    ),
    Tailwind: (props) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path fill="#38BDF8" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
    ),
    Framer: (props) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path fill="#000" d="M4 0h16v8h-8zM4 12h8v8h-8zM4 24h8v-8h8v-8h-8v-8h-8z" />
        </svg>
    ),
    Recharts: (props) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path fill="#22d3ee" d="M3 3v18h18v-2H5V3H3zm4 14h2v-7H7v7zm4 0h2V8h-2v9zm4 0h2v-5h-2v5z" />
        </svg>
    ),
    Picovoice: (props) => (
        <svg viewBox="0 0 24 24" {...props}>
            <path fill="#377DFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
        </svg>
    )

};

const TECH_STACK = [
    { name: "Raspberry Pi", icon: Logos.RaspberryPi, url: "https://www.raspberrypi.org/" },
    { name: "Python", icon: Logos.Python, url: "https://www.python.org/" },
    { name: "TensorFlow", icon: Logos.TensorFlow, url: "https://www.tensorflow.org/" },
    { name: "OpenCV", icon: Logos.OpenCV, url: "https://opencv.org/" },
    { name: "Node.js", icon: Logos.Node, url: "https://nodejs.org/" },
    { name: "React", icon: Logos.React, url: "https://react.dev/" },
    { name: "JavaScript", icon: Logos.JS, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "Vite", icon: Logos.Vite, url: "https://vitejs.dev/" },
    { name: "Tailwind CSS", icon: Logos.Tailwind, url: "https://tailwindcss.com/" },
    { name: "Framer Motion", icon: Logos.Framer, url: "https://www.framer.com/motion/" },
    { name: "Recharts", icon: Logos.Recharts, url: "https://recharts.org/" },
    { name: "Picovoice", icon: Logos.Picovoice, url: "https://picovoice.ai/" },
];



const TechStack = () => {
    const containerRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
                setScrollY(scrollProgress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="w-full pt-0 pb-20 overflow-hidden relative">
            <h2 className="text-4xl font-bold text-center mb-24 text-gray-800 animate-fade-in-up">
                Tech Stack
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-6 px-4 max-w-7xl mx-auto">
                {TECH_STACK.map((tech, index) => {
                    // Calculate wave offset for each item
                    const waveOffset = Math.sin((scrollY * Math.PI * 2) + (index * 0.5)) * 40;

                    return (
                        <a
                            key={index}
                            href={tech.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 cursor-pointer group/item transition-all duration-300 hover:scale-110 relative"
                            style={{
                                transform: `translateY(${waveOffset}px)`,
                                transition: 'transform 0.3s ease-out'
                            }}
                        >
                            {/* Logo with white circular background */}
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-4 shadow-lg">
                                <tech.icon className="w-full h-full" />
                            </div>

                            {/* Tooltip on hover */}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {tech.name}
                            </span>
                        </a>
                    );
                })}
            </div>


        </div>
    );
};

export default TechStack;

