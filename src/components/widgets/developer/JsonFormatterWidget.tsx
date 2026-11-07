import React, { useState } from 'react';
import { FileJson, Check, Copy, AlertCircle, RefreshCw } from 'lucide-react';

export const JsonFormatterWidget: React.FC = () => {
  const [input, setInput] = useState<string>('{"service":"personatab","status":"active","metrics":{"latencyMs":14,"uptime":0.9999},"roles":["developer","student"]}');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <FileJson className="w-4 h-4 text-emerald-400" />
            <span>JSON Formatter & Validator</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={formatJson}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
              title="Prettify 2 spaces"
            >
              Format
            </button>
            <button
              onClick={minifyJson}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
              title="Minify"
            >
              Minify
            </button>
            <button
              onClick={copyToClipboard}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Copy JSON"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-1.5 flex items-center gap-1 text-[11px] text-rose-400 bg-rose-950/40 px-2 py-1 rounded border border-rose-900/50">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{error}</span>
          </div>
        )}
      </div>

      <div className="flex-1 mt-1">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError(null);
          }}
          className="w-full h-32 p-2 rounded-lg bg-slate-950/90 border border-slate-800 font-mono text-[11px] text-emerald-300/90 focus:outline-none focus:border-emerald-500/60 resize-none leading-relaxed"
          placeholder="Paste JSON here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};
