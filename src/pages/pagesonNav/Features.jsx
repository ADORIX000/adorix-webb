import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Zap, Target, Shield, BarChart3, Globe,
    Cpu, MessageSquare, Fingerprint, Eye, Database, Share2
} from 'lucide-react';
import FeatureCards from '../../components/home/FeatureCards';
import TypingText from '../../components/home/TypingText';

const Features = () => {
    return (
        <div className="pt-28 pb-20 px-6 min-h-screen bg-transparent">
            {/* Header Section */}
            <section className="max-w-5xl mx-auto text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="px-4 py-2 bg-adorix-primary/10 text-adorix-primary rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
                        Capabilities v3.1
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-adorix-dark mb-8 tracking-tighter">
                        <TypingText text="Intelligent Features" speed={0.05} /> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent">
                            <TypingText text="For Next-Gen Ads" startDelay={1.2} speed={0.05} />
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                        Adorix provides the substrate for truly interactive, reactive, and privacy-first advertising environments.
                    </p>
                </motion.div>
            </section>

            {/* Main Features Grid (Reusing FeatureCards) */}
            <FeatureCards />

            {/* Technical Specifications Section */}
            <section className="max-w-7xl mx-auto mt-32">
                <div className="bg-white rounded-[3rem] p-12 md:p-20 border border-gray-100 shadow-xl shadow-adorix-dark/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Cpu,
                                title: "Edge Processing",
                                desc: "Real-time demographic analysis happens directly on the kiosk, ensuring zero latency and absolute privacy.",
                                color: "blue"
                            },
                            {
                                icon: MessageSquare,
                                title: "Voice Interaction",
                                desc: "Natural language processing allows customers to talk to your ads, creating a two-way dialogue.",
                                color: "purple"
                            },
                            {
                                icon: Fingerprint,
                                title: "Privacy-First",
                                desc: "No personally identifiable information is ever stored. We analyze signals, not people.",
                                color: "emerald"
                            },
                            {
                                icon: Eye,
                                title: "Gaze Tracking",
                                desc: "Measure aggregate attention duration and hotspot focus with precise infrared eye-tracking modeling.",
                                color: "orange"
                            },
                            {
                                icon: Database,
                                title: "Smart Storage",
                                desc: "Decentralized data aggregation provides high-level insights without centralized vulnerability.",
                                color: "cyan"
                            },
                            {
                                icon: Share2,
                                title: "Omnichannel Sync",
                                desc: "Instantly bridge physical kiosk interactions with digital retargeting across the Adorix Mesh.",
                                color: "pink"
                            }
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className={`w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl transition-all duration-500`}>
                                    <tech.icon className="w-7 h-7 text-adorix-dark group-hover:text-adorix-primary transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-adorix-dark mb-3 tracking-tight">{tech.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium italic">{tech.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto mt-32 text-center">
                <div className="bg-adorix-dark rounded-[3rem] p-16 md:p-24 relative overflow-hidden">

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Ready to experience these features?</h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                to="/signup"
                                className="px-12 py-5 bg-adorix-primary text-white rounded-full font-black text-lg hover:bg-white hover:text-adorix-dark transition-all shadow-xl shadow-adorix-primary/20 hover:-translate-y-1"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                to="/contact"
                                className="px-12 py-5 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-full font-black text-lg hover:bg-white/20 transition-all hover:-translate-y-1"
                            >
                                Talk to Sales
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Features;
