'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, AlertTriangle } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Vehicle, VehicleImage } from '@/types'
import { useFavorites } from '@/hooks/useFavorites'

interface VehicleCardProps {
  vehicle: Vehicle & { vehicle_images?: VehicleImage[] }
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isLiked = isFavorite(vehicle.id)

  const thumbnail = vehicle.vehicle_images?.[0]?.image_url || '/images/no-image.png'

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(vehicle.id)
  }

  return (
    <Link href={`/vehicles/${vehicle.id}`} className="group block">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* 画像 */}
        <div className="relative aspect-[4/3] bg-gray-100">
          <Image
            src={thumbnail}
            alt={`${vehicle.manufacturer} ${vehicle.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* お気に入りボタン */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
          {/* 修復歴バッジ */}
          {vehicle.accident_history && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
              <AlertTriangle className="h-3 w-3" />
              修復歴あり
            </div>
          )}
        </div>

        {/* 情報 */}
        <div className="p-4">
          {/* 車種 */}
          <h3 className="font-semibold text-gray-900 truncate">
            {vehicle.manufacturer} {vehicle.model}
          </h3>
          {vehicle.grade && (
            <p className="text-sm text-gray-500 truncate">{vehicle.grade}</p>
          )}

          {/* 価格 */}
          <p className="mt-2 text-xl font-bold text-blue-600">{formatPrice(vehicle.price)}</p>

          {/* スペック */}
          <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
            <span>{vehicle.year}年</span>
            <span className="text-gray-300">|</span>
            <span>{vehicle.mileage.toLocaleString()}km</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
