'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';
import {
    User, Settings, CreditCard, Shield, Bell, Activity, Camera, Mail, Phone,
    MapPin, Briefcase, Calendar, TrendingUp, Zap, Download,
    Copy, Check, Edit2, Save, X, Loader2, Sparkles, Globe, Terminal,
    FileKey, Trash2, RefreshCcw, Upload, Plus, Lock, Eye, EyeOff, ChevronRight, BadgeCheck, LogOut as LogOutIcon
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
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setIsUploadingImage(true);
            await user.setProfileImage({ file });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setIsUploadingImage(false);
        }
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
        { label: 'Active Campaigns', value: '12', change: '+3 this month', icon: Zap, color: 'blue' },
        { label: 'Total Devices', value: '5', change: '2 online now', icon: Activity, color: 'emerald' },
        { label: 'Engagement Rate', value: '84%', change: '+12% vs last month', icon: TrendingUp, color: 'purple' },
        { label: 'Total Spend', value: '$4,250', change: '75% of budget', icon: CreditCard, color: 'orange' },
    ];

    if (!isLoaded) return null;

    return (
        <div className="pt-28 px-6 pb-20 min-h-screen bg-transparent">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-white rounded-[2rem] mb-8 shadow-xl shadow-adorix-dark/5 border border-gray-100 z-10"
                >
                    <div className="h-44 bg-gradient-to-r from-adorix-dark via-gray-900 to-adorix-dark relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                    </div>

                    <div className="px-10 pb-10">
                        <div className="flex flex-col md:flex-row items-end gap-8 -mt-16 relative z-10">
                            <div className="w-40 h-40 rounded-full bg-white p-1 shadow-2xl flex-shrink-0 group/avatar relative">
                                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-gray-50 relative">
                                    {isUploadingImage ? (
                                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                                            <Loader2 className="w-8 h-8 animate-spin text-adorix-primary" />
                                        </div>
                                    ) : (
                                        <div 
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute inset-0 bg-black/0 group-hover/avatar:bg-black/20 flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover/avatar:opacity-100 z-10"
                                        >
                                            <Camera className="w-8 h-8 text-white" />
                                        </div>
                                    )}
                                    <img
                                        src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.fullName}&background=0D8A9E&color=fff&size=200`}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                            </div>

                            <div className="flex-1 pb-2 text-center md:text-left">
                                <h1 className="text-4xl font-black text-adorix-dark tracking-tight flex items-center gap-2 justify-center md:justify-start">
                                    {user?.fullName}
                                    <BadgeCheck className="w-8 h-8 text-blue-500 fill-blue-50" />
                                </h1>
                                <p className="text-gray-500 font-medium flex items-center gap-4 flex-wrap justify-center md:justify-start">
                                    <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-adorix-primary" /> {user?.primaryEmailAddress?.emailAddress}</span>
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-purple-500" /> Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Loading...'}</span>
                                </p>
                            </div>

                            <button
                                onClick={() => signOut()}
                                className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-100 transition-all flex items-center gap-2"
                            >
                                <LogOutIcon className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-2 mb-8 border border-white shadow-sm flex gap-2 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black transition-all duration-300 relative ${activeTab === tab.id
                                ? 'bg-adorix-dark text-white shadow-xl shadow-adorix-dark/20'
                                : 'text-gray-500 hover:text-adorix-dark hover:bg-white'
                                }`}
                        >
                            <tab.icon className={`w-4 h-4`} />
                            <span className="tracking-tight">{tab.label}</span>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all group">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                            stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                                'bg-orange-50 text-orange-600'}`}>
                                        <stat.icon className="w-7 h-7" />
                                    </div>
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className="text-3xl font-black text-adorix-dark mb-2 tracking-tighter">{stat.value}</h3>
                                    <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.change}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'account' && (
                        <motion.div
                            key="account"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm"
                        >
                            <h3 className="text-2xl font-black text-adorix-dark mb-8">Account Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">First Name</label>
                                    <input 
                                        type="text" 
                                        defaultValue={user?.firstName} 
                                        className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-adorix-primary/20 rounded-2xl text-gray-900 font-bold outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Last Name</label>
                                    <input 
                                        type="text" 
                                        defaultValue={user?.lastName} 
                                        className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-adorix-primary/20 rounded-2xl text-gray-900 font-bold outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={user?.primaryEmailAddress?.emailAddress} 
                                        disabled
                                        className="w-full px-6 py-4 bg-gray-100 border border-transparent rounded-2xl text-gray-400 font-bold cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <div className="mt-10 pt-10 border-t border-gray-50 flex justify-end">
                                <button className="px-10 py-4 bg-adorix-dark text-white rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-adorix-dark/20 flex items-center gap-2">
                                    <Save className="w-5 h-5" /> Save Changes
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'password' && (
                        <motion.div
                            key="password"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm max-w-2xl"
                        >
                            <h3 className="text-2xl font-black text-adorix-dark mb-8">Security Settings</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-adorix-primary/20 rounded-2xl text-gray-900 font-bold outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-adorix-primary/20 rounded-2xl text-gray-900 font-bold outline-none transition-all" />
                                </div>
                                <button className="w-full py-4 bg-adorix-dark text-white rounded-2xl font-black hover:scale-[1.02] transition-all shadow-xl shadow-adorix-dark/20">
                                    Update Security Password
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'billing' && (
                        <motion.div
                            key="billing"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                    <div>
                                        <h3 className="text-2xl font-black text-adorix-dark">Payment Methods</h3>
                                        <p className="text-gray-500 font-medium mt-1">Manage your cards and billing details.</p>
                                    </div>
                                    <button className="px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-black hover:bg-blue-100 transition-all flex items-center gap-2">
                                        <Plus className="w-5 h-5" /> Add New Card
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-8 rounded-[2rem] border-2 border-adorix-dark bg-adorix-dark text-white shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                            <CreditCard className="w-32 h-32" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-12">
                                                <div className="w-12 h-8 bg-white/20 rounded-lg backdrop-blur-md" />
                                                <BadgeCheck className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <p className="text-xl font-black tracking-[0.2em] mb-8">•••• •••• •••• 4242</p>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Card Holder</p>
                                                    <p className="font-bold">{user?.fullName}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Expires</p>
                                                    <p className="font-bold">12/26</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-8 rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400 gap-4 hover:border-gray-200 hover:bg-gray-50/50 transition-all cursor-pointer group">
                                        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Plus className="w-8 h-8" />
                                        </div>
                                        <p className="font-black text-sm uppercase tracking-widest">Add Primary Method</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-black text-adorix-dark mb-8">Billing History</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-6 rounded-2xl hover:bg-gray-50 transition-all group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-white transition-colors">
                                                    <Download className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-adorix-dark">Invoice #ADX-2026-00{i}</p>
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">March 12, 2026</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-adorix-dark">$49.00</p>
                                                <p className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">PAID</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProfilePage;
