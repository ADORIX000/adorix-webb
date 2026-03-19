"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function ForgotPasswordPage() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const router = useRouter();

    // Request a password reset code to the specified email
    const handleRequestCode = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;
        setLoading(true);
        setError("");

        try {
            await signIn.create({
                strategy: "reset_password_email_code",
                identifier: emailAddress,
            });
            setSuccessfulCreation(true);
            setSuccessMsg("Check your email for the reset code.");
        } catch (err) {
            setError(err.errors?.[0]?.longMessage || "Failed to send reset code.");
        } finally {
            setLoading(false);
        }
    };

    // Reset password using the code
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;
        setLoading(true);
        setError("");

        try {
            const result = await signIn.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/");
            } else {
                console.log("Needs further actions", result);
                setError("Unable to reset password automatically.");
            }
        } catch (err) {
            setError(err.errors?.[0]?.longMessage || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    // Successful email sent UI state
    if (successfulCreation) {
        return (
            <div className="flex items-center justify-center px-4 py-20 min-h-screen">
                <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-gray-100 p-8">
                    <div className="mb-6">
                        <h1 className="text-[22px] font-bold text-[#1F2B2D] tracking-tight text-center">
                            New Password
                        </h1>
                        <p className="text-sm text-gray-400 font-normal mt-0.5 text-center">
                            A reset code was sent to <b>{emailAddress}</b>.
                        </p>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-4 text-xs text-red-500 text-center bg-red-50 p-2 rounded-lg border border-red-100">
                                {error}
                            </motion.div>
                        )}
                        {successMsg && !error && (
                            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-4 text-xs text-green-600 text-center bg-green-50 p-2 rounded-lg border border-green-100">
                                {successMsg}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Reset Code (e.g. 123456)"
                                className="w-full h-11 px-4 bg-white border border-gray-200 rounded-md text-sm text-[#1F2B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D8A9E]/30 focus:border-[#0D8A9E] transition-all"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="New Password"
                                    className="w-full h-11 px-4 pr-12 bg-white border border-gray-200 rounded-md text-sm text-[#1F2B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D8A9E]/30 focus:border-[#0D8A9E] transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1F2B2D] transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-10 bg-[#0D8A9E] hover:bg-[#0a7a8d] active:bg-[#085a66] text-white text-sm font-semibold rounded-lg transition-all duration-150 shadow-none mt-2 flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                "Save Password & Sign in"
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col items-center justify-center gap-4">
                        <Link href="/login" className="text-sm font-semibold text-[#0D8A9E] hover:text-[#085a66]">
                            Return to sign in
                        </Link>

                        <div className="text-center w-full bg-gray-50/50 py-3 rounded-xl border border-gray-50 mt-1">
                            <div className="flex items-center justify-center gap-1.5">
                                <span className="text-[11px] text-gray-500 font-medium">Secured by</span>
                                <span className="text-xs text-[#1F2B2D] font-bold tracking-tight">clerk</span>
                            </div>
                            <p className="text-[11px] text-[#E87B35] font-semibold mt-1">Development mode</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Initial Email Page
    return (
        <div className="flex items-center justify-center px-4 py-20 min-h-screen">
            <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-gray-100 p-8">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-[22px] font-bold text-[#1F2B2D] tracking-tight text-center">
                        Forgot Password
                    </h1>
                    <p className="text-sm text-gray-400 font-normal mt-0.5 text-center">
                        Enter your email to receive the reset code.
                    </p>
                </div>

                {/* Server Error */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="mb-4 text-xs text-red-500 text-center bg-red-50 p-2 rounded-lg border border-red-100"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleRequestCode}>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            placeholder="Email address"
                            className="w-full h-11 px-4 bg-white border border-gray-200 rounded-md text-sm text-[#1F2B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D8A9E]/30 focus:border-[#0D8A9E] transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !isLoaded}
                        className="w-full h-10 bg-[#0D8A9E] hover:bg-[#0a7a8d] active:bg-[#085a66] text-white text-sm font-semibold rounded-lg transition-all duration-150 shadow-none mt-2 flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Send the Code"
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col items-center justify-center gap-4">
                    <Link href="/login" className="text-sm font-semibold text-[#0D8A9E] hover:text-[#085a66]">
                        Back to sign in
                    </Link>

                    <div className="text-center w-full bg-gray-50/50 py-3 rounded-xl border border-gray-50 mt-1">
                        <div className="flex items-center justify-center gap-1.5">
                            <span className="text-[11px] text-gray-500 font-medium">Secured by</span>
                            <span className="text-xs text-[#1F2B2D] font-bold tracking-tight">clerk</span>
                        </div>
                        <p className="text-[11px] text-[#E87B35] font-semibold mt-1">Development mode</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
