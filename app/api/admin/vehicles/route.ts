import { NextRequest, NextResponse } from 'next/server'
import { createVehicle } from '@/lib/admin'
import type { ApiResponse } from '@/types'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json()

    // バリデーション
    if (!body.vehicle_id || !body.manufacturer || !body.model || !body.price || !body.year || !body.mileage) {
      return NextResponse.json(
        { success: false, error: '必須項目を入力してください' },
        { status: 400 }
      )
    }

    const vehicle = await createVehicle(body)

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: '登録に失敗しました' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: vehicle })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json(
      { success: false, error: 'サーバーエラー' },
      { status: 500 }
    )
  }
}
