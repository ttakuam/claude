'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'
import { Loader } from '@/components/ui/Loader'
import type { Vehicle, VehicleStatus } from '@/types'

interface VehicleFormProps {
  vehicle?: Vehicle
  mode: 'create' | 'edit'
}

interface FormData {
  vehicle_id: string
  manufacturer: string
  model: string
  grade: string
  price: string
  year: string
  mileage: string
  inspection_date: string
  accident_history: boolean
  notes: string
  status: VehicleStatus
}

export function VehicleForm({ vehicle, mode }: VehicleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    vehicle_id: vehicle?.vehicle_id || '',
    manufacturer: vehicle?.manufacturer || '',
    model: vehicle?.model || '',
    grade: vehicle?.grade || '',
    price: vehicle?.price?.toString() || '',
    year: vehicle?.year?.toString() || '',
    mileage: vehicle?.mileage?.toString() || '',
    inspection_date: vehicle?.inspection_date || '',
    accident_history: vehicle?.accident_history || false,
    notes: vehicle?.notes || '',
    status: vehicle?.status || 'published',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!formData.vehicle_id || !formData.manufacturer || !formData.model || !formData.price || !formData.year || !formData.mileage) {
      setError('必須項目を入力してください')
      setIsSubmitting(false)
      return
    }

    try {
      const url = mode === 'create' ? '/api/admin/vehicles' : `/api/admin/vehicles/${vehicle?.id}`
      const response = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle_id: formData.vehicle_id,
          manufacturer: formData.manufacturer,
          model: formData.model,
          grade: formData.grade || null,
          price: parseInt(formData.price, 10),
          year: parseInt(formData.year, 10),
          mileage: parseInt(formData.mileage, 10),
          inspection_date: formData.inspection_date || null,
          accident_history: formData.accident_history,
          notes: formData.notes || null,
          status: formData.status,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '保存に失敗しました')
      }

      router.push('/admin/vehicles')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">車両ID <span className="text-red-500">*</span></label>
          <Input type="text" name="vehicle_id" value={formData.vehicle_id} onChange={handleChange} placeholder="VH-001" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">メーカー <span className="text-red-500">*</span></label>
          <Input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} placeholder="トヨタ" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">車種 <span className="text-red-500">*</span></label>
          <Input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="プリウス" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">グレード</label>
          <Input type="text" name="grade" value={formData.grade} onChange={handleChange} placeholder="S ツーリングセレクション" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">価格（円） <span className="text-red-500">*</span></label>
          <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="2500000" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">年式 <span className="text-red-500">*</span></label>
          <Input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="2020" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">走行距離（km） <span className="text-red-500">*</span></label>
          <Input type="number" name="mileage" value={formData.mileage} onChange={handleChange} placeholder="30000" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">車検満了日</label>
          <Input type="date" name="inspection_date" value={formData.inspection_date} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ステータス</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="published">公開中</option>
            <option value="sold">成約済み</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="accident_history" checked={formData.accident_history} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">修復歴あり</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">備考・説明</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="車両の特徴やアピールポイントなど" />
      </div>
      <div className="flex items-center gap-4">
        <Button type="submit" variant="primary" disabled={isSubmitting} className="flex items-center gap-2">
          {isSubmitting ? (<><Loader size="sm" className="text-white" />保存中...</>) : (mode === 'create' ? '登録する' : '更新する')}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>キャンセル</Button>
      </div>
    </form>
  )
}
