import { BookOpen } from 'lucide-react'

export default function StatusBanner({ totalDocuments, totalChunks }) {
  return (
    <div className="bg-indigo-600 text-white px-6 py-3 flex items-center gap-3">
      <BookOpen size={18} className="flex-shrink-0" />
      {totalDocuments === 0 ? (
        <span className="text-sm font-medium">Library indexing in progress…</span>
      ) : (
        <span className="text-sm font-medium">
          {totalDocuments} {totalDocuments === 1 ? 'paper' : 'papers'} · {totalChunks.toLocaleString()} chunks indexed
        </span>
      )}
    </div>
  )
}
