'use client'

import { useState, useEffect } from 'react'
import { useAddons } from '@/hooks/useAddons'
import { Toggle } from '@/components/ui/atoms/Toggle'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { CardHeader } from '@/components/ui/molecules/CardHeader'
import { ErrorState } from '@/components/ui/ErrorState'

function AddOnsSkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <div className="animate-pulse">
        <SkeletonBlock width="w-1/3" height="h-3" />
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-neutral-border last:border-0"
          >
            <div className="flex flex-col gap-2">
              <SkeletonBlock width="w-32" height="h-3" />
              <SkeletonBlock width="w-48" height="h-3" />
            </div>
            <div className="flex items-center gap-3">
              <SkeletonBlock width="w-12" height="h-3" />
              <SkeletonBlock width="w-8" height="h-5" rounded="rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AddOnsCard() {
  const state = useAddons()
  const [toggleMap, setToggleMap] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (state.status === 'success') {
      const initial: Record<string, boolean> = {}
      state.data.forEach(addon => {
        initial[addon.id] = addon.active
      })
      setToggleMap(initial)
    }
  }, [state.status])

  if (state.status === 'loading') return <AddOnsSkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const addons = state.data

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <CardHeader label="Add-ons & extras" />
      <div className="mt-2">
        {addons.map(addon => (
          <div
            key={addon.id}
            className="flex items-center justify-between py-3 border-b border-neutral-border last:border-0"
          >
            <div className="flex-1 pr-4">
              <p className="text-[14px] font-semibold text-neutral-ink">{addon.name}</p>
              <p className="text-[12px] text-neutral-slate">{addon.description}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <p className="text-[13px] text-neutral-slate">
                ${addon.price}{addon.billingCycle === 'monthly' ? '/mo' : ' one-off'}
              </p>
              <Toggle
                checked={toggleMap[addon.id] ?? addon.active}
                onChange={checked =>
                  setToggleMap(prev => ({ ...prev, [addon.id]: checked }))
                }
                aria-label={`Toggle ${addon.name}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
