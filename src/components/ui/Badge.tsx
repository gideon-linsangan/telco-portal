type BadgeVariant = 'success' | 'warning' | 'error' | 'neutral' | 'purple' | 'info'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-status-success-bg text-status-success-text',
  warning: 'bg-status-warning-bg text-status-warning-text',
  error: 'bg-status-error-bg text-status-error-text',
  neutral: 'bg-brand-surface text-brand-muted',
  purple: 'bg-brand-purple-light text-brand-purple-darkest',
  info: 'bg-status-info-bg text-status-info-text',
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full text-xs font-semibold px-2.5 py-0.5 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
