import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ChatSourceCard from './ChatSourceCard'

export default function ChatMessage({ message }) {
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] space-y-2 ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-indigo-600 text-white rounded-br-sm'
              : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
          }`}
        >
          {message.content}
        </div>

        {!isUser && message.sources?.length > 0 && (
          <div className="w-full">
            <button
              onClick={() => setSourcesOpen((o) => !o)}
              className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium py-1"
            >
              {sourcesOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              {message.sources.length} source{message.sources.length !== 1 ? 's' : ''}
            </button>

            {sourcesOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {message.sources.map((src) => (
                  <ChatSourceCard key={src.chunk_id} source={src} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
