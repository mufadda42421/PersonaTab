import React, { useState } from 'react';
import { Binary, Copy, Check, ArrowDownUp } from 'lucide-react';

export const Base64ToolWidget: React.FC = () => {
  const [input, setInput] = useState<string>('Hello PersonaTab!');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  let output = '';
  let isError = false;

  try {
    if (mode === 'encode') {
      output = btoa(unescape(encodeURIComponent(input)));
    } else {
      output = decodeURIComponent(escape(atob(input)));
    }
  } catch {
    isError = true;
    output = 'Invalid Base64 sequence';
  }

  const copyResult = () => {
    if (isError || !output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Binary className="w-4 h-4 text-purple-400" />
            <span>Base64 Tool</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 flex items-center gap-1 font-mono text-[10px]"
            >
              <ArrowDownUp className="w-3 h-3" />
              <span>{mode.toUpperCase()}</span>
            </button>
            <button
              onClick={copyResult}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Copy output"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter string to ${mode}...`}
          className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 font-mono text-slate-100 text-[11px] focus:outline-none"
        />
      </div>

      <div className="mt-2 pt-2 border-t border-slate-800">
        <span className="text-[10px] text-slate-400 block mb-1">Result:</span>
        <div className={`p-2 rounded bg-slate-950 border font-mono text-[11px] break-all select-all ${
          isError ? 'text-rose-400 border-rose-900/50' : 'text-purple-300 border-slate-800'
        }`}>
          {output || <span className="text-slate-600">Waiting for input...</span>}
        </div>
      </div>
    </div>
  );
};
