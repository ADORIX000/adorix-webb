import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, TrendingUp, Users, Target } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="group relative"
        >
            <div className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100`}>

                {/* Icon Container - Clean Gray */}
                <div className={`flex-shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 text-adorix-primary`}>
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                </div>

                <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                        {description}
                    </p>
                </div>
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
        },
        {
            icon: Zap,
            title: 'Lightning Fast Performance',
            description: 'Experience blazing-fast ad delivery with our optimized infrastructure. Your campaigns load instantly, every time.',
        },
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'Bank-level encryption and compliance with industry standards. Your data is protected with military-grade security.',
        },
        {
            icon: TrendingUp,
            title: 'Real-Time Analytics',
            description: 'Track every interaction with comprehensive dashboards. Make data-driven decisions with actionable insights.',
        },
        {
            icon: Users,
            title: 'Audience Targeting',
            description: 'Reach the right people at the right time. Our smart algorithms ensure maximum engagement and conversion.',
        },
        {
            icon: Target,
            title: 'Precision Campaigns',
            description: 'Create hyper-targeted campaigns with our advanced segmentation tools. Deliver personalized experiences at scale.',
        },
    ];

    return (
        <section className="py-24 px-6 bg-gray-50/50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        Powerful Features for <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-adorix-primary to-adorix-accent">
                            Modern Advertising
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Everything you need to create, manage, and optimize intelligent advertising campaigns that drive real results.
                    </motion.p>
                </div>

                <div className="flex flex-col gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
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
