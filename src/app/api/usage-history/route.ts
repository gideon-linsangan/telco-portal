import { NextResponse } from 'next/server'
import data from '@/stubs/usage-history.json'

export async function GET() {
  return NextResponse.json(data)
}
