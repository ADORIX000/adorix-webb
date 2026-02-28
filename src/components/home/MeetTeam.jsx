import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';

const TeamMember = ({ name, role, image, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="flex-shrink-0 w-[80vw] sm:w-auto bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-adorix-primary/5 hover:border-adorix-primary/30 transition-all duration-500 group text-center snap-center"
    >
        <div className="relative mb-6 inline-block">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-adorix-light group-hover:border-adorix-primary transition-colors duration-500 mx-auto">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-adorix-primary text-white p-2 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500">
                <Linkedin className="w-4 h-4" />
            </div>
        </div>
        <h3 className="text-xl font-bold text-adorix-dark mb-1">{name}</h3>
        <p className="text-adorix-primary font-medium text-sm mb-4">{role}</p>
        <div className="flex justify-center gap-4">
            <Github className="w-5 h-5 text-gray-400 hover:text-adorix-dark cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-adorix-accent cursor-pointer transition-colors" />
        </div>
    </motion.div>
);

const MeetTeam = () => {
    const team = [
        {
            name: "Deeghayu Arandara",
            role: "TEAM LEAD & IOT ARCHITECT",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deeghayu",
        },
        {
            name: "Binethma Jayawickrama",
            role: "COMPUTER VISION ENGINEER",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Binethma",
        },
        {
            name: "Sithika Weerasinghe",
            role: "FULL STACK DEVELOPER",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sithika",
        },
        {
            name: "Chanithma Dangalla",
            role: "BACKEND DEVELOPER",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chanithma",
        },
        {
            name: "Sahan Adithya",
            role: "AI INTERACTION DESIGNER",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sahan",
        },
        {
            name: "Lithira Kalubowila",
            role: "DATA ANALYTICS SPECIALIST",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lithira",
        }
    ];

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-adorix-dark mb-4"
                >
                    Meet Our Team
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-600 max-w-2xl mx-auto"
                >
                    The visionaries and engineers building the future of intelligent, responsive advertising environments.
                </motion.p>
            </div>

            <div className="flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 sm:pb-0 scrollbar-hide">
                {team.map((member, index) => (
                    <TeamMember key={index} {...member} delay={index * 0.1} />
                ))}
            </div>
        </section>
    );
};

export default MeetTeam;
