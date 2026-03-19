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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { createWorker } from 'tesseract.js';

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
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

    // Billing State
    const [paymentCards, setPaymentCards] = useState([
        { id: '1', type: 'VISA', last4: '1234', expiry: '12/28' }
    ]);
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [isProcessingImage, setIsProcessingImage] = useState(false);
    const [theme, setTheme] = useState('auto');

    const handleScanCard = async () => {
        if (!videoRef.current) return;
        setIsProcessingImage(true);

        try {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            const worker = await createWorker('eng');
            const { data: { text } } = await worker.recognize(canvas);
            await worker.terminate();

            const cleanDigits = text.replace(/[^0-9]/g, '');
            const match = cleanDigits.match(/\d{15,16}/);

            if (match) {
                setNewCardDetails(prev => ({ ...prev, number: match[0].substring(0, 16) }));
                stopScanner();
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            } else {
                alert("Could not detect a clear 15 or 16 digit card number. Please align the card in good lighting and try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Error running card OCR.");
        } finally {
            setIsProcessingImage(false);
        }
    };

    const videoRef = useRef(null);

    const startScanner = async () => {
        setIsScanning(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }, 100);
        } catch (err) {
            console.error("Camera error:", err);
            alert("Unable to access the camera. Please check your permissions.");
            setIsScanning(false);
        }
    };

    const stopScanner = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setIsScanning(false);
    };
    const [newCardDetails, setNewCardDetails] = useState({
        number: '', name: '', expiryMonth: '', expiryYear: '', cvv: ''
    });

    const handleDeleteCard = (id) => {
        setPaymentCards(paymentCards.filter(card => card.id !== id));
    };

    const handleSaveCard = (e) => {
        e.preventDefault();
        if (newCardDetails.number.length >= 15) {
            setPaymentCards([...paymentCards, {
                id: Date.now().toString(),
                type: newCardDetails.number.startsWith('4') ? 'VISA' : (newCardDetails.number.startsWith('5') ? 'Mastercard' : 'Card'),
                last4: newCardDetails.number.slice(-4),
                expiry: `${newCardDetails.expiryMonth}/${newCardDetails.expiryYear}`
            }]);
            setIsAddingCard(false);
            setNewCardDetails({ number: '', name: '', expiryMonth: '', expiryYear: '', cvv: '' });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

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

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else if (theme === 'light') {
            root.classList.remove('dark');
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }, [theme]);

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

    const performanceData = [
        { name: 'Mon', engagement: 65, playTime: 1200 },
        { name: 'Tue', engagement: 72, playTime: 1350 },
        { name: 'Wed', engagement: 68, playTime: 1250 },
        { name: 'Thu', engagement: 85, playTime: 1500 },
        { name: 'Fri', engagement: 92, playTime: 1700 },
        { name: 'Sat', engagement: 88, playTime: 1600 },
        { name: 'Sun', engagement: 95, playTime: 1800 },
    ];

    if (!isLoaded) return null;

    return (
        <div className="pt-28 px-6 pb-20 min-h-screen bg-transparent">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Main Content Column */}
                    <div className="lg:col-span-9 space-y-8">
                        {/* Header Banner */}
                        <div className="relative">
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
                                            <h1 className="text-4xl font-black text-adorix-dark tracking-tight flex items-center gap-2 justify-center md:justify-start mb-4">
                                                {user?.fullName}
                                                <BadgeCheck className="w-8 h-8 text-blue-500 fill-blue-50" />
                                            </h1>
                                            <div className="flex flex-col gap-2 items-center md:items-start">
                                                <p className="text-gray-500 font-medium flex items-center gap-4 flex-wrap justify-center md:justify-start">
                                                    <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-adorix-primary" /> {user?.primaryEmailAddress?.emailAddress}</span>
                                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-purple-500" /> Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</span>
                                                </p>
                                            </div>
                                        </div>
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

                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' && (
                                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                        {/* Analytics Column */}
                                        <div className="lg:col-span-12 space-y-8">
                                            <div className="flex items-center justify-between px-2">
                                                <div>
                                                    <h2 className="text-2xl font-black text-adorix-dark tracking-tight leading-none mb-1">Analytics</h2>
                                                    <p className="text-sm font-semibold text-gray-500 hidden sm:block">Track your campaign performance and overall engagement</p>
                                                </div>
                                                <div className="px-5 py-2.5 bg-gray-50 border border-gray-100 text-gray-600 text-[10px] font-black rounded-xl uppercase tracking-widest shadow-sm">
                                                    Performance Hub
                                                </div>
                                            </div>

                                            {/* Top Stat Cards */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {stats.map((stat, i) => (
                                                    <div key={i} className="relative overflow-hidden bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-adorix-dark/5">
                                                        <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.color === 'blue' ? 'bg-blue-300/30' :
                                                            stat.color === 'emerald' ? 'bg-emerald-300/30' : 'bg-purple-300/30'
                                                            }`} />
                                                        <div className="relative z-10 flex flex-col gap-6">
                                                            <div className="flex justify-between items-start">
                                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm border border-white/50 ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                                                    stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
                                                                    }`}>
                                                                    <stat.icon className="w-7 h-7" />
                                                                </div>
                                                                <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                                                    stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
                                                                    }`}>
                                                                    {stat.change}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-400 font-black text-[11px] uppercase tracking-widest mb-1.5">{stat.label}</p>
                                                                <h3 className="text-[2.5rem] leading-none font-black text-adorix-dark tracking-tighter">
                                                                    {stat.value}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Chart Section */}
                                            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:shadow-adorix-dark/5 group">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                                    <div>
                                                        <h3 className="text-xl font-black text-adorix-dark">Engagement Overview</h3>
                                                        <p className="text-sm font-semibold text-gray-400 mt-1">Play time and engagement rate over the last 7 days</p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 items-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50"></div>
                                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Play Time</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50"></div>
                                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Engagement</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="h-[320px] w-full mt-2">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                            <defs>
                                                                <linearGradient id="colorPlayTime" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                                                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                                                </linearGradient>
                                                                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                                                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                                                </linearGradient>
                                                            </defs>
                                                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f3f4f6" />
                                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 700 }} dy={10} />
                                                            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 700 }} />
                                                            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 700 }} />
                                                            <Tooltip
                                                                contentStyle={{ borderRadius: '20px', border: '1px solid #f3f4f6', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                                                                itemStyle={{ fontWeight: 800, fontSize: '14px' }}
                                                                labelStyle={{ fontWeight: 800, color: '#4b5563', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                                                                cursor={{ stroke: '#f3f4f6', strokeWidth: 2, strokeDasharray: '4 4' }}
                                                            />
                                                            <Area yAxisId="left" type="monotone" dataKey="playTime" name="Play Time" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorPlayTime)" activeDot={{ r: 6, strokeWidth: 0, fill: '#2563EB' }} />
                                                            <Area yAxisId="right" type="monotone" dataKey="engagement" name="Engagement (%)" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorEngagement)" activeDot={{ r: 6, strokeWidth: 0, fill: '#8B5CF6' }} />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'account' && (
                                <motion.div key="account" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                                    <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-10">
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
                                    </div>

                                    {/* Email Settings Card */}
                                    <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-adorix-primary">
                                                    <Mail className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-adorix-dark">Email Management</h3>
                                                    <p className="text-sm text-gray-400 font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setIsEmailModalOpen(true)} className="px-6 py-3 bg-gray-50 hover:bg-adorix-light text-adorix-dark rounded-xl font-bold transition-all flex items-center gap-2">
                                                Change Email <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'security' && (
                                <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                                    <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm max-w-2xl mx-auto space-y-8">
                                        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center"><Lock className="w-6 h-6" /></div>
                                            <div>
                                                <h2 className="text-2xl font-black text-adorix-dark">Security Settings</h2>
                                                <p className="text-gray-500 font-medium">Reset your password to keep your account secure.</p>
                                            </div>
                                        </div>
                                        <form onSubmit={handlePasswordChange} className="space-y-6">
                                            {passwordError && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> {passwordError}</div>}
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700">Current Password</label>
                                                    <div className="relative">
                                                        <input type={showPasswords.current ? "text" : "password"} value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-adorix-primary pr-12" />
                                                        <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                            {showPasswords.current ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700">New Password</label>
                                                    <div className="relative">
                                                        <input type={showPasswords.new ? "text" : "password"} value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-adorix-primary pr-12" />
                                                        <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                            {showPasswords.new ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700">Confirm New Password</label>
                                                    <div className="relative">
                                                        <input type={showPasswords.confirm ? "text" : "password"} value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-adorix-primary pr-12" />
                                                        <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                            {showPasswords.confirm ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end pt-4">
                                                <button type="submit" disabled={isChangingPassword} className="px-8 py-3 bg-adorix-dark text-white rounded-xl font-black hover:bg-black transition-all flex items-center gap-2">
                                                    {isChangingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
                                                    Reset Password
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'system' && (
                                <motion.div key="system" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                                    <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm max-w-4xl mx-auto">
                                        <div className="flex items-center gap-4 pb-6 border-b border-gray-100 mb-10">
                                            <div className="w-12 h-12 bg-gray-50 text-adorix-primary rounded-2xl flex items-center justify-center"><Settings className="w-6 h-6" /></div>
                                            <div>
                                                <h2 className="text-2xl font-black text-adorix-dark">System Preferences</h2>
                                                <p className="text-gray-500 font-medium">Configure your global application behavior.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {/* Appearance */}
                                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all border-t-4 border-t-transparent flex flex-col justify-between">
                                                <div>
                                                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center mb-6">
                                                        <Zap className="w-7 h-7" />
                                                    </div>
                                                    <h3 className="text-lg font-black text-adorix-dark mb-2">Appearance</h3>
                                                    <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6">Change theme to Dark, Light or Auto</p>
                                                </div>
                                                <div className="flex bg-gray-50 p-1.5 rounded-xl justify-between border border-gray-100">
                                                    {['light', 'dark', 'auto'].map(t => (
                                                        <button key={t} onClick={() => setTheme(t)} className={`flex-1 py-2 font-bold text-xs capitalize rounded-lg transition-all ${theme === t ? 'bg-white text-adorix-dark shadow-md border border-gray-200/50' : 'text-gray-400 hover:text-gray-600'}`}>
                                                            {t}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'billing' && (
                                <motion.div key="billing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm max-w-4xl mx-auto">
                                    <div className="flex items-center gap-4 pb-6 border-b border-gray-100 mb-8">
                                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center"><CreditCard className="w-6 h-6" /></div>
                                        <div>
                                            <h2 className="text-2xl font-black text-adorix-dark">Payment Methods</h2>
                                            <p className="text-gray-500 font-medium">Manage your saved cards and add new ones.</p>
                                        </div>
                                    </div>

                                    {!isAddingCard ? (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-bold text-gray-800">Saved Cards</h3>
                                                <button onClick={() => setIsAddingCard(true)} className="flex items-center gap-2 px-5 py-2.5 bg-adorix-dark text-white rounded-xl text-sm font-black hover:bg-black transition-all shadow-md hover:shadow-xl hover:scale-105">
                                                    <Plus className="w-4 h-4" /> Add New Card
                                                </button>
                                            </div>

                                            {paymentCards.length === 0 ? (
                                                <div className="p-10 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center">
                                                    <CreditCard className="w-12 h-12 text-gray-300 mb-4" />
                                                    <p className="text-gray-500 font-bold">No saved cards found.</p>
                                                    <p className="text-sm text-gray-400 mt-1">Add a new card to easily make payments.</p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {paymentCards.map((card, index) => (
                                                        <div key={card.id} className="relative p-6 bg-white rounded-2xl border border-gray-200 flex items-center justify-between group overflow-hidden shadow-sm hover:shadow-md transition-all">
                                                            <div className="flex items-center gap-4 relative z-10">
                                                                <div className="w-16 h-10 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                                                                    <span className="font-black italic text-blue-900 dark:text-blue-400 text-sm">{card.type}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-adorix-dark text-lg flex items-center gap-2">
                                                                        •••• {card.last4}
                                                                        {index === 0 && <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] uppercase font-black px-2 py-0.5 rounded-full">Primary</span>}
                                                                    </p>
                                                                    <p className="text-sm text-gray-500 font-medium mt-0.5">Expires {card.expiry}</p>
                                                                </div>
                                                            </div>
                                                            <button onClick={() => handleDeleteCard(card.id)} className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 dark:hover:text-red-400 rounded-xl transition-all shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 relative z-10" title="Delete Card">
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-8">
                                            {/* Visual Card Display */}
                                            <div className="relative">
                                                <div className="w-full aspect-[1.586/1] rounded-[2rem] bg-gradient-to-tr from-blue-700 via-blue-500 to-cyan-400 p-8 text-white shadow-2xl shadow-blue-500/30 flex flex-col justify-between relative overflow-hidden group transition-all hover:scale-[1.02]">
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>

                                                    <div className="flex justify-between items-start relative z-10">
                                                        <div className="w-12 h-9 bg-yellow-200/90 rounded-md border border-yellow-400/50 shadow-inner flex flex-col justify-evenly px-2">
                                                            <div className="w-full h-px bg-yellow-400/50"></div>
                                                            <div className="w-full h-px bg-yellow-400/50"></div>
                                                            <div className="w-full h-px bg-yellow-400/50"></div>
                                                        </div>
                                                        <div className="font-black italic text-xl opacity-90 tracking-wider">BANK</div>
                                                    </div>

                                                    <div className="relative z-10 space-y-6">
                                                        <div className="text-xl md:text-2xl font-mono tracking-widest uppercase font-semibold text-white/90 whitespace-nowrap">
                                                            {newCardDetails.number ? newCardDetails.number.replace(/(\d{4})(?=\d)/g, '$1 ') : '•••• •••• •••• ••••'}
                                                        </div>
                                                        <div className="flex justify-between items-end">
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1">Cardholder Name</p>
                                                                <p className="font-bold tracking-widest uppercase text-sm truncate max-w-[150px]">{newCardDetails.name || 'YOUR NAME'}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1">Expires</p>
                                                                <p className="font-bold tracking-widest font-mono text-sm">{newCardDetails.expiryMonth || 'MM'}/{newCardDetails.expiryYear || 'YY'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Form */}
                                            <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100">
                                                <h3 className="text-xl font-black text-adorix-dark mb-6">Payment Details</h3>
                                                <form onSubmit={handleSaveCard} className="space-y-5">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Card Number</label>
                                                        <div className="relative">
                                                            <input type="text" maxLength="19" required value={newCardDetails.number.replace(/(\d{4})(?=\d)/g, '$1 ')} onChange={e => setNewCardDetails({ ...newCardDetails, number: e.target.value.replace(/\D/g, '').slice(0, 16) })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-adorix-primary focus:ring-4 focus:ring-adorix-primary/10 font-mono pr-12" placeholder="0000 0000 0000 0000" />
                                                            <button type="button" onClick={startScanner} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-adorix-primary hover:bg-adorix-primary/10 rounded-lg transition-all focus:outline-none" title="Scan Card">
                                                                <Camera className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cardholder Name</label>
                                                        <input type="text" required value={newCardDetails.name} onChange={e => setNewCardDetails({ ...newCardDetails, name: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-adorix-primary focus:ring-4 focus:ring-adorix-primary/10 uppercase" placeholder="JOHN DOE" />
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="col-span-1 space-y-2">
                                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center block">Month</label>
                                                            <input type="text" maxLength="2" required placeholder="MM" value={newCardDetails.expiryMonth} onChange={e => setNewCardDetails({ ...newCardDetails, expiryMonth: e.target.value.replace(/\D/g, '') })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-adorix-primary focus:ring-4 focus:ring-adorix-primary/10 text-center font-mono" />
                                                        </div>
                                                        <div className="col-span-1 space-y-2">
                                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center block">Year</label>
                                                            <input type="text" maxLength="2" required placeholder="YY" value={newCardDetails.expiryYear} onChange={e => setNewCardDetails({ ...newCardDetails, expiryYear: e.target.value.replace(/\D/g, '') })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-adorix-primary focus:ring-4 focus:ring-adorix-primary/10 text-center font-mono" />
                                                        </div>
                                                        <div className="col-span-1 space-y-2">
                                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center block">CVV</label>
                                                            <input type="password" maxLength="3" required placeholder="•••" value={newCardDetails.cvv} onChange={e => setNewCardDetails({ ...newCardDetails, cvv: e.target.value.replace(/\D/g, '') })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-adorix-primary focus:ring-4 focus:ring-adorix-primary/10 text-center font-mono" />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 pt-4">
                                                        <button type="button" onClick={() => setIsAddingCard(false)} className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-black hover:bg-gray-50 transition-all">Cancel</button>
                                                        <button type="submit" className="flex-[2] py-3.5 bg-adorix-dark text-white rounded-xl font-black hover:bg-black transition-all shadow-lg shadow-adorix-dark/30">Save Card</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Sidebar Navigation */}
                    <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-28">
                        <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-adorix-dark/5 border border-gray-100">
                            <div className="flex items-center gap-3 mb-8 px-2">
                                <div className="w-10 h-10 rounded-2xl bg-adorix-light flex items-center justify-center">
                                    <Settings className="w-5 h-5 text-adorix-primary" />
                                </div>
                                <h2 className="text-xl font-black text-adorix-dark tracking-tight">General Settings</h2>
                            </div>

                            {/* Main Navigation Tabs */}
                            <div className="space-y-3 mb-8">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-sm transition-all group ${activeTab === tab.id
                                            ? 'bg-adorix-dark text-white shadow-xl shadow-adorix-dark/20 translate-x-1'
                                            : 'text-gray-400 hover:text-adorix-dark hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tab.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'text-white' : 'opacity-50'}`} />
                                            {tab.label}
                                        </div>
                                        {activeTab === tab.id && <ChevronRight className="w-4 h-4 text-white/50" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>

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

                    {isScanning && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={stopScanner} className="absolute inset-0 bg-adorix-dark/80 backdrop-blur-md cursor-pointer" />
                            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10 p-2 border border-gray-100">
                                <div className="p-4 bg-white text-adorix-dark font-black text-xl flex justify-between items-center rounded-t-[2rem]">
                                    <span>Scan Card</span>
                                    <button onClick={stopScanner} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                                </div>
                                <div className="relative mx-2 aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-inner">
                                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 aspect-[1.586/1] border-2 border-white/50 rounded-2xl flex items-center justify-center shadow-[0_0_0_999px_rgba(0,0,0,0.6)]">
                                        <div className="absolute top-0 w-full h-1 bg-adorix-primary/50 shadow-[0_0_15px_5px_rgba(37,99,235,0.4)] animate-[scan_2s_ease-in-out_infinite]" />
                                        <p className="text-white/90 font-bold text-xs bg-black/60 px-4 py-2 rounded-full backdrop-blur-md">Position card within frame</p>
                                    </div>
                                    <div className="absolute inset-0 border-[6px] border-black/20 pointer-events-none rounded-3xl"></div>
                                </div>
                                <div className="p-4 mt-2">
                                    <button onClick={handleScanCard} disabled={isProcessingImage} className="w-full py-4 bg-adorix-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-adorix-primary/30 hover:bg-adorix-dark transition-all flex items-center justify-center gap-2">
                                        {isProcessingImage ? <><Loader2 className="w-5 h-5 animate-spin" /> Scanning Image...</> : 'Extract Card Number'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
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
