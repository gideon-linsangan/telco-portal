'use server'
import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '@/lib/session'

const STUB_EMAIL = 'user@telconow.com.au'
const STUB_PASSWORD = 'password123'
const STUB_USER = {
  userId: 'usr_001',
  name: 'Alex Chen',
  email: STUB_EMAIL,
  accountNumber: 'TN-000001',
  planName: 'Plus plan',
}

export type LoginState = { error?: string } | undefined

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get('email')?.toString().trim() ?? ''
  const password = formData.get('password')?.toString() ?? ''

  if (email !== STUB_EMAIL || password !== STUB_PASSWORD) {
    return { error: 'Invalid email or password' }
  }

  await createSession(STUB_USER)
  redirect('/dashboard')
}

export async function logout(): Promise<void> {
  await deleteSession()
  redirect('/login')
}
