import { RotateCcw } from 'lucide-react'

export default function SessionControls({ onNewChat, messageCount }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-white">
      <span className="text-xs text-slate-400">
        {messageCount > 0 ? `${messageCount} message${messageCount !== 1 ? 's' : ''}` : 'New conversation'}
      </span>
      <button
        onClick={onNewChat}
        className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:border-indigo-400 rounded-lg px-3 py-1.5 transition-colors"
      >
        <RotateCcw size={13} />
        New Chat
      </button>
    </div>
  )
}
