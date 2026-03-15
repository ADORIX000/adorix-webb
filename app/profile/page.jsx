'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';
import {
    User, Settings, CreditCard, Shield, Bell, Activity, Camera, Mail, Phone,
    MapPin, Briefcase, Calendar, TrendingUp, Zap, Download,
    Copy, Check, Edit2, Save, X, Loader2, Sparkles, Globe, Terminal,
    FileKey, Trash2, RefreshCcw, Upload, Plus, Lock, Eye, EyeOff, ChevronRight, BadgeCheck, LogOut as LogOutIcon,
    Key, Link as LinkIcon, Linkedin, Twitter, MessageSquare, AlertTriangle, PlayCircle, Timer, MousePointer2, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = () => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();

    // UI State
    const [activeTab, setActiveTab] = useState('overview');
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [copied, setCopied] = useState(false);

    // File Upload State
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [coverImage, setCoverImage] = useState(null);
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    // Form States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '' });
    const [emailData, setEmailData] = useState({ email: '', twoStepEnabled: false });

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

    // Password state
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [passwordError, setPasswordError] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Initial Data Loading
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

            // Load cover image from local storage
            if (typeof window !== 'undefined') {
                const savedCover = localStorage.getItem('adorix_cover_image');
                if (savedCover) {
                    setCoverImage(savedCover);
                }
            }
        }
    }, [user]);

    // Handlers
    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            await user.update({
                firstName: formData.firstName,
                lastName: formData.lastName,
            });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Profile update failed:", error);
            alert(error.errors?.[0]?.message || "Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

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
            setPasswordError(error.errors?.[0]?.longMessage || "Failed to update password.");
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setIsUploadingImage(true);
            await user.setProfileImage({ file });
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setIsUploadingImage(false);
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
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveCover = () => {
        setCoverImage(null);
        localStorage.removeItem('adorix_cover_image');
    };

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

                {/* Header Banner - Combined Version */}
                <div className="relative mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative bg-white rounded-[2rem] shadow-xl shadow-adorix-dark/5 border border-gray-100 z-10 overflow-visible"
                    >
                        <div className="h-44 bg-gradient-to-r from-adorix-dark via-gray-900 to-adorix-dark relative overflow-hidden group rounded-t-[2rem]">
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
                            <input type="file" hidden ref={coverInputRef} accept="image/*" onChange={handleCoverUpload} />
                        </div>

                        <div className="px-10 pb-10">
                            <div className="flex flex-col md:flex-row items-end gap-8 -mt-16 relative z-10">
                                <div className="relative w-40 h-40 group/avatar">
                                    <div className="absolute inset-0 rounded-full bg-white p-1 shadow-2xl flex-shrink-0">
                                        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-gray-50 relative">
                                            {user?.hasImage ? (
                                                <img src={user?.imageUrl} alt="Avatar" className={`w-full h-full object-cover transition-opacity ${isUploadingImage ? 'opacity-50' : 'opacity-100'}`} />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-adorix-primary to-blue-600 flex items-center justify-center">
                                                    <span className="text-white text-6xl font-black uppercase">{user?.firstName?.charAt(0) || '?'}</span>
                                                </div>
                                            )}
                                            {isUploadingImage && <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-10"><Loader2 className="w-8 h-8 text-adorix-dark animate-spin" /></div>}
                                        </div>
                                    </div>

                                    {/* Avatar Actions */}
                                    <div className="absolute bottom-1 -right-2 flex flex-col gap-2 z-20 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300">
                                        <button onClick={() => !isUploadingImage && fileInputRef.current?.click()} className="p-2.5 bg-white text-gray-700 hover:text-adorix-dark rounded-full shadow-xl border border-gray-100 transition-transform hover:scale-110"><Camera className="w-4 h-4" /></button>
                                    </div>
                                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                                </div>

                                <div className="flex-1 pb-2 text-center md:text-left">
                                    <h1 className="text-4xl font-black text-adorix-dark tracking-tight flex items-center gap-2 justify-center md:justify-start">
                                        {user?.fullName}
                                        <BadgeCheck className="w-8 h-8 text-blue-500 fill-blue-50" />
                                    </h1>
                                    <div className="flex flex-col gap-1 items-center md:items-start">
                                        <p className="text-gray-500 font-medium flex items-center gap-4 flex-wrap justify-center md:justify-start">
                                            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-adorix-primary" /> {user?.primaryEmailAddress?.emailAddress}</span>
                                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-purple-500" /> Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</span>
                                        </p>
                                    </div>
                                </div>

                                <button onClick={() => signOut()} className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-100 transition-all flex items-center gap-2 mb-2"><LogOutIcon className="w-4 h-4" /> Sign Out</button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Pencil Fix */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="absolute top-44 -translate-y-1/2 right-10 w-14 h-14 bg-white text-adorix-dark rounded-full hover:bg-adorix-light transition-all flex items-center justify-center shadow-2xl border border-gray-100 z-[60] group hover:scale-110 active:scale-95"
                        title="Edit Profile"
                    >
                        <Edit2 className="w-6 h-6" />
                    </button>
                </div>

                {/* Tabs Navigation */}
                <div className="flex items-center gap-1 bg-gray-100/50 p-1.5 rounded-3xl mb-10 w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-black text-sm transition-all ${activeTab === tab.id
                                    ? 'bg-white text-adorix-dark shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                                }`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-adorix-primary' : 'opacity-50'}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                {/* Analytics Column */}
                                <div className="lg:col-span-4">
                                    <div className="flex items-baseline justify-between mb-10 px-2 h-8">
                                        <h2 className="text-2xl font-black text-adorix-dark tracking-tight leading-none">Analytics</h2>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none hidden sm:block">Performance Hub</p>
                                    </div>

                                    <div className="space-y-6">
                                        {stats.map((stat, i) => (
                                            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all group hover:shadow-xl hover:shadow-adorix-dark/5">
                                                <div className="flex items-center gap-6">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                                            stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
                                                        }`}>
                                                        <stat.icon className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-400 font-black text-[11px] uppercase tracking-widest mb-1">{stat.label}</p>
                                                        <h3 className="text-3xl font-black text-adorix-dark tracking-tighter">{stat.value}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Settings Column */}
                                <div className="lg:col-span-8">
                                    <div className="flex items-baseline justify-between mb-10 px-2 h-8">
                                        <h2 className="text-2xl font-black text-adorix-dark tracking-tight leading-none">Settings</h2>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none hidden sm:block">Configuration Hub</p>
                                    </div>

                                    <div className="space-y-10">
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
                                            <div key={section.title} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-adorix-dark/5 overflow-hidden">
                                                <div className="px-8 py-4 bg-gray-50/50 border-b border-gray-50 flex items-center gap-3">
                                                    <section.icon className="w-4 h-4 text-gray-400" />
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{section.title}</span>
                                                </div>
                                                {section.items.map((item, i) => (
                                                    <div key={item.label} onClick={item.onClick} className={`flex items-center justify-between p-6 ${i !== section.items.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50/50 transition-colors group cursor-pointer`}>
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
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'account' && (
                        <motion.div key="account" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-10">
                            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><User className="w-6 h-6" /></div>
                                    <div>
                                        <h2 className="text-2xl font-black text-adorix-dark tracking-tight">Account Information</h2>
                                        <p className="text-gray-500 font-medium mt-1">Manage your professional profile details.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">1</span> Personal Details</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Full Name</label>
                                            <input type="text" value={accountInfo.fullName} onChange={(e) => setAccountInfo({ ...accountInfo, fullName: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-adorix-primary" placeholder="Full Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Phone Number</label>
                                            <input type="tel" value={accountInfo.phoneNumber} onChange={(e) => setAccountInfo({ ...accountInfo, phoneNumber: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-adorix-primary" placeholder="Phone" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">2</span> Professional Info</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Company</label>
                                            <input type="text" value={accountInfo.company} onChange={(e) => setAccountInfo({ ...accountInfo, company: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-adorix-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Bio</label>
                                            <textarea rows="3" value={accountInfo.bio} onChange={(e) => setAccountInfo({ ...accountInfo, bio: e.target.value })} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-adorix-primary resize-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-8 border-t border-gray-100 flex justify-end">
                                <button onClick={handleSaveAccountInfo} disabled={isSaving} className="px-8 py-3 bg-adorix-dark text-white rounded-xl font-black hover:bg-black transition-all flex items-center gap-2">
                                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'password' && (
                        <motion.div key="password" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm max-w-2xl mx-auto space-y-8">
                            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center"><Lock className="w-6 h-6" /></div>
                                <div>
                                    <h2 className="text-2xl font-black text-adorix-dark">Security Settings</h2>
                                    <p className="text-gray-500 font-medium">Update your password to keep your account secure.</p>
                                </div>
                            </div>
                            <form onSubmit={handlePasswordChange} className="space-y-6">
                                {passwordError && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> {passwordError}</div>}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Current Password</label>
                                        <input type={showPassword ? "text" : "password"} value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-adorix-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">New Password</label>
                                        <input type={showPassword ? "text" : "password"} value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-adorix-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Confirm New Password</label>
                                        <input type={showPassword ? "text" : "password"} value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-adorix-primary" />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button type="submit" disabled={isChangingPassword} className="px-8 py-3 bg-adorix-dark text-white rounded-xl font-black hover:bg-black transition-all flex items-center gap-2">
                                        {isChangingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {activeTab === 'billing' && (
                        <motion.div key="billing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm max-w-2xl mx-auto">
                            <div className="flex items-center gap-4 pb-6 border-b border-gray-100 mb-8">
                                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center"><CreditCard className="w-6 h-6" /></div>
                                <div>
                                    <h2 className="text-2xl font-black text-adorix-dark">Billing & Plans</h2>
                                    <p className="text-gray-500 font-medium">Manage your subscription and invoices.</p>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center"><span className="font-black italic text-blue-900 text-xs">VISA</span></div>
                                    <div>
                                        <p className="font-bold text-adorix-dark">Visa ending in 1234</p>
                                        <p className="text-xs text-gray-500">Expires 12/28</p>
                                    </div>
                                </div>
                                <button className="text-sm font-bold text-adorix-primary hover:underline">Update</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Modals & Toast */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-adorix-dark/40 backdrop-blur-md" />
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10 p-8">
                                <h2 className="text-2xl font-black mb-6">Edit Basic Profile</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1"><label className="text-xs font-bold text-gray-400 uppercase">First Name</label><input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" /></div>
                                        <div className="space-y-1"><label className="text-xs font-bold text-gray-400 uppercase">Last Name</label><input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" /></div>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end gap-3">
                                    <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-500">Cancel</button>
                                    <button onClick={handleSaveProfile} className="px-8 py-3 bg-adorix-dark text-white rounded-xl font-black">Save Changes</button>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {isEmailModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEmailModalOpen(false)} className="absolute inset-0 bg-adorix-dark/40 backdrop-blur-md" />
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10 p-8">
                                <h2 className="text-2xl font-black mb-6">Email Management</h2>
                                <input type="email" value={emailData.email} onChange={(e) => setEmailData({ ...emailData, email: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none mb-4" placeholder="New email address" />
                                <div className="flex justify-end gap-3"><button onClick={() => setIsEmailModalOpen(false)} className="px-6 py-3 font-bold text-gray-500">Cancel</button><button className="px-8 py-3 bg-adorix-dark text-white rounded-xl font-black">Verify Email</button></div>
                            </motion.div>
                        </div>
                    )}

                    {showToast && (
                        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] bg-adorix-dark text-white px-8 py-4 rounded-2xl font-black shadow-2xl border border-white/10 flex items-center gap-3">
                            <Check className="w-5 h-5 text-emerald-400" /> Settings Updated Successfully!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProfilePage;
