'use client'

import { useState, useEffect } from 'react'
import { useFavorites } from '@/hooks/useFavorites'
import { VehicleList } from '@/components/features/vehicles'
import { Loader } from '@/components/ui/Loader'
import type { VehicleWithImages } from '@/types'

export function FavoritesClient() {
  const { favorites } = useFavorites()
  const [vehicles, setVehicles] = useState<VehicleWithImages[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFavoriteVehicles = async () => {
      if (favorites.length === 0) {
        setVehicles([])
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch('/api/vehicles/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: favorites }),
        })

        if (response.ok) {
          const data = await response.json()
          setVehicles(data.data || [])
        }
      } catch (error) {
        console.error('Error fetching favorite vehicles:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavoriteVehicles()
  }, [favorites])

  // LocalStorage変更を監視
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      setIsLoading(true)
    }

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate)
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="lg" />
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">お気に入りに登録された車両がありません</p>
        <p className="text-gray-400 mt-2">
          車両一覧からハートアイコンをクリックしてお気に入りに追加できます
        </p>
      </div>
    )
  }

  return <VehicleList vehicles={vehicles} />
}
