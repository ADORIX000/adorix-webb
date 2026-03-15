import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/accs(.*)',
]);

export const proxy = clerkMiddleware(async (auth, req) => {
  // Allow /api/contact to be fully public
  if (req.nextUrl.pathname.startsWith('/api/contact')) {
    return;
  }
  
  if (isProtectedRoute(req)) await auth.protect();
});

// Tell Next.js which routes this middleware should run on.
// This EXCLUDES static files, images, and – critically – allows OPTIONS preflight requests through.
export const config = {
  matcher: [
    // Skip Next.js internals, static files, and _next
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes (let the handler inside decide)
    '/(api|trpc)(.*)',
  ],
};