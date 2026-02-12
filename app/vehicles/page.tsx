import { getVehiclesServer, getManufacturers, getBodyColors } from '@/lib/vehicles'
import { UserLayout } from '@/components/layout/UserLayout'
import { VehicleListContainer } from '@/components/features/vehicles'
import { FavoriteSidebar } from '@/components/features/favorites/FavoriteSidebar'
import { Car } from 'lucide-react'
import Link from 'next/link'

export default async function VehiclesPage() {
  const [vehicles, manufacturers, bodyColors] = await Promise.all([
    getVehiclesServer(),
    getManufacturers(),
    getBodyColors(),
  ])

  return (
    <UserLayout>
      <FavoriteSidebar />
      {/* パンくず */}
      <div className="border-b border-[#ddd]">
        <div className="max-w-[1024px] mx-auto px-4 py-2">
          <nav className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary-700 transition-colors">ホーム</Link>
            <span>&gt;</span>
            <span className="text-gray-800">車両販売</span>
          </nav>
        </div>
      </div>

      {/* ページヘッダー */}
      <div className="bg-primary-800">
        <div className="max-w-[1024px] mx-auto px-4 py-8 flex items-center gap-3">
          <Car className="h-6 w-6 text-accent-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">車両一覧</h1>
            <p className="text-xs text-gray-300 mt-0.5">お探しの条件で車両を検索できます</p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="bg-[#f5f5f5]">
        <div className="max-w-[1024px] mx-auto px-4 py-10">
          <VehicleListContainer
            initialVehicles={vehicles}
            manufacturers={manufacturers}
            bodyColors={bodyColors}
          />
        </div>
      </div>
    </UserLayout>
  )
}
