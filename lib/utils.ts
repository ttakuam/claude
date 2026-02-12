import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { VehicleCondition } from '@/types'

/**
 * Tailwind CSSのクラスをマージするユーティリティ関数
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 数値を日本円形式にフォーマット
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(price)
}

/**
 * 車両状態の日本語ラベルを返す
 */
const CONDITION_LABELS: Record<VehicleCondition, string> = {
  new: '新車',
  like_new: '新古車',
  used: '中古車',
}

export function getConditionLabel(condition: VehicleCondition): string {
  return CONDITION_LABELS[condition] || '中古車'
}

/**
 * 日付を日本語形式にフォーマット
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}
