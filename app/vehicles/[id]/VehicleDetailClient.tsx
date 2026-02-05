'use client'

import { useState } from 'react'
import { Heart, MessageSquare } from 'lucide-react'
import { Button, Modal } from '@/components/ui'
import { useFavorites } from '@/hooks/useFavorites'
import { InquiryForm } from '@/components/features/inquiry/InquiryForm'
import type { Vehicle } from '@/types'

interface VehicleDetailClientProps {
  vehicle: Vehicle
}

export function VehicleDetailClient({ vehicle }: VehicleDetailClientProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)
  const isLiked = isFavorite(vehicle.id)

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant={isLiked ? 'primary' : 'outline'}
          onClick={() => toggleFavorite(vehicle.id)}
          className="flex items-center justify-center gap-2 flex-1"
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
