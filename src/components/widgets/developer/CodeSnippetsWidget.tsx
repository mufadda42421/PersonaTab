import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, Plus, Trash2 } from 'lucide-react';
import { StorageService } from '../../../services/storageService';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
}

const STORAGE_KEY = 'dev_code_snippets';

const DEFAULT_SNIPPETS: Snippet[] = [
  {
    id: '1',
    title: 'Tailwind Glassmorphism Card',
    language: 'CSS',
    code: 'bg-slate-900/70 backdrop-blur-md border border-white/10 shadow-lg rounded-xl'
  },
  {
    id: '2',
    title: 'Custom Debounce Hook (TS)',
    language: 'TypeScript',
    code: 'export function useDebounce<T>(value: T, delay = 300): T {\n  const [val, setVal] = useState(value);\n  useEffect(() => {\n    const h = setTimeout(() => setVal(value), delay);\n    return () => clearTimeout(h);\n  }, [value, delay]);\n  return val;\n}'
  },
  {
    id: '3',
    title: 'Docker Compose Node & Postgres',
    language: 'YAML',
    code: 'services:\n  app:\n    build: .\n    ports: ["3000:3000"]\n    environment:\n      DATABASE_URL: postgres://user:pass@db:5432/app'
  }
];

export const CodeSnippetsWidget: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [activeId, setActiveId] = useState<string>('1');
  const [copied, setCopied] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLang, setNewLang] = useState('TypeScript');
  const [newCode, setNewCode] = useState('');

  useEffect(() => {
    StorageService.getItem<Snippet[]>(STORAGE_KEY, DEFAULT_SNIPPETS).then((data) => {
      setSnippets(data);
      if (data.length > 0) setActiveId(data[0].id);
    });
  }, []);

  const activeSnippet = snippets.find((s) => s.id === activeId) || snippets[0];

  const copyCode = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const saveNewSnippet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCode.trim()) return;

    const created: Snippet = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      language: newLang,
      code: newCode.trim()
    };

    const updated = [created, ...snippets];
    setSnippets(updated);
    setActiveId(created.id);
    StorageService.setItem(STORAGE_KEY, updated);
    setIsAdding(false);
    setNewTitle('');
    setNewCode('');
  };

  const deleteSnippet = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = snippets.filter((s) => s.id !== id);
    setSnippets(updated);
    if (activeId === id && updated.length > 0) {
      setActiveId(updated[0].id);
    }
    StorageService.setItem(STORAGE_KEY, updated);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Code className="w-4 h-4 text-indigo-400" />
            <span>Code Snippets Vault</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Add Snippet"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={copyCode}
              disabled={!activeSnippet}
              className="p-1 rounded bg-indigo-600/80 hover:bg-indigo-600 text-white flex items-center gap-1 px-1.5"
              title="Copy active code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
        </div>

        {isAdding ? (
          <form onSubmit={saveNewSnippet} className="space-y-2 p-2 rounded bg-slate-800/80 border border-slate-700 mb-2">
            <div className="grid grid-cols-2 gap-1.5">
              <input
                type="text"
                placeholder="Snippet Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-100"
                required
              />
              <input
                type="text"
                placeholder="Language (e.g. TS, Python)"
                value={newLang}
                onChange={(e) => setNewLang(e.target.value)}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-100"
              />
            </div>
            <textarea
              placeholder="Paste code here..."
              rows={3}
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-slate-100 text-[11px]"
              required
            />
            <div className="flex justify-end gap-1.5">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-2 py-0.5 rounded text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-2.5 py-0.5 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="flex gap-1 overflow-x-auto pb-1 mb-2 scrollbar-none">
            {snippets.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`px-2 py-1 rounded whitespace-nowrap text-[11px] font-medium flex items-center gap-1.5 transition-colors ${
                  activeId === s.id
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span>{s.title}</span>
                {snippets.length > 1 && (
                  <Trash2
                    onClick={(e) => deleteSnippet(s.id, e)}
                    className="w-2.5 h-2.5 opacity-60 hover:opacity-100 hover:text-rose-400"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {activeSnippet ? (
        <div className="relative flex-1 bg-slate-950/80 rounded-lg p-2.5 border border-slate-800 font-mono text-[11px] overflow-auto max-h-36">
          <div className="text-[10px] text-slate-400 mb-1 flex justify-between font-sans">
            <span>{activeSnippet.title}</span>
            <span>{activeSnippet.language}</span>
          </div>
          <pre className="text-slate-300 whitespace-pre font-mono leading-relaxed">{activeSnippet.code}</pre>
        </div>
      ) : (
        <div className="text-center py-4 text-slate-500">No snippet selected</div>
      )}
    </div>
  );
};
