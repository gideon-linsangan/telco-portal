type ProgressBarProps = {
  percent: number
  showThreshold?: boolean
}

export function ProgressBar({ percent, showThreshold }: ProgressBarProps) {
  const clamped = Math.min(Math.max(percent, 0), 100)

  const fillColor =
    clamped >= 100 ? 'bg-semantic-error' :
    clamped >= 80  ? 'bg-semantic-warning' :
                     'bg-semantic-success'

  return (
    <div className="relative w-full h-2.5 bg-neutral-surface rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${fillColor}`}
        style={{ width: `${clamped}%` }}
      />
      {showThreshold && (
        <span className="absolute top-0 bottom-0 w-px bg-neutral-slate/40" style={{ left: '80%' }} />
      )}
    </div>
  )
}
