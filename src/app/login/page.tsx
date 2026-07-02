'use client'
import { useActionState } from 'react'
import NextLink from 'next/link'
import { login } from '@/app/actions/auth'
import { Label } from '@/components/ui/atoms/Label'
import { Input } from '@/components/ui/atoms/Input'
import { Button } from '@/components/ui/atoms/Button'
import { Heading } from '@/components/ui/atoms/Heading'
import { Text } from '@/components/ui/atoms/Text'

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className="min-h-screen bg-neutral-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-brand-signature flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-neutral-ink font-bold text-lg tracking-tight">TelcoNow</span>
          </div>
          <Heading level={1} variant="h1" color="ink">Sign in to your account</Heading>
          <div className="mt-2">
            <Text variant="body" color="slate">Welcome back. Enter your credentials to continue.</Text>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-neutral-border rounded-xl shadow-card p-8">
          <form action={action} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" />
            </div>

            {/* Forgot password — href="#" per brief; destination not yet decided */}
            <div className="flex justify-end -mt-1">
              <NextLink href="#" className="text-[13px] text-brand-signature hover:text-brand-mid font-medium">
                Forgot password?
              </NextLink>
            </div>

            {state?.error && (
              <p role="alert" className="text-semantic-error text-[13px] font-medium -mt-1">
                {state.error}
              </p>
            )}

            <Button variant="primary" size="md" type="submit" fullWidth>
              {pending ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>

        {/* Sign-up — href="#" per brief */}
        <p className="text-center mt-6 text-[13px] text-neutral-slate">
          Don&apos;t have an account?{' '}
          <NextLink href="#" className="text-brand-signature hover:text-brand-mid font-semibold">
            Get started
          </NextLink>
        </p>
      </div>
    </div>
  )
}
