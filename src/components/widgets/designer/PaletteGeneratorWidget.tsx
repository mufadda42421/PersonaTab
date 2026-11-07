import React, { useState } from 'react';
import { Palette, RefreshCw, Copy, Check, Lock, Unlock } from 'lucide-react';

interface PaletteColor {
  hex: string;
  name: string;
  locked: boolean;
}

const PRESET_PALETTES = [
  [
    { hex: '#0F172A', name: 'Slate Deep', locked: false },
    { hex: '#6366F1', name: 'Indigo Accent', locked: false },
    { hex: '#10B981', name: 'Emerald Mint', locked: false },
    { hex: '#F8FAFC', name: 'Pure White', locked: false },
    { hex: '#64748B', name: 'Cool Slate', locked: false }
  ],
  [
    { hex: '#0B0F19', name: 'Midnight', locked: false },
    { hex: '#3B82F6', name: 'Electric Blue', locked: false },
    { hex: '#06B6D4', name: 'Cyan Glow', locked: false },
    { hex: '#F1F5F9', name: 'Soft Surface', locked: false },
    { hex: '#1E293B', name: 'Dark Card', locked: false }
  ],
  [
    { hex: '#1C1917', name: 'Warm Obsidian', locked: false },
    { hex: '#F59E0B', name: 'Amber Gold', locked: false },
    { hex: '#EF4444', name: 'Crimson Flame', locked: false },
    { hex: '#FAFAF9', name: 'Cream Stone', locked: false },
    { hex: '#78716C', name: 'Warm Gray', locked: false }
  ]
];

export const PaletteGeneratorWidget: React.FC = () => {
  const [colors, setColors] = useState<PaletteColor[]>(PRESET_PALETTES[0]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const randomize = () => {
    const randomPreset = PRESET_PALETTES[Math.floor(Math.random() * PRESET_PALETTES.length)];
    setColors(
      colors.map((c, idx) => (c.locked ? c : randomPreset[idx] || c))
    );
  };

  const toggleLock = (idx: number) => {
    setColors(colors.map((c, i) => (i === idx ? { ...c, locked: !c.locked } : c)));
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Palette className="w-4 h-4 text-purple-400" />
            <span>Harmonious Color Palette</span>
          </div>
          <button
            onClick={randomize}
            className="px-2 py-0.5 rounded bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1 text-[11px] font-medium"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Shuffle</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1.5 my-2">
        {colors.map((c, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className="w-full h-14 rounded-lg relative shadow cursor-pointer group flex items-end justify-center pb-1 transition-transform hover:scale-105"
              style={{ backgroundColor: c.hex }}
              onClick={() => copyHex(c.hex)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLock(idx);
                }}
                className="absolute top-1 right-1 p-0.5 rounded bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {c.locked ? <Lock className="w-2.5 h-2.5 text-amber-300" /> : <Unlock className="w-2.5 h-2.5" />}
              </button>
              {copiedHex === c.hex ? (
                <span className="text-[9px] font-bold text-white bg-black/60 px-1 rounded">Copied</span>
              ) : null}
            </div>
            <span className="font-mono text-[10px] text-slate-300 mt-1 uppercase">{c.hex}</span>
          </div>
        ))}
      </div>

      <div className="text-[10px] text-slate-400 text-center">
        Click swatch to copy HEX · Hover to lock individual colors
      </div>
    </div>
  );
};
