import { createClient } from '@/lib/supabase/server'
import type { Vehicle, VehicleWithImages, InquiryWithVehicle, DashboardStats } from '@/types'

/**
 * 全車両を取得（管理者用）
 */
export async function getAdminVehicles(): Promise<VehicleWithImages[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('*, vehicle_images(*)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching vehicles:', error)
    return []
  }

  return (data || []) as VehicleWithImages[]
}

/**
 * 車両を作成
 */
export async function createVehicle(vehicle: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>): Promise<Vehicle | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('vehicles')
    .insert(vehicle)
    .select()
    .single()

  if (error) {
    console.error('Error creating vehicle:', error)
    return null
  }

  return data as Vehicle
}

/**
 * 車両を更新
 */
export async function updateVehicle(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('vehicles')
    .update(vehicle)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating vehicle:', error)
    return null
  }

  return data as Vehicle
}

/**
 * 車両を削除
 */
export async function deleteVehicle(id: string): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting vehicle:', error)
    return false
  }

  return true
}

/**
 * 全問い合わせを取得（管理者用）
 */
export async function getAdminInquiries(): Promise<InquiryWithVehicle[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('inquiries')
    .select(`
      *,
      vehicles (
        vehicle_id,
        manufacturer,
        model,
        grade
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching inquiries:', error)
    return []
  }

  return (data || []) as InquiryWithVehicle[]
}

/**
 * 問い合わせステータスを更新
 */
export async function updateInquiryStatus(id: string, status: string): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('inquiries')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('Error updating inquiry status:', error)
    return false
  }

  return true
}

/**
 * ダッシュボード統計を取得
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient()

  const [vehiclesResult, inquiriesResult] = await Promise.all([
    supabase.from('vehicles').select('status'),
    supabase.from('inquiries').select('id'),
  ])

  const vehicles = vehiclesResult.data || []
  const inquiries = inquiriesResult.data || []

  return {
    totalVehicles: vehicles.length,
    publishedVehicles: vehicles.filter(v => v.status === 'published').length,
    soldVehicles: vehicles.filter(v => v.status === 'sold').length,
    totalInquiries: inquiries.length,
  }
}
