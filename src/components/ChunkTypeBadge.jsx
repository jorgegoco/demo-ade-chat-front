const TYPE_STYLES = {
  chunkText: 'bg-green-100 text-green-800',
  chunkTable: 'bg-blue-100 text-blue-800',
  chunkFigure: 'bg-purple-100 text-purple-800',
  chunkMarginalia: 'bg-orange-100 text-orange-800',
}

const TYPE_LABELS = {
  chunkText: 'Text',
  chunkTable: 'Table',
  chunkFigure: 'Figure',
  chunkMarginalia: 'Marginalia',
}

export default function ChunkTypeBadge({ type }) {
  const style = TYPE_STYLES[type] ?? 'bg-slate-100 text-slate-600'
  const label = TYPE_LABELS[type] ?? type ?? 'Unknown'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  )
}
