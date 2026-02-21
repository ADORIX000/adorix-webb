"use client";
import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BarChart2,
    Settings,
    Users,
    Video,
    HelpCircle,
    LogOut,
    CreditCard
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Video, label: 'Campaign Studio', path: '/dashboard/studio' },
        { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' }, // Placeholder path
        { icon: Users, label: 'Profile', path: '/profile' },
        { icon: CreditCard, label: 'Billing', path: '/payment-method' },
    ];

    const bottomItems = [
        { icon: Settings, label: 'Settings', path: '/settings/account' },
        { icon: HelpCircle, label: 'Help Center', path: '/settings/help' },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-50">

            {/* Brand */}
            <div className="p-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-adorix-dark rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-adorix-primary transition-colors">
                        A
                    </div>
                    <span className="text-xl font-bold text-adorix-dark tracking-tight">ADORIX</span>
                </Link>
            </div>

            {/* Main Menu */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu</p>

                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-adorix-dark text-white shadow-lg shadow-adorix-dark/20'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-adorix-dark'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-adorix-primary' : 'text-gray-400 group-hover:text-adorix-dark'}`} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Menu */}
            <div className="p-4 border-t border-gray-100">
                <div className="space-y-2">
                    {bottomItems.map((item) => (
                        <Link key={item.path}
                            href={item.path}
                            className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-adorix-dark hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    ))}

                    <button className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-2">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Sign Out</span>
                    </button>
                </div>

                {/* User User Profile Snippet */}
                <div className="mt-6 flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-adorix-primary to-adorix-accent p-[2px]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <span className="font-bold text-xs text-adorix-dark">JD</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-adorix-dark">John Doe</p>
                        <p className="text-xs text-gray-400">Pro Plan</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;
