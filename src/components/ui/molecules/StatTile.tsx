import { Text } from '@/components/ui/atoms/Text'

type StatTileProps = {
  label: string
  value: string
  background?: 'ghost' | 'white'
}

const bgClasses: Record<NonNullable<StatTileProps['background']>, string> = {
  ghost: 'bg-brand-ghost',
  white: 'bg-white',
}

export function StatTile({ label, value, background = 'ghost' }: StatTileProps) {
  return (
    <div className={`${bgClasses[background]} rounded-lg p-3.5 flex flex-col gap-1`}>
      <Text variant="label" color="slate">{label}</Text>
      <span className="text-[15px] leading-relaxed text-neutral-ink font-semibold">{value}</span>
    </div>
  )
}
