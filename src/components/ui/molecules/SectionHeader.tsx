import { Text } from '@/components/ui/atoms/Text'
import { Heading } from '@/components/ui/atoms/Heading'
import { Stack } from '@/components/layout/Stack'

type SectionHeaderProps = {
  eyebrow?: string
  heading: string
  align?: 'left' | 'center'
}

export function SectionHeader({ eyebrow, heading, align = 'left' }: SectionHeaderProps) {
  return (
    <Stack gap="gap-3">
      <div className={align === 'center' ? 'text-center' : ''}>
        {eyebrow && <Text variant="label" color="brand-signature">{eyebrow}</Text>}
        <Heading level={2} variant="h1">{heading}</Heading>
      </div>
    </Stack>
  )
}