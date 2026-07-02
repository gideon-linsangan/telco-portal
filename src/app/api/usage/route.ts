import { NextResponse } from 'next/server'
import data from '@/stubs/usage.json'

export async function GET() {
  const percentUsed = Math.round((data.usedGB / data.totalGB) * 100)
  const daysRemaining = Math.ceil(
    (new Date(data.cycleEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )
  return NextResponse.json({ ...data, percentUsed, daysRemaining })
}
