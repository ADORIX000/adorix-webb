import React from 'react';
import { Upload, Monitor, Play } from 'lucide-react';

const CampaignStudio = () => {
  return (
    <div className="pt-28 px-8 max-w-7xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Campaign Studio</h1>
        <button className="bg-adorix-600 hover:bg-adorix-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition">
          Publish Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
          <h3 className="font-bold text-gray-800 mb-6 border-b pb-2">Ad Configuration</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
              <input type="text" className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-adorix-500 outline-none" placeholder="Summer Sale 2026" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
              <select className="w-full border border-gray-300 p-2.5 rounded-lg outline-none bg-white">
                <option>General Public</option>
                <option>Youth (18-25)</option>
                <option>Adults (25-40)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Seconds)</label>
              <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg outline-none" defaultValue={15} />
            </div>
          </div>
        </div>

        {/* Canvas / Preview Area */}
        <div className="lg:col-span-2 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl min-h-[500px] flex flex-col items-center justify-center text-gray-400 relative group transition-colors hover:bg-gray-100 hover:border-adorix-300 cursor-pointer">
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-500 shadow-sm flex items-center gap-1">
            <Monitor className="w-3 h-3" /> Preview Mode
          </div>
          
          <Upload className="w-16 h-16 mb-4 text-gray-300 group-hover:text-adorix-400 transition" />
          <p className="text-lg font-medium text-gray-600">Drag & Drop Assets</p>
          <p className="text-sm">Supports MP4, JPG, PNG (Max 50MB)</p>
          <button className="mt-6 text-adorix-600 font-semibold hover:underline">or browse files</button>
        </div>
      </div>
    </div>
  );
};

export default CampaignStudio;