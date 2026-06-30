import { verifySession } from '@/lib/dal'
import accountData from '@/stubs/account.json'
import type { Account } from '@/types/dashboard'

export async function GET(): Promise<Response> {
  const session = await verifySession()

  const account: Account = {
    ...(accountData as unknown as Omit<Account, 'accountNumber'>),
    accountNumber: session.accountNumber,
  }

  return Response.json(account)
}
