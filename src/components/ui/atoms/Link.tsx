import NextLink from 'next/link'

type LinkProps = {
  variant: 'inline' | 'arrow' | 'nav' | 'muted'
  href: string
  children: React.ReactNode
}

export function Link({ variant, href, children }: LinkProps) {
  if (variant === 'arrow') {
    return (
      <NextLink href={href} className="group inline-flex items-center gap-1 text-brand-signature hover:text-brand-mid font-semibold transition-colors">
        {children}
        <span className="transition-transform group-hover:translate-x-0.5"> →</span>
      </NextLink>
    )
  }

  const classes: Record<Exclude<LinkProps['variant'], 'arrow'>, string> = {
    inline: 'text-brand-signature hover:text-brand-mid font-semibold transition-colors',
    nav:    'text-white/85 hover:text-white font-medium transition-colors',
    muted:  'text-neutral-slate hover:text-neutral-ink transition-colors',
  }

  return (
    <NextLink href={href} className={classes[variant as keyof typeof classes]}>
      {children}
    </NextLink>
  )
}