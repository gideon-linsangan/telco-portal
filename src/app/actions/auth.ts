'use server'
import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '@/lib/session'

const STUB_USER = {
  userId: 'usr_001',
  name: 'Alex Chen',
  email: 'user@telconow.com.au',
  accountNumber: 'TN-000001',
}

type LoginState = { error: string } | undefined

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (email !== STUB_USER.email || password !== 'password123') {
    return { error: 'Invalid email or password' }
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  await createSession({ ...STUB_USER, expiresAt })
  redirect('/dashboard')
}

export async function logout(): Promise<void> {
  await deleteSession()
  redirect('/login')
}
