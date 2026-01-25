import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // In a real app, you would send data to backend here
    navigate('/verify'); // Redirect to verification after signup
  };

  return (
    <div className="pt-28 flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-3xl font-bold text-adorix-dark mb-2">Create account</h2>
        <p className="text-gray-500 mb-8">Join the ad revolution today.</p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adorix-500 focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adorix-500 focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adorix-500 focus:outline-none transition" />
          </div>
          
          <button type="submit" className="w-full bg-adorix-600 hover:bg-adorix-700 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-adorix-500/30">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;