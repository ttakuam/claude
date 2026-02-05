'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Mail, Phone, MessageSquare } from 'lucide-react'
import { Badge } from '@/components/ui'
import type { InquiryWithVehicle } from '@/types'

interface AdminInquiryListProps {
  inquiries: InquiryWithVehicle[]
}

export function AdminInquiryList({ inquiries }: AdminInquiryListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (inquiries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">問い合わせはありません</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {inquiries.map(inquiry => {
        const isExpanded = expandedId === inquiry.id
        const vehicleInfo = inquiry.vehicles
          ? inquiry.vehicles.manufacturer + ' ' + inquiry.vehicles.model + (inquiry.vehicles.grade ? ' ' + inquiry.vehicles.grade : '')
          : '車両情報なし'

        return (
          <div
            key={inquiry.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpandedId(isExpanded ? null : inquiry.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={inquiry.inquiry_type === 'visit_reservation' ? 'warning' : 'info'}>
                      {inquiry.inquiry_type === 'visit_reservation' ? '来店予約' : 'お問い合わせ'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {format(new Date(inquiry.created_at), 'yyyy年M月d日 HH:mm', { locale: ja })}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900">{inquiry.name} 様</p>
                  <p className="text-sm text-gray-600">{vehicleInfo}</p>
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href={'mailto:' + inquiry.email} className="text-blue-600 hover:underline">
                      {inquiry.email}
                    </a>
                  </div>
                  {inquiry.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <a href={'tel:' + inquiry.phone} className="text-blue-600 hover:underline">
                        {inquiry.phone}
                      </a>
                    </div>
                  )}
                </div>
                {inquiry.message && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MessageSquare className="h-4 w-4" />
                      メッセージ
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap bg-white p-3 rounded border">
                      {inquiry.message}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
