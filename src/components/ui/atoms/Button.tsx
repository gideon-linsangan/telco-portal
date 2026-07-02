'use client'

type ButtonProps = {
  variant: 'primary' | 'ghost-purple' | 'ghost-white' | 'ghost-hero'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
}

const variantMap = {
  primary:       'bg-brand-signature hover:bg-brand-mid text-white rounded-lg font-semibold transition-colors',
  'ghost-purple':'border border-brand-signature text-brand-signature hover:bg-brand-ghost rounded-lg font-semibold transition-colors',
  'ghost-white': 'border border-white/70 text-white hover:bg-white/10 rounded-lg font-semibold transition-colors',
  'ghost-hero':  'border border-white/60 text-white hover:border-white hover:bg-white/10 rounded-lg font-semibold transition-colors',
}

const sizeMap = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[14px]',
  lg: 'h-13 px-8 text-[16px]',
}

export function Button({ variant, size = 'md', fullWidth, onClick, type = 'button', children }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variantMap[variant]} ${sizeMap[size]}${fullWidth ? ' w-full' : ''}`}
    >
      {children}
    </button>
  )
}
