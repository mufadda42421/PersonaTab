import React, { useState } from 'react';
import { ScanText } from 'lucide-react';

export const RegexTesterWidget: React.FC = () => {
  const [pattern, setPattern] = useState<string>('[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}');
  const [flags, setFlags] = useState<string>('gi');
  const [testString, setTestString] = useState<string>('Contact support@personatab.dev or founders@startup.io for info.');

  let matches: string[] = [];
  let isValid = true;
  let errorMsg = '';

  try {
    if (pattern) {
      const regex = new RegExp(pattern, flags);
      const res = testString.match(regex);
      if (res) matches = Array.from(res);
    }
  } catch (e: any) {
    isValid = false;
    errorMsg = e.message || 'Invalid regular expression';
  }

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <ScanText className="w-4 h-4 text-sky-400" />
            <span>Regex Matcher & Tester</span>
          </div>
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
            !isValid
              ? 'bg-rose-950 text-rose-400'
              : matches.length > 0
              ? 'bg-emerald-950 text-emerald-400'
              : 'bg-slate-800 text-slate-400'
          }`}>
            {!isValid ? 'Error' : `${matches.length} matched`}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-mono text-sm">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="pattern"
              className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-slate-100 text-[11px] focus:outline-none focus:border-sky-500"
            />
            <span className="text-slate-500 font-mono text-sm">/</span>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="flags"
              className="w-12 px-1.5 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-slate-200 text-center text-[11px]"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">Test String</label>
            <input
              type="text"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-slate-200 text-[11px]"
            />
          </div>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-800">
        <span className="text-[10px] text-slate-400 block mb-1">Captured Matches:</span>
        <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
          {matches.length === 0 ? (
            <span className="text-[11px] text-slate-500 italic">No matches found</span>
          ) : (
            matches.map((m, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-sky-950/80 border border-sky-800/80 text-sky-200 font-mono text-[11px]"
              >
                {m}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
