'use client'

import Link from 'next/link'
import {
  Car, Menu, X,
  Wrench, Fuel, FlaskConical, UtensilsCrossed, Shield,
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface HeaderProps {
  transparent?: boolean
}

const BUSINESS_LINKS = [
  { href: '/vehicles', label: '車両販売', icon: Car },
  { href: '/shaken', label: '車検・整備', icon: Wrench },
  { href: '/ss', label: 'SS', icon: Fuel },
  { href: '/chemical', label: 'ケミカル', icon: FlaskConical },
  { href: '/food', label: '飲食', icon: UtensilsCrossed },
  { href: 'https://life-support-fujiwa.co.jp/', label: '保険', icon: Shield, external: true },
]

export function Header({ transparent = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const showBg = !transparent || isScrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showBg
          ? 'bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2" aria-label="カー・サービスグループ トップページ">
            <Car className={`h-7 w-7 transition-colors duration-300 ${showBg ? 'text-primary-700' : 'text-white'}`} />
            <div>
              <span className={`text-lg font-bold leading-none block transition-colors duration-300 ${showBg ? 'text-primary-800' : 'text-white'}`}>カー・サービスグループ</span>
              <span className={`text-[10px] leading-none transition-colors duration-300 ${showBg ? 'text-gray-400' : 'text-white/60'}`}>CAR SERVICE GROUP</span>
            </div>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden sm:flex items-center gap-0.5">
            {BUSINESS_LINKS.map(link => {
              const Icon = link.icon
              const className = `px-2.5 py-2 text-xs rounded transition-colors duration-300 flex items-center gap-1 ${
                showBg
                  ? 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`
              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {link.label}
                  </a>
                )
              }
              return (
                <Link key={link.href} href={link.href} className={className}>
                  <Icon className="h-3.5 w-3.5" />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`sm:hidden p-2 transition-colors duration-300 ${showBg ? 'text-gray-600' : 'text-white'}`}
            aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          {BUSINESS_LINKS.map(link => {
            const Icon = link.icon
            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4 text-gray-400" />
                  {link.label}
                </a>
              )
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="h-4 w-4 text-gray-400" />
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
