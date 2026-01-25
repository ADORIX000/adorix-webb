import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Mic, BarChart3, Users, Cpu, Layers } from 'lucide-react';

const Node = ({ icon: Icon, label, x, y, delay }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    className="absolute flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-xl border border-adorix-primary/20 w-32 h-32 z-10"
    style={{ left: x, top: y }}
  >
    <div className="bg-adorix-light p-3 rounded-full mb-2">
      <Icon className="w-6 h-6 text-adorix-primary" />
    </div>
    <span className="text-xs font-bold text-adorix-dark text-center">{label}</span>
  </motion.div>
);

const ConnectionLine = ({ start, end, delay }) => {
  // Simple calculation to draw a line between two percentage points
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
      <motion.path
        d={`M ${start.x} ${start.y} C ${start.x + 100} ${start.y}, ${end.x - 100} ${end.y}, ${end.x} ${end.y}`}
        fill="transparent"
        stroke="#0D8A9E"
        strokeWidth="2"
        strokeDasharray="10 5"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.5 }}
        transition={{ delay, duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
  );
};

const WorkflowAnimation = () => {
  return (
    <div className="relative w-full h-[500px] bg-white/50 backdrop-blur-sm rounded-3xl border border-white/60 shadow-inner overflow-hidden my-20">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#0D8A9E 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* Central Hub */}
      <Node icon={Cpu} label="Adorix Core" x="50%" y="40%" delay={0} />

      {/* Feature Nodes */}
      <Node icon={Eye} label="Gaze Tracking" x="20%" y="20%" delay={0.5} />
      <Node icon={Mic} label="Voice Recog." x="20%" y="60%" delay={0.7} />
      
      <Node icon={Users} label="Audience" x="80%" y="20%" delay={1.2} />
      <Node icon={BarChart3} label="Live Analytics" x="80%" y="60%" delay={1.4} />

      {/* Connecting Lines (SVG paths roughly calculated based on positions) */}
      {/* Left to Center */}
      <ConnectionLine start={{x: 300, y: 150}} end={{x: 600, y: 250}} delay={0.8} />
      <ConnectionLine start={{x: 300, y: 350}} end={{x: 600, y: 250}} delay={1.0} />

      {/* Center to Right */}
      <ConnectionLine start={{x: 700, y: 250}} end={{x: 1000, y: 150}} delay={1.5} />
      <ConnectionLine start={{x: 700, y: 250}} end={{x: 1000, y: 350}} delay={1.7} />
      
      {/* Floating particles specific to this diagram */}
      <motion.div 
        animate={{ x: [300, 600, 1000], y: [150, 250, 150] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute w-3 h-3 bg-adorix-accent rounded-full shadow-[0_0_10px_#12B2C1]"
      />
      <motion.div 
        animate={{ x: [300, 600, 1000], y: [350, 250, 350] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
        className="absolute w-3 h-3 bg-adorix-primary rounded-full shadow-[0_0_10px_#0D8A9E]"
      />
    </div>
  );
};

export default WorkflowAnimation;