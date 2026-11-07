import React, { useState } from 'react';
import { PenTool, Clock } from 'lucide-react';

export const WordCounterWidget: React.FC = () => {
  const [text, setText] = useState<string>(
    'The morning mist rolled over the ridge, unveiling a solitary granite needle that pierced the horizon.'
  );

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+/g) || []).length || 1 : 0;
  const readingTimeMins = Math.ceil(words / 200);

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <PenTool className="w-4 h-4 text-cyan-400" />
            <span>Live Word & Read Time Counter</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
            <Clock className="w-3 h-3" />
            <span>~{readingTimeMins} min read</span>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or write your manuscript here..."
          rows={3}
          className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-[11px] resize-none focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="grid grid-cols-4 gap-1 pt-2 border-t border-slate-800 text-center font-mono tabular-nums">
        <div className="p-1 rounded bg-slate-900/60">
          <span className="text-[10px] text-slate-400 block">Words</span>
          <span className="text-sm font-bold text-cyan-400">{words}</span>
        </div>
        <div className="p-1 rounded bg-slate-900/60">
          <span className="text-[10px] text-slate-400 block">Chars</span>
          <span className="text-sm font-bold text-slate-200">{chars}</span>
        </div>
        <div className="p-1 rounded bg-slate-900/60">
          <span className="text-[10px] text-slate-400 block">No Spaces</span>
          <span className="text-sm font-bold text-slate-200">{charsNoSpaces}</span>
        </div>
        <div className="p-1 rounded bg-slate-900/60">
          <span className="text-[10px] text-slate-400 block">Sentences</span>
          <span className="text-sm font-bold text-slate-200">{sentences}</span>
        </div>
      </div>
    </div>
  );
};
