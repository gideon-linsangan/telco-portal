type TextProps = {
  variant: 'body' | 'caption' | 'label' | 'metric' | 'small'
  color?: 'ink' | 'slate' | 'white' | 'brand-light' | 'brand-signature'
  children: React.ReactNode
}

const variantClasses: Record<TextProps['variant'], string> = {
  body:    'text-[15px] leading-relaxed',
  caption: 'text-xs leading-relaxed',
  label:   'text-xs font-medium uppercase tracking-wider',
  metric:  'text-[28px] font-bold',
  small:   'text-[13px]',
}

const colorClasses: Record<NonNullable<TextProps['color']>, string> = {
  ink:              'text-neutral-ink',
  slate:            'text-neutral-slate',
  white:            'text-white',
  'brand-light':    'text-brand-light',
  'brand-signature':'text-brand-signature',
}

export function Text({ variant, color = 'ink', children }: TextProps) {
  return (
    <span className={`${variantClasses[variant]} ${colorClasses[color]}`}>
      {children}
    </span>
  )
}