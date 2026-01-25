import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Settings, CreditCard, AlertCircle, Check, Star, Sparkles,
  LogOut, Shield, FileText, HelpCircle, MessageSquare 
} from 'lucide-react';

const Profile = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    // Added onClick handler to close dropdown when clicking anywhere else
    <div className="pt-28 px-6 pb-20 min-h-screen bg-adorix-light" onClick={() => setIsSettingsOpen(false)}>
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-adorix-primary/10 flex flex-col md:flex-row items-center gap-8 mb-8 relative z-20">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-adorix-primary to-adorix-accent p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <User className="w-16 h-16 text-adorix-secondary" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-emerald-500 border-4 border-white w-6 h-6 rounded-full"></div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-adorix-dark">Alex Morgan</h1>
            <p className="text-adorix-secondary mb-4">Marketing Manager @ TechCorp</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="bg-adorix-light text-adorix-primary px-4 py-1 rounded-full text-sm font-semibold">Pro Plan</span>
              <span className="bg-adorix-light text-adorix-primary px-4 py-1 rounded-full text-sm font-semibold">Member since 2024</span>
            </div>
          </div>

          {/* SETTINGS BUTTON & DROPDOWN SECTION */}
          <div className="relative">
            <button 
              onClick={(e) => { 
                e.stopPropagation(); // Prevents the click from closing the menu immediately
                setIsSettingsOpen(!isSettingsOpen); 
              }}
              className={`p-3 rounded-full border transition ${isSettingsOpen ? 'bg-adorix-dark text-white border-adorix-dark' : 'border-gray-200 hover:bg-gray-50 text-gray-500'}`}
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* The Dropdown Menu */}
            {isSettingsOpen && (
              <div className="absolute right-0 top-16 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                <div className="p-4 border-b border-gray-100 bg-adorix-light/30">
                  <p className="text-xs font-bold text-adorix-secondary uppercase tracking-wider">Account Settings</p>
                </div>
                <div className="py-2">
                  <Link to="/settings/account" className="flex items-center gap-3 px-4 py-3 hover:bg-adorix-light text-gray-700 hover:text-adorix-primary transition">
                    <User className="w-4 h-4" /> Personal Info
                  </Link>
                  <Link to="/settings/security" className="flex items-center gap-3 px-4 py-3 hover:bg-adorix-light text-gray-700 hover:text-adorix-primary transition">
                    <Shield className="w-4 h-4" /> Security
                  </Link>
                  <Link to="/settings/policies" className="flex items-center gap-3 px-4 py-3 hover:bg-adorix-light text-gray-700 hover:text-adorix-primary transition">
                    <FileText className="w-4 h-4" /> Policies
                  </Link>
                  <Link to="/settings/help" className="flex items-center gap-3 px-4 py-3 hover:bg-adorix-light text-gray-700 hover:text-adorix-primary transition">
                    <HelpCircle className="w-4 h-4" /> Help Center
                  </Link>
                  <Link to="/settings/feedback" className="flex items-center gap-3 px-4 py-3 hover:bg-adorix-light text-gray-700 hover:text-adorix-primary transition">
                    <MessageSquare className="w-4 h-4" /> Feedback
                  </Link>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link to="/login" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition font-medium">
                      <LogOut className="w-4 h-4" /> Logout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Stats & AI */}
          <div className="space-y-6">
            
            {/* Account Health */}
            <div className="bg-adorix-dark text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-gray-400 text-sm font-medium mb-1">Total Ad Spend</h3>
                <div className="text-4xl font-bold mb-4">$4,250.00</div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-adorix-accent w-[75%]"></div>
                </div>
                <p className="text-xs text-gray-400">75% of monthly budget used</p>
              </div>
              {/* Decoration */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-adorix-primary opacity-20 rounded-full blur-2xl"></div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-white to-adorix-light border border-adorix-accent/30 p-6 rounded-2xl shadow-sm">
               <div className="flex items-center gap-2 mb-4 text-adorix-primary font-bold">
                  <Sparkles className="w-5 h-5" /> AI Insight
               </div>
               <p className="text-adorix-dark text-sm leading-relaxed mb-4">
                 Based on recent gaze tracking, your "Summer Sale" ad performs <strong>40% better</strong> between 6PM and 8PM.
               </p>
               <div className="bg-white/80 p-3 rounded-lg text-xs text-adorix-secondary border border-adorix-primary/10">
                 <strong>Suggestion:</strong> Increase bid cap during evening hours to maximize ROI.
               </div>
            </div>

          </div>

          {/* RIGHT: Ad Lists */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Currently Running */}
            <div>
              <h3 className="text-xl font-bold text-adorix-dark mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Running Now
              </h3>
              <div className="bg-white p-6 rounded-2xl border border-adorix-primary/10 shadow-sm flex items-center justify-between group hover:border-adorix-primary/30 transition">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-adorix-dark">Summer Sale 2026</h4>
                      <p className="text-sm text-adorix-secondary">Kiosk Cluster A • High Traffic Mode</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-2xl font-bold text-adorix-primary">84%</div>
                    <div className="text-xs text-gray-400">Engagement Score</div>
                 </div>
              </div>
            </div>

            {/* History Table */}
            <div>
              <h3 className="text-xl font-bold text-adorix-dark mb-4">Campaign History</h3>
              <div className="bg-white rounded-2xl border border-adorix-primary/10 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-adorix-light text-adorix-secondary text-sm">
                    <tr>
                      <th className="p-4 font-semibold">Campaign</th>
                      <th className="p-4 font-semibold">Date</th>
                      <th className="p-4 font-semibold">Views</th>
                      <th className="p-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: 'Winter Promo', date: 'Jan 10, 2026', views: '12.5k', status: 'Completed' },
                      { name: 'Black Friday', date: 'Nov 24, 2025', views: '45.2k', status: 'Completed' },
                      { name: 'New Year Launch', date: 'Jan 01, 2026', views: '8.1k', status: 'Paused' },
                    ].map((ad, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="p-4 font-medium text-adorix-dark">{ad.name}</td>
                        <td className="p-4 text-gray-500 text-sm">{ad.date}</td>
                        <td className="p-4 text-adorix-primary font-bold">{ad.views}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            {ad.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;