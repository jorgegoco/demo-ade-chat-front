import { useState, useRef, useEffect } from 'react'
import { Send, SlidersHorizontal } from 'lucide-react'

export default function ChatInput({ onSend, disabled, topK, setTopK, threshold, setThreshold }) {
  const [text, setText] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [text])

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function submit() {
    const msg = text.trim()
    if (!msg || disabled) return
    onSend(msg)
    setText('')
  }

  return (
    <div className="border-t border-slate-200 bg-white px-4 py-3 space-y-2">
      {showAdvanced && (
        <div className="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">
              Top K results: <strong>{topK}</strong>
            </label>
            <input
              type="range"
              min={1}
              max={20}
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">
              Similarity threshold: <strong>{threshold.toFixed(2)}</strong>
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      )}

      <div className="flex items-end gap-2">
        <button
          onClick={() => setShowAdvanced((v) => !v)}
          className={`p-2 rounded-lg border transition-colors flex-shrink-0 ${
            showAdvanced
              ? 'bg-indigo-50 border-indigo-300 text-indigo-600'
              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
          }`}
          title="Advanced options"
        >
          <SlidersHorizontal size={16} />
        </button>

        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask a question about the research papers…"
          className="flex-1 resize-none border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 disabled:opacity-50 leading-relaxed overflow-hidden"
        />

        <button
          onClick={submit}
          disabled={disabled || !text.trim()}
          className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          title="Send (Enter)"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
