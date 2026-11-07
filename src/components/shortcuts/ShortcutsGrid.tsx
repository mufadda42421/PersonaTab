import React, { useState } from 'react';
import { Plus, X, Globe, ExternalLink } from 'lucide-react';
import { ShortcutItem } from '../../types';

interface Props {
  shortcuts: ShortcutItem[];
  onUpdateShortcuts: (updated: ShortcutItem[]) => void;
  isEditMode: boolean;
}

export const ShortcutsGrid: React.FC<Props> = ({
  shortcuts,
  onUpdateShortcuts,
  isEditMode
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addShortcut = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    let formattedUrl = newUrl.trim();
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const created: ShortcutItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      url: formattedUrl
    };

    onUpdateShortcuts([...shortcuts, created]);
    setNewTitle('');
    setNewUrl('');
    setIsAdding(false);
  };

  const removeShortcut = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onUpdateShortcuts(shortcuts.filter((s) => s.id !== id));
  };

  return (
    <div className="w-full my-4">
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {shortcuts.map((sc) => (
          <a
            key={sc.id}
            href={sc.url}
            className="group relative flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md border border-white/5 hover:border-indigo-500/40 shadow-sm hover:shadow-md transition-all text-xs font-semibold text-slate-200"
          >
            <div className="w-5 h-5 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-950/60 transition-colors">
              <Globe className="w-3 h-3" />
            </div>
            <span className="truncate max-w-[120px]">{sc.title}</span>

            {isEditMode && (
              <button
                onClick={(e) => removeShortcut(sc.id, e)}
                className="ml-1 text-slate-500 hover:text-rose-400 p-0.5"
                title="Remove Shortcut"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </a>
        ))}

        {isEditMode && !isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 px-3 py-2 rounded-2xl border border-dashed border-indigo-500/50 text-indigo-400 hover:bg-indigo-950/30 text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Shortcut</span>
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={addShortcut} className="max-w-md mx-auto mt-3 p-3 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-xl flex gap-2 text-xs">
          <input
            type="text"
            placeholder="Title (e.g. Notion)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500"
            required
          />
          <input
            type="text"
            placeholder="URL (e.g. notion.so)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500"
            required
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-2 py-1.5 rounded-xl text-slate-400 hover:text-slate-200"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};
