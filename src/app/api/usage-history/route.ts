import { verifySession } from '@/lib/dal'
import usageHistoryData from '@/stubs/usage-history.json'
import type { UsageHistory } from '@/types/dashboard'

export async function GET(): Promise<Response> {
  await verifySession()

  const history = usageHistoryData as unknown as UsageHistory

  return Response.json(history)
}
