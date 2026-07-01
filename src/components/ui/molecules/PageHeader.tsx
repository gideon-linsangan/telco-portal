import { Heading } from '@/components/ui/atoms/Heading'
import { Text } from '@/components/ui/atoms/Text'
import { Stack } from '@/components/layout/Stack'

type PageHeaderProps = {
  greeting: string
  subtitle: string
}

export function PageHeader({ greeting, subtitle }: PageHeaderProps) {
  return (
    <Stack gap="gap-1">
      <Heading level={1} variant="h1">{greeting}</Heading>
      <Text variant="body" color="slate">{subtitle}</Text>
    </Stack>
  )
}