import { Avatar } from '@/components/ui/atoms/Avatar'
import { Text } from '@/components/ui/atoms/Text'

type UserChipProps = {
  name: string
  planName: string
  initials: string
}

export function UserChip({ name, planName, initials }: UserChipProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar initials={initials} size="md" />
      <div className="flex flex-col gap-0.5">
        <Text variant="small" color="white">{name}</Text>
        <Text variant="small" color="brand-light">{planName}</Text>
      </div>
    </div>
  )
}
