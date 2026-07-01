import { Avatar } from '@/components/ui/atoms/Avatar'
import { Stack } from '@/components/layout/Stack'
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
      <Stack gap="gap-0">
        <Text variant="small" color="white">{name}</Text>
        <Text variant="caption" color="brand-light">{planName}</Text>
      </Stack>
    </div>
  )
}
