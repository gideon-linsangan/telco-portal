'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Toggle } from '@/components/ui/Toggle'
import type { Addons } from '@/types/dashboard'

export function AddonsCard({ addons: initialAddons }: { addons: Addons }) {
  const [addons, setAddons] = useState(initialAddons)

  function handleToggle(id: string, value: boolean) {
    setAddons((prev) => prev.map((a) => (a.id === id ? { ...a, active: value } : a)))
  }

  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.06em] text-neutral-slate">Add-ons &amp; Extras</p>
        <a href="#" className="text-brand-signature text-[13px] font-semibold hover:text-brand-mid transition-colors">
          Explore more →
        </a>
      </div>

      <ul className="flex flex-col gap-2.5" aria-label="Add-ons">
        {addons.map((addon) => (
          <li
            key={addon.id}
            className={`border border-neutral-border rounded-xl px-4 py-3.5 flex items-center gap-3.5 ${!addon.active ? 'opacity-70' : ''}`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-neutral-ink text-[14px] font-semibold">{addon.name}</p>
              <p className="text-neutral-slate text-xs mt-0.5">${addon.price}/mo · {addon.description}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Toggle
                value={addon.active}
                onChange={(v) => handleToggle(addon.id, v)}
                label={`Toggle ${addon.name}`}
              />
              <a href="#" className="text-brand-signature text-[13px] font-semibold hover:text-brand-mid transition-colors">
                {addon.active ? 'Manage' : 'Add'}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
