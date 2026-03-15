import Link from 'next/link';

export default function RootPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-adorix-dark mb-4">Welcome to Adorix</h1>
            <p className="text-gray-600 mb-8 max-w-lg text-center">
                You have successfully signed in! Head over to the dashboard to view your campaign analytics, or go straight to the Campaign Studio.
            </p>
            <div className="flex gap-4">
                <Link href="/dashboard" className="px-6 py-3 bg-adorix-primary text-white font-bold rounded-xl hover:bg-[#085a66] transition">
                    Go to Dashboard
                </Link>
                <Link href="/campaign-studio" className="px-6 py-3 border border-gray-200 bg-white text-adorix-dark shadow-sm font-bold rounded-xl hover:bg-gray-50 transition">
                    Campaign Studio
                </Link>
            </div>
        </div>
    );
}
