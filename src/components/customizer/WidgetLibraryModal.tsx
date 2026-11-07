import React, { useState } from 'react';
import { Plus, X, Search, Check, Sparkles, Filter } from 'lucide-react';
import { RoleType, WidgetConfig } from '../../types';
import { WidgetRegistryService, WidgetMetadata } from '../../services/widgetRegistry';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userRole: RoleType;
  activeWidgetIds: string[];
  onAddWidget: (id: string) => void;
}

export const WidgetLibraryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userRole,
  activeWidgetIds,
  onAddWidget
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Recommended');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = ['Recommended', ...WidgetRegistryService.getCategories().filter((c) => c !== 'All')];

  let displayWidgets: WidgetMetadata[] = [];
  if (activeCategory === 'Recommended') {
    displayWidgets = WidgetRegistryService.getWidgetsForRole(userRole);
  } else {
    displayWidgets = WidgetRegistryService.getWidgetsByCategory(activeCategory);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    displayWidgets = WidgetRegistryService.getAllWidgets().filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div>
            <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>PersonaTab Dynamic Widget Library</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Browse role-specific tools, productivity calculators, and custom widgets.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search tools, calculators, snippets, or study tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-colors ${
                  activeCategory === cat && !searchQuery
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {displayWidgets.map((meta) => {
            const isAdded = activeWidgetIds.includes(meta.id);
            return (
              <div
                key={meta.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wide">
                      {meta.category}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 uppercase">
                      Size: {meta.defaultSize}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-100 text-sm">{meta.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {meta.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {meta.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-slate-500">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {isAdded ? (
                    <span className="px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => onAddWidget(meta.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Widget</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
