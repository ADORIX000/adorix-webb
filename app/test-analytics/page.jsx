'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSupabase } from '@/hooks/useSupabase';
import { Play, MousePointer2, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function TestAnalytics() {
    const { user, isLoaded } = useUser();
    const supabase = useSupabase();

    const [ads, setAds] = useState([]);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (!isLoaded || !user || !supabase) return;

        const fetchAds = async () => {
            const { data, error } = await supabase
                .from('ads')
                .select('ad_id, name')
                .eq('user_id', user.id)
                .limit(5);

            if (error) {
                console.error("Error fetching ads:", error);
            } else {
                setAds(data || []);
            }
        };

        fetchAds();
    }, [isLoaded, user, supabase]);

    const simulateEvent = async (type) => {
        if (!user || !supabase) return;
        if (ads.length === 0) {
            setErrorMsg("You need to upload at least one ad in Campaign Studio first!");
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMsg('');

        const randomAd = ads[Math.floor(Math.random() * ads.length)];
        const ages = ['10-15', '16-29', '30-39', '40-49', '50-59', 'above-60'];
        const genders = ['male', 'female'];

        const { error } = await supabase
            .from('analytics')
            .insert({
                ad_id: randomAd.ad_id,
                user_id: user.id,
                viewer_gender: genders[Math.floor(Math.random() * genders.length)],
                viewer_age: ages[Math.floor(Math.random() * ages.length)],
                interaction_type: type, // 'view' or 'click'
                view_duration: type === 'view' ? Math.floor(Math.random() * 20) + 5 : 0
            });

        if (error) {
            console.error("Simulation failed:", error);
            setErrorMsg(error.message);
            setStatus('error');
        } else {
            setStatus('success');
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    if (!isLoaded) return <div className="p-10 font-mono">Loading user context...</div>;

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-6">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900">Analytics Simulator</h1>
                    <p className="text-slate-500 mt-2">Use this to test your Real-time Dashboard</p>
                </div>

                {ads.length === 0 ? (
                    <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-bold">No Ads Found</p>
                            <p className="text-sm">Please go to **Campaign Studio** and upload an ad first. We need an Ad ID to link the analytics.</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => simulateEvent('view')}
                                disabled={status === 'loading'}
                                className="flex flex-col items-center justify-center p-6 bg-adorix-primary/5 border-2 border-adorix-primary/20 hover:border-adorix-primary rounded-2xl transition group"
                            >
                                <Play className="w-8 h-8 text-adorix-primary mb-3 group-hover:scale-110 transition" />
                                <span className="font-bold text-adorix-dark">Simulate View</span>
                                <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Adds +1 Impression</span>
                            </button>

                            <button
                                onClick={() => simulateEvent('click')}
                                disabled={status === 'loading'}
                                className="flex flex-col items-center justify-center p-6 bg-violet-50 border-2 border-violet-100 hover:border-violet-500 rounded-2xl transition group"
                            >
                                <MousePointer2 className="w-8 h-8 text-violet-500 mb-3 group-hover:scale-110 transition" />
                                <span className="font-bold text-adorix-dark">Simulate Click</span>
                                <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Adds +1 Interaction</span>
                            </button>
                        </div>

                        {status === 'loading' && (
                            <div className="flex items-center justify-center gap-2 text-slate-400 py-2 animate-pulse">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm font-medium">Pushing event to Supabase...</span>
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="flex items-center justify-center gap-2 text-emerald-500 py-2 animate-in fade-in slide-in-from-bottom-1">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="text-sm font-bold">Event Logged! Check Dashboard.</span>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-xs font-mono break-all">
                                {errorMsg}
                            </div>
                        )}

                        <div className="pt-6 border-t border-slate-50">
                            <p className="text-[10px] text-slate-300 uppercase font-bold tracking-tighter mb-3 underline decoration-slate-200">Simulating for ads:</p>
                            <div className="flex flex-wrap gap-2">
                                {ads.map(ad => (
                                    <span key={ad.ad_id} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-medium">
                                        {ad.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
