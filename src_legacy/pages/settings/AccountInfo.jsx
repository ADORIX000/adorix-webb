import React from 'react';
import { Save } from 'lucide-react';

const AccountInfo = () => {
  return (
    <div className="pt-28 px-6 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-adorix-dark mb-2">Personal Information</h1>
        <p className="text-adorix-secondary mb-8">Manage your personal details and company info.</p>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-adorix-primary/10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-adorix-dark mb-2">First Name</label>
                <input type="text" defaultValue="Deeghayu" className="w-full p-3 bg-adorix-light/30 border border-gray-200 rounded-lg outline-none focus:border-adorix-primary transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-adorix-dark mb-2">Last Name</label>
                <input type="text" className="w-full p-3 bg-adorix-light/30 border border-gray-200 rounded-lg outline-none focus:border-adorix-primary transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-adorix-dark mb-2">Email Address</label>
              <input type="email" defaultValue="user@example.com" disabled className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed" />
              <p className="text-xs text-gray-400 mt-1">Contact support to change email.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-adorix-dark mb-2">Phone Number</label>
              <input type="tel" className="w-full p-3 bg-adorix-light/30 border border-gray-200 rounded-lg outline-none focus:border-adorix-primary transition" placeholder="+94 77 123 4567" />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button className="bg-adorix-primary hover:bg-adorix-secondary text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;