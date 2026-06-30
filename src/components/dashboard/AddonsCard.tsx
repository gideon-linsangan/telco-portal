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
    <Card className="p-6">
      <p className="text-xs font-medium text-brand-muted uppercase tracking-wider mb-4">Add-ons & extras</p>

      <ul className="space-y-4" aria-label="Add-ons">
        {addons.map((addon) => (
          <li key={addon.id} className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-brand-dark text-sm font-medium">{addon.name}</p>
              <p className="text-brand-muted text-xs mt-0.5">{addon.description} · ${addon.price}/mo</p>
            </div>
            <Toggle
              value={addon.active}
              onChange={(v) => handleToggle(addon.id, v)}
              label={`Toggle ${addon.name}`}
            />
          </li>
        ))}
      </ul>
    </Card>
  )
}
