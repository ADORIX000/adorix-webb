'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';
import {
    User, Settings, CreditCard, Shield, Bell, Activity, Camera, Mail, Phone,
    MapPin, Briefcase, Calendar, TrendingUp, Zap, Download,
    FileKey, Trash2, RefreshCcw, Upload, Plus, Lock, Eye, EyeOff, ChevronRight, BadgeCheck, LogOut as LogOutIcon, Key,
    Link as LinkIcon, Linkedin, Twitter, MessageSquare, AlertTriangle, Loader2, Check, Globe, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = () => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [coverImage, setCoverImage] = useState(null);
    
    // Password state
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [passwordError, setPasswordError] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Account Info State
    const [accountInfo, setAccountInfo] = useState({
        fullName: '',
        phoneNumber: '',
        location: '',
        language: 'English (US)',
        company: '',
        jobTitle: '',
        website: '',
        bio: '',
        linkedin: '',
        twitter: ''
    });

    useEffect(() => {
        if (user) {
            setAccountInfo({
                fullName: user.fullName || '',
                phoneNumber: user.unsafeMetadata?.phoneNumber || '',
                location: user.unsafeMetadata?.location || '',
                language: user.unsafeMetadata?.language || 'English (US)',
                company: user.unsafeMetadata?.company || '',
                jobTitle: user.unsafeMetadata?.jobTitle || '',
                website: user.unsafeMetadata?.website || '',
                bio: user.unsafeMetadata?.bio || '',
                linkedin: user.unsafeMetadata?.linkedin || '',
                twitter: user.unsafeMetadata?.twitter || ''
            });
        }
    }, [user]);

    const handleSaveAccountInfo = async () => {
        try {
            setIsSaving(true);
            const parts = accountInfo.fullName.trim().split(' ');
            const firstName = parts[0] || '';
            const lastName = parts.slice(1).join(' ') || '';
            
            await user.update({
                firstName,
                lastName,
                unsafeMetadata: {
                    phoneNumber: accountInfo.phoneNumber,
                    location: accountInfo.location,
                    language: accountInfo.language,
                    company: accountInfo.company,
                    jobTitle: accountInfo.jobTitle,
                    website: accountInfo.website,
                    bio: accountInfo.bio,
                    linkedin: accountInfo.linkedin,
                    twitter: accountInfo.twitter
                }
            });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error('Error updating account info:', error);
        } finally {
            setIsSaving(false);
        }
    };

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

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');
        
        if (passwords.new !== passwords.confirm) {
            setPasswordError("New passwords don't match");
            return;
        }

        if (passwords.new.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return;
        }

        if (user?.passwordEnabled && !passwords.current) {
            setPasswordError("Current password is required");
            return;
        }

        try {
            setIsChangingPassword(true);
            const payload = { newPassword: passwords.new };
            if (user?.passwordEnabled && passwords.current) {
                payload.currentPassword = passwords.current;
            }
            
            await user.updatePassword(payload);
            setShowToast(true);
            setPasswords({ current: '', new: '', confirm: '' });
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordError(error.errors?.[0]?.longMessage || error.message || "Failed to update password. Please check your current password.");
        } finally {
            setIsChangingPassword(false);
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
                                        {user?.hasImage ? (
                                            <img
                                                src={user?.imageUrl}
                                                alt="Avatar"
                                                className={`w-full h-full object-cover transition-opacity ${isUploadingImage ? 'opacity-50' : 'opacity-100'}`}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-adorix-primary to-blue-600 flex items-center justify-center">
                                                <span className="text-white text-6xl font-black uppercase">
                                                    {user?.firstName?.charAt(0) || user?.fullName?.charAt(0) || '?'}
                                                </span>
                                            </div>
                                        )}

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

                    {activeTab === 'account' && (
                        <motion.div
                            key="account"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-10"
                        >
                            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-adorix-dark tracking-tight">Account Information</h2>
                                        <p className="text-gray-500 font-medium mt-1">Manage your personal and professional profile details.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                                {/* Left Column: Personal Information */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">1</span>
                                            Personal Details
                                        </h3>
                                        <div className="space-y-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 tracking-wide">Full Name</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <User className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={accountInfo.fullName}
                                                        onChange={(e) => setAccountInfo({...accountInfo, fullName: e.target.value})}
                                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 tracking-wide">Email Address</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <Mail className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        defaultValue={user?.primaryEmailAddress?.emailAddress || ''}
                                                        disabled
                                                        className="w-full pl-11 pr-4 py-3 bg-gray-100/50 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed outline-none"
                                                    />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md uppercase tracking-wider">
                                                        <Check className="w-3 h-3" /> Verified
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 tracking-wide">Phone Number</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <Phone className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        value={accountInfo.phoneNumber}
                                                        onChange={(e) => setAccountInfo({...accountInfo, phoneNumber: e.target.value})}
                                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700 tracking-wide">Location</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                            <MapPin className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={accountInfo.location}
                                                            onChange={(e) => setAccountInfo({...accountInfo, location: e.target.value})}
                                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                            placeholder="City, Country"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700 tracking-wide">Language</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                            <MessageSquare className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <select value={accountInfo.language} onChange={(e) => setAccountInfo({...accountInfo, language: e.target.value})} className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none cursor-pointer">
                                                            <option>English (US)</option>
                                                            <option>Spanish</option>
                                                            <option>French</option>
                                                            <option>German</option>
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                                            <ChevronRight className="h-4 w-4 text-gray-400 stroke-[3] rotate-90" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Professional Information */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">2</span>
                                            Professional Profile
                                        </h3>
                                        <div className="space-y-5">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700 tracking-wide">Company</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                            <Briefcase className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={accountInfo.company}
                                                            onChange={(e) => setAccountInfo({...accountInfo, company: e.target.value})}
                                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                            placeholder="Acme Corp"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700 tracking-wide">Job Title</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                            <BadgeCheck className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={accountInfo.jobTitle}
                                                            onChange={(e) => setAccountInfo({...accountInfo, jobTitle: e.target.value})}
                                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                            placeholder="Marketing Manager"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 tracking-wide">Website / Portfolio</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <Globe className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="url"
                                                        value={accountInfo.website}
                                                        onChange={(e) => setAccountInfo({...accountInfo, website: e.target.value})}
                                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                        placeholder="https://yourwebsite.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 tracking-wide">Bio / Description</label>
                                                <div className="relative">
                                                    <textarea
                                                        rows="3"
                                                        value={accountInfo.bio}
                                                        onChange={(e) => setAccountInfo({...accountInfo, bio: e.target.value})}
                                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                                        placeholder="Write a short bio about yourself and your role..."
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 tracking-wide">Social Links</label>
                                                <div className="flex gap-3">
                                                    <div className="relative flex-1">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Linkedin className="h-4 w-4 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={accountInfo.linkedin}
                                                            onChange={(e) => setAccountInfo({...accountInfo, linkedin: e.target.value})}
                                                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                            placeholder="LinkedIn URL"
                                                        />
                                                    </div>
                                                    <div className="relative flex-1">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Twitter className="h-4 w-4 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={accountInfo.twitter}
                                                            onChange={(e) => setAccountInfo({...accountInfo, twitter: e.target.value})}
                                                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                            placeholder="Twitter handle"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-8 mt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-emerald-500" /> Auto-saving enabled for draft changes
                                </p>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button
                                        type="button"
                                        className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all flex-1 sm:flex-none text-center"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveAccountInfo}
                                        disabled={isSaving}
                                        className="flex items-center justify-center gap-2 px-8 py-3 bg-adorix-dark text-white rounded-xl font-black hover:bg-black transition-all shadow-lg shadow-adorix-dark/10 hover:-translate-y-0.5 flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                        {isSaving ? 'Saving...' : 'Save Profile'}
                                    </button>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="mt-12 p-6 bg-red-50/50 border border-red-100 rounded-2xl">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-red-600 font-bold text-lg flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5" /> Danger Zone
                                        </h4>
                                        <p className="text-gray-600 text-sm font-medium mt-1">Permanently delete your account and all associated data.</p>
                                    </div>
                                    <button className="px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl font-bold flex items-center gap-2 shadow-sm hover:bg-red-50 transition-colors whitespace-nowrap">
                                        <Trash2 className="w-4 h-4" /> Delete Account
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'password' && (
                        <motion.div
                            key="password"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm max-w-2xl mx-auto"
                        >
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-adorix-dark tracking-tight">Security Settings</h2>
                                    <p className="text-gray-500 font-medium mt-1">Ensure your account is using a long, random password to stay secure.</p>
                                </div>
                            </div>

                            <form onSubmit={handlePasswordChange} className="space-y-6">
                                {passwordError && (
                                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" /> {passwordError}
                                    </div>
                                )}

                                {user?.passwordEnabled !== true && (
                                    <div className="p-4 bg-blue-50/50 border border-blue-100 text-blue-700 rounded-xl text-sm font-medium flex gap-3">
                                        <Shield className="w-5 h-5 text-blue-500 shrink-0" />
                                        You currently sign in using a social account or email link. Set a password below to also be able to sign in with your email and a password.
                                    </div>
                                )}

                                {user?.passwordEnabled === true && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 tracking-wide">Current Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={passwords.current}
                                                onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                                                className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                placeholder="••••••••"
                                                required={!!user?.passwordEnabled}
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 tracking-wide">New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Key className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={passwords.new}
                                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                            className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 tracking-wide">Confirm New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Check className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                            className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 font-medium mt-2 flex items-center gap-1">
                                        <Shield className="w-3 h-3 text-emerald-500" /> Password must be at least 8 characters long.
                                    </p>
                                </div>

                                <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={Boolean(isChangingPassword || (user?.passwordEnabled === true && !passwords.current) || !passwords.new || !passwords.confirm)}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-adorix-dark text-white rounded-xl font-black hover:bg-black transition-all shadow-lg shadow-adorix-dark/10 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                    >
                                        {isChangingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
                                        {isChangingPassword ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {activeTab === 'billing' && (
                        <motion.div
                            key="billing"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-adorix-dark tracking-tight">Billing & Plans</h2>
                                        <p className="text-gray-500 font-medium mt-1">Manage your subscription, payment methods, and billing history.</p>
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-2xl p-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:bg-blue-500/10"></div>
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full -ml-32 -mb-32 blur-3xl transition-all group-hover:bg-emerald-500/10"></div>
                                    
                                    <div className="flex flex-col md:flex-row gap-12 relative z-10">
                                        {/* Left Side: Current Plan */}
                                        <div className="flex-1 space-y-4">
                                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Current Plan</h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black text-adorix-dark tracking-tight">Pro Plan</span>
                                                <span className="text-gray-500 font-medium">- $49/mo</span>
                                            </div>
                                            <p className="text-gray-600 text-sm font-medium">
                                                Includes up to 5 team members, 100GB storage, and priority support.
                                            </p>
                                        </div>

                                        {/* Right Side: Payment Method */}
                                        <div className="flex-1 space-y-4 md:border-l md:border-gray-100 md:pl-12">
                                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Payment Method</h3>
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-11 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                                                    <span className="font-black text-blue-900 italic tracking-tighter text-lg">VISA</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 tracking-wide">Visa ending in <span className="font-black">1234</span></p>
                                                    <p className="text-sm text-gray-500 font-medium mt-0.5">Expires 12/28</p>
                                                </div>
                                            </div>
                                            <div className="pt-2">
                                                <p className="text-sm text-gray-500 font-medium">Next bill: <span className="font-bold text-gray-800">April 15, 2026</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                                        <button className="px-6 py-2.5 bg-gray-50 text-gray-700 border border-gray-200 hover:bg-white hover:border-gray-300 rounded-xl font-bold transition-all text-sm w-full md:w-auto shadow-sm hover:shadow-md">
                                            Change Plan
                                        </button>
                                        <button className="text-adorix-dark hover:text-black hover:bg-gray-50 px-6 py-2.5 rounded-xl font-bold text-sm transition-all border border-gray-200 hover:border-gray-300 w-full sm:w-auto shadow-sm">
                                            Update Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Success Toast */}
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            className="fixed bottom-8 right-8 bg-gray-900 border border-gray-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 font-medium"
                        >
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <Check className="w-5 h-5" />
                            </div>
                            Account settings updated successfully!
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProfilePage;
