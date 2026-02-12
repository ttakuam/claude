import Link from 'next/link'
import { Car } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#333] text-gray-400 text-sm">
      <div className="max-w-[1024px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ロゴ */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-white mb-3">
              <Car className="h-5 w-5" />
              <span className="font-bold">カー・サービスグループ</span>
            </Link>
            <p className="text-xs leading-relaxed">
              お車のことならなんでもご相談ください。<br />
              新車・中古車販売、車検・整備、保険まで<br />
              トータルサポートいたします。
            </p>
          </div>

          {/* サイトマップ */}
          <div>
            <h3 className="text-white text-xs font-bold mb-2 pb-1 border-b border-gray-600">サイトマップ</h3>
            <ul className="space-y-1 text-xs">
              <li><Link href="/" className="hover:text-white transition-colors">ホーム</Link></li>
              <li><Link href="/vehicles" className="hover:text-white transition-colors">車両販売</Link></li>
              <li><Link href="/shaken" className="hover:text-white transition-colors">車検・整備</Link></li>
              <li><Link href="/ss" className="hover:text-white transition-colors">SS事業部</Link></li>
              <li><Link href="/chemical" className="hover:text-white transition-colors">ケミカル事業部</Link></li>
              <li><Link href="/food" className="hover:text-white transition-colors">飲食事業部</Link></li>
              <li><a href="https://life-support-fujiwa.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">保険事業部</a></li>
              <li><Link href="/stores" className="hover:text-white transition-colors">店舗一覧</Link></li>
            </ul>
          </div>

          {/* 営業時間 */}
          <div>
            <h3 className="text-white text-xs font-bold mb-2 pb-1 border-b border-gray-600">営業時間</h3>
            <ul className="space-y-1 text-xs">
              <li>平日: 9:00 - 19:00</li>
              <li>土日祝: 10:00 - 18:00</li>
              <li>定休日: 水曜日</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-600 text-center text-xs text-gray-500">
          &copy; {currentYear} カー・サービスグループ All rights reserved.
        </div>
      </div>
    </footer>
  )
}
