import React from 'react';
import { motion } from 'framer-motion';
import {
    Mail, MessageSquare, Phone, MapPin,
    Send, Globe, Github, Twitter, Linkedin,
    ArrowRight, Sparkles, Zap
} from 'lucide-react';

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
    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-[#FDFEFF] relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-adorix-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-adorix-accent/5 rounded-full blur-[120px] -ml-64 -mb-64" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-adorix-dark mb-8 tracking-tighter"
                    >
                        Let's build the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent">
                            Future together.
                        </span>
                    </motion.h1>
                </div>


                <div className="max-w-3xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-2xl shadow-adorix-dark/5"
                    >
                        <h2 className="text-3xl font-black text-adorix-dark mb-8 flex items-center gap-3">
                            <Zap className="w-8 h-8 text-adorix-primary" /> Send Message
                        </h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Alex Morgan"
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="alex@example.com"
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Subject</label>
                                <select className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark appearance-none">
                                    <option>General Inquiry</option>
                                    <option>Technical Support</option>
                                    <option>Partnership Proposal</option>
                                    <option>Press & Media</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Tell us about your project..."
                                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark resize-none"
                                />
                            </div>
                            <button className="w-full py-5 bg-adorix-dark text-white rounded-2xl font-black text-lg shadow-xl shadow-adorix-dark/20 hover:bg-adorix-primary transition-all flex items-center justify-center gap-3 group active:scale-[0.98]">
                                Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
