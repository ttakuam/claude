'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Car, LogOut, Menu, X } from 'lucide-react'
import { signOut } from '@/lib/auth'
import { useState } from 'react'

interface AdminHeaderProps {
  onMenuToggle?: () => void
  isMenuOpen?: boolean
}

export function AdminHeader({ onMenuToggle, isMenuOpen }: AdminHeaderProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 左側：メニューボタン（モバイル）+ ロゴ */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">管理画面</span>
            </Link>
          </div>

          {/* 右側：ログアウトボタン */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">
              {isLoggingOut ? 'ログアウト中...' : 'ログアウト'}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
