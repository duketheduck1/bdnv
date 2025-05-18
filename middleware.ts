import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/' || 
                      path.startsWith('/api/') || 
                      path.includes('.');

  // Check if user is authenticated by looking for the privy token
  const privyToken = request.cookies.get('privy-token')?.value;
  const isAuthenticated = !!privyToken;

  // Redirect logic
  if (!isPublicPath && !isAuthenticated) {
    // Redirect to home page if trying to access protected route without authentication
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (path === '/dashboard' && !isAuthenticated) {
    // Redirect to home page if trying to access dashboard without authentication
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes that are handled by API routes
     * 2. /_next (Next.js internals)
     * 3. /fonts, /images (static files)
     * 4. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api/|_next/|fonts/|images/|favicon.ico|sitemap.xml).*)',
  ],
};
