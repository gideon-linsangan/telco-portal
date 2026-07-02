type TextProps = {
  variant: 'body' | 'caption' | 'label' | 'metric' | 'small'
  color?: 'ink' | 'slate' | 'white' | 'brand-light' | 'brand-signature'
  children: React.ReactNode
}

const variantMap = {
  body:    'text-[15px] leading-relaxed',
  caption: 'text-xs leading-relaxed',
  label:   'text-xs font-medium uppercase tracking-wider',
  metric:  'text-[28px] font-bold',
  small:   'text-[13px]',
}

const colorMap = {
  ink:              'text-neutral-ink',
  slate:            'text-neutral-slate',
  white:            'text-white',
  'brand-light':    'text-brand-light',
  'brand-signature':'text-brand-signature',
}

const blockVariants = new Set(['body', 'caption'])

export function Text({ variant, color = 'ink', children }: TextProps) {
  const classes = `${variantMap[variant]} ${colorMap[color]}`
  return blockVariants.has(variant)
    ? <p className={classes}>{children}</p>
    : <span className={classes}>{children}</span>
}
