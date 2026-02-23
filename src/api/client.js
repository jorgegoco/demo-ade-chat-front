const API_URL = import.meta.env.VITE_API_URL

export async function getHealth() {
  const res = await fetch(`${API_URL}/health`)
  return res.json()
}

export async function getDocuments() {
  const res = await fetch(`${API_URL}/documents`)
  return res.json()
}

export async function ingestDocument(file) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_URL}/ingest`, { method: 'POST', body: formData })
  return res.json()
}

export async function deleteDocument(docId) {
  const res = await fetch(`${API_URL}/documents/${docId}`, { method: 'DELETE' })
  return res.json()
}

export async function sendMessage({ sessionId, message, docIdFilter = null, topK = 5, threshold = 0.25 }) {
  const body = {
    session_id: sessionId,
    message,
    top_k: topK,
    threshold,
  }
  if (docIdFilter !== null) body.doc_id_filter = docIdFilter

  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json()
}

export async function clearSession(sessionId) {
  const res = await fetch(`${API_URL}/sessions/${sessionId}`, { method: 'DELETE' })
  return res.json()
}
