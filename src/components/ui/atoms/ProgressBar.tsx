type ProgressBarProps = {
  percent: number
  showThreshold?: boolean
}

export function ProgressBar({ percent, showThreshold = false }: ProgressBarProps) {
  const clamped = Math.min(percent, 100)

  const barColor =
    percent >= 100 ? 'bg-semantic-error' :
    percent >= 80  ? 'bg-semantic-warning' :
                     'bg-semantic-success'

  return (
    <div className="relative w-full h-2.5 bg-neutral-surface rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${barColor}`}
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      {showThreshold && (
        <div className="absolute top-0 bottom-0 w-px bg-neutral-slate/40" style={{ left: '80%' }} />
      )}
    </div>
  )
}