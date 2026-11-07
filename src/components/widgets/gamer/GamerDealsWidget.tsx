import React from 'react';
import { Tag, ExternalLink } from 'lucide-react';

interface DealItem {
  title: string;
  store: string;
  discount: string;
  price: string;
  originalPrice: string;
  url: string;
}

const DEALS: DealItem[] = [
  { title: 'Cyberpunk 2077: Phantom Liberty', store: 'Steam', discount: '-50%', price: '$14.99', originalPrice: '$29.99', url: 'https://store.steampowered.com' },
  { title: 'Hades II (Early Access)', store: 'Epic Games', discount: '-20%', price: '$23.99', originalPrice: '$29.99', url: 'https://store.epicgames.com' },
  { title: 'The Witcher 3: Complete Edition', store: 'GOG', discount: '-75%', price: '$9.99', originalPrice: '$39.99', url: 'https://gog.com' }
];

export const GamerDealsWidget: React.FC = () => {
  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Tag className="w-4 h-4 text-emerald-400" />
            <span>Gaming Deals & Discounts</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Verified Sales</span>
        </div>

        <div className="space-y-1.5">
          {DEALS.map((d) => (
            <a
              key={d.title}
              href={d.url}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between transition-colors block"
            >
              <div className="truncate mr-2">
                <div className="text-slate-200 font-medium truncate">{d.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{d.store}</div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 font-mono">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px]">
                  {d.discount}
                </span>
                <span className="text-slate-100 font-semibold">{d.price}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
