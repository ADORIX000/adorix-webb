import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/home(.*)',
  '/dashboard(.*)',
  '/profile(.*)',
  '/accs(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Public routes: API routes that should be accessible without authentication
  if (req.nextUrl.pathname.startsWith('/api/contact')) {
    return;
  }

  // Protected routes: Check if the current route matches our protected list and enforce auth
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};