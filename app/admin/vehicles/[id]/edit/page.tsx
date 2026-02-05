export default async function AdminVehicleEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div>
      <h1>車両編集</h1>
      <p>車両ID: {id}</p>
    </div>
  )
}
