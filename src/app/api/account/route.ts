import { NextResponse } from 'next/server'
import data from '@/stubs/account.json'

export async function GET() {
  return NextResponse.json(data)
}
