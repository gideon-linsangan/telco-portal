import Link from 'next/link'

type Variant = 'primary' | 'ghost-purple' | 'ghost-white'
type Size = 'default' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-purple text-white border-transparent hover:bg-[#7500C0] hover:shadow-[0_4px_16px_rgba(161,0,255,0.35)]',
  'ghost-purple':
    'bg-transparent text-brand-purple border-brand-purple hover:bg-brand-bg',
  'ghost-white':
    'bg-transparent text-white border-white/70 hover:border-white hover:bg-white/12',
}

const sizeClasses: Record<Size, string> = {
  default: 'h-11 px-5 text-sm',
  lg: 'h-[52px] px-8 text-base',
}

const base =
  'inline-flex items-center justify-center rounded-lg border font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap'

export function Button({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function LinkButton({
  href,
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}
