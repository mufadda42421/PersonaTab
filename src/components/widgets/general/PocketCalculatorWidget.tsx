import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const PocketCalculatorWidget: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);

  const num = (n: string) => {
    if (overwrite) {
      setDisplay(n);
      setOverwrite(false);
    } else {
      setDisplay(display === '0' ? n : display + n);
    }
  };

  const handleOp = (operation: string) => {
    const current = parseFloat(display);
    if (prev === null) {
      setPrev(current);
    } else if (op) {
      const res = calculate(prev, current, op);
      setPrev(res);
      setDisplay(String(res));
    }
    setOp(operation);
    setOverwrite(true);
  };

  const calculate = (a: number, b: number, operation: string) => {
    switch (operation) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const equals = () => {
    if (prev !== null && op) {
      const current = parseFloat(display);
      const res = calculate(prev, current, op);
      setDisplay(String(res));
      setPrev(null);
      setOp(null);
      setOverwrite(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setOverwrite(true);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-2">
          <Calculator className="w-4 h-4 text-indigo-400" />
          <span>Pocket Calculator</span>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-right font-mono text-lg font-bold text-slate-100 tabular-nums overflow-hidden truncate mb-2">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 font-mono">
        <button onClick={clear} className="p-1.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-bold">C</button>
        <button onClick={() => setDisplay(String(parseFloat(display) * -1))} className="p-1.5 rounded bg-slate-800 text-slate-300">±</button>
        <button onClick={() => setDisplay(String(parseFloat(display) / 100))} className="p-1.5 rounded bg-slate-800 text-slate-300">%</button>
        <button onClick={() => handleOp('÷')} className="p-1.5 rounded bg-indigo-950 text-indigo-300 font-bold">÷</button>

        <button onClick={() => num('7')} className="p-1.5 rounded bg-slate-800 text-slate-100 font-medium">7</button>
        <button onClick={() => num('8')} className="p-1.5 rounded bg-slate-800 text-slate-100 font-medium">8</button>
        <button onClick={() => num('9')} className="p-1.5 rounded bg-slate-800 text-slate-100 font-medium">9</button>
        <button onClick={() => handleOp('×')} className="p-1.5 rounded bg-indigo-950 text-indigo-300 font-bold">×</button>

        <button onClick={() => num('4')} className="p-1.5 rounded bg-slate-800 text-slate-100 font-medium">4</button>
        <button onClick={() => num('5')} className="p-1.5 rounded bg-slate-800 text-slate-100 font-medium">5</button>
        <button onClick={() => num('6')} className="p-1.5 rounded bg-slate-800 text-slate-100 font-medium">6</button>
        <button onClick={() => handleOp('-')} className="p-1.5 rounded bg-indigo-950 text-indigo-300 font-bold">-</button>

        <button onClick={() => num('1')} className="p-1.5 rounded bg-slate-800 text-slate-100 font-medium">1</button>
        <button onClick={() => num('2')} className="p-1.5 rounded bg-slate-800 text-slate-100 font-medium">2</button>
        <button onClick={() => num('3')} className="p-1.5 rounded bg-slate-800 text-slate-100 font-medium">3</button>
        <button onClick={() => handleOp('+')} className="p-1.5 rounded bg-indigo-950 text-indigo-300 font-bold">+</button>

        <button onClick={() => num('0')} className="col-span-2 p-1.5 rounded bg-slate-800 text-slate-100 font-medium">0</button>
        <button onClick={() => num('.')} className="p-1.5 rounded bg-slate-800 text-slate-100">.</button>
        <button onClick={equals} className="p-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold">=</button>
      </div>
    </div>
  );
};
