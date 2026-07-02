import { NextResponse } from 'next/server'
import data from '@/stubs/activity.json'

export async function GET() {
  return NextResponse.json(data)
}
