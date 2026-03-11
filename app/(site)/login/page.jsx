'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSignIn } from '@clerk/nextjs';
import { Mail, ArrowRight, Shield, Check, User, Loader2 } from 'lucide-react';

const LoginContent = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [code, setCode] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(searchParams?.get('error') || '');

    useEffect(() => {
        setMounted(true);
        const savedEmail = localStorage.getItem('remember_me_email');
        if (savedEmail) {
            setEmailAddress(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const onSignInSubmit = async (e) => {
        e.preventDefault();
        console.log('SignIn Submit:', { emailAddress, isLoaded });
        if (!isLoaded) {
            console.warn('Clerk is not loaded yet');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Initiate sign in with email (passwordless)
            const result = await signIn.create({
                identifier: emailAddress,
            });

            // Find the email code strategy from choices
            const firstFactor = result.supportedFirstFactors.find(
                (f) => f.strategy === 'email_code'
            );

            if (firstFactor) {
                await signIn.prepareFirstFactor({
                    strategy: 'email_code',
                    emailAddressId: firstFactor.emailAddressId,
                });
                setVerifying(true);
            } else {
                throw new Error('Email verification is not available for this account.');
            }
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Login failed. Please verify your email.');
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
            const result = await signIn.attemptFirstFactor({
                strategy: 'email_code',
                code,
            });

            if (result.status === 'complete') {
                if (rememberMe) {
                    localStorage.setItem('remember_me_email', emailAddress);
                } else {
                    localStorage.removeItem('remember_me_email');
                }
                await setActive({ session: result.createdSessionId });
                router.push('/');
            } else {
                console.log(result);
                setError('Verification failed.');
            }
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Invalid code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = () => {
        console.log('Google SignIn Clicked', { isLoaded });
        if (!isLoaded) return;
        signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: '/accs',
            redirectUrlComplete: '/accs',
        });
    };

    if (!mounted) return null;

    return (
        <div className="pt-28 pb-24 flex justify-center items-center min-h-[80vh]">
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-adorix-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />

                <AnimatePresence mode="wait">
                    {!verifying ? (
                        <motion.div
                            key="login-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-adorix-dark mb-2">Welcome back</h2>
                                <p className="text-gray-500 font-medium">Sign in to your Adorix dashboard</p>
                            </div>

                            {error && (
                                <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold flex items-start gap-2">
                                    <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={onSignInSubmit} className="space-y-6">
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
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-5 w-5 text-adorix-primary focus:ring-adorix-primary border-gray-300 rounded-lg cursor-pointer transition-all"
                                    />
                                    <label htmlFor="rememberMe" className="ml-3 block text-sm font-bold text-gray-600 cursor-pointer select-none">
                                        Remember me
                                    </label>
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
                                            Sign In
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="relative flex items-center gap-4 my-10">
                                <div className="flex-1 h-px bg-gray-100" />
                                <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">or join with</span>
                                <div className="flex-1 h-px bg-gray-100" />
                            </div>

                            <button
                                type="button"
                                onClick={signInWithGoogle}
                                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-4 hover:bg-gray-50 active:scale-95 transition-all font-bold text-adorix-dark bg-white shadow-sm"
                            >
                                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            <p className="text-center text-sm font-medium text-gray-400 mt-10">
                                Don't have an account?{' '}
                                <Link href="/signup" className="text-adorix-primary font-bold hover:underline decoration-2">Sign up</Link>
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
                                Enter the magic code we sent to <br />
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
                                onClick={() => setVerifying(false)}
                                className="mt-8 text-sm font-bold text-gray-400 hover:text-adorix-primary transition-colors"
                            >
                                Use a different email
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default function Login() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-adorix-primary" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
