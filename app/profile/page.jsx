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
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [coverImage, setCoverImage] = useState(null);
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    useEffect(() => {
        if (isLoaded && !user) {
            // Handle not signed in if needed, middleware should handle it
        }
    }, [isLoaded, user]);

    useEffect(() => {
        // Load cover image from local storage on mount
        if (typeof window !== 'undefined') {
            const savedCover = localStorage.getItem('adorix_cover_image');
            if (savedCover) {
                setCoverImage(savedCover);
            }
        }
    }, []);

    const handleCopyApiKey = () => {
        navigator.clipboard.writeText('adorix_sk_live_1234567890abcdef');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsUploadingImage(true);
            await user.setProfileImage({ file });
        } catch (error) {
            console.error('Error uploading image:', error);
            // In a real app, you might show toast notification here
        } finally {
            setIsUploadingImage(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleCoverUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploadingCover(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setCoverImage(base64String);
            localStorage.setItem('adorix_cover_image', base64String);
            setIsUploadingCover(false);
            if (coverInputRef.current) {
                coverInputRef.current.value = '';
            }
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveCover = () => {
        setCoverImage(null);
        localStorage.removeItem('adorix_cover_image');
    };

    const handleRemoveProfileImage = async (e) => {
        e.stopPropagation();
        try {
            setIsUploadingImage(true);
            await user.setProfileImage({ file: null });
        } catch (error) {
            console.error('Error removing profile image:', error);
        } finally {
            setIsUploadingImage(false);
        }
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
                        {coverImage ? (
                            <img src={coverImage} alt="Cover" className="w-full h-full object-cover absolute inset-0 z-0" />
                        ) : (
                            <div className="absolute inset-0 opacity-20 z-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                        )}
                        {/* Elegant Cover Actions */}
                        <div className="absolute bottom-4 right-4 z-20 flex flex-col md:flex-row items-end md:items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <button 
                                onClick={() => !isUploadingCover && coverInputRef.current?.click()}
                                className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-800 backdrop-blur-md rounded-full text-sm font-semibold transition-all shadow-lg border border-gray-100/50 hover:scale-105"
                            >
                                {isUploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                                <span>{coverImage ? 'Change Cover' : 'Add Cover'}</span>
                            </button>
                            {coverImage && (
                                <button 
                                    onClick={handleRemoveCover}
                                    className="p-2.5 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-500 backdrop-blur-md rounded-full transition-all shadow-lg border border-gray-100/50 hover:scale-105"
                                    title="Remove Cover"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <input
                            type="file"
                            hidden
                            ref={coverInputRef}
                            accept="image/*"
                            onChange={handleCoverUpload}
                        />
                    </div>

                    <div className="px-10 pb-10">
                        <div className="flex flex-col md:flex-row items-end gap-8 -mt-16 relative z-10">
                            <div className="relative w-40 h-40 group/avatar">
                                <div className="absolute inset-0 rounded-full bg-white p-1 shadow-2xl flex-shrink-0">
                                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-gray-50 relative">
                                        <img
                                            src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.fullName}&background=0D8A9E&color=fff&size=200`}
                                            alt="Avatar"
                                            className={`w-full h-full object-cover transition-opacity ${isUploadingImage ? 'opacity-50' : 'opacity-100'}`}
                                        />

                                        {isUploadingImage && (
                                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-10 transition-opacity duration-300">
                                                <Loader2 className="w-8 h-8 text-adorix-dark animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Floating Action Buttons for Profile Picture */}
                                <div className="absolute bottom-1 -right-2 flex flex-col gap-2 z-20 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 translate-x-2 group-hover/avatar:translate-x-0">
                                    <button
                                        onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                                        className="p-2.5 bg-white text-gray-700 hover:text-adorix-dark hover:bg-gray-50 rounded-full shadow-xl border border-gray-100/80 transition-transform hover:scale-110 flex items-center justify-center group/btn"
                                        title="Update Profile Picture"
                                    >
                                        <Camera className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                                    </button>
                                    {user?.hasImage && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleRemoveProfileImage(e); }}
                                            className="p-2.5 bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full shadow-xl border border-gray-100/80 transition-transform hover:scale-110 flex items-center justify-center group/btn"
                                            title="Remove Profile Picture"
                                        >
                                            <Trash2 className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    hidden
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
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
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProfilePage;
