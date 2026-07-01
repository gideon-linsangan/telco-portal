type GridProps = {
  cols?: string
  gap?: string
  children: React.ReactNode
}

export function Grid({ cols = 'grid-cols-12', gap = 'gap-6', children }: GridProps) {
  return <div className={`grid ${cols} ${gap}`}>{children}</div>
}