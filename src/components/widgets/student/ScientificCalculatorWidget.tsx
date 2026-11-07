import React, { useState } from 'react';
import { Binary, Delete } from 'lucide-react';

export const ScientificCalculatorWidget: React.FC = () => {
  const [expr, setExpr] = useState<string>('');
  const [result, setResult] = useState<string>('0');

  const append = (val: string) => {
    setExpr((prev) => prev + val);
  };

  const clear = () => {
    setExpr('');
    setResult('0');
  };

  const backspace = () => {
    setExpr((prev) => prev.slice(0, -1));
  };

  const compute = () => {
    try {
      // Safe sanitized eval
      let sanitized = expr
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/π/g, 'Math.PI')
        .replace(/\^/g, '**');

      // eslint-disable-next-line no-eval
      const evaluated = Function(`"use strict"; return (${sanitized})`)();
      setResult(String(evaluated));
    } catch {
      setResult('Error');
    }
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-2">
          <Binary className="w-4 h-4 text-emerald-400" />
          <span>Scientific Calculator</span>
        </div>

        <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-right mb-2">
          <div className="text-[11px] font-mono text-slate-400 min-h-[16px] truncate">{expr || ' '}</div>
          <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums truncate">{result}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 font-mono text-xs">
        <button onClick={() => append('sin(')} className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300">sin</button>
        <button onClick={() => append('cos(')} className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300">cos</button>
        <button onClick={() => append('sqrt(')} className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300">√</button>
        <button onClick={clear} className="p-1 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-bold">C</button>

        <button onClick={() => append('(')} className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300">(</button>
        <button onClick={() => append(')')} className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300">)</button>
        <button onClick={() => append('^')} className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300">x^y</button>
        <button onClick={() => append('/')} className="p-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300">/</button>

        <button onClick={() => append('7')} className="p-1 rounded bg-slate-800 text-slate-100">7</button>
        <button onClick={() => append('8')} className="p-1 rounded bg-slate-800 text-slate-100">8</button>
        <button onClick={() => append('9')} className="p-1 rounded bg-slate-800 text-slate-100">9</button>
        <button onClick={() => append('*')} className="p-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300">×</button>

        <button onClick={() => append('4')} className="p-1 rounded bg-slate-800 text-slate-100">4</button>
        <button onClick={() => append('5')} className="p-1 rounded bg-slate-800 text-slate-100">5</button>
        <button onClick={() => append('6')} className="p-1 rounded bg-slate-800 text-slate-100">6</button>
        <button onClick={() => append('-')} className="p-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300">-</button>

        <button onClick={() => append('1')} className="p-1 rounded bg-slate-800 text-slate-100">1</button>
        <button onClick={() => append('2')} className="p-1 rounded bg-slate-800 text-slate-100">2</button>
        <button onClick={() => append('3')} className="p-1 rounded bg-slate-800 text-slate-100">3</button>
        <button onClick={() => append('+')} className="p-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300">+</button>

        <button onClick={() => append('0')} className="p-1 rounded bg-slate-800 text-slate-100">0</button>
        <button onClick={() => append('.')} className="p-1 rounded bg-slate-800 text-slate-100">.</button>
        <button onClick={backspace} className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400">⌫</button>
        <button onClick={compute} className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold">=</button>
      </div>
    </div>
  );
};
