import { getAdminInquiries } from '@/lib/admin'
import { AdminInquiryList } from './AdminInquiryList'

export default async function AdminInquiriesPage() {
  const inquiries = await getAdminInquiries()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">問い合わせ管理</h1>
      <AdminInquiryList inquiries={inquiries} />
    </div>
  )
}
