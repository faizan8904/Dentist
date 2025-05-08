'use client'

import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import { login } from '@/actions/auth'
import { useRouter } from 'next/navigation' 

export default function LoginPage() {

    const router = useRouter();

  const [state, formAction, isPending] = useActionState(login, { 
    success: false, 
    message: '' 
  })

  useEffect(() => {
    if (state.success) {
      router.push('/dashboard');
    }
  }, [state.success, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-100">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-base-100 border border-base-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-base-content">Welcome Back</h1>
          <p className="text-base-content/70">Sign in to your account</p>
          
          {state.message && (
            <p className={`mt-2 text-sm ${state.success ? 'text-success' : 'text-error'}`}>
              {state.message}
            </p>
          )}
        </div>

        <form action={formAction} className="space-y-6">
          {/* Email Input (same as before) */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-base-content">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-base-content/50" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password Input (same as before) */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-base-content">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-base-content/50" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password (same as before) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-base-300 text-primary focus:ring-primary bg-base-100"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-base-content">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forget-password" className="font-medium text-primary hover:text-primary-focus">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <FaSignInAlt className="mr-2" />
                  Sign in
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}