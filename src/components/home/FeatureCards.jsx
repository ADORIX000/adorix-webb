"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Hyper-Premium Advanced Animation Components (High Visibility v2.2) ---

const BioMesh = ({ isPaused }) => {
    const nodes = [
        { x: 30, y: 30 }, { x: 70, y: 30 }, { x: 50, y: 20 },
        { x: 30, y: 70 }, { x: 70, y: 70 }, { x: 50, y: 80 }
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-white rounded-2xl overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
                {/* Clean Grid */}
                <g stroke="var(--adorix-primary)" strokeWidth="0.2" opacity="0.1">
                    {[20, 40, 60, 80].map(p => <line key={`h${p}`} x1="0" y1={p} x2="100" y2={p} />)}
                    {[20, 40, 60, 80].map(p => <line key={`v${p}`} x1={p} y1="0" x2={p} y2="100" />)}
                </g>

                {/* Neural Connections */}
                <g stroke="var(--adorix-primary)" strokeWidth="0.3" opacity="0.2">
                    {nodes.map((n, i) => (
                        <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} />
                    ))}
                </g>

                {/* Central Focus Orb */}
                <g transform="translate(50, 50)">
                    <motion.circle r="18" fill="none" stroke="var(--adorix-primary)" strokeWidth="0.8" strokeDasharray="4 2"
                        animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                    <motion.circle r="12" fill="none" stroke="var(--adorix-accent)" strokeWidth="1.5" strokeDasharray="6 4"
                        animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
                    <circle r="4" fill="var(--adorix-primary)" />
                    <motion.circle r="6" fill="var(--adorix-primary)" opacity="0.3"
                        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                </g>

                {/* Neural Nodes */}
                {nodes.map((n, i) => (
                    <motion.circle key={i} cx={n.x} cy={n.y} r="1.5" fill="var(--adorix-accent)"
                        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} />
                ))}

                {/* Scanning Line */}
                <motion.rect x="15" y="0" width="70" height="0.6" fill="var(--adorix-primary)" opacity="0.5"
                    animate={isPaused ? { y: [15, 85] } : { y: 50 }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
            </svg>
        </div>
    );
};

const SupersonicStream = ({ isPaused }) => (
    <div className="relative w-full h-full flex items-center justify-center bg-white rounded-2xl overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full p-4">
            <defs>
                <filter id="speedBlur">
                    <feGaussianBlur stdDeviation="1.5" />
                </filter>
            </defs>

            {/* Warp Speed Tunnel Effect */}
            <g opacity="0.15">
                {[...Array(3)].map((_, i) => (
                    <motion.circle
                        key={i}
                        cx="50" cy="50" r="10"
                        fill="none"
                        stroke="var(--adorix-primary)"
                        strokeWidth="0.5"
                        animate={{ r: [10, 80], opacity: [0.6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                    />
                ))}
            </g>

            {/* Advanced Speed Lines with Parallax */}
            <g>
                {[...Array(8)].map((_, i) => (
                    <motion.line
                        key={i}
                        x1="120" x2="-20"
                        y1={20 + i * 8} y2={20 + i * 8}
                        stroke="var(--adorix-primary)"
                        strokeWidth={0.5 + Math.random()}
                        strokeDasharray="20 40"
                        opacity={0.2 + Math.random() * 0.3}
                        animate={isPaused ? { x: [-150, 150] } : { x: 0 }}
                        transition={{ duration: 0.8 + Math.random() * 0.5, repeat: Infinity, ease: "linear" }}
                    />
                ))}
            </g>

            {/* Simplified but Dynamic Browser Window */}
            <motion.g
                animate={isPaused ? {
                    y: [0, -3, 0],
                    rotate: [-1, 1, -1]
                } : { y: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Window Glow */}
                <circle cx="50" cy="50" r="25" fill="var(--adorix-primary)" opacity="0.05" filter="url(#speedBlur)" />

                <rect x="25" y="32" width="50" height="36" rx="4" fill="white" stroke="var(--adorix-primary)" strokeWidth="1" shadow="0 10px 15px -3px rgb(0 0 0 / 0.1)" />
                <rect x="25" y="32" width="50" height="8" rx="4" fill="var(--adorix-dark)" />

                {/* Dynamic Content Lines */}
                <rect x="30" y="46" width="30" height="2" fill="var(--adorix-primary)" opacity="0.3" rx="1" />
                <rect x="30" y="52" width="20" height="2" fill="var(--adorix-primary)" opacity="0.3" rx="1" />
                <motion.rect
                    x="30" y="58" width="15" height="2" fill="var(--adorix-accent)" rx="1"
                    animate={{ width: [15, 35, 15] }} transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Advanced Lightning Strike */}
                <motion.path
                    d="M 62 42 L 54 54 L 59 54 L 56 66 L 66 52 L 61 52 Z"
                    fill="var(--adorix-accent)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                />
            </motion.g>

            {/* High-speed streak particles */}
            {[...Array(6)].map((_, i) => (
                <motion.rect
                    key={`p-${i}`}
                    width={10 + Math.random() * 20}
                    height="0.8"
                    fill="var(--adorix-accent)"
                    opacity="0.4"
                    animate={isPaused ? { x: [150, -100] } : { x: 50 }}
                    transition={{
                        duration: 0.5 + Math.random() * 0.5,
                        repeat: Infinity,
                        delay: Math.random(),
                        ease: "linear"
                    }}
                    y={15 + Math.random() * 70}
                />
            ))}
        </svg>
    </div>
);

const QuantumVault = ({ isPaused }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center bg-white rounded-2xl overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
                <defs>
                    <clipPath id="fingerClip">
                        <ellipse cx="50" cy="50" rx="16" ry="24" />
                    </clipPath>
                    {/* Simplified Base geometry for the fingerprint */}
                    <g id="basePrint" clipPath="url(#fingerClip)">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <path key={i} d={`M ${50 - i * 1.5} 80 L ${50 - i * 1.5} 45 A ${i * 1.5} ${i * 2} 0 0 1 ${50 + i * 1.5} 45 L ${50 + i * 1.5} 80`} fill="none" stroke="var(--adorix-primary)" strokeWidth="0.8" opacity="0.3" />
                        ))}
                    </g>
                </defs>

                {/* Fingerprint */}
                <use href="#basePrint" />
                <motion.g clipPath="url(#scanClip)">
                    <clipPath id="scanClip">
                        <motion.rect x="0" y="0" width="100" height="20" animate={isPaused ? { y: [-20, 100] } : { y: 50 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                    </clipPath>
                    <g stroke="var(--adorix-accent)" strokeWidth="1" opacity="0.8">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <path key={`s-${i}`} d={`M ${50 - i * 1.5} 80 L ${50 - i * 1.5} 45 A ${i * 1.5} ${i * 2} 0 0 1 ${50 + i * 1.5} 45 L ${50 + i * 1.5} 80`} fill="none" />
                        ))}
                    </g>
                </motion.g>

                {/* Scanner Line */}
                <motion.line x1="30" x2="70" y1="0" y2="0" stroke="var(--adorix-accent)" strokeWidth="1"
                    animate={isPaused ? { y: [20, 80] } : { y: 50 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />

                {/* Secure Badge */}
                <circle cx="85" cy="15" r="4" fill="var(--adorix-primary)" opacity="0.2" />
                <path d="M 83 15 L 84.5 16.5 L 87 13.5" fill="none" stroke="var(--adorix-primary)" strokeWidth="1" opacity="0.8" />
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
            animation: HolographicScope, // 1
            title: 'Precision Campaigns',
            description: 'Create hyper-targeted campaigns with our advanced segmentation tools. Deliver personalized experiences at scale.',
        },
        {
            animation: TargetingPulse, // 2
            title: 'Audience Targeting',
            description: 'Reach the right people at the right time. Our smart algorithms ensure maximum engagement and conversion.',
        },
        {
            animation: QuantumVault, // 3
            title: 'Enterprise Security',
            description: 'Bank-level encryption and compliance with industry standards. Your data is protected with military-grade security.',
        },
        {
            animation: SpectralField, // 4
            title: 'Real-Time Analytics',
            description: 'Track every interaction with comprehensive dashboards. Make data-driven decisions with actionable insights.',
        },
        {
            animation: BioMesh, // 6
            title: 'AI-Powered Insights',
            description: 'Leverage advanced machine learning to understand customer behavior and optimize your campaigns in real-time.',
        },
        {
            animation: SupersonicStream, // 5
            title: 'Lightning Fast Performance',
            description: 'Experience blazing-fast ad delivery with our optimized infrastructure. Your campaigns load instantly, every time.',
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

                {/* Grid Layout: 4 columns on large screens, with the bottom row centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            animation={feature.animation}
                            title={feature.title}
                            description={feature.description}
                            delay={index * 0.1}
                            cardClassName={`aspect-[4/3] md:aspect-[4/5]${index === 4 ? ' lg:col-start-2' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureCards;