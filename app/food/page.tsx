import { UserLayout } from '@/components/layout/UserLayout'
import { UtensilsCrossed, Clock, MapPin } from 'lucide-react'
import { StoreCard } from '@/components/features/stores/StoreCard'
import { getStoresByCategory } from '@/data/stores'
import Link from 'next/link'

export default function FoodPage() {
  return (
    <UserLayout>
      {/* パンくず */}
      <div className="border-b border-[#ddd]">
        <div className="max-w-[1024px] mx-auto px-4 py-2">
          <nav className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary-700 transition-colors">ホーム</Link>
            <span>&gt;</span>
            <span className="text-gray-800">飲食事業部</span>
          </nav>
        </div>
      </div>

      {/* ページヘッダー */}
      <div className="bg-primary-800">
        <div className="max-w-[1024px] mx-auto px-4 py-8 flex items-center gap-3">
          <UtensilsCrossed className="h-6 w-6 text-accent-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">飲食事業部</h1>
            <p className="text-xs text-gray-300 mt-0.5">FOOD & BEVERAGE</p>
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="bg-[#f5f5f5]">
        <div className="max-w-[1024px] mx-auto px-4 py-10">
          {/* 紹介文 */}
          <div className="bg-white border border-[#ddd] p-6 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              飲食事業部では、地域の皆様に愛されるお店づくりを目指し、
              心を込めた料理とおもてなしを提供しています。
              ぜひお気軽にお立ち寄りください。
            </p>
          </div>

          {/* 店舗情報 */}
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-primary-800 pl-3">店舗情報</h2>
          <div className="bg-white border border-[#ddd] mb-8">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-[#eee]">
                  <th className="text-left text-xs text-gray-500 bg-[#f9f9f9] px-4 py-3 w-28 font-normal">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />所在地</span>
                  </th>
                  <td className="px-4 py-3">お問い合わせください</td>
                </tr>
                <tr className="border-b border-[#eee]">
                  <th className="text-left text-xs text-gray-500 bg-[#f9f9f9] px-4 py-3 w-28 font-normal">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />営業時間</span>
                  </th>
                  <td className="px-4 py-3">お問い合わせください</td>
                </tr>
                <tr>
                  <th className="text-left text-xs text-gray-500 bg-[#f9f9f9] px-4 py-3 w-28 font-normal">定休日</th>
                  <td className="px-4 py-3">お問い合わせください</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 関連店舗 */}
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-primary-800 pl-3 mt-8">この事業を行っている店舗</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {getStoresByCategory('food').map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-3">店舗に関するお問い合わせはお気軽にどうぞ。</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-1 bg-primary-800 hover:bg-primary-700 text-white font-bold px-8 py-3 rounded text-sm transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
