import type { StatBlock } from '@/types/contentful'

export function TrustBar({ data }: { data: StatBlock[] }) {
  const sorted = [...data].sort((a, b) => a.order - b.order)

  return (
    <div className="w-full bg-brand-deep border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-0 md:h-20 flex items-center">
        <div className="w-full grid grid-cols-3 gap-2 md:flex md:w-auto md:items-center md:gap-16">
          {sorted.flatMap((stat, i) => [
            i > 0
              ? <div key={`div-${i}`} className="hidden md:block w-px h-8 bg-white/15 flex-shrink-0" />
              : null,
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="text-white text-[15px] md:text-[20px] font-bold tracking-tight leading-none">{stat.value}</span>
              <span className="text-brand-light text-[9px] md:text-[11px] font-medium uppercase tracking-wide md:tracking-widest leading-tight">{stat.label}</span>
            </div>,
          ])}
        </div>
      </div>
    </div>
  )
}
