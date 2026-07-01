import { Fragment } from 'react'
import type { StatBlock } from '@/types/contentful'

interface StatBarProps {
  stats: StatBlock[]
}

export function StatBar({ stats }: StatBarProps) {
  const sorted = [...stats].sort((a, b) => a.order - b.order)

  return (
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-12 h-20 flex items-center">
        <div className="flex items-center gap-16">
          {sorted.map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 && <div className="w-px h-8 bg-white/15 flex-shrink-0" />}
              <div className="flex flex-col gap-0.5">
                <span className="text-white text-xl font-bold tracking-tight">{stat.value}</span>
                <span className="text-brand-light text-xs font-medium uppercase tracking-[0.06em]">{stat.label}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
