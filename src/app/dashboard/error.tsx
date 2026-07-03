'use client'

import { useEffect } from 'react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="p-4 md:p-8 flex items-center justify-center min-h-[60vh]">
      <div className="bg-white border border-neutral-border rounded-xl shadow-card p-8 max-w-md w-full text-center">
        <div className="w-12 h-12 bg-semantic-error-tint rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 6v4m0 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="#E8002D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-neutral-ink mb-2">Something went wrong</h2>
        <p className="text-[14px] text-neutral-slate mb-6">
          We couldn&apos;t load your dashboard. This is usually temporary.
        </p>
        <button
          onClick={reset}
          className="bg-brand-signature hover:bg-brand-mid text-white font-medium px-6 h-11 rounded-lg transition-colors w-full"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
