import { SectionHeader } from '@/components/ui/molecules/SectionHeader'
import type { FeatureBlock as FeatureBlockType } from '@/types/contentful'

export function FeatureBlocks({ data }: { data: FeatureBlockType[] }) {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10 text-center">
          <SectionHeader eyebrow="Why TelcoNow" heading="Built around you" align="center" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((f) => (
            <div key={f.title} className="bg-white border border-neutral-border rounded-xl shadow-card p-6 flex flex-col gap-4">
              <span className="text-3xl" aria-hidden>{f.icon}</span>
              <h3 className="text-lg font-semibold text-neutral-ink">{f.title}</h3>
              <p className="text-[15px] leading-relaxed text-neutral-slate">{f.bodyCopy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
