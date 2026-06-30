import { verifySession } from '@/lib/dal'
import usageData from '@/stubs/usage.json'
import type { Usage } from '@/types/dashboard'

export async function GET(): Promise<Response> {
  await verifySession()

  const today = new Date()
  const cycleEnd = new Date(usageData.cycleEndDate)
  const msPerDay = 1000 * 60 * 60 * 24
  const daysRemaining = Math.max(0, Math.ceil((cycleEnd.getTime() - today.getTime()) / msPerDay))
  const percentUsed = Math.round((usageData.usedGB / usageData.totalGB) * 100)

  const usage: Usage = {
    ...usageData,
    percentUsed,
    daysRemaining,
  }

  return Response.json(usage)
}
