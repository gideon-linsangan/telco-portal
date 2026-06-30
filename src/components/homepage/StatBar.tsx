import type { StatBlock } from '@/types/contentful'

interface StatBarProps {
  stats: StatBlock[]
}

export function StatBar({ stats }: StatBarProps) {
  const sorted = [...stats].sort((a, b) => a.order - b.order)

  return (
    <section className="bg-brand-bg py-12">
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex flex-col sm:flex-row justify-around gap-8 text-center">
          {sorted.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-brand-purple-darkest">{stat.value}</p>
              <p className="text-brand-muted text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
