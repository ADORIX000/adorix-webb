'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';
import {
    User, Settings, CreditCard, Shield, Bell, Activity, Camera, Mail, Phone,
    MapPin, Briefcase, Calendar, TrendingUp, Zap, Download,
    Copy, Check, Edit2, Save, X, Loader2, Sparkles, Globe, Terminal,
    FileKey, Trash2, RefreshCcw, Upload, Plus, Lock, Eye, EyeOff, ChevronRight, BadgeCheck, LogOut as LogOutIcon, Database,
    PlayCircle, Timer, MousePointer2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = () => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: ''
    });
    const [emailData, setEmailData] = useState({
        email: '',
        twoStepEnabled: false
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || ''
            });
            setEmailData({
                email: user.primaryEmailAddress?.emailAddress || '',
                twoStepEnabled: user.twoFactorEnabled || false
            });
        }
    }, [user]);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            // Update Basic Profile Info (First/Last Name)
            await user.update({
                firstName: formData.firstName,
                lastName: formData.lastName,
            });

            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Profile update failed:", error);
            alert(error.errors?.[0]?.message || "Failed to update profile. Please ensure all fields are valid.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveEmailSettings = async () => {
        setIsSaving(true);
        try {
            // Logic for updating email/2FA would go here
            // Note: Clerk handles email changes via their specific flow
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setIsEmailModalOpen(false);
        } catch (error) {
            console.error("Email update failed:", error);
            alert("Failed to update email settings.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDiscard = () => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || ''
            });
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isLoaded && !user) {
            // Handle not signed in if needed, middleware should handle it
        }
    }, [isLoaded, user]);

    const handleCopyApiKey = () => {
        navigator.clipboard.writeText('adorix_sk_live_1234567890abcdef');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Activity },
        { id: 'account', label: 'Account Info', icon: User },
        { id: 'password', label: 'Password', icon: Lock },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];

    const stats = [
        { label: 'Ad Play Time', value: '1,420', change: 'Total Plays', icon: PlayCircle, color: 'blue' },
        { label: 'Average Time', value: '42s', change: 'Per Session', icon: Timer, color: 'emerald' },
        { label: 'Engagement', value: '92%', change: 'High Performance', icon: MousePointer2, color: 'purple' },
    ];

    if (!isLoaded) return null;

    return (
        <div className="pt-28 px-6 pb-20 min-h-screen bg-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="relative mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative bg-white rounded-[2rem] shadow-xl shadow-adorix-dark/5 border border-gray-100 z-10 overflow-visible"
                    >
                        <div className="h-44 bg-adorix-dark relative overflow-hidden group rounded-t-[2rem]">
                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 0)', backgroundSize: '16px 16px' }}></div>

                            {/* Top Right Action */}
                            <button className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10 rounded-xl transition-all text-white flex items-center justify-center group z-20" title="Change Cover">
                                <Upload className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                            </button>
                        </div>

                        <div className="px-10 pb-10">
                            <div className="flex flex-col md:flex-row items-end gap-6 -mt-16 relative z-10">
                                <div className="w-40 h-40 rounded-full bg-white p-1.5 shadow-2xl flex-shrink-0 relative">
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-adorix-primary/20 to-purple-500/20 flex items-center justify-center overflow-hidden border-4 border-white shadow-inner">
                                        <img
                                            src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.fullName}&background=F3F4F6&color=374151&size=200`}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 pb-2 mb-2 text-center md:text-left">
                                    <h1 className="text-4xl font-black text-adorix-dark tracking-tight mb-1">
                                        {user?.fullName}
                                    </h1>
                                    <p className="text-gray-400 font-bold text-sm flex items-center gap-4 flex-wrap justify-center md:justify-start">
                                        <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user?.primaryEmailAddress?.emailAddress}</span>
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Loading...'}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Right Floating Pencil - Completely decoupled for overflow safety */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="absolute top-44 -translate-y-1/2 right-10 w-14 h-14 bg-white text-adorix-dark rounded-full hover:bg-adorix-light transition-all flex items-center justify-center shadow-2xl border border-gray-100 z-[60] group hover:scale-110 active:scale-95"
                        title="Edit Profile"
                    >
                        <Edit2 className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Analytics Column */}
                    <div className="lg:col-span-4">
                        <div className="flex items-baseline justify-between mb-10 px-2">
                            <h2 className="text-2xl font-black text-adorix-dark tracking-tight">Analytics</h2>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:block">Performance Hub</p>
                        </div>

                        <div className="space-y-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    {stats.map((stat, i) => (
                                        <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all group hover:shadow-xl hover:shadow-adorix-dark/5">
                                            <div className="flex items-center gap-6">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                                    stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                                        stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                                            'bg-orange-50 text-orange-600'}`}>
                                                    <stat.icon className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-400 font-black text-[11px] uppercase tracking-widest mb-1">{stat.label}</p>
                                                    <h3 className="text-3xl font-black text-adorix-dark tracking-tighter">{stat.value}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Settings Column */}
                    <div className="lg:col-span-8">
                        <div className="flex items-baseline justify-between mb-10 px-2">
                            <h2 className="text-2xl font-black text-adorix-dark tracking-tight">Settings</h2>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:block">Configuration Hub</p>
                        </div>

                        <div id="settings" className="space-y-10 scroll-mt-24">
                            {[
                                {
                                    title: 'Account Settings',
                                    icon: User,
                                    items: [
                                        { label: 'Profile Information', sub: 'Edit your name and profile photo', icon: User, onClick: () => setIsModalOpen(true) },
                                        { label: 'Email Management', sub: user?.primaryEmailAddress?.emailAddress, icon: Mail, onClick: () => setIsEmailModalOpen(true) },
                                    ]
                                },
                                {
                                    title: 'System Preferences',
                                    icon: Settings,
                                    items: [
                                        { label: 'Smart Notifications', sub: 'Choose what updates you want to receive', icon: Bell },
                                        { label: 'Interface Appearance', sub: 'Switch between light and dark mode', icon: Zap },
                                        { label: 'Global Language', sub: 'English (United Kingdom)', icon: Globe },
                                    ]
                                },
                                {
                                    title: 'Security & Privacy',
                                    icon: Shield,
                                    items: [
                                        { label: 'Access Control', sub: 'Manage your credentials and 2FA', icon: Lock },
                                        { label: 'Privacy Protocol', sub: 'Hide sensitive data from dashboard', icon: Eye },
                                        { label: 'Data Governance', sub: 'Export or delete your account data', icon: Database },
                                    ]
                                }
                            ].map((section, idx) => (
                                <motion.section
                                    key={section.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-adorix-dark/5 overflow-hidden">
                                        <div className="px-8 py-4 bg-gray-50/50 border-b border-gray-50 flex items-center gap-3">
                                            <section.icon className="w-4 h-4 text-gray-400" />
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{section.title}</span>
                                        </div>
                                        {section.items.map((item, i) => (
                                            <div
                                                key={item.label}
                                                onClick={item.onClick}
                                                className={`flex items-center justify-between p-6 ${i !== section.items.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50/50 transition-colors group cursor-pointer`}
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-adorix-dark group-hover:bg-adorix-light transition-all group-hover:scale-110">
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-adorix-dark group-hover:text-adorix-primary transition-colors text-sm">{item.label}</h3>
                                                        <p className="text-xs text-gray-400 font-medium">{item.sub}</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-adorix-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                        ))}
                                    </div>
                                </motion.section>
                            ))}

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={() => signOut()}
                                className="w-full p-6 bg-red-50 text-red-600 rounded-[2rem] font-black flex items-center justify-between hover:bg-red-100 transition-all group border border-red-100/50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                        <LogOutIcon className="w-5 h-5 text-red-500" />
                                    </div>
                                    <span className="text-sm">Sign Out of Adorix</span>
                                </div>
                                <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={handleDiscard}
                                className="absolute inset-0 bg-adorix-dark/40 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
                            >
                                <div className="p-8 pb-4 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-20">
                                    <div>
                                        <h2 className="text-2xl font-black text-adorix-dark tracking-tight">Edit Profile</h2>
                                        <p className="text-sm text-gray-500 font-medium">Refine your personal presence on Adorix</p>
                                    </div>
                                    <button onClick={handleDiscard} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-adorix-dark">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-8 overflow-y-auto custom-scrollbar space-y-7">
                                    {/* Name Section */}
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] px-1 ml-0.5">First Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-adorix-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    className="w-full pl-11 pr-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-adorix-primary/10 focus:border-adorix-primary outline-none transition-all font-bold text-adorix-dark text-sm placeholder:text-gray-300 placeholder:font-medium"
                                                    placeholder="First Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] px-1 ml-0.5">Last Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-adorix-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    className="w-full pl-11 pr-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-adorix-primary/10 focus:border-adorix-primary outline-none transition-all font-bold text-adorix-dark text-sm placeholder:text-gray-300 placeholder:font-medium"
                                                    placeholder="Last Name"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email Section (ReadOnly) */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] px-1 ml-0.5">Verified Email</label>
                                        <div className="w-full pl-4 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl font-bold text-gray-400 flex items-center gap-3 cursor-not-allowed shadow-sm border-dashed">
                                            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                                                <Mail className="w-4 h-4 text-gray-300" />
                                            </div>
                                            <span className="text-sm">{user?.primaryEmailAddress?.emailAddress}</span>
                                            <div className="ml-auto flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                                                <BadgeCheck className="w-3 h-3" /> Verified
                                            </div>
                                        </div>
                                        <p className="text-[9px] text-gray-400 font-bold px-2 italic uppercase tracking-wider">Managed via global account settings</p>
                                    </div>

                                </div>

                                {/* Actions */}
                                <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center gap-4">
                                    <button
                                        onClick={handleDiscard}
                                        className="px-6 py-3.5 text-gray-500 font-black text-sm uppercase tracking-widest hover:text-adorix-dark transition-colors"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={isSaving}
                                        className="ml-auto flex-1 max-w-[200px] px-8 py-3.5 bg-adorix-dark text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-adorix-dark/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100 shadow-xl shadow-adorix-dark/10"
                                    >
                                        {isSaving ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Save Profile
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isEmailModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsEmailModalOpen(false)}
                                className="absolute inset-0 bg-adorix-dark/40 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
                            >
                                <div className="p-8 pb-4 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-20">
                                    <div>
                                        <h2 className="text-2xl font-black text-adorix-dark tracking-tight">Email Management</h2>
                                        <p className="text-sm text-gray-500 font-medium">Secure and update your primary email</p>
                                    </div>
                                    <button onClick={() => setIsEmailModalOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-adorix-dark">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                                    {/* 2FA Toggle */}
                                    <div className="flex items-center justify-between p-6 bg-adorix-dark rounded-3xl text-white shadow-xl shadow-adorix-dark/20">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                                <Shield className="w-6 h-6 text-adorix-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm">Two-Step Verification</h3>
                                                <p className="text-[10px] text-white/50 font-black uppercase tracking-widest">Enhanced Security</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setEmailData({ ...emailData, twoStepEnabled: !emailData.twoStepEnabled })}
                                            className={`w-14 h-8 rounded-full transition-all relative ${emailData.twoStepEnabled ? 'bg-adorix-primary' : 'bg-white/10'}`}
                                        >
                                            <motion.div
                                                animate={{ x: emailData.twoStepEnabled ? 28 : 4 }}
                                                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm"
                                            />
                                        </button>
                                    </div>

                                    {/* Email Input Section */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] px-1 ml-0.5">Change Email Account</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-adorix-primary transition-colors" />
                                                <input
                                                    type="email"
                                                    value={emailData.email}
                                                    onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                                                    className="w-full pl-11 pr-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-adorix-primary focus:ring-4 focus:ring-adorix-primary/5 outline-none transition-all font-bold text-adorix-dark text-sm"
                                                    placeholder="Enter new email address"
                                                />
                                            </div>
                                        </div>
                                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex items-start gap-3">
                                            <Sparkles className="w-4 h-4 text-blue-500 mt-0.5" />
                                            <p className="text-[10px] text-blue-600 font-bold leading-relaxed">Changing your email will require a verification link to be sent to your new address for security synchronization.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center gap-4">
                                    <button
                                        onClick={() => setIsEmailModalOpen(false)}
                                        className="px-6 py-3.5 text-gray-500 font-black text-sm uppercase tracking-widest hover:text-adorix-dark transition-colors"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        onClick={handleSaveEmailSettings}
                                        disabled={isSaving}
                                        className="ml-auto flex-1 max-w-[200px] px-8 py-3.5 bg-adorix-dark text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-adorix-dark/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-adorix-dark/10"
                                    >
                                        {isSaving ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Save Verification
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] bg-adorix-dark text-white px-8 py-4 rounded-2xl font-black shadow-2xl flex items-center gap-4 border border-white/10"
                        >
                            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center overflow-hidden">
                                <Check className="w-5 h-5 text-white" />
                            </div>
                            <span className="tracking-tight">Settings Synchronized!</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div >
        </div >
    );
};

export default ProfilePage;
