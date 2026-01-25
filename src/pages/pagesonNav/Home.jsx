import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Mic, Activity, Zap, Cpu, ScanFace, BarChart3 } from 'lucide-react';
import WorkflowAnimation from '../../components/home/WorkflowAnimation';
import MouseParticles from '../../components/ui/MouseParticles';

// Reusable Feature Card
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-adorix-primary/10 hover:border-adorix-primary/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
  >
    <div className="w-14 h-14 bg-adorix-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-7 h-7 text-adorix-primary group-hover:text-adorix-secondary transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-adorix-dark mb-3 group-hover:text-adorix-primary transition-colors">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="relative w-full overflow-hidden bg-adorix-light">
      
      {/* 1. INTERACTIVE MOUSE DUST (The "Repel" Effect) */}
      <MouseParticles />

      {/* 2. HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 max-w-7xl mx-auto z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-sm font-bold text-adorix-secondary bg-white/60 backdrop-blur-md rounded-full border border-adorix-primary/20 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-adorix-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-adorix-primary"></span>
            </span>
            v2.0 Live: AI Gaze Tracking Active
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-adorix-dark leading-[1.1] mb-8 tracking-tight">
            Ads that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent animate-pulse">
              look back at you.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Adorix transforms static screens into intelligent agents. 
            Track real attention, interact with voice, and serve personalized content in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link to="/signup" className="px-10 py-4 bg-adorix-dark text-white rounded-full font-bold hover:bg-gray-800 transition flex items-center gap-2 group shadow-xl shadow-adorix-dark/20 hover:scale-105 transform duration-200">
              Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/dashboard" className="px-10 py-4 bg-white text-adorix-dark border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition hover:border-adorix-primary/30">
              View Live Demo
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 3. STRIPE-STYLE ANIMATION (The Connecting Lines) */}
      <section className="px-6 max-w-7xl mx-auto mb-40 z-10 relative">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-adorix-dark mb-4">The Adorix Ecosystem</h2>
            <p className="text-adorix-secondary font-medium">From sensor data to actionable revenue.</p>
        </div>
        {/* This component (WorkflowAnimation) remains the same as I gave you previously */}
        <WorkflowAnimation />
      </section>

      {/* 4. CORE FEATURES GRID (Requested Content) */}
      <section className="py-20 px-6 z-10 relative bg-gradient-to-b from-transparent via-white/40 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-adorix-dark mb-6">Intelligence Built-In</h2>
            <p className="max-w-2xl mx-auto text-gray-600">Our AI core processes video and audio locally to deliver these powerful capabilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Attention Tracking */}
            <FeatureCard 
              icon={Eye} 
              title="Attention Tracking" 
              desc="Forget 'impressions'. We measure true attention time. Know exactly how many seconds a user locked eyes with your product."
              delay={0.1}
            />
            
            {/* Voice Recognition */}
            <FeatureCard 
              icon={Mic} 
              title="Voice Recognition" 
              desc="Turn kiosks into concierges. Users can ask 'Where is the food court?' and the ad switches to a map instantly."
              delay={0.2}
            />
            
            {/* Personalized Delivery */}
            <FeatureCard 
              icon={ScanFace} 
              title="Personalized Delivery" 
              desc="Computer vision detects demographics (Age, Gender) to swap the ad creative dynamically in milliseconds."
              delay={0.3}
            />

            {/* Live Dashboard */}
            <FeatureCard 
              icon={Activity} 
              title="Live Dashboard" 
              desc="Watch your network pulse in real-time. See active viewers, current ad playback, and revenue ticks as they happen."
              delay={0.4}
            />

            {/* Real-time Engagement */}
            <FeatureCard 
              icon={Zap} 
              title="Real-time Engagement" 
              desc="Detect smiles, frowns, and dwell time. Understand the emotional impact of your campaign immediately."
              delay={0.5}
            />

            {/* AI Insights */}
            <FeatureCard 
              icon={BarChart3} 
              title="AI Revenue Optimization" 
              desc="Our predictive engine suggests the best time slots and bid caps to maximize your ROI automatically."
              delay={0.6}
            />

          </div>
        </div>
      </section>

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