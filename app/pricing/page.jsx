import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-24 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-adorix-dark mb-4">Simple, Transparent Pricing</h1>
                <p className="text-lg text-gray-600 mb-12">Choose the plan that best fits your campaign needs.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-full">
                        <h3 className="text-2xl font-bold text-adorix-dark mb-2">Starter</h3>
                        <p className="text-gray-500 mb-6">Perfect for small businesses getting started.</p>
                        <div className="mb-8">
                            <span className="text-5xl font-bold text-adorix-dark">$29</span>
                            <span className="text-gray-500">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3"><Check className="text-adorix-primary w-5 h-5" /> Up to 5 campaigns</li>
                            <li className="flex items-center gap-3"><Check className="text-adorix-primary w-5 h-5" /> Basic analytics</li>
                            <li className="flex items-center gap-3"><Check className="text-adorix-primary w-5 h-5" /> Email support</li>
                        </ul>
                        <button className="w-full py-4 text-center rounded-xl font-bold border-2 border-adorix-primary text-adorix-primary hover:bg-adorix-primary/5 transition">
                            Get Started
                        </button>
                    </div>

                    <div className="bg-adorix-dark rounded-3xl p-8 shadow-xl border border-gray-800 flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-adorix-primary text-white text-xs font-bold px-4 py-1 rounded-bl-xl">POPULAR</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                        <p className="text-gray-400 mb-6">Advanced features for growing brands.</p>
                        <div className="mb-8">
                            <span className="text-5xl font-bold text-white">$99</span>
                            <span className="text-gray-400">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 text-gray-300">
                            <li className="flex items-center gap-3"><Check className="text-adorix-primary w-5 h-5" /> Unlimited campaigns</li>
                            <li className="flex items-center gap-3"><Check className="text-adorix-primary w-5 h-5" /> Advanced analytics & reporting</li>
                            <li className="flex items-center gap-3"><Check className="text-adorix-primary w-5 h-5" /> Priority 24/7 support</li>
                        </ul>
                        <button className="w-full py-4 text-center rounded-xl font-bold bg-adorix-primary text-white hover:bg-[#085a66] transition">
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
