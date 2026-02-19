import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

const VisionMission = () => {
    return (
        <section className="py-24 px-6 max-w-4xl mx-auto z-10 relative">
            <div className="grid grid-cols-1 gap-12 text-center">
                {/* Vision Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/60 backdrop-blur-lg p-10 md:p-16 rounded-[3rem] border border-adorix-primary/10 shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col items-center"
                >
                    <div className="w-20 h-20 bg-adorix-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-adorix-primary transition-colors duration-500">
                        <Eye className="w-10 h-10 text-adorix-primary group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h2 className="text-4xl font-bold text-adorix-dark mb-6">Our Vision</h2>
                    <p className="text-gray-600 text-xl leading-relaxed max-w-2xl">
                        To create a world where technology doesn't just display information—it understands and responds to human presence. We envision a future where digital interactions are as natural and intuitive as face-to-face conversations.
                    </p>
                </motion.div>

                {/* Mission Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/60 backdrop-blur-lg p-10 md:p-16 rounded-[3rem] border border-adorix-primary/10 shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col items-center"
                >
                    <div className="w-20 h-20 bg-adorix-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-adorix-accent transition-colors duration-500">
                        <Target className="w-10 h-10 text-adorix-accent group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h2 className="text-4xl font-bold text-adorix-dark mb-6">Our Mission</h2>
                    <p className="text-gray-600 text-xl leading-relaxed max-w-2xl">
                        To empower businesses with ethical AI vision and voice technologies that capture real-world attention, deliver personalized experiences, and provide hyper-accurate data insights—all while maintaining the highest standards of privacy.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default VisionMission;
