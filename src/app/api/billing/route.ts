import { NextResponse } from 'next/server'
import { getBilling } from '@/lib/contentful'

export async function GET() {
  const data = await getBilling()
  return NextResponse.json(data)
}
