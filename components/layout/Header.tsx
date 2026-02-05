'use client'

import Link from 'next/link'
import { Heart, Car } from 'lucide-react'
import { useEffect, useState } from 'react'
import { STORAGE_KEYS } from '@/lib/constants'

export function Header() {
  const [favoriteCount, setFavoriteCount] = useState(0)

  useEffect(() => {
    // LocalStorageからお気に入り件数を取得
    const updateFavoriteCount = () => {
      const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES)
      if (favorites) {
        const parsed = JSON.parse(favorites)
        setFavoriteCount(Array.isArray(parsed) ? parsed.length : 0)
      }
    }

    updateFavoriteCount()

    // ストレージの変更を監視
    window.addEventListener('storage', updateFavoriteCount)
    // カスタムイベントでも監視（同一タブ内での更新用）
    window.addEventListener('favoritesUpdated', updateFavoriteCount)

    return () => {
      window.removeEventListener('storage', updateFavoriteCount)
      window.removeEventListener('favoritesUpdated', updateFavoriteCount)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">中古車販売</span>
          </Link>

          {/* ナビゲーション */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              車両一覧
            </Link>
            <Link
              href="/favorites"
              className="relative flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Heart className="h-5 w-5" />
              <span className="hidden sm:inline">お気に入り</span>
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {favoriteCount > 99 ? '99+' : favoriteCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
