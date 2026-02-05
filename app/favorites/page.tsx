import { UserLayout } from '@/components/layout/UserLayout'
import { FavoritesClient } from './FavoritesClient'
import { Heart } from 'lucide-react'

export default function FavoritesPage() {
  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900">お気に入り一覧</h1>
        </div>

        <FavoritesClient />
      </div>
    </UserLayout>
  )
}
