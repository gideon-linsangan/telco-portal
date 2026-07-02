import { Text } from '@/components/ui/atoms/Text'
import type { StatBlock } from '@/types/contentful'

export function TrustBar({ data }: { data: StatBlock[] }) {
  const sorted = [...data].sort((a, b) => a.order - b.order)

  return (
    <section className="w-full bg-white border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex items-center justify-center divide-x divide-neutral-border">
          {sorted.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5 px-16">
              <Text variant="metric" color="brand-signature">
                {stat.value}
              </Text>
              <Text variant="label" color="slate">
                {stat.label}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
