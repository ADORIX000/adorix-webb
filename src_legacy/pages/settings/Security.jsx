import React from 'react';
import { Shield, Key, Smartphone, Lock } from 'lucide-react';

const Security = () => {
  return (
    <div className="pt-28 px-6 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-adorix-dark mb-2">Account Security</h1>
        <p className="text-adorix-secondary mb-8">Manage your password and 2-step verification methods.</p>

        {/* 2FA Section - Highlighted for importance */}
        <div className="bg-gradient-to-r from-adorix-dark to-gray-900 text-white p-6 rounded-2xl shadow-lg mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-full">
              <Shield className="w-8 h-8 text-adorix-accent" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Two-Factor Authentication</h3>
              <p className="text-gray-400 text-sm">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <button className="bg-adorix-accent hover:bg-adorix-primary text-adorix-dark font-bold px-4 py-2 rounded-lg transition">
            Enable
          </button>
        </div>

        {/* Change Password */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-adorix-primary/10">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Key className="w-5 h-5 text-adorix-primary" />
            <h3 className="font-bold text-adorix-dark">Change Password</h3>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input type="password" className="w-full pl-10 p-3 bg-adorix-light/30 border border-gray-200 rounded-lg outline-none focus:border-adorix-primary" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                <input type="password" className="w-full p-3 bg-adorix-light/30 border border-gray-200 rounded-lg outline-none focus:border-adorix-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                <input type="password" className="w-full p-3 bg-adorix-light/30 border border-gray-200 rounded-lg outline-none focus:border-adorix-primary" />
              </div>
            </div>
            <div className="text-right mt-4">
              <button className="text-adorix-primary font-bold text-sm hover:underline">Forgot Password?</button>
            </div>
            <button className="w-full bg-adorix-dark text-white font-bold py-3 rounded-lg mt-4 hover:bg-gray-800 transition">
              Update Password
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Security;