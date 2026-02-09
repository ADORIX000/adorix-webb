import React, { useState } from 'react';
import { Upload, Monitor, Smartphone, CheckCircle, Play } from 'lucide-react';

const CampaignStudio = () => {
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    // Simulate file drop
    setFile({ name: "summer_campaign_video_v1.mp4", size: "12.4 MB" });
  };

  return (
    <div className="pt-28 px-6 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-adorix-dark">Campaign Studio</h1>
          <p className="text-adorix-secondary">Create, test, and preview your ads in a realistic environment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: Editor & Upload */}
          <div className="lg:col-span-7 space-y-6">
            {/* Upload Area */}
            <div
              className="bg-white border-2 border-dashed border-adorix-primary/30 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-adorix-primary/5 transition-colors cursor-pointer group"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 bg-adorix-light rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-adorix-primary" />
              </div>
              <h3 className="text-lg font-bold text-adorix-dark">Upload Advertisement</h3>
              <p className="text-adorix-secondary mb-6">Drag & drop MP4, JPG, or PNG</p>
              <button className="bg-adorix-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-adorix-secondary transition">
                Browse Files
              </button>
            </div>

            {/* Campaign Details Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-adorix-primary/10">
              <h3 className="font-bold text-adorix-dark mb-4 border-b border-gray-100 pb-2">Campaign Settings</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Campaign Name" className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary" />
                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none">
                    <option>All Demographics</option>
                    <option>Adults 25-40</option>
                    <option>Females</option>
                  </select>
                  <select className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none">
                    <option>High Traffic Mode</option>
                    <option>Passive Mode</option>
                  </select>
                </div>
              </div>
            </div>

            {file && (
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-bold text-emerald-800">Ready to Publish</p>
                  <p className="text-sm text-emerald-600">{file.name} • {file.size}</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Realistic Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <h3 className="text-adorix-secondary font-bold mb-4 flex items-center gap-2">
              <Monitor className="w-4 h-4" /> Kiosk Live Preview
            </h3>

            {/* THE KIOSK MOCKUP */}
            <div className="relative border-8 border-adorix-dark bg-black rounded-[3rem] shadow-2xl w-[320px] h-[600px] overflow-hidden ring-4 ring-gray-200">
              {/* Screen Glare */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none z-10 rounded-[2.5rem]"></div>

              {/* Content */}
              <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                {file ? (
                  <div className="text-center animate-pulse">
                    <div className="w-full h-40 bg-adorix-accent/20 flex items-center justify-center mb-4">
                      <Play className="w-12 h-12 text-white/80" />
                    </div>
                    <p className="text-white font-bold text-xl px-8">Previewing: <br />{file.name}</p>
                  </div>
                ) : (
                  <div className="text-center opacity-40">
                    <Smartphone className="w-16 h-16 text-white mx-auto mb-2" />
                    <p className="text-white">Waiting for content...</p>
                  </div>
                )}

                {/* Kiosk UI Overlay */}
                <div className="absolute bottom-8 left-0 w-full flex justify-center gap-2 z-20">
                  <div className="w-2 h-2 rounded-full bg-white/50"></div>
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="w-2 h-2 rounded-full bg-white/50"></div>
                </div>
              </div>
            </div>

            {/* Kiosk Stand Base */}
            <div className="w-24 h-32 bg-gradient-to-b from-gray-700 to-gray-800 -mt-6 rounded-b-lg shadow-xl relative -z-10"></div>
            <div className="w-48 h-8 bg-gray-300 rounded-[50%] -mt-4 shadow-lg opacity-50 blur-sm"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CampaignStudio;