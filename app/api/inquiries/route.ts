import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { InquiryRequest, ApiResponse } from '@/types'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body: InquiryRequest = await request.json()

    // バリデーション
    if (!body.name || !body.email || !body.vehicleInfo || !body.inquiryType) {
      return NextResponse.json(
        { success: false, error: '必須項目を入力してください' },
        { status: 400 }
      )
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'メールアドレスの形式が正しくありません' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // データベースに保存
    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        vehicle_id: body.vehicleId || null,
        vehicle_info: body.vehicleInfo,
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        inquiry_type: body.inquiryType,
        message: body.message || null,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving inquiry:', error)
      return NextResponse.json(
        { success: false, error: '保存に失敗しました' },
        { status: 500 }
      )
    }

    // TODO: Resendでメール送信（Phase-6で実装）
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@example.com',
    //   to: process.env.ADMIN_EMAIL,
    //   subject: '新規お問い合わせがありました',
    //   html: '...',
    // })

    return NextResponse.json({
      success: true,
      data: { id: data.id },
    })
  } catch (error) {
    console.error('Error processing inquiry:', error)
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}
