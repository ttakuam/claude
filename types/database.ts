/**
 * データベーステーブルの型定義
 */

// 車両ステータス
export type VehicleStatus = 'published' | 'sold'

// 問い合わせ種類
export type InquiryType = 'inquiry' | 'visit_reservation'

// 車両テーブル
export interface Vehicle {
  id: string
  vehicle_id: string
  manufacturer: string
  model: string
  grade: string | null
  price: number
  year: number
  mileage: number
  inspection_date: string | null
  accident_history: boolean
  notes: string | null
  status: VehicleStatus
  created_at: string
  updated_at: string
}

// 車両作成用（IDと日時は自動生成）
export interface VehicleInsert {
  vehicle_id: string
  manufacturer: string
  model: string
  grade?: string | null
  price: number
  year: number
  mileage: number
  inspection_date?: string | null
  accident_history?: boolean
  notes?: string | null
  status?: VehicleStatus
}

// 車両更新用（全フィールドオプショナル）
export interface VehicleUpdate {
  vehicle_id?: string
  manufacturer?: string
  model?: string
  grade?: string | null
  price?: number
  year?: number
  mileage?: number
  inspection_date?: string | null
  accident_history?: boolean
  notes?: string | null
  status?: VehicleStatus
}

// 車両画像テーブル
export interface VehicleImage {
  id: string
  vehicle_id: string
  image_url: string
  display_order: number
  created_at: string
}

// 車両画像作成用
export interface VehicleImageInsert {
  vehicle_id: string
  image_url: string
  display_order?: number
}

// 問い合わせテーブル
export interface Inquiry {
  id: string
  vehicle_id: string | null
  name: string
  email: string
  phone: string | null
  inquiry_type: InquiryType
  message: string | null
  created_at: string
}

// 問い合わせ作成用
export interface InquiryInsert {
  vehicle_id?: string | null
  name: string
  email: string
  phone?: string | null
  inquiry_type: InquiryType
  message?: string | null
}

// 車両と画像を結合した型
export interface VehicleWithImages extends Vehicle {
  vehicle_images: VehicleImage[]
}

// 問い合わせと車両情報を結合した型
export interface InquiryWithVehicle extends Inquiry {
  vehicles: Pick<Vehicle, 'vehicle_id' | 'manufacturer' | 'model' | 'grade'> | null
}
