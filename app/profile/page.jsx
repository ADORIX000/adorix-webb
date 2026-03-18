'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    User, Settings, CreditCard, Shield, Bell, Activity, Camera, Mail, Phone,
    MapPin, Briefcase, Calendar, TrendingUp, Zap, Download,
    Copy, Check, Edit2, Save, X, Loader2, Sparkles, Globe, Terminal,
    FileKey, Trash2, RefreshCcw, Upload, Plus, Lock, Eye, EyeOff, ChevronRight, BadgeCheck, LogOut as LogOutIcon,
    Key, Link as LinkIcon, Linkedin, Twitter, MessageSquare, AlertTriangle, PlayCircle, Timer, MousePointer2, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';

const ProfileContent = () => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const searchParams = useSearchParams();
    const router = useRouter();

    // UI State
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');

    // Sync tab with URL if needed
    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['overview', 'account', 'security', 'system', 'billing'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        // Update URL without refresh to maintain consistency
        const params = new URLSearchParams(searchParams);
        params.set('tab', tabId);
        router.push(`/profile?${params.toString()}`, { scroll: false });
    };
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
        { id: 'account', label: 'Account Settings', icon: User },
        { id: 'security', label: 'Security & Privacy', icon: Shield },
        { id: 'system', label: 'System Preferences', icon: Settings },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];

    const stats = [
        { label: 'Ad Play Time', value: '1,420', change: 'Total Plays', icon: PlayCircle, color: 'blue' },
        { label: 'Average Time', value: '42s', change: 'Per Session', icon: Timer, color: 'emerald' },
        { label: 'Engagement', value: '92%', change: 'High Performance', icon: MousePointer2, color: 'purple' },
    ];

    const navigation = {
        navigate: [
            { id: 'overview', label: 'Dashboard', icon: Activity },
            { id: 'account', label: 'Users', icon: User },
            { id: 'system', label: 'Pages', icon: FileKey },
            { id: 'billing', label: 'Media Files', icon: Database },
        ],
        more: [
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'language', label: 'Language', icon: Globe },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'help', label: 'Help Center', icon: Bell },
        ]
    };

    return (
        <div className="flex min-h-screen bg-[#f8f9fa]">
            {/* Enterprise Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-white flex flex-col fixed inset-y-0 z-50">
                <div className="p-4 border-b border-gray-100 mb-2">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            {user?.hasImage ? (
                                <img src={user?.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-adorix-dark flex items-center justify-center text-white font-bold">{user?.firstName?.charAt(0)}</div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 truncate">{user?.fullName || 'User'}</h4>
                            <p className="text-[10px] text-gray-500 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>
                        <ChevronRight className="w-3 h-3 text-gray-300 ml-auto" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-8">
                    <div>
                        <h3 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Navigate</h3>
                        <nav className="space-y-1">
                            {navigation.navigate.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleTabChange(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                                        activeTab === item.id
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                    <ChevronRight className={`w-3 h-3 ml-auto ${activeTab === item.id ? 'opacity-100' : 'opacity-0'}`} />
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h3 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">More</h3>
                        <nav className="space-y-1">
                            {navigation.more.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleTabChange(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                                        activeTab === item.id
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 mt-auto">
                    <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <LogOutIcon className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Pane */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Top Section / Header */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-50 rounded-lg"><User className="w-5 h-5 text-gray-400" /></div>
                            <h2 className="text-lg font-bold text-gray-900">Users</h2>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl">
                            <button className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 rounded-lg">All Users</button>
                            <button className="px-6 py-2 text-sm font-bold bg-white text-gray-900 shadow-sm rounded-lg border border-gray-100">Settings</button>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-100 transition-all">
                            <Plus className="w-4 h-4" />
                            Add New User
                        </button>
                    </div>

                    {/* Account Management Grid */}
                    <div className="flex flex-col xl:flex-row gap-8">
                        {/* Left Column: Avatar & Password */}
                        <div className="xl:w-1/3 space-y-8">
                            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Account Management</h3>
                                <div className="space-y-8">
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-full aspect-square max-w-[280px] rounded-2xl overflow-hidden bg-[#fae5e1] border border-gray-100 mb-6 group/profile">
                                             {user?.hasImage ? (
                                                <img src={user?.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-8xl font-black text-white/50">{user?.firstName?.charAt(0)}</div>
                                            )}
                                            <button 
                                                onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                                                className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover/profile:opacity-100 shadow-lg border border-gray-100"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isUploadingImage}
                                            className="w-full py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                                        >
                                            {isUploadingImage ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Upload Photo'}
                                        </button>
                                        <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                                    </div>

                                    <form onSubmit={handlePasswordChange} className="space-y-4 pt-4 border-t border-gray-50">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-900">Old Password</label>
                                            <input type="password" value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all" placeholder="********" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-900">New Password</label>
                                            <input type="password" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all" placeholder="********" />
                                        </div>
                                        <button type="submit" disabled={isChangingPassword} className="w-full py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                                            {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Change Password'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Profile Info */}
                        <div className="flex-1 space-y-8">
                            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Profile Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 px-1">Username</label>
                                        <input type="text" value={user?.username || ''} disabled className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 px-1">First Name</label>
                                        <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 px-1">Nickname</label>
                                        <input type="text" value={accountInfo.fullName?.split(' ')[0]} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 px-1">Role</label>
                                        <div className="relative">
                                            <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none appearance-none focus:border-blue-500 transition-all">
                                                <option>Subscriber</option>
                                                <option>Member</option>
                                                <option>Admin</option>
                                            </select>
                                            <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 px-1">Last Name</label>
                                        <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 px-1">Display Name Publicly as</label>
                                        <input type="text" value={user?.fullName || ''} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all" />
                                    </div>
                                </div>

                                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-12 mb-8 border-b border-gray-50 pb-4">Contact Info</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 px-1">Email <span className="text-gray-400 font-medium">(required)</span></label>
                                        <input type="email" value={user?.primaryEmailAddress?.emailAddress} disabled className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 px-1">WhatsApp</label>
                                        <input type="text" value={accountInfo.phoneNumber} onChange={(e) => setAccountInfo({...accountInfo, phoneNumber: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all" placeholder="@username" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 px-1">Website</label>
                                        <input type="text" value={accountInfo.website} onChange={(e) => setAccountInfo({...accountInfo, website: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all" placeholder="https://..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 px-1">Telegram</label>
                                        <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all" placeholder="@username" />
                                    </div>
                                </div>

                                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-12 mb-8 border-b border-gray-50 pb-4">About the User</h3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 px-1">Biographical Info</label>
                                        <textarea 
                                            rows="5" 
                                            value={accountInfo.bio} 
                                            onChange={(e) => setAccountInfo({...accountInfo, bio: e.target.value})}
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-all resize-none leading-relaxed" 
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <button 
                                            onClick={handleSaveAccountInfo}
                                            disabled={isSaving}
                                            className="px-10 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2"
                                        >
                                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                            Update Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals & Toast */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-gray-900/40 backdrop-blur-md" />
                            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10">
                                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">Basic Profile</h2>
                                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-1">First Name</label>
                                            <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-transparent focus:border-gray-100 rounded-xl text-sm font-medium outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-1">Last Name</label>
                                            <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-transparent focus:border-gray-100 rounded-xl text-sm font-medium outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="pt-2 flex flex-col gap-3">
                                        <button onClick={handleSaveProfile} className="w-full py-3 bg-adorix-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-adorix-dark/10 hover:shadow-adorix-dark/20 transition-all">Save Changes</button>
                                        <button onClick={() => setIsModalOpen(false)} className="w-full py-3 bg-white text-gray-500 hover:text-gray-700 rounded-xl text-sm font-bold transition-all border border-gray-100">Cancel</button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {isEmailModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEmailModalOpen(false)} className="absolute inset-0 bg-gray-900/40 backdrop-blur-md" />
                            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10">
                                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">Email Address</h2>
                                    <button onClick={() => setIsEmailModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-1">New Email Address</label>
                                        <input type="email" value={emailData.email} onChange={(e) => setEmailData({ ...emailData, email: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-transparent focus:border-gray-100 rounded-xl text-sm font-medium outline-none transition-all" placeholder="Enter new address" />
                                        <p className="text-[10px] text-gray-400 font-medium px-1">We'll send a verification link to this address.</p>
                                    </div>
                                    <div className="pt-2 flex flex-col gap-3">
                                        <button className="w-full py-3 bg-adorix-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-adorix-dark/10 hover:shadow-adorix-dark/20 transition-all">Send Verification Code</button>
                                        <button onClick={() => setIsEmailModalOpen(false)} className="w-full py-3 bg-white text-gray-500 hover:text-gray-700 rounded-xl text-sm font-bold transition-all border border-gray-100">Cancel</button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {showToast && (
                        <motion.div initial={{ opacity: 0, y: 20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 20, x: '-50%' }} className="fixed bottom-10 left-1/2 z-[110] bg-gray-900 text-white px-6 py-3.5 rounded-2xl text-sm font-bold shadow-2xl flex items-center gap-3 border border-white/10 whitespace-nowrap">
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
                            Profile preference updated successfully
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

const ProfilePage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-transparent flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-adorix-primary" /></div>}>
            <ProfileContent />
        </Suspense>
    );
};

export default ProfilePage;
