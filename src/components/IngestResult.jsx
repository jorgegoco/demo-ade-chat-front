import { CheckCircle, Info, AlertCircle } from 'lucide-react'

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  )
}

export default function IngestResult({ result }) {
  if (!result) return null

  if (result.already_indexed) {
    return (
      <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl px-4 py-3 text-sm">
        <Info size={16} className="flex-shrink-0 mt-0.5" />
        <span>
          <strong>{result.doc_name}</strong> is already indexed — no action needed.
        </span>
      </div>
    )
  }

  if (!result.success) {
    return (
      <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm">
        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
        <span>{result.error ?? 'Ingestion failed.'}</span>
      </div>
    )
  }

  const { parsing, indexing } = result
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-4 space-y-2">
      <div className="flex items-center gap-2 text-green-700 font-semibold text-sm mb-3">
        <CheckCircle size={16} />
        Successfully indexed: {result.doc_name}
      </div>
      {parsing && (
        <>
          <Row label="Pages parsed" value={parsing.total_pages} />
          <Row label="Chunks created" value={parsing.total_chunks} />
          <Row label="Parse time" value={`${(parsing.parse_duration_ms / 1000).toFixed(1)}s`} />
        </>
      )}
      {indexing && (
        <>
          <Row label="Chunks embedded" value={indexing.chunks_embedded} />
          {indexing.chunks_skipped > 0 && (
            <Row label="Chunks skipped" value={indexing.chunks_skipped} />
          )}
          <Row label="Embedding time" value={`${(indexing.embedding_duration_ms / 1000).toFixed(1)}s`} />
        </>
      )}
    </div>
  )
}
