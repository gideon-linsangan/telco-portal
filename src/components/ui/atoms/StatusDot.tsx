type StatusDotProps = {
  color: 'success' | 'warning' | 'error'
}

const colorClasses: Record<StatusDotProps['color'], string> = {
  success: 'bg-semantic-success',
  warning: 'bg-semantic-warning',
  error:   'bg-semantic-error',
}

export function StatusDot({ color }: StatusDotProps) {
  return <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colorClasses[color]}`} />
}