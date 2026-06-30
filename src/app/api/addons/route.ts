import { verifySession } from '@/lib/dal'
import addonsData from '@/stubs/addons.json'
import type { Addons } from '@/types/dashboard'

export async function GET(): Promise<Response> {
  await verifySession()

  const addons = addonsData as unknown as Addons

  return Response.json(addons)
}
