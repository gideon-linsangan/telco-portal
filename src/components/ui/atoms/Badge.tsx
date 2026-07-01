type BadgeProps = {
  variant: 'success' | 'warning' | 'error' | 'neutral' | 'purple' | 'info'
  dot?: boolean
  children: React.ReactNode
}

const variantClasses: Record<BadgeProps['variant'], string> = {
  success: 'bg-semantic-success-tint text-semantic-success',
  warning: 'bg-semantic-warning-tint text-semantic-warning',
  error:   'bg-semantic-error-tint text-semantic-error',
  neutral: 'bg-neutral-surface text-neutral-slate',
  purple:  'bg-brand-light text-brand-deep',
  info:    'bg-blue-50 text-blue-700',
}

const dotColorClasses: Record<BadgeProps['variant'], string> = {
  success: 'bg-semantic-success',
  warning: 'bg-semantic-warning',
  error:   'bg-semantic-error',
  neutral: 'bg-neutral-slate',
  purple:  'bg-brand-deep',
  info:    'bg-blue-700',
}

export function Badge({ variant, dot = false, children }: BadgeProps) {
  return (
    <span className={`rounded-full text-xs font-semibold px-3 py-1 inline-flex items-center gap-1.5 ${variantClasses[variant]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColorClasses[variant]}`} />}
      {children}
    </span>
  )
}