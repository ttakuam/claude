import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getVehicleById } from '@/lib/vehicles'
import { VehicleForm } from '@/components/features/admin'

export default async function AdminVehicleEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const vehicle = await getVehicleById(id)

  if (!vehicle) {
    notFound()
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/vehicles"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          車両一覧に戻る
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">車両編集</h1>
        <VehicleForm vehicle={vehicle} mode="edit" />
      </div>
    </div>
  )
}
