import { UserLayout } from '@/components/layout/UserLayout'
import { FlaskConical, Sparkles, ShieldCheck, Truck } from 'lucide-react'
import { StoreCard } from '@/components/features/stores/StoreCard'
import { getStoresByCategory } from '@/data/stores'
import Link from 'next/link'

const PRODUCTS = [
  {
    icon: Sparkles,
    title: 'コーティング剤',
    description: 'ボディコーティング、ガラスコーティングなど各種コーティング製品を取り扱い。',
  },
  {
    icon: ShieldCheck,
    title: 'メンテナンス用品',
    description: 'エンジンオイル添加剤、ラジエーター液、ブレーキフルードなど。',
  },
  {
    icon: Truck,
    title: '業務用洗剤',
    description: '業務用カーシャンプー、ホイールクリーナーなど業務用製品も充実。',
  },
]

export default function ChemicalPage() {
  return (
    <UserLayout>
      {/* パンくず */}
      <div className="border-b border-[#ddd]">
        <div className="max-w-[1024px] mx-auto px-4 py-2">
          <nav className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary-700 transition-colors">ホーム</Link>
            <span>&gt;</span>
            <span className="text-gray-800">ケミカル事業部</span>
          </nav>
        </div>
      </div>

      {/* ページヘッダー */}
      <div className="bg-primary-800">
        <div className="max-w-[1024px] mx-auto px-4 py-8 flex items-center gap-3">
          <FlaskConical className="h-6 w-6 text-accent-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">ケミカル事業部</h1>
            <p className="text-xs text-gray-300 mt-0.5">CHEMICAL DIVISION</p>
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="bg-[#f5f5f5]">
        <div className="max-w-[1024px] mx-auto px-4 py-10">
          {/* 紹介文 */}
          <div className="bg-white border border-[#ddd] p-6 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              ケミカル事業部では、自動車用ケミカル製品の開発・販売を行っています。
              品質にこだわった製品で、お客様のカーライフをサポートします。
              業務用から一般向けまで、幅広いラインナップを取り揃えております。
            </p>
          </div>

          {/* 製品カテゴリ */}
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-primary-800 pl-3">取扱製品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {PRODUCTS.map(product => {
              const Icon = product.icon
              return (
                <div key={product.title} className="bg-white border border-[#ddd] p-5 text-center">
                  <Icon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-gray-800 mb-1">{product.title}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{product.description}</p>
                </div>
              )
            })}
          </div>

          {/* 関連店舗 */}
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-primary-800 pl-3 mt-8">この事業を行っている店舗</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {getStoresByCategory('chemical').map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-3">製品に関するお問い合わせはお気軽にどうぞ。</p>
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
