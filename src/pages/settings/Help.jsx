import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const Help = () => {
  return (
    <div className="pt-28 px-6 pb-20 min-h-screen bg-adorix-light">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-adorix-dark mb-8">Help Center</h1>
        
        <div className="space-y-4">
          {[
            "How do I upload a new campaign?",
            "How does the AI Gaze tracking work?",
            "What payment methods are accepted?",
            "Can I refund a cancelled campaign?"
          ].map((q, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-adorix-primary/10 shadow-sm flex justify-between items-center cursor-pointer hover:border-adorix-primary/50 transition">
                <span className="font-semibold text-adorix-dark">{q}</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>

        <div className="mt-12 bg-adorix-dark text-white p-8 rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-2">Still need help?</h3>
            <p className="text-gray-400 mb-6">Our support team is available 24/7.</p>
            <button className="bg-adorix-accent hover:bg-adorix-primary text-adorix-dark font-bold px-8 py-3 rounded-full transition">
                Contact Support
            </button>
        </div>
      </div>
    </div>
  );
};

export default Help;