import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getVehicleById } from '@/lib/vehicles'
import { formatPrice, getConditionLabel } from '@/lib/utils'
import { UserLayout } from '@/components/layout/UserLayout'
import { VehicleDetailClient } from './VehicleDetailClient'
import { STORES } from '@/data/stores'
import { StoreCard } from '@/components/features/stores/StoreCard'
import { ImageGallery } from '@/components/features/vehicles/ImageGallery'

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
  const totalPrice = vehicle.price + (vehicle.additional_costs || 0)
  const sellingStore = vehicle.selling_store_id
    ? STORES.find(s => s.id === vehicle.selling_store_id)
    : null

  return (
    <UserLayout>
      <div className="bg-[#f5f5f5] min-h-screen">
        <div className="max-w-[1024px] mx-auto px-4 py-5">
          {/* パンくずナビ */}
          <nav className="mb-4 text-xs text-gray-500 flex items-center gap-1">
            <Link href="/" className="hover:text-primary-700 transition-colors">ホーム</Link>
            <span>&gt;</span>
            <Link href="/vehicles" className="hover:text-primary-700 transition-colors">車両販売</Link>
            <span>&gt;</span>
            <span className="text-gray-800">車両詳細</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 画像ギャラリー */}
            <ImageGallery
              images={images}
              alt={`${vehicle.manufacturer} ${vehicle.model}`}
              accidentHistory={vehicle.accident_history}
            />

            {/* 車両情報 */}
            <div>
              {/* タイトルと価格 */}
              <div className="bg-white border border-[#ddd] p-4 mb-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">
                    {vehicle.manufacturer} {vehicle.model}
                  </h1>
                  {vehicle.vehicle_condition && vehicle.vehicle_condition !== 'used' && (
                    <span className={`px-2 py-0.5 text-xs font-bold text-white rounded ${
                      vehicle.vehicle_condition === 'new' ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                      {getConditionLabel(vehicle.vehicle_condition)}
                    </span>
                  )}
                </div>
                {vehicle.grade && (
                  <p className="text-sm text-gray-500 mt-0.5">{vehicle.grade}</p>
                )}
                <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
                  <span className="text-xs text-gray-500">支払総額</span>
                  <p className="text-2xl font-bold text-price leading-tight">
                    {formatPrice(totalPrice)}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                    <span>車両本体価格 {formatPrice(vehicle.price)}</span>
                    {vehicle.additional_costs > 0 && (
                      <span>＋ 諸費用 {formatPrice(vehicle.additional_costs)}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* スペックテーブル */}
              <div className="bg-white border border-[#ddd] mb-4">
                <h2 className="text-sm font-bold text-white bg-primary-800 px-4 py-2">基本情報</h2>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-[#eee]">
                      <th className="text-left text-xs text-gray-500 bg-[#f9f9f9] px-4 py-2.5 w-24 font-normal">年式</th>
                      <td className="px-4 py-2.5">{vehicle.year}年</td>
                    </tr>
                    <tr className="border-b border-[#eee]">
                      <th className="text-left text-xs text-gray-500 bg-[#f9f9f9] px-4 py-2.5 w-24 font-normal">走行距離</th>
                      <td className="px-4 py-2.5">{vehicle.mileage.toLocaleString()}km</td>
                    </tr>
                    <tr className="border-b border-[#eee]">
                      <th className="text-left text-xs text-gray-500 bg-[#f9f9f9] px-4 py-2.5 w-24 font-normal">車検</th>
                      <td className="px-4 py-2.5">{vehicle.inspection_date || '要確認'}</td>
                    </tr>
                    <tr className="border-b border-[#eee]">
                      <th className="text-left text-xs text-gray-500 bg-[#f9f9f9] px-4 py-2.5 w-24 font-normal">修復歴</th>
                      <td className="px-4 py-2.5">{vehicle.accident_history ? 'あり' : 'なし'}</td>
                    </tr>
                    {vehicle.engine_displacement && (
                      <tr className="border-b border-[#eee]">
                        <th className="text-left text-xs text-gray-500 bg-[#f9f9f9] px-4 py-2.5 w-24 font-normal">排気量</th>
                        <td className="px-4 py-2.5">{vehicle.engine_displacement.toLocaleString()}cc</td>
                      </tr>
                    )}
                    {vehicle.body_color && (
                      <tr className="border-b border-[#eee]">
                        <th className="text-left text-xs text-gray-500 bg-[#f9f9f9] px-4 py-2.5 w-24 font-normal">車体色</th>
                        <td className="px-4 py-2.5">{vehicle.body_color}</td>
                      </tr>
                    )}
                    <tr>
                      <th className="text-left text-xs text-gray-500 bg-[#f9f9f9] px-4 py-2.5 w-24 font-normal">車両状態</th>
                      <td className="px-4 py-2.5">{getConditionLabel(vehicle.vehicle_condition)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 説明文 */}
              {vehicle.notes && (
                <div className="bg-white border border-[#ddd] p-4 mb-4">
                  <h2 className="text-sm font-bold text-gray-800 mb-2">車両説明</h2>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{vehicle.notes}</p>
                </div>
              )}

              {/* 販売店舗 */}
              {sellingStore && (
                <div className="mb-4">
                  <h2 className="text-sm font-bold text-gray-800 mb-2">販売店舗</h2>
                  <StoreCard store={sellingStore} />
                </div>
              )}

              {/* お気に入り・問い合わせ */}
              <VehicleDetailClient vehicle={vehicle} storePhone={sellingStore?.phone} />
            </div>
          </div>

          {/* スマホ固定CTA分の余白 */}
          <div className="h-16 sm:hidden" />
        </div>
      </div>
    </UserLayout>
  )
}
