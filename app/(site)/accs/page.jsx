'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Mail, ArrowRight, Loader2, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Accs = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/login');
        }
    }, [isLoaded, isSignedIn]);

    const sendOtp = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/send-otp', { method: 'POST' });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
            setSent(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Auto-send OTP on load if we haven't yet
    useEffect(() => {
        if (isSignedIn && !sent && !loading) {
            sendOtp();
        }
    }, [isSignedIn]);

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Verification failed');

            // Redirect to dashboard on success
            router.push('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded || !isSignedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-transparent">
                <Loader2 className="w-10 h-10 animate-spin text-adorix-primary" />
            </div>
        )
    }

    return (
        <div className="pt-28 pb-24 flex justify-center items-center min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md text-center relative overflow-hidden"
            >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-adorix-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />

                <div className="w-20 h-20 bg-adorix-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <Mail className="w-10 h-10 text-adorix-primary" />
                </div>

                <h2 className="text-3xl font-bold text-adorix-dark mb-3">Security Step</h2>
                <p className="text-gray-500 font-medium leading-relaxed mb-10">
                    Welcome, <span className="text-adorix-dark font-bold font-black">{user?.firstName || 'User'}</span>! <br />
                    We've sent a 6-digit security code to your email for verification.
                </p>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold flex items-center gap-2 justify-center"
                    >
                        <Shield className="w-4 h-4 flex-shrink-0" />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleVerify} className="space-y-8">
                    <div className="flex justify-center">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="000000"
                            maxLength={6}
                            required
                            className="w-full text-center text-4xl tracking-[0.5em] font-black py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-adorix-primary focus:bg-white transition-all outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-adorix-dark hover:bg-adorix-primary text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-adorix-dark/10 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-60"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Verify & Access Dashboard
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <button
                    onClick={sendOtp}
                    disabled={loading}
                    className="mt-8 text-sm font-bold text-gray-400 hover:text-adorix-primary transition-colors disabled:opacity-50"
                >
                    Didn't get the code? <span className="underline decoration-2">Resend Magic Code</span>
                </button>
            </motion.div>
        </div>
    );
};

export default Accs;
