import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, AlertTriangle } from 'lucide-react'
import { getVehicleById } from '@/lib/vehicles'
import { formatPrice } from '@/lib/utils'
import { UserLayout } from '@/components/layout/UserLayout'
import { VehicleDetailClient } from './VehicleDetailClient'

interface VehicleDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { id } = await params
  const vehicle = await getVehicleById(id)

  if (!vehicle) {
    notFound()
  }

  const images = vehicle.vehicle_images || []
  const mainImage = images[0]?.image_url || '/images/no-image.png'

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        {/* パンくずナビ */}
        <nav className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            車両一覧に戻る
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 画像ギャラリー */}
          <div className="space-y-4">
            {/* メイン画像 */}
            <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={mainImage}
                alt={`${vehicle.manufacturer} ${vehicle.model}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {vehicle.accident_history && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-lg">
                  <AlertTriangle className="h-4 w-4" />
                  修復歴あり
                </div>
              )}
            </div>

            {/* サムネイル */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <div
                    key={img.id}
                    className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={img.image_url}
                      alt={`${vehicle.manufacturer} ${vehicle.model} - ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 車両情報 */}
          <div className="space-y-6">
            {/* タイトルと価格 */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {vehicle.manufacturer} {vehicle.model}
              </h1>
              {vehicle.grade && (
                <p className="text-lg text-gray-500 mt-1">{vehicle.grade}</p>
              )}
              <p className="mt-4 text-3xl font-bold text-blue-600">
                {formatPrice(vehicle.price)}
              </p>
            </div>

            {/* スペック */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">年式</dt>
                  <dd className="text-lg font-medium text-gray-900">{vehicle.year}年</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">走行距離</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {vehicle.mileage.toLocaleString()}km
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">車検</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {vehicle.inspection_date || '要確認'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">修復歴</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {vehicle.accident_history ? 'あり' : 'なし'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* 説明文 */}
            {vehicle.notes && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">車両説明</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{vehicle.notes}</p>
              </div>
            )}

            {/* お気に入り・問い合わせボタン（クライアントコンポーネント） */}
            <VehicleDetailClient vehicle={vehicle} />
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
