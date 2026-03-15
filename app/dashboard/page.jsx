'use client';

import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import {
    Activity, Clock, Eye, Zap, TrendingUp,
    Play, RefreshCw, MonitorPlay, ChevronRight
} from 'lucide-react';

const generateInitialData = () =>
    Array.from({ length: 14 }, (_, i) => ({
        time: `${9 + i}:00`,
        viewers: Math.floor(Math.random() * 60) + 30,
        interactions: Math.floor(Math.random() * 30) + 10,
        conversions: Math.floor(Math.random() * 15) + 2,
    }));

const AGE_RANGE_DATA = [
    { name: '10–15', value: 12, color: '#F59E0B' },
    { name: '16–29', value: 34, color: '#12B2C1' },
    { name: '30–39', value: 24, color: '#8B5CF6' },
    { name: '40–49', value: 16, color: '#0D8A9E' },
    { name: '50–59', value: 9, color: '#23717B' },
    { name: '60+', value: 5, color: '#1F2B2D' },
];

const PERF_METRICS = [
    { label: 'Audience Reach', val: 91, color: '#12B2C1' },
    { label: 'Dwell Engagement', val: 78, color: '#0D8A9E' },
    { label: 'Conversion Rate', val: 64, color: '#8B5CF6' },
    { label: 'Return Visitor Rate', val: 47, color: '#F59E0B' },
    { label: 'Content Completion', val: 85, color: '#10B981' },
];

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
    const { isLoaded } = useUser();

    const [data, setData] = useState(generateInitialData);
    const [liveViewers, setLiveViewers] = useState(42);
    const [selectedRange, setSelectedRange] = useState('Today');
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const dataInterval = setInterval(() => {
            setData(d => {
                const newPoint = {
                    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    viewers: Math.floor(Math.random() * 60) + 30,
                    interactions: Math.floor(Math.random() * 30) + 10,
                    conversions: Math.floor(Math.random() * 15) + 2,
                };
                return [...d.slice(1), newPoint];
            });
            setLiveViewers(v => Math.max(10, v + Math.round((Math.random() - 0.45) * 5)));
        }, 3000);
        const clockInterval = setInterval(() => setTime(new Date()), 1000);
        return () => { clearInterval(dataInterval); clearInterval(clockInterval); };
    }, []);

    const STATS = [
        { label: 'Total Impressions', val: '14,205', icon: Eye, accent: 'bg-adorix-primary/10 text-adorix-primary', border: 'border-l-adorix-primary', sub: '+12% vs yesterday' },
        { label: 'Live Visitors', val: liveViewers, icon: Activity, accent: 'bg-red-50 text-red-500', border: 'border-l-red-400', sub: 'Currently at kiosk', live: true },
        { label: 'Avg. Dwell Time', val: '14.2s', icon: Clock, accent: 'bg-violet-50 text-violet-500', border: 'border-l-violet-400', sub: '+1.4s increase' },
        { label: 'Engagement Rate', val: '28%', icon: Zap, accent: 'bg-amber-50 text-amber-500', border: 'border-l-amber-400', sub: 'High performance' },
    ];

    const ranges = ['Today', '7 Days', '30 Days', 'All Time'];

    if (!isLoaded) return null;

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-16">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mb-6 flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-adorix-dark">Campaign Monitor</h1>
                    <p className="text-sm text-gray-400 mt-0.5">
                        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        {' · '}
                        <span className="font-mono">{time.toLocaleTimeString()}</span>
                    </p>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                            <div>
                                <h3 className="text-base font-bold text-adorix-dark">Audience Traffic</h3>
                                <p className="text-xs text-gray-400 mt-0.5">Visitors · Interactions · Conversions</p>
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
                        <div className="h-48 sm:h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
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
                                    <Area type="monotone" dataKey="interactions" stroke="#0D8A9E" strokeWidth={2} fill="transparent" dot={false} />
                                    <Area type="monotone" dataKey="conversions" stroke="#8B5CF6" strokeWidth={2} fill="transparent" dot={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-sm font-bold text-adorix-dark mb-0.5">Interaction by Age</h3>
                            <div className="flex items-center gap-4">
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={AGE_RANGE_DATA} cx="50%" cy="50%" innerRadius={28} outerRadius={46} dataKey="value" strokeWidth={0} paddingAngle={3}>
                                                {AGE_RANGE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 space-y-2">
                                    {AGE_RANGE_DATA.map(d => (
                                        <div key={d.name} className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-1.5 font-bold">
                                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                                <span className="text-[11px] text-gray-500">{d.name}</span>
                                            </div>
                                            <span className="text-[11px] font-semibold text-adorix-dark">{d.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
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
                            <p className="text-2xl font-bold text-adorix-dark mt-1">{s.val}</p>
                            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
