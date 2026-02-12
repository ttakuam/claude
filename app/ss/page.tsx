import { UserLayout } from '@/components/layout/UserLayout'
import { Fuel, Droplets, Car, CreditCard } from 'lucide-react'
import { StoreCard } from '@/components/features/stores/StoreCard'
import { getStoresByCategory } from '@/data/stores'
import Link from 'next/link'

const SERVICES = [
  {
    icon: Fuel,
    title: '給油サービス',
    description: 'レギュラー・ハイオク・軽油を取り扱い。スタッフによるフルサービスも対応。',
  },
  {
    icon: Droplets,
    title: '洗車サービス',
    description: '手洗い洗車からコーティングまで。お車をきれいに保つお手伝いをします。',
  },
  {
    icon: Car,
    title: 'オイル交換',
    description: 'エンジンオイルの交換。待ち時間も少なくスピーディーに対応。',
  },
  {
    icon: CreditCard,
    title: '各種カード対応',
    description: 'クレジットカード・電子マネーなど各種決済方法に対応。',
  },
]

export default function SSPage() {
  return (
    <UserLayout>
      {/* パンくず */}
      <div className="border-b border-[#ddd]">
        <div className="max-w-[1024px] mx-auto px-4 py-2">
          <nav className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary-700 transition-colors">ホーム</Link>
            <span>&gt;</span>
            <span className="text-gray-800">SS事業部</span>
          </nav>
        </div>
      </div>

      {/* ページヘッダー */}
      <div className="bg-primary-800">
        <div className="max-w-[1024px] mx-auto px-4 py-8 flex items-center gap-3">
          <Fuel className="h-6 w-6 text-accent-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">SS事業部</h1>
            <p className="text-xs text-gray-300 mt-0.5">SERVICE STATION</p>
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="bg-[#f5f5f5]">
        <div className="max-w-[1024px] mx-auto px-4 py-10">
          {/* 紹介文 */}
          <div className="bg-white border border-[#ddd] p-6 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              サービスステーション（SS）事業部では、給油サービスを中心に洗車・オイル交換など
              カーライフに欠かせないサービスを提供しています。
              お気軽にお立ち寄りください。
            </p>
          </div>

          {/* サービス一覧 */}
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-primary-800 pl-3">サービス内容</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {SERVICES.map(service => {
              const Icon = service.icon
              return (
                <div key={service.title} className="bg-white border border-[#ddd] p-5 flex gap-4">
                  <Icon className="h-8 w-8 text-orange-600 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">{service.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 関連店舗 */}
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-primary-800 pl-3 mt-8">この事業を行っている店舗</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {getStoresByCategory('ss').map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-3">営業時間・アクセスなどお気軽にお問い合わせください。</p>
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
