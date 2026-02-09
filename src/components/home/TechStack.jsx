import React from "react";

// Brand Logos (Inline SVGs for performance and no external deps)
const Logos = {
    RaspberryPi: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 3.5c-.6 0-1.1.2-1.5.5-.5-.3-1-.5-1.5-.5-1.7 0-3 1.3-3 3 0 .6.2 1.1.5 1.5-.3.5-.5 1-.5 1.5 0 1.7 1.3 3 3 3 .6 0 1.1-.2 1.5-.5.5.3 1 .5 1.5.5 1.7 0 3-1.3 3-3 0-.6-.2-1.1-.5-1.5.3-.5.5-1 .5-1.5 0-1.7-1.3-3-3-3zM9 10c-.8 0-1.5-.7-1.5-1.5S8.2 7 9 7s1.5.7 1.5 1.5S9.8 10 9 10zm6 0c-.8 0-1.5-.7-1.5-1.5S14.2 7 15 7s1.5.7 1.5 1.5S15.8 10 15 10zM5.5 14C4.1 14 3 15.1 3 16.5S4.1 19 5.5 19 8 17.9 8 16.5 6.9 14 5.5 14zm13 0c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zM9.5 16c-1.4 0-2.5 1.1-2.5 2.5S8.1 21 9.5 21 12 19.9 12 18.5 10.9 16 9.5 16zm5 0c-1.4 0-2.5 1.1-2.5 2.5S13.1 21 14.5 21 17 19.9 17 18.5 15.9 16 14.5 16z" />
        </svg>
    ),
    Python: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M14.25.75l-.95.82a17.47 17.47 0 00-6.7 0C3.77 2.1 2.1 4.14 2.1 6.55v2.33h4.48v.92H2.8a.72.72 0 00-.7.73v4.61a.72.72 0 00.7.72H6.9v3.42c0 2.4 1.68 4.45 4.5 4.96.63.1 2.92.1 3.55 0 2.8-.5 4.48-2.54 4.48-4.96v-2.33h-4.48v-.92h3.76a.72.72 0 00.7-.72V9.7a.72.72 0 00-.7-.73h-4.1V5.55c0-2.4-1.68-4.45-4.5-4.96a20.8 20.8 0 00-1.66 0zM10.74 3a.9.9 0 11-.9.9.9.9 0 01.9-.9zm2.5 14.15a.9.9 0 11.9.9.9.9 0 01-.9-.9z" />
        </svg>
    ),
    React: (props) => (
        <svg viewBox="-11.5 -10.232 23 20.463" fill="currentColor" {...props}>
            <circle r="2.05" fill="#61dafb" />
            <g stroke="#61dafb" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
        </svg>
    ),
    TensorFlow: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M11.66 2.38L2.4 6.7v3.05l9.26-3.88 9.25 3.88v-3.04L11.66 2.38zm0 5.48l-8.08 3.4 8.08 3.39 8.08-3.4-8.08-3.38zm0 8.35L4.85 13.3v7.36l6.81-2.9v-1.55zm1.37 0v1.55l6.81 2.9V13.3l-6.81 2.91z" />
        </svg>
    ),
    Node: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2zm0 2.9l5.5 3.1-2 1.1L12 7.2 8.5 9.1l-2-1.1L12 4.9zm-6 10.9V8.2l1.6.9v4.5l3.9 2.2V18L6 15.8zm12 0l-5.5 3.1v-2.2l3.9-2.2V10l3.1 1.8-1.5.9v3.1z" />
        </svg>
    ),
    OpenCV: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 0A12 12 0 1 0 12 24 12 12 0 0 0 12 0zm0 3.38a8.63 8.63 0 1 1 0 17.25 8.63 8.63 0 0 1 0-17.25zm-6.09 3.51a8.63 8.63 0 0 1 12.18 0l-2.49 2.49A5.1 5.1 0 0 0 7.4 9.38L5.91 6.89zm12.18 0l-1.49 2.49a5.1 5.1 0 0 0-5.1 9.77l1.49 2.49a8.63 8.63 0 0 1 5.1-14.75z" />
        </svg>
    ),
    JS: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.24-.156-.375l-1.785.885c.16.435.42.81.69 1.11 1.05 1.035 3.06 1.14 4.38.195 1.41-1.035 1.635-2.61 1.635-4.41V11.03z" />
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
                {/* Marquee Track - Increased size and spacing */}
                <div className="flex animate-marquee gap-24 items-center whitespace-nowrap py-4 hover:[animation-play-state:paused]">
                    {MARQUEE_ITEMS.map((tech, index) => (
                        <div key={index} className="flex items-center gap-4 text-gray-400 hover:text-adorix-primary transition-colors cursor-default group/item">
                            <div className="w-12 h-12 opacity-60 group-hover/item:opacity-100 transition-opacity">
                                <tech.icon />
                            </div>
                            <span className="text-2xl font-bold opacity-60 group-hover/item:opacity-100 transition-opacity">
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
