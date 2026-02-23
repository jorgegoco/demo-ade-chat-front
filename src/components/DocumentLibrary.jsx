import { Trash2, Filter, FileText, Calendar } from 'lucide-react'
import ChunkTypeBadge from './ChunkTypeBadge'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function DocCard({ doc, onDelete, onFilterSelect, isActiveFilter }) {
  const summary = doc.chunk_summary ?? {}
  return (
    <div
      className={`bg-white rounded-xl border shadow-sm p-4 flex flex-col gap-3 transition-colors ${
        isActiveFilter ? 'border-indigo-400 ring-1 ring-indigo-300' : 'border-slate-200'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <FileText size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-slate-800 break-words leading-5">
            {doc.doc_name.replace('.pdf', '')}
          </p>
        </div>
        <button
          onClick={() => onDelete(doc.doc_id)}
          className="text-slate-400 hover:text-red-500 flex-shrink-0 p-1 rounded transition-colors"
          title="Delete document"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="flex flex-wrap gap-1">
        {Object.entries(summary).map(([type, count]) =>
          count > 0 ? (
            <span key={type} className="inline-flex items-center gap-1">
              <ChunkTypeBadge type={type} />
              <span className="text-xs text-slate-500">{count}</span>
            </span>
          ) : null
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {formatDate(doc.indexed_at)}
        </span>
        <span>{doc.chunk_count} chunks</span>
      </div>

      <button
        onClick={() => onFilterSelect(doc.doc_id)}
        className={`w-full flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-lg border transition-colors ${
          isActiveFilter
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'
        }`}
      >
        <Filter size={12} />
        {isActiveFilter ? 'Filtering chat to this doc' : 'Filter chat to this doc'}
      </button>
    </div>
  )
}

export default function DocumentLibrary({ documents, onDelete, onFilterSelect, activeFilter }) {
  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center text-slate-400">
        <FileText size={32} className="mx-auto mb-3 opacity-40" />
        <p className="text-sm">No documents indexed yet. Upload a PDF to get started.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Document Library · {documents.length} {documents.length === 1 ? 'paper' : 'papers'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <DocCard
            key={doc.doc_id}
            doc={doc}
            onDelete={onDelete}
            onFilterSelect={onFilterSelect}
            isActiveFilter={activeFilter === doc.doc_id}
          />
        ))}
      </div>
    </div>
  )
}
