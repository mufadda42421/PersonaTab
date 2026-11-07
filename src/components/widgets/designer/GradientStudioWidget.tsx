import React, { useState } from 'react';
import { Sparkle, Copy, Check } from 'lucide-react';

export const GradientStudioWidget: React.FC = () => {
  const [color1, setColor1] = useState('#4f46e5');
  const [color2, setColor2] = useState('#06b6d4');
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const cssValue = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

  const copyCss = () => {
    navigator.clipboard.writeText(`background: ${cssValue};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Sparkle className="w-4 h-4 text-indigo-400" />
            <span>CSS Gradient Studio</span>
          </div>
          <button
            onClick={copyCss}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Copy CSS"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div
          className="w-full h-14 rounded-lg shadow border border-white/10 mb-2 transition-all"
          style={{ background: cssValue }}
        />

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">Start Color</label>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-6 h-6 rounded bg-transparent cursor-pointer border-none"
              />
              <span className="font-mono text-slate-200 text-[11px]">{color1}</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">End Color</label>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-6 h-6 rounded bg-transparent cursor-pointer border-none"
              />
              <span className="font-mono text-slate-200 text-[11px]">{color2}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800">
        <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
          <span>Angle: {angle}°</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full accent-indigo-500 cursor-pointer"
        />
      </div>
    </div>
  );
};
