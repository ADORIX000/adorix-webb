import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import {
  Activity, Clock, Eye, Zap, TrendingUp,
  Play, RefreshCw, MonitorPlay,
  ChevronRight, Star
} from 'lucide-react';

// ─── Data Generators ────────────────────────────────────────────────────────
const generateInitialData = () =>
  Array.from({ length: 14 }, (_, i) => ({
    time: `${9 + i}:00`,
    viewers: Math.floor(Math.random() * 60) + 30,
    interactions: Math.floor(Math.random() * 30) + 10,
    conversions: Math.floor(Math.random() * 15) + 2,
  }));

// Age-range breakdown for kiosk interactions
const AGE_RANGE_DATA = [
  { name: '10 – 15', value: 12, color: '#F59E0B' },
  { name: '16 – 29', value: 34, color: '#12B2C1' },
  { name: '30 – 39', value: 24, color: '#8B5CF6' },
  { name: '40 – 49', value: 16, color: '#0D8A9E' },
  { name: '50 – 59', value: 9, color: '#23717B' },
  { name: '60+', value: 5, color: '#1F2B2D' },
];

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedNumber({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current;
    const end = parseFloat(String(value).replace(/,/g, ''));
    if (isNaN(end)) { setDisplay(value); return; }
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / 700, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (p < 1) requestAnimationFrame(tick);
      else prev.current = end;
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <span>{typeof display === 'number' ? display.toLocaleString() : display}{suffix}</span>;
}

// ─── Radial Ring ─────────────────────────────────────────────────────────────
function RadialRing({ pct, color, size = 72, stroke = 7 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#E5F9F8" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  );
}

// ─── Custom Tooltip ──────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-adorix-dark/95 backdrop-blur-sm text-white rounded-xl p-3 text-xs shadow-2xl border border-adorix-accent/20 min-w-[130px]">
      <p className="text-adorix-accent font-bold mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          <span className="capitalize text-gray-300">{p.name}:</span>
          <span className="font-semibold ml-auto pl-3">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
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
    { label: 'Total Impressions', val: 14205, suffix: '', icon: Eye, color: 'from-adorix-primary to-adorix-accent', ring: 72, sub: '+12% vs yesterday', trend: true },
    { label: 'Live Visitors', val: liveViewers, suffix: '', icon: Activity, color: 'from-red-400 to-rose-500', ring: 61, sub: 'Currently at kiosk', live: true },
    { label: 'Avg. Dwell Time', val: '14.2', suffix: 's', icon: Clock, color: 'from-violet-400 to-purple-600', ring: 55, sub: '+1.4s increase', trend: true },
    { label: 'Engagement Rate', val: '28', suffix: '%', icon: Zap, color: 'from-amber-400 to-orange-500', ring: 28, sub: 'High performance', trend: true },
  ];

  const ranges = ['Today', '7 Days', '30 Days', 'All Time'];

  const PERF_METRICS = [
    { label: 'Audience Reach', val: 91, color: '#12B2C1' },
    { label: 'Dwell Engagement', val: 78, color: '#0D8A9E' },
    { label: 'Conversion Rate', val: 64, color: '#8B5CF6' },
    { label: 'Return Visitor Rate', val: 47, color: '#F59E0B' },
    { label: 'Content Completion', val: 85, color: '#10B981' },
  ];

  return (
    /* pt-28 = clears the fixed global Navbar (h-24 collapsed) */
    <div className="min-h-screen bg-adorix-light pt-28 pb-12">

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div className="max-w-screen-2xl mx-auto px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-adorix-dark tracking-tight">
              Live Campaign Monitor
            </h1>
            <p className="text-sm text-adorix-secondary mt-1">
              {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              &nbsp;·&nbsp;
              <span className="font-mono">{time.toLocaleTimeString()}</span>
            </p>
          </div>


        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="max-w-screen-2xl mx-auto px-8 space-y-8">

        {/* ── Stat Cards ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-6 shadow-sm border border-adorix-primary/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group"
            >
              <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-20 transition-opacity blur-xl`} />

              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color} shadow-lg`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  {s.live && <span className="text-xs font-bold text-red-500 flex items-center gap-1"><Activity className="w-3 h-3 animate-pulse" /> Live</span>}
                  {s.trend && <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +12%</span>}
                </div>
              </div>

              <p className="text-adorix-secondary text-sm font-medium">{s.label}</p>
              <p className="text-3xl font-black text-adorix-dark mt-1 tracking-tight">
                {typeof s.val === 'number'
                  ? <AnimatedNumber value={s.val} suffix={s.suffix} />
                  : <span>{s.val}{s.suffix}</span>
                }
              </p>
              <p className="text-xs text-gray-400 mt-2">{s.sub}</p>

              <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <RadialRing pct={s.ring} color="#0D8A9E" size={52} stroke={5} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Charts Row ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Live Traffic Area Chart */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-adorix-primary/10 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-adorix-dark">Audience Traffic</h3>
                <p className="text-xs text-adorix-secondary mt-0.5">Visitors · Interactions · Conversions</p>
              </div>
              <div className="flex items-center gap-1 bg-adorix-light rounded-xl p-1">
                {ranges.map(r => (
                  <button
                    key={r} onClick={() => setSelectedRange(r)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${selectedRange === r ? 'bg-adorix-dark text-white shadow' : 'text-adorix-secondary hover:text-adorix-dark'
                      }`}
                  >{r}</button>
                ))}
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gViewer" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#12B2C1" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#12B2C1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gInteract" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D8A9E" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#0D8A9E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gConvert" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5F9F8" />
                  <XAxis dataKey="time" stroke="#23717B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#23717B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="viewers" stroke="#12B2C1" strokeWidth={2.5} fill="url(#gViewer)" dot={false} activeDot={{ r: 5, fill: '#12B2C1' }} />
                  <Area type="monotone" dataKey="interactions" stroke="#0D8A9E" strokeWidth={2} fill="url(#gInteract)" dot={false} activeDot={{ r: 5, fill: '#0D8A9E' }} />
                  <Area type="monotone" dataKey="conversions" stroke="#8B5CF6" strokeWidth={2} fill="url(#gConvert)" dot={false} activeDot={{ r: 5, fill: '#8B5CF6' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center gap-5 mt-4 justify-end">
              {[['#12B2C1', 'Visitors'], ['#0D8A9E', 'Interactions'], ['#8B5CF6', 'Conversions']].map(([c, l]) => (
                <span key={l} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /> {l}
                </span>
              ))}
            </div>
          </div>

          {/* Age-Range Interaction Breakdown + Mini Bar */}
          <div className="space-y-6">
            {/* Donut — Age Ranges */}
            <div className="bg-white rounded-2xl shadow-sm border border-adorix-primary/10 p-6">
              <h3 className="text-lg font-bold text-adorix-dark">Interaction by Age</h3>
              <p className="text-xs text-adorix-secondary mb-4 mt-0.5">Who's engaging with the kiosk</p>

              <div className="flex items-center gap-4">
                {/* Donut */}
                <div className="relative w-28 h-28 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={AGE_RANGE_DATA} cx="50%" cy="50%" innerRadius={32} outerRadius={52}
                        dataKey="value" strokeWidth={0} paddingAngle={3}>
                        {AGE_RANGE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                </div>

                {/* Legend */}
                <div className="flex-1 space-y-2">
                  {AGE_RANGE_DATA.map(d => (
                    <div key={d.name} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                        <span className="text-[11px] text-gray-500 truncate">{d.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="w-12 h-1.5 bg-adorix-light rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${d.value * 2.5}%`, background: d.color }} />
                        </div>
                        <span className="text-[11px] font-bold text-adorix-dark w-6 text-right">{d.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bar — Recent Interactions */}
            <div className="bg-white rounded-2xl shadow-sm border border-adorix-primary/10 p-6">
              <h3 className="text-sm font-bold text-adorix-dark mb-3">Recent Interactions</h3>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.slice(-6)} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#E5F9F8' }} />
                    <Bar dataKey="interactions" radius={[4, 4, 0, 0]}>
                      {data.slice(-6).map((_, i) => (
                        <Cell key={i} fill={i === 5 ? '#12B2C1' : '#0D8A9E40'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Row: Performance Score (wide) + Quick Actions ──────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Performance Score — expanded to xl:col-span-2 */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-adorix-primary/10 p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
              {/* Score ring + label */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <RadialRing pct={82} color="#12B2C1" size={100} stroke={10} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-adorix-dark">82</span>
                    <span className="text-[10px] text-gray-400">/100</span>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-black text-adorix-dark">Excellent</p>
                  <p className="text-sm text-adorix-secondary mt-1">Top 15% of all kiosk accounts</p>
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                    <Star className="w-4 h-4 text-gray-200 fill-gray-200" />
                  </div>
                </div>
              </div>

              {/* Summary badges */}
              <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                {[
                  { label: 'Best Day', val: 'Saturday', color: 'bg-adorix-light text-adorix-primary' },
                  { label: 'Peak Hour', val: '3 – 5 PM', color: 'bg-amber-50 text-amber-600' },
                  { label: 'Top Group', val: '16–29 yrs', color: 'bg-violet-50 text-violet-600' },
                ].map(b => (
                  <div key={b.label} className={`px-4 py-3 rounded-xl text-center ${b.color}`}>
                    <p className="text-xs font-medium opacity-70">{b.label}</p>
                    <p className="text-sm font-black mt-0.5">{b.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed metric bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
              {PERF_METRICS.map(m => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-500 font-medium">{m.label}</span>
                    <span className="font-bold text-adorix-dark">{m.val}%</span>
                  </div>
                  <div className="h-2 bg-adorix-light rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${m.val}%`, background: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-adorix-dark rounded-2xl p-6 shadow-xl shadow-adorix-dark/20 flex flex-col">
            <h3 className="text-white font-bold text-lg mb-1">Quick Actions</h3>
            <p className="text-adorix-accent text-xs mb-6">Manage your kiosks</p>
            <div className="space-y-3 flex-1">
              {[
                { icon: Play, label: 'Launch Campaign', sub: 'Start a new ad', bg: 'bg-adorix-primary' },
                { icon: MonitorPlay, label: 'Preview Kiosk', sub: 'Live view mode', bg: 'bg-adorix-secondary' },
              ].map((a, i) => (
                <button
                  key={i}
                  onClick={() => navigate('/dashboard/studio')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left group"
                >
                  <div className={`p-2 rounded-lg ${a.bg} shadow flex-shrink-0`}>
                    <a.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold group-hover:text-adorix-accent transition-colors">{a.label}</p>
                    <p className="text-gray-400 text-xs">{a.sub}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-adorix-accent transition-colors flex-shrink-0" />
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