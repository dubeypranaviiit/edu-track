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
  '/api/instructor/create-course',
  '/api/instructor/create-course/(.*)',
  '/api/contact',
  '/api/payment/webhook',
]);

export default clerkMiddleware(async (authFn, req) => {
  
  if (isPublicRoute(req)) return;

  const { userId } = await authFn();
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
    '/(api|trpc)(.*)',
  ],
}