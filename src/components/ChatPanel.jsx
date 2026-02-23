import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import LoadingSpinner from './LoadingSpinner'
import { MessageSquare } from 'lucide-react'

export default function ChatPanel({ messages, loading }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
      {messages.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3 py-16">
          <MessageSquare size={36} className="opacity-30" />
          <p className="text-sm">Ask a question about the research papers</p>
        </div>
      )}

      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg} />
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
            <LoadingSpinner size="sm" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
