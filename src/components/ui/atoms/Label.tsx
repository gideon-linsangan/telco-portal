type LabelProps = {
  htmlFor: string
  children: React.ReactNode
}

export function Label({ htmlFor, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-[13px] font-semibold text-neutral-ink tracking-[0.01em]">
      {children}
    </label>
  )
}
