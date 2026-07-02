import { NextResponse } from 'next/server'
import data from '@/stubs/addons.json'

export async function GET() {
  return NextResponse.json(data)
}
