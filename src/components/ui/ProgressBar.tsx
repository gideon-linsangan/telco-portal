interface ProgressBarProps {
  percent: number
  className?: string
}

export function ProgressBar({ percent, className = '' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent))
  const isHigh = clamped >= 80

  return (
    <div className={`w-full h-2.5 bg-brand-surface rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-300 ${
          isHigh
            ? 'bg-[linear-gradient(90deg,#00B388_0%,#00B388_70%,#FF6B35_70%,#FF6B35_100%)]'
            : 'bg-[#00B388]'
        }`}
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
