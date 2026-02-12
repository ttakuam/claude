import type { Store, BusinessCategory } from '@/types'

// ===== カテゴリ → 表示名マッピング =====
export const BUSINESS_CATEGORY_LABELS: Record<BusinessCategory, string> = {
  shaken: '車検・整備',
  vehicle: '車両販売',
  ss: 'SS',
  chemical: 'ケミカル',
  insurance: '保険',
  food: '飲食',
  tire: 'タイヤ販売',
  oil: 'オイル交換',
}

// ===== タブ定義 =====
export const STORE_TABS = [
  { id: 'all', label: '全店舗' },
  { id: 'shaken', label: '車検・整備' },
  { id: 'vehicle', label: '車両販売' },
  { id: 'ss', label: 'SS' },
  { id: 'chemical', label: 'ケミカル' },
  { id: 'insurance', label: '保険' },
  { id: 'food', label: '飲食' },
] as const

export type StoreTabId = (typeof STORE_TABS)[number]['id']

// ===== 全12店舗データ =====
export const STORES: Store[] = [
  // --- 複合事業店舗 ---
  {
    id: 'store-01',
    name: '○○本店',
    businesses: [
      { category: 'shaken', label: '車検・整備', subLabel: '板金塗装' },
      { category: 'insurance', label: '保険' },
      { category: 'vehicle', label: '車両販売' },
    ],
    phone: '000-0000-0001',
    address: '○○県○○市○○町1-1-1',
    businessHours: '9:00〜19:00',
    closedDays: '毎週水曜日',
    imageUrl: '/images/stores/store-01.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_01',
  },
  {
    id: 'store-02',
    name: '△△支店',
    businesses: [
      { category: 'shaken', label: '車検・整備', subLabel: 'スピード塗装' },
      { category: 'insurance', label: '保険' },
      { category: 'vehicle', label: '車両販売' },
    ],
    phone: '000-0000-0002',
    address: '○○県○○市△△町2-2-2',
    businessHours: '9:00〜19:00',
    closedDays: '毎週水曜日',
    imageUrl: '/images/stores/store-02.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_02',
  },
  {
    id: 'store-03',
    name: '□□店',
    businesses: [
      { category: 'shaken', label: '車検・整備', subLabel: 'スピード塗装' },
      { category: 'insurance', label: '保険' },
      { category: 'tire', label: 'タイヤ販売' },
    ],
    phone: '000-0000-0003',
    address: '○○県○○市□□町3-3-3',
    businessHours: '9:00〜19:00',
    closedDays: '毎週水曜日',
    imageUrl: '/images/stores/store-03.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_03',
  },
  {
    id: 'store-04',
    name: '◇◇工場',
    businesses: [
      { category: 'shaken', label: '車検・整備', subLabel: '板金塗装・スピード塗装' },
      { category: 'insurance', label: '保険' },
    ],
    phone: '000-0000-0004',
    address: '○○県○○市◇◇町4-4-4',
    businessHours: '9:00〜18:00',
    closedDays: '毎週水曜日',
    imageUrl: '/images/stores/store-04.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_04',
  },
  {
    id: 'store-05',
    name: '☆☆タイヤセンター',
    businesses: [
      { category: 'tire', label: 'タイヤ販売' },
      { category: 'oil', label: 'オイル交換' },
    ],
    phone: '000-0000-0005',
    address: '○○県○○市☆☆町5-5-5',
    businessHours: '9:00〜18:00',
    closedDays: '毎週水曜日',
    imageUrl: '/images/stores/store-05.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_05',
  },

  // --- SS事業部（4店舗） ---
  {
    id: 'store-06',
    name: 'SS ○○店',
    businesses: [
      { category: 'ss', label: 'SS' },
    ],
    phone: '000-0000-0006',
    address: '○○県○○市○○町6-6-6',
    businessHours: '7:00〜21:00',
    closedDays: '年中無休',
    imageUrl: '/images/stores/store-06.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_06',
  },
  {
    id: 'store-07',
    name: 'SS △△店',
    businesses: [
      { category: 'ss', label: 'SS' },
    ],
    phone: '000-0000-0007',
    address: '○○県○○市△△町7-7-7',
    businessHours: '7:00〜21:00',
    closedDays: '年中無休',
    imageUrl: '/images/stores/store-07.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_07',
  },
  {
    id: 'store-08',
    name: 'SS □□店',
    businesses: [
      { category: 'ss', label: 'SS' },
    ],
    phone: '000-0000-0008',
    address: '○○県○○市□□町8-8-8',
    businessHours: '7:00〜21:00',
    closedDays: '年中無休',
    imageUrl: '/images/stores/store-08.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_08',
  },
  {
    id: 'store-09',
    name: 'SS ◇◇店',
    businesses: [
      { category: 'ss', label: 'SS' },
    ],
    phone: '000-0000-0009',
    address: '○○県○○市◇◇町9-9-9',
    businessHours: '7:00〜21:00',
    closedDays: '年中無休',
    imageUrl: '/images/stores/store-09.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_09',
  },

  // --- 単一事業店舗 ---
  {
    id: 'store-10',
    name: 'ケミカルセンター',
    businesses: [
      { category: 'chemical', label: 'ケミカル' },
    ],
    phone: '000-0000-0010',
    address: '○○県○○市○○町10-10-10',
    businessHours: '9:00〜18:00',
    closedDays: '土日祝',
    imageUrl: '/images/stores/store-10.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_10',
  },
  {
    id: 'store-11',
    name: '保険プラザ ○○',
    businesses: [
      { category: 'insurance', label: '保険' },
    ],
    phone: '000-0000-0011',
    address: '○○県○○市○○町11-11-11',
    businessHours: '9:00〜18:00',
    closedDays: '土日祝',
    imageUrl: '/images/stores/store-11.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_11',
  },
  {
    id: 'store-12',
    name: '○○食堂',
    businesses: [
      { category: 'food', label: '飲食' },
    ],
    phone: '000-0000-0012',
    address: '○○県○○市○○町12-12-12',
    businessHours: '11:00〜22:00',
    closedDays: '毎週月曜日',
    imageUrl: '/images/stores/store-12.jpg',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=DUMMY_STORE_12',
  },
]

// ===== ヘルパー関数 =====

/** 特定の事業カテゴリを含む店舗を返す */
export function getStoresByCategory(category: BusinessCategory): Store[] {
  return STORES.filter(store =>
    store.businesses.some(b => b.category === category)
  )
}

/** タブIDに基づいてフィルタリング（'all'は全店舗） */
export function getStoresByTab(tabId: StoreTabId): Store[] {
  if (tabId === 'all') return STORES
  return getStoresByCategory(tabId as BusinessCategory)
}
