import React, { useState, useEffect } from 'react';
import { FileText, Check, Copy } from 'lucide-react';
import { StorageService } from '../../../services/storageService';

const STORAGE_KEY = 'personatab_quick_notes';

export const QuickNotesWidget: React.FC = () => {
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    StorageService.getItem<string>(STORAGE_KEY, '• Prioritize client demo presentation at 2 PM\n• Review pull request #142\n• Buy espresso beans').then(setContent);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    StorageService.setItem(STORAGE_KEY, val);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Instant Scratchpad</span>
          </div>
          <div className="flex items-center gap-1.5">
            {saved && <span className="text-[10px] text-emerald-400 font-mono">Auto-saved</span>}
            <button
              onClick={copy}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Copy notes"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-1">
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Type quick thoughts, meeting notes, or links..."
          className="w-full h-32 p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-200 text-[11px] leading-relaxed resize-none focus:outline-none focus:border-indigo-500/60"
        />
      </div>
    </div>
  );
};
