"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';

const TeamMember = ({ name, role, image, delay }) => {
    const [imgError, setImgError] = useState(false);
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="flex-shrink-0 w-[80vw] sm:w-auto bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-adorix-primary/5 hover:border-adorix-primary/30 transition-all duration-500 group text-center snap-center"
        >
            <div className="relative mb-6 inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-adorix-light group-hover:border-adorix-primary bg-gray-50 flex items-center justify-center transition-colors duration-500 mx-auto">
                    {!imgError ? (
                        <img 
                            src={image} 
                            alt={name} 
                            onError={() => setImgError(true)}
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        <span className="text-3xl font-black text-adorix-dark tracking-wider">
                            {initials}
                        </span>
                    )}
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
};

const MeetTeam = () => {
    const teamCarouselRef = useRef(null);
    const dotCount = 7;
    const [activeDot, setActiveDot] = useState(0);

    const updateActiveDot = () => {
        const carousel = teamCarouselRef.current;
        if (!carousel) {
            return;
        }

        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        if (maxScroll <= 0) {
            setActiveDot(0);
            return;
        }

        const scrollProgress = carousel.scrollLeft / maxScroll;
        const nextDot = Math.round(scrollProgress * (dotCount - 1));
        setActiveDot(Math.max(0, Math.min(dotCount - 1, nextDot)));
    };

    useEffect(() => {
        updateActiveDot();
    }, []);

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

            <div
                ref={teamCarouselRef}
                onScroll={updateActiveDot}
                className="team-carousel flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 sm:pb-0"
            >
                {team.map((member, index) => (
                    <TeamMember key={index} {...member} delay={index * 0.1} />
                ))}
            </div>

            <div className="sm:hidden flex items-center justify-center gap-3 mt-2" aria-hidden="true">
                {Array.from({ length: dotCount }).map((_, index) => (
                    <span
                        key={index}
                        className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                            index === activeDot ? 'bg-adorix-primary' : 'bg-adorix-primary/25'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default MeetTeam;
