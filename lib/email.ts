import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface InquiryEmailParams {
  customerName: string
  customerEmail: string
  customerPhone?: string
  inquiryType: 'inquiry' | 'visit_reservation'
  vehicleInfo: string
  message?: string
}

/**
 * 問い合わせ通知メールを管理者に送信
 */
export async function sendInquiryNotification(
  params: InquiryEmailParams
): Promise<{ success: boolean; error?: string }> {
  const { customerName, customerEmail, customerPhone, inquiryType, vehicleInfo, message } = params

  const inquiryTypeLabel = inquiryType === 'inquiry' ? 'お問い合わせ' : '来店予約'

  const adminEmail = process.env.ADMIN_EMAIL

  if (!adminEmail) {
    console.error('ADMIN_EMAIL is not set')
    return { success: false, error: 'ADMIN_EMAIL is not configured' }
  }

  try {
    const { error } = await resend.emails.send({
      from: 'noreply@resend.dev', // Resendのデフォルトドメイン（本番では独自ドメインを使用）
      to: adminEmail,
      subject: `【${inquiryTypeLabel}】${vehicleInfo} - ${customerName}様`,
      html: `
        <h2>新しい${inquiryTypeLabel}が届きました</h2>

        <h3>お客様情報</h3>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5; width: 120px;"><strong>お名前</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${customerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><strong>メール</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${customerEmail}">${customerEmail}</a></td>
          </tr>
          ${
            customerPhone
              ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><strong>電話番号</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="tel:${customerPhone}">${customerPhone}</a></td>
          </tr>
          `
              : ''
          }
        </table>

        <h3>対象車両</h3>
        <p>${vehicleInfo}</p>

        ${
          message
            ? `
        <h3>メッセージ</h3>
        <p style="white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 4px;">${message}</p>
        `
            : ''
        }

        <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="color: #666; font-size: 12px;">このメールは中古車WEBアプリから自動送信されています。</p>
      `,
    })

    if (error) {
      console.error('Failed to send email:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Email send error:', err)
    return { success: false, error: 'Failed to send email' }
  }
}
