type BadgeVariant = 'success' | 'warning' | 'error' | 'neutral' | 'purple' | 'info'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-semantic-success-tint text-semantic-success',
  warning: 'bg-semantic-warning-tint text-semantic-warning',
  error: 'bg-semantic-error-tint text-semantic-error',
  neutral: 'bg-neutral-surface text-neutral-slate',
  purple: 'bg-brand-light text-brand-deep',
  info: 'bg-blue-50 text-blue-700',
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
