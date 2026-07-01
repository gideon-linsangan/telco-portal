type ButtonProps = {
  variant: 'primary' | 'ghost-purple' | 'ghost-white' | 'ghost-hero'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  onClick?: () => void
  children: React.ReactNode
}

const variantClasses: Record<ButtonProps['variant'], string> = {
  primary:       'bg-brand-signature hover:bg-brand-mid text-white rounded-lg font-semibold transition-colors',
  'ghost-purple':'border border-brand-signature text-brand-signature hover:bg-brand-ghost rounded-lg font-semibold transition-colors',
  'ghost-white': 'border border-white/70 text-white hover:bg-white/10 rounded-lg font-semibold transition-colors',
  'ghost-hero':  'border border-white/60 text-white hover:border-white hover:bg-white/10 rounded-lg font-semibold transition-colors',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[14px]',
  lg: 'h-13 px-8 text-[16px]',
}

export function Button({ variant, size = 'md', fullWidth = false, onClick, children }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]}${fullWidth ? ' w-full' : ''}`}
    >
      {children}
    </button>
  )
}