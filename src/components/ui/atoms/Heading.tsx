type HeadingProps = {
  level: 1 | 2 | 3 | 4
  variant: 'display' | 'h1' | 'h2' | 'h3'
  color?: 'ink' | 'white' | 'brand-deep' | 'brand-signature'
  children: React.ReactNode
}

const variantMap = {
  display: 'text-5xl font-bold tracking-tight',
  h1:      'text-3xl font-bold',
  h2:      'text-2xl font-semibold',
  h3:      'text-lg font-semibold',
}

const colorMap = {
  ink:              'text-neutral-ink',
  white:            'text-white',
  'brand-deep':     'text-brand-deep',
  'brand-signature':'text-brand-signature',
}

export function Heading({ level, variant, color = 'ink', children }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4'
  return <Tag className={`${variantMap[variant]} ${colorMap[color]}`}>{children}</Tag>
}
