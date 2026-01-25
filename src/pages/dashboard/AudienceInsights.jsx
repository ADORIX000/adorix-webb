import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', viewers: 400 },
  { name: 'Tue', viewers: 300 },
  { name: 'Wed', viewers: 600 },
  { name: 'Thu', viewers: 800 },
  { name: 'Fri', viewers: 500 },
];

const AudienceInsights = () => {
  return (
    <div className="pt-28 px-8 max-w-7xl mx-auto pb-20">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audience Insights</h1>
          <p className="text-gray-500 mt-1">Real-time data from your Adorix Kiosk</p>
        </div>
        <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
          ● Live System Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stat Cards */}
        {['Total Impressions', 'Attention Span', 'Active Campaigns'].map((item) => (
          <div key={item} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{item}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">12,450</p>
            <span className="text-green-500 text-sm font-medium flex items-center mt-1">↑ 12.5% increase</span>
          </div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm h-96">
        <h3 className="text-lg font-bold mb-6 text-gray-800">Weekly Engagement</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              cursor={{fill: '#f1f5f9'}}
            />
            <Bar dataKey="viewers" fill="#7c3aed" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudienceInsights;