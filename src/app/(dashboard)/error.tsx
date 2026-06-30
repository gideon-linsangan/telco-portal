'use client'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        <h2 className="text-brand-dark text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-brand-muted text-sm mb-6">{error.message ?? 'An unexpected error occurred.'}</p>
        <button
          onClick={reset}
          className="text-brand-purple text-sm font-semibold hover:text-[#7500C0] transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
