'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import {
    User, Settings, CreditCard, Shield, Bell, Activity, Camera, Mail, 
    Briefcase, Calendar, TrendingUp, Zap, Download,
    Save, Loader2, Sparkles, Globe, 
    Trash2, Plus, Lock, Eye, ChevronRight, BadgeCheck, LogOut as LogOutIcon, Pencil
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = () => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [emailToVerify, setEmailToVerify] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const fileInputRef = useRef(null);
    const coverFileInputRef = useRef(null);

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

    const handleRemoveImage = async () => {
        try {
            setIsUploadingImage(true);
            await user.setProfileImage({ file: null });
        } catch (error) {
            console.error('Error removing image:', error);
            alert("Failed to remove image. Please try again.");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleCoverUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setIsUploadingCover(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result);
            };
            reader.readAsDataURL(file);
            // In a real app, you'd upload to a storage service here
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Error uploading cover:', error);
        } finally {
            setIsUploadingCover(false);
        }
    };

    const handleRemoveCover = () => {
        setCoverImage(null);
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Activity },
        { id: 'account', label: 'Account Settings', icon: User },
        { id: 'security', label: 'Security & Privacy', icon: Shield },
        { id: 'preferences', label: 'System Preferences', icon: Settings },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];

    const stats = [
        { label: 'AD PLAY TIME', value: '1,420', color: 'blue', icon: Zap },
        { label: 'AVERAGE TIME', value: '42s', color: 'emerald', icon: Activity },
        { label: 'ENGAGEMENT', value: '92%', color: 'purple', icon: TrendingUp },
    ];

    if (!isLoaded) return null;

    return (
        <div className="pt-28 px-6 pb-20 min-h-screen bg-transparent relative overflow-hidden">
            {/* Professional Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-adorix-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-white rounded-[2rem] mb-8 shadow-xl shadow-adorix-dark/5 border border-gray-100 z-10"
                >
                    <div className="h-44 bg-gradient-to-r from-adorix-dark via-gray-900 to-adorix-dark relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                        
                        {/* Cover Controls */}
                        <div className="absolute top-6 right-6 flex gap-3 z-20">
                            <button 
                                onClick={() => coverFileInputRef.current?.click()}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group/edit border border-gray-100"
                                title="Edit Cover Photo"
                            >
                                {isUploadingCover ? <Loader2 className="w-4 h-4 animate-spin text-adorix-dark" /> : <Pencil className="w-4 h-4 text-adorix-dark" />}
                            </button>
                            
                            {coverImage && (
                                <button 
                                    onClick={handleRemoveCover}
                                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 hover:scale-110 transition-transform group/remove border border-gray-100"
                                    title="Remove Cover Photo"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            )}
                        </div>
                        <input type="file" hidden ref={coverFileInputRef} accept="image/*" onChange={handleCoverUpload} />

                        {coverImage && (
                            <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                        )}
                    </div>

                    <div className="px-10 pb-10">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 -mt-[5.5rem] relative z-10 px-4 md:px-0">
                            <div className="w-44 h-44 rounded-full bg-white p-1.5 shadow-xl flex-shrink-0 group/avatar relative">
                                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-[6px] border-white relative">
                                    {isUploadingImage ? (
                                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                                            <Loader2 className="w-8 h-8 animate-spin text-adorix-primary" />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 bg-black/0 group-hover/avatar:bg-black/40 flex items-center justify-center gap-3 transition-all opacity-0 group-hover/avatar:opacity-100 z-10">
                                            <button 
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all backdrop-blur-md border border-white/20"
                                            >
                                                <Camera className="w-5 h-5 text-white" />
                                            </button>
                                            <button 
                                                onClick={handleRemoveImage}
                                                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-red-500/80 flex items-center justify-center transition-all backdrop-blur-md border border-white/20"
                                            >
                                                <Trash2 className="w-5 h-5 text-white" />
                                            </button>
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
                                className="px-8 py-4 bg-red-50/80 text-red-500 rounded-2xl font-black hover:bg-red-50 hover:scale-105 transition-all flex items-center gap-3 backdrop-blur-sm shadow-sm"
                            >
                                <LogOutIcon className="w-5 h-5" /> Sign Out
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1 w-full min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-4xl font-black text-adorix-dark tracking-tight">Analytics</h2>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Performance Hub</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {stats.map((stat, i) => (
                                            <motion.div 
                                                key={i} 
                                                whileHover={{ y: -5, scale: 1.02 }}
                                                className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-adorix-dark/5 transition-all group flex flex-col items-center text-center relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-adorix-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:rotate-12 ${
                                                    stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                                    stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                                    'bg-purple-50 text-purple-600'}`}>
                                                    <stat.icon className="w-8 h-8" />
                                                </div>
                                                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                                                <h3 className="text-4xl font-black text-adorix-dark mb-1 tracking-tighter">{stat.value}</h3>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'account' && (
                                <motion.div 
                                    key="account"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-10"
                                >
                                    <div className="flex items-center gap-5 mb-2">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm transition-transform hover:scale-110">
                                            <User className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-adorix-dark leading-tight tracking-tight">Account Information</h3>
                                            <p className="text-gray-500 font-medium tracking-tight text-lg">Manage your professional profile and personal details.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <motion.div 
                                            whileHover={{ y: -5 }}
                                            className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-adorix-dark/[0.03] hover:shadow-adorix-dark/[0.06] transition-all"
                                        >
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <h4 className="text-xl font-black text-adorix-dark">Personal Details</h4>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-adorix-dark px-1">Full Name</label>
                                                    <input type="text" defaultValue={user?.fullName} className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-adorix-primary/20 focus:bg-white rounded-2xl text-gray-900 font-bold outline-none transition-all" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-adorix-dark px-1">Phone Number</label>
                                                    <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-adorix-primary/20 focus:bg-white rounded-2xl text-gray-900 font-bold outline-none transition-all" />
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div 
                                            whileHover={{ y: -5 }}
                                            className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-adorix-dark/[0.03] hover:shadow-adorix-dark/[0.06] transition-all"
                                        >
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                                    <Briefcase className="w-5 h-5" />
                                                </div>
                                                <h4 className="text-xl font-black text-adorix-dark">Professional Info</h4>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-adorix-dark px-1">Company</label>
                                                    <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-adorix-primary/20 focus:bg-white rounded-2xl text-gray-900 font-bold outline-none transition-all" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-adorix-dark px-1">Bio</label>
                                                    <textarea rows="4" className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-adorix-primary/20 focus:bg-white rounded-2xl text-gray-900 font-bold outline-none transition-all resize-none" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="pt-6 flex justify-end">
                                        <button onClick={handleSave} disabled={isSaving} className="px-10 py-5 bg-adorix-dark text-white rounded-[1.5rem] font-black hover:scale-105 transition-all shadow-xl shadow-adorix-dark/20 flex items-center gap-3 disabled:opacity-50 text-lg">
                                            {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>

                                    <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-adorix-dark/[0.03] hover:shadow-adorix-dark/[0.06] transition-all flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-adorix-dark flex items-center justify-center text-white shadow-lg shadow-adorix-dark/20 transition-transform hover:rotate-6">
                                                <Mail className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-black text-adorix-dark">Email Management</h4>
                                                <p className="text-gray-400 font-bold tracking-tight text-lg">{user?.emailAddresses[0]?.emailAddress || "No email available"}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setIsEmailModalOpen(true)} className="px-10 py-5 bg-gray-50 border border-transparent hover:border-adorix-primary/20 hover:bg-white text-adorix-dark rounded-[1.5rem] font-black transition-all flex items-center gap-3 shadow-sm hover:shadow-md group text-lg">
                                            Change Email <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                </motion.div>
                            )}

                            {activeTab === 'security' && (
                                <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm transition-transform hover:scale-110">
                                            <Shield className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-adorix-dark tracking-tight">Security & Privacy</h3>
                                            <p className="text-gray-500 font-medium tracking-tight text-lg">Manage your authentication and data protection protocols.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <motion.div whileHover={{ scale: 1.002 }} className="bg-white rounded-[2.5rem] p-12 border border-gray-100 shadow-xl shadow-adorix-dark/[0.03] hover:shadow-adorix-dark/[0.06] transition-all max-w-2xl mx-auto">
                                            <div className="flex items-center gap-5 mb-10 pb-10 border-b border-gray-50">
                                                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                                                    <Lock className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <h3 className="text-3xl font-black text-adorix-dark leading-tight">Password Management</h3>
                                                    <p className="text-gray-500 font-medium text-lg tracking-tight">Update your password to keep your account secure.</p>
                                                </div>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="space-y-3">
                                                    <label className="text-sm font-black text-adorix-dark px-1">Current Password</label>
                                                    <input type="password" placeholder="••••••••" className="w-full px-8 py-5 bg-gray-50 border border-transparent focus:border-adorix-primary/20 focus:bg-white focus:ring-4 focus:ring-adorix-primary/5 rounded-2xl text-gray-900 font-bold outline-none transition-all text-lg" />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-sm font-black text-adorix-dark px-1">New Password</label>
                                                    <input type="password" placeholder="••••••••" className="w-full px-8 py-5 bg-gray-50 border border-transparent focus:border-adorix-primary/20 focus:bg-white focus:ring-4 focus:ring-adorix-primary/5 rounded-2xl text-gray-900 font-bold outline-none transition-all text-lg" />
                                                </div>
                                                <div className="pt-6 flex justify-end">
                                                    <button className="px-10 py-5 bg-adorix-dark text-white rounded-[1.5rem] font-black hover:scale-105 transition-all shadow-xl shadow-adorix-dark/20 flex items-center gap-3 text-lg group">
                                                        <Shield className="w-6 h-6 group-hover:rotate-12 transition-transform" /> Update Password
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
                                        >
                                            <motion.div 
                                                whileHover={{ y: -5, scale: 1.02 }}
                                                className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-adorix-dark/[0.03] hover:shadow-adorix-dark/[0.06] transition-all cursor-pointer group flex flex-col items-start"
                                            >
                                                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-adorix-dark mb-8 group-hover:bg-adorix-dark group-hover:text-white transition-all">
                                                    <Lock className="w-7 h-7" />
                                                </div>
                                                <h4 className="text-2xl font-black text-adorix-dark mb-2">Access Control</h4>
                                                <p className="text-gray-400 font-bold text-sm leading-snug">Manage your credentials and 2FA</p>
                                            </motion.div>

                                            <motion.div 
                                                whileHover={{ y: -5, scale: 1.02 }}
                                                className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-adorix-dark/[0.03] hover:shadow-adorix-dark/[0.06] transition-all cursor-pointer group flex flex-col items-start"
                                            >
                                                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-adorix-dark mb-8 group-hover:bg-adorix-dark group-hover:text-white transition-all">
                                                    <Eye className="w-7 h-7" />
                                                </div>
                                                <h4 className="text-2xl font-black text-adorix-dark mb-2">Privacy Protocol</h4>
                                                <p className="text-gray-400 font-bold text-sm leading-snug">Hide sensitive data from dashboard</p>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'preferences' && (
                                <motion.div key="preferences" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm transition-transform hover:scale-110">
                                            <Settings className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-adorix-dark tracking-tight">System Preferences</h3>
                                            <p className="text-gray-500 font-medium tracking-tight text-lg">Configure your global application behavior and preferences.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { title: 'Smart Notifications', desc: 'Choose updates to receive', icon: Bell, color: 'orange' },
                                            { title: 'Appearance', desc: 'Dark & Light modes', icon: Zap, color: 'emerald' },
                                            { title: 'Language', desc: 'English (United Kingdom)', icon: Globe, color: 'blue' },
                                        ].map((item, i) => (
                                            <motion.div key={i} whileHover={{ y: -5, scale: 1.02 }} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-adorix-dark/[0.03] hover:shadow-adorix-dark/[0.06] transition-all group flex flex-col items-start relative overflow-hidden cursor-pointer">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12 ${
                                                    item.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                                    item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                                    'bg-blue-50 text-blue-600'}`}>
                                                    <item.icon className="w-7 h-7" />
                                                </div>
                                                <h4 className="text-xl font-black text-adorix-dark mb-2 tracking-tight">{item.title}</h4>
                                                <p className="text-gray-400 font-bold text-sm leading-snug tracking-tight">{item.desc}</p>
                                            </motion.div>
                                        ))}
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
                                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-adorix-dark/[0.03] hover:shadow-adorix-dark/[0.06] transition-all">
                                        <div className="flex items-center gap-6 mb-10">
                                            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm transition-transform hover:rotate-6">
                                                <CreditCard className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-black text-adorix-dark">Billing & Plans</h4>
                                                <p className="text-gray-400 font-bold tracking-tight text-lg">Manage your subscription and invoices.</p>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-gray-50">
                                            <div className="bg-gray-50/50 rounded-[1.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-transparent hover:border-adorix-primary/10 hover:bg-white transition-all group">
                                                <div className="flex items-center gap-6">
                                                    <div className="px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm flex items-center justify-center">
                                                        <span className="text-adorix-dark font-black italic tracking-tighter text-lg">VISA</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-adorix-dark text-lg">Visa ending in 1234</p>
                                                        <p className="text-gray-400 font-bold text-sm">Expires 12/28</p>
                                                    </div>
                                                </div>
                                                <button className="text-adorix-primary font-black hover:text-adorix-dark transition-colors px-6 py-2 rounded-xl hover:bg-adorix-primary/5">
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-4 border border-white shadow-xl shadow-adorix-dark/5 space-y-2 flex flex-col h-full">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative group ${activeTab === tab.id
                                        ? 'text-adorix-dark bg-gray-50/80 shadow-sm'
                                        : 'text-gray-400 hover:text-adorix-dark hover:bg-gray-50/50'
                                        }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="activeTab" className="absolute left-0 w-1.5 h-8 bg-adorix-dark rounded-r-full" />
                                    )}
                                    <tab.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'text-adorix-dark' : 'text-gray-400'}`} />
                                    <span className="font-bold text-sm tracking-tight">{tab.label}</span>
                                    <ChevronRight className={`w-4 h-4 ml-auto transition-all ${activeTab === tab.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                                </button>
                            ))}
                            <div className="mt-auto pt-6 border-t border-gray-100/50">
                                <button onClick={() => signOut()} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all group font-bold text-sm">
                                    <LogOutIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isEmailModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEmailModalOpen(false)} className="absolute inset-0 bg-adorix-dark/40 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative z-10 overflow-hidden">
                            <h3 className="text-3xl font-black text-adorix-dark mb-8">Email Management</h3>
                            <div className="space-y-8">
                                <input type="email" value={emailToVerify} onChange={(e) => setEmailToVerify(e.target.value)} className="w-full px-8 py-5 bg-gray-50 border border-transparent focus:border-adorix-primary/20 focus:bg-white rounded-[1.5rem] text-gray-900 font-bold outline-none transition-all text-lg" placeholder="Enter your email" />
                                <div className="flex items-center justify-end gap-6 pt-4">
                                    <button onClick={() => setIsEmailModalOpen(false)} className="text-gray-400 font-black hover:text-gray-600 transition-colors">Cancel</button>
                                    <button onClick={() => setIsEmailModalOpen(false)} className="px-10 py-5 bg-adorix-dark text-white rounded-[1.5rem] font-black hover:scale-105 transition-all shadow-xl shadow-adorix-dark/20">Verify Email</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfilePage;
