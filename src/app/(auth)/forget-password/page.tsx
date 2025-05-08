// app/forget-password/page.tsx
'use client'

import { useActionState } from 'react'
import { resetPassword } from '@/actions/auth'
import { FaEnvelope, FaPhone, FaKey, FaLock } from 'react-icons/fa'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState(resetPassword, {
    success: false,
    message: ''
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-base-100 border border-base-300">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-base-content/70 mt-2">
            Please fill all fields to reset your password
          </p>
        </div>

        {state.message && (
          <div className={`mb-4 p-3 rounded ${state.success ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 required">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaEnvelope className="text-base-content/50" />
              </div>
              <input
                type="email"
                name="email"
                className="w-full pl-10 input input-bordered"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 required">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaPhone className="text-base-content/50" />
              </div>
              <input
                type="tel"
                name="phone"
                className="w-full pl-10 input input-bordered"
                placeholder="+1234567890"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 required">4-Digit Security Code</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaKey className="text-base-content/50" />
              </div>
              <input
                type="text"
                name="securityCode"
                maxLength={4}
                minLength={4}
                className="w-full pl-10 input input-bordered"
                placeholder="1234"
                pattern="\d{4}"
                inputMode="numeric"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">We'll send a code to your email/phone</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 required">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaLock className="text-base-content/50" />
              </div>
              <input
                type="password"
                name="newPassword"
                className="w-full pl-10 input input-bordered"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 required">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaLock className="text-base-content/50" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                className="w-full pl-10 input input-bordered"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full btn btn-primary mt-4">
            Reset Password
          </button>

          <div className="text-center text-sm mt-4">
            <Link href="/login" className="link link-primary">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}