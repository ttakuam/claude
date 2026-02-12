'use client'

import { useState, useCallback, useEffect } from 'react'
import { STORAGE_KEYS } from '@/lib/constants'

/**
 * LocalStorageから最新のお気に入りを読み取る
 */
function readFavorites(): string[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed
    } catch {
      // パースエラーの場合は空配列
    }
  }
  return []
}

/**
 * LocalStorageに書き込み、全コンポーネントに変更を通知する
 */
function writeFavorites(favorites: string[]): void {
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
  window.dispatchEvent(new Event('favoritesUpdated'))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(readFavorites)

  // 他のフックインスタンスからの変更を検知して状態を同期
  useEffect(() => {
    const handleUpdate = () => {
      setFavorites(readFavorites())
    }
    window.addEventListener('favoritesUpdated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('favoritesUpdated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  // お気に入りのトグル（常にLocalStorageから最新状態を読み取る）
  const toggleFavorite = useCallback((vehicleId: string) => {
    const current = readFavorites()
    const newFavorites = current.includes(vehicleId)
      ? current.filter(id => id !== vehicleId)
      : [...current, vehicleId]
    writeFavorites(newFavorites)
    setFavorites(newFavorites)
  }, [])

  // お気に入りに追加
  const addFavorite = useCallback((vehicleId: string) => {
    const current = readFavorites()
    if (current.includes(vehicleId)) return
    const newFavorites = [...current, vehicleId]
    writeFavorites(newFavorites)
    setFavorites(newFavorites)
  }, [])

  // お気に入りから削除
  const removeFavorite = useCallback((vehicleId: string) => {
    const current = readFavorites()
    const newFavorites = current.filter(id => id !== vehicleId)
    writeFavorites(newFavorites)
    setFavorites(newFavorites)
  }, [])

  // お気に入りかどうか判定
  const isFavorite = useCallback(
    (vehicleId: string) => favorites.includes(vehicleId),
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
