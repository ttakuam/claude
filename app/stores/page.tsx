'use client'

import { useState } from 'react'
import { UserLayout } from '@/components/layout/UserLayout'
import { Tabs } from '@/components/ui/Tabs'
import { StoreCard } from '@/components/features/stores/StoreCard'
import { STORES, STORE_TABS, getStoresByTab } from '@/data/stores'
import type { StoreTabId } from '@/data/stores'
import { Building2 } from 'lucide-react'
import Link from 'next/link'

export default function StoresPage() {
  const [activeTab, setActiveTab] = useState<StoreTabId>('all')
  const filteredStores = getStoresByTab(activeTab)

  const tabsWithCount = STORE_TABS.map(tab => ({
    ...tab,
    count: tab.id === 'all'
      ? STORES.length
      : getStoresByTab(tab.id).length,
  }))

  return (
    <UserLayout>
      {/* パンくず */}
      <div className="border-b border-[#ddd]">
        <div className="max-w-[1024px] mx-auto px-4 py-2">
          <nav className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary-700 transition-colors">ホーム</Link>
            <span>&gt;</span>
            <span className="text-gray-800">店舗一覧</span>
          </nav>
        </div>
      </div>

      {/* ページヘッダー */}
      <div className="bg-primary-800">
        <div className="max-w-[1024px] mx-auto px-4 py-8 flex items-center gap-3">
          <Building2 className="h-6 w-6 text-accent-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">店舗一覧</h1>
            <p className="text-xs text-gray-300 mt-0.5">STORE LIST</p>
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="bg-[#f5f5f5]">
        <div className="max-w-[1024px] mx-auto px-4 py-8">
          {/* 紹介文 */}
          <div className="bg-white border border-[#ddd] p-6 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              車両販売から車検・整備、サービスステーション、ケミカル、飲食、保険まで、
              幅広い事業を展開しております。お近くの店舗をお探しください。
            </p>
          </div>

          {/* タブ */}
          <Tabs
            tabs={tabsWithCount}
            activeTab={activeTab}
            onTabChange={(id) => setActiveTab(id as StoreTabId)}
            className="mb-6"
          />

          {/* 店舗カードグリッド */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredStores.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>

          {/* 0件メッセージ */}
          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">該当する店舗がありません</p>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  )
}
