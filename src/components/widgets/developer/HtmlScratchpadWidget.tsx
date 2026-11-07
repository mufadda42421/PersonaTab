import React, { useState } from 'react';
import { Terminal, Play, RotateCcw } from 'lucide-react';

export const HtmlScratchpadWidget: React.FC = () => {
  const defaultHtml = `<div class="p-4 bg-slate-900 text-white rounded-xl font-sans text-center">
  <h3 class="text-base font-bold text-indigo-400">PersonaTab Sandbox</h3>
  <p class="text-xs text-slate-300 mt-1">Live HTML / CSS preview in real time.</p>
  <button class="mt-3 px-3 py-1 bg-indigo-600 rounded text-xs">Interactive Button</button>
</div>`;

  const [code, setCode] = useState(defaultHtml);
  const [rendered, setRendered] = useState(defaultHtml);

  const runCode = () => {
    setRendered(code);
  };

  const resetCode = () => {
    setCode(defaultHtml);
    setRendered(defaultHtml);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>HTML & CSS Scratchpad</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={resetCode}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
              title="Reset sample"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={runCode}
              className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Run</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 mt-1">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-32 md:h-36 p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 resize-none focus:outline-none"
          spellCheck={false}
        />
        <div className="w-full h-32 md:h-36 rounded-lg bg-slate-950/60 border border-slate-800 p-2 overflow-auto">
          <div dangerouslySetInnerHTML={{ __html: rendered }} />
        </div>
      </div>
    </div>
  );
};
