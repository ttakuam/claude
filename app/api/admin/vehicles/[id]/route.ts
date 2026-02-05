import { NextRequest, NextResponse } from 'next/server'
import { deleteVehicle, updateVehicle } from '@/lib/admin'
import { getVehicleById } from '@/lib/vehicles'
import type { ApiResponse } from '@/types'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse>> {
  try {
    const { id } = await params
    
    const success = await deleteVehicle(id)

    if (!success) {
      return NextResponse.json(
        { success: false, error: '削除に失敗しました' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    return NextResponse.json(
      { success: false, error: 'サーバーエラー' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse>> {
  try {
    const { id } = await params
    const body = await request.json()

    const vehicle = await updateVehicle(id, body)

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: '更新に失敗しました' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: vehicle })
  } catch (error) {
    console.error('Error updating vehicle:', error)
    return NextResponse.json(
      { success: false, error: 'サーバーエラー' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse>> {
  try {
    const { id } = await params
    const vehicle = await getVehicleById(id)

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: '車両が見つかりません' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: vehicle })
  } catch (error) {
    console.error('Error fetching vehicle:', error)
    return NextResponse.json(
      { success: false, error: 'サーバーエラー' },
      { status: 500 }
    )
  }
}
