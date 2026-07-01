type StackProps = {
  gap?: string
  children: React.ReactNode
}

export function Stack({ gap = 'gap-4', children }: StackProps) {
  return <div className={`flex flex-col ${gap}`}>{children}</div>
}