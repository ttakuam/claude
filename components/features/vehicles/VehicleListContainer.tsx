'use client'

import { useState, useMemo } from 'react'
import { VehicleList } from './VehicleList'
import { SearchFilter } from '@/components/features/search'
import type { VehicleWithImages, VehicleFilter } from '@/types'

interface VehicleListContainerProps {
  initialVehicles: VehicleWithImages[]
  manufacturers: string[]
  bodyColors: string[]
}

export function VehicleListContainer({
  initialVehicles,
  manufacturers,
  bodyColors,
}: VehicleListContainerProps) {
  const [filter, setFilter] = useState<VehicleFilter>({})
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest')

  // クライアントサイドでフィルタリング
  const filteredVehicles = useMemo(() => {
    return initialVehicles.filter(vehicle => {
      if (filter.manufacturer && vehicle.manufacturer !== filter.manufacturer) {
        return false
      }
      if (filter.bodyType && vehicle.body_type !== filter.bodyType) {
        return false
      }
      if (filter.minPrice && vehicle.price < filter.minPrice) {
        return false
      }
      if (filter.maxPrice && vehicle.price > filter.maxPrice) {
        return false
      }
      if (filter.minYear && vehicle.year < filter.minYear) {
        return false
      }
      if (filter.maxYear && vehicle.year > filter.maxYear) {
        return false
      }
      if (filter.maxMileage && vehicle.mileage > filter.maxMileage) {
        return false
      }
      if (filter.excludeAccidentHistory && vehicle.accident_history) {
        return false
      }
      if (filter.vehicleCondition && vehicle.vehicle_condition !== filter.vehicleCondition) {
        return false
      }
      if (filter.bodyColor && vehicle.body_color !== filter.bodyColor) {
        return false
      }
      if (filter.sellingStoreId && vehicle.selling_store_id !== filter.sellingStoreId) {
        return false
      }
      return true
    })
  }, [initialVehicles, filter])

  // ソート適用
  const sortedVehicles = useMemo(() => {
    const sorted = [...filteredVehicles]
    switch (sortBy) {
      case 'price_asc':
        return sorted.sort((a, b) => (a.price + (a.additional_costs || 0)) - (b.price + (b.additional_costs || 0)))
      case 'price_desc':
        return sorted.sort((a, b) => (b.price + (b.additional_costs || 0)) - (a.price + (a.additional_costs || 0)))
      case 'newest':
      default:
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
  }, [filteredVehicles, sortBy])

  return (
    <div className="space-y-4">
      <SearchFilter
        manufacturers={manufacturers}
        bodyColors={bodyColors}
        onFilterChange={setFilter}
        initialFilter={filter}
      />
      <div className="flex items-center justify-between py-2 border-b border-[#ddd]">
        <p className="text-xs text-gray-600">
          <span className="text-lg font-bold text-primary-800 mr-1">{sortedVehicles.length}</span>台の車両が見つかりました
        </p>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-1 border border-[#ddd] rounded text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
          aria-label="並び替え"
        >
          <option value="newest">新着順</option>
          <option value="price_asc">価格が安い順</option>
          <option value="price_desc">価格が高い順</option>
        </select>
      </div>
      <VehicleList vehicles={sortedVehicles} />
    </div>
  )
}
