'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Sparkles, CheckCircle2, AlertCircle
} from 'lucide-react';
import TypingText from '@/components/home/TypingText';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                let msg = 'An unexpected error occurred. Please try again.';
                
                switch (errorData.error) {
                    case 'INVALID_EMAIL':
                        msg = 'Invalid Email: Please enter a valid email address.';
                        break;
                    case 'INVALID_INPUT':
                        msg = 'Invalid Input: Please ensure all fields are correctly filled.';
                        break;
                    case 'EMAIL_SERVICE_DOWN':
                        msg = 'Service Error: Our email provider (Zoho) is temporarily unreachable.';
                        break;
                    case 'SERVER_ERROR':
                        msg = 'Server Error: Something went wrong on our end. Please try again later.';
                        break;
                    default:
                        msg = errorData.message || msg;
                }
                throw new Error(msg);
            }
            
            setStatus('success');
            setErrorMessage('');
            setFormData({
                name: '',
                email: '',
                subject: 'General Inquiry',
                message: ''
            });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error("Email submission error:", error);
            setStatus('error');
            setErrorMessage(error.message || 'Network Issue: Please check your internet connection.');
            setTimeout(() => setStatus('idle'), 6000);
        }
    };

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-adorix-dark mb-8 tracking-tighter"
                    >
                        <TypingText text="Let's build the" speed={0.05} /> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent">
                            <TypingText text="Future together." startDelay={1} speed={0.05} />
                        </span>
                    </motion.h1>
                </div>

                <div className="max-w-3xl mx-auto relative group">
                    {/* Decorative Ambient Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full md:w-[120%] md:h-[120%] bg-gradient-to-tr from-adorix-accent/20 via-adorix-primary/10 to-transparent blur-[80px] rounded-full -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/10 backdrop-blur-3xl rounded-[3rem] p-8 md:p-12 border border-white/20 shadow-2xl relative overflow-hidden"
                    >
                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                                    animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                                    className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/40 text-center p-8"
                                >
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: 'spring', damping: 15 }}
                                        className="bg-white rounded-full p-6 shadow-2xl shadow-adorix-primary/20 mb-6"
                                    >
                                        <CheckCircle2 className="w-16 h-16 text-adorix-primary" />
                                    </motion.div>
                                    <motion.h3 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-4xl font-black text-adorix-dark mb-4 tracking-tighter"
                                    >
                                        Message Received!
                                    </motion.h3>
                                    <motion.p 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-gray-600 font-medium text-lg leading-relaxed"
                                    >
                                        Thank you for reaching out. <br />
                                        Our team will get back to you shortly.
                                    </motion.p>
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        onClick={() => setStatus('idle')}
                                        className="mt-8 px-8 py-3 bg-adorix-primary text-white rounded-full font-bold hover:bg-adorix-secondary transition-colors shadow-lg shadow-adorix-primary/20"
                                    >
                                        Send Another
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <h2 className="text-3xl font-black text-adorix-dark mb-8">
                            Send Message
                        </h2>
                        
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <AnimatePresence>
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-700 font-medium shadow-sm"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                        <p>{errorMessage}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Alex Morgan"
                                        className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white/20 transition-all duration-300 font-semibold text-adorix-dark placeholder-gray-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="alex@example.com"
                                        className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white/20 transition-all duration-300 font-semibold text-adorix-dark placeholder-gray-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Subject</label>
                                <select 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white/20 transition-all duration-300 font-semibold text-adorix-dark appearance-none cursor-pointer"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Technical Support">Technical Support</option>
                                    <option value="Partnership Proposal">Partnership Proposal</option>
                                    <option value="Press & Media">Press & Media</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="Tell us about your project..."
                                    className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white/20 transition-all duration-300 font-semibold text-adorix-dark resize-none placeholder-gray-500"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === 'sending' || status === 'success'}
                                className="w-full py-5 rounded-2xl font-black text-lg transition-all duration-500 flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-90 disabled:cursor-not-allowed bg-adorix-primary hover:bg-adorix-secondary text-white shadow-xl shadow-adorix-primary/20"
                            >
                                {status === 'sending' ? (
                                    <>Sending <Sparkles className="w-5 h-5 animate-pulse ml-2" /></>
                                ) : (
                                    <>Send Message <Send className="w-6 h-6 ml-1 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300" /></>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

