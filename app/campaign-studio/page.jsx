'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, Monitor, CheckCircle, Play, FileText, X, Loader2 } from 'lucide-react';
import { useSupabase } from '@/hooks/useSupabase';
import { useUser } from '@clerk/nextjs';

const CampaignStudio = () => {
    const router = useRouter();
    const supabase = useSupabase();
    const { user } = useUser();
    
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [rawFile, setRawFile] = useState(null);
    const fileInputRef = useRef(null);

    // Form State
    const [campaignName, setCampaignName] = useState('');
    const [gender, setGender] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [colors, setColors] = useState('');
    const [price, setPrice] = useState('');
    const [specs, setSpecs] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error'

    const handleFileSelect = (selectedFile) => {
        if (selectedFile) {
            setRawFile(selectedFile);
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
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const clearSelection = (e) => {
        if (e) e.stopPropagation();
        setFile(null);
        setRawFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    };

    const resetForm = () => {
        setCampaignName('');
        setGender('');
        setAgeRange('');
        setDescription('');
        setFeatures('');
        setColors('');
        setPrice('');
        setSpecs('');
        setFile(null);
        setRawFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setUploadStatus(null);
        setIsUploading(false);
    };

    const handleUpload = async () => {
        if (!rawFile || !campaignName || !gender || !ageRange) {
            alert("Please fill in all required fields and select a file.");
            return;
        }

        setIsUploading(true);
        setUploadStatus(null);

        try {
            let normalizedAge = ageRange.toLowerCase();
            if (normalizedAge === '60-above') normalizedAge = 'above-60';
            
            const fileName = `${normalizedAge}_${gender.toLowerCase()}.mp4`;
            const filePath = fileName;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('adorix-ads-media')
                .upload(filePath, rawFile, {
                    upsert: true
                });

            if (uploadError) throw new Error(uploadError.message);

            const { data: { publicUrl } } = supabase.storage
                .from('adorix-ads-media')
                .getPublicUrl(filePath);

            const structuredDescription = `
### PRODUCT OVERVIEW
${description}

### KEY FEATURES
${features}

### AVAILABLE COLORS
${colors}

### PRICING / OFFERS
${price}

### TECHNICAL SPECS
${specs}
`.trim();

            const { error: dbError } = await supabase
                .from('ads')
                .upsert(
                    {
                        user_id: user.id,
                        name: campaignName,
                        gender: gender,
                        age: ageRange,
                        description: structuredDescription,
                        media_url: publicUrl,
                        status: 'active',
                        video_filename: fileName
                    },
                    { onConflict: 'video_filename' }
                );

            if (dbError) throw new Error(dbError.message);

            setUploadStatus('success');

        } catch (error) {
            console.error("Upload failed:", error.message);
            setUploadStatus('error');
            alert(`Upload failed: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-16 relative overflow-hidden">
            {/* Main Content Dashboard */}
            <div className={`transition-all duration-700 ${uploadStatus === 'success' ? 'blur-xl grayscale-[0.5] scale-95 opacity-40 pointer-events-none' : ''}`}>
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-adorix-dark rounded-xl flex items-center justify-center text-white shadow-lg shadow-adorix-dark/20">
                            <Monitor className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-adorix-dark tracking-tight">Campaign Studio</h1>
                            <p className="text-sm text-gray-400">Launch and manage your kiosk advertisements</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-7 space-y-6">
                            <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" accept="video/mp4" />
                            
                            {/* Upload Area */}
                            <div
                                className={`bg-white border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer group hover:shadow-xl hover:shadow-adorix-primary/5 ${file ? 'border-emerald-200 bg-emerald-50/20' : 'border-adorix-primary/20 hover:border-adorix-primary/50'}`}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onClick={triggerFileInput}
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${file ? 'bg-emerald-100 scale-110' : 'bg-gray-100 group-hover:scale-110'}`}>
                                    {file ? <CheckCircle className="w-8 h-8 text-emerald-600" /> : <Upload className="w-8 h-8 text-adorix-primary" />}
                                </div>

                                {file ? (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-emerald-900">File Ready</h3>
                                        <div className="flex items-center gap-2 justify-center text-emerald-600 bg-emerald-100/50 px-4 py-1.5 rounded-full text-sm font-medium">
                                            <FileText className="w-4 h-4" />
                                            <span>{file.name}</span>
                                        </div>
                                        <button onClick={clearSelection} className="text-xs font-semibold text-red-500 hover:text-red-700 flex items-center gap-1 mx-auto mt-4 px-3 py-1 hover:bg-red-50 rounded-lg transition" disabled={isUploading}>
                                            <X className="w-3 h-3" /> Change Selection
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-lg font-bold text-adorix-dark tracking-tight">Upload Creative</h3>
                                        <p className="text-gray-400 text-sm mt-1 mb-6">Drag and drop MP4 video advertisement</p>
                                        <button className="bg-adorix-dark text-white px-8 py-2.5 rounded-xl font-bold hover:bg-adorix-primary transition-all shadow-lg">Select Video</button>
                                    </>
                                )}
                            </div>

                            {/* Campaign Info */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-adorix-primary/10">
                                <h3 className="font-bold text-adorix-dark mb-4 border-b border-gray-100 pb-2">Campaign Settings</h3>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Campaign Name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary transition" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary text-gray-600 font-medium">
                                            <option value="">Target Gender</option>
                                            <option value="Male">Male Only</option>
                                            <option value="Female">Female Only</option>
                                            <option value="All">All Genders</option>
                                        </select>
                                        <select value={ageRange} onChange={(e) => setAgeRange(e.target.value)} className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary text-gray-600 font-medium">
                                            <option value="">Age Range</option>
                                            <option value="10-15">10-15 Years</option>
                                            <option value="16-29">16-29 Years</option>
                                            <option value="30-39">30-39 Years</option>
                                            <option value="40-49">40-49 Years</option>
                                            <option value="50-59">50-59 Years</option>
                                            <option value="60-above">Above 60</option>
                                            <option value="All">All Ages</option>
                                        </select>
                                    </div>
                                    <textarea placeholder="General Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary h-20 resize-none text-sm transition"></textarea>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <textarea placeholder="Key Features" value={features} onChange={(e) => setFeatures(e.target.value)} className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary h-24 resize-none text-sm transition"></textarea>
                                        <textarea placeholder="Colors / Models" value={colors} onChange={(e) => setColors(e.target.value)} className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary h-24 resize-none text-sm transition"></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="Price / Offers" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary text-sm transition" />
                                        <input type="text" placeholder="Technical Specs" value={specs} onChange={(e) => setSpecs(e.target.value)} className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary text-sm transition" />
                                    </div>
                                </div>
                            </div>

                            {file && (
                                <div className="bg-[#1F2B2D] p-5 rounded-2xl flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${isUploading ? 'bg-adorix-primary/10' : 'bg-emerald-500/10'}`}>
                                        {isUploading ? <Loader2 className="w-5 h-5 text-adorix-primary animate-spin" /> : <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-white text-sm">{isUploading ? 'Syncing with Kiosk...' : 'Campaign Ready'}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">Ready to transmit to global network</p>
                                    </div>
                                    <button onClick={handleUpload} disabled={isUploading} className="bg-adorix-primary text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-xl shadow-adorix-primary/20 hover:bg-adorix-secondary transition-all active:scale-95 disabled:opacity-50">
                                        {isUploading ? 'Launching...' : 'Launch Now'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Preview Section */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-start py-8">
                            <h3 className="text-adorix-secondary font-bold mb-6 flex items-center gap-2">
                                <Monitor className="w-4 h-4" /> Kiosk Live Preview
                            </h3>
                            
                            <div className="relative flex flex-col items-center">
                                <div className="relative z-20 border-[10px] border-[#1F2B2D] bg-[#0A0F11] rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] w-[280px] h-[500px] overflow-hidden group">
                                    <div className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-50"></div>
                                    <div className="w-full h-full bg-gray-900 flex items-center justify-center relative z-20">
                                        {previewUrl ? (
                                            <video src={previewUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                                        ) : (
                                            <div className="text-center px-8 opacity-20"><Play className="w-12 h-12 text-white mx-auto mb-2" /><p className="text-[10px] text-white font-bold tracking-widest uppercase">No Signal</p></div>
                                        )}
                                    </div>
                                </div>
                                <div className="relative z-10 -mt-8 w-20 h-24 bg-gradient-to-b from-[#1F2B2D] to-[#141E20] border-x-4 border-gray-800/20"></div>
                                <div className="relative z-10 w-48 h-6 bg-gradient-to-b from-[#1F2B2D] to-[#0A0F11] rounded-t-3xl shadow-xl"></div>
                                <div className="w-64 h-8 bg-black/20 blur-2xl rounded-full -mt-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Success Overlay */}
            {uploadStatus === 'success' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-white/60 backdrop-blur-xl" />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative bg-white rounded-[2.5rem] p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] max-w-md w-full text-center border border-white"
                    >
                        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-200">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
                                <CheckCircle className="w-12 h-12 text-white stroke-[3px]" />
                            </motion.div>
                        </div>
                        
                        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Campaign Sent!</h2>
                        <p className="text-gray-500 font-semibold mb-10 leading-relaxed text-lg px-2">
                            Your advertisement is now in review and will be live on Adorix kiosks shortly.
                        </p>
                        
                        <div className="space-y-4">
                            <button onClick={resetForm} className="w-full bg-adorix-dark text-white py-5 rounded-2xl font-bold text-lg hover:bg-adorix-primary transition-all shadow-2xl active:scale-95">
                                Create Another Campaign
                            </button>
                            <button onClick={() => router.push('/dashboard')} className="w-full text-gray-400 font-bold hover:text-adorix-dark transition py-2">
                                Back to Dashboard
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default CampaignStudio;
