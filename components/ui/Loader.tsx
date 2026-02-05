import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Loader({ size = 'md', className }: LoaderProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return <Loader2 className={cn('animate-spin text-blue-600', sizes[size], className)} />
}

interface FullPageLoaderProps {
  message?: string
}

export function FullPageLoader({ message = '読み込み中...' }: FullPageLoaderProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader size="lg" />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  )
}
