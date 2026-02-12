'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Phone, Clock, ChevronDown, ChevronUp, Map } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { Store, BusinessCategory } from '@/types'

const CATEGORY_BADGE_VARIANT: Record<BusinessCategory, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  shaken: 'success',
  vehicle: 'info',
  ss: 'warning',
  chemical: 'default',
  insurance: 'success',
  food: 'danger',
  tire: 'info',
  oil: 'default',
}

interface StoreCardProps {
  store: Store
  defaultMapOpen?: boolean
}

export function StoreCard({ store, defaultMapOpen = false }: StoreCardProps) {
  const [isMapOpen, setIsMapOpen] = useState(defaultMapOpen)

  return (
    <div className="bg-white border border-[#ddd] overflow-hidden">
      {/* 店舗写真 */}
      <div className="relative aspect-[16/9] bg-[#eee]">
        <Image
          src={store.imageUrl}
          alt={`${store.name}の外観`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      {/* 情報エリア */}
      <div className="p-4">
        {/* 店舗名 */}
        <h3 className="text-sm font-bold text-gray-800 mb-2">{store.name}</h3>

        {/* 事業バッジ */}
        <div className="flex flex-wrap gap-1 mb-3">
          {store.businesses.map((biz, i) => (
            <Badge key={i} variant={CATEGORY_BADGE_VARIANT[biz.category]}>
              {biz.label}
              {biz.subLabel && (
                <span className="ml-0.5 opacity-70">({biz.subLabel})</span>
              )}
            </Badge>
          ))}
        </div>

        {/* 電話番号 */}
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
          <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          <a
            href={`tel:${store.phone}`}
            className="hover:text-primary-700 transition-colors"
          >
            {store.phone}
          </a>
        </div>

        {/* 住所 */}
        <div className="flex items-start gap-2 text-xs text-gray-600 mb-1.5">
          <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
          <span>{store.address}</span>
        </div>

        {/* 営業時間・定休日 */}
        <div className="flex items-start gap-2 text-xs text-gray-600 mb-1.5">
          <Clock className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
          <div>
            <span>{store.businessHours}</span>
            <span className="block text-gray-400">定休日: {store.closedDays}</span>
          </div>
        </div>

        {/* 地図トグルボタン */}
        <button
          onClick={() => setIsMapOpen(!isMapOpen)}
          className="mt-2 flex items-center gap-1 text-xs text-primary-700 hover:text-primary-800 transition-colors focus:outline-none focus:underline"
          aria-expanded={isMapOpen}
          aria-label={isMapOpen ? `${store.name}の地図を閉じる` : `${store.name}の地図を表示`}
        >
          <Map className="h-3.5 w-3.5" />
          {isMapOpen ? '地図を閉じる' : '地図を見る'}
          {isMapOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </div>

      {/* Google Maps iframe */}
      {isMapOpen && (
        <div className="border-t border-[#ddd]">
          <iframe
            src={store.googleMapsEmbedUrl}
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${store.name}の地図`}
          />
        </div>
      )}
    </div>
  )
}
