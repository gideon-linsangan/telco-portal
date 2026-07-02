'use client'

import { useEffect, useState } from 'react'

type IconProps = {
  name: string
  size?: 14 | 16 | 18 | 24
  color?: string
  'aria-label'?: string
}

export function Icon({ name, size = 16, color, 'aria-label': ariaLabel }: IconProps) {
  const [svg, setSvg] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/icons/${name}.svg`)
      .then(r => r.ok ? r.text() : Promise.reject())
      .then(setSvg)
      .catch(() => setSvg(null))
  }, [name])

  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0${color ? ` ${color}` : ''}`}
      style={{ width: size, height: size }}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  )
}
