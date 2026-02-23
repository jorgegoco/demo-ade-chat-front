import { useState, useEffect } from 'react'
import { Library, MessageSquare, Upload, Loader2 } from 'lucide-react'

import { getDocuments, ingestDocument, deleteDocument, sendMessage } from './api/client'

import StatusBanner from './components/StatusBanner'
import PipelineVisual from './components/PipelineVisual'
import DocumentLibrary from './components/DocumentLibrary'
import UploadZone, { SelectedFile } from './components/UploadZone'
import IngestResult from './components/IngestResult'
import DocFilterPanel from './components/DocFilterPanel'
import ChatPanel from './components/ChatPanel'
import ChatInput from './components/ChatInput'
import SessionControls from './components/SessionControls'
import ErrorBanner from './components/ErrorBanner'

export default function App() {
  // Session
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID())

  // Document library
  const [documents, setDocuments] = useState([])
  const [totalChunks, setTotalChunks] = useState(0)

  // Chat messages
  const [messages, setMessages] = useState([])

  // Ingest state
  const [ingestFile, setIngestFile] = useState(null)
  const [ingestLoading, setIngestLoading] = useState(false)
  const [ingestResult, setIngestResult] = useState(null)
  const [ingestError, setIngestError] = useState(null)

  // Chat state
  const [chatLoading, setChatLoading] = useState(false)
  const [chatError, setChatError] = useState(null)

  // Filters
  const [docIdFilter, setDocIdFilter] = useState(null)
  const [topK, setTopK] = useState(5)
  const [threshold, setThreshold] = useState(0.25)

  // UI
  const [activeTab, setActiveTab] = useState('library')

  async function loadDocuments() {
    try {
      const data = await getDocuments()
      if (data.success) {
        setDocuments(data.documents ?? [])
        setTotalChunks(data.total_chunks ?? 0)
      }
    } catch {
      // Silently fail on initial load
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  async function handleIngest() {
    if (!ingestFile) return
    setIngestLoading(true)
    setIngestResult(null)
    setIngestError(null)
    try {
      const result = await ingestDocument(ingestFile)
      setIngestResult(result)
      if (result.success || result.already_indexed) {
        await loadDocuments()
      }
    } catch (err) {
      setIngestError('Upload failed. Please try again.')
    } finally {
      setIngestLoading(false)
    }
  }

  async function handleDelete(docId) {
    if (!window.confirm('Delete this document from the library?')) return
    try {
      await deleteDocument(docId)
      if (docIdFilter === docId) setDocIdFilter(null)
      await loadDocuments()
    } catch {
      // Silently ignore — refresh will reflect reality
    }
  }

  function handleFilterSelect(docId) {
    setDocIdFilter((prev) => (prev === docId ? null : docId))
  }

  async function handleSend(message) {
    // Optimistic update
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: message, sources: [], timestamp: new Date() },
    ])
    setChatLoading(true)
    setChatError(null)

    try {
      const data = await sendMessage({ sessionId, message, docIdFilter, topK, threshold })
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.answer,
            sources: data.sources ?? [],
            timestamp: new Date(),
          },
        ])
      } else {
        setChatError(data.error ?? 'Something went wrong.')
      }
    } catch {
      setChatError('Network error — could not reach the API.')
    } finally {
      setChatLoading(false)
    }
  }

  function handleNewChat() {
    setSessionId(crypto.randomUUID())
    setMessages([])
    setChatError(null)
  }

  const TABS = [
    { id: 'library', label: 'Library', icon: Library },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Status banner */}
      <StatusBanner totalDocuments={documents.length} totalChunks={totalChunks} />

      {/* App header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Research Paper Chat</h1>
            <p className="text-xs text-slate-400">Powered by ADE · ChromaDB · Claude AI</p>
          </div>

          {/* Tab bar */}
          <nav className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* ── LIBRARY TAB ── */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pipeline visual */}
              <PipelineVisual />

              {/* Upload panel */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                <h2 className="text-sm font-semibold text-slate-700">Upload a PDF</h2>
                <UploadZone
                  onFileSelect={(file) => {
                    setIngestFile(file)
                    setIngestResult(null)
                    setIngestError(null)
                  }}
                  disabled={ingestLoading}
                />
                {ingestFile && (
                  <SelectedFile
                    file={ingestFile}
                    onClear={() => { setIngestFile(null); setIngestResult(null) }}
                  />
                )}
                {ingestFile && !ingestResult && (
                  <button
                    onClick={handleIngest}
                    disabled={ingestLoading}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                  >
                    {ingestLoading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Upload size={15} />
                        Index PDF
                      </>
                    )}
                  </button>
                )}
                {ingestError && (
                  <ErrorBanner message={ingestError} onDismiss={() => setIngestError(null)} />
                )}
                {ingestResult && <IngestResult result={ingestResult} />}
              </div>
            </div>

            {/* Document library */}
            <DocumentLibrary
              documents={documents}
              onDelete={handleDelete}
              onFilterSelect={handleFilterSelect}
              activeFilter={docIdFilter}
            />
          </div>
        )}

        {/* ── CHAT TAB ── */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
            <SessionControls
              onNewChat={handleNewChat}
              messageCount={messages.length}
            />
            <DocFilterPanel
              documents={documents}
              activeFilter={docIdFilter}
              onFilterChange={setDocIdFilter}
            />
            {chatError && (
              <div className="px-4 pt-3">
                <ErrorBanner message={chatError} onDismiss={() => setChatError(null)} />
              </div>
            )}
            <ChatPanel messages={messages} loading={chatLoading} />
            <ChatInput
              onSend={handleSend}
              disabled={chatLoading}
              topK={topK}
              setTopK={setTopK}
              threshold={threshold}
              setThreshold={setThreshold}
            />
          </div>
        )}
      </main>
    </div>
  )
}
