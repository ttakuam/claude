'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, AlertTriangle } from 'lucide-react'
import { formatPrice, getConditionLabel } from '@/lib/utils'
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
      <div className="bg-white border border-[#ddd] overflow-hidden hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-shadow">
        {/* 画像 */}
        <div className="relative aspect-[4/3] bg-[#eee]">
          <Image
            src={thumbnail}
            alt={`${vehicle.manufacturer} ${vehicle.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* お気に入りボタン */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-1.5 right-1.5 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600"
            aria-label={isLiked ? 'お気に入りから削除' : 'お気に入りに追加'}
          >
            <Heart
              className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
          {/* 車両状態バッジ */}
          {vehicle.vehicle_condition && vehicle.vehicle_condition !== 'used' && (
            <div className={`absolute top-0 left-0 px-2 py-1 text-white text-[10px] font-bold ${
              vehicle.vehicle_condition === 'new' ? 'bg-red-500' : 'bg-blue-500'
            }`}>
              {getConditionLabel(vehicle.vehicle_condition)}
            </div>
          )}
          {/* 修復歴バッジ */}
          {vehicle.accident_history && (
            <div className="absolute bottom-0 left-0 flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white text-[10px] font-bold">
              <AlertTriangle className="h-3 w-3" />
              修復歴あり
            </div>
          )}
        </div>

        {/* 情報 */}
        <div className="p-3">
          {/* 車種名 */}
          <h3 className="font-bold text-sm text-gray-800 truncate leading-tight">
            {vehicle.manufacturer} {vehicle.model}
          </h3>
          {vehicle.grade && (
            <p className="text-[11px] text-gray-500 truncate mt-0.5">{vehicle.grade}</p>
          )}

          {/* 支払総額 */}
          <div className="mt-2 pb-2 border-b border-dashed border-gray-200">
            <span className="text-[11px] text-gray-500">支払総額</span>
            <p className="text-xl font-bold text-price leading-tight">
              {formatPrice(vehicle.price + (vehicle.additional_costs || 0))}
            </p>
          </div>

          {/* スペック行 */}
          <div className="mt-2 grid grid-cols-2 gap-x-2 text-[11px] text-gray-600">
            <div className="flex justify-between border-b border-dotted border-gray-200 py-0.5">
              <span className="text-gray-400">年式</span>
              <span className="font-medium">{vehicle.year}年</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-200 py-0.5">
              <span className="text-gray-400">走行</span>
              <span className="font-medium">{vehicle.mileage.toLocaleString()}km</span>
            </div>
            {vehicle.engine_displacement && (
              <div className="flex justify-between border-b border-dotted border-gray-200 py-0.5">
                <span className="text-gray-400">排気量</span>
                <span className="font-medium">{vehicle.engine_displacement.toLocaleString()}cc</span>
              </div>
            )}
            <div className="flex justify-between border-b border-dotted border-gray-200 py-0.5">
              <span className="text-gray-400">車検</span>
              <span className="font-medium">{vehicle.inspection_date || '要確認'}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
