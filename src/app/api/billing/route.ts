import { NextResponse } from 'next/server'
import data from '@/stubs/billing.json'

export async function GET() {
  return NextResponse.json(data)
}
