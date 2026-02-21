"use client";
import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid
} from 'recharts';
import { Activity, Users, Clock, Eye, Zap, TrendingUp, ArrowUpRight } from 'lucide-react';

// Mock data generator for initial state
const generateInitialData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    time: `${10 + i}:00`,
    viewers: Math.floor(Math.random() * 50) + 20,
    interactions: Math.floor(Math.random() * 20) + 5,
  }));
};

const Dashboard = () => {
  const [data, setData] = useState(generateInitialData());
  const [liveViewers, setLiveViewers] = useState(42);

  // Simulate Real-Time Updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update chart data
      setData(currentData => {
        const newDataPoint = {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          viewers: Math.floor(Math.random() * 60) + 30,
          interactions: Math.floor(Math.random() * 30) + 10,
        };
        return [...currentData.slice(1), newDataPoint];
      });

      // Update live counter
      setLiveViewers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 3000); // Updates every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-28 px-6 pb-20 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-adorix-dark">Live Campaign Monitor</h1>
          <p className="text-adorix-secondary">Real-time analytics for Kiosk #ADX-001</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-adorix-accent/20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="font-bold text-adorix-dark text-sm">LIVE UPDATES ACTIVE</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Impressions', val: '14,205', icon: Eye, sub: '+12% from yesterday' },
          { label: 'Active Interactions', val: liveViewers, icon: Users, sub: 'Currently watching', active: true },
          { label: 'Avg. Watch Time', val: '14.2s', icon: Clock, sub: '+1.4s increase' },
          { label: 'Engagement Rate', val: '28%', icon: Zap, sub: 'High performance' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-adorix-primary/10 hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.active ? 'bg-red-50 text-red-500' : 'bg-adorix-light text-adorix-primary'}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              {stat.active && <Activity className="w-5 h-5 text-red-500 animate-pulse" />}
            </div>
            <h3 className="text-adorix-secondary text-sm font-medium">{stat.label}</h3>
            <div className="text-3xl font-bold text-adorix-dark mt-1">{stat.val}</div>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 mt-2 bg-emerald-50 w-fit px-2 py-1 rounded">
              <TrendingUp className="w-3 h-3" /> {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Live Traffic Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-adorix-primary/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-adorix-dark">Live Audience Traffic</h3>
            <button className="text-adorix-primary text-sm font-semibold hover:underline flex items-center gap-1">
              View Report <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViewers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D8A9E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0D8A9E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5F9F8" />
                <XAxis dataKey="time" stroke="#23717B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#23717B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2B2D', color: '#fff', borderRadius: '8px', border: 'none' }}
                  itemStyle={{ color: '#12B2C1' }}
                />
                <Area
                  type="monotone"
                  dataKey="viewers"
                  stroke="#0D8A9E"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorViewers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-adorix-primary/10">
          <h3 className="text-xl font-bold text-adorix-dark mb-6">Interaction Types</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.slice(-5)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5F9F8" />
                <XAxis dataKey="time" stroke="#23717B" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: '#E5F9F8' }}
                  contentStyle={{ backgroundColor: '#1F2B2D', color: '#fff', borderRadius: '8px', border: 'none' }}
                />
                <Bar dataKey="interactions" fill="#12B2C1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;