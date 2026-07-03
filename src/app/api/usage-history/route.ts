import { NextResponse } from 'next/server'
import { getUsageHistory } from '@/lib/contentful'

export async function GET() {
  const data = await getUsageHistory()
  return NextResponse.json(data)
}
