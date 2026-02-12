'use client'

import { VehicleCard } from './VehicleCard'
import type { VehicleWithImages } from '@/types'

interface VehicleListProps {
  vehicles: VehicleWithImages[]
}

export function VehicleList({ vehicles }: VehicleListProps) {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">車両が見つかりませんでした</p>
        <p className="text-gray-400 mt-2">検索条件を変更してお試しください</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
}
