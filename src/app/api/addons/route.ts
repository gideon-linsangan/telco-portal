import { NextResponse } from 'next/server'
import { getAddons } from '@/lib/contentful'

export async function GET() {
  const data = await getAddons()
  return NextResponse.json(data)
}
