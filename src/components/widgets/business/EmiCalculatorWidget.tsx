import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

export const EmiCalculatorWidget: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  let emi = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }
  const totalPayable = emi * totalMonths;
  const totalInterest = totalPayable - principal;

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-3">
          <CreditCard className="w-4 h-4 text-violet-400" />
          <span>EMI & Loan Calculator</span>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-slate-400 mb-0.5">
              <span>Loan Principal</span>
              <span className="font-mono text-slate-200">₹{principal.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="50000"
              max="5000000"
              step="25000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full accent-violet-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-400 block mb-0.5">Interest (% p.a.)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-0.5">Tenure (Years)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value) || 1)}
                className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-slate-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800 font-mono tabular-nums space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Monthly EMI:</span>
          <span className="text-sm font-bold text-violet-400">₹{Math.round(emi).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Total Interest:</span>
          <span>₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Total Repayment:</span>
          <span className="text-slate-200">₹{Math.round(totalPayable).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};
