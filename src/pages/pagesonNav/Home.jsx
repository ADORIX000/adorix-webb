import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Mic, Activity, Layers, Zap, Cpu, MessageSquare } from 'lucide-react';
import WorkflowAnimation from '../../components/home/WorkflowAnimation';
import MouseParticles from '../../components/ui/MouseParticles';

// Reusable Feature Card Component
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-adorix-primary/10 hover:border-adorix-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <div className="w-12 h-12 bg-adorix-light rounded-xl flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-adorix-primary" />
    </div>
    <h3 className="text-xl font-bold text-adorix-dark mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. MOUSE FOLLOWER EFFECT */}
      <MouseParticles />

      {/* 2. HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold text-adorix-secondary bg-adorix-light rounded-full border border-adorix-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-adorix-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-adorix-primary"></span>
            </span>
            v2.0 Live: AI Gaze Tracking & Voice
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-adorix-dark leading-tight mb-8 tracking-tight">
            Financial infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent">
              to grow your ads.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Adorix brings intelligent kiosk advertising to the physical world. 
            Manage campaigns, track audience gaze, and optimize revenue with AI-driven insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup" className="px-10 py-4 bg-adorix-dark text-white rounded-full font-bold hover:bg-gray-800 transition flex items-center gap-2 group shadow-lg shadow-adorix-dark/20">
              Start now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/contact" className="px-10 py-4 bg-white text-adorix-dark border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition">
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 3. STRIPE-STYLE WORKFLOW ANIMATION */}
      <section className="px-6 max-w-7xl mx-auto mb-32 z-10 relative">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-adorix-dark">A fully integrated suite of ad products</h2>
            <p className="text-gray-500 mt-2">From creation to analytics, everything flows through Adorix.</p>
        </div>
        <WorkflowAnimation />
      </section>

      {/* 4. DETAILED FEATURES GRID */}
      <section className="bg-gradient-to-b from-transparent to-white/50 py-20 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <FeatureCard 
              icon={Eye} 
              title="AI Attention Tracking" 
              desc="Our advanced computer vision algorithms track exactly where users look, measuring engagement duration and attention hotspots."
              delay={0.1}
            />
            
            <FeatureCard 
              icon={Mic} 
              title="Voice Recognition" 
              desc="Enable interactive ad experiences. Users can speak to the kiosk to get more information or navigate menus hands-free."
              delay={0.2}
            />
            
            <FeatureCard 
              icon={Activity} 
              title="Real-time Dashboard" 
              desc="Watch your campaigns perform live. Track impressions, interactions, and revenue generation second-by-second."
              delay={0.3}
            />

            <FeatureCard 
              icon={Cpu} 
              title="Personalized Delivery" 
              desc="The AI analyzes demographic data (age, gender) in real-time to serve the most relevant ad to the person standing in front of the kiosk."
              delay={0.4}
            />

            <FeatureCard 
              icon={MessageSquare} 
              title="Engagement Analysis" 
              desc="Deep dive into user behavior. Understand not just who saw your ad, but how they felt about it through sentiment analysis."
              delay={0.5}
            />

            <FeatureCard 
              icon={Layers} 
              title="Campaign Studio" 
              desc="A powerful drag-and-drop editor to create, schedule, and deploy your campaigns to thousands of devices instantly."
              delay={0.6}
            />

          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE CTA SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="bg-adorix-dark rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
           {/* Abstract Animated Circles in background */}
           <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -top-20 -left-20 w-96 h-96 bg-adorix-primary opacity-20 rounded-full blur-3xl"
           />
           <motion.div 
              animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }} 
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute -bottom-20 -right-20 w-96 h-96 bg-adorix-accent opacity-20 rounded-full blur-3xl"
           />

           <div className="relative z-10">
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to revolutionize your ads?</h2>
             <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
               Join thousands of businesses using Adorix to turn foot traffic into real revenue.
             </p>
             <button className="bg-adorix-primary hover:bg-adorix-secondary text-white px-12 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-adorix-primary/50">
               Create Free Account
             </button>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Home;