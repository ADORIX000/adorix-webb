import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail, MessageSquare, Phone, MapPin,
    Send, Globe, Github, Twitter, Linkedin,
    ArrowRight, Sparkles
} from 'lucide-react';
import TypingText from '../../components/home/TypingText';

const ContactCard = ({ icon: Icon, title, detail, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-gray-100 hover:border-adorix-primary/30 transition-all duration-500 group shadow-xl shadow-adorix-dark/5"
    >
        <div className="w-14 h-14 bg-adorix-primary/10 rounded-2xl flex items-center justify-center text-adorix-primary mb-6 group-hover:scale-110 group-hover:bg-adorix-primary group-hover:text-white transition-all duration-500">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-black text-adorix-dark mb-2">{title}</h3>
        <p className="text-gray-500 font-medium mb-4">{detail}</p>
        <button className="text-sm font-black text-adorix-primary hover:text-adorix-dark transition-colors flex items-center gap-2 uppercase tracking-widest">
            Connect <ArrowRight className="w-4 h-4" />
        </button>
    </motion.div>
);

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
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            console.error("Email submission error:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
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

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 relative z-10">
                    <ContactCard icon={Mail} title="Email Us" detail="info@adorixit.com" delay={0.2} />
                    <ContactCard icon={MessageSquare} title="Live Chat" detail="Available 24/7" delay={0.3} />
                    <ContactCard icon={MapPin} title="Visit Us" detail="Adorix Headquarters" delay={0.4} />
                </div>

                <div className="max-w-3xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/30 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/20 shadow-2xl shadow-adorix-dark/5"
                    >
                        <h2 className="text-3xl font-black text-adorix-dark mb-8">
                            Send Message
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
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
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
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
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Subject</label>
                                <select 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark appearance-none"
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
                                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark resize-none"
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={status === 'sending' || status === 'success'}
                                className="w-full py-5 bg-adorix-dark text-white rounded-2xl font-black text-lg shadow-xl shadow-adorix-dark/20 hover:bg-adorix-primary transition-all flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? (
                                    <>Sending... <Sparkles className="w-5 h-5 animate-pulse" /></>
                                ) : status === 'success' ? (
                                    'Email Received! Form Done.'
                                ) : status === 'error' ? (
                                    'Failed to Send. Try Again.'
                                ) : (
                                    <>Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
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