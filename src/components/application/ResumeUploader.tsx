import { Upload, FileText, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';

interface Props {
  value?: File;
  onChange: (file: File | undefined) => void;
}

export const ResumeUploader = ({ value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowed.includes(file.type)) onChange(file);
  };

  return (
    <div>
      {!value ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${dragging ? 'border-primary-500 bg-primary-50' : 'border-slate-300 hover:border-primary-400 hover:bg-slate-50'}`}
        >
          <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-700 mb-1">Drag and drop your resume</p>
          <p className="text-xs text-slate-400">PDF, DOCX up to 10MB</p>
          <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      ) : (
        <div className="border border-slate-200 rounded-xl p-4 flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{value.name}</p>
            <p className="text-xs text-slate-400">{(value.size / 1024 / 1024).toFixed(1)} MB</p>
            <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full w-full animate-pulse" />
            </div>
          </div>
          <button onClick={() => onChange(undefined)} className="text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
