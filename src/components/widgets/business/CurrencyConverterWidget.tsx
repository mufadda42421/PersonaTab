import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const RATES_TO_USD: Record<string, number> = {
  USD: 1.0,
  EUR: 0.94,
  GBP: 0.79,
  INR: 84.4,
  JPY: 153.2,
  CAD: 1.39,
  AUD: 1.52,
  AED: 3.67,
  SGD: 1.33
};

export const CurrencyConverterWidget: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [from, setFrom] = useState<string>('USD');
  const [to, setTo] = useState<string>('INR');

  // Convert amount -> USD -> target currency
  const inUSD = amount / (RATES_TO_USD[from] || 1);
  const converted = inUSD * (RATES_TO_USD[to] || 1);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-3">
          <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
          <span>Currency Converter</span>
        </div>

        <div className="space-y-2">
          <div>
            <label className="text-slate-400 block mb-1">Amount</label>
            <input
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 rounded bg-slate-800/80 border border-slate-700 font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-slate-400 block mb-1">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-2 py-1.5 rounded bg-slate-800 border border-slate-700 font-mono text-slate-100"
              >
                {Object.keys(RATES_TO_USD).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <button
              onClick={swap}
              type="button"
              className="mt-5 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Swap currencies"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex-1">
              <label className="text-slate-400 block mb-1">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-2 py-1.5 rounded bg-slate-800 border border-slate-700 font-mono text-slate-100"
              >
                {Object.keys(RATES_TO_USD).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800 font-mono tabular-nums">
        <div className="text-[10px] text-slate-400">Equivalent Value:</div>
        <div className="text-base font-bold text-cyan-400 mt-0.5">
          {converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {to}
        </div>
        <div className="text-[10px] text-slate-500 mt-0.5">
          1 {from} ≈ {(RATES_TO_USD[to] / RATES_TO_USD[from]).toFixed(4)} {to}
        </div>
      </div>
    </div>
  );
};
