import { UserLayout } from '@/components/layout/UserLayout'
import { Wrench, CheckCircle, Clock, Phone } from 'lucide-react'
import { StoreCard } from '@/components/features/stores/StoreCard'
import { getStoresByCategory } from '@/data/stores'
import Link from 'next/link'

const MENU_ITEMS = [
  { name: '車検（継続検査）', description: '法定24ヶ月点検付き。安心・安全の車検をリーズナブルに。' },
  { name: '法定12ヶ月点検', description: '年に一度の定期点検。故障の早期発見に。' },
  { name: '一般整備・修理', description: 'エンジン不調、異音、ブレーキなど各種修理に対応。' },
  { name: 'オイル交換', description: 'エンジンオイル・ミッションオイルなど各種交換。' },
  { name: 'タイヤ交換・バランス', description: 'タイヤの組替え、バランス調整、ローテーション。' },
  { name: '板金塗装', description: 'キズ・ヘコミの修理、全塗装まで幅広く対応。' },
]

export default function ShakenPage() {
  return (
    <UserLayout>
      {/* パンくず */}
      <div className="border-b border-[#ddd]">
        <div className="max-w-[1024px] mx-auto px-4 py-2">
          <nav className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary-700 transition-colors">ホーム</Link>
            <span>&gt;</span>
            <span className="text-gray-800">車検・整備</span>
          </nav>
        </div>
      </div>

      {/* ページヘッダー */}
      <div className="bg-primary-800">
        <div className="max-w-[1024px] mx-auto px-4 py-8 flex items-center gap-3">
          <Wrench className="h-6 w-6 text-accent-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">車検・整備</h1>
            <p className="text-xs text-gray-300 mt-0.5">VEHICLE INSPECTION & MAINTENANCE</p>
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="bg-[#f5f5f5]">
        <div className="max-w-[1024px] mx-auto px-4 py-10">
          {/* 紹介文 */}
          <div className="bg-white border border-[#ddd] p-6 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              国家資格を持つ整備士が、お客様の大切なお車を丁寧に点検・整備いたします。
              車検はもちろん、日常のメンテナンスから修理まで幅広く対応。
              安心・安全なカーライフをサポートします。
            </p>
          </div>

          {/* 特徴 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="bg-white border border-[#ddd] p-5 text-center">
              <CheckCircle className="h-7 w-7 text-blue-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-gray-800 mb-1">国家資格整備士</h3>
              <p className="text-[11px] text-gray-500">経験豊富な整備士が対応</p>
            </div>
            <div className="bg-white border border-[#ddd] p-5 text-center">
              <Clock className="h-7 w-7 text-blue-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-gray-800 mb-1">スピード対応</h3>
              <p className="text-[11px] text-gray-500">車検は最短1日で完了</p>
            </div>
            <div className="bg-white border border-[#ddd] p-5 text-center">
              <Phone className="h-7 w-7 text-blue-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-gray-800 mb-1">お見積り無料</h3>
              <p className="text-[11px] text-gray-500">お気軽にご相談ください</p>
            </div>
          </div>

          {/* メニュー */}
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-primary-800 pl-3">整備メニュー</h2>
          <div className="bg-white border border-[#ddd]">
            <table className="w-full text-sm">
              <tbody>
                {MENU_ITEMS.map((item, i) => (
                  <tr key={item.name} className={i < MENU_ITEMS.length - 1 ? 'border-b border-[#eee]' : ''}>
                    <th className="text-left text-xs font-bold text-gray-800 bg-[#f9f9f9] px-4 py-3 w-40">{item.name}</th>
                    <td className="px-4 py-3 text-gray-600">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 関連店舗 */}
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-primary-800 pl-3 mt-8">この事業を行っている店舗</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {getStoresByCategory('shaken').map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-3">車検・整備のご予約・お見積りはお気軽にお問い合わせください。</p>
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
