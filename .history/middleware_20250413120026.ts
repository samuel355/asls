import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Protect all routes under /dashboard
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    await auth.protect()
  }

  // Redirect authenticated users from home to dashboard
  if (auth.isAuthenticated && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}