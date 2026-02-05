import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getAdminVehicles } from '@/lib/admin'
import { AdminVehicleList } from './AdminVehicleList'

export default async function AdminVehiclesPage() {
  const vehicles = await getAdminVehicles()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">車両管理</h1>
        <Link
          href="/admin/vehicles/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          新規登録
        </Link>
      </div>

      <AdminVehicleList vehicles={vehicles} />
    </div>
  )
}
