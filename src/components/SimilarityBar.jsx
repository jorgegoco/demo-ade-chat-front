export default function SimilarityBar({ score }) {
  const pct = Math.round(score * 100)
  const color = score > 0.7 ? 'bg-green-500' : score > 0.4 ? 'bg-yellow-400' : 'bg-slate-300'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-slate-500 w-8 text-right">{pct}%</span>
    </div>
  )
}
