'use client'

import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded transition-colors',
            activeTab === tab.id
              ? 'bg-primary-800 text-white'
              : 'bg-white border border-[#ddd] text-gray-600 hover:bg-gray-50'
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn(
              'ml-1.5 text-xs',
              activeTab === tab.id ? 'text-gray-300' : 'text-gray-400'
            )}>
              ({tab.count})
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
