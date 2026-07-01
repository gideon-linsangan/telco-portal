import { Card } from '@/components/ui/Card'
import type { FeatureBlock } from '@/types/contentful'

interface FeatureGridProps {
  features: FeatureBlock[]
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="p-8">
              <div className="text-3xl mb-4" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="text-neutral-ink text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-neutral-slate text-sm leading-relaxed">{feature.bodyCopy}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}