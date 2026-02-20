import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TypingText from '../../components/home/TypingText';
import WorkflowAnimation from '../../components/home/WorkflowAnimation';
import TechStack from '../../components/home/TechStack';
import FeatureCards from '../../components/home/FeatureCards';
import VisionMission from '../../components/home/VisionMission';
import MeetTeam from '../../components/home/MeetTeam';

const Home = () => {
  return (
    <div className="relative w-full overflow-hidden">

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto z-10 text-center flex flex-col items-center gap-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-gray-600 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
            </span>
            v2.0 Live: AI Gaze Tracking Active
          </div>
        </motion.div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 leading-[1.1] tracking-tight">
          <TypingText text="Ads that" speed={0.05} />
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent">
            <TypingText text="look back at you." startDelay={0.5} speed={0.05} />
          </span>
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Adorix transforms static screens into intelligent agents.
          Track real attention, interact with voice, and serve personalized content in real-time.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-4"
        >
          <Link to="/signup" className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition flex items-center gap-2 group shadow-lg hover:shadow-xl hover:-translate-y-1 duration-200">
            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
          <Link to="/dashboard" className="px-10 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition hover:border-gray-300 hover:shadow-md hover:-translate-y-1 duration-200">
            View Live Demo
          </Link>
        </motion.div>
      </section>



      {/* 3. STRIPE-STYLE ANIMATION (The Connecting Lines) */}
      <section className="px-6 max-w-7xl mx-auto mb-10 mt-10 md:mt-32 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">

          {/* LEFT COLUMN: Diagram (Larger: 3 cols) */}
          <div className="flex justify-center lg:justify-start lg:col-span-3">
            <WorkflowAnimation />
          </div>

          {/* RIGHT COLUMN: Description (Extremely Simple) */}
          <div className="text-left space-y-6 lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              The Intelligent Flow
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              Adorix turns passive screens into active, intelligent agents.
              Detect visitors, analyze demographics, and serve personalized content
              in milliseconds—all while maintaining absolute privacy.
              It’s not just a display; it’s a responsive environment that adapts to everyone.
            </p>
          </div>

        </div>
      </section>

      {/* TECH STACK MARQUEE (Moved here) */}
      <TechStack />

      {/* VISION & MISSION SECTION */}
      <VisionMission />

      {/* ANIMATED FEATURE CARDS */}
      <FeatureCards />

      {/* MEET OUR TEAM SECTION */}
      <MeetTeam />

      {/* 5. FINAL CTA */}
      <section className="py-32 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="bg-adorix-dark rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Background Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] border border-white/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-[600px] h-[600px] border border-white/5 rounded-full"
          />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to capture real attention?</h2>
            <button className="bg-adorix-primary hover:bg-adorix-secondary text-white px-12 py-5 rounded-full font-bold text-lg transition shadow-[0_0_30px_rgba(13,138,158,0.3)] hover:shadow-[0_0_50px_rgba(13,138,158,0.5)] transform hover:-translate-y-1">
              Deploy Your First Campaign
            </button>
            <p className="mt-8 text-gray-500 text-sm">No credit card required for demo.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;