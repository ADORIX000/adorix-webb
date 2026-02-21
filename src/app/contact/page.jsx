import React from 'react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50">
        <h2 className="text-4xl font-bold text-adorix-dark mb-4">Contact Sales</h2>
        <p className="text-gray-500 mb-8">Tell us about your project and we'll help you optimize your ad revenue.</p>
        
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
              <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-adorix-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-adorix-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Work Email</label>
            <input type="email" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-adorix-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea rows="4" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-adorix-500 focus:outline-none"></textarea>
          </div>
          <button className="w-full bg-adorix-600 text-white font-bold py-4 rounded-lg hover:bg-adorix-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;