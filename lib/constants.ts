/**
 * アプリケーション全体で使用する定数
 */

// 車両ステータス
export const VEHICLE_STATUS = {
  PUBLISHED: 'published',
  SOLD: 'sold',
} as const

// 問い合わせ種類
export const INQUIRY_TYPE = {
  INQUIRY: 'inquiry',
  VISIT_RESERVATION: 'visit_reservation',
} as const

// メーカー一覧（サンプル）
export const MANUFACTURERS = [
  'トヨタ',
  'ホンダ',
  '日産',
  'マツダ',
  'スバル',
  'スズキ',
  'ダイハツ',
  '三菱',
  'レクサス',
  'その他',
] as const

// ページサイズ
export const PAGE_SIZE = {
  VEHICLES: 12,
  INQUIRIES: 20,
} as const

// ローカルストレージキー
export const STORAGE_KEYS = {
  FAVORITES: 'used-car-favorites',
} as const
