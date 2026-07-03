import { NextResponse } from 'next/server'
import { getTickets } from '@/lib/contentful'

export async function GET() {
  const data = await getTickets()
  return NextResponse.json(data)
}
