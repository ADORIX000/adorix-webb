import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Settings, CreditCard, Shield, Bell, Eye, Camera, Mail, Phone,
  MapPin, Briefcase, Calendar, TrendingUp, Activity, Zap, Download,
  Copy, Check, Edit2, Save, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const recentActivity = [
    { action: 'Campaign "Summer Sale" started', time: '2 hours ago', type: 'success' },
    { action: 'Device #3 went offline', time: '5 hours ago', type: 'warning' },
    { action: 'Payment processed successfully', time: '1 day ago', type: 'success' },
    { action: 'New AI insight available', time: '2 days ago', type: 'info' },
  ];

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('adorix_sk_live_1234567890abcdef');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-28 px-6 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Profile Header with Cover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-adorix-dark to-gray-900 rounded-3xl overflow-hidden mb-8 shadow-xl"
        >
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-adorix-primary/20 to-adorix-accent/20 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8 -mt-16 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-adorix-primary to-adorix-accent p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-16 h-16 text-adorix-secondary" />
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 bg-adorix-primary text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 right-0 bg-emerald-500 border-4 border-gray-900 w-8 h-8 rounded-full"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left text-white">
                <h1 className="text-3xl font-bold mb-2">Alex Morgan</h1>
                <p className="text-white/70 mb-3">Marketing Manager @ TechCorp</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Pro Plan
                  </span>
                  <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    Member since Jan 2024
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold transition-colors">
                  <Edit2 className="w-4 h-4 inline mr-2" />
                  Edit Profile
                </button>
                <Link
                  to="/settings/account"
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-x-auto">
          <div className="flex gap-2 p-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id
                    ? 'bg-adorix-dark text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                            stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                              stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                'bg-orange-50 text-orange-600'
                          }`}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                      <p className="text-xs text-gray-400">{stat.change}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'success' ? 'bg-emerald-500' :
                              activity.type === 'warning' ? 'bg-orange-500' :
                                'bg-blue-500'
                            }`}></div>
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-400">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-adorix-primary to-adorix-secondary p-6 rounded-2xl text-white shadow-lg">
                      <h3 className="font-bold mb-2">API Access</h3>
                      <p className="text-sm text-white/80 mb-4">Your secret key</p>
                      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mb-3 font-mono text-xs break-all">
                        adorix_sk_live_1234...
                      </div>
                      <button
                        onClick={handleCopyApiKey}
                        className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy Key'}
                      </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                      <div className="space-y-2">
                        <Link to="/dashboard/studio" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                          Create Campaign
                        </Link>
                        <Link to="/dashboard" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                          View Analytics
                        </Link>
                        <Link to="/payment-method" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                          Manage Billing
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ACCOUNT INFO TAB */}
            {activeTab === 'account' && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Account Information</h2>
                  <button className="px-6 py-3 bg-adorix-primary hover:bg-adorix-secondary text-white rounded-xl font-bold transition-colors">
                    Save Changes
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Alex Morgan"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-adorix-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue="alex.morgan@techcorp.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-adorix-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-adorix-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      defaultValue="TechCorp"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-adorix-primary transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      defaultValue="San Francisco, CA"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-adorix-primary transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                    <textarea
                      rows="4"
                      defaultValue="Marketing professional with 5+ years of experience in digital advertising and AI-powered campaigns."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-adorix-primary transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
                  <div className="space-y-4 max-w-xl">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-adorix-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-adorix-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-adorix-primary transition-colors"
                      />
                    </div>
                    <button className="px-6 py-3 bg-adorix-primary hover:bg-adorix-secondary text-white rounded-xl font-bold transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Two-Factor Authentication</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">Enable 2FA</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-6 py-3 bg-adorix-light text-adorix-primary rounded-xl font-bold hover:bg-adorix-primary hover:text-white transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* BILLING TAB */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Plan</h2>
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-adorix-light to-white rounded-xl border border-adorix-primary/20">
                    <div>
                      <h3 className="text-2xl font-bold text-adorix-dark mb-2">Pro Plan</h3>
                      <p className="text-gray-600">$49/month • Renews on Feb 15, 2026</p>
                    </div>
                    <Link to="/pricing" className="px-6 py-3 bg-adorix-dark hover:bg-adorix-primary text-white rounded-xl font-bold transition-colors">
                      Upgrade Plan
                    </Link>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                  <div className="flex items-center gap-4 p-6 border border-gray-200 rounded-xl">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/2026</p>
                    </div>
                    <button className="text-adorix-primary font-bold hover:underline">Edit</button>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing History</h2>
                  <div className="space-y-3">
                    {[
                      { date: 'Jan 15, 2026', amount: '$49.00', status: 'Paid' },
                      { date: 'Dec 15, 2025', amount: '$49.00', status: 'Paid' },
                      { date: 'Nov 15, 2025', amount: '$49.00', status: 'Paid' },
                    ].map((invoice, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-bold text-gray-900">{invoice.date}</p>
                          <p className="text-sm text-gray-500">{invoice.amount}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                            {invoice.status}
                          </span>
                          <button className="text-adorix-primary hover:underline font-bold flex items-center gap-1">
                            <Download className="w-4 h-4" /> Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Email notifications', desc: 'Receive email updates about your campaigns' },
                      { label: 'Campaign alerts', desc: 'Get notified when campaigns start or stop' },
                      { label: 'Device status', desc: 'Alerts when devices go online/offline' },
                      { label: 'Weekly reports', desc: 'Receive weekly performance summaries' },
                    ].map((pref, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                        <div>
                          <p className="font-bold text-gray-900">{pref.label}</p>
                          <p className="text-sm text-gray-500">{pref.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-adorix-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Display Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-adorix-primary transition-colors">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Timezone</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-adorix-primary transition-colors">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Central Time (CT)</option>
                      </select>
                    </div>
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

export default Profile;