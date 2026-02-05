import { createClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import type { User, Session } from '@supabase/supabase-js'

/**
 * メール・パスワードでサインイン（クライアント用）
 */
export async function signIn(
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { user: null, error: error.message }
  }

  return { user: data.user, error: null }
}

/**
 * サインアウト（クライアント用）
 */
export async function signOut(): Promise<{ error: string | null }> {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  return { error: null }
}

/**
 * 現在のセッションを取得（クライアント用）
 */
export async function getSession(): Promise<Session | null> {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

/**
 * 現在のユーザーを取得（クライアント用）
 */
export async function getUser(): Promise<User | null> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

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

/**
 * 認証状態の変更を監視（クライアント用）
 */
export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
) {
  const supabase = createClient()

  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}
