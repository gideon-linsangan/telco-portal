import type { StatBlock } from '@/types/contentful'

export function TrustBar({ data }: { data: StatBlock[] }) {
  const sorted = [...data].sort((a, b) => a.order - b.order)

  return (
    <div className="w-full bg-brand-deep border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center">
        <div className="flex items-center gap-16">
          {sorted.flatMap((stat, i) => [
            i > 0 ? <div key={`div-${i}`} className="w-px h-8 bg-white/15 flex-shrink-0" /> : null,
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="text-white text-[20px] font-bold tracking-tight leading-none">{stat.value}</span>
              <span className="text-brand-light text-[11px] font-medium uppercase tracking-widest">{stat.label}</span>
            </div>,
          ])}
        </div>
      </div>
    </div>
  )
}
