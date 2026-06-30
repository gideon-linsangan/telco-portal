'use client'

import { useActionState } from 'react'
import { login, type LoginState } from '@/app/actions/auth'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, undefined)

  return (
    <div className="min-h-screen flex bg-brand-bg">
      {/* Left panel — brand */}
      <div className="hidden lg:flex w-1/2 bg-brand-purple-darkest flex-col justify-between p-16">
        <Link href="/" className="text-white text-xl font-bold tracking-tight no-underline">
          Telco<span className="text-brand-purple-light">Now</span>
        </Link>
        <div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Welcome back.
          </h2>
          <p className="text-brand-purple-light text-lg leading-relaxed">
            Manage your plan, check your usage, and stay in control of your account.
          </p>
        </div>
        <p className="text-white/30 text-sm">© {new Date().getFullYear()} TelcoNow Pty Ltd</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Link href="/" className="text-brand-purple-darkest text-xl font-bold tracking-tight no-underline">
              Telco<span className="text-brand-purple">Now</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-brand-dark mb-2">Sign in to your account</h1>
          <p className="text-brand-muted text-sm mb-8">
            Don&apos;t have an account?{' '}
            <a
              href="#"
              aria-disabled="true"
              className="text-brand-purple font-semibold pointer-events-none opacity-50"
            >
              Get started
            </a>
          </p>

          <form action={action} noValidate className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full h-11 border border-brand-border rounded-lg px-3.5 text-sm text-brand-dark bg-white outline-none transition-all placeholder:text-brand-surface focus:border-brand-purple focus:ring-3 focus:ring-brand-purple/15"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-brand-dark">
                  Password
                </label>
                <a
                  href="#"
                  aria-disabled="true"
                  className="text-xs text-brand-purple font-medium pointer-events-none opacity-50"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full h-11 border border-brand-border rounded-lg px-3.5 text-sm text-brand-dark bg-white outline-none transition-all placeholder:text-brand-surface focus:border-brand-purple focus:ring-3 focus:ring-brand-purple/15"
                placeholder="••••••••"
              />
            </div>

            {state?.error && (
              <p role="alert" className="text-status-error-text text-sm font-medium">
                {state.error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="default"
              disabled={pending}
              className="w-full justify-center mt-2"
            >
              {pending ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
