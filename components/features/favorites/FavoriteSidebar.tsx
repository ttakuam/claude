'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { STORAGE_KEYS } from '@/lib/constants'

interface FavoriteSidebarProps {
  /** 指定したIDのセクションが表示されている間だけ表示する（省略時は常に表示） */
  observeId?: string
}

export function FavoriteSidebar({ observeId }: FavoriteSidebarProps) {
  const [favoriteCount, setFavoriteCount] = useState(0)
  const [isVisible, setIsVisible] = useState(!observeId)

  useEffect(() => {
    const updateFavoriteCount = () => {
      const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES)
      if (favorites) {
        const parsed = JSON.parse(favorites)
        setFavoriteCount(Array.isArray(parsed) ? parsed.length : 0)
      }
    }

    updateFavoriteCount()
    window.addEventListener('storage', updateFavoriteCount)
    window.addEventListener('favoritesUpdated', updateFavoriteCount)

    return () => {
      window.removeEventListener('storage', updateFavoriteCount)
      window.removeEventListener('favoritesUpdated', updateFavoriteCount)
    }
  }, [])

  useEffect(() => {
    if (!observeId) return

    const el = document.getElementById(observeId)
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [observeId])

  return (
    <Link
      href="/favorites"
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1 bg-white border border-[#ddd] shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-lg px-3 py-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] group transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-16 pointer-events-none'
      }`}
    >
      <div className="relative">
        <Heart className="h-6 w-6 text-red-500 group-hover:scale-110 transition-transform" />
        {favoriteCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] flex items-center justify-center px-1">
            {favoriteCount > 99 ? '99+' : favoriteCount}
          </span>
        )}
      </div>
      <span className="text-[10px] text-gray-500 font-bold writing-vertical">お気に入り</span>
    </Link>
  )
}
