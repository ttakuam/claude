'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react'
import type { VehicleImage } from '@/types'

interface ImageGalleryProps {
  images: VehicleImage[]
  alt: string
  accidentHistory?: boolean
}

export function ImageGallery({ images, alt, accidentHistory }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const currentImage = images[selectedIndex]?.image_url || '/images/no-image.png'
  const total = images.length

  const scrollToThumb = useCallback((index: number) => {
    if (!thumbsRef.current) return
    const thumb = thumbsRef.current.children[index] as HTMLElement
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [])

  const goTo = useCallback((index: number) => {
    const newIndex = (index + total) % total
    setSelectedIndex(newIndex)
    scrollToThumb(newIndex)
  }, [total, scrollToThumb])

  const goPrev = useCallback(() => goTo(selectedIndex - 1), [goTo, selectedIndex])
  const goNext = useCallback(() => goTo(selectedIndex + 1), [goTo, selectedIndex])

  return (
    <div className="space-y-2">
      {/* メイン画像 */}
      <div className="relative aspect-[4/3] bg-[#eee] overflow-hidden border border-[#ddd] group">
        <Image
          src={currentImage}
          alt={`${alt} - ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={selectedIndex === 0}
        />

        {/* 前後ボタン */}
        {total > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="前の画像"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="次の画像"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* 枚数カウンター */}
        {total > 1 && (
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
            {selectedIndex + 1} / {total}
          </div>
        )}

        {/* 修復歴バッジ */}
        {accidentHistory && (
          <div className="absolute bottom-0 left-0 flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white text-xs font-bold">
            <AlertTriangle className="h-3.5 w-3.5" />
            修復歴あり
          </div>
        )}
      </div>

      {/* サムネイルストリップ（横スクロール） */}
      {total > 1 && (
        <div
          ref={thumbsRef}
          className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin"
        >
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => goTo(index)}
              aria-label={`画像 ${index + 1} を表示`}
              className={`relative shrink-0 w-16 h-12 bg-[#eee] overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                index === selectedIndex
                  ? 'border-primary-600 opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img.image_url}
                alt={`${alt} - ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
