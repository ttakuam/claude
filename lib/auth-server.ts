import { createClient as createServerClient } from '@/lib/supabase/server'
import type { User, Session } from '@supabase/supabase-js'

/**
 * 現在のユーザーを取得（サーバー用）
 */
export async function getServerUser(): Promise<User | null> {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

/**
 * 現在のセッションを取得（サーバー用）
 */
export async function getServerSession(): Promise<Session | null> {
  const supabase = await createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}
