import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard, Lock, ShieldCheck, Sparkles,
    ArrowRight, CheckCircle2, Info, Landmark
} from 'lucide-react';

const PaymentMethod = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardNumberChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        val = val.substring(0, 16).match(/.{1,4}/g)?.join(' ') || val;
        setCardNumber(val);
    };

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-[#f8fafc] flex items-center justify-center overflow-hidden relative">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-adorix-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-adorix-accent/5 rounded-full blur-[120px] -ml-64 -mb-64" />

            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left Side: Summary & Card Visual */}
                <div className="space-y-12">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xs font-black text-adorix-primary uppercase tracking-[0.2em] mb-4 block"
                        >
                            Secure Checkout
                        </motion.span>
                        <h1 className="text-4xl md:text-5xl font-black text-adorix-dark tracking-tight mb-6">
                            Complete your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent">
                                Pro subscription.
                            </span>
                        </h1>
                    </div>

                    {/* Interactive Card Visual */}
                    <div className="perspective-1000">
                        <motion.div
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="relative w-full aspect-[1.586/1] preserve-3d transition-transform duration-500"
                        >
                            {/* Front Side */}
                            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-adorix-dark to-gray-800 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-between border border-white/10">
                                <div className="flex justify-between items-start">
                                    <div className="w-14 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg opacity-80" />
                                    <Sparkles className="w-8 h-8 text-adorix-primary opacity-50" />
                                </div>
                                <div>
                                    <p className="text-2xl font-black tracking-[0.2em] mb-6 min-h-[1.5em]">
                                        {cardNumber || "•••• •••• •••• ••••"}
                                    </p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Card Holder</p>
                                            <p className="font-black tracking-tight">{cardHolder || "ADRIX MEMBER"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Expires</p>
                                            <p className="font-black tracking-tight">{expiry || "MM/YY"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Back Side */}
                            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-gray-800 to-adorix-dark rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-between border border-white/10 [transform:rotateY(180deg)]">
                                <div className="absolute top-10 left-0 w-full h-14 bg-black/50" />
                                <div className="mt-20">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">CVC Number</p>
                                    <div className="bg-white/10 h-12 rounded-xl flex items-center justify-end px-6 font-black italic tracking-widest text-xl">
                                        {cvc || "•••"}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center opacity-30 text-xs">
                                    <p>SECURE CHIP V2.4</p>
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="bg-white/50 backdrop-blur-md p-8 rounded-[2rem] border border-white flex justify-between items-center shadow-sm">
                        <div>
                            <p className="text-sm font-black text-adorix-dark uppercase tracking-widest mb-1">Total Due</p>
                            <p className="text-3xl font-black text-adorix-primary">$49.00<span className="text-sm text-gray-400 font-bold ml-2">/mo</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-500 line-through mb-1">$99.00</p>
                            <span className="px-3 py-1 bg-adorix-accent/20 text-adorix-accent rounded-full text-[10px] font-black uppercase tracking-widest">
                                50% Off Lifetime
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Detailed Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[3rem] p-10 md:p-14 border border-gray-100 shadow-2xl shadow-adorix-dark/5"
                >
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-black text-adorix-dark flex items-center gap-3">
                            <Lock className="w-6 h-6 text-adorix-primary" /> Payment Method
                        </h2>
                        <div className="flex gap-2">
                            <div className="w-8 h-5 bg-gray-100 rounded opacity-50" />
                            <div className="w-8 h-5 bg-gray-100 rounded opacity-50" />
                            <div className="w-8 h-5 bg-gray-100 rounded opacity-50" />
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Cardholder Name</label>
                            <input
                                type="text"
                                value={cardHolder}
                                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                                placeholder="ALEX MORGAN"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Card Number</label>
                            <div className="relative">
                                <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 pl-14 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                                    placeholder="0000 0000 0000 0000"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">Expiry Date</label>
                                <input
                                    type="text"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-adorix-dark uppercase tracking-widest ml-2">CVC</label>
                                <input
                                    type="text"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value.substring(0, 3))}
                                    onFocus={() => setIsFlipped(true)}
                                    onBlur={() => setIsFlipped(false)}
                                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                                    placeholder="123"
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-2xl flex gap-4 items-start border border-gray-100">
                            <ShieldCheck className="w-5 h-5 text-adorix-primary mt-1 flex-shrink-0" />
                            <p className="text-[10px] font-bold text-gray-500 leading-relaxed uppercase tracking-widest">
                                Your payment is processed with bit-level encryption. We never store your full card details on our servers.
                            </p>
                        </div>

                        <button className="w-full py-6 bg-adorix-dark text-white rounded-[2rem] font-black text-xl shadow-xl shadow-adorix-dark/20 hover:bg-adorix-primary transition-all flex items-center justify-center gap-4 group active:scale-[0.98] mt-4">
                            Pay $49.00 <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                        <Landmark className="w-8 h-8" />
                        <CreditCard className="w-8 h-8" />
                        <div className="text-xl font-bold tracking-tighter">STRIPE</div>
                    </div>
                </motion.div>
            </div>

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
            `}</style>
        </div>
    );
};

export default PaymentMethod;