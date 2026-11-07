import React from 'react';
import { Hourglass, Gamepad2, Calendar } from 'lucide-react';

interface GameRelease {
  title: string;
  releaseDate: string;
  daysRemaining: number;
  platform: string;
}

const UPCOMING_GAMES: GameRelease[] = [
  { title: 'Grand Theft Auto VI', releaseDate: 'Fall 2025', daysRemaining: 310, platform: 'PS5, XSX' },
  { title: 'Monster Hunter Wilds', releaseDate: 'Feb 2025', daysRemaining: 75, platform: 'PC, PS5, XSX' },
  { title: 'Death Stranding 2: On The Beach', releaseDate: '2025', daysRemaining: 240, platform: 'PS5' }
];

export const GamerCountdownsWidget: React.FC = () => {
  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Hourglass className="w-4 h-4 text-pink-400" />
            <span>Upcoming Releases Countdown</span>
          </div>
          <span className="text-[10px] text-pink-400/80 font-mono">2025 Blockbusters</span>
        </div>

        <div className="space-y-2">
          {UPCOMING_GAMES.map((game) => (
            <div
              key={game.title}
              className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <div className="text-slate-100 font-semibold truncate max-w-[170px]">{game.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {game.releaseDate}
                  </span>
                  <span>·</span>
                  <span>{game.platform}</span>
                </div>
              </div>
              <div className="text-right font-mono tabular-nums shrink-0">
                <div className="text-base font-bold text-pink-400">{game.daysRemaining}</div>
                <div className="text-[9px] text-slate-500 uppercase">Days Left</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
