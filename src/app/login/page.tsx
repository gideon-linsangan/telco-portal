'use client'
import { useActionState, useState } from 'react'
import NextLink from 'next/link'
import { login } from '@/app/actions/auth'
import { Label } from '@/components/ui/atoms/Label'
import { Input } from '@/components/ui/atoms/Input'
import { Button } from '@/components/ui/atoms/Button'

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function CheckCircle() {
  return (
    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(161,0,255,0.35)', border: '1px solid rgba(161,0,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="#E5CCFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex h-screen min-h-[600px] overflow-hidden">

      {/* ── Left panel ─────────────────────────────────── */}
      <div className="hidden md:flex md:w-[45%] bg-brand-deep flex-col relative overflow-hidden">

        {/* Wordmark */}
        <div className="px-9 py-8 relative z-10 flex-shrink-0">
          <span className="text-white font-bold text-xl tracking-tight">
            Telco<span className="text-brand-light">Now</span>
          </span>
        </div>

        {/* Centre copy */}
        <div className="flex-1 flex flex-col justify-center px-12 pb-20 relative z-10 gap-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand-light/70 mb-5">
              Your account
            </p>
            <h2 className="text-[28px] font-semibold text-white leading-snug tracking-tight">
              Your account.<br />Your data.<br />Always in control.
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {['View real-time usage', 'Manage your plan', 'Pay your bill'].map(text => (
              <div key={text} className="flex items-center gap-3 text-white/90 text-[15px] leading-relaxed">
                <CheckCircle />
                <span>{text}</span>
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
            <circle cx="460" cy="300" r="80" stroke="rgba(229,204,255,0.08)" strokeWidth="1" fill="none" />
            <circle cx="460" cy="300" r="50" stroke="rgba(229,204,255,0.12)" strokeWidth="1" fill="none" />
            <g stroke="rgba(161,0,255,0.22)" strokeWidth="0.8" fill="none">
              <polygon points="300,200 326,215 326,245 300,260 274,245 274,215" />
              <polygon points="326,215 352,230 352,260 326,275 300,260 300,230" />
              <polygon points="274,215 300,230 300,260 274,275 248,260 248,230" />
              <polygon points="352,260 378,275 378,305 352,320 326,305 326,275" />
              <polygon points="300,260 326,275 326,305 300,320 274,305 274,275" />
              <polygon points="248,260 274,275 274,305 248,320 222,305 222,275" />
            </g>
            <path d="M 480 0 Q 480 80 400 120" stroke="rgba(161,0,255,0.3)" strokeWidth="1.5" fill="none" />
            <path d="M 540 0 Q 540 120 430 170" stroke="rgba(161,0,255,0.2)" strokeWidth="1.2" fill="none" />
            <path d="M 540 40 Q 520 140 450 195" stroke="rgba(161,0,255,0.15)" strokeWidth="1" fill="none" />
            <circle cx="400" cy="120" r="4" fill="#A100FF" opacity="0.7" />
            <circle cx="430" cy="170" r="3" fill="#7500C0" opacity="0.5" />
            <circle cx="352" cy="215" r="3" fill="#E5CCFF" opacity="0.4" />
            <circle cx="300" cy="200" r="4" fill="#A100FF" opacity="0.5" />
            <rect x="0" y="200" width="540" height="120" fill="url(#bottomFade)" />
            <defs>
              <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#460073" stopOpacity="0" />
                <stop offset="100%" stopColor="#460073" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────── */}
      <div className="w-full md:w-[55%] bg-white flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[400px] flex flex-col">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-ink tracking-tight mb-2">Welcome back.</h1>
            <p className="text-[15px] text-neutral-slate leading-relaxed">Sign in to your TelcoNow account</p>
          </div>

          {/* Form */}
          <form action={action} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <NextLink href="#" className="text-[13px] text-brand-signature hover:text-brand-mid font-medium hover:underline">
                  Forgot password?
                </NextLink>
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="text-neutral-slate hover:text-brand-signature p-3 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon />
                  </button>
                }
              />
            </div>

            {/* Error */}
            {state?.error && (
              <p role="alert" className="text-semantic-error text-[13px] font-medium">
                {state.error}
              </p>
            )}

            {/* Submit */}
            <div className="mt-1">
              <Button variant="primary" size="md" type="submit" fullWidth>
                {pending ? 'Signing in…' : 'Sign in'}
              </Button>
            </div>
          </form>

          {/* Sign-up */}
          <p className="text-center text-[14px] text-neutral-slate mt-8">
            Don&apos;t have an account?{' '}
            <NextLink href="#" className="text-brand-signature hover:text-brand-mid font-semibold">
              Get started →
            </NextLink>
          </p>
        </div>
      </div>
    </div>
  )
}
