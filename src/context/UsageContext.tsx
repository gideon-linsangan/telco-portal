'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type ContextValue = {
  percentUsed: number | null
  publishPercent: (v: number) => void
}

const UsageContext = createContext<ContextValue>({
  percentUsed: null,
  publishPercent: () => {},
})

export function UsageProvider({ children }: { children: ReactNode }) {
  const [percentUsed, setPercentUsed] = useState<number | null>(null)
  return (
    <UsageContext.Provider value={{ percentUsed, publishPercent: setPercentUsed }}>
      {children}
    </UsageContext.Provider>
  )
}

export function useUsageContext() {
  return useContext(UsageContext)
}
