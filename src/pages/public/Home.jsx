import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-adorix-700 bg-adorix-100 rounded-full border border-adorix-200">
            v2.0 is now live: AI Gaze Tracking
          </div>
          <h1 className="text-6xl font-bold text-adorix-dark leading-[1.1] mb-6 tracking-tight">
            Financial infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-600 to-blue-600">
              to grow your ads.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
            Adorix brings intelligent kiosk advertising to the physical world. 
            Manage campaigns, track audience gaze, and optimize revenue with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup" className="px-8 py-4 bg-adorix-900 text-white rounded-full font-bold hover:bg-adorix-800 transition flex items-center justify-center gap-2 group shadow-xl shadow-adorix-900/20">
              Start now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-white text-adorix-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition flex items-center justify-center">
              Contact Sales
            </Link>
          </div>
        </motion.div>

        {/* Right: Feature Grid (Simulating Stripe's visual) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 flex flex-col items-start gap-4 transform hover:-translate-y-2 transition duration-300">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600"><Globe className="w-6 h-6"/></div>
            <div>
              <h3 className="font-bold text-lg">Global Reach</h3>
              <p className="text-sm text-gray-500">Deploy ads to any kiosk instantly.</p>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 flex flex-col items-start gap-4 transform translate-y-8 hover:translate-y-6 transition duration-300">
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600"><BarChart3 className="w-6 h-6"/></div>
            <div>
              <h3 className="font-bold text-lg">Real-time Analytics</h3>
              <p className="text-sm text-gray-500">Track who looks at your ads.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;