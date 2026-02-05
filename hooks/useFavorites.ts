'use client'

import { useState, useCallback } from 'react'
import { STORAGE_KEYS } from '@/lib/constants'

function getInitialFavorites(): string[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch {
      // パースエラーの場合は空配列
    }
  }
  return []
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(getInitialFavorites)

  // LocalStorageに保存
  const saveFavorites = useCallback((newFavorites: string[]) => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites))
    // カスタムイベントを発火して他のコンポーネントに通知
    window.dispatchEvent(new Event('favoritesUpdated'))
  }, [])

  // お気に入りに追加
  const addFavorite = useCallback(
    (vehicleId: string) => {
      setFavorites(prev => {
        if (prev.includes(vehicleId)) return prev
        const newFavorites = [...prev, vehicleId]
        saveFavorites(newFavorites)
        return newFavorites
      })
    },
    [saveFavorites]
  )

  // お気に入りから削除
  const removeFavorite = useCallback(
    (vehicleId: string) => {
      setFavorites(prev => {
        const newFavorites = prev.filter(id => id !== vehicleId)
        saveFavorites(newFavorites)
        return newFavorites
      })
    },
    [saveFavorites]
  )

  // お気に入りのトグル
  const toggleFavorite = useCallback(
    (vehicleId: string) => {
      if (favorites.includes(vehicleId)) {
        removeFavorite(vehicleId)
      } else {
        addFavorite(vehicleId)
      }
    },
    [favorites, addFavorite, removeFavorite]
  )

  // お気に入りかどうか判定
  const isFavorite = useCallback(
    (vehicleId: string) => {
      return favorites.includes(vehicleId)
    },
    [favorites]
  )

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    count: favorites.length,
  }
}
