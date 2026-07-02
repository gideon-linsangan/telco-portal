import { useState, useEffect } from 'react'
import type { Plan } from '@/types/plans'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: Plan[] }

export function usePlans(): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetch('/api/plans')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: Plan[]) => {
        if (!cancelled) setState({ status: 'success', data })
      })
      .catch(err => {
        if (!cancelled) setState({ status: 'error', message: err.message })
      })

    return () => { cancelled = true }
  }, [])

  return state
}
