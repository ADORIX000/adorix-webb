import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Zap, Shield, TrendingUp, Users, Target } from 'lucide-react';

// AI-Powered Insights - High-Fidelity 3D Particle Globe V2
const AIAnimation = ({ isHovered, mouseX, mouseY }) => {
    const shineX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
    const shineY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Logic Gate Grid (Background) */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #0EA5E9 1px, transparent 0)`,
                backgroundSize: '32px 32px'
            }} />

            {/* Synaptic Flashes (Background Logic) */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`synapse-${i}`}
                    className="absolute w-px h-24 bg-gradient-to-t from-transparent via-adorix-primary to-transparent opacity-0"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        rotate: Math.random() * 360
                    }}
                    animate={{
                        opacity: [0, 0.3, 0],
                        scaleY: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                />
            ))}

            <div className="absolute inset-0 flex items-center justify-center translate-y-20">
                {/* Neural Core Geometric Frame */}
                {[...Array(2)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-adorix-primary/20 rounded-xl"
                        style={{
                            width: `${240 + i * 40}px`,
                            height: `${240 + i * 40}px`,
                            rotate: i * 45
                        }}
                        animate={{ rotate: i * 45 + (i === 0 ? 360 : -360) }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                ))}

                {/* The Floating Neural Hub */}
                <motion.div
                    className="relative w-52 h-64 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col"
                    style={{
                        transformStyle: 'preserve-3d',
                        rotateY: useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
                        rotateX: useTransform(mouseY, [-0.5, 0.5], [20, -20]),
                    }}
                >
                    {/* Holographic Signal Shimmer */}
                    <motion.div
                        className="absolute inset-0 opacity-20 mix-blend-overlay"
                        style={{
                            background: `linear-gradient(135deg, #0EA5E9 0%, transparent 50%, #0EA5E9 100%)`,
                            backgroundSize: '200% 200%',
                            x: shineX,
                            y: shineY
                        }}
                    />

                    {/* Header: Core Status */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <div className="space-y-0.5">
                            <span className="block text-[6px] text-adorix-primary font-black uppercase tracking-widest">Neural_Core_v6</span>
                            <span className="block text-[8px] text-white/40 font-mono">STATUS: OPTIMAL</span>
                        </div>
                        <motion.div
                            className="w-2 h-2 bg-adorix-primary rounded-full shadow-[0_0_8px_#0EA5E9]"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </div>

                    {/* Central Processing Visual */}
                    <div className="flex-1 flex items-center justify-center relative bg-adorix-primary/5">
                        <motion.div
                            className="absolute w-24 h-24 bg-adorix-primary/10 rounded-full blur-2xl"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <div className="relative z-10 grid grid-cols-3 gap-2 p-2">
                            {[...Array(9)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-4 h-4 rounded-sm border border-white/10 bg-white/5"
                                    animate={{
                                        backgroundColor: ["rgba(255,255,255,0.05)", "rgba(14,165,233,0.3)", "rgba(255,255,255,0.05)"],
                                        borderColor: ["rgba(255,255,255,0.1)", "rgba(14,165,233,0.5)", "rgba(255,255,255,0.1)"]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                        {/* Scanning Bar */}
                        <motion.div
                            className="absolute left-0 right-0 h-[1px] bg-adorix-primary/40 shadow-[0_0_10px_#0EA5E9] z-20"
                            animate={{ top: ['20%', '80%', '20%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Analysis Footer: Live Telemetry */}
                    <div className="p-4 space-y-3 bg-black/20">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <span className="block text-[6px] text-white/30 uppercase font-bold tracking-tighter">Inference Depth</span>
                                <div className="flex gap-0.5">
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 h-3 bg-adorix-primary/20 rounded-full"
                                            animate={{ height: [8, 12, 8], backgroundColor: i < 5 ? "#0EA5E9" : "rgba(14,165,233,0.2)" }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-[6px] text-white/30 uppercase font-bold tracking-tighter">Cognitive Load</span>
                                <span className="text-[10px] text-adorix-primary font-mono font-bold">84.2%</span>
                            </div>
                        </div>
                        <div className="h-6 overflow-hidden border-t border-white/5 pt-2">
                            <motion.div
                                className="font-mono text-[5px] text-white/40 space-y-0.5"
                                animate={{ y: [0, -30] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <div>&gt; ANALYZING_USER_INTENT...</div>
                                <div>&gt; OPTIMIZING_MODEL_v2...</div>
                                <div>&gt; FETCHING_LATENT_SPACE...</div>
                                <div>&gt; GENERATING_RESPONSE...</div>
                                <div>&gt; NEURAL_WEIGHTS_ADAPTED...</div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};


const LightningAnimation = ({ isHovered, mouseX, mouseY }) => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Conduit Atmosphere Grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at center, #0EA5E9 1.5px, transparent 1.5px)`,
                backgroundSize: '30px 30px'
            }} />

            {/* Hyper-Speed Data Packets (Traveling into depth) */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`stream-${i}`}
                    className="absolute w-1 h-3 bg-adorix-primary rounded-full blur-[0.5px]"
                    style={{ left: '50%', top: '50%' }}
                    animate={{
                        x: [(Math.random() - 0.5) * 600, (Math.random() - 0.5) * 50],
                        y: [(Math.random() - 0.5) * 400, (Math.random() - 0.5) * 50],
                        scale: [2, 0],
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 0.8 + Math.random() * 0.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "circIn"
                    }}
                />
            ))}

            <div className="absolute inset-0 flex items-center justify-center translate-y-20">
                {/* Plasma Conduit Shell */}
                <motion.div
                    className="absolute border border-adorix-primary/20 rounded-full"
                    style={{ width: '280px', height: '280px' }}
                    animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                {/* The Hyper-Accelerator Console */}
                <motion.div
                    className="relative w-52 h-64 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col"
                    style={{
                        transformStyle: 'preserve-3d',
                        rotateY: useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
                        rotateX: useTransform(mouseY, [-0.5, 0.5], [15, -15]),
                    }}
                >
                    {/* Header: Accelerator Status */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-adorix-primary/5">
                        <div className="space-y-0.5">
                            <span className="block text-[6px] text-adorix-primary font-black uppercase tracking-widest">Accelerator_v6.x</span>
                            <span className="block text-[8px] text-white/40 font-mono">FLOW: TURBO</span>
                        </div>
                        <Zap className="w-4 h-4 text-adorix-primary animate-pulse" fill="#0EA5E9" />
                    </div>

                    {/* Central Conduit Visual */}
                    <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-black/20">
                        {/* Fiber Optic Tunnel Effect */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute border border-adorix-primary/10 rounded-full"
                                style={{ width: `${40 + i * 40}px`, height: `${40 + i * 40}px` }}
                                animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                            />
                        ))}

                        {/* Plasma Discharges */}
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={`plasma-${i}`}
                                className="absolute w-[1px] h-20 bg-gradient-to-t from-transparent via-adorix-accent to-transparent opacity-0"
                                style={{ rotate: i * 90 + 45 }}
                                animate={{ opacity: [0, 0.6, 0], scaleY: [0.8, 1.2, 0.8] }}
                                transition={{ duration: 0.15, repeat: Infinity, delay: Math.random() * 2 }}
                            />
                        ))}

                        <div className="relative z-10 flex flex-col items-center">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                <Zap className="w-10 h-10 text-adorix-primary drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                            </motion.div>
                            <span className="text-[14px] font-black text-white mt-1">982 <span className="text-[8px] opacity-40 font-normal">Gb/s</span></span>
                        </div>
                    </div>

                    {/* Throughput Telemetry Gauge */}
                    <div className="p-4 space-y-3 bg-adorix-primary/5">
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-[6px] font-black uppercase text-white/40 tracking-wider">
                                <span>Throughput Accelerator</span>
                                <span className="text-adorix-primary">Max Boost</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden flex gap-0.5">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex-1 h-full bg-adorix-primary/20"
                                        animate={{
                                            backgroundColor: i < 9 ? ["#0EA5E9", "#38BDF8", "#0EA5E9"] : "rgba(14,165,233,0.1)"
                                        }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Packet Ticker */}
                        <div className="flex justify-between items-center text-[7px] font-mono text-adorix-primary/60">
                            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.2, repeat: Infinity }}>
                                &gt; SENDING_PACKET_#821...
                            </motion.div>
                            <span className="text-white/20">v6.2.0</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};


// Enterprise Security - Redesign: Tactical Security Perimeter
const SecurityAnimation = ({ isHovered, mouseX, mouseY }) => {
    const shineX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
    const shineY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Tactical Grid Atmosphere */}
            <div className="absolute inset-0 opacity-[0.05]" style={{
                backgroundImage: `linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }} />

            {/* Drifting Data Packets (Hex Nodes) - V5 Feature */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`packet-${i}`}
                    className="absolute w-2 h-2 border border-adorix-primary/40 rotate-45 flex items-center justify-center"
                    initial={{ x: -100, y: Math.random() * 400, opacity: 0 }}
                    animate={{
                        x: 600,
                        y: (Math.random() - 0.5) * 100 + 200,
                        opacity: [0, 1, 1, 0],
                        rotate: 405
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "linear"
                    }}
                >
                    <div className="w-0.5 h-0.5 bg-adorix-primary" />
                </motion.div>
            ))}

            {/* Tactical Perimeter Rings */}
            <div className="absolute inset-0 flex items-center justify-center translate-y-24">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-adorix-primary/10 rounded-full"
                        style={{ width: `${200 + i * 70}px`, height: `${200 + i * 70}px` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20 + i * 15, repeat: Infinity, ease: "linear" }}
                    >
                        <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-adorix-accent rounded-full shadow-[0_0_12px_#0EA5E9]"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </motion.div>
                ))}

                {/* Central Protected Safe-Core */}
                <motion.div
                    className="relative w-48 h-56 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
                    style={{
                        transformStyle: 'preserve-3d',
                        rotateY: useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
                        rotateX: useTransform(mouseY, [-0.5, 0.5], [20, -20]),
                    }}
                >
                    {/* Security Fog Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-adorix-primary/5 to-transparent blur-2xl" />

                    {/* Laser Scanner Line (V5 Precision) */}
                    <motion.div
                        className="absolute w-full h-[2px] bg-adorix-accent/80 shadow-[0_0_20px_#0EA5E9] z-20"
                        animate={{ top: ['-5%', '105%', '-5%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Technical Console UI */}
                    <div className="absolute inset-0 flex flex-col p-4 bg-gradient-to-b from-transparent to-adorix-primary/10">
                        {/* Metrics Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="space-y-1">
                                <div className="text-[6px] text-adorix-primary font-black uppercase tracking-widest">Safe-Core v5.0</div>
                                <div className="text-[8px] text-white/60 font-mono">0x7F...A2E9</div>
                            </div>
                            <Shield className="w-6 h-6 text-adorix-primary/80" strokeWidth={1} />
                        </div>

                        {/* Central Visual */}
                        <div className="flex-1 flex items-center justify-center relative">
                            <motion.div
                                className="absolute inset-0 bg-adorix-primary/10 blur-xl rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <div className="relative z-10 w-16 h-16 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-adorix-primary/5"
                                    animate={{ height: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <Shield className="w-8 h-8 text-adorix-primary" strokeWidth={1.5} />
                            </div>
                        </div>

                        {/* Rolling Security Hash Ticker */}
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between items-center text-[7px] font-mono text-white/40 border-b border-white/5 pb-1">
                                <span>PROTOCOL: ALPHA</span>
                                <span className="text-green-400">ACTIVE</span>
                            </div>
                            <div className="h-8 overflow-hidden font-mono text-[6px] text-adorix-primary/60 leading-tight">
                                <motion.div
                                    animate={{ y: [0, -40] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                >
                                    <div># SECURING_PORT_8080...</div>
                                    <div># ENCRYPTING_DATA_MD5...</div>
                                    <div># BYPASS_DETECTED_0...</div>
                                    <div># HANDSHAKE_COMPLETE...</div>
                                    <div># ROTATING_KEYS_V5...</div>
                                    <div># PACKET_INSPECTED...</div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Perimeter Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-24">
                <motion.div
                    className="w-80 h-80 border border-adorix-primary/20 rounded-full blur-[1px]"
                    animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </div>
        </div>
    );
};


// Real-Time Analytics - Dashboard Snippet + Data Flow V2
const AnalyticsAnimation = ({ isHovered, mouseX, mouseY }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden translate-y-20 scale-[0.9]">
        {/* Background Scanning Grid */}
        <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
                backgroundImage: `linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
            }}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-adorix-primary/20 to-transparent h-1/2"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
        </div>

        {/* Floating Dashboard Snippet */}
        <div className="absolute inset-0 flex items-center justify-center p-8 pt-24 scale-[0.85] origin-top">
            <motion.div
                className="relative w-full max-w-[320px] bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-5 overflow-hidden"
                style={{
                    rotateY: useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
                    rotateX: useTransform(mouseY, [-0.5, 0.5], [15, -15]),
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Header Widget */}
                <div className="flex justify-between items-center mb-6">
                    <div className="space-y-1">
                        <div className="w-20 h-2 bg-white/20 rounded-full" />
                        <div className="w-12 h-1.5 bg-white/10 rounded-full" />
                    </div>
                    <div className="px-2 py-1 bg-green-500/20 rounded border border-green-500/30">
                        <span className="text-[8px] font-extrabold text-green-400 tracking-wider">+24.8%</span>
                    </div>
                </div>

                {/* Animated Chart Bars */}
                <div className="flex items-end justify-between gap-2 h-24 mb-6">
                    {[40, 70, 55, 90, 65, 85, 75, 95].map((h, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-adorix-primary/60 to-adorix-accent/80 rounded-t-sm relative"
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.1, duration: 1 }}
                        >
                            <motion.div
                                className="absolute -top-1 left-0 right-0 h-1 bg-white/40 blur-[2px]"
                                animate={{ opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Scrolling Data Pips */}
                <div className="absolute bottom-4 left-0 right-0 h-px bg-white/10">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-adorix-primary rounded-full shadow-[0_0_8px_#0EA5E9]"
                            animate={{ x: [-20, 340] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>

        {/* Floating Metric Nodes */}
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-12 h-12 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-center"
                style={{
                    left: `${20 + i * 30}%`,
                    top: `${15 + (i % 2) * 50}%`,
                }}
                animate={{
                    y: [0, (i % 2 === 0 ? 20 : -20), 0],
                    rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            >
                <TrendingUp className="w-5 h-5 text-adorix-primary/50" />
            </motion.div>
        ))}
    </div>
);


// Audience Targeting - Global Node Network V2
const AudienceAnimation = ({ isHovered, mouseX, mouseY }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden translate-y-24 scale-[0.8]" style={{ perspective: '1200px' }}>
        {/* Background Network Grid */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <div className="relative w-[500px] h-[500px] border border-adorix-primary/20 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[300px] h-[300px] border border-adorix-primary/30 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        </div>

        {/* Central Hub Node */}
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                className="w-16 h-16 bg-adorix-primary/20 backdrop-blur-md rounded-full border border-adorix-primary/40 flex items-center justify-center relative shadow-[0_0_30px_rgba(13,138,158,0.3)]"
                style={{
                    rotateY: useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
                    rotateX: useTransform(mouseY, [-0.5, 0.5], [20, -20]),
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <Users className="w-8 h-8 text-adorix-primary" strokeWidth={1.5} />

                {/* Outgoing Pulse Arcs */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 border border-adorix-primary/40 rounded-full"
                        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                    />
                ))}
            </motion.div>
        </div>

        {/* Floating User Profile Nodes */}
        {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 140;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
                <div key={i} className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="relative"
                        initial={{ x: 0, y: 0 }}
                        animate={{
                            x: [x - 10, x + 10, x - 10],
                            y: [y + 10, y - 10, y + 10],
                        }}
                        transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Profile Card Snippet */}
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl flex items-center justify-center overflow-hidden">
                            <Users className="w-6 h-6 text-adorix-primary/60" />
                            {/* Mini Sparkle on node */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                            />
                        </div>

                        {/* Connection Arc to Hub */}
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none opacity-40 overflow-visible">
                            <motion.path
                                d={`M 150 150 Q ${150 + x / 2} ${150 + y / 2}, ${150 + x} ${150 + y}`}
                                stroke="url(#arc-gradient)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="5,5"
                                animate={{ strokeDashoffset: [0, -20] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </svg>
                    </motion.div>
                </div>
            );
        })}
        <defs>
            <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#0D8A9E" />
            </linearGradient>
        </defs>
    </div>
);

// Precision Campaigns - High-fidelity Campaign Control + Targeting
const TargetingAnimation = ({ isHovered, mouseX, mouseY }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: '1200px' }}>
        {/* Background Radar Scanning */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute border border-adorix-primary rounded-full"
                    style={{ width: `${(i + 1) * 25}%`, height: `${(i + 1) * 25}%` }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
            ))}
            <motion.div
                className="absolute w-1/2 h-1/2 bg-gradient-to-tr from-adorix-primary/0 via-adorix-primary/10 to-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
        </div>

        {/* Campaign Control UI */}
        <div className="absolute inset-0 flex items-center justify-center translate-y-28 scale-[0.8] origin-top">
            <motion.div
                className="relative w-72 h-80 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-2xl p-6"
                style={{
                    rotateY: useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
                    rotateX: useTransform(mouseY, [-0.5, 0.5], [10, -10]),
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Targeting Crosshair */}
                <div className="relative w-full h-40 bg-black/5 rounded-xl border border-white/10 mb-6 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#0EA5E9 1px, transparent 1px)', backgroundSize: '15px 15px' }} />

                    <motion.div
                        className="relative w-24 h-24"
                        animate={{ rotate: isHovered ? 180 : 0 }}
                        transition={{ duration: 1, ease: "anticipate" }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-adorix-accent/60 shadow-[0_0_15px_#0EA5E9]" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-adorix-accent/60 shadow-[0_0_15px_#0EA5E9]" />
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-adorix-accent/60 shadow-[0_0_15px_#0EA5E9]" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-adorix-accent/60 shadow-[0_0_15px_#0EA5E9]" />

                        <motion.circle
                            r="35"
                            cx="50%"
                            cy="50%"
                            className="absolute inset-0 stroke-adorix-primary/40 fill-none stroke-2"
                            style={{ strokeDasharray: '5, 5' }}
                        />
                    </motion.div>

                    {/* Target Lock UI */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-red-500/10 rounded border border-red-500/30">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        />
                        <span className="text-[8px] font-bold text-red-500 tracking-widest uppercase">Target Locked</span>
                    </div>
                </div>

                {/* Campaign Metrics V2 */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1.5">
                            <div className="w-28 h-2.5 bg-white/20 rounded-full" />
                            <div className="w-20 h-2 bg-white/10 rounded-full" />
                        </div>
                        <div className="text-right">
                            <span className="block text-[11px] font-black text-adorix-primary">99.2%</span>
                            <span className="block text-[7px] text-white/50 uppercase font-bold">Accuracy</span>
                        </div>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-adorix-primary shadow-[0_0_10px_#0EA5E9]"
                            animate={{ width: ['40%', '99%', '85%', '99%'] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, gradient, delay, animationType }) => {
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Transform mouse position to rotation values for 3D effect
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    const renderAnimation = () => {
        switch (animationType) {
            case 'ai':
                return <AIAnimation isHovered={isHovered} mouseX={mouseX} mouseY={mouseY} />;
            case 'lightning':
                return <LightningAnimation isHovered={isHovered} mouseX={mouseX} mouseY={mouseY} />;
            case 'security':
                return <SecurityAnimation isHovered={isHovered} mouseX={mouseX} mouseY={mouseY} />;
            case 'analytics':
                return <AnalyticsAnimation isHovered={isHovered} mouseX={mouseX} mouseY={mouseY} />;
            case 'audience':
                return <AudienceAnimation isHovered={isHovered} mouseX={mouseX} mouseY={mouseY} />;
            case 'targeting':
                return <TargetingAnimation isHovered={isHovered} mouseX={mouseX} mouseY={mouseY} />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            className="relative group"
            style={{ perspective: '1500px' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className={`relative h-[550px] rounded-3xl overflow-hidden ${gradient} p-8 flex flex-col shadow-xl transition-shadow duration-300`}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                whileHover={{
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(13, 138, 158, 0.25)',
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Content - Top section */}
                <div className="relative z-10 mb-12">
                    <h3 className="text-2xl font-bold text-adorix-dark mb-4">{title}</h3>
                    <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>

                {/* Advanced Animation - Bottom section */}
                {renderAnimation()}

                {/* Enhanced Hover Effect Overlay with shimmer (Spotlight) */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: useTransform(
                            [mouseX, mouseY],
                            ([x, y]) => `radial-gradient(circle at ${50 + x * 100}% ${50 + y * 100}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
                        ),
                    }}
                />

                {/* Secondary Holographic Edge Shimmer */}
                <motion.div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay"
                    animate={{
                        background: isHovered
                            ? ['linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)', 'linear-gradient(120deg, transparent 100%, rgba(255,255,255,0.05) 150%, transparent 200%)']
                            : 'none'
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Subtle border glow on hover */}
                <motion.div
                    className="absolute inset-0 rounded-3xl border border-adorix-primary/0 pointer-events-none transition-colors duration-500 group-hover:border-adorix-primary/20"
                />
            </motion.div>
        </motion.div>
    );
};


const FeatureCards = () => {
    const features = [
        {
            icon: Sparkles,
            title: 'AI-Powered Insights',
            description: 'Leverage advanced machine learning to understand customer behavior and optimize your campaigns in real-time.',
            gradient: 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50',
            animationType: 'ai',
        },
        {
            icon: Zap,
            title: 'Lightning Fast Performance',
            description: 'Experience blazing-fast ad delivery with our optimized infrastructure. Your campaigns load instantly, every time.',
            gradient: 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50',
            animationType: 'lightning',
        },
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'Bank-level encryption and compliance with industry standards. Your data is protected with military-grade security.',
            gradient: 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50',
            animationType: 'security',
        },
        {
            icon: TrendingUp,
            title: 'Real-Time Analytics',
            description: 'Track every interaction with comprehensive dashboards. Make data-driven decisions with actionable insights.',
            gradient: 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50',
            animationType: 'analytics',
        },
        {
            icon: Users,
            title: 'Audience Targeting',
            description: 'Reach the right people at the right time. Our smart algorithms ensure maximum engagement and conversion.',
            gradient: 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50',
            animationType: 'audience',
        },
        {
            icon: Target,
            title: 'Precision Campaigns',
            description: 'Create hyper-targeted campaigns with our advanced segmentation tools. Deliver personalized experiences at scale.',
            gradient: 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50',
            animationType: 'targeting',
        },
    ];

    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-adorix-dark mb-6">
                        Powerful Features for Modern Advertising
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Everything you need to create, manage, and optimize intelligent advertising campaigns that drive real results.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            gradient={feature.gradient}
                            animationType={feature.animationType}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureCards;
