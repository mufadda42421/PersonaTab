import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';

interface MarketIndexItem {
  symbol: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  region: string;
}

const INDICES: MarketIndexItem[] = [
  { symbol: 'NIFTY 50', name: 'NSE India', value: '24,148.20', change: '+0.54%', isPositive: true, region: 'IN' },
  { symbol: 'SENSEX', name: 'BSE India', value: '79,486.32', change: '+0.48%', isPositive: true, region: 'IN' },
  { symbol: 'S&P 500', name: 'US Large Cap', value: '5,929.04', change: '+0.74%', isPositive: true, region: 'US' },
  { symbol: 'NASDAQ', name: 'US Tech 100', value: '18,983.47', change: '+1.51%', isPositive: true, region: 'US' },
  { symbol: 'BTC/USD', name: 'Bitcoin', value: '$88,420', change: '+2.85%', isPositive: true, region: 'Crypto' },
  { symbol: 'ETH/USD', name: 'Ethereum', value: '$3,180', change: '-0.42%', isPositive: false, region: 'Crypto' }
];

export const MarketIndicesWidget: React.FC = () => {
  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Market Indices & Watchlist</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Benchmark Session</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {INDICES.map((idx) => (
            <div
              key={idx.symbol}
              className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-0.5">
                <span className="font-semibold text-slate-300">{idx.symbol}</span>
                <span>{idx.region}</span>
              </div>
              <div className="font-mono tabular-nums text-sm font-bold text-slate-100">
                {idx.value}
              </div>
              <div className={`flex items-center text-[10px] font-mono font-medium mt-0.5 ${
                idx.isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {idx.isPositive ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                )}
                <span>{idx.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-1 text-[10px] text-slate-400">
        <AlertCircle className="w-3 h-3 shrink-0 text-amber-400/80" />
        <span>Indicative benchmark quotes. For educational/dashboard planning, not financial advice.</span>
      </div>
    </div>
  );
};
