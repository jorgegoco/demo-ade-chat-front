import { useDropzone } from 'react-dropzone'
import { UploadCloud, FileText } from 'lucide-react'

export default function UploadZone({ onFileSelect, disabled }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    disabled,
    onDrop: (accepted) => {
      if (accepted.length > 0) onFileSelect(accepted[0])
    },
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        disabled
          ? 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-60'
          : isDragActive
          ? 'border-indigo-400 bg-indigo-50'
          : 'border-slate-300 bg-white hover:border-indigo-300 hover:bg-indigo-50'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="flex flex-col items-center gap-2 text-indigo-600">
          <UploadCloud size={32} />
          <p className="text-sm font-medium">Drop the PDF here…</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <UploadCloud size={32} className="text-slate-400" />
          <p className="text-sm font-medium">Drag & drop a PDF here</p>
          <p className="text-xs text-slate-400">or click to browse · max 20 MB</p>
        </div>
      )}
    </div>
  )
}

export function SelectedFile({ file, onClear }) {
  if (!file) return null
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm">
      <FileText size={15} className="text-indigo-500 flex-shrink-0" />
      <span className="flex-1 truncate text-slate-700">{file.name}</span>
      <button onClick={onClear} className="text-slate-400 hover:text-slate-600 text-xs">
        ✕
      </button>
    </div>
  )
}
