import { StatusDot } from '@/components/ui/atoms/StatusDot'
import { Text } from '@/components/ui/atoms/Text'

type AnnouncementPillProps = {
  label: string
}

export function AnnouncementPill({ label }: AnnouncementPillProps) {
  return (
    <div className="self-start inline-flex items-center gap-2 bg-brand-signature/25 border border-brand-signature/40 rounded-full px-3.5 py-1.5">
      <StatusDot color="success" />
      <Text variant="label" color="brand-light">{label}</Text>
    </div>
  )
}
