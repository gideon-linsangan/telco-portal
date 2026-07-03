'use client'

import { useState, useEffect } from 'react'
import { useAddons } from '@/hooks/useAddons'
import { Toggle } from '@/components/ui/atoms/Toggle'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { CardHeader } from '@/components/ui/molecules/CardHeader'
import { ErrorState } from '@/components/ui/ErrorState'
import type { Addon } from '@/types/addons'

function AddonIcon({ id, active }: { id: string; active: boolean }) {
  const iconBg = active ? 'bg-brand-light' : 'bg-neutral-surface'
  const iconColor = active ? 'text-brand-deep' : 'text-neutral-slate'

  return (
    <div className={`w-10 h-10 rounded-[10px] ${iconBg} flex items-center justify-center flex-shrink-0`}>
      {id === 'addon_001' && (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={iconColor}>
          <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="9" cy="9" rx="3.5" ry="7.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M1.5 9h15" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )}
      {id === 'addon_002' && (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={iconColor}>
          <rect x="2" y="12" width="14" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <rect x="5" y="7" width="8" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <rect x="7.5" y="2.5" width="3" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )}
      {id === 'addon_003' && (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={iconColor}>
          <rect x="2.5" y="2.5" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5.5 12.5V5.5l3.5 4 3.5-4v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}

function formatPrice(addon: Addon): string {
  const amount = `$${addon.price.toFixed(2)}`
  if (addon.billingCycle === 'monthly') return `${amount}/mo`
  return `${amount} one-off`
}

function AddOnsSkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <div className="animate-pulse">
        <SkeletonBlock width="w-1/3" height="h-3" />
        {[1, 2, 3].map(i => (
          <div key={i} className="mt-2.5 border border-neutral-border rounded-[10px] p-3.5 flex items-center gap-3.5">
            <SkeletonBlock width="w-10" height="h-10" rounded="rounded-[10px]" />
            <div className="flex-1 flex flex-col gap-2">
              <SkeletonBlock width="w-40" height="h-3" />
              <SkeletonBlock width="w-24" height="h-3" />
            </div>
            <div className="flex items-center gap-3">
              <SkeletonBlock width="w-8" height="h-5" rounded="rounded-full" />
              <SkeletonBlock width="w-12" height="h-3" />
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
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6 flex flex-col gap-4">
      <CardHeader
        label="Add-ons & Extras"
        action={
          <a href="#" className="text-[13px] text-brand-signature font-semibold hover:text-brand-mid transition-colors">
            Explore more →
          </a>
        }
      />
      <div className="flex flex-col gap-2.5">
        {addons.map(addon => {
          const isOn = toggleMap[addon.id] ?? addon.active
          return (
            <div
              key={addon.id}
              className={`border border-neutral-border rounded-[10px] p-3.5 flex items-center gap-3.5 transition-opacity ${!isOn ? 'opacity-70' : ''}`}
            >
              <AddonIcon id={addon.id} active={isOn} />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-neutral-ink">{addon.name}</p>
                <p className="text-[12px] text-neutral-slate">
                  {formatPrice(addon)}{addon.billingCycle === 'monthly' ? ` · ${addon.description}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Toggle
                  checked={isOn}
                  onChange={checked => setToggleMap(prev => ({ ...prev, [addon.id]: checked }))}
                  aria-label={`Toggle ${addon.name}`}
                />
                <a
                  href="#"
                  className="text-[13px] text-brand-signature font-semibold hover:text-brand-mid transition-colors"
                >
                  {isOn ? 'Manage' : 'Add'}
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
