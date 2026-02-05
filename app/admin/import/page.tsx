import { CSVImportForm } from './CSVImportForm'

export default function AdminImportPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">CSVインポート</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">CSVファイル形式</h2>
        <p className="text-gray-600 mb-4">
          以下の列を含むCSVファイルをアップロードしてください。
        </p>
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          <code className="text-sm">
            vehicle_id, manufacturer, model, grade, price, year, mileage, inspection_date, accident_history, notes
          </code>
        </div>
        <div className="mt-4">
          <h3 className="font-medium text-gray-900 mb-2">必須列</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li><strong>vehicle_id</strong>: 車両ID（例: VH-001）</li>
            <li><strong>manufacturer</strong>: メーカー（例: トヨタ）</li>
            <li><strong>model</strong>: 車種（例: プリウス）</li>
            <li><strong>price</strong>: 価格（数値）</li>
            <li><strong>year</strong>: 年式（数値）</li>
            <li><strong>mileage</strong>: 走行距離km（数値）</li>
            <li><strong>accident_history</strong>: 修復歴（true/false）</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <CSVImportForm />
      </div>
    </div>
  )
}
