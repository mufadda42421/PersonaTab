import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  Settings,
  ChevronDown,
  Download,
  Check,
  Compass
} from 'lucide-react';
import { RoleType } from '../../types';
import { ROLE_DEFINITIONS } from '../../data/roles';
import { ExtensionExporter } from '../../services/extensionExporter';
import { StorageService } from '../../services/storageService';

interface Props {
  role: RoleType;
  onRoleChange: (newRole: RoleType) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenSettings: () => void;
  activeView: 'showcase' | 'download' | 'dashboard';
  onViewChange: (view: 'showcase' | 'download' | 'dashboard') => void;
}

export const TopBar: React.FC<Props> = ({
  role,
  onRoleChange,
  isEditMode,
  onToggleEditMode,
  onOpenSettings,
  activeView,
  onViewChange
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const currentRole = ROLE_DEFINITIONS[role];
  const isInsideExtension = StorageService.isRunningInChromeExtension();

  return (
    <header className="w-full flex items-center justify-between gap-6 px-4 sm:px-6 py-3.5 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-30">
      {/* Zone 1: Wordmark Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onViewChange('showcase')}
          className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center text-xs font-black shadow-md shadow-indigo-500/20">
            P
          </div>
          <span>PersonaTab</span>
        </button>
      </div>

      {/* Zone 2: ONLY TWO TABS (Product Showcase and Download Tab) */}
      <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => onViewChange('showcase')}
          className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeView === 'showcase'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Product Showcase</span>
        </button>

        {/* Download Tab - Only on website per user instructions */}
        {!isInsideExtension && (
          <button
            onClick={() => onViewChange('download')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeView === 'download'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Tab</span>
          </button>
        )}
      </nav>

      {/* Zone 3: Live Preview / Controls */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors whitespace-nowrap shrink-0"
            title="Switch Persona / Role"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentRole.accentColor || '#6366f1' }}
            />
            <span className="font-semibold capitalize truncate max-w-[90px] sm:max-w-none">
              {currentRole.title.split('/')[0].trim()}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-60 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-1.5 z-50 text-xs max-h-80 overflow-y-auto">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Switch Identity
              </div>
              {Object.values(ROLE_DEFINITIONS).map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    onRoleChange(r.id);
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between transition-colors ${
                    role === r.id
                      ? 'bg-indigo-600/20 text-indigo-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{r.title}</span>
                  {role === r.id && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 ml-1" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Edit Dashboard Mode Button */}
        <button
          onClick={onToggleEditMode}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
            isEditMode
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50'
              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">{isEditMode ? 'Editing' : 'Customize'}</span>
        </button>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors shrink-0"
          title="Extension Settings & Data"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
