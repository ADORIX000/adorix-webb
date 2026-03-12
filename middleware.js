import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/accs(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow /api/contact to be public
  if (req.nextUrl.pathname.startsWith('/api/contact')) {
    return;
  }
  
  if (isProtectedRoute(req)) await auth.protect();
});