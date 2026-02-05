'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit, Trash2, Eye } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui'
import type { VehicleWithImages } from '@/types'

interface AdminVehicleListProps {
  vehicles: VehicleWithImages[]
}

export function AdminVehicleList({ vehicles }: AdminVehicleListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('この車両を削除しますか？')) return

    setDeletingId(id)
    try {
      const response = await fetch(`/api/admin/vehicles/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('削除に失敗しました')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('削除に失敗しました')
    } finally {
      setDeletingId(null)
    }
  }

  if (vehicles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">登録された車両がありません</p>
        <Link
          href="/admin/vehicles/new"
          className="inline-block mt-4 text-blue-600 hover:text-blue-800"
        >
          車両を新規登録する
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                車両
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                価格
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                年式 / 走行距離
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map(vehicle => {
              const thumbnail = vehicle.vehicle_images?.[0]?.image_url || '/images/no-image.png'
              return (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative h-12 w-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={thumbnail}
                          alt={vehicle.model}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {vehicle.manufacturer} {vehicle.model}
                        </div>
                        <div className="text-sm text-gray-500">
                          {vehicle.vehicle_id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(vehicle.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vehicle.year}年</div>
                    <div className="text-sm text-gray-500">
                      {vehicle.mileage.toLocaleString()}km
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={vehicle.status === 'published' ? 'success' : 'default'}
                    >
                      {vehicle.status === 'published' ? '公開中' : '成約済み'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/vehicles/${vehicle.id}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="プレビュー"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/vehicles/${vehicle.id}/edit`}
                        className="p-2 text-blue-600 hover:text-blue-800"
                        title="編集"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        disabled={deletingId === vehicle.id}
                        className="p-2 text-red-600 hover:text-red-800 disabled:opacity-50"
                        title="削除"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
