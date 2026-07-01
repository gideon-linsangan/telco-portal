type SectionBackground = 'brand.deep' | 'white' | 'brand.ghost'

type SectionProps = {
  background?: SectionBackground
  children: React.ReactNode
}

const bgMap: Record<SectionBackground, string> = {
  'brand.deep': 'bg-brand-deep',
  white: 'bg-white',
  'brand.ghost': 'bg-brand-ghost',
}

export function Section({ background, children }: SectionProps) {
  return (
    <section className={`w-full${background ? ' ' + bgMap[background] : ''}`}>
      {children}
    </section>
  )
}