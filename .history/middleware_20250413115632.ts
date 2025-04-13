import { authMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    if (auth.userId && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}