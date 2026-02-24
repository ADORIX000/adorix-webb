import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Monitor, Smartphone, CheckCircle, Play, FileText, X } from 'lucide-react';
import TypingText from '../../components/home/TypingText';

const CampaignStudio = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      setFile({
        name: selectedFile.name,
        size: (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB",
        type: selectedFile.type
      });
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelect(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  return (
    <div className="pt-28 px-6 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-adorix-dark mb-8 tracking-tighter"
            >
                <TypingText text="Launch Your Next" speed={0.05} /> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent">
                  <TypingText text="Big Campaign." startDelay={1} speed={0.05} />
                </span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: Editor & Upload */}
          <div className="lg:col-span-7 space-y-6">
            {/* Upload Area */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
              className="hidden"
              accept="video/*,image/*"
            />
            <div
              className={`bg-white border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group ${file ? 'border-emerald-200 bg-emerald-50/20' : 'border-adorix-primary/30 hover:bg-adorix-primary/5'
                }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${file ? 'bg-emerald-100' : 'bg-adorix-light'
                }`}>
                {file ? (
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                ) : (
                  <Upload className="w-8 h-8 text-adorix-primary" />
                )}
              </div>

              {file ? (
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-emerald-900">File Selected</h3>
                  <div className="flex items-center gap-2 justify-center text-emerald-600">
                    <FileText className="w-4 h-4" />
                    <span>{file.name}</span>
                  </div>
                  <button
                    onClick={clearSelection}
                    className="text-xs font-semibold text-red-500 hover:text-red-700 flex items-center gap-1 mx-auto mt-2"
                  >
                    <X className="w-3 h-3" /> Remove File
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-adorix-dark">Upload Advertisement</h3>
                  <p className="text-adorix-secondary mb-6">Drag & drop MP4, JPG, or PNG</p>
                  <button className="bg-adorix-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-adorix-secondary transition shadow-lg shadow-adorix-primary/20">
                    Browse Files
                  </button>
                </>
              )}
            </div>

            {/* Campaign Details Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-adorix-primary/10">
              <h3 className="font-bold text-adorix-dark mb-4 border-b border-gray-100 pb-2">Campaign Settings</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Campaign Name" className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary" />

                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none">
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <select className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none">
                    <option value="">Select Age Range</option>
                    <option>10-15</option>
                    <option>16-29</option>
                    <option>30-39</option>
                    <option>40-49</option>
                    <option>50-59</option>
                    <option>60-above</option>
                  </select>
                </div>

                <textarea
                  placeholder="Description about the ad / product"
                  className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary h-24 resize-none"
                ></textarea>
              </div>
            </div>

            {file && (
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <p className="font-bold text-emerald-800 tracking-tight">Ready to Publish</p>
                  <p className="text-xs text-emerald-600/80 font-medium">{file.name} • {file.size}</p>
                </div>
                <button
                  onClick={() => navigate('/pricing')}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-200"
                >
                  Launch Now
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Realistic Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <h3 className="text-adorix-secondary font-bold mb-4 flex items-center gap-2">
              <Monitor className="w-4 h-4" /> Kiosk Live Preview
            </h3>

            {/* THE KIOSK MOCKUP */}
            <div className="relative border-8 border-adorix-dark bg-black rounded-[3rem] shadow-2xl w-[320px] h-[600px] overflow-hidden ring-4 ring-gray-200/50">
              {/* Screen Glare */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none z-10 rounded-[2.5rem]"></div>

              {/* Content */}
              <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                {previewUrl ? (
                  <div className="w-full h-full relative group">
                    {file.type.startsWith('video') ? (
                      <video
                        src={previewUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {/* Overlay info */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20">
                      <p className="text-[10px] text-white font-bold tracking-widest">{file.type.split('/')[1].toUpperCase()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center opacity-40 px-6">
                    <Smartphone className="w-16 h-16 text-white mx-auto mb-4" />
                    <p className="text-white font-medium">Upload content to preview <br /> on Kiosk display</p>
                  </div>
                )}

                {/* Kiosk UI Overlay */}
                <div className="absolute bottom-12 left-0 w-full flex flex-col items-center gap-4 z-20">
                  {/* Decorative "Hey ADORIX" button (non-clickable) */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-lg cursor-default select-none group">
                    Hey <span className="text-adorix-accent">ADORIX</span>
                  </div>

                  <div className="flex justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    <div className="w-12 h-1 rounded-full bg-white/80"></div>
                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kiosk Stand Base */}
            <div className="w-20 h-40 bg-gradient-to-b from-gray-700 to-gray-800 -mt-8 rounded-b-xl shadow-xl relative -z-10"></div>
            <div className="w-56 h-12 bg-adorix-dark/10 rounded-[100%] -mt-6 shadow-lg opacity-40 blur-xl"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CampaignStudio;