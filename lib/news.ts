import { createClient as createServerClient } from '@/lib/supabase/server'

export interface NewsItem {
  id: string
  title: string
  published_at: string
}

/**
 * 公開中のお知らせを取得（新しい順）
 */
export async function getNews(limit = 5): Promise<NewsItem[]> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('news')
    .select('id, title, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Failed to fetch news:', error)
    return []
  }

  return data || []
}
