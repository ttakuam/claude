import { createClient } from './client'

const BUCKET_NAME = 'vehicle-images'

/**
 * 画像をSupabase Storageにアップロード
 * @param file アップロードするファイル
 * @param vehicleId 車両ID（フォルダ名として使用）
 * @returns アップロードされたファイルのパス
 */
export async function uploadImage(
  file: File,
  vehicleId: string
): Promise<{ path: string; error: Error | null }> {
  const supabase = createClient()

  // ユニークなファイル名を生成
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
  const filePath = `${vehicleId}/${fileName}`

  const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    return { path: '', error }
  }

  return { path: filePath, error: null }
}

/**
 * 画像の公開URLを取得
 * @param path ファイルパス
 * @returns 公開URL
 */
export function getPublicUrl(path: string): string {
  const supabase = createClient()

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path)

  return publicUrl
}

/**
 * 画像を削除
 * @param paths 削除するファイルパスの配列
 */
export async function deleteImages(paths: string[]): Promise<{ error: Error | null }> {
  const supabase = createClient()

  const { error } = await supabase.storage.from(BUCKET_NAME).remove(paths)

  return { error: error || null }
}

/**
 * 複数の画像をアップロード
 * @param files アップロードするファイルの配列
 * @param vehicleId 車両ID
 * @returns アップロード結果の配列
 */
export async function uploadMultipleImages(
  files: File[],
  vehicleId: string
): Promise<{ paths: string[]; errors: Error[] }> {
  const paths: string[] = []
  const errors: Error[] = []

  for (const file of files) {
    const result = await uploadImage(file, vehicleId)
    if (result.error) {
      errors.push(result.error)
    } else {
      paths.push(result.path)
    }
  }

  return { paths, errors }
}
