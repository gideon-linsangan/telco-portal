import { NextResponse } from 'next/server'
import data from '@/stubs/plans.json'

export async function GET() {
  return NextResponse.json(data)
}
