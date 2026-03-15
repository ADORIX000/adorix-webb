'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, Monitor, Smartphone, CheckCircle, Play, FileText, X, Loader2 } from 'lucide-react';
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
        fileInputRef.current.click();
    };

    const clearSelection = (e) => {
        e.stopPropagation();
        setFile(null);
        setRawFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    };

    const handleUpload = async () => {
        if (!rawFile || !campaignName || !gender || !ageRange) {
            alert("Please fill in all required fields and select a file.");
            return;
        }

        setIsUploading(true);
        setUploadStatus(null);

        try {
            // 1. Format filename according to requirements: {age}_{gender}.mp4
            let normalizedAge = ageRange.toLowerCase();
            if (normalizedAge === '60-above') normalizedAge = 'above-60';
            
            const fileName = `${normalizedAge}_${gender.toLowerCase()}.mp4`;
            const filePath = fileName; // Uploading to root as per screenshot

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('adorix-ads-media')
                .upload(filePath, rawFile, {
                    upsert: true // Allow overwriting the ad for that category
                });

            if (uploadError) {
                console.error("Storage Error:", JSON.stringify(uploadError));
                throw new Error(`Storage: ${uploadError.message || uploadError.error || JSON.stringify(uploadError)}`);
            }

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('adorix-ads-media')
                .getPublicUrl(filePath);

            // 3. Insert metadata into 'ads' table
            const { error: dbError } = await supabase
                .from('ads')
                .insert([
                    {
                        name: campaignName,
                        gender: gender,
                        age: ageRange,
                        description: description,
                        media_url: publicUrl,
                        status: 'pending',
                        user_id: user?.id
                    }
                ]);

            if (dbError) {
                console.error("Database Error:", JSON.stringify(dbError));
                throw new Error(`Database: ${dbError.message || dbError.error || JSON.stringify(dbError)}`);
            }

            setUploadStatus('success');
            // Reset form or redirect
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);

        } catch (error) {
            console.error("Upload failed:", error.message);
            setUploadStatus('error');
            alert(`Upload failed: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="pt-28 px-6 pb-20 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-adorix-dark mb-8 tracking-tighter"
                    >
                        Launch Your Next <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent">
                            Big Campaign.
                        </span>
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-7 space-y-6">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onFileChange}
                            className="hidden"
                            accept="video/mp4"
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
                                        disabled={isUploading}
                                    >
                                        <X className="w-3 h-3" /> Remove File
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-lg font-bold text-adorix-dark">Upload Advertisement</h3>
                                    <p className="text-adorix-secondary mb-6">Drag & drop MP4</p>
                                    <button className="bg-adorix-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-adorix-secondary transition shadow-lg shadow-adorix-primary/20">
                                        Browse Files
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-adorix-primary/10">
                            <h3 className="font-bold text-adorix-dark mb-4 border-b border-gray-100 pb-2">Campaign Settings</h3>
                            <div className="space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Campaign Name" 
                                    value={campaignName}
                                    onChange={(e) => setCampaignName(e.target.value)}
                                    className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary" 
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <select 
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="All">All</option>
                                    </select>
                                    <select 
                                        value={ageRange}
                                        onChange={(e) => setAgeRange(e.target.value)}
                                        className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none"
                                    >
                                        <option value="">Select Age Range</option>
                                        <option value="10-15">10-15</option>
                                        <option value="16-29">16-29</option>
                                        <option value="30-39">30-39</option>
                                        <option value="40-49">40-49</option>
                                        <option value="50-59">50-59</option>
                                        <option value="60-above">60-above</option>
                                        <option value="All">All Ages</option>
                                    </select>
                                </div>
                                <textarea
                                    placeholder="Description about the ad / product"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-adorix-light/50 border border-adorix-primary/20 rounded-lg p-3 outline-none focus:border-adorix-primary h-24 resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {file && (
                            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                                <div className="flex-1">
                                    <p className="font-bold text-emerald-800 tracking-tight">
                                        {uploadStatus === 'success' ? 'Campaign Launched!' : 'Ready to Publish'}
                                    </p>
                                    <p className="text-xs text-emerald-600/80 font-medium">{file.name} • {file.size}</p>
                                </div>
                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-200 flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Launching...
                                        </>
                                    ) : uploadStatus === 'success' ? (
                                        'Launched'
                                    ) : (
                                        'Launch Now'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5 flex flex-col items-center">
                        <h3 className="text-adorix-secondary font-bold mb-4 flex items-center gap-2">
                            <Monitor className="w-4 h-4" /> Kiosk Live Preview
                        </h3>
                        <div className="relative border-8 border-adorix-dark bg-black rounded-[3rem] shadow-2xl w-[320px] h-[600px] overflow-hidden ring-4 ring-gray-200/50">
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none z-10 rounded-[2.5rem]"></div>
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
                                    </div>
                                ) : (
                                    <div className="text-center opacity-40 px-6">
                                        <Smartphone className="w-16 h-16 text-white mx-auto mb-4" />
                                        <p className="text-white font-medium">Upload content to preview <br /> on Kiosk display</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignStudio;

