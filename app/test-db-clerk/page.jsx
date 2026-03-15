'use client';

import React, { useEffect, useState } from 'react';
import { useUser, useSession } from '@clerk/nextjs';
import { useSupabase } from '@/hooks/useSupabase';
import { CheckCircle, XCircle, Loader2, Database, ShieldCheck, User, Key } from 'lucide-react';

// ----------- Reusable Card Component ----------- //
const StatusCard = ({ label, status, detail, icon: Icon }) => {
  const colors = {
    loading: { bg: 'bg-blue-50', ring: 'ring-blue-200', icon: 'text-blue-500', text: 'text-blue-700' },
    success: { bg: 'bg-emerald-50', ring: 'ring-emerald-200', icon: 'text-emerald-600', text: 'text-emerald-800' },
    error: { bg: 'bg-red-50', ring: 'ring-red-200', icon: 'text-red-600', text: 'text-red-800' },
  }[status] || {};

  return (
    <div className={`${colors.bg} ring-1 ${colors.ring} rounded-2xl p-5 flex items-start gap-4`}>
      <div className="mt-0.5">
        {status === 'loading' && <Loader2 className={`w-5 h-5 ${colors.icon} animate-spin`} />}
        {status === 'success' && <CheckCircle className={`w-5 h-5 ${colors.icon}`} />}
        {status === 'error' && <XCircle className={`w-5 h-5 ${colors.icon}`} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-bold text-sm flex items-center gap-1.5 ${colors.text}`}>
          <Icon className="w-4 h-4" /> {label}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 font-mono truncate">{detail || '…'}</p>
      </div>
    </div>
  );
};

// ----------- Main Page ----------- //
export default function DbClerkTestPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { session } = useSession();
  const supabase = useSupabase();

  const [checks, setChecks] = useState({
    envSupabaseUrl: { status: 'loading', detail: null },
    envSupabaseKey: { status: 'loading', detail: null },
    clerkSignIn: { status: 'loading', detail: null },
    clerkUserId: { status: 'loading', detail: null },
    clerkToken: { status: 'loading', detail: null },
    supabaseClient: { status: 'loading', detail: null },
    dbAdsTable: { status: 'loading', detail: null },
    storageBucket: { status: 'loading', detail: null },
  });

  const setCheck = (key, status, detail) =>
    setChecks(prev => ({ ...prev, [key]: { status, detail } }));

  useEffect(() => {
    // --- Env Variable Checks ---
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    setCheck('envSupabaseUrl', url ? 'success' : 'error',
      url ? url.replace(/https:\/\//, '').slice(0, 30) + '…' : 'NEXT_PUBLIC_SUPABASE_URL not set');
    setCheck('envSupabaseKey', key ? 'success' : 'error',
      key ? `${key.slice(0, 20)}…` : 'NEXT_PUBLIC_SUPABASE_ANON_KEY not set');

    if (!isLoaded) return;

    // --- Clerk Checks ---
    setCheck('clerkSignIn', isSignedIn ? 'success' : 'error',
      isSignedIn ? 'Signed in via Clerk' : 'Not authenticated — please sign in');
    setCheck('clerkUserId', user?.id ? 'success' : 'error',
      user?.id ?? 'No user ID found');

    if (!isSignedIn) return;

    const runAsyncChecks = async () => {
      // Clerk Token
      try {
        const token = await session?.getToken({ template: 'supabase' });
        setCheck('clerkToken', token ? 'success' : 'error',
          token ? `Obtained — ${token.slice(0, 40)}…` : "'supabase' JWT template missing in Clerk");
      } catch (e) {
        setCheck('clerkToken', 'error', e.message);
      }

      // Supabase client
      if (!supabase) {
        setCheck('supabaseClient', 'error', 'useSupabase() returned null');
        return;
      }
      setCheck('supabaseClient', 'success', 'useSupabase() returned client');

      // DB ads table
      try {
        const { count, error } = await supabase
          .from('ads')
          .select('*', { count: 'exact', head: true });
        if (error) throw error;
        setCheck('dbAdsTable', 'success', `ads table accessible — ${count ?? 0} rows`);
      } catch (e) {
        setCheck('dbAdsTable', 'error', e.message);
      }

      // Storage bucket
      try {
        const { data, error } = await supabase.storage
          .from('adorix-ads-media')
          .list('ads', { limit: 1 });
        if (error) throw error;
        setCheck('storageBucket', 'success', `adorix-ads-media bucket accessible`);
      } catch (e) {
        setCheck('storageBucket', 'error', e.message);
      }
    };

    runAsyncChecks();
  }, [isLoaded, isSignedIn, session, supabase, user]);

  const allDone = Object.values(checks).every(c => c.status !== 'loading');
  const allPass = Object.values(checks).every(c => c.status === 'success');
  const failures = Object.values(checks).filter(c => c.status === 'error').length;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-gray-900">Database &amp; Clerk Diagnostics</h1>
          <p className="text-gray-500 mt-2 text-sm">Verifies env vars, authentication, database table, and storage bucket</p>
        </div>

        {/* Overall Badge */}
        {allDone && (
          <div className={`mb-8 py-3 px-5 rounded-xl text-center font-bold text-sm ${allPass ? 'bg-emerald-100 text-emerald-800' : `bg-red-100 text-red-800`}`}>
            {allPass ? '✅ All checks passed!' : `❌ ${failures} check${failures > 1 ? 's' : ''} failed — see details below`}
          </div>
        )}

        {/* Check Grid */}
        <div className="grid gap-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-4">Environment</p>
          <StatusCard label="NEXT_PUBLIC_SUPABASE_URL" icon={Database} {...checks.envSupabaseUrl} />
          <StatusCard label="NEXT_PUBLIC_SUPABASE_ANON_KEY" icon={Key} {...checks.envSupabaseKey} />

          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-4">Clerk Auth</p>
          <StatusCard label="User Signed In" icon={User} {...checks.clerkSignIn} />
          <StatusCard label="Clerk User ID" icon={User} {...checks.clerkUserId} />
          <StatusCard label="Supabase JWT Token" icon={ShieldCheck} {...checks.clerkToken} />

          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-4">Supabase</p>
          <StatusCard label="Supabase Client (useSupabase hook)" icon={Database} {...checks.supabaseClient} />
          <StatusCard label="ads table — SELECT" icon={Database} {...checks.dbAdsTable} />
          <StatusCard label="adorix-ads-media bucket" icon={Database} {...checks.storageBucket} />
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          /test-db-clerk — dev-only diagnostic page
        </p>
      </div>
    </div>
  );
}
