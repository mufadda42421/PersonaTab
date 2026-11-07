import React, { useState } from 'react';
import { Palette, X, Image, Check } from 'lucide-react';
import { ThemeType } from '../../types';
import { THEME_DEFINITIONS } from '../../data/themes';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeType;
  backgroundBlur: number;
  borderRadius: 'sharp' | 'rounded' | 'soft';
  customBackgroundUrl?: string;
  onSaveThemeSettings: (settings: {
    theme: ThemeType;
    backgroundBlur: number;
    borderRadius: 'sharp' | 'rounded' | 'soft';
    customBackgroundUrl?: string;
  }) => void;
}

export const ThemeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentTheme,
  backgroundBlur,
  borderRadius,
  customBackgroundUrl,
  onSaveThemeSettings
}) => {
  const [theme, setTheme] = useState<ThemeType>(currentTheme);
  const [blur, setBlur] = useState<number>(backgroundBlur);
  const [radius, setRadius] = useState<'sharp' | 'rounded' | 'soft'>(borderRadius);
  const [customBg, setCustomBg] = useState<string>(customBackgroundUrl || '');

  if (!isOpen) return null;

  const handleApply = () => {
    onSaveThemeSettings({
      theme,
      backgroundBlur: blur,
      borderRadius: radius,
      customBackgroundUrl: customBg
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-slate-100 text-base">Theme & Aesthetic Customizer</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          {/* Themes Grid */}
          <div>
            <label className="text-slate-300 font-semibold block mb-2 text-xs">Aesthetic Preset</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.values(THEME_DEFINITIONS).map((t) => {
                const isSelected = theme === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-2.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/30'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/50'
                    }`}
                  >
                    <div className={`w-full h-10 rounded-xl ${t.previewBg} mb-1.5 border border-white/10 flex items-center justify-center`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div className="font-semibold text-slate-200 truncate">{t.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Background Blur */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">Glassmorphism Frosted Blur</span>
              <span className="font-mono text-indigo-400 font-bold">{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Border Radius */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-semibold text-slate-200 block">Border Radius Geometry</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sharp', label: 'Sharp (4px)', desc: 'Brutalist' },
                { id: 'rounded', label: 'Balanced (12px)', desc: 'Modern' },
                { id: 'soft', label: 'Soft (20px)', desc: 'Friendly' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRadius(r.id as any)}
                  className={`p-2 rounded-xl border text-left transition-colors ${
                    radius === r.id
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-xs text-slate-200">{r.label}</div>
                  <div className="text-[10px] text-slate-500">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Wallpaper */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <Image className="w-3.5 h-3.5 text-teal-400" />
              <span>Custom Wallpaper URL</span>
            </div>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={customBg}
              onChange={(e) => setCustomBg(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[10px] text-slate-500">
              Paste any high-resolution image URL to use as your dashboard backdrop.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end gap-2 bg-slate-950">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md transition-colors"
          >
            Apply Style
          </button>
        </div>
      </div>
    </div>
  );
};
