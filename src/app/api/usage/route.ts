import { NextResponse } from 'next/server'
import { getUsage } from '@/lib/contentful'

export async function GET() {
  const data = await getUsage()
  const percentUsed = Math.round((data.usedGB / data.totalGB) * 100)
  const daysRemaining = Math.ceil(
    (new Date(data.cycleEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )
  return NextResponse.json({ ...data, percentUsed, daysRemaining })
}
