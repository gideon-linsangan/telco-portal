type IconProps = {
  name: string
  size?: 14 | 16 | 18 | 24
  color?: string
  'aria-label'?: string
}

export function Icon({ name, size = 16, color, 'aria-label': ariaLabel }: IconProps) {
  return (
    <img
      src={`/icons/${name}.svg`}
      width={size}
      height={size}
      alt={ariaLabel ?? ''}
      aria-hidden={ariaLabel ? undefined : true}
      className={color ?? ''}
      style={{ width: size, height: size }}
    />
  )
}