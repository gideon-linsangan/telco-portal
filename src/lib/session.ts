import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import type { SessionPayload } from '@/types/session'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET)
const algorithm = 'HS256'

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function decrypt(token?: string): Promise<SessionPayload | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: [algorithm] })
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function createSession(payload: SessionPayload): Promise<void> {
  const token = await encrypt(payload)
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ;(await cookies()).set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession(): Promise<void> {
  ;(await cookies()).delete('session')
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = (await cookies()).get('session')?.value
  return decrypt(token)
}
