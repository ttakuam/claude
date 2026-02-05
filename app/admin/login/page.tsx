'use client'

import { LoginForm } from '@/components/features/auth/LoginForm'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">中古車管理システム</h1>
          <p className="mt-2 text-gray-600">管理者ログイン</p>
        </div>

        {/* ログインカード */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <LoginForm />
        </div>

        {/* フッター */}
        <p className="mt-4 text-center text-sm text-gray-500">
          &copy; 2024 Used Car App. All rights reserved.
        </p>
      </div>
    </div>
  )
}
