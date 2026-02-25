import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  Activity, Clock, Eye, Zap, TrendingUp,
  Play, RefreshCw, MonitorPlay, ChevronRight
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────
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

// ─── Tooltip ─────────────────────────────────────────────────────────────────
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

// ─── Dashboard ───────────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-adorix-dark">Campaign Monitor</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            {' · '}
            <span className="font-mono">{time.toLocaleTimeString()}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-adorix-dark">Sahan Adithya</p>
            <p className="text-xs text-gray-400">AI Interaction Designer</p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-adorix-primary text-white font-bold text-sm flex items-center justify-center ring-2 ring-adorix-primary/20 hover:ring-adorix-primary/50 transition"
            title="View Profile"
          >
            SA
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 space-y-6">

        {/* ── Charts Row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Area Chart */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gViewer" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#12B2C1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#12B2C1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gInteract" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D8A9E" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#0D8A9E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gConvert" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="time" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="viewers" stroke="#12B2C1" strokeWidth={2} fill="url(#gViewer)" dot={false} activeDot={{ r: 4, fill: '#12B2C1' }} />
                  <Area type="monotone" dataKey="interactions" stroke="#0D8A9E" strokeWidth={2} fill="url(#gInteract)" dot={false} activeDot={{ r: 4, fill: '#0D8A9E' }} />
                  <Area type="monotone" dataKey="conversions" stroke="#8B5CF6" strokeWidth={2} fill="url(#gConvert)" dot={false} activeDot={{ r: 4, fill: '#8B5CF6' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-5 mt-3 justify-end">
              {[['#12B2C1', 'Visitors'], ['#0D8A9E', 'Interactions'], ['#8B5CF6', 'Conversions']].map(([c, l]) => (
                <span key={l} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full" style={{ background: c }} /> {l}
                </span>
              ))}
            </div>
          </div>

          {/* Side: Age breakdown + bar chart */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-adorix-dark mb-0.5">Interaction by Age</h3>
              <p className="text-xs text-gray-400 mb-4">Who's engaging at the kiosk</p>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={AGE_RANGE_DATA} cx="50%" cy="50%" innerRadius={28} outerRadius={46}
                        dataKey="value" strokeWidth={0} paddingAngle={3}>
                        {AGE_RANGE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {AGE_RANGE_DATA.map(d => (
                    <div key={d.name} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                        <span className="text-[11px] text-gray-500">{d.name}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-adorix-dark">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-adorix-dark mb-3">Recent Interactions</h3>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.slice(-6)} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
                    <Bar dataKey="interactions" radius={[3, 3, 0, 0]}>
                      {data.slice(-6).map((_, i) => (
                        <Cell key={i} fill={i === 5 ? '#12B2C1' : '#D1FAF8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stat Cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl p-5 border border-gray-100 border-l-4 ${s.border} shadow-sm`}
            >
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

        {/* ── Bottom Row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Performance metrics */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-adorix-dark">Performance Score</h3>
                <p className="text-xs text-gray-400 mt-0.5">Top 15% of all kiosk accounts</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-adorix-dark">82<span className="text-base text-gray-400 font-normal">/100</span></p>
                <p className="text-xs text-emerald-500 font-medium mt-0.5 flex items-center gap-1 justify-end">
                  <TrendingUp className="w-3 h-3" /> Excellent
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap mb-6">
              {[
                { label: 'Best Day', val: 'Saturday' },
                { label: 'Peak Hour', val: '3–5 PM' },
                { label: 'Top Group', val: '16–29 yrs' },
              ].map(b => (
                <div key={b.label} className="bg-gray-50 px-4 py-2.5 rounded-lg">
                  <p className="text-xs text-gray-400">{b.label}</p>
                  <p className="text-sm font-bold text-adorix-dark mt-0.5">{b.val}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
              {PERF_METRICS.map(m => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-500">{m.label}</span>
                    <span className="font-semibold text-adorix-dark">{m.val}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.val}%`, background: m.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-adorix-dark rounded-xl p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-white font-bold text-base">Quick Actions</h3>
              <p className="text-gray-400 text-xs mt-0.5">Manage your kiosks</p>
            </div>
            <div className="space-y-2 flex-1">
              {[
                { icon: Play, label: 'Launch Campaign', sub: 'Start a new ad' },
                { icon: MonitorPlay, label: 'Preview Kiosk', sub: 'Live view mode' },
                { icon: RefreshCw, label: 'Sync Data', sub: 'Refresh metrics' },
              ].map((a, i) => (
                <button
                  key={i}
                  onClick={() => navigate('/dashboard/studio')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-left group"
                >
                  <a.icon className="w-4 h-4 text-adorix-accent flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{a.label}</p>
                    <p className="text-gray-400 text-xs">{a.sub}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-adorix-accent transition flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;