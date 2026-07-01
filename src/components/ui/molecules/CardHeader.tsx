import { Text } from '@/components/ui/atoms/Text'

type CardHeaderProps = {
  label: string
  action?: React.ReactNode
}

export function CardHeader({ label, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Text variant="label" color="slate">{label}</Text>
      {action}
    </div>
  )
}
