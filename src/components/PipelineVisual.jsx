import { FileText, Cpu, Bot, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    icon: FileText,
    title: 'Ingest',
    lines: ['PDF upload', 'ADE parsing', 'ChromaDB storage'],
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
  },
  {
    icon: Cpu,
    title: 'Embed',
    lines: ['OpenAI embeddings', 'Vector indexing', 'Semantic search'],
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
  {
    icon: Bot,
    title: 'Agent',
    lines: ['Claude AI', 'Retrieval tool', 'Cited answers'],
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
]

export default function PipelineVisual() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
        How it works
      </h3>
      <div className="flex items-stretch gap-2">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={step.title} className="flex items-center gap-2 flex-1">
              <div className={`flex-1 rounded-lg border ${step.border} ${step.bg} p-3 text-center`}>
                <Icon size={22} className={`mx-auto mb-2 ${step.color}`} />
                <p className={`text-sm font-semibold ${step.color} mb-1`}>{step.title}</p>
                {step.lines.map((line) => (
                  <p key={line} className="text-xs text-slate-500 leading-5">{line}</p>
                ))}
              </div>
              {i < STEPS.length - 1 && (
                <ArrowRight size={16} className="text-slate-300 flex-shrink-0" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
