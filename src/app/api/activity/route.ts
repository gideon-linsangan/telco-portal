import { NextResponse } from 'next/server'
import { getActivity } from '@/lib/contentful'

export async function GET() {
  const data = await getActivity()
  return NextResponse.json(data)
}
