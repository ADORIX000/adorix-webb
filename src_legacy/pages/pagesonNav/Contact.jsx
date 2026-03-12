import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Globe, Github, Twitter, Linkedin,
    ArrowRight, Sparkles, CheckCircle2, AlertCircle
} from 'lucide-react';
import TypingText from '../../components/home/TypingText';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [status, setStatus] = useState('idle');

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
            const response = await fetch("https://formsubmit.co/ajax/info@adorixit.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    _subject: `New Contact Form Submission: ${formData.subject}`,
                    _template: "table"
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    subject: 'General Inquiry',
                    message: ''
                });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 6000);
            }
        } catch (error) {
            console.error("Email submission error:", error);
            setStatus('error');
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
                    {/* Decorative Ambient Blob Behind Form */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full md:w-[120%] md:h-[120%] bg-gradient-to-tr from-adorix-accent/20 via-adorix-primary/10 to-transparent blur-[80px] rounded-full -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/10 backdrop-blur-3xl rounded-[3rem] p-8 md:p-12 border border-white/20 shadow-2xl relative overflow-hidden"
                    >
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
                                        <p>Failed to send email due to a network or service issue. Please check your connection and try again later.</p>
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
                                        className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white/20 transition-all font-semibold text-adorix-dark placeholder-gray-500"
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
                                        className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white/20 transition-all font-semibold text-adorix-dark placeholder-gray-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Subject</label>
                                <select 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white/20 transition-all font-semibold text-adorix-dark appearance-none cursor-pointer"
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
                                    className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white/20 transition-all font-semibold text-adorix-dark resize-none placeholder-gray-500"
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={status === 'sending' || status === 'success'}
                                className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-90 disabled:cursor-not-allowed ${
                                    status === 'success' 
                                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                                        : 'bg-adorix-dark hover:bg-black text-white'
                                }`}
                            >
                                {status === 'sending' ? (
                                    <>Sending <Sparkles className="w-5 h-5 animate-pulse ml-2" /></>
                                ) : status === 'success' ? (
                                    <><CheckCircle2 className="w-6 h-6" /> Message Received!</>
                                ) : status === 'error' ? (
                                    'Failed to Send. Try Again.'
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