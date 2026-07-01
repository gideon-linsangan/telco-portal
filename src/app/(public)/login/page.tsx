'use client'

import { useActionState } from 'react'
import { login, type LoginState } from '@/app/actions/auth'
import Link from 'next/link'

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, undefined)

  return (
    <div className="flex h-screen min-h-[600px] overflow-hidden">
      {/* Left panel — brand */}
      <div className="w-[45%] bg-brand-deep flex flex-col relative overflow-hidden">
        {/* Wordmark */}
        <div className="px-9 py-8 flex-shrink-0 relative z-10">
          <Link href="/" className="text-white text-xl font-bold tracking-tight no-underline">
            Telco<span className="text-brand-light">Now</span>
          </Link>
        </div>

        {/* Centre content */}
        <div className="flex-1 flex flex-col justify-center px-12 pb-20 relative z-10 gap-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-brand-light/70 mb-5">Your account</p>
            <h2 className="text-[28px] font-semibold text-white leading-[1.3] tracking-[-0.01em]">
              Your account.<br />Your data.<br />Always in control.
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {['View real-time usage', 'Manage your plan', 'Pay your bill'].map((bullet) => (
              <div key={bullet} className="flex items-center gap-3 text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.92)' }}>
                <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(161,0,255,0.35)', border: '1px solid rgba(161,0,255,0.6)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#E5CCFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative SVG */}
        <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
          <svg width="100%" viewBox="0 0 540 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <circle cx="60" cy="320" r="120" stroke="rgba(161,0,255,0.2)" strokeWidth="1" fill="none" />
            <circle cx="60" cy="320" r="180" stroke="rgba(161,0,255,0.14)" strokeWidth="1" fill="none" />
            <circle cx="60" cy="320" r="240" stroke="rgba(161,0,255,0.09)" strokeWidth="1" fill="none" />
            <circle cx="60" cy="320" r="300" stroke="rgba(161,0,255,0.06)" strokeWidth="1" fill="none" />
            <g stroke="rgba(161,0,255,0.22)" strokeWidth="0.8" fill="none">
              <polygon points="300,200 326,215 326,245 300,260 274,245 274,215" />
              <polygon points="326,215 352,230 352,260 326,275 300,260 300,230" />
              <polygon points="274,215 300,230 300,260 274,275 248,260 248,230" />
            </g>
          </svg>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-[55%] bg-white flex items-center justify-center px-12">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h1 className="text-[32px] font-bold text-neutral-ink tracking-tight mb-2">Welcome back.</h1>
            <p className="text-[15px] text-neutral-slate leading-relaxed">Sign in to your TelcoNow account</p>
          </div>

          <form action={action} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[13px] font-semibold text-neutral-ink tracking-[0.01em]">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full h-11 border border-neutral-border rounded-lg px-3.5 text-[15px] text-neutral-ink bg-white outline-none transition-all placeholder:text-[#B0B0C0] focus:border-brand-signature focus:shadow-[0_0_0_3px_rgba(161,0,255,0.15)]"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-[13px] font-semibold text-neutral-ink tracking-[0.01em]">
                  Password
                </label>
                <a
                  href="#"
                  aria-disabled="true"
                  className="text-[13px] text-brand-signature font-medium pointer-events-none opacity-50"
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
                className="w-full h-11 border border-neutral-border rounded-lg px-3.5 text-[15px] text-neutral-ink bg-white outline-none transition-all placeholder:text-[#B0B0C0] focus:border-brand-signature focus:shadow-[0_0_0_3px_rgba(161,0,255,0.15)]"
                placeholder="••••••••"
              />
            </div>

            {state?.error && (
              <p role="alert" className="text-semantic-error text-sm font-medium">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-1 w-full h-11 bg-brand-signature text-white text-[15px] font-semibold rounded-lg border-none cursor-pointer transition-all hover:bg-brand-mid hover:shadow-[0_4px_16px_rgba(161,0,255,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pending ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-[14px] text-neutral-slate mt-8">
            Don&apos;t have an account?{' '}
            <a
              href="#"
              aria-disabled="true"
              className="text-brand-signature font-semibold pointer-events-none opacity-50"
            >
              Get started →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
