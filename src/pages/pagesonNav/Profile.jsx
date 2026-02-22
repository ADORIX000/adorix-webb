import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Settings, CreditCard, Shield, Bell, Eye, Camera, Mail, Phone,
  MapPin, Briefcase, Calendar, TrendingUp, Activity, Zap, Download,
  Copy, Check, Edit2, Save, X, Loader2, Sparkles, Globe, Terminal,
  LogOut, ShieldCheck, FileKey
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);

  // File Refs
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);

  // Profile Data State
  const [profileData, setProfileData] = useState({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    bio: 'Marketing professional with 5+ years of experience in digital advertising and AI-powered campaigns.',
    role: 'Marketing Manager',
    plan: 'Pro Plan',
    memberSince: 'Jan 2024',
    isPro: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'avatar') setAvatarUrl(url);
      else setCoverUrl(url);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of ADORIX?")) {
      console.log("Logging out...");
      window.location.href = '/'; // Simple redirect for now
    }
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('adorix_sk_live_1234567890abcdef');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'account', label: 'Account Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Settings },
  ];

  const stats = [
    { label: 'Active Campaigns', value: '12', change: '+3 this month', icon: Zap, color: 'blue' },
    { label: 'Total Devices', value: '5', change: '2 online now', icon: Activity, color: 'emerald' },
    { label: 'Engagement Rate', value: '84%', change: '+12% vs last month', icon: TrendingUp, color: 'purple' },
    { label: 'Total Spend', value: '$4,250', change: '75% of budget', icon: CreditCard, color: 'orange' },
  ];

  return (
    <div className="pt-28 px-6 pb-20 min-h-screen bg-[#f8fafc]">
      {/* Hidden Inputs */}
      <input
        type="file"
        ref={profileInputRef}
        onChange={(e) => handleFileChange(e, 'avatar')}
        className="hidden"
        accept="image/*"
      />
      <input
        type="file"
        ref={coverInputRef}
        onChange={(e) => handleFileChange(e, 'cover')}
        className="hidden"
        accept="image/*"
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            Profile updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-[2rem] overflow-hidden mb-8 shadow-xl shadow-adorix-dark/5 border border-gray-100"
        >
          {/* Cover Photo */}
          <div
            className="h-44 bg-gradient-to-r from-adorix-dark via-gray-900 to-adorix-dark relative overflow-hidden group cursor-pointer"
            onClick={() => coverInputRef.current.click()}
          >
            {coverUrl ? (
              <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-adorix-primary/20 rounded-full blur-[100px]"></div>
                <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-adorix-accent/20 rounded-full blur-[100px]"></div>
              </>
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Profile Details Area */}
          <div className="px-10 pb-10">
            <div className="flex flex-col md:flex-row items-end gap-8 -mt-16 relative z-10">
              {/* Circular Avatar */}
              <div className="relative group mx-auto md:mx-0">
                <div className="w-40 h-40 rounded-full bg-white p-1 shadow-2xl transition-transform hover:scale-105">
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-gray-50">
                    <img
                      src={avatarUrl || `https://ui-avatars.com/api/?name=${profileData.fullName}&background=0D8A9E&color=fff&size=200`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <button
                  onClick={() => profileInputRef.current.click()}
                  className="absolute bottom-1 right-1 bg-adorix-dark text-white p-3 rounded-full shadow-xl hover:bg-adorix-primary transition-colors border-4 border-white group-hover:scale-110"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Identity & Status */}
              <div className="flex-1 pb-2 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-4xl font-black text-adorix-dark tracking-tight flex items-center gap-2 justify-center md:justify-start">
                    {profileData.fullName}
                    {profileData.isPro && (
                      <BadgeCheck className="w-8 h-8 text-blue-500 fill-blue-50" />
                    )}
                  </h1>
                </div>
                <p className="text-gray-500 font-medium flex items-center gap-4 flex-wrap justify-center md:justify-start">
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-adorix-primary" /> {profileData.role} @ {profileData.company}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-adorix-secondary" /> {profileData.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-purple-500" /> Joined {profileData.memberSince}</span>
                </p>
              </div>

              {/* Main Actions */}
              <div className="flex gap-3 pb-2 justify-center">
                <button
                  onClick={() => setActiveTab('account')}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-adorix-dark rounded-2xl font-black transition-all flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button className="p-3 bg-adorix-dark hover:bg-adorix-primary text-white rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95">
                  <Settings className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
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
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'animate-bounce' : ''}`} />
              <span className="tracking-tight">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div layoutId="tab-pill" className="absolute inset-0 bg-adorix-dark rounded-2xl -z-10" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Stats */}
                <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                        stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                          stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                            'bg-orange-50 text-orange-600'
                        }`}>
                        <stat.icon className="w-7 h-7" />
                      </div>
                      <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                      <h3 className="text-3xl font-black text-adorix-dark mb-2 tracking-tighter">{stat.value}</h3>
                      <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.change}</span>
                    </div>
                  ))}
                </div>

                {/* Main Activity */}
                <div className="lg:col-span-3 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black text-adorix-dark flex items-center gap-3">
                      <Terminal className="w-6 h-6 text-adorix-primary" /> Recent Activity
                    </h3>
                    <button className="text-adorix-primary font-black text-sm hover:underline">View All Logs</button>
                  </div>
                  <div className="space-y-6">
                    {[
                      { action: 'Campaign "Summer Sale" published', time: '2h ago', icon: Zap, bg: 'bg-emerald-50', text: 'text-emerald-600' },
                      { action: 'Device #ADX-003 reconnected', time: '5h ago', icon: Globe, bg: 'bg-blue-50', text: 'text-blue-600' },
                      { action: 'Monthly invoice available', time: '1d ago', icon: Download, bg: 'bg-purple-50', text: 'text-purple-600' },
                      { action: 'Plan upgraded to Pro', time: '5d ago', icon: Sparkles, bg: 'bg-amber-50', text: 'text-amber-600' },
                    ].map((act, i) => (
                      <div key={i} className="flex items-center gap-6 p-4 rounded-3xl hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className={`w-12 h-12 rounded-2xl ${act.bg} ${act.text} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <act.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-adorix-dark font-black">{act.action}</p>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{act.time}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-8">
                  <div className="bg-adorix-dark p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                    <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-adorix-accent" /> API Security
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white/10 p-4 rounded-2xl font-mono text-[10px] text-white/60 break-all border border-white/10 leading-relaxed">
                        adorix_sk_live_12345678...
                      </div>
                      <button
                        onClick={handleCopyApiKey}
                        className="w-full bg-white text-adorix-dark py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-adorix-accent transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied' : 'Copy Key'}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-adorix-primary/10 to-transparent p-8 rounded-[2.5rem] border border-adorix-primary/5">
                    <h3 className="font-black text-adorix-dark mb-4">Current Plan</h3>
                    <p className="text-3xl font-black text-adorix-primary mb-2">Pro</p>
                    <p className="text-xs text-gray-500 font-bold mb-6 italic">Next billing: Feb 15, 2026</p>
                    <Link to="/pricing" className="block text-center py-4 bg-white border-2 border-adorix-primary/20 text-adorix-primary font-black rounded-2xl text-sm hover:bg-adorix-primary hover:text-white transition-all shadow-sm">
                      Upgrade Power
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* ACCOUNT INFO TAB - Now Functional */}
            {activeTab === 'account' && (
              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div>
                    <h2 className="text-3xl font-black text-adorix-dark tracking-tight mb-2">Personal Identity</h2>
                    <p className="text-gray-500 font-medium italic">Manage your profile information and how it appears to others.</p>
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="group relative px-10 py-4 bg-adorix-dark text-white rounded-[1.5rem] font-black tracking-tight shadow-2xl hover:bg-adorix-primary transition-all disabled:opacity-70 flex items-center gap-3 active:scale-95 overflow-hidden"
                  >
                    {isSaving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    )}
                    {isSaving ? 'Saving Changes...' : 'Save Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-adorix-dark uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                      <User className="w-3 h-3 text-adorix-primary" /> Full Name
                    </label>
                    <input
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleChange}
                      className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-3xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-adorix-dark uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                      <Mail className="w-3 h-3 text-adorix-secondary" /> Email Address
                    </label>
                    <input
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-3xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-adorix-dark uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                      <Phone className="w-3 h-3 text-purple-500" /> WhatsApp / Phone
                    </label>
                    <input
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-3xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-adorix-dark uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                      <Briefcase className="w-3 h-3 text-blue-500" /> Current Role
                    </label>
                    <input
                      name="role"
                      value={profileData.role}
                      onChange={handleChange}
                      className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-3xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-adorix-dark uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-orange-500" /> Company & Headquarters
                    </label>
                    <input
                      name="location"
                      value={`${profileData.company} — ${profileData.location}`}
                      onChange={(e) => {
                        const [comp, loc] = e.target.value.split(' — ');
                        setProfileData(prev => ({ ...prev, company: comp || '', location: loc || '' }));
                      }}
                      className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-3xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-adorix-dark uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                      <FileText className="w-3 h-3 text-emerald-500" /> Bio / Personal Statement
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-3xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs remain sleek and consistent */}
            {activeTab === 'security' && (
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                    <Shield className="w-32 h-32" />
                  </div>
                  <h2 className="text-3xl font-black text-adorix-dark mb-10 tracking-tight">Security Protocol</h2>
                  <div className="space-y-6 max-w-xl">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-adorix-dark uppercase tracking-[0.2em] ml-2">Current Key</label>
                      <input type="password" placeholder="••••••••••••" className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl px-6 py-4 outline-none focus:border-adorix-primary transition-all font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-adorix-dark uppercase tracking-[0.2em] ml-2">New Secret Key</label>
                      <input type="password" placeholder="Enter new password" className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl px-6 py-4 outline-none focus:border-adorix-primary transition-all font-bold" />
                    </div>
                    <button className="px-10 py-4 bg-adorix-primary text-white rounded-[1.5rem] font-black tracking-tight shadow-xl hover:bg-adorix-dark transition-all">Update Key</button>
                  </div>
                </div>
              </div>
            )}

            {/* Billing - Sleek Card Layout */}
            {activeTab === 'billing' && (
              <div className="max-w-5xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-black mb-8 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-adorix-primary" /> Active Card
                    </h3>
                    <div className="bg-gradient-to-br from-adorix-dark to-gray-800 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-12">
                          <div className="w-12 h-8 bg-amber-400/20 rounded-md backdrop-blur-md border border-amber-400/30"></div>
                          <Globe className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="text-2xl font-mono tracking-[0.2em] mb-8">•••• •••• •••• 4242</p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] uppercase font-black opacity-40 mb-1">Holder</p>
                            <p className="font-bold tracking-widest">{profileData.fullName.toUpperCase()}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black opacity-40 mb-1">Expiry</p>
                            <p className="font-bold">12 / 26</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-black mb-8 flex items-center gap-2">
                      <History className="w-5 h-5 text-adorix-secondary" /> History
                    </h3>
                    <div className="space-y-4">
                      {[
                        { date: 'Jan 15, 2026', amt: 'LKR 575', status: 'PAID' },
                        { date: 'Dec 15, 2025', amt: 'LKR 575', status: 'PAID' },
                        { date: 'Nov 15, 2025', amt: 'LKR 575', status: 'PAID' },
                      ].map((inv, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-adorix-light transition-colors">
                          <div>
                            <p className="font-black text-adorix-dark">{inv.date}</p>
                            <p className="text-xs font-bold text-gray-400">{inv.amt}</p>
                          </div>
                          <button className="p-3 bg-white text-adorix-primary rounded-xl hover:scale-110 transition-transform shadow-sm">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences - Modern Toggles */}
            {activeTab === 'preferences' && (
              <div className="max-w-4xl mx-auto bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm">
                <h2 className="text-3xl font-black text-adorix-dark mb-10 tracking-tight flex items-center gap-4">
                  <Bell className="w-8 h-8 text-adorix-accent animate-pulse" /> Notification Engine
                </h2>
                <div className="space-y-6">
                  {[
                    { title: 'Global Newsletters', desc: 'Updates on new AI models & kiosk features', checked: true },
                    { title: 'Smart Campaign Alerts', desc: 'Automated insights when patterns change', checked: true },
                    { title: 'Security Heartbeat', desc: 'Real-time login & device status pings', checked: false },
                    { title: 'Billing Artifacts', desc: 'Invoices and usage limit reports', checked: true },
                  ].map((pref, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-[2rem] border-2 border-transparent hover:border-adorix-primary/10 transition-all group">
                      <div>
                        <p className="text-lg font-black text-adorix-dark mb-1 group-hover:text-adorix-primary transition-colors">{pref.title}</p>
                        <p className="text-sm text-gray-500 font-medium italic">{pref.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={pref.checked} className="sr-only peer" />
                        <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-adorix-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>

                {/* Privacy & Logout Sections */}
                <div className="mt-12 pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-adorix-primary/20 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-adorix-primary shadow-sm group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-black text-adorix-dark">Privacy Policy</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Legal Compliance</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 font-medium italic mb-6">Review how we protect your data and handle information across the ADORIX mesh network.</p>
                    <button className="text-adorix-primary font-black text-sm hover:underline flex items-center gap-2">
                      <FileKey className="w-4 h-4" /> View Full Policy
                    </button>
                  </div>

                  <div className="p-8 bg-red-50/30 rounded-[2.5rem] border border-red-100 group hover:border-red-200 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm group-hover:rotate-12 transition-transform">
                          <LogOut className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-black text-adorix-dark">Session Management</h3>
                          <p className="text-xs text-red-400 font-bold uppercase tracking-wider">Account Access</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 font-medium italic mb-6">Instantly terminate your current session and exit the workspace dashboard.</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full py-4 bg-red-500 text-white rounded-2xl font-black text-sm hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Internal components to fix missing imports in rewrite
const ChevronRight = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
  </svg>
);

const FileText = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const History = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BadgeCheck = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default Profile
