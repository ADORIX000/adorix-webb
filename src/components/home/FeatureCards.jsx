import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, TrendingUp, Users, Target } from 'lucide-react';

// AI-Powered Insights Animation - Neural network pulses
const AIAnimation = () => (
    <div className="absolute inset-0 overflow-hidden opacity-20">
        {/* Neural network nodes */}
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                    left: `${20 + (i % 3) * 30}%`,
                    top: `${20 + Math.floor(i / 3) * 25}%`,
                }}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                }}
            />
        ))}
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full">
            {[...Array(6)].map((_, i) => (
                <motion.line
                    key={i}
                    x1={`${30 + (i % 2) * 40}%`}
                    y1={`${30}%`}
                    x2={`${50 + (i % 3) * 20}%`}
                    y2={`${60}%`}
                    stroke="white"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        repeatDelay: 1,
                    }}
                />
            ))}
        </svg>
    </div>
);

// Lightning Fast Performance - Electric bolts
const LightningAnimation = () => (
    <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute"
                style={{ left: `${20 + i * 30}%`, top: '-10%' }}
                animate={{
                    y: ['0%', '120%'],
                    opacity: [0, 1, 1, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeIn',
                }}
            >
                <svg width="20" height="80" viewBox="0 0 20 80" fill="none">
                    <path
                        d="M10 0L6 30H14L8 80L18 35H10L10 0Z"
                        fill="white"
                        opacity="0.6"
                    />
                </svg>
            </motion.div>
        ))}
    </div>
);

// Enterprise Security - Shield with scanning effect
const SecurityAnimation = () => (
    <div className="absolute inset-0 overflow-hidden">
        <motion.div
            className="absolute inset-0"
            style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                height: '30%',
            }}
            animate={{
                y: ['0%', '300%'],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
            }}
        />
        {/* Hexagon pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
                <pattern id="hexagons" x="0" y="0" width="50" height="43.4" patternUnits="userSpaceOnUse">
                    <polygon points="25,0 50,14.43 50,28.87 25,43.3 0,28.87 0,14.43" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
    </div>
);

// Real-Time Analytics - Animated chart bars
const AnalyticsAnimation = () => (
    <div className="absolute inset-0 flex items-end justify-center gap-3 p-12 opacity-30">
        {[40, 70, 55, 85, 60, 90, 75].map((height, i) => (
            <motion.div
                key={i}
                className="bg-white rounded-t"
                style={{ width: '8%' }}
                initial={{ height: '20%' }}
                animate={{ height: `${height}%` }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: i * 0.1,
                }}
            />
        ))}
    </div>
);

// Audience Targeting - User connection network
const AudienceAnimation = () => (
    <div className="absolute inset-0 overflow-hidden opacity-25">
        {/* User nodes */}
        {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 35;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);

            return (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-white rounded-full"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.15,
                    }}
                />
            );
        })}
        {/* Central hub */}
        <motion.div
            className="absolute w-6 h-6 bg-white rounded-full"
            style={{ left: '47%', top: '47%' }}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
            }}
        />
    </div>
);

// Precision Campaigns - Crosshair targeting
const TargetingAnimation = () => (
    <div className="absolute inset-0 overflow-hidden">
        <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
            {/* Crosshair circles */}
            {[30, 50, 70].map((size, i) => (
                <motion.div
                    key={i}
                    className="absolute border-2 border-white rounded-full"
                    style={{ width: `${size}%`, height: `${size}%` }}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                />
            ))}
            {/* Crosshair lines */}
            <div className="absolute w-full h-0.5 bg-white opacity-30" />
            <div className="absolute w-0.5 h-full bg-white opacity-30" />
        </motion.div>
        {/* Scanning pulse */}
        <motion.div
            className="absolute inset-0 rounded-full border-4 border-white"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
            }}
            style={{ left: '25%', top: '25%', width: '50%', height: '50%' }}
        />
    </div>
);

const FeatureCard = ({ icon: Icon, title, description, gradient, delay, animationType }) => {
    const renderAnimation = () => {
        switch (animationType) {
            case 'ai':
                return <AIAnimation />;
            case 'lightning':
                return <LightningAnimation />;
            case 'security':
                return <SecurityAnimation />;
            case 'analytics':
                return <AnalyticsAnimation />;
            case 'audience':
                return <AudienceAnimation />;
            case 'targeting':
                return <TargetingAnimation />;
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
        >
            <div className={`relative h-[400px] rounded-3xl overflow-hidden ${gradient} p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300`}>

                {/* Contextual Animation */}
                {renderAnimation()}

                {/* Content */}
                <div className="relative z-10">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6"
                    >
                        <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                    <p className="text-white/90 leading-relaxed">{description}</p>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                    className="absolute inset-0 bg-white/0 pointer-events-none"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    transition={{ duration: 0.3 }}
                />

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
        </motion.div>
    );
};

const FeatureCards = () => {
    const features = [
        {
            icon: Sparkles,
            title: 'AI-Powered Insights',
            description: 'Leverage advanced machine learning to understand customer behavior and optimize your campaigns in real-time.',
            gradient: 'bg-gradient-to-br from-adorix-primary via-adorix-secondary to-adorix-accent',
            animationType: 'ai',
        },
        {
            icon: Zap,
            title: 'Lightning Fast Performance',
            description: 'Experience blazing-fast ad delivery with our optimized infrastructure. Your campaigns load instantly, every time.',
            gradient: 'bg-gradient-to-br from-adorix-dark via-adorix-primary to-adorix-secondary',
            animationType: 'lightning',
        },
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'Bank-level encryption and compliance with industry standards. Your data is protected with military-grade security.',
            gradient: 'bg-gradient-to-br from-adorix-secondary via-adorix-accent to-adorix-primary',
            animationType: 'security',
        },
        {
            icon: TrendingUp,
            title: 'Real-Time Analytics',
            description: 'Track every interaction with comprehensive dashboards. Make data-driven decisions with actionable insights.',
            gradient: 'bg-gradient-to-br from-adorix-accent via-adorix-primary to-adorix-dark',
            animationType: 'analytics',
        },
        {
            icon: Users,
            title: 'Audience Targeting',
            description: 'Reach the right people at the right time. Our smart algorithms ensure maximum engagement and conversion.',
            gradient: 'bg-gradient-to-br from-adorix-primary via-adorix-dark to-adorix-secondary',
            animationType: 'audience',
        },
        {
            icon: Target,
            title: 'Precision Campaigns',
            description: 'Create hyper-targeted campaigns with our advanced segmentation tools. Deliver personalized experiences at scale.',
            gradient: 'bg-gradient-to-br from-adorix-secondary via-adorix-primary to-adorix-accent',
            animationType: 'targeting',
        },
    ];

    return (
        <section className="py-20 px-6 bg-gray-50">
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
