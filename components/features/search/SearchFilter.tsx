'use client'

import { useState, useCallback } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import type { VehicleFilter } from '@/types'

interface SearchFilterProps {
  manufacturers: string[]
  onFilterChange: (filter: VehicleFilter) => void
  initialFilter?: VehicleFilter
}

export function SearchFilter({
  manufacturers,
  onFilterChange,
  initialFilter = {},
}: SearchFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filter, setFilter] = useState<VehicleFilter>(initialFilter)

  const handleFilterChange = useCallback(
    (key: keyof VehicleFilter, value: string | number | boolean | undefined) => {
      const newFilter = { ...filter, [key]: value }
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* メインフィルター行 */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* メーカー選択 */}
        <div className="flex-1 min-w-[200px]">
          <select
            value={filter.manufacturer || ''}
            onChange={e => handleFilterChange('manufacturer', e.target.value || undefined)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">すべてのメーカー</option>
            {manufacturers.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* 詳細フィルタートグル */}
        <Button
          variant={isExpanded ? 'primary' : 'outline'}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          詳細条件
        </Button>

        {/* リセットボタン */}
        {hasActiveFilters && (
          <Button variant="ghost" onClick={handleReset} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            条件をクリア
          </Button>
        )}
      </div>

      {/* 詳細フィルター */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 価格帯 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">価格帯</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="下限"
                value={filter.minPrice || ''}
                onChange={e =>
                  handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)
                }
                className="flex-1"
              />
              <span className="text-gray-500">〜</span>
              <Input
                type="number"
                placeholder="上限"
                value={filter.maxPrice || ''}
                onChange={e =>
                  handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)
                }
                className="flex-1"
              />
            </div>
          </div>

          {/* 年式 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">年式</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="下限"
                value={filter.minYear || ''}
                onChange={e =>
                  handleFilterChange('minYear', e.target.value ? Number(e.target.value) : undefined)
                }
                className="flex-1"
              />
              <span className="text-gray-500">〜</span>
              <Input
                type="number"
                placeholder="上限"
                value={filter.maxYear || ''}
                onChange={e =>
                  handleFilterChange('maxYear', e.target.value ? Number(e.target.value) : undefined)
                }
                className="flex-1"
              />
            </div>
          </div>

          {/* 走行距離 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">走行距離（上限）</label>
            <select
              value={filter.maxMileage || ''}
              onChange={e =>
                handleFilterChange('maxMileage', e.target.value ? Number(e.target.value) : undefined)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">指定なし</option>
              <option value="10000">1万km以下</option>
              <option value="30000">3万km以下</option>
              <option value="50000">5万km以下</option>
              <option value="100000">10万km以下</option>
            </select>
          </div>

          {/* 修復歴 */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filter.excludeAccidentHistory || false}
                onChange={e => handleFilterChange('excludeAccidentHistory', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">修復歴なしのみ</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
