import { Filter } from 'lucide-react'

export default function DocFilterPanel({ documents, activeFilter, onFilterChange }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200 text-sm">
      <Filter size={14} className="text-slate-400 flex-shrink-0" />
      <label className="text-slate-500 text-xs font-medium flex-shrink-0">Search in:</label>
      <select
        value={activeFilter ?? ''}
        onChange={(e) => onFilterChange(e.target.value || null)}
        className="flex-1 text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        <option value="">All documents</option>
        {documents.map((doc) => (
          <option key={doc.doc_id} value={doc.doc_id}>
            {doc.doc_name.replace('.pdf', '')}
          </option>
        ))}
      </select>
    </div>
  )
}
