import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import ChatSourceCard from './ChatSourceCard'

const MD_COMPONENTS = {
  h1: ({ children }) => <h1 className="text-base font-bold mt-3 mb-1">{children}</h1>,
  h2: ({ children }) => <h2 className="text-sm font-bold mt-3 mb-1">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-semibold mt-2 mb-1">{children}</h3>,
  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside space-y-0.5 mb-2 pl-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-0.5 mb-2 pl-1">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="bg-slate-100 text-slate-700 rounded px-1 py-0.5 text-xs font-mono">{children}</code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-slate-300 pl-3 italic text-slate-600 my-2">{children}</blockquote>
  ),
  hr: () => <hr className="border-slate-200 my-3" />,
}

export default function ChatMessage({ message }) {
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] space-y-2 ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm ${
            isUser
              ? 'bg-indigo-600 text-white rounded-br-sm whitespace-pre-wrap leading-relaxed'
              : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
          }`}
        >
          {isUser ? (
            message.content
          ) : (
            <ReactMarkdown components={MD_COMPONENTS}>{message.content}</ReactMarkdown>
          )}
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
