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
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-2 bg-adorix-primary/10 text-adorix-primary rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block"
                    >
                        Get In Touch
                    </motion.span>
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
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        Whether you're a potential partner, a customer, or just curious about AI vision, we'd love to hear from you.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
                    <ContactCard
                        icon={Mail}
                        title="Email Us"
                        detail="hello@adorix.ai"
                        delay={0.1}
                    />
                    <ContactCard
                        icon={MessageSquare}
                        title="Live Chat"
                        detail="Available 24/7 for partners"
                        delay={0.2}
                    />
                    <ContactCard
                        icon={Globe}
                        title="Global Sales"
                        detail="sales@adorix.ai"
                        delay={0.3}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
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

                    {/* Location & Socials */}
                    <div className="space-y-12 h-full flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-black text-adorix-dark mb-8">Our Presence</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-adorix-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-adorix-dark text-lg uppercase tracking-tight">Innovation Hub</h4>
                                        <p className="text-gray-500 font-medium">128 Technology Drive, Silicon Valley, CA</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-adorix-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-adorix-dark text-lg uppercase tracking-tight">Connect Direct</h4>
                                        <p className="text-gray-500 font-medium">+1 (555) 000-ADORIX</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="p-10 bg-adorix-dark rounded-[3rem] text-white relative overflow-hidden group"
                        >
                            <h3 className="text-2xl font-black mb-6 relative z-10">Follow the Revolution</h3>
                            <div className="flex gap-4 relative z-10">
                                {[Twitter, Github, Linkedin].map((Icon, i) => (
                                    <button key={i} className="w-12 h-12 bg-white/10 hover:bg-adorix-primary rounded-xl flex items-center justify-center transition-all">
                                        <Icon className="w-6 h-6" />
                                    </button>
                                ))}
                            </div>
                            <Sparkles className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
