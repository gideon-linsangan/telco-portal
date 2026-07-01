type HeadingProps = {
  level: 1 | 2 | 3 | 4
  variant: 'display' | 'h1' | 'h2' | 'h3'
  color?: 'ink' | 'white' | 'brand-deep' | 'brand-signature'
  children: React.ReactNode
}

const variantClasses: Record<HeadingProps['variant'], string> = {
  display: 'text-5xl font-bold tracking-tight',
  h1:      'text-3xl font-bold',
  h2:      'text-2xl font-semibold',
  h3:      'text-lg font-semibold',
}

const colorClasses: Record<NonNullable<HeadingProps['color']>, string> = {
  ink:              'text-neutral-ink',
  white:            'text-white',
  'brand-deep':     'text-brand-deep',
  'brand-signature':'text-brand-signature',
}

const Tag = ({ level, ...props }: { level: number } & React.HTMLAttributes<HTMLHeadingElement>) => {
  const H = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4'
  return <H {...props} />
}

export function Heading({ level, variant, color = 'ink', children }: HeadingProps) {
  return (
    <Tag level={level} className={`${variantClasses[variant]} ${colorClasses[color]}`}>
      {children}
    </Tag>
  )
}