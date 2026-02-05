'use client'

import { useState } from 'react'
import { Button, Input } from '@/components/ui'
import { Loader } from '@/components/ui/Loader'
import type { InquiryRequest } from '@/types'

interface InquiryFormProps {
  vehicleId?: string
  vehicleInfo: string
  onSuccess?: () => void
}

export function InquiryForm({ vehicleId, vehicleInfo, onSuccess }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState<InquiryRequest>({
    vehicleId,
    vehicleInfo,
    name: '',
    email: '',
    phone: '',
    inquiryType: 'inquiry',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '送信に失敗しました')
      }

      setSuccess(true)
      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : '送信に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 text-5xl mb-4">✓</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          お問い合わせを受け付けました
        </h3>
        <p className="text-gray-600">
          担当者よりご連絡いたします。しばらくお待ちください。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 対象車両 */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-sm text-gray-500">お問い合わせ対象車両</p>
        <p className="font-medium text-gray-900">{vehicleInfo}</p>
      </div>

      {/* 問い合わせ種別 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          お問い合わせ種別 <span className="text-red-500">*</span>
        </label>
        <select
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="inquiry">お問い合わせ</option>
          <option value="visit_reservation">来店予約</option>
        </select>
      </div>

      {/* お名前 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          お名前 <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="山田 太郎"
          required
        />
      </div>

      {/* メールアドレス */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          required
        />
      </div>

      {/* 電話番号 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          電話番号（任意）
        </label>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="090-1234-5678"
        />
      </div>

      {/* メッセージ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          お問い合わせ内容
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="ご質問やご希望があればお書きください"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* エラーメッセージ */}
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* 送信ボタン */}
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader size="sm" className="text-white" />
            送信中...
          </>
        ) : (
          '送信する'
        )}
      </Button>
    </form>
  )
}
