import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export const CompoundGrowthWidget: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualRate, setAnnualRate] = useState<number>(10);
  const [years, setYears] = useState<number>(10);

  // Future value calculation with compounding monthly
  const r = annualRate / 100 / 12;
  const n = years * 12;
  const fvPrincipal = principal * Math.pow(1 + r, n);
  const fvMonthly = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
  const totalValue = Math.round(fvPrincipal + fvMonthly);
  const totalInvested = principal + monthlyContribution * n;
  const interestEarned = totalValue - totalInvested;

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Compound Growth & SIP</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-400 font-semibold">{years}y Horizon</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">Initial ($)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-slate-100"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">Monthly ($)</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-slate-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">Return Rate (%)</label>
            <input
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-slate-100"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">Years</label>
            <input
              type="number"
              min="1"
              max="40"
              value={years}
              onChange={(e) => setYears(Number(e.target.value) || 1)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-slate-100"
            />
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-800 font-mono tabular-nums space-y-1">
        <div className="flex justify-between items-center text-slate-400">
          <span>Total Principal Invested:</span>
          <span>${totalInvested.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Compound Wealth Generated:</span>
          <span className="text-emerald-400">+${interestEarned.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-slate-100 font-bold pt-1 border-t border-slate-800/60">
          <span>Estimated Future Corpus:</span>
          <span className="text-base text-emerald-400">${totalValue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
