export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div>
      <h1>車両詳細ページ</h1>
      <p>車両ID: {id}</p>
    </div>
  )
}
