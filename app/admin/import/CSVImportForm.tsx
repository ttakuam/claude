'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui'
import { Loader } from '@/components/ui/Loader'

interface ImportResult {
  success: number
  failed: number
  errors: string[]
}

export function CSVImportForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.csv')) {
        setError('CSVファイルを選択してください')
        return
      }
      setFile(selectedFile)
      setError(null)
      setResult(null)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      if (!droppedFile.name.endsWith('.csv')) {
        setError('CSVファイルを選択してください')
        return
      }
      setFile(droppedFile)
      setError(null)
      setResult(null)
    }
  }

  const handleSubmit = async () => {
    if (!file) return

    setIsUploading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/import', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'インポートに失敗しました')
      }

      setResult(data.data)
      if (data.data.success > 0) {
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'インポートに失敗しました')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* ファイル選択エリア */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          file ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FileText className="h-8 w-8 text-blue-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              クリックしてCSVファイルを選択するか、ドラッグ＆ドロップしてください
            </p>
          </>
        )}
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* 結果表示 */}
      {result && (
        <div className={`p-4 rounded-lg ${result.failed > 0 ? 'bg-yellow-50' : 'bg-green-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className={`h-5 w-5 ${result.failed > 0 ? 'text-yellow-600' : 'text-green-600'}`} />
            <p className="font-medium">
              {result.success}件のインポートに成功しました
              {result.failed > 0 && `（${result.failed}件失敗）`}
            </p>
          </div>
          {result.errors.length > 0 && (
            <ul className="mt-2 text-sm text-red-600 space-y-1">
              {result.errors.map((err, i) => (
                <li key={i}>• {err}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* インポートボタン */}
      <Button
        onClick={handleSubmit}
        disabled={!file || isUploading}
        variant="primary"
        className="w-full flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <>
            <Loader size="sm" className="text-white" />
            インポート中...
          </>
        ) : (
          <>
            <Upload className="h-5 w-5" />
            インポートを実行
          </>
        )}
      </Button>
    </div>
  )
}
