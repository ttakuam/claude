import { getVehiclesServer, getManufacturers } from '@/lib/vehicles'
import { UserLayout } from '@/components/layout/UserLayout'
import { VehicleListContainer } from '@/components/features/vehicles'
import { Car } from 'lucide-react'

export default async function HomePage() {
  const [vehicles, manufacturers] = await Promise.all([
    getVehiclesServer(),
    getManufacturers(),
  ])

  return (
    <UserLayout>
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              あなたにぴったりの中古車を見つけよう
            </h1>
            <p className="text-xl text-blue-100">
              厳選された良質な中古車を多数取り揃えております。
              お気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      {/* 車両一覧セクション */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Car className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">車両一覧</h2>
          </div>

          <VehicleListContainer
            initialVehicles={vehicles}
            manufacturers={manufacturers}
          />
        </div>
      </section>
    </UserLayout>
  )
}
