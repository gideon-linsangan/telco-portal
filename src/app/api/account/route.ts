import { NextResponse } from 'next/server'
import { getAccount } from '@/lib/contentful'

export async function GET() {
  const data = await getAccount()
  return NextResponse.json(data)
}
