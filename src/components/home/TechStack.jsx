import React from "react";

// Brand Logos (Full Color Inline SVGs)
const Logos = {
    RaspberryPi: (props) => (
        <svg viewBox="0 0 30 40" {...props}>
            <path fill="#BC1142" d="M29.6 13.9c.3-2.6-1.8-4.9-4.3-5.3-2.3-.4-6-5.8-9.1-8.6-.5-.4-1.2.2-1.2 1.1 0 0 .5 3.9.5 4.3 0 1.6-1.5 2.5-3 1.8-1.5-1-4.3-1.8-4.3-1.8-1 0-1.8-.4-1.8-1.5 0-.4 0-4.3 0-4.3 0-.9-.7-1.5-1.2-1.1C2 5.8 2 5.8 2 5.8c-2.3.4-4.5 2.6-4.3 5.3.2 2.7 2.1 4.7 4.7 4.9.4 0 .9 0 1.2 0 1.3 0 2.6-.2 3.8-.7.7-.3 1.5 0 1.9.6.5.9 1 2.2 1.3 3.6.1.4.6.6 1 .4.5-.1 1.1-.3 1.6-.4.4-.1.6-.6.5-1-.3-1.4-.7-2.7-1.3-3.6-.4-.7.4-1.1 1.9-.6 1.3.5 2.6.7 3.8.7.4 0 .8 0 1.2 0 2.7-.2 4.6-2.2 4.8-4.9z" />
            <path fill="#C7244F" d="M23.1 39.5c.6-.9 1.1-1.8 1.6-2.8 1.3-3.1.6-7.8-2.6-11.4-1.9-2.1-4.5-4-7-5.1-.6-.2-1.1-.1-1.3.5-.2.6.1 1.1.6 1.3 1.3.4 2.5 1 3.7 1.7 1.6.9 3.1 2 4.3 3.4 3 3.4 3.7 7.9 2.5 10.8-.4.9-.9 1.8-1.7 2.6-1 .9-2.1 1.6-3.3 1.9-1.9.4-4.3-2.8-5.3-6.6-.1-.5-.6-.7-1.1-.7s-1 .2-1.1.7c-1 3.8-3.4 6.9-5.3 6.6-1.2-.3-2.4-.9-3.3-1.9-.8-.8-1.3-1.7-1.7-2.6-1.3-2.9-.5-7.4 2.5-10.8 1.2-1.3 2.7-2.5 4.3-3.4 1.1-.7 2.4-1.2 3.7-1.7.5-.2.8-.8.6-1.3-.2-.5-.8-.7-1.3-.5-2.5 1.1-5.1 3-7 5.1-3.2 3.6-3.9 8.3-2.6 11.4.5 1 1 1.9 1.6 2.8.9 1.4 2 2.6 3.4 3.4 2.5 1.4 6 1.1 8.7-2 2.7 3.1 6.2 3.4 8.7 2 1.4-.8 2.6-2 3.4-3.4z" />
            <path fill="#6CC04A" d="M22.8 7.3c-.6-.7-1.3-1.3-2-1.8-.7-.5-1.5-.9-2.3-1.1-.7-.2-1.4-.2-2-.1-.5.1-.9.3-1.2.6-.3.3-.5.7-.6 1.1-.1.4-.1.9.1 1.3.2.4.5.8.9 1 .4.2.9.4 1.4.4.5.1 1 .1 1.5 0 .5-.1 1-.3 1.4-.6.3-.3.6-.6.8-1 .1-.4.1-.9 0-1.3zM7.2 7.3c.7-.7 1.5-1.2 2.4-1.5.8-.3 1.7-.4 2.5-.2.5.1 1 .4 1.4.8.3.4.5.9.5 1.4 0 .5-.2 1-.5 1.4-.3.4-.8.7-1.3.9-.5.2-1.1.3-1.6.2-.5-.1-1.1-.3-1.5-.7-.4-.3-.7-.8-.9-1.2-.1-.4-.2-.9-.1-1.4.1-.5.4-1 1.1-1.7z" />
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
    )
};

const TECH_STACK = [
    { name: "Raspberry Pi", icon: Logos.RaspberryPi },
    { name: "Python", icon: Logos.Python },
    { name: "TensorFlow", icon: Logos.TensorFlow },
    { name: "OpenCV", icon: Logos.OpenCV },
    { name: "Node.js", icon: Logos.Node },
    { name: "React", icon: Logos.React },
    { name: "JavaScript", icon: Logos.JS },
];

// Duplicate for marquee effect
const MARQUEE_ITEMS = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

const TechStack = () => {
    return (
        <div className="w-full py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Powered by Industry Standard Tech
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Marquee Track */}
                <div className="flex animate-marquee gap-24 items-center whitespace-nowrap py-4 hover:[animation-play-state:paused]">
                    {MARQUEE_ITEMS.map((tech, index) => (
                        <div key={index} className="flex items-center gap-4 cursor-default group/item grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                            <div className="w-12 h-12">
                                <tech.icon />
                            </div>
                            <span className="text-2xl font-bold text-gray-500 group-hover:text-gray-900 transition-colors">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                    min-width: 100%;
                }
            `}</style>
        </div>
    );
};

export default TechStack;
