'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSignUp } from '@clerk/nextjs';
import { Mail, ArrowRight, Shield, Check, Loader2 } from 'lucide-react';

const Signup = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [verifying, setVerifying] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError('');

        try {
            // Create the signup without a password
            await signUp.create({
                emailAddress,
                firstName,
            });

            // Start the email verification process
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setVerifying(true);
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onVerifySubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError('');

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push('/');
            } else {
                setError('Verification failed. Please check the code.');
            }
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Invalid code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-28 pb-24 flex justify-center items-center min-h-[80vh]">
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-adorix-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />

                <AnimatePresence mode="wait">
                    {!verifying ? (
                        <motion.div
                            key="signup-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-adorix-dark mb-2">Create account</h2>
                                <p className="text-gray-500 font-medium">Join the ad revolution today.</p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="mb-6 overflow-hidden"
                                >
                                    <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold flex items-start gap-2">
                                        <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        {error}
                                    </div>
                                </motion.div>
                            )}

                            <form onSubmit={onSignUpSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-adorix-dark mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-adorix-primary focus:border-transparent focus:bg-white transition-all outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-adorix-dark mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={emailAddress}
                                        onChange={(e) => setEmailAddress(e.target.value)}
                                        required
                                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-adorix-primary focus:border-transparent focus:bg-white transition-all outline-none"
                                        placeholder="you@example.com"
                                    />
                                    <p className="mt-2 text-xs text-gray-400 font-medium">We'll send a secure code to this email.</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-adorix-dark hover:bg-adorix-primary text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 group"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="text-center text-sm font-medium text-gray-400 mt-8">
                                Already have an account?{' '}
                                <Link href="/login" className="text-adorix-primary font-bold hover:underline decoration-2">Sign in</Link>
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="verify-form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-adorix-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                                <Mail className="w-10 h-10 text-adorix-primary" />
                            </div>
                            <h2 className="text-3xl font-bold text-adorix-dark mb-3">Check your email</h2>
                            <p className="text-gray-500 font-medium leading-relaxed mb-10">
                                We've sent a 6-digit code to <br />
                                <span className="text-adorix-dark font-bold">{emailAddress}</span>
                            </p>

                            {error && (
                                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={onVerifySubmit} className="space-y-8">
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
                                            Verify & Continue
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <button
                                type="button"
                                onClick={() => signUp?.prepareEmailAddressVerification({ strategy: 'email_code' })}
                                disabled={loading}
                                className="mt-8 text-sm font-bold text-gray-400 hover:text-adorix-primary transition-colors disabled:opacity-50"
                            >
                                Didn't get the code? <span className="underline decoration-2">Resend</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Signup;
