import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface ImportResult {
  success: number
  failed: number
  errors: string[]
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'ファイルが選択されていません' },
        { status: 400 }
      )
    }

    const text = await file.text()
    const lines = text.split('\n').filter(line => line.trim())

    if (lines.length < 2) {
      return NextResponse.json(
        { success: false, error: 'CSVファイルにデータがありません' },
        { status: 400 }
      )
    }

    // ヘッダー行を解析
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
    const requiredHeaders = ['vehicle_id', 'manufacturer', 'model', 'price', 'year', 'mileage', 'accident_history']

    for (const required of requiredHeaders) {
      if (!headers.includes(required)) {
        return NextResponse.json(
          { success: false, error: `必須列 "${required}" がありません` },
          { status: 400 }
        )
      }
    }

    const supabase = await createClient()
    const result: ImportResult = { success: 0, failed: 0, errors: [] }

    // データ行を処理
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      const row: Record<string, string> = {}

      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })

      try {
        const vehicleData = {
          vehicle_id: row.vehicle_id,
          manufacturer: row.manufacturer,
          model: row.model,
          grade: row.grade || null,
          price: parseInt(row.price, 10),
          year: parseInt(row.year, 10),
          mileage: parseInt(row.mileage, 10),
          inspection_date: row.inspection_date || null,
          accident_history: row.accident_history?.toLowerCase() === 'true',
          notes: row.notes || null,
          engine_displacement: row.engine_displacement ? parseInt(row.engine_displacement, 10) : null,
          vehicle_condition: row.vehicle_condition || 'used',
          additional_costs: row.additional_costs ? parseInt(row.additional_costs, 10) : 0,
          body_color: row.body_color || null,
          selling_store_id: row.selling_store_id || null,
          status: 'published',
        }

        // バリデーション
        if (!vehicleData.vehicle_id || !vehicleData.manufacturer || !vehicleData.model) {
          throw new Error('必須項目が不足しています')
        }
        if (isNaN(vehicleData.price) || isNaN(vehicleData.year) || isNaN(vehicleData.mileage)) {
          throw new Error('数値形式が正しくありません')
        }

        const { error } = await supabase.from('vehicles').insert(vehicleData)

        if (error) {
          throw new Error(error.message)
        }

        result.success++
      } catch (err) {
        result.failed++
        result.errors.push(`行${i + 1}: ${err instanceof Error ? err.message : '不明なエラー'}`)
      }
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { success: false, error: 'インポート処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
