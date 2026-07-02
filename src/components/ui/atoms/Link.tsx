import NextLink from 'next/link'

type LinkProps = {
  variant: 'inline' | 'arrow' | 'nav' | 'muted'
  href: string
  children: React.ReactNode
}

const variantMap = {
  inline: 'text-brand-signature hover:text-brand-mid font-semibold transition-colors',
  arrow:  'group inline-flex items-center gap-1 text-brand-signature hover:text-brand-mid font-semibold transition-colors',
  nav:    'text-white/85 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md text-[14px] font-medium transition-all',
  muted:  'text-neutral-slate hover:text-neutral-ink transition-colors',
}

export function Link({ variant, href, children }: LinkProps) {
  return (
    <NextLink href={href} className={variantMap[variant]}>
      {children}
      {variant === 'arrow' && (
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      )}
    </NextLink>
  )
}
