'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useSupabase } from '@/hooks/useSupabase';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import {
    Activity, Clock, Eye, Zap, TrendingUp,
    Play, RefreshCw, MonitorPlay, ChevronRight
} from 'lucide-react';

const COLORS = ['#12B2C1', '#0D8A9E', '#8B5CF6', '#F59E0B', '#10B981', '#1F2B2D'];

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-adorix-dark text-white rounded-xl px-4 py-3 text-xs shadow-xl min-w-[130px]">
            <p className="text-adorix-accent font-semibold mb-2">{label}</p>
            {payload.map((p) => (
                <div key={p.name} className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
                    <span className="text-gray-300 capitalize">{p.name}:</span>
                    <span className="font-bold ml-auto pl-3">{p.value}</span>
                </div>
            ))}
        </div>
    );
};

const Dashboard = () => {
    const { userId, isLoaded } = useAuth();
    const supabase = useSupabase();

    const [analytics, setAnalytics] = useState([]);
    const [selectedRange, setSelectedRange] = useState('Today');
    const [currentTime, setCurrentTime] = useState(new Date());

    // 1. Fetch Initial Data & Setup Real-time
    useEffect(() => {
        if (!isLoaded || !userId || !supabase) return;

        const fetchAnalytics = async () => {
            const { data, error } = await supabase
                .from('analytics')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: true });

            if (error) {
                console.error("Error fetching analytics:", error);
            } else {
                setAnalytics(data || []);
            }
        };

        fetchAnalytics();

        // Real-time subscription
        const channel = supabase
            .channel('realtime-analytics')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'analytics',
                    filter: `user_id=eq.${userId}`
                },
                (payload) => {
                    console.log('Live Analytics Update:', payload.new);
                    setAnalytics(prev => [...prev, payload.new]);
                }
            )
            .subscribe();

        const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);

        return () => {
            supabase.removeChannel(channel);
            clearInterval(clockInterval);
        };
    }, [isLoaded, userId, supabase]);

    // 2. Process Data for Charts
    const processedData = useMemo(() => {
        // Group by 10-minute intervals for the traffic chart
        const groups = {};
        analytics.forEach(row => {
            const date = new Date(row.created_at);
            const hour = date.getHours();
            const minute = Math.floor(date.getMinutes() / 10) * 10;
            const timeKey = `${hour}:${minute === 0 ? '00' : minute}`;
            
            if (!groups[timeKey]) {
                groups[timeKey] = { time: timeKey, viewers: 0, interactions: 0, conversions: 0 };
            }
            groups[timeKey].viewers += 1;
            if (row.interaction_type === 'click' || row.interaction_type === 'interaction') {
                groups[timeKey].interactions += 1;
            }
        });
        
        const chartData = Object.values(groups).sort((a, b) => {
            const [ha, ma] = a.time.split(':').map(Number);
            const [hb, mb] = b.time.split(':').map(Number);
            return ha !== hb ? ha - hb : ma - mb;
        });

        // Age data
        const ageGroups = {};
        analytics.forEach(row => {
            const age = row.viewer_age || 'Unknown';
            ageGroups[age] = (ageGroups[age] || 0) + 1;
        });
        const ageData = Object.entries(ageGroups).map(([name, value], i) => ({
            name,
            value: Math.round((value / analytics.length) * 100) || 0,
            color: COLORS[i % COLORS.length]
        }));

        return { chartData, ageData };
    }, [analytics]);

    const STATS = [
        { 
            label: 'Total Impressions', 
            val: analytics.length.toLocaleString(), 
            icon: Eye, accent: 'bg-adorix-primary/10 text-adorix-primary', 
            border: 'border-l-adorix-primary', 
            sub: 'Lifetime views' 
        },
        { 
            label: 'Live Visitors', 
            val: analytics.filter(a => (new Date() - new Date(a.created_at)) < 300000).length, 
            icon: Activity, accent: 'bg-red-50 text-red-500', 
            border: 'border-l-red-400', 
            sub: 'Active in last 5m', live: true 
        },
        { 
            label: 'Engagement Rate', 
            val: analytics.length > 0 ? `${Math.round((analytics.filter(a => a.interaction_type !== 'view').length / analytics.length) * 100)}%` : '0%', 
            icon: Zap, accent: 'bg-amber-50 text-amber-500', 
            border: 'border-l-amber-400', 
            sub: 'Interaction vs View' 
        },
        { 
            label: 'Avg. Duration', 
            val: analytics.length > 0 ? `${Math.round(analytics.reduce((acc, curr) => acc + (curr.view_duration || 0), 0) / analytics.length)}s` : '0s', 
            icon: Clock, accent: 'bg-violet-50 text-violet-500', 
            border: 'border-l-violet-400', 
            sub: 'Per session average' 
        },
    ];

    const ranges = ['Today', '7 Days', '30 Days', 'All Time'];

    if (!isLoaded) return (
        <div className="min-h-screen flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-adorix-primary animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-16">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mb-6 flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-adorix-dark">Real-time Campaign Monitor</h1>
                    <p className="text-sm text-gray-400 mt-0.5">
                        {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        {' · '}
                        <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
                    </p>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 space-y-5">
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                            <div className="flex items-center gap-3">
                                <div>
                                    <h3 className="text-base font-bold text-adorix-dark">Audience Traffic</h3>
                                    <p className="text-xs text-gray-400 mt-0.5">Live view frequency</p>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50 text-red-500 rounded-lg text-[10px] font-bold animate-pulse uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                    Live
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                                {ranges.map(r => (
                                    <button
                                        key={r} onClick={() => setSelectedRange(r)}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition ${selectedRange === r ? 'bg-white text-adorix-dark shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >{r}</button>
                                ))}
                            </div>
                        </div>
                        <div className="h-48 sm:h-72">
                            {processedData.chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={processedData.chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="gViewer" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#12B2C1" stopOpacity={0.25} />
                                                <stop offset="95%" stopColor="#12B2C1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                        <XAxis dataKey="time" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="viewers" stroke="#12B2C1" strokeWidth={2} fill="url(#gViewer)" dot={false} />
                                        <Area type="monotone" dataKey="interactions" stroke="#8B5CF6" strokeWidth={2} fill="transparent" dot={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                                    <TrendingUp className="w-8 h-8 opacity-20" />
                                    <p className="text-xs font-medium">Waiting for campaign data...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {STATS.map((s, i) => (
                        <div key={i} className={`bg-white rounded-xl p-5 border border-gray-100 border-l-4 ${s.border} shadow-sm`}>
                            <div className="flex items-center justify-between mb-3">
                                <span className={`p-2 rounded-lg ${s.accent}`}>
                                    <s.icon className="w-4 h-4" />
                                </span>
                                {s.live && (
                                    <span className="flex items-center gap-1 text-xs text-red-500 font-semibold">
                                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> Live
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                            <p className="text-2xl font-bold text-adorix-dark mt-1">
                                {s.val}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

