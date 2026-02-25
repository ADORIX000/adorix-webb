"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Hyper-Premium Advanced Animation Components (High Visibility v2.2) ---

const BioMesh = ({ isPaused }) => {
    // 8 neural nodes inside the face covering the brain and jaw area
    const brainNodes = [
        { x: 50, y: 20 }, { x: 42, y: 32 }, { x: 38, y: 50 }, { x: 45, y: 65 },
        { x: 75, y: 25 }, { x: 70, y: 60 }, { x: 55, y: 78 }, { x: 65, y: 90 }
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white rounded-2xl group border border-gray-100 shadow-sm">
            {/* White background with subtle border for a clean, premium look */}
            <svg viewBox="0 0 100 100" className="w-full h-full p-4 transition-transform duration-700 group-hover:scale-[1.03] origin-center relative z-10">
                <defs>
                    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Shadow for floating HUD elements */}
                    <filter id="dropShadowLight" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#1F2B2D" floodOpacity="0.1" />
                    </filter>
                </defs>

                {/* Base Grid in background - darker for visibility on white */}
                <g stroke="var(--adorix-primary)" strokeWidth="0.2" opacity="0.15">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(y => <line key={`hy${y}`} x1="0" y1={y} x2="100" y2={y} />)}
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(x => <line key={`vx${x}`} x1={x} y1="0" x2={x} y2="100" />)}
                </g>

                {/* Internal Circuitry/Grid mapping */}
                <g>
                    {/* Horizontal scanning line inside face - using primary color for visibility */}
                    <motion.rect x="0" y="0" width="100" height="1.5" fill="var(--adorix-primary)" opacity="0.3"
                        animate={isPaused ? { y: [0, 100] } : { y: [0, 100] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Inner tech concentric circles acting like a brain lobe */}
                    <circle cx="65" cy="40" r="25" fill="none" stroke="var(--adorix-secondary)" strokeWidth="0.5" opacity="0.4" />
                    <circle cx="65" cy="40" r="15" fill="none" stroke="var(--adorix-accent)" strokeWidth="0.5" opacity="0.3" />
                </g>

                {/* Core Brain Hub (Center of activity) - Orange stands out well on white */}
                <g transform="translate(65, 40)">
                    <motion.circle r="16" fill="none" stroke="var(--adorix-secondary)" strokeDasharray="2 4" strokeWidth="1"
                        animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
                    <motion.circle r="10" fill="none" stroke="var(--adorix-primary)" strokeDasharray="8 4" strokeWidth="1.5"
                        animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
                    <circle r="3" fill="var(--adorix-primary)" />
                    <motion.circle r="6" fill="var(--adorix-primary)" opacity="0.4" filter="url(#softGlow)"
                        animate={isPaused ? { scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] } : { scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                </g>

                {/* Neural Pathways connecting from core to face nodes */}
                {brainNodes.map((node, i) => (
                    <g key={`pathway-${i}`}>
                        <line x1="65" y1="40" x2={node.x} y2={node.y} stroke="var(--adorix-primary)" strokeWidth="0.4" opacity="0.5" />
                        {isPaused && (
                            <motion.circle r="1" fill="var(--adorix-primary)"
                                animate={{ cx: [65, node.x], cy: [40, node.y], opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: (i % 3) * 0.4, ease: "easeOut" }}
                            />
                        )}
                        <circle cx={node.x} cy={node.y} r="1.5" fill="white" stroke={i % 2 === 0 ? "var(--adorix-primary)" : "var(--adorix-accent)"} strokeWidth="0.5" />
                        <motion.circle cx={node.x} cy={node.y} r="1" fill={i % 2 === 0 ? "var(--adorix-primary)" : "var(--adorix-accent)"}
                            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2 + (i % 3), repeat: Infinity }}
                        />
                    </g>
                ))}

                {/* HUD Connections from left edge to face */}
                <path d="M 28 26 L 35 26 L 42 35" fill="none" stroke="var(--adorix-secondary)" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="1 1" />
                <path d="M 32 55 L 38 55 L 40 50" fill="none" stroke="var(--adorix-secondary)" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="1 1" />
                <path d="M 32 80 L 38 80 L 42 70" fill="none" stroke="var(--adorix-secondary)" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="1 1" />

                {/* Left Side Small HUD Text - Darker colors for readability on white */}
                <g>
                    <text x="30" y="24" fontSize="3" fill="var(--adorix-primary)" fontFamily="monospace" fontWeight="700">PREDICTIVE AI</text>
                    <text x="30" y="28" fontSize="2" fill="var(--adorix-secondary)" fontFamily="monospace" fontWeight="500">SYS.NEURAL.NET</text>

                    <text x="34" y="52" fontSize="3" fill="var(--adorix-primary)" fontFamily="monospace" fontWeight="700">GENERATIVE</text>
                    <text x="34" y="56" fontSize="2" fill="var(--adorix-secondary)" fontFamily="monospace" fontWeight="500">SYNTHETIC LOGIC</text>

                    <text x="34" y="78" fontSize="3" fill="var(--adorix-dark)" fontFamily="monospace" fontWeight="700">COGNITIVE</text>
                    <text x="34" y="82" fontSize="2" fill="var(--adorix-secondary)" fontFamily="monospace" fontWeight="500">DATA PROCESSING</text>
                </g>

                {/* Left Side Floating HUD Badges - Light theme styling */}
                {/* Badge 1: Top */}
                <g transform="translate(3, 20)">
                    <rect width="25" height="12" rx="2" fill="white" stroke="var(--adorix-primary)" strokeWidth="0.5" filter="url(#dropShadowLight)" />
                    <circle cx="6" cy="6" r="2" fill="var(--adorix-primary)" />
                    <rect x="10" y="4" width="10" height="1.5" fill="var(--adorix-secondary)" opacity="0.6" />
                    <rect x="10" y="7" width="12" height="1.5" fill="var(--adorix-secondary)" opacity="0.3" />
                    <motion.rect x="10" y="4" width="4" height="4.5" fill="var(--adorix-primary)" opacity="0.8"
                        animate={isPaused ? { x: [10, 18, 10] } : {}} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </g>

                {/* Badge 2: Middle (Circular focus) */}
                <g transform="translate(10, 48)">
                    <rect width="22" height="20" rx="4" fill="white" stroke="var(--adorix-accent)" strokeWidth="0.5" filter="url(#dropShadowLight)" />
                    <circle cx="11" cy="10" r="4.5" fill="none" stroke="var(--adorix-primary)" strokeWidth="1" />
                    <circle cx="11" cy="10" r="2" fill="var(--adorix-accent)" />
                </g>

                {/* Badge 3: Bottom */}
                <g transform="translate(4, 75)">
                    <rect width="28" height="10" rx="2" fill="white" stroke="var(--adorix-primary)" strokeWidth="0.5" filter="url(#dropShadowLight)" />
                    <circle cx="24" cy="5" r="2" fill="var(--adorix-accent)" />
                    <rect x="4" y="3" width="14" height="1" fill="var(--adorix-secondary)" opacity="0.4" />
                    <rect x="4" y="6" width="10" height="1" fill="var(--adorix-secondary)" opacity="0.4" />
                    <motion.circle cx="18" cy="6" r="1.5" fill="var(--adorix-primary)"
                        animate={isPaused ? { opacity: [0, 1, 0] } : { opacity: 1 }} transition={{ duration: 1, repeat: Infinity }}
                    />
                </g>
            </svg>
        </div>
    );
};

const SupersonicStream = ({ isPaused }) => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white rounded-2xl group border border-gray-100 shadow-sm">
        <svg viewBox="0 0 100 100" className="w-full h-full p-2 origin-center relative z-10">
            <defs>
                <filter id="speedGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <linearGradient id="windowGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f0f4f8" stopOpacity="0.9" />
                </linearGradient>
            </defs>

            {/* Background Parallax Speed Particles */}
            <g opacity="0.4">
                {/* Slow distant lines */}
                {[10, 30, 60, 85].map((y, i) => (
                    <motion.line key={`bg1-${y}`} x1="120" x2="10" y1={y} y2={y} stroke="var(--adorix-primary)" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="30 40 10 20"
                        animate={isPaused ? { x: [-50, 150] } : {}} transition={{ duration: 4 - (i * 0.5), repeat: Infinity, ease: "linear" }}
                    />
                ))}

                {/* Fast close dashed blocks */}
                {[20, 45, 75, 90].map((y, i) => (
                    <motion.line key={`bg2-${y}`} x1="150" x2="-20" y1={y} y2={y} stroke="var(--adorix-accent)" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="5 15" opacity="0.7"
                        animate={isPaused ? { x: [-100, 100] } : {}} transition={{ duration: 1.5 - (i * 0.2), repeat: Infinity, ease: "linear" }}
                    />
                ))}

                {/* Speed frames (Angled polygons) */}
                <motion.polygon points="80,10 95,10 85,90 70,90" fill="var(--adorix-primary)" opacity="0.1"
                    animate={isPaused ? { x: [-120, 100] } : {}} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
            </g>

            {/* Central Orbit / Tether Line */}
            <circle cx="50" cy="50" r="30" fill="none" stroke="var(--adorix-secondary)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />

            <g filter="url(#speedGlow)">
                {/* Tether connecting window to speedometer */}
                <motion.path d="M 50 50 Q 65 70, 75 75" fill="none" stroke="var(--adorix-accent)" strokeWidth="0.8" strokeDasharray="2 2"
                    animate={isPaused ? { strokeDashoffset: [0, -20] } : {}} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </g>

            {/* Central Browser Window with High-Frequency Jitter */}
            <motion.g
                animate={isPaused ? { x: [-0.5, 0.5, -0.2, 0.2, 0], y: [-0.2, 0.2, 0, -0.2, 0] } : {}}
                transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror" }}
            >
                {/* Window Body */}
                <rect x="25" y="30" width="50" height="40" rx="3" fill="url(#windowGlass)" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.4))" />

                {/* Top Browser Bar */}
                <rect x="25" y="30" width="50" height="8" rx="3" fill="var(--adorix-dark)" />
                {/* Window Buttons */}
                <circle cx="28" cy="34" r="1.5" fill="#ff5f56" />
                <circle cx="32" cy="34" r="1.5" fill="#ffbd2e" />
                <circle cx="36" cy="34" r="1.5" fill="#27c93f" />

                {/* Code / Data Lines inside Window */}
                <rect x="30" y="44" width="20" height="2" fill="var(--adorix-primary)" opacity="0.5" rx="1" />
                <rect x="30" y="48" width="15" height="2" fill="var(--adorix-primary)" opacity="0.5" rx="1" />
                <rect x="30" y="52" width="25" height="2" fill="var(--adorix-primary)" opacity="0.5" rx="1" />
                <rect x="30" y="56" width="18" height="2" fill="var(--adorix-primary)" opacity="0.5" rx="1" />
                <rect x="30" y="60" width="22" height="2" fill="var(--adorix-primary)" opacity="0.5" rx="1" />

                {/* Pulsing Lightning Bolt */}
                <motion.g transform="translate(52, 43)" filter="url(#speedGlow)">
                    <motion.path d="M 8 0 L 2 10 L 7 10 L 4 20 L 14 8 L 9 8 Z" fill="var(--adorix-primary)"
                        animate={isPaused ? { opacity: [0.7, 1, 0.7], scale: [0.95, 1.05, 0.95] } : {}} transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.g>
            </motion.g>

            {/* Bottom Right Speedometer (Adapted for Light Background) */}
            <g transform="translate(68, 68)" filter="url(#speedGlow)">
                <circle cx="10" cy="10" r="12" fill="white" stroke="var(--adorix-primary)" strokeWidth="1.5" />
                {/* Tick marks */}
                {[...Array(9)].map((_, i) => (
                    <line key={`tick-${i}`} x1="10" y1="2" x2="10" y2={i > 4 ? "4" : "3"} stroke={i > 6 ? "var(--adorix-primary)" : "var(--adorix-primary)"} strokeWidth={i > 6 ? "0.8" : "0.4"}
                        transform={`rotate(${i * 30 - 120} 10 10)`}
                    />
                ))}

                {/* Speedometer Needle (Ticking clockwise like a clock) */}
                <motion.g
                    animate={isPaused ? { rotate: [0, 360] } : { rotate: 0 }}
                    transition={isPaused ? { duration: 12, repeat: Infinity, ease: (t) => Math.floor(t * 12) / 12 } : { duration: 1, ease: "easeOut" }}
                    style={{ transformOrigin: '10px 10px' }}
                >
                    <polygon points="9,10 11,10 10,2" fill="var(--adorix-primary)" />
                    <circle cx="10" cy="10" r="1.5" fill="var(--adorix-dark)" />
                    <circle cx="10" cy="10" r="0.5" fill="white" />
                </motion.g>
            </g>

        </svg>
    </div>
);

const QuantumVault = ({ isPaused }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white rounded-2xl group border border-gray-100 shadow-sm">
            <svg viewBox="0 0 100 100" className="w-full h-full p-2 transition-transform duration-700 group-hover:scale-[1.03] origin-center relative z-10">
                <defs>
                    <filter id="neonGlowVideo" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="intenseGlowVideo" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="whorlDistortion">
                        <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>

                    {/* Footprint gradient for the scanning area - updated for light mode */}
                    <linearGradient id="laserFootprint" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--adorix-accent)" stopOpacity="0" />
                        <stop offset="100%" stopColor="var(--adorix-accent)" stopOpacity="0.15" />
                    </linearGradient>

                    <clipPath id="scannerWipeClip">
                        <motion.rect x="0" y="-10" width="100" height="25"
                            animate={isPaused ? { y: [-30, 110, -30] } : { y: -50 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </clipPath>

                    {/* Oval clipping mask for the fingerprint */}
                    <clipPath id="fingerClip">
                        <ellipse cx="50" cy="50" rx="16" ry="24" />
                    </clipPath>

                    {/* Highly detailed base geometry for the fingerprint */}
                    <g id="organicBasePrint" style={{ transformOrigin: '50px 50px', transform: 'scale(0.85)' }} clipPath="url(#fingerClip)">
                        {Array.from({ length: 22 }).map((_, i) => (
                            <path key={`ring-${i}`} d={`M ${50 - i * 1.3} 85 L ${50 - i * 1.3} 45 A ${i * 1.3} ${i * 1.5} 0 0 1 ${50 + i * 1.3} 45 L ${50 + i * 1.3} 85`} fill="none" />
                        ))}
                        <circle cx="50" cy="45" r="0.5" fill="none" />
                    </g>
                </defs>

                {/* Subtle Background Grid Effect */}
                <g fill="var(--adorix-primary)" opacity="0.1">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) =>
                        [10, 20, 30, 40, 50, 60, 70, 80, 90].map((y) => (
                            <circle key={`dot-${x}-${y}`} cx={x} cy={y} r="0.5" />
                        ))
                    )}
                </g>

                {/* Outer HUD Rings (Video match) - Static */}
                <g filter="url(#neonGlowVideo)">
                    <g style={{ transformOrigin: '50px 50px' }}>
                        <ellipse cx="50" cy="50" rx="28" ry="36" fill="none" stroke="var(--adorix-primary)" strokeWidth="0.5" strokeDasharray="3 4 1 8" opacity="0.4" />
                        <ellipse cx="50" cy="50" rx="27" ry="35" fill="none" stroke="var(--adorix-accent)" strokeWidth="0.2" strokeDasharray="20 10" opacity="0.6" />

                        {/* HUD crosshair ticks attached to inner ring (oval aligned) */}
                        <path d="M 50 12 L 50 14 M 50 86 L 50 88 M 20 50 L 22 50 M 78 50 L 80 50" stroke="var(--adorix-accent)" strokeWidth="0.8" />
                    </g>

                    <g style={{ transformOrigin: '50px 50px' }}>
                        <ellipse cx="50" cy="50" rx="24" ry="32" fill="none" stroke="#ffffff" strokeWidth="0.2" strokeDasharray="1 3" opacity="0.4" />
                        {/* Rotating angle brackets (oval aligned) */}
                        <path d="M 26 50 L 28 47 M 26 50 L 28 53 M 74 50 L 72 47 M 74 50 L 72 53" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
                    </g>

                    {/* Inner segmented rotating ring */}
                    <g style={{ transformOrigin: '50px 50px' }}>
                        <ellipse cx="50" cy="50" rx="22" ry="30" fill="none" stroke="var(--adorix-primary)" strokeWidth="1" strokeDasharray="40 80" opacity="0.5" />
                    </g>
                </g>

                {/* Static Crosshair / Target */}
                <g stroke="var(--adorix-primary)" strokeWidth="0.3" opacity="0.5" filter="url(#neonGlowVideo)">
                    <line x1="50" y1="18" x2="50" y2="28" />
                    <line x1="50" y1="72" x2="50" y2="82" />
                    <line x1="25" y1="50" x2="35" y2="50" />
                    <line x1="65" y1="50" x2="75" y2="50" />

                    <circle cx="50" cy="50" r="1.5" fill="var(--adorix-accent)" />
                </g>

                {/* Left/Right Data Matrix (HEX Codes) */}
                <g clipPath="url(#hexDataClip)" opacity="0.7">
                    <clipPath id="hexDataClip">
                        <rect x="0" y="20" width="100" height="60" />
                    </clipPath>
                    <motion.g animate={isPaused ? { y: [0, -40] } : { y: 0 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                        {Array.from({ length: 30 }).map((_, i) => (
                            <text key={`L-${i}`} x="8" y={i * 5} fontSize="2.5" fill="var(--adorix-primary)" fontFamily="monospace" fontWeight="bold">
                                {i % 2 === 0 ? "0x" : "0A"}{(i * 7 % 99).toString(16).toUpperCase().padStart(2, '0')}
                            </text>
                        ))}
                    </motion.g>
                    <motion.g animate={isPaused ? { y: [-40, 0] } : { y: 0 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
                        {Array.from({ length: 30 }).map((_, i) => (
                            <text key={`R-${i}`} x="85" y={i * 5} fontSize="2.5" fill="var(--adorix-accent)" fontFamily="monospace" fontWeight="bold">
                                {(i * 13 % 255).toString(16).toUpperCase().padStart(2, '0')}
                            </text>
                        ))}
                    </motion.g>
                </g>

                {/* Fingerprint Group Container */}
                <g filter="url(#whorlDistortion)">
                    {/* Dim Background Fingerprint (shrunk slightly to fit within HUD better) */}
                    <g stroke="var(--adorix-primary)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.15" style={{ transformOrigin: '50px 50px', transform: 'scale(0.85)' }}>
                        <use href="#organicBasePrint" clipPath="url(#fingerClip)" />
                    </g>

                    {/* Bright Scanned Area (masked by scanner sweep) */}
                    <g clipPath="url(#scannerWipeClip)" style={{ transformOrigin: '50px 50px', transform: 'scale(0.85)' }}>
                        <g stroke="var(--adorix-accent)" strokeWidth="1" strokeLinecap="round" opacity="0.8" filter="url(#intenseGlowVideo)">
                            <use href="#organicBasePrint" clipPath="url(#fingerClip)" />
                        </g>
                        <g stroke="#ffffff" strokeWidth="0.4" strokeLinecap="round" opacity="1">
                            <use href="#organicBasePrint" clipPath="url(#fingerClip)" />
                        </g>
                    </g>
                </g>

                {/* Scanner Laser Sweep - Mimicking BioMesh full-width scan */}
                {isPaused && (
                    <motion.rect x="0" y="0" width="100" height="0.6" fill="var(--adorix-accent)" opacity="0.8" filter="url(#intenseGlowVideo)"
                        animate={{ y: [0, 100] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                )}

                {/* Authorization Status Popups */}
                {isPaused && (
                    <motion.g transform="translate(50, 85)"
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <rect x="-18" y="-4" width="36" height="8" rx="1" fill="rgba(13,138,158,0.2)" stroke="var(--adorix-accent)" strokeWidth="0.5" filter="url(#neonGlowVideo)" />
                        <text x="0" y="2" fontSize="3" fill="#ffffff" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AUTHORIZED</text>
                    </motion.g>
                )}
            </svg>
        </div>
    );
};

const SpectralField = ({ isPaused }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white rounded-2xl group border border-gray-100 shadow-sm">
            <svg viewBox="0 0 100 100" className="w-[180px] h-[180px] origin-center relative z-10" style={{ letterSpacing: '0.05em' }}>
                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="var(--adorix-accent)" stopOpacity="0" />
                        <stop offset="100%" stopColor="var(--adorix-accent)" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* Base Grid */}
                <g stroke="var(--adorix-primary)" strokeWidth="0.5" opacity="0.15">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(y => <line key={`hy${y}`} x1="0" y1={y} x2="100" y2={y} />)}
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(x => <line key={`vx${x}`} x1={x} y1="0" x2={x} y2="100" />)}
                </g>

                {/* DATA ANALYTICS Text Removed */}

                {/* Top Right Bar Chart */}
                <g transform="translate(60, 8)">
                    {[10, 15, 8, 20, 25, 18, 28].map((val, i) => (
                        <motion.rect
                            key={`bar-${i}`}
                            x={i * 5}
                            width="3"
                            fill="var(--adorix-accent)"
                            initial={{ height: val, y: 30 - val }}
                            animate={{
                                height: [val, val * 0.6, val * 1.3, val * 0.8, val],
                                y: [30 - val, 30 - val * 0.6, 30 - val * 1.3, 30 - val * 0.8, 30 - val]
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                            opacity="0.8"
                        />
                    ))}
                </g>

                {/* Middle Left Pie Chart */}
                <g transform="translate(25, 68)">
                    {/* Ring 1 - Outer Segmented */}
                    <motion.circle cx="0" cy="0" r="14" fill="none" stroke="var(--adorix-accent)" strokeWidth="2.5" strokeDasharray="60 100"
                        animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        opacity="0.8"
                    />
                    {/* Ring 2 - Inner dashed */}
                    <motion.circle cx="0" cy="0" r="10" fill="none" stroke="var(--adorix-primary)" strokeWidth="1" strokeDasharray="10 20 5 15"
                        animate={{ rotate: [0, -360] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        opacity="0.5"
                    />
                    {/* Center Dot */}
                    <circle cx="0" cy="0" r="2" fill="var(--adorix-accent)" />
                    {/* Data Line extending out */}
                    <motion.path d="M 10 -10 L 20 -20 L 40 -20" fill="none" stroke="var(--adorix-accent)" strokeWidth="0.8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                    <motion.text x="42" y="-18" fontSize="4" fill="var(--adorix-dark)" fontWeight="bold"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    >75% ACTIVE</motion.text>
                </g>

                {/* Middle/Bottom Main Line Chart */}
                <g>
                    {/* Grid for line chart */}
                    <path d="M 40 10 L 40 40 L 85 40" fill="none" stroke="var(--adorix-primary)" strokeWidth="0.5" opacity="0.3" />
                    {[15, 25, 35].map((y) => <line key={`hl-${y}`} x1="40" y1={y} x2="85" y2={y} stroke="var(--adorix-primary)" strokeWidth="0.5" opacity="0.1" />)}
                    {[50, 60, 70, 80].map((x) => <line key={`vl-${x}`} x1={x} y1="10" x2={x} y2="40" stroke="var(--adorix-primary)" strokeWidth="0.5" opacity="0.1" />)}

                    {/* Live Sweeping Playhead */}
                    <motion.line
                        x1="40" y1="10" x2="40" y2="40"
                        stroke="var(--adorix-accent)" strokeWidth="0.5" opacity="0.6"
                        animate={{ x1: [40, 85, 40], x2: [40, 85, 40] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Gradient Fill under Line */}
                    <motion.path
                        d="M 40 40 L 40 35 L 50 35 L 55 25 L 65 28 L 75 15 L 85 5 L 85 40 Z"
                        fill="url(#chartGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* Actual Trend Line */}
                    <motion.path
                        d="M 40 35 L 50 35 L 55 25 L 65 28 L 75 15 L 85 5"
                        fill="none" stroke="var(--adorix-primary)" strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Arrow at the end */}
                    <motion.polygon points="82,4 86,2 86,8" fill="var(--adorix-primary)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    />

                    {/* Data Points */}
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                        <circle cx="50" cy="35" r="1.5" fill="var(--adorix-accent)" />
                        <circle cx="55" cy="25" r="1.5" fill="var(--adorix-accent)" />
                        <circle cx="65" cy="28" r="1.5" fill="var(--adorix-accent)" />
                        <circle cx="75" cy="15" r="1.5" fill="var(--adorix-accent)" />
                    </motion.g>
                </g>

                {/* Bottom Small Bar Chart */}
                <g transform="translate(55, 82)">
                    {[4, 7, 5, 8, 12, 6, 9, 14, 10, 15].map((val, i) => (
                        <motion.rect
                            key={`bbar-${i}`}
                            x={i * 3.5}
                            width="2"
                            fill="var(--adorix-primary)"
                            opacity="0.5"
                            initial={{ height: val, y: 15 - val }}
                            animate={{
                                height: [val, val * 1.5, val * 0.4, val * 1.2, val],
                                y: [15 - val, 15 - val * 1.5, 15 - val * 0.4, 15 - val * 1.2, 15 - val]
                            }}
                            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                        />
                    ))}
                </g>

            </svg>
        </div>
    );
};

const TargetingPulse = ({ isPaused }) => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white rounded-2xl group border border-gray-100 shadow-sm">
        <svg viewBox="0 0 200 100" className="w-[110%] h-[110%] origin-center relative z-10 isolate">
            <defs>
                <linearGradient id="shaftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2D3748" />
                    <stop offset="30%" stopColor="#4A5568" />
                    <stop offset="100%" stopColor="#1A202C" />
                </linearGradient>
                <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#718096" />
                </linearGradient>
                <filter id="arrowShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="4" stdDeviation="2" floodOpacity="0.2" />
                </filter>
                <filter id="targetShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.08" />
                </filter>
            </defs>

            {/* Background Clouds */}
            <motion.path d="M 30 35 Q 30 30 35 30 Q 40 25 45 30 Q 50 28 50 35 Z" fill="#E8F0FE" animate={{ x: [-5, 5, -5] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
            <motion.path d="M 170 25 Q 170 20 175 20 Q 180 15 185 20 Q 190 18 190 25 Z" fill="#E8F0FE" animate={{ x: [5, -5, 5] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
            <motion.path d="M 120 15 Q 120 12 125 12 Q 130 8 135 12 Q 140 10 140 15 Z" fill="#E8F0FE" animate={{ x: [0, -8, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

            {/* Base platform / shadow (Moved to back) */}
            <ellipse cx="100" cy="85" rx="50" ry="4" fill="#E8F0FE" opacity="0.6" />

            {/* Target */}
            <g transform="translate(100, 50)" filter="url(#targetShadow)">
                <circle r="40" fill="var(--adorix-primary)" opacity="0.9" />
                <circle r="30" fill="#FFFFFF" />
                <circle r="20" fill="var(--adorix-primary)" opacity="0.9" />
                <circle r="10" fill="#FFFFFF" />
                <circle r="4" fill="var(--adorix-accent)" />
            </g>

            {/* Realistic Arrow hitting the bullseye */}
            <motion.g
                initial={{ x: 80, y: -80, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 120, damping: 12, delay: 0.5, repeat: Infinity, repeatDelay: 4 }}
            >
                <g transform="translate(98, 48) rotate(135) scale(0.7)" filter="url(#arrowShadow)">
                    {/* Carbon Fiber / Dark Shaft */}
                    <rect x="-70" y="-1.25" width="65" height="2.5" fill="url(#shaftGrad)" rx="0.5" />

                    {/* Fletchings (Feathers) */}
                    {/* Top Accent Vane */}
                    <path d="M -45 -1 L -58 -6 L -66 -6 L -58 -1 Z" fill="var(--adorix-accent)" stroke="var(--adorix-primary)" strokeWidth="0.5" strokeLinejoin="round" />
                    {/* Bottom Accent Vane */}
                    <path d="M -45 1 L -58 6 L -66 6 L -58 1 Z" fill="var(--adorix-accent)" stroke="var(--adorix-primary)" strokeWidth="0.5" strokeLinejoin="round" />

                    {/* Nock (back notch) */}
                    <path d="M -70 -1.5 L -73 -2.5 L -73 2.5 L -70 1.5 Z" fill="#1A202C" />

                    {/* Metal Arrowhead Base / Binding */}
                    <rect x="-9" y="-2" width="4" height="4" fill="#4A5568" rx="0.5" />
                    <line x1="-8" y1="-2" x2="-8" y2="2" stroke="#A0AEC0" strokeWidth="0.5" />
                    <line x1="-6" y1="-2" x2="-6" y2="2" stroke="#A0AEC0" strokeWidth="0.5" />

                    {/* Realistic Metal Arrowhead (Broadhead) */}
                    <path d="M 0 0 L -8 -4 L -6 0 L -8 4 Z" fill="url(#metalGrad)" stroke="#718096" strokeWidth="0.5" strokeLinejoin="round" />
                    {/* Highlight/Edge */}
                    <path d="M 0 0 L -8 0" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.8" />
                </g>
            </motion.g>
        </svg>
    </div>
);

const HolographicScope = ({ isPaused }) => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white rounded-2xl group border border-gray-100 shadow-sm">
        <svg viewBox="0 0 200 200" className="w-[120%] h-[120%] origin-center relative z-10 isolate">
            <defs>
                <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e1e24" />
                    <stop offset="100%" stopColor="#2b2b36" />
                </linearGradient>
                <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f8f9fa" />
                </linearGradient>
                <filter id="floatShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="4" floodOpacity="0.1" />
                </filter>
                <filter id="phoneShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="-5" dy="15" stdDeviation="15" floodOpacity="0.15" />
                </filter>
            </defs>

            {/* Background Blob / Circle */}
            <motion.circle
                cx="100" cy="100" r="75"
                fill="var(--adorix-primary)" fillOpacity="0.05"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Outline ring */}
            <motion.circle
                cx="100" cy="100" r="88"
                fill="none" stroke="var(--adorix-primary)" strokeWidth="2" strokeDasharray="6 12 18 12" strokeOpacity="0.1"
                animate={{ rotate: [0, 90] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Sparkles & Gears */}
            <motion.g animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                {/* Sparkle top right */}
                <path d="M 140 40 L 142 48 L 150 50 L 142 52 L 140 60 L 138 52 L 130 50 L 138 48 Z" fill="#FFFFFF" />
            </motion.g>
            <motion.g animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
                {/* Sparkle bottom left */}
                <path d="M 50 150 L 51 154 L 55 155 L 51 156 L 50 160 L 49 156 L 45 155 L 49 154 Z" fill="#FFFFFF" />
            </motion.g>

            {/* Floating Elements (Background) */}
            <motion.g filter="url(#floatShadow)" animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                {/* User Yellow Icon -> Accent */}
                <circle cx="85" cy="55" r="14" fill="var(--adorix-accent)" />
                <circle cx="85" cy="50" r="5" fill="#FFFFFF" />
                <path d="M 75 62 A 10 10 0 0 1 95 62" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            </motion.g>

            <motion.g filter="url(#floatShadow)" animate={{ y: [8, -8, 8], rotate: [5, -5, 5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0 }}>
                {/* Checkmark Green Icon -> Primary */}
                <circle cx="60" cy="75" r="16" fill="var(--adorix-primary)" />
                {/* Dynamic Checkmark path */}
                <motion.path
                    d="M 52 75 L 58 81 L 68 69"
                    fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </motion.g>

            <motion.g filter="url(#floatShadow)" animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
                {/* Yellow Chat Bubble Bottom Left -> Accent */}
                <path d="M 75 160 Q 95 160 95 170 Q 95 180 80 180 L 72 186 C 70 180 75 170 75 160 Z" fill="var(--adorix-accent)" />
                <circle cx="80" cy="170" r="2" fill="#FFFFFF" />
                <circle cx="86" cy="170" r="2" fill="#FFFFFF" />
                <circle cx="92" cy="170" r="2" fill="#FFFFFF" />
            </motion.g>

            {/* Mobile Device */}
            <g transform="translate(105, 110) rotate(5)" filter="url(#phoneShadow)">
                {/* Phone Body */}
                <rect x="-44" y="-84" width="88" height="176" rx="16" fill="url(#phoneGrad)" />
                {/* Screen */}
                <rect x="-40" y="-80" width="80" height="168" rx="12" fill="url(#screenGrad)" />

                {/* Top Notch / Dynamic Island */}
                <rect x="-14" y="-76" width="28" height="6" rx="3" fill="#1A202C" />

                {/* UI Header */}
                <g opacity="0.8">
                    {/* Back Arrow */}
                    <path d="M -30 -60 L -34 -56 L -30 -52" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {/* User Profile */}
                    <circle cx="-16" cy="-56" r="7" fill="var(--adorix-primary)" fillOpacity="0.1" />
                    <circle cx="-16" cy="-58" r="2.5" fill="var(--adorix-primary)" />
                    <path d="M -21 -52 A 5 5 0 0 1 -11 -52" fill="none" stroke="var(--adorix-primary)" strokeWidth="2" strokeLinecap="round" />
                    {/* Header dots */}
                    <circle cx="32" cy="-58" r="1.5" fill="#A0AEC0" />
                    <circle cx="32" cy="-53" r="1.5" fill="#A0AEC0" />
                </g>

                {/* Thin divider line */}
                <line x1="-40" y1="-42" x2="40" y2="-42" stroke="#E2E8F0" strokeWidth="1" />

                {/* Chat Bubbles */}
                <g transform="translate(0, -32)">
                    {/* Gray Left Bubble */}
                    <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, type: 'spring' }} style={{ transformOrigin: "-18px 0px" }}>
                        <path d="M -20 -4 L 20 -4 Q 26 -4 26 2 L 26 14 Q 26 20 20 20 L -20 20 Q -26 20 -26 14 L -26 2 L -32 -4 Z" fill="#F8FAFC" />
                        <line x1="-18" y1="4" x2="16" y2="4" stroke="var(--adorix-accent)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
                        <line x1="-18" y1="12" x2="8" y2="12" stroke="var(--adorix-accent)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
                    </motion.g>

                    {/* Primary Right Bubble */}
                    <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.8, type: 'spring' }} style={{ transformOrigin: "26px 34px" }}>
                        <path d="M 20 26 L -10 26 Q -16 26 -16 32 L -16 44 Q -16 50 -10 50 L 20 50 Q 26 50 26 44 L 26 32 L 32 26 Z" fill="var(--adorix-primary)" fillOpacity="0.1" />
                        <line x1="-6" y1="34" x2="18" y2="34" stroke="var(--adorix-primary)" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="-6" y1="42" x2="12" y2="42" stroke="var(--adorix-primary)" strokeWidth="2.5" strokeLinecap="round" />
                    </motion.g>

                    {/* Gray Left Bubble 2 */}
                    <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.8, type: 'spring' }} style={{ transformOrigin: "-18px 60px" }}>
                        <path d="M -20 56 L 24 56 Q 30 56 30 62 L 30 74 Q 30 80 24 80 L -20 80 Q -26 80 -26 74 L -26 62 L -32 56 Z" fill="#F8FAFC" />
                        <line x1="-18" y1="64" x2="20" y2="64" stroke="var(--adorix-accent)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
                        <line x1="-18" y1="72" x2="12" y2="72" stroke="var(--adorix-accent)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
                    </motion.g>

                    {/* Typing Indicator bottom */}
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.5, 1] }} transition={{ delay: 3.5, duration: 2, repeat: Infinity }} transform="translate(0, 92)">
                        <path d="M -12 -4 L 16 -4 Q 22 -4 22 2 L 22 10 Q 22 16 16 16 L -12 16 Q -18 16 -18 10 L -18 2 L -24 -4 Z" fill="#EDF2F7" />
                        <circle cx="-6" cy="6" r="2" fill="#A0AEC0" />
                        <circle cx="2" cy="6" r="2" fill="#A0AEC0" />
                        <circle cx="10" cy="6" r="2" fill="#A0AEC0" />
                    </motion.g>
                </g>

                {/* Divider near bottom nav */}
                <line x1="-40" y1="70" x2="40" y2="70" stroke="#E2E8F0" strokeWidth="1" />

                {/* OS Bottom Nav */}
                <g opacity="0.6" transform="translate(0, 76)">
                    <polygon points="-16,-2 -22,2 -16,6" fill="#4A5568" />
                    <circle cx="0" cy="2" r="4" fill="#4A5568" />
                    <rect x="16" y="-2" width="7" height="7" fill="#4A5568" rx="1" />
                </g>
            </g>

            {/* Theme Primary Chat Smile Icon Floating on Top */}
            <motion.g filter="url(#floatShadow)" animate={{ y: [4, -4, 4], rotate: [2, -2, 2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
                <rect x="135" y="120" width="28" height="18" rx="4" fill="var(--adorix-primary)" />
                {/* Tail */}
                <path d="M 135 130 L 128 136 L 140 136 Z" fill="var(--adorix-primary)" />
                {/* Smile Face Points */}
                <circle cx="143" cy="127" r="1.5" fill="#FFFFFF" />
                <circle cx="155" cy="127" r="1.5" fill="#FFFFFF" />
                <path d="M 145 132 Q 149 135 153 132" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </motion.g>
        </svg>
    </div>
);

// --- Main Components ---

const FeatureCard = ({ animation: Animation, title, description, delay, cardClassName = '' }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative w-full overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl ${cardClassName}`}
        >
            {/* Animation Background Layer */}
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out z-0">
                <Animation isPaused={isHovered} />
            </div>

            {/* Premium Blur Overlay - Visible on Hover */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/60 backdrop-blur-2xl z-10 flex flex-col items-center justify-center p-8 text-center space-y-6"
                    >
                        <motion.h3
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="text-2xl font-bold text-gray-900 tracking-tight"
                        >
                            {title}
                        </motion.h3>
                        <motion.p
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="text-gray-700 leading-relaxed text-sm font-medium text-justify px-2"
                        >
                            {description}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle border shine on bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-adorix-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </motion.div>
    );
};

const FeatureCards = () => {
    const features = [
        {
            animation: BioMesh,
            title: 'AI-Powered Insights',
            description: 'Leverage advanced machine learning to understand customer behavior and optimize your campaigns in real-time.',
        },
        {
            animation: SupersonicStream,
            title: 'Lightning Fast Performance',
            description: 'Experience blazing-fast ad delivery with our optimized infrastructure. Your campaigns load instantly, every time.',
        },
        {
            animation: QuantumVault,
            title: 'Enterprise Security',
            description: 'Bank-level encryption and compliance with industry standards. Your data is protected with military-grade security.',
        },
        {
            animation: SpectralField,
            title: 'Real-Time Analytics',
            description: 'Track every interaction with comprehensive dashboards. Make data-driven decisions with actionable insights.',
        },
        {
            animation: TargetingPulse,
            title: 'Audience Targeting',
            description: 'Reach the right people at the right time. Our smart algorithms ensure maximum engagement and conversion.',
        },
        {
            animation: HolographicScope,
            title: 'Precision Campaigns',
            description: 'Create hyper-targeted campaigns with our advanced segmentation tools. Deliver personalized experiences at scale.',
        },
    ];

    return (
        <section className="py-24 px-6 bg-gray-50/50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter"
                    >
                        Feature Engineering <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-adorix-primary via-adorix-accent to-adorix-primary bg-[length:200%_auto] animate-gradient">
                            At Scale v3.1
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        Every component is crafted with precision to deliver unparalleled performance and business intelligence.
                    </motion.p>
                </div>

                {/* Responsive grid: 1 col on mobile, 2 on md, 4 on lg */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            animation={feature.animation}
                            title={feature.title}
                            description={feature.description}
                            delay={index * 0.1}
                            cardClassName={`aspect-[9/16]${index === 4 ? ' lg:col-start-2' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureCards;