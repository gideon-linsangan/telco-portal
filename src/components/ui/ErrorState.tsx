interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <span className="text-2xl" aria-hidden>⚠️</span>
      <p className="text-[15px] font-semibold text-neutral-ink">Something went wrong</p>
      {message && <p className="text-sm text-neutral-slate">{message}</p>}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 text-sm font-semibold text-brand-signature hover:text-brand-mid transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  )
}
