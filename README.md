# Research Paper Chat — Frontend

A React app for browsing and chatting with a library of indexed medical research papers. Powered by ADE document parsing, ChromaDB vector search, and Claude AI.

## Features

- Browse 8 pre-loaded medical research papers
- Upload additional PDFs for automatic parsing, embedding, and indexing
- Multi-turn AI chat that cites exact passages with cropped source images
- Filter chat searches to a single document
- Expandable sources accordion with similarity scores and chunk type badges

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| File uploads | react-dropzone |
| HTTP | native fetch |

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # or create .env.local manually
npm run dev
```

`.env.local`:
```
VITE_API_URL=https://miagentuca-demos-ade-chat.ud2cay.easypanel.host
```

## Project Structure

```
src/
├── App.jsx              # All state, layout, tab switching
├── index.css            # Tailwind import
├── api/
│   └── client.js        # All fetch calls (no axios)
└── components/
    ├── StatusBanner.jsx
    ├── PipelineVisual.jsx
    ├── DocumentLibrary.jsx
    ├── UploadZone.jsx
    ├── IngestResult.jsx
    ├── DocFilterPanel.jsx
    ├── ChatPanel.jsx
    ├── ChatMessage.jsx
    ├── ChatSourceCard.jsx
    ├── ChatInput.jsx
    ├── SessionControls.jsx
    ├── ChunkTypeBadge.jsx
    ├── SimilarityBar.jsx
    ├── LoadingSpinner.jsx
    └── ErrorBanner.jsx
```

## Deployment

**Vercel:** import the repo, set `VITE_API_URL` as an environment variable — Vite is auto-detected.

**Self-hosted (Docker):**
```bash
docker build --build-arg VITE_API_URL=https://... -t ade-chat-front .
docker run -p 80:80 ade-chat-front
```
