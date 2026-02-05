import { NextRequest, NextResponse } from 'next/server'
import { getVehiclesByIds } from '@/lib/vehicles'
import type { ApiResponse, VehicleWithImages } from '@/types'

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<VehicleWithImages[]>>> {
  try {
    const body = await request.json()
    const ids: string[] = body.ids || []

    if (!Array.isArray(ids)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 400 }
      )
    }

    const vehicles = await getVehiclesByIds(ids)

    return NextResponse.json({
      success: true,
      data: vehicles,
    })
  } catch (error) {
    console.error('Error fetching favorite vehicles:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}
