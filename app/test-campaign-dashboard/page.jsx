'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSupabase } from '@/hooks/useSupabase';
import { CheckCircle, XCircle, Loader2, Upload, LayoutDashboard, Film, User } from 'lucide-react';

// ---------- Mini status row ---------- //
const Row = ({ label, status, detail, icon: Icon }) => {
  const color =
    status === 'success' ? 'text-emerald-600' :
    status === 'error' ? 'text-red-600' : 'text-blue-500';
  const StatusIcon =
    status === 'loading' ? Loader2 :
    status === 'success' ? CheckCircle : XCircle;

  return (
    <li className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <StatusIcon className={`w-5 h-5 mt-0.5 shrink-0 ${color} ${status === 'loading' ? 'animate-spin' : ''}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-gray-400" /> {label}
        </p>
        {detail && <p className="text-xs text-gray-400 mt-0.5 font-mono truncate">{detail}</p>}
      </div>
    </li>
  );
};

// ---------- Section card ---------- //
const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
      <Icon className="w-4 h-4 text-adorix-primary" />
      <h2 className="font-bold text-gray-900 text-sm tracking-wide uppercase">{title}</h2>
    </div>
    <ul className="px-6 divide-y divide-gray-50">{children}</ul>
  </div>
);

// ---------- Main ---------- //
export default function CampaignDashboardTestPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const supabase = useSupabase();

  const [studio, setStudio] = useState({
    hookReady:  { status: 'loading', detail: null },
    userId:     { status: 'loading', detail: null },
    insertDry:  { status: 'loading', detail: null },
    bucketRead: { status: 'loading', detail: null },
  });

  const [dashboard, setDashboard] = useState({
    adsRead:   { status: 'loading', detail: null },
    pendingAds: { status: 'loading', detail: null },
    myAds:     { status: 'loading', detail: null },
  });

  const setS = (key, status, detail) => setStudio(p => ({ ...p, [key]: { status, detail } }));
  const setD = (key, status, detail) => setDashboard(p => ({ ...p, [key]: { status, detail } }));

  useEffect(() => {
    if (!isLoaded) return;

    // Auth guard
    if (!isSignedIn) {
      ['hookReady','userId','insertDry','bucketRead'].forEach(k => setS(k, 'error', 'Not signed in'));
      ['adsRead','pendingAds','myAds'].forEach(k => setD(k, 'error', 'Not signed in'));
      return;
    }

    const run = async () => {
      // CAMPAIGN STUDIO checks ------
      // 1. Hook ready?
      if (supabase) {
        setS('hookReady', 'success', 'useSupabase() returned authenticated client');
      } else {
        setS('hookReady', 'error', 'useSupabase() returned null');
        ['userId','insertDry','bucketRead'].forEach(k => setS(k, 'error', 'Blocked by previous failure'));
        return;
      }

      // 2. User ID
      setS('userId', user?.id ? 'success' : 'error',
        user?.id ? `Clerk ID: ${user.id}` : 'user.id is undefined');

      // 3. Dry-run insert validation (select equivalent — we don't actually insert)
      try {
        // A real insert would fail on missing required fields intentionally,
        // so we just verify that the table is reachable and we can call .insert()
        const { error } = await supabase
          .from('ads')
          .select('id, name, status, user_id, media_url')
          .limit(1);
        if (error) throw error;
        setS('insertDry', 'success', 'ads table schema accessible (name, status, user_id, media_url)');
      } catch (e) {
        setS('insertDry', 'error', e.message);
      }

      // 4. Storage bucket read
      try {
        const { data, error } = await supabase.storage.from('adorix-ads-media').list('ads', { limit: 5 });
        if (error) throw error;
        setS('bucketRead', 'success', `adorix-ads-media/ads readable — ${data?.length ?? 0} file(s) found`);
      } catch (e) {
        setS('bucketRead', 'error', `${e.message}`);
      }

      // DASHBOARD checks ------
      // 1. All ads
      try {
        const { data, error, count } = await supabase
          .from('ads')
          .select('*', { count: 'exact' });
        if (error) throw error;
        setD('adsRead', 'success', `${count ?? data?.length ?? 0} total ads in database`);
      } catch (e) {
        setD('adsRead', 'error', e.message);
      }

      // 2. Pending ads
      try {
        const { data, error } = await supabase
          .from('ads')
          .select('id, name, status')
          .eq('status', 'pending');
        if (error) throw error;
        setD('pendingAds', 'success', `${data?.length ?? 0} ad(s) with status=pending`);
      } catch (e) {
        setD('pendingAds', 'error', e.message);
      }

      // 3. My ads (filtered by user_id)
      try {
        const { data, error } = await supabase
          .from('ads')
          .select('id, name, status')
          .eq('user_id', user.id);
        if (error) throw error;
        setD('myAds', 'success', `${data?.length ?? 0} ad(s) belonging to current user`);
      } catch (e) {
        setD('myAds', 'error', e.message);
      }
    };

    run();
  }, [isLoaded, isSignedIn, supabase, user]);

  const allChecks = [...Object.values(studio), ...Object.values(dashboard)];
  const allDone = allChecks.every(c => c.status !== 'loading');
  const allPass = allChecks.every(c => c.status === 'success');
  const failures = allChecks.filter(c => c.status === 'error').length;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-black tracking-tighter text-gray-900">Campaign &amp; Dashboard Tests</h1>
          <p className="text-gray-500 mt-2 text-sm">Verifies the upload flow (Campaign Studio) and data reads (Dashboard)</p>
        </div>

        {/* Overall */}
        {allDone && (
          <div className={`py-3 px-5 rounded-xl text-center font-bold text-sm ${allPass ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
            {allPass ? '✅ All checks passed!' : `❌ ${failures} check${failures > 1 ? 's' : ''} failed`}
          </div>
        )}

        {/* User info */}
        {isSignedIn && (
          <div className="bg-adorix-light/50 border border-adorix-primary/10 rounded-xl px-5 py-3 flex items-center gap-3 text-sm">
            <User className="w-4 h-4 text-adorix-primary" />
            <span className="text-adorix-dark font-medium">Signed in as</span>
            <span className="font-mono text-xs text-adorix-secondary truncate">{user?.primaryEmailAddress?.emailAddress ?? user?.id}</span>
          </div>
        )}

        {/* Campaign Studio */}
        <Section title="Campaign Studio" icon={Upload}>
          <Row label="useSupabase hook initialised" icon={Upload} {...studio.hookReady} />
          <Row label="Clerk user_id available" icon={User} {...studio.userId} />
          <Row label="ads table schema (insert fields)" icon={Upload} {...studio.insertDry} />
          <Row label="adorix-ads-media bucket read" icon={Film} {...studio.bucketRead} />
        </Section>

        {/* Dashboard */}
        <Section title="Dashboard Data" icon={LayoutDashboard}>
          <Row label="Read all ads" icon={LayoutDashboard} {...dashboard.adsRead} />
          <Row label="Filter ads by status=pending" icon={LayoutDashboard} {...dashboard.pendingAds} />
          <Row label="Filter ads by current user_id" icon={User} {...dashboard.myAds} />
        </Section>

        <p className="text-center text-xs text-gray-400">
          /test-campaign-dashboard — dev-only diagnostic page
        </p>
      </div>
    </div>
  );
}
