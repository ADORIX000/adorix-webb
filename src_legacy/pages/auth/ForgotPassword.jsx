import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        setLoading(true);
        setError('');

        // This would be a real API call in a full implementation
        setTimeout(() => {
            setSubmitted(true);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="pt-28 pb-24 flex justify-center items-center min-h-[80vh]">
            <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md text-center">
                {!submitted ? (
                    <>
                        <h2 className="text-3xl font-bold text-adorix-dark mb-2">Reset Password</h2>
                        <p className="text-gray-500 mb-8">Enter your email to receive a password reset link.</p>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adorix-primary focus:outline-none transition"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-adorix-dark hover:bg-adorix-primary text-white font-bold py-3 rounded-lg transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : 'Send Reset Link'}
                            </button>
                        </form>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-4"
                    >
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            ✓
                        </div>
                        <h2 className="text-3xl font-bold text-adorix-dark mb-2">Check your email</h2>
                        <p className="text-gray-500 mb-8">
                            We've sent a password reset link to <span className="font-semibold text-gray-800">{email}</span>.
                        </p>
                    </motion.div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link to="/login" className="text-adorix-primary font-semibold hover:underline">
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
