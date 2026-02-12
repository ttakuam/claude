import { createClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import type { VehicleWithImages, VehicleFilter } from '@/types'

/**
 * 公開中の車両一覧を取得（クライアント用）
 */
export async function getVehicles(filter?: VehicleFilter): Promise<VehicleWithImages[]> {
  const supabase = createClient()

  let query = supabase
    .from('vehicles')
    .select('*, vehicle_images(*)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  // フィルター適用
  if (filter?.manufacturer) {
    query = query.eq('manufacturer', filter.manufacturer)
  }
  if (filter?.minPrice) {
    query = query.gte('price', filter.minPrice)
  }
  if (filter?.maxPrice) {
    query = query.lte('price', filter.maxPrice)
  }
  if (filter?.minYear) {
    query = query.gte('year', filter.minYear)
  }
  if (filter?.maxYear) {
    query = query.lte('year', filter.maxYear)
  }
  if (filter?.maxMileage) {
    query = query.lte('mileage', filter.maxMileage)
  }
  if (filter?.excludeAccidentHistory) {
    query = query.eq('accident_history', false)
  }
  if (filter?.vehicleCondition) {
    query = query.eq('vehicle_condition', filter.vehicleCondition)
  }
  if (filter?.bodyColor) {
    query = query.eq('body_color', filter.bodyColor)
  }
  if (filter?.sellingStoreId) {
    query = query.eq('selling_store_id', filter.sellingStoreId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching vehicles:', error)
    return []
  }

  return (data || []) as VehicleWithImages[]
}

/**
 * 公開中の車両一覧を取得（サーバー用）
 */
export async function getVehiclesServer(filter?: VehicleFilter): Promise<VehicleWithImages[]> {
  const supabase = await createServerClient()

  let query = supabase
    .from('vehicles')
    .select('*, vehicle_images(*)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  // フィルター適用
  if (filter?.manufacturer) {
    query = query.eq('manufacturer', filter.manufacturer)
  }
  if (filter?.minPrice) {
    query = query.gte('price', filter.minPrice)
  }
  if (filter?.maxPrice) {
    query = query.lte('price', filter.maxPrice)
  }
  if (filter?.minYear) {
    query = query.gte('year', filter.minYear)
  }
  if (filter?.maxYear) {
    query = query.lte('year', filter.maxYear)
  }
  if (filter?.maxMileage) {
    query = query.lte('mileage', filter.maxMileage)
  }
  if (filter?.excludeAccidentHistory) {
    query = query.eq('accident_history', false)
  }
  if (filter?.vehicleCondition) {
    query = query.eq('vehicle_condition', filter.vehicleCondition)
  }
  if (filter?.bodyColor) {
    query = query.eq('body_color', filter.bodyColor)
  }
  if (filter?.sellingStoreId) {
    query = query.eq('selling_store_id', filter.sellingStoreId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching vehicles:', error)
    return []
  }

  return (data || []) as VehicleWithImages[]
}

/**
 * 車両詳細を取得（サーバー用）
 */
export async function getVehicleById(id: string): Promise<VehicleWithImages | null> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('*, vehicle_images(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching vehicle:', error)
    return null
  }

  return data as VehicleWithImages
}

/**
 * お気に入り車両を取得（サーバー用）
 */
export async function getVehiclesByIds(ids: string[]): Promise<VehicleWithImages[]> {
  if (ids.length === 0) return []

  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('*, vehicle_images(*)')
    .in('id', ids)
    .eq('status', 'published')

  if (error) {
    console.error('Error fetching vehicles:', error)
    return []
  }

  return (data || []) as VehicleWithImages[]
}

/**
 * 車体色一覧を取得（サーバー用）
 */
export async function getBodyColors(): Promise<string[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('body_color')
    .eq('status', 'published')
    .not('body_color', 'is', null)

  if (error) {
    console.error('Error fetching body colors:', error)
    return []
  }

  const colors = [...new Set(data?.map(v => v.body_color).filter(Boolean) || [])]
  return colors.sort() as string[]
}

/**
 * メーカー一覧を取得（サーバー用）
 */
export async function getManufacturers(): Promise<string[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('manufacturer')
    .eq('status', 'published')

  if (error) {
    console.error('Error fetching manufacturers:', error)
    return []
  }

  const manufacturers = [...new Set(data?.map(v => v.manufacturer) || [])]
  return manufacturers.sort()
}
