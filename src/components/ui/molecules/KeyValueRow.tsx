type KeyValueRowProps = {
  label: string
  value: React.ReactNode
}

export function KeyValueRow({ label, value }: KeyValueRowProps) {
  return (
    <div className="flex justify-between items-center text-[13px]">
      <span className="text-neutral-slate">{label}</span>
      <span className="text-neutral-ink font-semibold">{value}</span>
    </div>
  )
}
