/**
 * アプリケーション全体で使用する型定義
 */

// 車両ステータス
export type VehicleStatus = 'published' | 'sold'

// 問い合わせ種類
export type InquiryType = 'inquiry' | 'visit_reservation'

// 車両情報
export interface Vehicle {
  id: string
  vehicle_id: string
  manufacturer: string
  model: string
  grade?: string
  price: number
  year: number
  mileage: number
  inspection_date?: string
  accident_history: boolean
  notes?: string
  status: VehicleStatus
  created_at: string
  updated_at: string
}

// 車両画像
export interface VehicleImage {
  id: string
  vehicle_id: string
  image_url: string
  display_order: number
  created_at: string
}

// 問い合わせ
export interface Inquiry {
  id: string
  vehicle_id?: string
  name: string
  email: string
  phone?: string
  inquiry_type: InquiryType
  message?: string
  created_at: string
}

// 検索フィルター
export interface VehicleFilter {
  manufacturer?: string
  minPrice?: number
  maxPrice?: number
  minYear?: number
  maxYear?: number
  maxMileage?: number
  excludeAccidentHistory?: boolean
}

// データベースレスポンス
export interface DatabaseResponse<T> {
  data: T | null
  error: Error | null
}
