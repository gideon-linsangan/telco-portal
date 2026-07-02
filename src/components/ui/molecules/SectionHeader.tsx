import { Text } from '@/components/ui/atoms/Text'
import { Heading } from '@/components/ui/atoms/Heading'

type SectionHeaderProps = {
  eyebrow?: string
  heading: string
  align?: 'left' | 'center'
}

export function SectionHeader({ eyebrow, heading, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-3${align === 'center' ? ' items-center text-center' : ''}`}>
      {eyebrow && <Text variant="label" color="brand-signature">{eyebrow}</Text>}
      <Heading level={2} variant="h1">{heading}</Heading>
    </div>
  )
}
