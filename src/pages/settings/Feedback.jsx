import React from 'react';
import { Star, Send } from 'lucide-react';

const Feedback = () => {
  return (
    <div className="pt-28 px-6 pb-20 min-h-screen">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-adorix-primary/10 text-center">
        <h1 className="text-2xl font-bold text-adorix-dark mb-2">We value your feedback</h1>
        <p className="text-gray-500 mb-8">Help us improve the Adorix experience.</p>

        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-8 h-8 text-gray-300 hover:text-yellow-400 cursor-pointer transition fill-current hover:fill-yellow-400" />
          ))}
        </div>

        <textarea
          className="w-full bg-adorix-light/30 border border-gray-200 rounded-xl p-4 h-32 outline-none focus:border-adorix-primary resize-none mb-6"
          placeholder="Tell us what you like or what we can improve..."
        ></textarea>

        <button className="w-full bg-adorix-primary hover:bg-adorix-secondary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition">
          <Send className="w-4 h-4" /> Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;