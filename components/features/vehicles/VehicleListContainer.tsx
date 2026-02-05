'use client'

import { useState, useMemo } from 'react'
import { VehicleList } from './VehicleList'
import { SearchFilter } from '@/components/features/search'
import type { VehicleWithImages, VehicleFilter } from '@/types'

interface VehicleListContainerProps {
  initialVehicles: VehicleWithImages[]
  manufacturers: string[]
}

export function VehicleListContainer({
  initialVehicles,
  manufacturers,
}: VehicleListContainerProps) {
  const [filter, setFilter] = useState<VehicleFilter>({})

  // クライアントサイドでフィルタリング
  const filteredVehicles = useMemo(() => {
    return initialVehicles.filter(vehicle => {
      if (filter.manufacturer && vehicle.manufacturer !== filter.manufacturer) {
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
      return true
    })
  }, [initialVehicles, filter])

  return (
    <div className="space-y-6">
      <SearchFilter
        manufacturers={manufacturers}
        onFilterChange={setFilter}
        initialFilter={filter}
      />
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredVehicles.length}台の車両が見つかりました
        </p>
      </div>
      <VehicleList vehicles={filteredVehicles} />
    </div>
  )
}
