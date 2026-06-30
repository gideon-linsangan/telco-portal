import { verifySession } from '@/lib/dal'
import billingData from '@/stubs/billing.json'
import type { Billing } from '@/types/dashboard'

export async function GET(): Promise<Response> {
  await verifySession()

  const billing = billingData as unknown as Billing

  return Response.json(billing)
}
