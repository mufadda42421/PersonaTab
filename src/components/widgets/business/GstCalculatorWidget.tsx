import React, { useState } from 'react';
import { Percent, Check, Copy } from 'lucide-react';

export const GstCalculatorWidget: React.FC = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [rate, setRate] = useState<number>(18);
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [copied, setCopied] = useState(false);

  let gstAmount = 0;
  let netAmount = 0;
  let totalAmount = 0;

  if (type === 'exclusive') {
    netAmount = amount;
    gstAmount = (amount * rate) / 100;
    totalAmount = netAmount + gstAmount;
  } else {
    totalAmount = amount;
    netAmount = (amount * 100) / (100 + rate);
    gstAmount = totalAmount - netAmount;
  }

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  const copyResult = () => {
    navigator.clipboard.writeText(`Net: ₹${netAmount.toFixed(2)}, GST (${rate}%): ₹${gstAmount.toFixed(2)}, Total: ₹${totalAmount.toFixed(2)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Percent className="w-4 h-4 text-blue-400" />
            <span>GST / VAT Tax Calculator</span>
          </div>
          <button
            onClick={copyResult}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Copy breakdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="space-y-2">
          <div>
            <label className="text-slate-400 block mb-1">Base Amount (₹ / $)</label>
            <input
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 rounded bg-slate-800/80 border border-slate-700 font-mono text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Tax Rate</label>
            <div className="grid grid-cols-4 gap-1">
              {[5, 12, 18, 28].map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`py-1 rounded font-mono text-center font-medium transition-colors ${
                    rate === r ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setType('exclusive')}
              className={`flex-1 py-1 rounded text-center transition-colors ${
                type === 'exclusive' ? 'bg-slate-700 text-white font-medium' : 'bg-slate-800/50 text-slate-400'
              }`}
            >
              GST Exclusive
            </button>
            <button
              onClick={() => setType('inclusive')}
              className={`flex-1 py-1 rounded text-center transition-colors ${
                type === 'inclusive' ? 'bg-slate-700 text-white font-medium' : 'bg-slate-800/50 text-slate-400'
              }`}
            >
              GST Inclusive
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800 space-y-1 font-mono tabular-nums">
        <div className="flex justify-between text-slate-400">
          <span>Net Amount:</span>
          <span>₹{netAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>CGST / SGST (half):</span>
          <span>₹{cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })} each</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Total GST:</span>
          <span className="text-blue-400 font-medium">₹{gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-slate-100 font-bold pt-1 border-t border-slate-800/60">
          <span>Final Total:</span>
          <span className="text-emerald-400">₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
};
