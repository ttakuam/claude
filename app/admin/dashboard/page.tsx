import { getDashboardStats } from '@/lib/admin'
import { Car, ShoppingCart, MessageSquare, TrendingUp } from 'lucide-react'

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  const statCards = [
    {
      title: '登録車両数',
      value: stats.totalVehicles,
      icon: Car,
      color: 'bg-blue-500',
    },
    {
      title: '公開中',
      value: stats.publishedVehicles,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: '成約済み',
      value: stats.soldVehicles,
      icon: ShoppingCart,
      color: 'bg-purple-500',
    },
    {
      title: '問い合わせ',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">ダッシュボード</h1>

      {/* 統計カード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map(card => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* クイックアクション */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">クイックアクション</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/vehicles/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Car className="h-5 w-5 text-blue-600" />
            <span className="text-gray-700">車両を新規登録</span>
          </a>
          <a
            href="/admin/import"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-gray-700">CSVインポート</span>
          </a>
          <a
            href="/admin/inquiries"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageSquare className="h-5 w-5 text-orange-600" />
            <span className="text-gray-700">問い合わせ確認</span>
          </a>
        </div>
      </div>
    </div>
  )
}
