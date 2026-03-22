import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/home(.*)',
  '/dashboard(.*)',
  '/profile(.*)',
  '/accs(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Public routes: API routes that should be accessible without authentication
  if (req.nextUrl.pathname.startsWith('/api/contact')) {
    return NextResponse.next();
  }

  // Protected routes: Check if the current route matches our protected list and enforce auth
  if (isProtectedRoute(req)) await auth.protect();

  const res = NextResponse.next();

  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://clerk.adorixit.com https://img.clerk.com https://*.clerk.accounts.dev;
    script-src-elem 'self' 'unsafe-inline' https://challenges.cloudflare.com https://clerk.adorixit.com https://img.clerk.com https://*.clerk.accounts.dev;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https://img.clerk.com https://ui-avatars.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://challenges.cloudflare.com https://clerk.adorixit.com https://*.clerk.accounts.dev;
    frame-src 'self' https://challenges.cloudflare.com https://clerk.adorixit.com https://*.clerk.accounts.dev;
    worker-src 'self' blob:;
    form-action 'self' https://sandbox.payhere.lk https://www.payhere.lk;
  `.replace(/\s{2,}/g, ' ').trim();

  res.headers.set('Content-Security-Policy', csp);
  res.headers.set('x-csp-source', 'proxy-v1');
  return res;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};