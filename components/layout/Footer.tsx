import Link from 'next/link'
import { Car } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ロゴ・説明 */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-white">
              <Car className="h-8 w-8" />
              <span className="text-xl font-bold">中古車販売</span>
            </Link>
            <p className="mt-4 text-sm">
              厳選された良質な中古車を取り揃えております。
              お気軽にお問い合わせください。
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-white font-semibold mb-4">メニュー</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  車両一覧
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white transition-colors">
                  お気に入り
                </Link>
              </li>
            </ul>
          </div>

          {/* 営業時間等 */}
          <div>
            <h3 className="text-white font-semibold mb-4">営業時間</h3>
            <ul className="space-y-2 text-sm">
              <li>平日: 9:00 - 19:00</li>
              <li>土日祝: 10:00 - 18:00</li>
              <li>定休日: 水曜日</li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {currentYear} 中古車販売. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
