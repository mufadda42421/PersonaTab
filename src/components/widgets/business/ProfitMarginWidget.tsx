import React, { useState } from 'react';
import { DollarSign, ArrowUpRight } from 'lucide-react';

export const ProfitMarginWidget: React.FC = () => {
  const [cost, setCost] = useState<number>(45);
  const [price, setPrice] = useState<number>(100);

  const profit = Math.max(0, price - cost);
  const marginPct = price > 0 ? (profit / price) * 100 : 0;
  const markupPct = cost > 0 ? (profit / cost) * 100 : 0;

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-3">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Margin & Profit Calculator</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="text-slate-400 block mb-1">Cost Price ($)</label>
            <input
              type="number"
              value={cost || ''}
              onChange={(e) => setCost(Number(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 rounded bg-slate-800/80 border border-slate-700 font-mono text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Selling Price ($)</label>
            <input
              type="number"
              value={price || ''}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 rounded bg-slate-800/80 border border-slate-700 font-mono text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 font-mono tabular-nums space-y-1.5">
        <div className="flex justify-between items-center text-slate-300">
          <span>Gross Profit:</span>
          <span className="font-bold text-emerald-400 text-sm">${profit.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Profit Margin:</span>
          <span className="text-slate-100 font-semibold">{marginPct.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Markup:</span>
          <span className="text-indigo-400 font-semibold">{markupPct.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};
