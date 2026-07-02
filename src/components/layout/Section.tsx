type Background = 'brand.deep' | 'white' | 'brand.ghost'

const bgMap: Record<Background, string> = {
  'brand.deep':  'bg-brand-deep',
  'white':       'bg-white',
  'brand.ghost': 'bg-brand-ghost',
}

type SectionProps = {
  background?: Background
  children: React.ReactNode
}

export default function Section({ background, children }: SectionProps) {
  return (
    <section className={`w-full${background ? ` ${bgMap[background]}` : ''}`}>
      {children}
    </section>
  )
}
