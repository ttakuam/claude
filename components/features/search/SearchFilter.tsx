'use client'

import { useState, useCallback } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui'
import type { VehicleFilter } from '@/types'
import { STORES } from '@/data/stores'

interface SearchFilterProps {
  manufacturers: string[]
  bodyColors: string[]
  onFilterChange: (filter: VehicleFilter) => void
  initialFilter?: VehicleFilter
}

const VEHICLE_CONDITIONS = [
  { value: 'new', label: '新車' },
  { value: 'like_new', label: '新古車' },
  { value: 'used', label: '中古車' },
]

const VEHICLE_STORES = STORES.filter(s => s.businesses.some(b => b.category === 'vehicle'))

const BODY_TYPES = [
  { value: 'suv', label: 'SUV', icon: '🚙' },
  { value: 'minivan', label: 'ミニバン', icon: '🚐' },
  { value: 'sedan', label: 'セダン', icon: '🚗' },
  { value: 'compact', label: 'コンパクト', icon: '🚘' },
  { value: 'wagon', label: 'ワゴン', icon: '🏎️' },
]

const PRICE_RANGES = [
  { label: '〜50万', max: 500000 },
  { label: '50〜100万', min: 500000, max: 1000000 },
  { label: '100〜150万', min: 1000000, max: 1500000 },
  { label: '150〜200万', min: 1500000, max: 2000000 },
  { label: '200〜300万', min: 2000000, max: 3000000 },
  { label: '300〜500万', min: 3000000, max: 5000000 },
  { label: '500万〜', min: 5000000 },
]

// メーカーアイコン（頭文字をスタイル化）
const MANUFACTURER_ICONS: Record<string, string> = {
  'トヨタ': 'T',
  'ホンダ': 'H',
  '日産': 'N',
  'スズキ': 'S',
  'スバル': '★',
  'マツダ': 'M',
}

export function SearchFilter({
  manufacturers,
  bodyColors,
  onFilterChange,
  initialFilter = {},
}: SearchFilterProps) {
  const [filter, setFilter] = useState<VehicleFilter>(initialFilter)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const updateFilter = useCallback(
    (updates: Partial<VehicleFilter>) => {
      const newFilter = { ...filter, ...updates }
      setFilter(newFilter)
      onFilterChange(newFilter)
    },
    [filter, onFilterChange]
  )

  const handleReset = useCallback(() => {
    setFilter({})
    onFilterChange({})
  }, [onFilterChange])

  const hasActiveFilters = Object.values(filter).some(
    v => v !== undefined && v !== '' && v !== false
  )

  const getActivePriceIndex = () => {
    for (let i = 0; i < PRICE_RANGES.length; i++) {
      const range = PRICE_RANGES[i]
      if (filter.minPrice === range.min && filter.maxPrice === range.max) return i
      if (!range.min && filter.maxPrice === range.max && !filter.minPrice) return i
      if (!range.max && filter.minPrice === range.min && !filter.maxPrice) return i
    }
    return -1
  }

  const handlePriceSelect = (index: number) => {
    if (getActivePriceIndex() === index) {
      updateFilter({ minPrice: undefined, maxPrice: undefined })
      return
    }
    const range = PRICE_RANGES[index]
    updateFilter({
      minPrice: range.min || undefined,
      maxPrice: range.max || undefined,
    })
  }

  const handleBodyTypeSelect = (value: string) => {
    updateFilter({ bodyType: filter.bodyType === value ? undefined : value })
  }

  const handleManufacturerSelect = (value: string) => {
    updateFilter({ manufacturer: filter.manufacturer === value ? undefined : value })
  }

  return (
    <div className="bg-white border border-[#ddd]">
      {/* ヘッダー */}
      <div className="bg-primary-800 px-4 py-2 flex items-center justify-between">
        <span className="text-white text-sm font-bold">車両を探す</span>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-xs text-gray-300 hover:text-white flex items-center gap-0.5 transition-colors focus:outline-none focus:underline"
            aria-label="検索条件をすべてクリア"
          >
            <X className="h-3 w-3" />
            条件クリア
          </button>
        )}
      </div>

      {/* パネル1: メーカー */}
      <div className="p-4 border-b border-[#eee]">
        <h3 className="text-xs font-bold text-gray-800 mb-3">メーカー</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {manufacturers.map(m => (
            <button
              key={m}
              onClick={() => handleManufacturerSelect(m)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded transition-colors ${
                filter.manufacturer === m
                  ? 'bg-primary-800 text-white'
                  : 'bg-[#f5f5f5] text-gray-700 hover:bg-[#eee]'
              }`}
            >
              <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                filter.manufacturer === m
                  ? 'bg-white/20 text-white'
                  : 'bg-white text-primary-800 border border-[#ddd]'
              }`}>
                {MANUFACTURER_ICONS[m] || m.charAt(0)}
              </span>
              <span className="text-[11px] font-medium leading-tight">{m}</span>
            </button>
          ))}
        </div>
      </div>

      {/* パネル2: ボディタイプ */}
      <div className="p-4 border-b border-[#eee]">
        <h3 className="text-xs font-bold text-gray-800 mb-3">ボディタイプ</h3>
        <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
          {BODY_TYPES.map(type => (
            <button
              key={type.value}
              onClick={() => handleBodyTypeSelect(type.value)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded transition-colors ${
                filter.bodyType === type.value
                  ? 'bg-primary-800 text-white'
                  : 'bg-[#f5f5f5] text-gray-700 hover:bg-[#eee]'
              }`}
            >
              <span className="text-2xl leading-none">{type.icon}</span>
              <span className="text-[11px] font-medium leading-tight">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* パネル3: 価格 */}
      <div className="p-4 border-b border-[#eee]">
        <h3 className="text-xs font-bold text-gray-800 mb-3">価格</h3>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
          {PRICE_RANGES.map((range, i) => (
            <button
              key={i}
              onClick={() => handlePriceSelect(i)}
              className={`py-2 px-1 rounded text-xs font-medium transition-colors text-center ${
                getActivePriceIndex() === i
                  ? 'bg-primary-800 text-white'
                  : 'bg-[#f5f5f5] text-gray-700 hover:bg-[#eee]'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* 詳細条件トグル */}
      <div className="p-4">
        <button
          onClick={() => setIsDetailOpen(!isDetailOpen)}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-primary-700 hover:text-primary-800 border border-dashed border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          {isDetailOpen ? '詳細条件を閉じる' : '詳細条件を開く'}
        </button>

        {isDetailOpen && (
          <div className="mt-4 pt-4 border-t border-[#eee] grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 年式 */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">年式</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="例: 2020"
                  value={filter.minYear || ''}
                  onChange={e =>
                    updateFilter({ minYear: e.target.value ? Number(e.target.value) : undefined })
                  }
                  className="flex-1 text-sm !py-1.5"
                />
                <span className="text-gray-400 text-xs">〜</span>
                <Input
                  type="number"
                  placeholder="例: 2025"
                  value={filter.maxYear || ''}
                  onChange={e =>
                    updateFilter({ maxYear: e.target.value ? Number(e.target.value) : undefined })
                  }
                  className="flex-1 text-sm !py-1.5"
                />
              </div>
            </div>

            {/* 走行距離 */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">走行距離</label>
              <select
                value={filter.maxMileage || ''}
                onChange={e =>
                  updateFilter({ maxMileage: e.target.value ? Number(e.target.value) : undefined })
                }
                className="w-full px-3 py-1.5 border border-[#ddd] rounded text-sm focus:outline-none focus:border-primary-600"
              >
                <option value="">指定なし</option>
                <option value="10000">1万km以下</option>
                <option value="30000">3万km以下</option>
                <option value="50000">5万km以下</option>
                <option value="100000">10万km以下</option>
              </select>
            </div>

            {/* 修復歴 */}
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filter.excludeAccidentHistory || false}
                  onChange={e => updateFilter({ excludeAccidentHistory: e.target.checked || undefined })}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-primary-700 focus:ring-primary-600"
                />
                <span className="text-xs text-gray-700">修復歴なしのみ表示</span>
              </label>
            </div>

            {/* 車両状態 */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">車両状態</label>
              <select
                value={filter.vehicleCondition || ''}
                onChange={e =>
                  updateFilter({ vehicleCondition: e.target.value || undefined })
                }
                className="w-full px-3 py-1.5 border border-[#ddd] rounded text-sm focus:outline-none focus:border-primary-600"
              >
                <option value="">指定なし</option>
                {VEHICLE_CONDITIONS.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* 車体色 */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">車体色</label>
              <select
                value={filter.bodyColor || ''}
                onChange={e =>
                  updateFilter({ bodyColor: e.target.value || undefined })
                }
                className="w-full px-3 py-1.5 border border-[#ddd] rounded text-sm focus:outline-none focus:border-primary-600"
              >
                <option value="">指定なし</option>
                {bodyColors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            {/* 販売店舗 */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">販売店舗</label>
              <select
                value={filter.sellingStoreId || ''}
                onChange={e =>
                  updateFilter({ sellingStoreId: e.target.value || undefined })
                }
                className="w-full px-3 py-1.5 border border-[#ddd] rounded text-sm focus:outline-none focus:border-primary-600"
              >
                <option value="">指定なし</option>
                {VEHICLE_STORES.map(store => (
                  <option key={store.id} value={store.id}>{store.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
