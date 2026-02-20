import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Hyper-Premium Advanced Animation Components (High Visibility v2.2) ---

const BioMesh = ({ isPaused }) => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 200" className="w-64 h-64 transition-all duration-700">
            <defs>
                <filter id="neuralGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="var(--adorix-accent)" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>

            {/* Synaptic Core - Background Neural Web */}
            {[0, 1, 2, 3, 4].map((i) => (
                <g key={`synapse-${i}`}>
                    <motion.path
                        d={`M${30 + i * 35} 20 Q 100 100 ${170 - i * 35} 180`}
                        stroke="var(--adorix-primary)"
                        strokeWidth="1"
                        strokeOpacity="0.15"
                        fill="none"
                        animate={isPaused ? {} : {
                            d: [
                                `M${30 + i * 35} 20 Q 100 100 ${170 - i * 35} 180`,
                                `M${50 + i * 25} 150 Q 100 50 ${150 - i * 25} 50`,
                                `M${30 + i * 35} 20 Q 100 100 ${170 - i * 35} 180`
                            ]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
                    />
                    {/* Active Signal Pulses traveling along paths */}
                    {!isPaused && (
                        <motion.path
                            d={`M${30 + i * 35} 20 Q 100 100 ${170 - i * 35} 180`}
                            stroke="url(#signalGradient)"
                            strokeWidth="3"
                            strokeDasharray="40 160"
                            fill="none"
                            animate={{ strokeDashoffset: [-200, 200] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.8 }}
                        />
                    )}
                </g>
            ))}

            {/* Central Intelligence Glow */}
            <motion.circle
                cx="100" cy="100" r="15"
                fill="var(--adorix-accent)"
                fillOpacity="0.2"
                filter="url(#neuralGlow)"
                animate={isPaused ? { scale: 1 } : { scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Synaptic Nodes */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <motion.circle
                    key={i}
                    r="4"
                    fill="var(--adorix-primary)"
                    filter="url(#neuralGlow)"
                    animate={isPaused ? { scale: 1, opacity: 0.6 } : {
                        cx: [50 + Math.sin(i) * 70, 150 - Math.cos(i) * 50, 100 + Math.sin(i * 2) * 60, 50 + Math.sin(i) * 70],
                        cy: [40 + Math.cos(i) * 60, 160 - Math.sin(i * 1.5) * 70, 90 + Math.cos(i * 1.2) * 50, 40 + Math.cos(i) * 60],
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                />
            ))}
        </svg>
    </div>
);

const SupersonicStream = ({ isPaused }) => (
    <div className="relative w-full h-full flex flex-col justify-center gap-8 overflow-hidden px-12">
        <defs>
            <filter id="motionBlur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4 0" />
            </filter>
        </defs>

        {/* Sonic Boom Ripple (Pulse Background) */}
        {!isPaused && [0, 1].map((i) => (
            <motion.div
                key={`sonic-${i}`}
                className="absolute inset-0 border-2 border-adorix-accent/20 rounded-full"
                animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 1 }}
                style={{ top: '50%', left: '0', y: '-50%' }}
            />
        ))}

        {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="relative h-px w-full bg-adorix-primary/5">
                {/* Motion Blur Trail */}
                <motion.div
                    className="absolute h-[2px] w-48 bg-gradient-to-r from-transparent via-adorix-accent/40 to-transparent"
                    filter="url(#motionBlur)"
                    animate={isPaused ? { opacity: 0 } : {
                        x: ['-100%', '200%'],
                    }}
                    transition={{
                        duration: 0.8 + i * 0.2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "linear"
                    }}
                />

                {/* Main Data Packet */}
                <motion.div
                    className="absolute -top-1 w-4 h-2 rounded-full bg-adorix-primary shadow-[0_0_15px_var(--adorix-accent)]"
                    animate={isPaused ? { x: '50%', opacity: 0.4 } : {
                        x: ['-20%', '150%'],
                        scaleX: [1, 1.5, 1],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 1.2 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "anticipate"
                    }}
                />

                {/* Trailing Particles */}
                {!isPaused && [0, 1, 2].map((p) => (
                    <motion.div
                        key={`particle-${p}`}
                        className="absolute h-1 w-1 bg-adorix-accent rounded-full"
                        animate={{
                            x: ['-20%', '150%'],
                            y: [0, (p - 1) * 8, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: 1.5 + i * 0.3,
                            repeat: Infinity,
                            delay: i * 0.4 + p * 0.1,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>
        ))}
    </div>
);

const QuantumVault = ({ isPaused }) => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-56 h-56">
            <defs>
                <filter id="neonSubtle">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <radialGradient id="scanGradient">
                    <stop offset="0%" stopColor="var(--adorix-accent)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--adorix-accent)" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Rotating Security Rings */}
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={i}
                    cx="50" cy="50"
                    r={22 + i * 12}
                    fill="none"
                    stroke="var(--adorix-primary)"
                    strokeWidth="1.5"
                    strokeOpacity={0.2 + i * 0.15}
                    strokeDasharray={i === 1 ? "40 20" : "15 15"}
                    animate={isPaused ? { rotate: 0 } : { rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
                />
            ))}

            {/* Encryption Nodes (Sectors) */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const angle = (i * 45) * (Math.PI / 180);
                return (
                    <motion.circle
                        key={i}
                        cx={50 + Math.cos(angle) * 35}
                        cy={50 + Math.sin(angle) * 35}
                        r="2"
                        fill="var(--adorix-accent)"
                        initial={{ opacity: 0.3 }}
                        animate={isPaused ? { opacity: 0.3 } : {
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
                    />
                );
            })}

            {/* Scanning Laser Sweep (v4.0) */}
            {!isPaused && (
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: '50px 50px' }}
                >
                    <rect x="50" y="10" width="1" height="40" fill="url(#scanGradient)" filter="url(#neonSubtle)" />
                    <circle cx="50" cy="10" r="3" fill="var(--adorix-accent)" filter="url(#neonSubtle)" />
                </motion.g>
            )}

            {/* Central Secure Lock Core */}
            <motion.g
                filter="url(#neonSubtle)"
                animate={isPaused ? { scale: 1 } : { scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <rect x="42" y="52" width="16" height="12" rx="1.5" fill="var(--adorix-primary)" />
                <path d="M45 52 V48 C 45 44, 55 44, 55 48 V52" fill="none" stroke="var(--adorix-primary)" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
        </svg>
    </div>
);

const SpectralField = ({ isPaused }) => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden [perspective:1000px]">
        {/* Background 3D Perspective Grid */}
        <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ rotateX: 65 }}
            animate={isPaused ? { opacity: 0.1 } : {
                y: [0, -10, 0],
                opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity }}
        >
            <div
                className="w-[200%] h-[200%]"
                style={{
                    backgroundImage: `linear-gradient(var(--adorix-primary) 1px, transparent 1px), linear-gradient(90deg, var(--adorix-primary) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 70%)'
                }}
            />
        </motion.div>

        {/* Volumetric Data Bars (v4.0) */}
        <div className="relative h-32 w-64 flex items-end gap-2 px-6">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex-1 relative h-full">
                    {/* Main Bar */}
                    <motion.div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-adorix-primary/40 via-adorix-accent to-adorix-accent/80 rounded-t-sm"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(18,178,193,0.4))' }}
                        animate={isPaused ? { height: '35%' } : {
                            height: [`${30 + Math.random() * 20}%`, `${60 + Math.random() * 40}%`, `${30 + Math.random() * 20}%`]
                        }}
                        transition={{
                            duration: 2 + i * 0.2,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Peak Indicator (Volumetric Cap) */}
                        <div className="absolute top-0 w-full h-1 bg-white shadow-[0_0_10px_#fff]" />
                    </motion.div>

                    {/* Rising Data Particles */}
                    {!isPaused && [0, 1].map((p) => (
                        <motion.div
                            key={p}
                            className="absolute bottom-0 left-1/2 w-1 h-1 bg-adorix-accent rounded-full"
                            animate={{
                                y: [-20, -120],
                                opacity: [0, 1, 0],
                                x: ['-50%', `${(Math.random() - 0.5) * 40}%`]
                            }}
                            transition={{
                                duration: 2 + Math.random(),
                                repeat: Infinity,
                                delay: i * 0.3 + p * 0.5,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    </div>
);

const TargetingPulse = ({ isPaused }) => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-64 h-64">
            <defs>
                <filter id="aura">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="softGlow">
                    <feGaussianBlur stdDeviation="1" result="glow" />
                    <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* Subtle Perspective Radar Rings */}
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={i}
                    cx="50" cy="50"
                    r={12 + i * 15}
                    fill="none"
                    stroke="var(--adorix-primary)"
                    strokeWidth="0.5"
                    strokeOpacity="0.2"
                    animate={isPaused ? { opacity: 0.1 } : {
                        scale: [1, 1.05, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
                />
            ))}
            {/* Central Target - SMALL & SHARP (Sketch Accurately) */}
            <motion.g
                filter="url(#aura)"
                animate={isPaused ? { rotate: 0 } : { rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '50px 50px' }}
            >
                <circle cx="50" cy="50" r="2.5" fill="var(--adorix-accent)" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="var(--adorix-accent)" strokeWidth="1" strokeDasharray="2 4" />
                <path d="M50 35 L50 42 M50 58 L50 65 M35 50 L42 50 M58 50 L65 50" stroke="var(--adorix-accent)" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
            {/* People Icons - PENTAGONAL v3.1 (SVG-Native Precision Logic) */}
            {[0, 1, 2, 3, 4].map((i) => {
                const angle = (i * 72) * (Math.PI / 180);
                const radius = 28; // Tighter professional orbit
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;
                return (
                    <motion.g
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={isPaused ? { opacity: 0.8 } : {
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                    >
                        {/* Use native SVG transform to avoid CSS coordinate mismatches (v3.1 Fix) */}
                        <g transform={`translate(${x}, ${y}) scale(0.65)`}>
                            {/* Smaller Silhouettes */}
                            <circle cx="0" cy="-2.5" r="2.5" fill="var(--adorix-primary)" filter="url(#softGlow)" />
                            <path d="M-4 2.5 C -4 0, 4 0, 4 2.5 L 4 4.5 L -4 4.5 Z" fill="var(--adorix-primary)" filter="url(#softGlow)" />
                            {/* Proportionate Pulse Indicator */}
                            <motion.circle
                                cx="0" cy="0" r="6.5"
                                fill="none"
                                stroke="var(--adorix-accent)"
                                strokeWidth="1"
                                strokeOpacity="0.4"
                                animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </g>
                    </motion.g>
                );
            })}
        </svg>
    </div>
);

const HolographicScope = ({ isPaused }) => (
    <div className="relative w-full h-full flex items-center justify-center p-10 overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: `linear-gradient(var(--adorix-primary) 1px, transparent 1px), linear-gradient(90deg, var(--adorix-primary) 1px, transparent 1px)`,
                backgroundSize: '15px 15px'
            }}
        />
        <svg viewBox="0 0 100 100" className="w-56 h-56">
            <motion.rect
                x="15" y="15" width="70" height="70"
                fill="none" stroke="var(--adorix-primary)" strokeWidth="1"
                strokeDasharray="10 5"
                animate={isPaused ? {} : { strokeDashoffset: [0, 100] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            {/* Rotating corner elements */}
            {[0, 90, 180, 270].map((angle) => (
                <motion.path
                    key={angle}
                    d="M10 10 L30 10 L10 30 Z"
                    fill="var(--adorix-accent)"
                    fillOpacity="0.6"
                    style={{ transformOrigin: '50px 50px', rotate: angle }}
                    animate={isPaused ? { scale: 1 } : { scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: angle / 90 * 0.5 }}
                />
            ))}
            {/* Center target UI */}
            <motion.circle
                cx="50" cy="50" r="10"
                fill="none" stroke="var(--adorix-accent)" strokeWidth="4"
                strokeDasharray="2 4"
                animate={isPaused ? { rotate: 0 } : { rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
                cx="50" cy="50" r="25"
                fill="none" stroke="var(--adorix-primary)" strokeWidth="0.5"
                animate={isPaused ? { scale: 1 } : { scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
        </svg>
    </div>
);

// --- Main Components ---

const FeatureCard = ({ animation: Animation, title, description, delay }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-80 w-full overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl"
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
                        className="absolute inset-0 bg-white/40 backdrop-blur-xl z-10 flex flex-col items-center justify-center p-10 text-center"
                    >
                        <motion.h3
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="mb-4 text-2xl font-bold text-gray-900 tracking-tight"
                        >
                            {title}
                        </motion.h3>
                        <motion.p
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="text-gray-600 leading-relaxed text-sm md:text-base font-medium"
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            animation={feature.animation}
                            title={feature.title}
                            description={feature.description}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureCards;
