import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/contact',
  '/course',
  '/course/(.*)',
  '/topic',
  '/sign-in(.*)',
  '/api/create-course',
  '/api/create-course/(.*)',
  '/api/contact',
  '/api/payment/webhook',
]);

export default clerkMiddleware(async (authFn, req) => {
  // Allow public routes
  if (isPublicRoute(req)) return;

  const { userId } = await authFn();
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}