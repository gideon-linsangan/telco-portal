import { verifySession } from '@/lib/dal'
import activityData from '@/stubs/activity.json'
import type { Activity } from '@/types/dashboard'

export async function GET(): Promise<Response> {
  await verifySession()

  const activity = activityData as unknown as Activity

  return Response.json(activity)
}
