import ChunkTypeBadge from './ChunkTypeBadge'
import SimilarityBar from './SimilarityBar'

const API_URL = import.meta.env.VITE_API_URL

export default function ChatSourceCard({ source }) {
  const shortName = source.doc_name.replace('.pdf', '')
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2 text-sm">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <ChunkTypeBadge type={source.chunk_type} />
        <span className="text-xs text-slate-500">Page {source.page + 1}</span>
      </div>

      <p className="text-xs text-slate-600 font-medium truncate" title={source.doc_name}>
        {shortName}
      </p>

      <SimilarityBar score={source.similarity} />

      {source.text_preview && (
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
          {source.text_preview}
        </p>
      )}

      {source.chunk_image_url && (
        <img
          src={`${API_URL}${source.chunk_image_url}`}
          alt={`${source.doc_name} page ${source.page + 1}`}
          className="rounded-lg border border-slate-200 max-w-full mt-2"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )}
    </div>
  )
}
