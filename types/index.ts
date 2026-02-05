/**
 * アプリケーション全体で使用する型定義
 */

// データベース型をre-export
export * from './database'

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

// 検索パラメータ（ページネーション含む）
export interface SearchParams extends VehicleFilter {
  page?: number
  limit?: number
  sortBy?: 'created_at' | 'price' | 'year' | 'mileage'
  sortOrder?: 'asc' | 'desc'
}

// ページネーション情報
export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

// ページネーション付きレスポンス
export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationInfo
}

// APIレスポンス
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

// 問い合わせリクエスト
export interface InquiryRequest {
  vehicleId?: string
  vehicleInfo: string
  name: string
  email: string
  phone?: string
  inquiryType: 'inquiry' | 'visit_reservation'
  message?: string
}

// 統計情報（ダッシュボード用）
export interface DashboardStats {
  totalVehicles: number
  publishedVehicles: number
  soldVehicles: number
  totalInquiries: number
}
