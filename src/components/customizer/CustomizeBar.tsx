import React from 'react';
import { Save, X, RotateCcw, Plus, LayoutGrid, Palette, Sparkles, Check } from 'lucide-react';
import { ThemeType } from '../../types';

interface Props {
  isEditMode: boolean;
  gridColumns: 2 | 3 | 4;
  onColumnsChange: (cols: 2 | 3 | 4) => void;
  onOpenWidgetLibrary: () => void;
  onOpenThemeSelector: () => void;
  onSave: () => void;
  onCancel: () => void;
  onReset: () => void;
  hasUnsavedChanges: boolean;
}

export const CustomizeBar: React.FC<Props> = ({
  isEditMode,
  gridColumns,
  onColumnsChange,
  onOpenWidgetLibrary,
  onOpenThemeSelector,
  onSave,
  onCancel,
  onReset,
  hasUnsavedChanges
}) => {
  if (!isEditMode) return null;

  return (
    <div className="sticky top-2 z-40 w-full max-w-5xl mx-auto px-4 my-2">
      <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-indigo-500/40 shadow-2xl shadow-indigo-500/10 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Left: Indicator & Library triggers */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 font-bold uppercase tracking-wider text-[10px]">
            Dashboard Edit Mode
          </span>

          <button
            onClick={onOpenWidgetLibrary}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Widget</span>
          </button>

          <button
            onClick={onOpenThemeSelector}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium flex items-center gap-1.5 transition-colors"
          >
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span>Theme & Style</span>
          </button>
        </div>

        {/* Center: Columns control */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 px-1 font-mono">COLS:</span>
          {([2, 3, 4] as const).map((col) => (
            <button
              key={col}
              onClick={() => onColumnsChange(col)}
              className={`px-2 py-0.5 rounded-lg font-mono font-bold text-xs transition-colors ${
                gridColumns === col ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {col}
            </button>
          ))}
        </div>

        {/* Right: Actions (Save / Reset / Cancel) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onReset}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center gap-1"
            title="Reset layout to default role configuration"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={onCancel}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Cancel</span>
          </button>

          <button
            onClick={onSave}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
