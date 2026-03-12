'use client';

import { useEffect } from 'react';

export default function ClerkDebugLog() {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
  
  // Format securely: Show first 12 chars to verify instance (e.g., pk_test_xxxx...)
  const displayKey = pk ? `${pk.substring(0, 15)}...` : 'MISSING';

  // 1. Log to the Server Terminal (Node.js) during initial render
  if (typeof window === 'undefined') {
    console.log('\n[SERVER] Active Clerk Key:', displayKey, '\n');
  }

  // 2. Log to the Browser Console (F12) after hydration
  useEffect(() => {
    console.log('%c[BROWSER] Active Clerk Key: ' + displayKey, 'color: #0A7383; font-weight: bold; font-size: 14px;');
    
    if (!pk.includes('pk_test_') && !pk.includes('pk_live_')) {
      console.error('CRITICAL: The loaded NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY does not look like a valid Clerk key. Check your .env.local file.');
    }
  }, [pk, displayKey]);

  return null; // This component is invisible
}
