import { useState, useEffect } from 'react'
import type { UsageData } from '@/types/usage'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: UsageData }

export function useUsage(): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetch('/api/usage')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: UsageData) => {
        if (!cancelled) setState({ status: 'success', data })
      })
      .catch(err => {
        if (!cancelled) setState({ status: 'error', message: err.message })
      })

    return () => { cancelled = true }
  }, [])

  return state
}
