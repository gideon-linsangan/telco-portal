import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'

const protectedRoutes = ['/dashboard']
const publicOnlyRoutes = ['/login']

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtected = protectedRoutes.some((r) => path === r || path.startsWith(r + '/'))
  const isPublicOnly = publicOnlyRoutes.includes(path)

  // Read cookie directly from the request — next/headers is for Server Components only
  const cookie = req.cookies.get('session')?.value
  const session = await decrypt(cookie)

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isPublicOnly && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon\\.ico).*)'],
}
