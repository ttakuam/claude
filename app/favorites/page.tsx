import { UserLayout } from '@/components/layout/UserLayout'
import { FavoritesClient } from './FavoritesClient'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function FavoritesPage() {
  return (
    <UserLayout>
      {/* パンくず */}
      <div className="border-b border-[#ddd]">
        <div className="max-w-[1024px] mx-auto px-4 py-2">
          <nav className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary-700 transition-colors">ホーム</Link>
            <span>&gt;</span>
            <span className="text-gray-800">お気に入り</span>
          </nav>
        </div>
      </div>
      <div className="bg-[#f5f5f5] min-h-screen">
        <div className="max-w-[1024px] mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-red-500" />
            <h1 className="text-lg font-bold text-gray-800">お気に入り一覧</h1>
          </div>

          <FavoritesClient />
        </div>
      </div>
    </UserLayout>
  )
}
