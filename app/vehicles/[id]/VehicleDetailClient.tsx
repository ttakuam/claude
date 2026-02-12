'use client'

import { useState } from 'react'
import { Heart, MessageSquare, Phone } from 'lucide-react'
import { Button, Modal } from '@/components/ui'
import { useFavorites } from '@/hooks/useFavorites'
import { InquiryForm } from '@/components/features/inquiry/InquiryForm'
import type { Vehicle } from '@/types'

interface VehicleDetailClientProps {
  vehicle: Vehicle
  storePhone?: string
}

export function VehicleDetailClient({ vehicle, storePhone }: VehicleDetailClientProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)
  const isLiked = isFavorite(vehicle.id)

  return (
    <>
      {/* デスクトップ用ボタン */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant={isLiked ? 'primary' : 'outline'}
          onClick={() => toggleFavorite(vehicle.id)}
          className="flex items-center justify-center gap-2 flex-1"
          aria-label={isLiked ? 'お気に入りから削除' : 'お気に入りに追加'}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          {isLiked ? 'お気に入り登録済み' : 'お気に入りに追加'}
        </Button>

        <Button
          variant="primary"
          onClick={() => setIsInquiryModalOpen(true)}
          className="flex items-center justify-center gap-2 flex-1"
        >
          <MessageSquare className="h-5 w-5" />
          問い合わせる
        </Button>
      </div>

      {/* スマホ固定CTAバー */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#ddd] p-2 flex gap-2 sm:hidden">
        {storePhone && (
          <a
            href={`tel:${storePhone}`}
            className="flex items-center justify-center gap-1.5 flex-1 bg-white border border-primary-700 text-primary-700 font-bold py-3 rounded text-sm"
            aria-label="電話で問い合わせ"
          >
            <Phone className="h-4 w-4" />
            電話する
          </a>
        )}
        <button
          onClick={() => setIsInquiryModalOpen(true)}
          className={`flex items-center justify-center gap-1.5 bg-primary-700 hover:bg-primary-600 text-white font-bold py-3 rounded text-sm transition-colors ${storePhone ? 'flex-1' : 'w-full'}`}
        >
          <MessageSquare className="h-4 w-4" />
          問い合わせる
        </button>
      </div>

      {/* 問い合わせモーダル */}
      <Modal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        title="お問い合わせ"
      >
        <InquiryForm
          vehicleId={vehicle.id}
          vehicleInfo={`${vehicle.manufacturer} ${vehicle.model}${vehicle.grade ? ` ${vehicle.grade}` : ''}`}
          onSuccess={() => setIsInquiryModalOpen(false)}
        />
      </Modal>
    </>
  )
}
