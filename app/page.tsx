import { getVehiclesServer } from '@/lib/vehicles'
import { getNews } from '@/lib/news'
import { UserLayout } from '@/components/layout/UserLayout'
import { VehicleCard } from '@/components/features/vehicles/VehicleCard'
import { FavoriteSidebar } from '@/components/features/favorites/FavoriteSidebar'
import {
  Car, Wrench, Fuel, FlaskConical, UtensilsCrossed, Shield,
  ChevronRight,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const BUSINESS_DIVISIONS = [
  {
    icon: Car,
    title: '車両販売',
    description: '新車・中古車の販売。お客様のご要望に合わせた最適な一台をご提案いたします。',
    href: '/vehicles',
    color: 'text-primary-700',
  },
  {
    icon: Wrench,
    title: '車検・整備',
    description: '車検・点検・一般整備。国家資格を持つ整備士が丁寧に対応いたします。',
    href: '/shaken',
    color: 'text-blue-600',
  },
  {
    icon: Fuel,
    title: 'SS事業部',
    description: 'サービスステーション運営。給油・洗車・オイル交換など幅広くサービスを提供。',
    href: '/ss',
    color: 'text-orange-600',
  },
  {
    icon: FlaskConical,
    title: 'ケミカル事業部',
    description: '自動車用ケミカル製品の開発・販売。品質にこだわった製品をお届けします。',
    href: '/chemical',
    color: 'text-purple-600',
  },
  {
    icon: UtensilsCrossed,
    title: '飲食事業部',
    description: '飲食店の運営。地域の皆様に愛されるお店づくりを目指しています。',
    href: '/food',
    color: 'text-red-600',
  },
  {
    icon: Shield,
    title: '保険事業部',
    description: '自動車保険を中心とした各種保険のご相談・お見積りを承ります。',
    href: 'https://life-support-fujiwa.co.jp/',
    color: 'text-teal-600',
    external: true,
  },
]

export default async function HomePage() {
  const [vehicles, news] = await Promise.all([
    getVehiclesServer(),
    getNews(3),
  ])
  // TOPではピックアップとして最新6台を表示
  const pickupVehicles = vehicles.slice(0, 6)

  return (
    <UserLayout noHeaderPadding>
      <FavoriteSidebar observeId="pickup-section" />
      {/* ===== ヒーローバナー ===== */}
      <section className="relative h-screen flex items-center justify-center text-white">
        {/* 背景画像 */}
        <div className="absolute inset-0 bg-black">
          <Image
            src="/images/hero.jpg"
            alt="車両販売・車検整備などトータルカーサポートのイメージ"
            fill
            className="object-cover opacity-60"
            sizes="100vw"
            priority
          />
        </div>
        {/* コンテンツ */}
        <div className="relative z-10 text-center px-4">
          <p className="text-accent-400 text-sm font-bold tracking-widest mb-3">TOTAL CAR SUPPORT</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
            あなたのカーライフを<br className="sm:hidden" />全力でサポート
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            車両販売から車検・整備・保険まで、<br className="hidden sm:block" />
            お車のことならなんでもご相談ください。
          </p>
        </div>
      </section>

      {/* ===== おすすめ車両 ===== */}
      <section id="pickup-section" className="bg-white border-b border-[#ddd]">
        <div className="max-w-[1024px] mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-1">おすすめ車両</h2>
          <p className="text-center text-xs text-gray-400 mb-8">PICK UP</p>

          <div className="overflow-hidden group">
            <div
              className="flex gap-3 group-hover:[animation-play-state:paused]"
              style={{
                animation: 'scroll 20s linear infinite',
              }}
            >
              {[...pickupVehicles, ...pickupVehicles].map((vehicle, i) => (
                <div key={`${vehicle.id}-${i}`} className="w-[220px] shrink-0">
                  <VehicleCard vehicle={vehicle} />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-1 bg-primary-800 hover:bg-primary-700 text-white font-bold px-8 py-3 rounded text-sm transition-colors"
            >
              車両を探す
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 当社について ===== */}
      <section className="bg-[#f5f5f5]">
        <div className="max-w-[1024px] mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-1">当社について</h2>
          <p className="text-center text-xs text-gray-400 mb-8">ABOUT US</p>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-gray-600 leading-loose">
              当社は車両販売を中心に、車検・整備、サービスステーション運営、<br className="hidden sm:block" />
              ケミカル事業、飲食事業、保険事業と幅広い事業を展開し、<br className="hidden sm:block" />
              地域の皆様の暮らしをトータルでサポートしております。<br />
              お客様一人一人のご要望に丁寧にお応えすることを大切にしています。
            </p>
          </div>
        </div>
      </section>

      {/* ===== 事業内容 ===== */}
      <section className="bg-white border-t border-[#ddd]">
        <div className="max-w-[1024px] mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-1">事業内容</h2>
          <p className="text-center text-xs text-gray-400 mb-8">BUSINESS</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BUSINESS_DIVISIONS.map(division => {
              const Icon = division.icon
              const cardClass = "bg-white border border-[#ddd] p-5 text-center hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-shadow group"
              const content = (
                <>
                  <Icon className={`h-8 w-8 ${division.color} mx-auto mb-2`} />
                  <h3 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-primary-700 transition-colors">{division.title}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{division.description}</p>
                </>
              )
              if (division.external) {
                return (
                  <a key={division.title} href={division.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {content}
                  </a>
                )
              }
              return (
                <Link key={division.title} href={division.href} className={cardClass}>
                  {content}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== お知らせ ===== */}
      <section className="border-t border-[#ddd]">
        <div className="max-w-[1024px] mx-auto px-4 py-10">
          <div className="flex items-start gap-4 sm:gap-6">
            <h2 className="text-sm font-bold text-primary-800 shrink-0 pt-0.5 border-l-4 border-primary-800 pl-2">お知らせ</h2>
            <div className="flex-1 space-y-2 text-sm">
              {news.map(item => (
                <div key={item.id} className="flex items-start gap-3">
                  <span className="text-xs text-gray-400 shrink-0 pt-0.5">
                    {item.published_at.replace(/-/g, '.')}
                  </span>
                  <p className="text-gray-700">{item.title}</p>
                </div>
              ))}
              {news.length === 0 && (
                <p className="text-gray-400">お知らせはありません</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 店舗一覧バナー ===== */}
      <Link href="/stores" className="block">
        <section className="relative h-[300px] sm:h-[400px] flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-black">
            <Image
              src="/images/stores-banner.jpg"
              alt="全国の店舗一覧を見る"
              fill
              sizes="100vw"
              className="object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
            />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-2">店舗一覧</h2>
            <p className="text-sm text-white/70 tracking-widest">STORE LIST</p>
          </div>
        </section>
      </Link>
    </UserLayout>
  )
}
