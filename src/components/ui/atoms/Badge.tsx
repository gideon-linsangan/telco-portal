type BadgeProps = {
  variant: 'success' | 'warning' | 'error' | 'neutral' | 'purple' | 'info'
  dot?: boolean
  children: React.ReactNode
}

const variantMap = {
  success: 'bg-semantic-success-tint text-semantic-success',
  warning: 'bg-semantic-warning-tint text-semantic-warning',
  error:   'bg-semantic-error-tint text-semantic-error',
  neutral: 'bg-neutral-surface text-neutral-slate',
  purple:  'bg-brand-light text-brand-deep',
  info:    'bg-blue-50 text-blue-700',
}

const dotMap = {
  success: 'bg-semantic-success',
  warning: 'bg-semantic-warning',
  error:   'bg-semantic-error',
  neutral: 'bg-neutral-slate',
  purple:  'bg-brand-deep',
  info:    'bg-blue-700',
}

export function Badge({ variant, dot, children }: BadgeProps) {
  return (
    <span className={`${variantMap[variant]} rounded-full text-xs font-semibold px-3 py-1 inline-flex items-center gap-1.5`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotMap[variant]}`} />}
      {children}
    </span>
  )
}
