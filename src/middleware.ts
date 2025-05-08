import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('auth_token')?.value

  // Public routes that don't need protection
  const publicRoutes = ['/login', '/forget-password']
  
  // If accessing protected route without token, redirect to login
  if (!publicRoutes.includes(path) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If accessing login/forget-password with valid token, redirect to dashboard
  if (publicRoutes.includes(path) && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      await jwtVerify(token, secret)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch {
      // Token is invalid, allow access to public route
      return NextResponse.next()
    }
  }

  // Verify token for protected routes
  if (token && !publicRoutes.includes(path)) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      const { payload } = await jwtVerify(token, secret)

      // Check valid role
      if (!payload.role || !['ADMIN', 'DOCTOR', 'STAFF'].includes(payload.role as string)) {
        return NextResponse.redirect(new URL('/not-found', request.url))
      }

      // Add user info to headers
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', payload.userId as string)
      requestHeaders.set('x-user-role', payload.role as string)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      console.error('JWT verification failed:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/forget-password'],
}