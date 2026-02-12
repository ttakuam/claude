import { Header } from './Header'
import { Footer } from './Footer'

interface UserLayoutProps {
  children: React.ReactNode
  /** ヒーロー画面など、ヘッダー分の余白が不要な場合にtrueにする */
  noHeaderPadding?: boolean
}

export function UserLayout({ children, noHeaderPadding = false }: UserLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent={noHeaderPadding} />
      <main className={`flex-1 ${noHeaderPadding ? '' : 'pt-14'}`}>{children}</main>
      <Footer />
    </div>
  )
}
